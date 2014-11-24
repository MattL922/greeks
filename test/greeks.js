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
  });
});
