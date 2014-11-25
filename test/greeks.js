var greeks = require("../greeks.js"),
    assert = require("assert");


/*
 * Calculations verified using CBOE's option pricing calculator:
 * http://www.cboe.com/framed/IVolframed.aspx?content=http%3a%2f%2fcboe.ivolatility.com%2fcalc%2findex.j%3fcontract%3d3AF7E2E8-2B92-4866-8D4A-92FDCD5DF873&sectionName=SEC_TRADING_TOOLS&title=CBOE%20-%20IVolatility%20Services
 */
describe("Greeks", function()
{
  describe("Delta", function()
  {
    it("should return ~50", function()
    {
      assert.equal(greeks.getDelta(100, 100, .086, .1, .0015, "call"), 0.5076040742445566);
      assert.equal(greeks.getDelta(100, 100, .086, .1, .0015, "put"), -0.49239592575544344);
    });
    it("should return 0", function()
    {
      assert.equal(greeks.getDelta(100, 100, 0, .1, .0015, "call"), 0);
      assert.equal(greeks.getDelta(99.99, 100, 0, .1, .0015, "call"), 0);
      assert.equal(greeks.getDelta(100, 100, 0, .1, .0015, "put"), 0);
      assert.equal(greeks.getDelta(100.01, 100, 0, .1, .0015, "put"), 0);
      assert.equal(greeks.getDelta(100, 100, .1, 0, .0015, "call"), 0);
      assert.equal(greeks.getDelta(99.99, 100, .1, 0, .0015, "call"), 0);
      assert.equal(greeks.getDelta(100, 100, .1, 0, .0015, "put"), 0);
      assert.equal(greeks.getDelta(100.01, 100, .1, 0, .0015, "put"), 0);
      assert.equal(greeks.getDelta(100, 100, 0, 0, .0015, "call"), 0);
      assert.equal(greeks.getDelta(99.99, 100, 0, 0, .0015, "call"), 0);
      assert.equal(greeks.getDelta(100, 100, 0, 0, .0015, "put"), 0);
      assert.equal(greeks.getDelta(100.01, 100, 0, 0, .0015, "put"), 0);
    });
    it("should return 1 for calls, -1 for puts", function()
    {
      assert.equal(greeks.getDelta(100.01, 100, 0, .1, .0015, "call"), 1);
      assert.equal(greeks.getDelta(99.99, 100, 0, .1, .0015, "put"), -1);
      assert.equal(greeks.getDelta(100.01, 100, .1, 0, .0015, "call"), 1);
      assert.equal(greeks.getDelta(99.99, 100, .1, 0, .0015, "put"), -1);
      assert.equal(greeks.getDelta(100.01, 100, 0, 0, .0015, "call"), 1);
      assert.equal(greeks.getDelta(99.99, 100, 0, 0, .0015, "put"), -1);
    });
  }); // end delta
  describe("Vega", function()
  {
    it("should return ~.24", function()
    {
      assert.equal(greeks.getVega(206.35, 206, .086, .1, .0015), 0.24070106056306836);
    });
    it("should return 0", function()
    {
      assert.equal(greeks.getVega(100, 100, 0, .1, .0015), 0);
      assert.equal(greeks.getVega(100, 100, 0, 0, .0015), 0);
      assert.equal(greeks.getVega(100, 100, .1, 0, .0015), 0);
    });
  }); // end vega
  describe("Gamma", function()
  {
    it("should return ~.065", function()
    {
      assert.equal(greeks.getGamma(206.35, 206, .086, .1, .0015), 0.06573105549942765);
    });
    it("should return 0", function()
    {
      assert.equal(greeks.getGamma(100, 100, 0, .1, .0015), 0);
      assert.equal(greeks.getGamma(100, 100, .1, 0, .0015), 0);
      assert.equal(greeks.getGamma(100, 100, 0, 0, .0015), 0);
    });
  }); // end gamma
  describe("Theta", function()
  {
    it("should return non-zero theta", function()
    {
      assert.equal(greeks.getTheta(206.35, 206, .086, .1, .0015, "call"), -0.03877971361524501);
      assert.equal(greeks.getTheta(206.35, 206, .086, .1, .0015, "put"), -0.0379332474739548);
      assert.equal(greeks.getTheta(206.35, 206, .086, .1, .0015, "call", 252), -0.05616902964112869);
      assert.equal(greeks.getTheta(206.35, 206, .086, .1, .0015, "put", 252), -0.054942997333307556);
    });
    it("should return 0", function()
    {
      assert.equal(greeks.getTheta(100, 100, 0, .1, .0015, "call"), 0);
      assert.equal(greeks.getTheta(100, 100, 0, .1, .0015, "put"), 0);
      assert.equal(greeks.getTheta(100, 100, 0, .1, .0015, "call", 252), 0);
      assert.equal(greeks.getTheta(100, 100, 0, .1, .0015, "put", 252), 0);
      assert.equal(greeks.getTheta(100, 100, .1, 0, .0015, "call"), 0);
      assert.equal(greeks.getTheta(100, 100, .1, 0, .0015, "put"), 0);
      assert.equal(greeks.getTheta(100, 100, .1, 0, .0015, "call", 252), 0);
      assert.equal(greeks.getTheta(100, 100, .1, 0, .0015, "put", 252), 0);
      assert.equal(greeks.getTheta(100, 100, 0, 0, .0015, "call"), 0);
      assert.equal(greeks.getTheta(100, 100, 0, 0, .0015, "put"), 0);
      assert.equal(greeks.getTheta(100, 100, 0, 0, .0015, "call", 252), 0);
      assert.equal(greeks.getTheta(100, 100, 0, 0, .0015, "put", 252), 0);
    });
  }); // end theta
  describe("Rho", function()
  {
    it("should return non-zero rho", function()
    {
      assert.equal(greeks.getRho(206.35, 206, .086, .1, .0015, "call"), 0.09193271711465777);
      assert.equal(greeks.getRho(206.35, 206, .086, .1, .0015, "put"), -0.08520443071933861);
      assert.equal(greeks.getRho(206.35, 206, .086, .1, .0015, "call", 10000), 0.0009193271711465777);
      assert.equal(greeks.getRho(206.35, 206, .086, .1, .0015, "put", 10000), -0.0008520443071933862);
      // only the call has a non-zero rho when: v=0, t>0, s>k
      assert.equal(greeks.getRho(206.35, 206, .086, 0, .0015, "call"), 0.17713714783399637);
      // only the put has a non-zero rho when: v=0, t>0, s<k
      assert.equal(greeks.getRho(205.35, 206, .086, 0, .0015, "put"), -0.17713714783399637);
    });
    it("should return 0", function()
    {
      assert.equal(greeks.getRho(100, 100, 0, .1, .0015, "call"), 0);
      assert.equal(greeks.getRho(100, 100, 0, .1, .0015, "put"), 0);
      assert.equal(greeks.getRho(100, 100, 0, 0, .0015, "call"), 0);
      assert.equal(greeks.getRho(100, 100, 0, 0, .0015, "put"), 0);
      // only the put has a rho of zero when: v=0, t>0, s>k
      assert.equal(greeks.getRho(206.35, 206, .086, 0, .0015, "put"), 0);
      // only the call has a rho of zero when: v=0, t>0, s<k
      assert.equal(greeks.getRho(205.35, 206, .086, 0, .0015, "call"), 0);
    });
  }); // end rho
});
