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
  const { loading } = useQuery<sidosAndGuguns>(SIDOS_AND_GUGUNS, {
    onCompleted(data) {
      setSidos(data?.getSidos.results);
      setGuguns(data?.getGuguns.results);
    },
  });
  const [ callQuery, { data: stores }] = useLazyQuery<getStores, getStoresVariables>(STORES, {
    onCompleted(data) {
      setSelectedStores(data?.getStores.results);
      setCurrentState("store");
    }
  });

  const [sidos, setSidos] = useState<sidosAndGuguns_getSidos_results[] | null>([]);
  const [guguns, setGuguns] = useState<sidosAndGuguns_getGuguns_results[] | null>([]);
  const [isOpen, setIsOpen] = useState<boolean>(true); // 매장 선택 collapse show or hide
  const [currentState, setCurrentState] = useState<string>("sido"); // 선택한 상태(sido, gugun, store)
  const [selectedGuguns, setSelectedGuguns] = useState<sidosAndGuguns_getGuguns_results[]>([]); // 선택한 시도의 구군 목록
  const [selectedSidoName, setSelectedSidoName] = useState<string>(''); // // 선택한 구군의 시도 이름
  const [selectedStores, setSelectedStores] = useState<getStores_getStores_results[] | null>([]); // 선택한 구군의 매장 목록
  const [selectedSidoGugunName, setSelectedSidoGugunName] = useState<string>(""); // // 선택한 구군의 시도-구군 이름

  // 시도 선택
  const selectSido = (sidoId: number, sidoName: string) => {
    if (!guguns) return;
    const filterGuguns = guguns.filter((gugun) => gugun.sidoId === sidoId);
    setSelectedGuguns(filterGuguns);
    setSelectedSidoName(sidoName);
    setCurrentState("gugun");
  };

  // 구군 선택 (매장 요청 api)
  const getStoresApi = (inputObj: object, gugunName?: string) => {
    // 선택한 구군의 시도-구군 이름 set
    if (gugunName) {
      setSelectedSidoGugunName(`${selectedSidoName} ${gugunName}`);
    } else {
      setSelectedSidoGugunName(`${selectedSidoName} 전체`);
    }

    callQuery({
      variables: {
        getStoresInput: inputObj
      }
    });
  }

  // states 초기화
  const initStates = () => {
    setCurrentState("sido");
    setSelectedGuguns([]);
    setSelectedStores([]);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src =
      'https://dapi.kakao.com/v2/maps/sdk.js?appkey=983769166270a585e2bd0260628e4a74&autoload=false';
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        let container = document.getElementById('map');
        let options = {
          center: new window.kakao.maps.LatLng(37.506502, 127.053617),
          level: 7,
        };

        const map = new window.kakao.maps.Map(container, options);
      });
    };
  }, []);

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
                        <li className="store" key={store.id}>
                          <div className="store_info">
                            <strong className="store_name">{store.name}</strong>
                            <p className="store_addr">
                              {store.address}
                              {store.addressDetail && (
                                <>
                                  <span>,</span>
                                  <br />
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
      </div>
    </div>
  );
};
