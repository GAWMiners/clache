var should = require('should')
  , Cache = require('../')
  , ttl = 1

describe('clache', function() {
  describe('wrap', function() {
    var cache = new Cache({
      ttl: ttl
    })
    var actualCalls = 0
      , cachedCalls = 0
    function getUser(id, cb) {
      actualCalls++
      setTimeout(function() {
        cb(null, {
          id: 1,
          name: 'Evan'
        })
      }, ttl*cachedCalls*1000)
    }

    function getCachedUser(id, cb) {
      cachedCalls++
      var key = 'clache_tests_wrap'
      cache.wrap(key, function(cb) {
        getUser(id, cb)
      }, cb)
    }

    it('should cache the results', function(done) {
      this.timeout(20000)
      var count = 0
      function end(err) {
        count++
        if (err) return done(err)
        if (count === 3) {
          actualCalls.should.equal(2)
          cachedCalls.should.equal(3)
          done()
        }
      }

      getCachedUser(1, end)

      setTimeout(function() {
        getCachedUser(1, end)
      }, 600)

      setTimeout(function() {
        getCachedUser(1, end)
      }, 1200)
    })
  })
})
