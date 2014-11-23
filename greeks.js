/**
 * Calculation of option greeks.
 * @module
 * @author Matt Loppatto
 */

 var bs = require("black-scholes");

 function callDelta(s, k, t, v, r)
 {
   var w = bs.getW(s, k, t, v, r);
   return bs.stdNormCDF(w);
 }

 function putDelta(s, k, t, v, r)
 {
   return 1 - callDelta(s, k, t, v, r);
 }
