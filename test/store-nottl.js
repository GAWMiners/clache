var should = require('should')
  , client = require('../')()
  , ttl = 1

describe('clache', function() {
  describe('store - without ttl', function() {
    describe('set', function() {
      it('should set a value', function(done) {
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

    describe('del', function() {
      it('should delete a value', function(done) {
        var key = 'gawcache_tests_set'
        client.del(key, function(err) {
          if (err) return done(err)
          done()
        })
      })
    })
  })
})
