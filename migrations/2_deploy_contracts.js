var points = artifacts.require("./points.sol");

module.exports = function(deployer) {
  deployer.deploy(points);
};
