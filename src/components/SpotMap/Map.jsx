import React, { useState, useEffect } from "react";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";
import styled from "styled-components";

const MapSection = styled.div`
  box-sizing: border-box;
  margin: 1%;
  position: relative;
  // background-color: yellow;
  grid-area: map;
  outline: none;
`;
const SearchAgainButton = styled.button`
  position: absolute;

  top: 3vh;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  background: #c4c4c4;
  border-radius: 14px;
  border: none;
  padding: 6px 22px;
  z-index: 4;
  cursor: pointer;
`;

const NaverMapAPI = (props) => {
  // // const Item = props.mapList;
  // // console.log("MAP!!", Item);
  // console.log("mapamapampa", props.abc);
  // const abc = props.abc;
  const navermaps = window.naver.maps;

  // 일단은 기본 default 맵을 서울 시청 좌표로 상태 유지
  const [state, setState] = useState({
    center: {
      lat: 37.551229,
      lng: 126.988205,
    },
    zoom: 16,
  });

  // Geoloation 사용해서 현재 위치 정보 받아와서 상태값에 업데이트 해주기
  async function updateCurLocation() {
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity,
      }
    );
  }

  // 초기에 한번 현재 위치 정보 받아서 해당 현재 위치로 이동시켜주기
  useEffect(() => {
    updateCurLocation();
  }, []);

  // 버튼 클릭 시 지도 현재 위치 중심으로 이동
  const handleBackToCenter = () => {
    updateCurLocation();
  };

  return (
    <>
      <NaverMap
        mapDivId={"SASM_map"}
        style={{
          width: "100%",
          height: "100%",
          outline: "none",
        }}
        center={state.center}
        defaultZoom={state.zoom}
        onZoomChanged={(zoom) => {
          console.log(zoom);
        }}
      >
        <Marker
          key={1}
          position={new navermaps.LatLng(37.551229, 126.988205)}
          // animation={2}
          onClick={() => {
            alert("여기는 서울타워입니다.");
          }}
        />
        <Marker
          key={2}
          position={new navermaps.LatLng(37.5520579, 126.9394652)}
          // animation={2}
          onClick={() => {
            alert("여기는 서강대입니다.");
          }}
        />

        <Marker
          key={3}
          position={state.center}
          clickable={false}
          icon={{
            url: "./img/red_dot.png",
            size: new navermaps.Size(20, 20),
            origin: new navermaps.Point(190, 190),
            anchor: new navermaps.Point(10, 10),
          }}
          // animation={2}
          onClick={() => {
            alert("여기는 현재 위치입니다.");
          }}
        />
        <Marker
          key={4}
          position={state.center}
          // animation={2}
          onClick={() => {
            alert("여기는 현재위치입니다.");
          }}
        />
        {/* {abc &&
          abc.map((itemdata, index) => {
            // 필요 정보 : 이미지,?, 카테고리, ?, 위치, 영업시간
            const left = itemdata[0];
            const right = itemdata[1];
            console.log("final", left, right, typeof left);
            return (
              <Marker
                key={index}
                position={new navermaps.LatLng(left, right)}
                // animation={2}
                icon={{
                  url: "./img/red_dot.png",
                  size: new navermaps.Size(20, 20),
                  // origin: new navermaps.Point(190, 190),
                  // anchor: new navermaps.Point(10, 10),
                }}
                // onClick={() => {
                //   alert("여기는 서강대입니다.");
                // }}
              />
            );
          })} */}
      </NaverMap>
    </>
  );
};

export default function Map(props) {
  const Item = props.mapList;
  console.log("MAP!!", Item);
  const abc = Item.map((itemdata, index, source) => {
    // number: 요소값
    // index: source에서 요소의 index
    // source: 순회하는 대상

    // console.log(itemdata);
    // // 1

    // console.log(index);
    // // 0

    return [itemdata.left_coordinate, itemdata.right_coordinate];
  });
  // const abc = (Item.left_coordinate, Item.right_coordinate);
  console.log("ab", abc);
  return (
    <MapSection>
      <RenderAfterNavermapsLoaded
        ncpClientId={"aef7a2wcmn"}
        error={<p>Maps Load Error</p>}
        loading={<p>Maps Loading...</p>}
      >
        <NaverMapAPI abc={abc} />
      </RenderAfterNavermapsLoaded>

      <SearchAgainButton
      // onClick={handleBackToCenter}
      >
        지금 지도에서 검색
      </SearchAgainButton>
    </MapSection>
  );
}
