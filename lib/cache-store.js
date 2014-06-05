var RedisPool = require('sol-redis-pool')
  , util = require('util')

// host, port, password, ttl, db
function redis_store(opts) {
  opts = opts || {}
  var self = this
  var ttl = opts.ttl || null
  var host = opts.host || '127.0.0.1'
  var port = opts.port || 6379
  opts.redis_options = opts || {}
  if (opts.password) opts.redis_options.auth_pass = opts.password
  self.name = 'redis'
  var pool = new RedisPool({
    redis_host: host
  , redis_port: port
  , redis_options: opts.redis_options
  })

  function connect(cb) {
    pool.acquire(function(err, conn) {
      if (err) {
        pool.release(conn)
        return cb(err)
      }

      if (opts.hasOwnProperty('db')) {
        conn.select(opts.db)
      }
      cb(null, conn)
    })
  }

  self.get = function(key, cb) {
    connect(function(err, conn) {
      if (err) return cb && cb(err)
      conn.get(key, function(err, result) {
        pool.release(conn)
        if (err) return cb && cb(err)
        cb && cb(null, JSON.parse(result))
      })
    })
  }

  self.set = function(key, val, cb) {
    connect(function(err, conn) {
      if (err) return cb && cb(err)
      if (ttl) {
        conn.setex(key, ttl, JSON.stringify(val), function(err, result) {
          pool.release(conn)
          cb && cb(err, result)
        })
      } else {
        conn.set(key, JSON.stringify(val), function(err, result) {
          pool.release(conn)
          cb && cb(err, result)
        })
      }
    })
  }

  self.del = function(key, cb) {
    connect(function(err, conn) {
      if (err) return cb && cb(err)
      conn.del(key, function(err, result) {
        pool.release(conn)
        cb && cb(err, result)
      })
    })
  }

  return self
}

module.exports = {
  create: function(args) {
    return redis_store(args)
  }
}
