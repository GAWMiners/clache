# clache
[![Build Status](https://circleci.com/gh/GAWMiners/clache.png?circle-token=130880dd46e2636fb09deca068aac8b183d4fd8e)](https://circleci.com/gh/GAWMiners/clache)
[![Coverage Status](https://coveralls.io/repos/GAWMiners/clache/badge.png?branch=master)](https://coveralls.io/r/GAWMiners/clache?branch=master)

### Author
Evan Lucas

### License
MIT

## Installation
```bash
$ npm install --save clache
```

## Tests
```bash
$ npm test
```

## Coverage
```bash
$ npm run cover
```

## API

### clache()

Contructor

Example

```js
var opts = {
  ttl: 100 // in seconds
, host: '127.0.0.1'
, port: 6379
, password: null
}
var cache = new clache(opts)
```

##### Params
| Name | Type(s) | Description |
| ---- | ------- | ----------- |
| opts | Object | The options object |


***

### clache.wrap()

Wrap an asynchronous function and cache it

Example

```js
function find(cb) {
  return cb(null, { id: 1, name: 'evan' })
}

var id = '1234'
clache.wrap('user_'+id, find, function(err, results) {
  if (err) throw err
  console.log(results)
})
```

##### Params
| Name | Type(s) | Description |
| ---- | ------- | ----------- |
| key | String | The key |
| work | Function | The work function |
| cb | Function | function(err, res) |


***

### clache.set()

Set _val_ for the given _key_

##### Params
| Name | Type(s) | Description |
| ---- | ------- | ----------- |
| key | String | The key |
| val | String, Number, Boolean, Array, Object | The value |
| cb | Function | function(err, res) |


***

### clache.setex()

Set _val_ for the given _key_ with _ttl_

##### Params
| Name | Type(s) | Description |
| ---- | ------- | ----------- |
| key | String | The key |
| ttl | Number | The ttl |
| val | String, Number, Boolean, Array, Object | The value |
| cb | Function | function(err, res) |


***

### clache.get()

Get the value for the given _key_

##### Params
| Name | Type(s) | Description |
| ---- | ------- | ----------- |
| key | String | The key |
| cb | Function | function(err, res) |


***

### clache.del()

Deletes the value for the given _key_

##### Params
| Name | Type(s) | Description |
| ---- | ------- | ----------- |
| key | String | The key |
| cb | Function | function(err, res) |


***
