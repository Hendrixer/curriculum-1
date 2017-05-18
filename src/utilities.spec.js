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

  describe('reduce', () => {
    it('should be a function', () => {
      expect(reduce).to.be.a('function')
    })

    it('should take a callback', () => {
      try {
        reduce(new CheatFreeArray(1), 'he')
      } catch(e) {
        expect(e.message).to.match(/is not a function/)
      }
    })

    it('should call the callback as many times are there are items', () => {
      let items = new CheatFreeArray()
      const cbSpy = sinon.spy()
      reduce(items, cbSpy)
      expect(cbSpy).to.not.have.called

      items = new CheatFreeArray(1, 2, 3)
      reduce(items, cbSpy)
      expect(cbSpy).to.have.callCount(3)
    })

    it('should have a default accumulator', () => {
      const items = new CheatFreeArray(1,2,3)
      const cbSpy = sinon.spy(a =>  a)
      let result = reduce(items, cbSpy)
      expect(result).to.equal(items[0])
    })

    it('should use given accumulator', () => {
      const items = new CheatFreeArray(1,2,3)
      const cbSpy = sinon.spy(a =>  a)
      const result = reduce(items, cbSpy, [])
      expect(result).not.to.equal(items[0])
    })

    it('should pass the callback the correct args', () => {
      const items = new CheatFreeArray(1,2,3)
      const cbSpy = sinon.spy(a => a + 1)
      reduce(items, cbSpy)

      const call1 = cbSpy.getCall(0)
      const call2 = cbSpy.getCall(1)
      const call3 = cbSpy.getCall(2)

      expect([call1.args[0], call1.args[1], call1.args[2]])
        .to.eql([1, 1, 0])

      expect([call2.args[0], call2.args[1], call2.args[2]])
        .to.eql([2, 2, 1])

      expect([call3.args[0], call3.args[1], call3.args[2]])
        .to.eql([3, 3, 2])

    })

    it('should compute the correct values', () => {
      const nums = [1,2,3]
      const strings = ['hello', 'there', user.first_name]
      
      expect(reduce(nums, (t, n) => t + n)).to.equal(7)
      expect(reduce(nums, (t, n) => t * n)).to.equal(6)
      expect(reduce(nums, (t, num) => [...t, num * 2], [])).to.eql([2,4,6])

      expect(reduce(strings, (t, s) => t += `${s} `, '')).to.equal(`hello there ${user.first_name} `)
    })
  })

  describe('filter', () => {
    it('should be a function', () => {
      expect(filter).to.be.a('function')
    })

    it('should take a callback', () => {
      try {
        filter(new CheatFreeArray(1), 'thisIsNotAFunction')
      } catch(e) {
        expect(e.message).to.match(/is not a function/)
      }
    })

    it('should not mutate the array', () => {
      const items = new CheatFreeArray(1,2,3)
      filter(items, Boolean)

      expect(items).to.have.length(3)
      expect(items[0]).to.equal(1)
      expect(items[1]).to.equal(2)
      expect(items[2]).to.equal(3)
    })

    it('should call the callback as many times are there are items', () => {
      let items = new CheatFreeArray()
      let cbSpy = sinon.spy()
      filter(items, cbSpy)
      expect(cbSpy).to.have.not.been.called

      cbSpy = sinon.spy()
      items = new CheatFreeArray(1,2,3)
      filter(items, cbSpy)
      expect(cbSpy).to.have.callCount(3)

      cbSpy = sinon.spy()
      items = new CheatFreeArray(1,2,3, undefined, null)
      filter(items, cbSpy)
      expect(cbSpy).to.have.callCount(5)
    })

    it('should call the callback with the correct args', () => {
      const items = new CheatFreeArray(1,2,3)
      const cbSpy = sinon.spy()
      filter(items, cbSpy)

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
    
    it('should ensure callback returns a boolean', () => {
      const items = new CheatFreeArray(1,2,3,4)

      const results = filter(items, num => num * 1) // not a boolean, but a number
      expect(results).to.eql([1,2,3,4])
    })

    it('should return a new array', () => {
      const items = new CheatFreeArray(1,2,3)

      const results = filter(items, Boolean)
      expect(results).to.not.equal(items)
    })
  })

  describe('every', () => {
    it('should be a function', () => {
      expect(every).to.be.a('function')
    })

    it('should take a callback', () => {
      try {
        every(new CheatFreeArray(1), 'thisIsNotAFunction')
      } catch(e) {
        expect(e.message).to.match(/is not a function/)
      }
    })

    it('should not mutate the array', () => {
      const items = new CheatFreeArray(1,2,3)
      every(items, Boolean)

      expect(items).to.have.length(3)
      expect(items[0]).to.equal(1)
      expect(items[1]).to.equal(2)
      expect(items[2]).to.equal(3)
    })


    it('should call the callback with the correct args', () => {
      const items = new CheatFreeArray(1,2,3)
      const cbSpy = sinon.spy(Boolean)
      every(items, cbSpy)

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
    
    it('should return a new array', () => {
      const items = new CheatFreeArray(1,2,3)

      const results = every(items, Boolean)
      expect(results).to.not.equal(items)
    })

    it('should return true if array is empty', () => {
      let cbSpy = sinon.spy()
      const result = every(new CheatFreeArray(), cbSpy)

      expect(result).to.be.true
      sinon.assert.callCount(cbSpy, 0)
    })

    it('should stop iteration if an item fails', () => {
      let items = new CheatFreeArray(1, 2, false, true)
      let cbSpy = sinon.spy(Boolean)
      let result = every(items, cbSpy)
      sinon.assert.callCount(cbSpy, 3)
      expect(result).to.be.false

      cbSpy = sinon.spy(Boolean)
      items = new CheatFreeArray(0,2,3)
      result = every(items, cbSpy)
      sinon.assert.callCount(cbSpy, 1)
      expect(result).to.be.false

      cbSpy = sinon.spy(Boolean)
      items = new CheatFreeArray(1,2,3, false)
      result = every(items, cbSpy)
      sinon.assert.callCount(cbSpy, 4)
      expect(result).to.be.false
    })

    it('should return a boolean', () => {
      expect(every(new CheatFreeArray(1), Boolean)).to.be.a('boolean')
    })
  })

  describe('flatten', () => {
    it('should be a function', () => {
      expect(flatten).to.be.a('function')
    })

    it('should always return a new array', () => {
      let array = new CheatFreeArray()
      let result = flatten(array)
      expect(result).to.be.an('array')
      expect(result).to.not.equal(array)

      array = new CheatFreeArray(new CheatFreeArray(), new CheatFreeArray())
      result = flatten(array)
      expect(result).to.not.equal(array)
    })

    it('should keep the same order', () => {
      let array = new CheatFreeArray(1, 2, new CheatFreeArray(3, 4), 5, new CheatFreeArray(6, 7))

      let result = flatten(array)
      expect(result).to.eql([1,2,3,4,5,6,7])
    })

    it('should handle arrays more than one level deep', () => {

      let array = [1, [2, [3, [4, [5]]]]]

      let result = flatten(array)
      expect(result).to.eql([1,2,3,4,5])
    })

    it('should not be more than 15 lines of code', () => {
      expect(flatten.toString().split('\n').length).to.be.lessThan(16)
    })
  })
})
