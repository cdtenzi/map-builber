export enum MapType {
  RandomLand = 0,
  Islands = 1,
  River = 2,
  Lake = 3,
}

export enum TerrainType {
  Plain = 0,
  Water = 1,
  Elevation = 2,
  Forest = 3,
}

export class Tile {
  index: number;
  type: TerrainType;
  altitude: number;
  symbol: string;

  constructor(idx?: number, type?: TerrainType, altitude?: number) {
    this.index = idx || 0;
    this.type = type || TerrainType.Plain;
    this.altitude = altitude || 0;
    switch (this.type) {
      case TerrainType.Plain:
        this.symbol = " ";
        break;
      case TerrainType.Water:
        this.symbol = "~";
        break;
      case TerrainType.Elevation:
        this.symbol = "^";
        break;
      case TerrainType.Forest:
        this.symbol = "Y";
        break;
    }
  }
}

export enum MapSize {
  tiny = 1,
  small = 1.25,
  normal = 1.5,
  big = 1.75,
  huge = 2,
}

export class Map {
  private _columns: number = 10;
  private _rows: number = 100;
  mapSize: number = MapSize.tiny;
  mapType: MapType;
  terrainMatrix: Tile[][];

  constructor(type?: MapType, size?: MapSize) {
    this.mapSize = size || 1;
    this.mapType = type || MapType.RandomLand;
    // calibramos el mapa según el tamaño especificado
    this._columns = Math.round(this._columns * this.mapSize);
    this._rows = Math.round(this._rows * this.mapSize);
    // creamos el terreno según el tipo especificado
    this.terrainMatrix = new Array<Array<Tile>>;
    this.create(this.mapType);
  }

  getRandomTile(maptype: MapType): Tile {
    return new Tile(0, Math.floor(Math.random() * 4));
  }

  create(maptype: MapType): void {
    // dependiendo del tipo de mapa, creamos una randomización diferente.
    // por ejemplo, RandomLand tiene muy poca agua, mientras que River
    // necesita cierto "orden" para la randomización de un río.
    switch (maptype) {
      case MapType.RandomLand:
        // inicia la posición en columnas donde colocaremos el agua
        const waterStartColumn = Math.floor(Math.random() * 10);
        const waterStartRow = Math.floor(Math.random() * 100);
        const waterMaxDiameterPercent = 15;
        const waterMaxRepetitions = 4;
        const forestMaxDiameter = 25;
        const forestMaxRepetitions = 10;
        // porcentaje de ocurrencia del terreno según el mapa
        const plainProbability = 60;
        const waterProbability = 10;
        const elevationProbability = 5;
        const forestProbability = 25;
        // ahora calculamos la cantidad de Tiles de cada tipo que caben
        // en el mapa dependiendo de su porcentaje de ocurrencia:
        const totalTiles = this._columns * this._rows;
        let plainCount = Math.round(totalTiles / plainProbability);
        const waterCount = Math.round(totalTiles / waterProbability);
        const elevationCount = Math.round(totalTiles / elevationProbability);
        const forestCount = Math.round(totalTiles / forestProbability);
        // emparejamos el tamaño del mapa por si en la división nos comió
        // algún tile el redondeo de decimales, rellenando con planicie:
        plainCount +=
          totalTiles - plainCount - waterCount - elevationCount - forestCount;

        // Una vez hechas todas las proporciones de terreno que se deben tener
        // en cuenta para construir el mapa, comenzamos el algoritmo de creación:
        // Hacemos un barrido completo del array, ubicando los tiles fila x fila
        for (let row = 0; row < this._rows; row++) {
          //inicializamos fila y columnas
          let newRow = new Array<Tile>(this._rows);
          this.terrainMatrix.push(newRow);
          for (let col = 0; col < this._columns; col++) {
            let newTile = this.getRandomTile(this.mapType);
            this.terrainMatrix[row].push(newTile);
          }
        }

        break;
      case MapType.Islands:
        break;
      case MapType.River:
        break;
      case MapType.Lake:
        break;
    }

    return;
  }

  printToConsole(): void {
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 100; col++) {
        console.log(this.terrainMatrix[col][row]);
      }
    }
  }
}
