const Masterchef = artifacts.require("MasterChef/MasterChef.sol");

module.exports = async function (deployer, network, addresses) {
    await deployer.deploy(Masterchef);
};