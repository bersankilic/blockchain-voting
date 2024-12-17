const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
  const candidates = ["Alice", "Bob", "Charlie"];
  deployer.deploy(Voting, candidates);
};
