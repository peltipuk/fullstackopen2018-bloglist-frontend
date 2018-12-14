import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    //console.log('FOOBAR')
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: savedItems = {},
}

/*
console.log('window.localStorage', window.localStorage)
Object.defineProperty(window, 'localStorage', {
  get: function () {
    console.log('Getting localstorage')
    return this.localStorageValue
    //return this._localStorage
  },
  set: function (value) {
    console.log('Setting localstorage', value)
    this.localStorageValue = value
    //this._localStorage = value
  }
})
*/

Object.getOwnPropertyDescriptor(window, 'localStorage').get.toString()
window.localStorage = localStorageMock
