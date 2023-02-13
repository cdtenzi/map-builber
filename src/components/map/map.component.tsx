import React from "react";
import { FC } from "react";
import { Map } from "../../lib/TerrainBuilder";
import MapRowComponent from "../mapRow/mapRow.component";
import "./map.component.css";

type MapComponentProps = {
  map: Map;
};

const MapComponent: FC<MapComponentProps> = ({ map }) => {
  return (
    <div>
      <div>{map.mapType}</div>
      <div>
        {map.terrainMatrix.map((row, i) => {
          return <MapRowComponent key={i} row={row} />;
        })}
      </div>
    </div>
  );
};

export default MapComponent;
