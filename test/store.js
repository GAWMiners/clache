var should = require('should')
  , Cache = require('../')
  , ttl = 1

describe('clache', function() {
  describe('store - with ttl', function() {
    describe('set', function() {
      it('should set a value', function(done) {
        var client = new Cache({
          ttl: ttl
        })
        var key = 'gawcache_tests_set'
        client.set(key, 'evan', function(err) {
          if (err) return done(err)
          client.get(key, function(err, val) {
            if (err) return done(err)
            val.should.equal('evan')
            done()
          })
        })
      })
    })
  })
})
