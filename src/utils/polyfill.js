import "es5-shim"
import "es5-shim/es5-sham"
import "babel/polyfill"

import "whatwg-fetch"

import assign from "object-assign"

if(typeof Object.assign !== "function") {
  Object.assign = assign
}
