import React, { useState, useEffect } from "react";
import {
  ExpandLessRounded,
  ExpandMoreRounded,
  ChevronLeftRounded,
  RoomRounded,
} from "@material-ui/icons";
import gql from "graphql-tag";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  sidosAndGuguns,
  sidosAndGuguns_getSidos_results,
  sidosAndGuguns_getGuguns_results,
} from "../../__generated__/sidosAndGuguns";
import { getStores, getStoresVariables } from "../../__generated__/getStores";
import { getStores_getStores_results } from "../../__generated__/getStores";

const SIDOS_AND_GUGUNS = gql`
  query sidosAndGuguns {
    getSidos {
      success
      error
      results {
        id
        name
      }
    }
    getGuguns {
      success
      error
      results {
        id
        name
        sidoId
      }
    }
  }
`;

const STORES = gql`
  query getStores($getStoresInput: GetStoresInput!) {
    getStores(input: $getStoresInput) {
      success
      error
      results {
        id
        name
        tel
        address
        jibunAddress
        addressDetail
        lat
        lot
        sidoId
        gugunId
      }
    }
  }
`;

declare global {
  interface Window {
    kakao: any;
  }
}

export const StoreMap = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [sidos, setSidos] = useState<sidosAndGuguns_getSidos_results[] | null>([]);
  const [guguns, setGuguns] = useState<sidosAndGuguns_getGuguns_results[] | null>([]);
  const [isOpen, setIsOpen] = useState<boolean>(true); // 매장 선택 collapse show or hide
  const [currentState, setCurrentState] = useState<string>("sido"); // 선택한 상태(sido, gugun, store)
  const [selectedGuguns, setSelectedGuguns] = useState<sidosAndGuguns_getGuguns_results[]>([]); // 선택한 시도의 구군 목록
  const [selectedSidoName, setSelectedSidoName] = useState<string>(''); // // 선택한 구군의 시도 이름
  const [selectedStores, setSelectedStores] = useState<getStores_getStores_results[] | null>([]); // 선택한 구군의 매장 목록
  const [selectedSidoGugunName, setSelectedSidoGugunName] = useState<string>("서울 전체"); // // 선택한 구군의 시도-구군 이름
  const [storeInfo, setStoreInfo] = useState<getStores_getStores_results | null>(null);
  const [map, setMap] = useState<any>(null);
  const [init, setInit] = useState(true); // init 여부(모든 매장 마커 생성 여부)
  
  const { loading } = useQuery<sidosAndGuguns>(SIDOS_AND_GUGUNS, {
    onCompleted(data) {
      setSidos(data?.getSidos.results);
      setGuguns(data?.getGuguns.results);
    },
  });
  const [ callQuery, { data: stores }] = useLazyQuery<getStores, getStoresVariables>(STORES, {
    fetchPolicy: "no-cache",
    onCompleted(data) {
      setSelectedStores(data?.getStores.results);

      // init값이 true일때만 모든 매장 마커 생성
      if(init) {
        setMarkerAll();
        setInit(false);
      }

      setCurrentState("store");
    }
  });

  useEffect(() => {
    // set window width
    setWindowWidth(window.innerWidth);

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=983769166270a585e2bd0260628e4a74&autoload=false';
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        let container = document.getElementById('map');
        let options = {
          center: new window.kakao.maps.LatLng(37.506502, 127.053617),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        setMap(map);
        getStoresApi();
      });
    }; 

    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  // 시도 선택
  const selectSido = (sidoId: number, sidoName: string) => {
    if (!guguns) return;
    const filterGuguns = guguns.filter((gugun) => gugun.sidoId === sidoId);
    setSelectedGuguns(filterGuguns);
    setSelectedSidoName(sidoName);
    setCurrentState("gugun");
  };

  // 구군 선택 (매장 요청 api)
  const getStoresApi = (inputObj?: object, gugunName?: string) => {
    // 선택한 구군의 시도-구군 이름 set
    if (gugunName) {
      setSelectedSidoGugunName(`${selectedSidoName} ${gugunName}`);
    } else {
      setSelectedSidoGugunName(`${selectedSidoName} 전체`);
    }

    callQuery({
      variables: {
        getStoresInput: inputObj ? inputObj : {}
      }
    });
  }

  // 모든 매장 마커 표시하기
  const setMarkerAll = () => {
    const targetStores = stores?.getStores.results;

    if(!targetStores) return;

    // 마커 이미지의 이미지 주소
    const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
    // 마커 이미지의 이미지 크기
    const imageSize = new window.kakao.maps.Size(24, 35);
    let contentHtml: string;

    let i: number;
    for(i = 0; i < targetStores.length; i++) {
      if (targetStores[i].addressDetail) {
        contentHtml = `<div class="marker_store_info">
          <strong class="store_name">${targetStores[i].name}</strong>
          <p class="store_addr">${targetStores[i].address}</p>
          <p class="store_addr_detail">${targetStores[i].addressDetail}</p>
          <p class="store_tel">${targetStores[i].tel}</p>
        </div>`;
      } else {
        contentHtml = `<div class="marker_store_info">
          <strong class="store_name">${targetStores[i].name}</strong>
          <p class="store_addr">${targetStores[i].address}</p>
          <p class="store_tel">${targetStores[i].tel}</p>
        </div>`;
      }

      const markerPosition = {
        title: targetStores[i].name, 
        latlng: new window.kakao.maps.LatLng(targetStores[i].lat, targetStores[i].lot),
        content: contentHtml,
      };
      
      // 마커 이미지를 생성 
      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize); 
      
      // 마커를 생성
      const marker = new window.kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: markerPosition.latlng, // 마커를 표시할 위치
        title : markerPosition.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
        image : markerImage // 마커 이미지 
      });

      // 마커에 표시할 인포윈도우를 생성
      var infowindow = new window.kakao.maps.InfoWindow({
        content: markerPosition.content // 인포윈도우에 표시할 내용
      });

      // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
      // 이벤트 리스너로는 클로저를 만들어 등록합니다 
      // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
      window.kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
      window.kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
    }
  }

  // 인포윈도우를 표시하는 클로저를 만드는 함수
  const makeOverListener = (map: any, marker: string, infowindow: any) => {
    return function() {
      infowindow.open(map, marker);
    };
  }

  // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
  const makeOutListener = (infowindow: any) => {
    return function() {
      infowindow.close();
    };
  }

  // states 초기화
  const initStates = () => {
    setCurrentState("sido");
    setSelectedSidoName('');
    setSelectedGuguns([]);
    setSelectedStores([]);
  };

  // 지도 이동 시키기 
  const setCenter = (store: getStores_getStores_results) => {       
    // 이동할 위도 경도 위치를 생성
    const moveLatLon = new window.kakao.maps.LatLng(store.lat, store.lot);

    setStoreInfo(store);

    // 지도 중심을 이동
    map.setCenter(moveLatLon);

    if (windowWidth < 768) {
      setIsOpen(false);
    }
  }

  return (
    <div className="h-full">
      <div className="store_wrap">
        <div className="store_list">
          <div className="title_wrap">
            <h3>매장 찾기</h3>
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <ExpandLessRounded className="ico_arr" />
              ) : (
                <ExpandMoreRounded className="ico_arr" />
              )}
            </button>
          </div>

          {isOpen && (
            <>
              {currentState === "sido" && (
                <div className="list_wrap">
                  <div className="list_area">
                    <ul className="sido grid grid-cols-3 gap-1">
                      {!loading &&
                        sidos &&
                        sidos.map((sido) => (
                          <li
                            key={sido.id}
                            onClick={() => selectSido(sido.id, sido.name)}
                          >
                            {sido.name}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              )}

              {currentState === "gugun" && (
                <div className="list_wrap">
                  <div className="list_title_wrap">
                    <button
                      type="button"
                      className="btn_back"
                      onClick={initStates}
                    >
                      <ChevronLeftRounded />
                    </button>
                    <h4 className="list_title">{selectedSidoName}</h4>
                  </div>
                  <div className="list_area">
                    <ul className="gugun grid grid-cols-2 gap-1">
                      {selectedGuguns && (
                        <>
                          <li
                            onClick={() =>
                              getStoresApi({sidoId: selectedGuguns[0].sidoId})
                            }
                          >
                            전체
                          </li>
                          {selectedGuguns.map(gugun => (
                            <li key={gugun.id} onClick={() => getStoresApi({gugunId: gugun.id}, gugun.name)}>{gugun.name}</li>
                          ))}
                        </>  
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {currentState === "store" && (
                <div className="list_wrap">
                  <div className="list_title_wrap">
                    <h4 className="list_title">
                      {selectedSidoGugunName}({selectedStores && selectedStores.length}개)
                    </h4>
                    <button
                      type="button"
                      className="btn_select_sido"
                      onClick={initStates}
                    >
                      지역선택
                    </button>
                  </div>
                  <div className="list_area">
                    <ul className="stores">
                      {selectedStores && selectedStores?.map((store) => (
                        <li className="store" key={store.id} onClick={() => setCenter(store)}>
                          <div className="store_info">
                            <strong className="store_name">{store.name}</strong>
                            <p className="store_addr">
                              {store.address}
                              {store.addressDetail && (
                                <>
                                  <span>, </span>
                                </>
                              )}
                              {store.addressDetail}
                            </p>
                            <p className="store_tel">{store.tel}</p>
                          </div>
                          <div className="ico_location_wrap">
                            <span className="block">
                              <RoomRounded className="ico_location" />
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div id="map" className="map">
          map area
        </div>
        {storeInfo && (
          <div className="selected_store_info">
            <div className="store_info">
              <strong className="store_name">{storeInfo.name}</strong>
              <p className="store_addr">
                {storeInfo.address}
                {storeInfo.addressDetail && (
                  <>
                    <span>, </span>
                  </>
                )}
                {storeInfo.addressDetail}
              </p>
              <p className="store_tel">{storeInfo.tel}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
