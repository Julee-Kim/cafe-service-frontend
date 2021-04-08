import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { ExpandLessRounded, ExpandMoreRounded, ChevronLeftRounded, RoomRounded } from '@material-ui/icons';

const sidos = [
  {id: 1, name: '서울'},
  {id: 2, name: '경기'},
  {id: 3, name: '광주'},
  {id: 4, name: '대구'},
  {id: 5, name: '대전'},
]

const guguns = [
  {id: 1, name: '강남구', sidoId: 1},
  {id: 2, name: '강서구', sidoId: 1},
  {id: 3, name: '고양시 일산동구', sidoId: 2},
  {id: 4, name: '광명시', sidoId: 2},
  {id: 5, name: '남양주시', sidoId: 2},
  {id: 6, name: '광산구', sidoId: 3},
  {id: 7, name: '남구', sidoId: 3},
  {id: 8, name: '동구', sidoId: 3},
  {id: 9, name: '북구', sidoId: 3},
  {id: 10, name: '달서구', sidoId: 4},
  {id: 11, name: '달성군', sidoId: 4},
  {id: 12, name: '동구', sidoId: 4},
  {id: 13, name: '수성구', sidoId: 4},
  {id: 14, name: '대덕구', sidoId: 5},
  {id: 15, name: '동구', sidoId: 5},
]

const stores = [
  {id: 1, gugunId: 1, name: '강남점', sido: '서울', gugun: '강남구', address: '서울특별시 강남구 역삼동 809-10', addressDetail: '', tel: '041-321-8787'},
  {id: 2, gugunId: 1, name: '강남대로점', sido: '서울', gugun: '강남구', address: '서울특별시 강남구 역삼동 809-10', addressDetail: '한석타워 2층 1-2호 (역삼동)', tel: '041-321-8787'},
  {id: 3, gugunId: 2, name: '강서점', sido: '서울', gugun: '강서구', address: '서울특별시 강남구 역삼동 809-10', addressDetail: '한석타워 2층 1-2호 (역삼동)', tel: '041-321-8787'},
  {id: 4, gugunId: 3, name: '일산점', sido: '경기', gugun: '고양시 일산동구', address: '서울특별시 강남구 역삼동 809-10', addressDetail: '', tel: '041-321-8787'},
  {id: 5, gugunId: 4, name: '광명점', sido: '경기', gugun: '광명시', address: '서울특별시 강남구 역삼동 809-10', addressDetail: '한석타워 2층 1-2호 (역삼동)', tel: '041-321-8787'},
  {id: 6, gugunId: 6, name: '광산점', sido: '광주', gugun: '광산구', address: '서울특별시 강남구 역삼동 809-10', addressDetail: '', tel: '041-321-8787'},
  {id: 7, gugunId: 7, name: '남구점', sido: '광주', gugun: '남구', address: '서울특별시 강남구 역삼동 809-10', addressDetail: '한석타워 2층 1-2호 (역삼동)', tel: '041-321-8787'},
  {id: 8, gugunId: 10, name: '달서구점', sido: '대구', gugun: '달서구', address: '서울특별시 강남구 역삼동 809-10', addressDetail: '한석타워 2층 1-2호 (역삼동)', tel: '041-321-8787'},
  {id: 9, gugunId: 10, name: '달서점', sido: '대구', gugun: '달서구', address: '서울특별시 강남구 역삼동 809-10', addressDetail: '', tel: '041-321-8787'},
  {id: 10, gugunId: 14, name: '대덕점', sido: '대전', gugun: '대덕구', address: '서울특별시 강남구 역삼동 809-10', addressDetail: '한석타워 2층 1-2호 (역삼동)', tel: '041-321-8787'},
  {id: 11, gugunId: 14, name: '이대덕점', sido: '대전', gugun: '대덕구', address: '서울특별시 강남구 역삼동 809-10', addressDetail: '', tel: '041-321-8787'},
]

declare global {
  interface Window {
    kakao: any;
  }
}

interface IGugun {
  id: number;
  name: string;
  sidoId: number;
}

interface IStore {
  id: number;
  name: string;
  sido: string;
  gugun: string;
  address: string;
  addressDetail: string;
  tel: string;
  gugunId: number;
}

