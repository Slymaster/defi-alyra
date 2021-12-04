const Factory = artifacts.require("Uniswap/SRSwapFactory");

module.exports = function (deployer) {
    deployer.deploy(Factory);
};
