import { TilePersistence } from '@/store/state'
import Tile from './enum/Tile'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'

/**
 * Counts the collected tiles.
 */
export default class BotTiles {

  private _tiles = new Map<Tile,number>()

  private constructor(tiles : TilePersistence[]) {
    tiles.forEach(tile => this._tiles.set(tile.tile, tile.count))
  }

  add(tile : Tile) : void {
    this._tiles.set(tile, this.count(tile) + 1)
  }

  count(tile : Tile) : number {
    return this._tiles.get(tile) || 0
  }

  /**
   * Gets persistence view.
   */
  public toPersistence() : TilePersistence[] {
    const result : TilePersistence[] = []
    getAllEnumValues(Tile).forEach(tile => {
      const count = this.count(tile)
      if (count > 0) {
        result.push({ tile, count })
      }
    })
    return result
  }

  /**
   * Creates a shuffled new card deck.
   * @param difficultyLevel DifficultyLevel
   */
  public static new() : BotTiles {
    return new BotTiles([])
  }

  /**
   * Re-creates from persistence.
   */
  public static fromPersistence(persistence : TilePersistence[]) : BotTiles {
    return new BotTiles(persistence)
  }

}
