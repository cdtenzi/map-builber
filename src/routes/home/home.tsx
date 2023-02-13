import React from "react";
import { Outlet } from "react-router-dom";
import MapComponent from "../../components/map/map.component";
import { Map, MapSize, MapType } from "../../lib/TerrainBuilder";

const Home = () => {
  let map = new Map(MapType.RandomLand, MapSize.tiny);
  return (
    <div>
      <MapComponent map={map} />
      <Outlet />
    </div>
  );
};

export default Home;
