import Tile from '@/services/enum/Tile'

export default function getTileVictoryPoints(tile: Tile, expertMode: boolean) : number {
  if (expertMode) {
    switch (tile) {
      case Tile.FARM: return 2
      case Tile.RECRUIT: return 3
      case Tile.DEVELOPMENT: return 4
      case Tile.CARVING: return 7
      case Tile.EXPLORE: return 4
      default: return 0
    }
  }
  else {
    switch (tile) {
      case Tile.FARM: return 1
      case Tile.RECRUIT: return 2
      case Tile.DEVELOPMENT: return 3
      case Tile.CARVING: return 7
      case Tile.EXPLORE: return 3
      default: return 0
    }
  }
}
