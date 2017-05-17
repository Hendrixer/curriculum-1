require('source-map-support/register')
const chai = require('chai')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const methods = [
  'reduce',
  'forEach',
  'map',
  'find',
  'findIndex',
  'filter',
  'every'
]

global.expect = chai.expect
global.sinon = require('sinon')
global.CheatFreeArray = class extends Array {
  constructor(...args) {
    super(...args)
  }
  reduce(){throw new Error('No Cheating!')}
  forEach(){throw new Error('No Cheating!')}
  map(){throw new Error('No Cheating!')}
  find(){throw new Error('No Cheating!')}
  findIndex(){throw new Error('No Cheating!')}
  filter(){throw new Error('No Cheating!')}
  every(){throw new Error('No Cheating!')}
} 

