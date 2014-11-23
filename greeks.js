/**
 * Calculation of option greeks.
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
 * @param {String} callPut The type of option to be priced - "call" or "put"
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
  return bs.stdNormCDF(w);
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
  return 1 - callDelta(s, k, t, v, r);
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
  return k * t * Math.pow(Math.E, -1 * r * t) * bs.stdNormCDF(bs.getW(s, k, t, v, r) - v * Math.sqrt(t));
}

/**
 * Calculates the vega of a call option.
 *
 * @private
 * @param {Number} s Current price of the underlying
 * @param {Number} k Strike price
 * @param {Number} t Time to experiation in years
 * @param {Number} v Volatility as a decimal
 * @param {Number} r Anual risk-free interest rate as a decimal
 * @returns {Number} The vega of the call option
 */
function _callVega(s, k, t, v, r)
{
  return s * Math.sqrt(t) * _stdNormDensity(bs.getW(s, k, t, v, r));
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
  return v * s * _stdNormDensity(w) / (2 * Math.sqrt(t)) + k * r * Math.pow(Math.E, -1 * r * t) * bs.stdNormCDF(w - v * Math.sqrt(t));
}
