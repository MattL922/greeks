/**
 * Calculation of option greeks.
 * See {@link http://en.wikipedia.org/wiki/Black%E2%80%93Scholes_model#The_Greeks|Wikipedia}
 * @module greeks
 * @author Matt Loppatto
 * @copyright 2014 Matt Loppatto
 */

var bs = require("black-scholes");

/**
 * Standard normal density function.
 *
 * @private
 * @param {Number} x The value to calculate the standard normal density of
 * @returns {Number} The value of the standard normal density function at x
 */
function _stdNormDensity(x)
{
  return Math.pow(Math.E, -1 * Math.pow(x, 2) / 2) / Math.sqrt(2 * Math.PI);
}

/**
 * Calculates the delta of an option.
 *
 * @param {Number} s Current price of the underlying
 * @param {Number} k Strike price
 * @param {Number} t Time to experiation in years
 * @param {Number} v Volatility as a decimal
 * @param {Number} r Anual risk-free interest rate as a decimal
 * @param {String} callPut The type of option - "call" or "put"
 * @returns {Number} The delta of the option
 */
function getDelta(s, k, t, v, r, callPut)
{
  if(callPut === "call")
  {
    return _callDelta(s, k, t, v, r);
  }
  else // put
  {
    return _putDelta(s, k, t, v, r);
  }
}

/**
 * Calculates the delta of a call option.
 *
 * @private
 * @param {Number} s Current price of the underlying
 * @param {Number} k Strike price
 * @param {Number} t Time to experiation in years
 * @param {Number} v Volatility as a decimal
 * @param {Number} r Anual risk-free interest rate as a decimal
 * @returns {Number} The delta of the call option
 */
function _callDelta(s, k, t, v, r)
{
  var w = bs.getW(s, k, t, v, r);
  var delta = null;
  if(!isFinite(w))
  {
    delta = (s > k) ? 1 : 0;
  }
  else
  {
    delta = bs.stdNormCDF(w);
  }
  return delta;
}

/**
 * Calculates the delta of a put option.
 *
 * @private
 * @param {Number} s Current price of the underlying
 * @param {Number} k Strike price
 * @param {Number} t Time to experiation in years
 * @param {Number} v Volatility as a decimal
 * @param {Number} r Anual risk-free interest rate as a decimal
 * @returns {Number} The delta of the put option
 */
function _putDelta(s, k, t, v, r)
{
  var delta = _callDelta(s, k, t, v, r) - 1;
  return (delta == -1 && k == s) ? 0 : delta;
}

/**
 * Calculates the rho of an option.
 *
 * @param {Number} s Current price of the underlying
 * @param {Number} k Strike price
 * @param {Number} t Time to experiation in years
 * @param {Number} v Volatility as a decimal
 * @param {Number} r Anual risk-free interest rate as a decimal
 * @param {String} callPut The type of option - "call" or "put"
 * @param {String} [scale=100] The value to scale rho by (100=100BPS=1%, 10000=1BPS=.01%)
 * @returns {Number} The rho of the option
 */
function getRho(s, k, t, v, r, callPut, scale)
{
  scale = scale || 100;
  if(callPut === "call")
  {
    return _callRho(s, k, t, v, r) / scale;
  }
  else // put
  {
    return _putRho(s, k, t, v, r) / scale;
  }
}

/**
 * Calculates the rho of a call option.
 *
 * @private
 * @param {Number} s Current price of the underlying
 * @param {Number} k Strike price
 * @param {Number} t Time to experiation in years
 * @param {Number} v Volatility as a decimal
 * @param {Number} r Anual risk-free interest rate as a decimal
 * @returns {Number} The rho of the call option
 */
function _callRho(s, k, t, v, r)
{
  var w = bs.getW(s, k, t, v, r);
  if(!isNaN(w))
  {
    return k * t * Math.pow(Math.E, -1 * r * t) * bs.stdNormCDF(w - v * Math.sqrt(t));
  }
  else
  {
    return 0;
  }
}

