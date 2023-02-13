import React from "react";
import { FC } from "react";
import { Tile } from "../../lib/TerrainBuilder";
import "./tile.component.css";

type TileComponentProps = {
  tile: Tile;
};

const TileComponent: FC<TileComponentProps> = ({ tile }) => {
  return <div className="tile">{tile ? tile.symbol : ""}</div>;
};

export default TileComponent;
