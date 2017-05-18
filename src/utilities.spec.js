import {
  each,
  map,
  reduce,
  filter,
  every,
  flatten
} from './utilities'
import {expect} from 'chai'
const user = require('../training.json')

describe('Utilities', () => {
  describe('each', () => {

    it('should be a function', () => {
      expect(each).to.be.a('function')
    })

    it('should not mutate the array', () => {
      const items = new CheatFreeArray(1,2,3)
      each(items, () => {})

      expect(items).to.have.length(3)
      expect(items[0]).to.equal(1)
      expect(items[1]).to.equal(2)
      expect(items[2]).to.equal(3)
    })

    it('should not return anything', () => {
      const result = each(new CheatFreeArray(1), () => {return 1})
      expect(result).to.be.undefined
    })

    it('should take a callback', () => {
      try {
        each(new CheatFreeArray(1), 'he')
      } catch(e) {
        expect(e.message).to.match(/is not a function/)
      }
    })

    it('should call the callback as many times are there are items', () => {
      let items = new CheatFreeArray()
      const cbSpy = sinon.spy()
      each(items, cbSpy)
      expect(cbSpy).to.have.not.been.called

      items = new CheatFreeArray(1,2,3)
      each(items, cbSpy)
      expect(cbSpy).to.have.callCount(3)
    })

    it('should call the callback with the correct args', () => {
      const items = new CheatFreeArray(1,2,3)
      const cbSpy = sinon.spy()
      each(items, cbSpy)

      const call1 = cbSpy.getCall(0)
      const call2 = cbSpy.getCall(1)
      const call3 = cbSpy.getCall(2)

      expect([call1.args[0], call1.args[1], call1.args[2]])
        .to.eql([1, 0, items])

      expect([call2.args[0], call2.args[1], call2.args[2]])
        .to.eql([2, 1, items])

      expect([call3.args[0], call3.args[1], call3.args[2]])
        .to.eql([3, 2, items])

    })
  })

  describe('map', () => {
    it('should be a function', () => {
      expect(map).to.be.a('function')
    })

    it('should not mutate the array', () => {
      const items = new CheatFreeArray(1,2,3)
      map(items, () => {})

      expect(items).to.have.length(3)
      expect(items[0]).to.equal(1)
      expect(items[1]).to.equal(2)
      expect(items[2]).to.equal(3)
    })

    it('should return a new array', () => {
      const array = new CheatFreeArray(1)
      const result = map(array, () => 1)
      expect(array).to.not.equal(result)
    })

    it('should take a callback', () => {
      try {
        map(new CheatFreeArray(1), 'he')
      } catch(e) {
        expect(e.message).to.match(/is not a function/)
      }
    })

    it('should call the callback as many times are there are items', () => {
      let items = new CheatFreeArray()
      const cbSpy = sinon.spy()
      map(items, cbSpy)
      expect(cbSpy).to.have.not.been.called

      items = new CheatFreeArray(1,2,3)
      map(items, cbSpy)
      expect(cbSpy).to.have.callCount(3)
    })

    it('should apply the updates from the callback', () => {
      const items = new CheatFreeArray(1,2,3)
      const results = map(items, item => item * 2)

      expect(results).to.eql([2,4,6])
    })
  })
})
