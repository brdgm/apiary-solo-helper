import BotTiles from '@/services/BotTiles'
import Tile from '@/services/enum/Tile'
import { expect } from 'chai'

describe('services/BotTiles', () => {
  it('newAddCount', () => {
    const tiles = BotTiles.new()

    expect(tiles.count(Tile.FARM)).to.eq(0)
    expect(tiles.count(Tile.DEVELOPMENT)).to.eq(0)

    tiles.add(Tile.FARM)
    tiles.add(Tile.RECRUIT)

    expect(tiles.count(Tile.FARM)).to.eq(1)
    expect(tiles.count(Tile.DEVELOPMENT)).to.eq(0)

    tiles.add(Tile.FARM)
    tiles.add(Tile.DEVELOPMENT)

    expect(tiles.count(Tile.FARM)).to.eq(2)
    expect(tiles.count(Tile.DEVELOPMENT)).to.eq(1)

    const persistence = tiles.toPersistence()
    expect(persistence).to.eql([{tile: Tile.FARM, count: 2}, {tile: Tile.RECRUIT, count: 1}, {tile: Tile.DEVELOPMENT, count: 1}])
  })

  it('fromPersistence', () => {
    const tiles = BotTiles.fromPersistence([{tile: Tile.FARM, count: 5}, {tile: Tile.DEVELOPMENT, count: 2}])

    expect(tiles.count(Tile.FARM)).to.eq(5)
    expect(tiles.count(Tile.DEVELOPMENT)).to.eq(2)
  })

})
