import CardDeck from '@/services/CardDeck'
import { expect } from 'chai'

describe('services/CardDeck', () => {
  it('new', () => {
    const deck = CardDeck.new()

    expect(deck.actionCard, 'actionCard').to.undefined
    expect(deck.supportCard, 'supportCard').to.not.undefined
    expect(deck.pile.length, 'pile').to.eq(14)
    expect(deck.discard.length, 'discard').to.eq(0)

    const persistence = deck.toPersistence()
    expect(persistence.pile.length, 'pile').to.eq(14)
    expect(persistence.discard.length, 'discard').to.eq(0)
  })

  it('draw', () => {
    const deck = CardDeck.fromPersistence({pile:[1,2,3],discard:[]})

    deck.draw()
    expect(deck.actionCard?.id, 'actionCard').to.eq(1)
    expect(deck.supportCard?.id, 'supportCard').to.eq(2)
    expect(deck.pile.length, 'pile').to.eq(2)

    deck.draw()
    expect(deck.actionCard?.id, 'actionCard').to.eq(2)
    expect(deck.supportCard?.id, 'supportCard').to.eq(3)
    expect(deck.pile.length, 'pile').to.eq(1)

    deck.draw()  // deck is reshuffled
    expect(deck.actionCard, 'actionCard').to.not.undefined
    expect(deck.supportCard, 'supportCard').to.not.undefined
    expect(deck.pile.length, 'pile').to.eq(2)
  })

})
