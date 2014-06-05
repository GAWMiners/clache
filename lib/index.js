/**
 * Module dependencies
 */
var cache_manager = require('cache-manager')
  , redis_store = require('./cache-store')

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
  opts.store = redis_store
  opts.db = opts.db || 0
  this.cache = cache_manager.caching(opts)
}

/**
 * Wrap an asynchronous function and cache it
 *
 * @param {String} key The key
 * @param {Function} work The work function
 * @param {Function} cb function(err, res)
 * @api public
 */
clache.prototype.wrap = function(key, work, cb) {
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
  this.cache.set.call(this, key, val, cb)
}

/**
 * Get the value for the given _key_
 *
 * @param {String} key The key
 * @param {Function} cb function(err, res)
 * @api public
 */
clache.prototype.get = function(key, cb) {
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
  this.cache.del.call(this, key, cb)
}