/**
 * Calculates the rho of a put option.
 *
 * @private
 * @param {Number} s Current price of the underlying
 * @param {Number} k Strike price
 * @param {Number} t Time to experiation in years
 * @param {Number} v Volatility as a decimal
 * @param {Number} r Anual risk-free interest rate as a decimal
 * @returns {Number} The rho of the put option
 */
function _putRho(s, k, t, v, r)
{
  var w = bs.getW(s, k, t, v, r);
  if(!isNaN(w))
  {
    return -1 * k * t * Math.pow(Math.E, -1 * r * t) * bs.stdNormCDF(v * Math.sqrt(t) - w);
  }
  else
  {
    return 0;
  }
}

/**
 * Calculates the vega of a call and put option.
 *
 * @param {Number} s Current price of the underlying
 * @param {Number} k Strike price
 * @param {Number} t Time to experiation in years
 * @param {Number} v Volatility as a decimal
 * @param {Number} r Anual risk-free interest rate as a decimal
 * @returns {Number} The vega of the option
 */
function getVega(s, k, t, v, r)
{
  var w = bs.getW(s, k, t, v, r);
  return (isFinite(w)) ? (s * Math.sqrt(t) * _stdNormDensity(w) / 100) : 0;
}

/**
 * Calculates the theta of an option.
 *
 * @param {Number} s Current price of the underlying
 * @param {Number} k Strike price
 * @param {Number} t Time to experiation in years
 * @param {Number} v Volatility as a decimal
 * @param {Number} r Anual risk-free interest rate as a decimal
 * @param {String} callPut The type of option - "call" or "put"
 * @param {String} [scale=365] The number of days to scale theta by - usually 365 or 252
 * @returns {Number} The theta of the option
 */
function getTheta(s, k, t, v, r, callPut, scale)
{
  scale = scale || 365;
  if(callPut === "call")
  {
    return _callTheta(s, k, t, v, r) / scale;
  }
  else // put
  {
    return _putTheta(s, k, t, v, r) / scale;
  }
}

/**
 * Calculates the theta of a call option.
 *
 * @private
 * @param {Number} s Current price of the underlying
 * @param {Number} k Strike price
 * @param {Number} t Time to experiation in years
 * @param {Number} v Volatility as a decimal
 * @param {Number} r Anual risk-free interest rate as a decimal
 * @returns {Number} The theta of the call option
 */
function _callTheta(s, k, t, v, r)
{
  var w = bs.getW(s, k, t, v, r);
  if(isFinite(w))
  {
    return -1 * v * s * _stdNormDensity(w) / (2 * Math.sqrt(t)) - k * r * Math.pow(Math.E, -1 * r * t) * bs.stdNormCDF(w - v * Math.sqrt(t));
  }
  else
  {
    return 0;
  }
}

/**
 * Calculates the theta of a put option.
 *
 * @private
 * @param {Number} s Current price of the underlying
 * @param {Number} k Strike price
 * @param {Number} t Time to experiation in years
 * @param {Number} v Volatility as a decimal
 * @param {Number} r Anual risk-free interest rate as a decimal
 * @returns {Number} The theta of the put option
 */
function _putTheta(s, k, t, v, r)
{
  var w = bs.getW(s, k, t, v, r);
  if(isFinite(w))
  {
    return -1 * v * s * _stdNormDensity(w) / (2 * Math.sqrt(t)) + k * r * Math.pow(Math.E, -1 * r * t) * bs.stdNormCDF(v * Math.sqrt(t) - w);
  }
  else
  {
    return 0;
  }
}

/**
 * Calculates the gamma of a call and put option.
 *
 * @param {Number} s Current price of the underlying
 * @param {Number} k Strike price
 * @param {Number} t Time to experiation in years
 * @param {Number} v Volatility as a decimal
 * @param {Number} r Anual risk-free interest rate as a decimal
 * @returns {Number} The gamma of the option
 */
function getGamma(s, k, t, v, r)
{
  var w = bs.getW(s, k, t, v, r);
  return (isFinite(w)) ? (_stdNormDensity(w) / (s * v * Math.sqrt(t))) : 0;
}

module.exports = {
  getDelta: getDelta,
  getVega: getVega,
  getGamma: getGamma,
  getTheta: getTheta,
  getRho: getRho
};
