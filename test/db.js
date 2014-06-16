var should = require('should')
  , Cache = require('../')
describe('db', function() {
  it('should work with a different db', function(done) {
    var client = new Cache({
      db: 2
    })
    client.set('blah', 'test', function(err) {
      if (err) return done(err)
      var c2 = new Cache({
        db: 3
      })
      c2.get('blah', function(err, res) {
        if (err) return done(err)
        should.not.exist(res)
        client.del('blah', done)
      })
    })

  })
})
