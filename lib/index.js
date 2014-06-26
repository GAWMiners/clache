/**
 * Module dependencies
 */
var cache_manager = require('cache-manager')
  , redis_store = require('./cache-store')
  , debug = require('debug')('clache')

// Expose module.exports
module.exports = clache

/**
 * Contructor
 *
 * Example
 *
 * ```js
 * var opts = {
 *   ttl: 100 // in seconds
 * , host: '127.0.0.1'
 * , port: 6379
 * , password: null
 * }
 * var cache = new clache(opts)
 * ```
 *
 * @param {Object} opts The options object
 * @api public
 */
function clache(opts) {
  if (!(this instanceof clache))
    return new clache(opts)

  opts = opts || {}
  debug('starting clache with opts %j', opts)
  opts.store = redis_store
  this.cache = cache_manager.caching(opts)
}

/**
 * Wrap an asynchronous function and cache it
 *
 * Example
 *
 * ```js
 * function find(cb) {
 *   return cb(null, { id: 1, name: 'evan' })
 * }
 *
 * var id = '1234'
 * clache.wrap('user_'+id, find, function(err, results) {
 *   if (err) throw err
 *   console.log(results)
 * })
 * ```
 *
 * @param {String} key The key
 * @param {Function} work The work function
 * @param {Function} cb function(err, res)
 * @api public
 */
clache.prototype.wrap = function(key, work, cb) {
  debug('wrap %s', key)
  this.cache.wrap.call(this, key, work, cb)
}

/**
 * Set _val_ for the given _key_
 *
 * @param {String} key The key
 * @param {String|Number|Boolean|Array|Object} val The value
 * @param {Function} cb function(err, res)
 * @api public
 */
clache.prototype.set = function(key, val, cb) {
  debug('set %s %j', key, val)
  this.cache.set.call(this, key, val, cb)
}

/**
 * Set _val_ for the given _key_ with _ttl_
 *
 * @param {String} key The key
 * @param {Number} ttl The ttl
 * @param {String|Number|Boolean|Array|Object} val The value
 * @param {Function} cb function(err, res)
 * @api public
 */
clache.prototype.setex = function(key, ttl, val, cb) {
  debug('setex %s %d %j', key, ttl, val)
  this.cache.setex.call(this, key, ttl, val, cb)
}

/**
 * Get the value for the given _key_
 *
 * @param {String} key The key
 * @param {Function} cb function(err, res)
 * @api public
 */
clache.prototype.get = function(key, cb) {
  debug('get %s', key)
  this.cache.get.call(this, key, cb)
}

/**
 * Deletes the value for the given _key_
 *
 * @param {String} key The key
 * @param {Function} cb function(err, res)
 * @api public
 */
clache.prototype.del = function(key, cb) {
  debug('del %s', key)
  this.cache.del.call(this, key, cb)
}
