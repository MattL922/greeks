greeks
======

Calculations of option greeks - delta, gamma, theta, vega, rho

**Common parameters**
- **s** - Current price of the underlying
- **k** - Strike price
- **t** - Time to expiration in years
- **v** - Volatility as a decimal
- **r** - Annual risk-free interest rate as a decimal
- **callPut** - The type of option to be priced - "call" or "put"
- **[scale]** - The value to scale a return value by

**Usage**
```
var greeks = require("greeks");

// Delta

greeks.getDelta(100, 100, .086, .1, .0015, "call"); // 0.5076040742445566
greeks.getDelta(100, 100, .086, .1, .0015, "put"); // -0.49239592575544344

// Gamma - call and put gammas are equal at a given strike

greeks.getGamma(206.35, 206, .086, .1, .0015); // 0.06573105549942765

// Vega - call and put vegas are equal at a given strike
// Note: vega is calculated per 1 percentage point change in volatility

greeks.getVega(206.35, 206, .086, .1, .0015); // 0.24070106056306836

// Theta - the default scale is 365 (days per year)

greeks.getTheta(206.35, 206, .086, .1, .0015, "call"); // -0.03877971361524501
greeks.getTheta(206.35, 206, .086, .1, .0015, "put"); // -0.0379332474739548

// or you can set the scale to a value like 252 (trading days per year)

greeks.getTheta(206.35, 206, .086, .1, .0015, "call", 252); // -0.05616902964112869
greeks.getTheta(206.35, 206, .086, .1, .0015, "put", 252); // -0.054942997333307556

// Rho - the default scale is 100 (rho per 1%, or 100BP, change in the risk-free interest rate)

greeks.getRho(206.35, 206, .086, .1, .0015, "call"); // 0.09193271711465777
greeks.getRho(206.35, 206, .086, .1, .0015, "put"); // -0.08520443071933861

// or you can set the scale to a value like 10000 (rho per .01%, or 1BP, change in the risk-free interest rate)

greeks.getRho(206.35, 206, .086, .1, .0015, "call", 10000); // 0.0009193271711465777
greeks.getRho(206.35, 206, .086, .1, .0015, "put", 10000); // -0.0008520443071933862
```
