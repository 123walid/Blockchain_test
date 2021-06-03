const Transport = artifacts.require("./Transport");

module.exports = function(deployer) {
  deployer.deploy(Transport);
};