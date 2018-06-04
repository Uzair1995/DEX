var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer) {
  console.log("starting tests...");
  // if(web3.version.network=='4'){
  //   web3.personal.unlockAccount(web3.eth.coinbase,'mparsec123');
  // }
  deployer.deploy(Migrations);
};
