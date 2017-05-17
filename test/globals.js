require('source-map-support/register')
const chai = require('chai')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const methods = [
  'reduce',
  'forEach',
  'map',
  'filter',
  'every',
  'unique',
  'some'
]

global.expect = chai.expect
global.sinon = require('sinon')

global.CheatFreeArray = class extends Array {
  constructor(...args) {
    super(...args)
    methods.forEach(method => {
      this[method] = function() {throw new Error('No Cheating! Cannot use the native method')}
    })
  }
} 

