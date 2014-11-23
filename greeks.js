/**
 * Calculation of option greeks.
 * @module
 * @author Matt Loppatto
 */

 var bs = require("black-scholes");

 function _phiPrime(x)
 {
   return Math.pow(Math.E, -1 * Math.pow(x, 2) / 2) / Math.sqrt(2 * Math.PI);
 }

 function callDelta(s, k, t, v, r)
 {
   var w = bs.getW(s, k, t, v, r);
   return bs.stdNormCDF(w);
 }

 function putDelta(s, k, t, v, r)
 {
   return 1 - callDelta(s, k, t, v, r);
 }

function callRho(s, k, t, v, r)
{
  return k * t * Math.pow(Math.E, -1 * r * t) * bs.stdNormCDF(bs.getW(s, k, t, v, r) - v * Math.sqrt(t));
}

function callVega(s, k, t, v, r)
{
  return s * Math.sqrt(t) * _phiPrime(bs.getW(s, k, t, v, r));
}

function callTheta(s, k, t, v, r)
{
  var w = bs.getW(s, k, t, v, r);
  return v * s * _phiPrime(w) / (2 * Math.sqrt(t)) + k * r * Math.pow(Math.E, -1 * r * t) * bs.stdNormCDF(w - v * Math.sqrt(t));
}
