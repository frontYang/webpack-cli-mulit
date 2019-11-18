import './index.scss'
import axios from 'axios'

if (process.env === 'development') {
  axios({
    method: 'get',
    url: '/'
  }).then(function(response) {
    console.log(response)
  })
}

var ster = 'dsfsdf'
var a = 'dsfsdf'
var b = 'sdfsd'
console.log(a, ster, b)

const arr1 = [2, 222]
const arr2 = [3, 33, 2]

console.log([...arr1, ...arr2])
