const Pair = artifacts.require("Uniswap/SRSwapPair");

module.exports = function (deployer) {
    deployer.deploy(Pair);
};
