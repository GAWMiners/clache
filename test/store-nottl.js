var should = require('should')
  , client = require('../')()

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

    describe('using setex', function() {
      it('should store the value for the ttl', function(done) {
        var key = 'clache_tests_ttl_set'
        client.setex(key, 1, 'evan', function(err, result) {
          if (err) return done(err)
          should.exist(result)
          result.should.equal('OK')
          client.get(key, function(err, out) {
            if (err) return done(err)
            should.exist(out)
            out.should.be.type('string', 'evan')
            wait()
          })
        })

        function wait() {
          setTimeout(function() {
            client.get(key, function(err, out) {
              if (err) return done(err)
              should.not.exist(out)
              done()
            })
          }, 1100)
        }
      })
    })
  })
})
