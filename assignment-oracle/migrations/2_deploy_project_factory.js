const StockContract = artifacts.require("Stock");

module.exports = function(deployer) {
  deployer.deploy(StockContract);
}
