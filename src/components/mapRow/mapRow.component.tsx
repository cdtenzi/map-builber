import React, { FC } from "react";
import { Tile } from "../../lib/TerrainBuilder";
import TileComponent from "../tile/tile.component";
import "./mapRow.component.css";

type MapRowComponentProps = {
  row: Tile[];
};

const MapRowComponent: FC<MapRowComponentProps> = ({ row }) => {
  return (
    <div>
      {row.map((tile, i) => {
        return <TileComponent key={i} tile={tile} />;
      })}
    </div>
  );
};

export default MapRowComponent;
