var DexMainContract = artifacts.require("./DEX_MainContract.sol");

module.exports = function(deployer){
deployer.deploy(DexMainContract);
};