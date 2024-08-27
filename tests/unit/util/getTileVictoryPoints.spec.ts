import Tile from '@/services/enum/Tile'
import getTileVictoryPoints from '@/util/getTileVictoryPoints'
import { expect } from 'chai'

describe('util/getTileVictoryPoints', () => {
  it('standard', () => {
    expect(getTileVictoryPoints(Tile.FARM, false)).to.eq(1)
    expect(getTileVictoryPoints(Tile.RECRUIT, false)).to.eq(2)
    expect(getTileVictoryPoints(Tile.DEVELOPMENT, false)).to.eq(3)
    expect(getTileVictoryPoints(Tile.CARVING, false)).to.eq(7)
    expect(getTileVictoryPoints(Tile.EXPLORE, false)).to.eq(3)
  })

  it('expert', () => {
    expect(getTileVictoryPoints(Tile.FARM, true)).to.eq(2)
    expect(getTileVictoryPoints(Tile.RECRUIT, true)).to.eq(3)
    expect(getTileVictoryPoints(Tile.DEVELOPMENT, true)).to.eq(4)
    expect(getTileVictoryPoints(Tile.CARVING, true)).to.eq(7)
    expect(getTileVictoryPoints(Tile.EXPLORE, true)).to.eq(4)
  })
})