export const StoreMap = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true); // 매장 선택 collapse show or hide
  const [currentState, setCurrentState] = useState<string>('sido'); // 선택한 상태(sido, gugun, store)
  const [selectedGuguns, setSelectedGuguns] = useState<IGugun[]>([]); // 선택한 시도의 구군 목록
  const [selectedSidoName, setSelectedSidoName] = useState<string>('') // // 선택한 구군의 시도 이름
  const [selectedStores, setSelectedStores] = useState<IStore[]>([]); // 선택한 구군의 매장 목록
  const [selectedSidoGugunName, setSelectedSidoGugunName] = useState<string>('') // // 선택한 구군의 시도-구군 이름
  
  // 시도 선택
  const selectSido = (sidoId: number, sidoName: string) => {
    const filterGuguns = guguns.filter(gugun => gugun.sidoId === sidoId);
    setSelectedGuguns(filterGuguns);
    setSelectedSidoName(sidoName);
    setCurrentState('gugun');
  }

  // 구군 선택
  const selectGugun = (gugunId: number, gugunName: string) => {
    const filterStores = stores.filter(store => store.gugunId === gugunId);
    setSelectedStores(filterStores);
    setSelectedSidoGugunName(`${selectedSidoName} ${gugunName}`);
    setCurrentState('store');
  }

  // 구군 전체 선택
  const selectAllGugun = (sidoId: number) => {
    const [{name}] = sidos.filter(sido => sido.id === sidoId);
    const filterStores = stores.filter(store => store.sido === name);
    setSelectedStores(filterStores);
    setSelectedSidoGugunName(`${selectedSidoName} 전체`);
    setCurrentState('store');
  }

  // states 초기화
  const initStates = () => {
    setCurrentState('sido');
    setSelectedGuguns([]);
    setSelectedStores([]);
  }

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=983769166270a585e2bd0260628e4a74&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        let container = document.getElementById("map");
        let options = {
          center: new window.kakao.maps.LatLng(37.506502, 127.053617),
          level: 7
        };

        const map = new window.kakao.maps.Map(container, options);
     
      });
    };
  }, []);

  return (
    <div className="h-full">
      <Header/>
      <div className="store_wrap">
        <div className="store_list">
          <div className="title_wrap">
            <h3>매장 찾기</h3>
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
              {isOpen
                ? <ExpandLessRounded className="ico_arr" />
                : <ExpandMoreRounded className="ico_arr" />
              }
            </button>
          </div>
          
          {isOpen && (
            <>
              {currentState === 'sido' && (
                <div className="list_wrap">
                <div className="list_area">
                  <ul className="sido grid grid-cols-3 gap-1">
                    {sidos.map(sido => (
                      <li key={sido.id} onClick={() => selectSido(sido.id, sido.name)}>{sido.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
              )}

              {currentState === 'gugun' && (
                <div className="list_wrap">
                  <div className="list_title_wrap">
                    <button type="button" className="btn_back" onClick={initStates}>
                      <ChevronLeftRounded />
                    </button>
                    <h4 className="list_title">{selectedSidoName}</h4>
                  </div>
                  <div className="list_area">
                    <ul className="gugun grid grid-cols-2 gap-1">
                      <li onClick={() => selectAllGugun(selectedGuguns[0].sidoId)}>전체</li>
                      {selectedGuguns.map(gugun => (
                        <li key={gugun.id} onClick={() => selectGugun(gugun.id, gugun.name)}>{gugun.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {currentState === 'store' && (
                <div className="list_wrap">
                  <div className="list_title_wrap">
                    <h4 className="list_title">{selectedSidoGugunName}({selectedStores.length}개)</h4>
                    <button type="button" className="btn_select_sido" onClick={initStates}>지역선택</button>
                  </div>
                  <div className="list_area">
                    <ul className="stores">
                      {selectedStores.map(store => (
                        <li className="store" key={store.id}>
                          <div className="store_info">
                            <strong className="store_name">{store.name}</strong>
                            <p className="store_addr">
                              {store.address}
                              {store.addressDetail && (
                                <>
                                  <span>,</span><br/>
                                </>  
                              )}
                              {store.addressDetail}</p>
                            <p className="store_tel">{store.tel}</p>
                          </div>
                          <div className="ico_location_wrap">
                            <span className="block"><RoomRounded className="ico_location" /></span>
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
        <div id="map" className="map">map area</div>
      </div>
    </div>
  )
}
