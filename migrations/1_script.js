const Factory = artifacts.require("Uniswap/SRSwapFactory.sol");
const Pair = artifacts.require("Uniswap/SRSwapPair.sol");
const FakeUSDC = artifacts.require("Uniswap/FakeUSDC.sol");
const FakeUSDT = artifacts.require("Uniswap/FakeUSDT.sol");
const FakeDAI = artifacts.require("Uniswap/FakeDAI.sol");
const WETH = artifacts.require("Uniswap/WETH.sol");
const Router = artifacts.require("SRSwapRouter02.sol");
const SwapERC20 = artifacts.require('SRSwapERC20.sol')

let factory, router, fusdc, fusdt, fdai, weth;
let fakeUSDCAddress, fakeUSDTAddress, fakeDAIAddress, wethAddress;
let pair1, pair2, pair3;
let masterchef;
let sbs;

module.exports = async function (deployer, network, addresses) {
    //|:::::: Deploy the Factory :::::::|
    await deployer.deploy(Factory, addresses[0]); // constructor(address _feeToSetter)
    //address that receives the payment for the trading fees
    //with truffle, by default the first address is use for the deployment

   //|::: Deploy ERC20 :::|
    await deployer.deploy(SwapERC20); 
   
    //|:::::: Deploy Pair :::::::|
    await deployer.deploy(Pair);

    //::::: Deploy Router :::::|
    await deployer.deploy(WETH);
    weth = await WETH.deployed();
    factory = await Factory.deployed();
    await deployer.deploy(Router, factory.address, weth.address); //constructor(address _factory, address _WETH)

    //|:::::: Deploy tokens :::::::|
    await deployer.deploy(FakeUSDC)
    await deployer.deploy(FakeUSDT)
    await deployer.deploy(FakeDAI)
    // wait mining finishes and get a reference to the token

    fusdc = await FakeUSDC.deployed();
    fusdt = await FakeUSDT.deployed();
    fdai = await FakeDAI.deployed();

    // get the tokens' address
    fakeUSDCAddress = fusdc.address;
    fakeUSDTAddress = fusdt.address;
    fakeDAIAddress = fdai.address;
    wethAddress = weth.address;

    router = await Router.deployed();

    await scriptUniswap(addresses);
    await masterchef(addresses);
    await addPool();
};

const scriptUniswap = async function (addresses) {
    //::::: Create pairs :::::|
    try {
        await factory.createPair(fakeUSDCAddress, wethAddress);
        pair1 = await factory.getPair(fakeUSDCAddress, wethAddress);
        console.log('Address of the pair fUSDC/WETH: ' + pair1);

        await factory.createPair(fakeUSDTAddress, wethAddress);
        pair2 = await factory.getPair(fakeUSDTAddress, wethAddress);
        console.log('Address of the pair fUSDT/WETH: ' + pair2);

        await factory.createPair(fakeDAIAddress, wethAddress);
        pair3 = await factory.getPair(fakeDAIAddress, wethAddress);
        console.log('Address of the pair fDAI/WETH: ' + pair3);
    } catch (error) {
        console.log(error);
    }

    try {
        //::::: Add liquidity for the 3 tokens :::::|
        //|::: Initiate pool with fUSDC :::|
        //|::: Mint fUSDC to me :::|
        await fusdc.mint(addresses[0], web3.utils.toWei('10000000'));

        //|::: Check balance of fUSDC :::|
        const fusdcBalance = await fusdc.balanceOf(addresses[0]);
        console.log('Minted fUSDC to my address: ' + Number(web3.utils.fromWei(fusdcBalance)));

        //|::: Approve 10000 fUSDC :::|
        await fusdc.approve(router.address, web3.utils.toWei('10000'));

        //|::: Initiate pool with fUSDT :::|
        //|::: Mint fUSDT to me :::|
        await fusdt.mint(addresses[0], web3.utils.toWei('10000000'));

        //|::: Check balance of fUSDT :::|
        const fusdtBalance = await fusdt.balanceOf(addresses[0]);
        console.log('Minted fUSDT to my address: ' + Number(web3.utils.fromWei(fusdtBalance)));

        //|::: Approve 10000 fUSDT :::|
        await fusdt.approve(router.address, web3.utils.toWei('10000'));

        //|::: Initiate pool with fDAI :::|
        //|::: Mint fDAI to me :::|
        await fdai.mint(addresses[0], web3.utils.toWei('10000000'));

        //|::: Check balance of fDAI :::|
        const fdaiBalance = await fdai.balanceOf(addresses[0]);
        console.log('Minted fDAI to my address:' + Number(web3.utils.fromWei(fdaiBalance)));

        //|::: Approve 10000 fDAI :::|
        await fdai.approve(router.address, web3.utils.toWei('10000'));

    } catch (error) {
        console.log(error);
    }

    try {
        //|::: Add liquidity :::|
        const unix_timestamp = Math.round(new Date().getTime() / 1000);
        const deadline = unix_timestamp + 300;
        await router.addLiquidityETH(fusdc.address, web3.utils.toWei('10000'), 0, 0, addresses[0], deadline, {value: web3.utils.toWei('1')});
        await router.addLiquidityETH(fusdt.address, web3.utils.toWei('10000'), 0, 0, addresses[0], deadline, {value: web3.utils.toWei('1')});
        await router.addLiquidityETH(fdai.address, web3.utils.toWei('10000'), 0, 0, addresses[0], deadline, {value: web3.utils.toWei('1')});

        //|::: Reserves Pair 1 :::|
        const swapPairFusdcWeth1 = new web3.eth.Contract(Pair.abi, pair1);
        const fusdcWethReserves = await swapPairFusdcWeth1.methods.getReserves().call();
        const wethReservePair1 = fusdcWethReserves._reserve0;
        const fusdcReservePair1 = fusdcWethReserves._reserve1;
        console.log("FUSDC Reserve pair1: " + web3.utils.fromWei(fusdcReservePair1));
        console.log("WETH Reserve pair1: " + web3.utils.fromWei(wethReservePair1));

        //|::: Reserves Pair 2 :::|
        const swapPairFusdcWeth2 = new web3.eth.Contract(Pair.abi, pair2);
        const fusdtWethReserves = await swapPairFusdcWeth2.methods.getReserves().call();
        const wethReservePair2 = fusdtWethReserves._reserve0;
        const fusdtReservePair2 = fusdtWethReserves._reserve1;
        console.log("FUSDT Reserve pair2: " + web3.utils.fromWei(fusdtReservePair2));
        console.log("WETH Reserve pair2: " + web3.utils.fromWei(wethReservePair2));

        //|::: Reserves Pair 3 :::|
        const swapPairFusdcWeth3 = new web3.eth.Contract(Pair.abi, pair3);
        const fdaiWethReserves = await swapPairFusdcWeth3.methods.getReserves().call();
        const wethReservePair3 = fdaiWethReserves._reserve0;
        const fdaiReservePair3 = fdaiWethReserves._reserve1;
        console.log("FDAI Reserve pair3: " + web3.utils.fromWei(fdaiReservePair3));
        console.log("WETH Reserve pair3: " + web3.utils.fromWei(wethReservePair3));

        // // LP tokens
        // const swapERC20 = await SwapERC20.deployed();
        // console.log('My lp tokens:', Number(await swapERC20.balanceOf(addresses[0])));
    } catch (error) {
        console.log(error);
    }

    try {
        //|::: Swap tokens :::|
        // console.log('Adresse WETH: ' + weth.address);
        const unix_timestamp = Math.round(new Date().getTime() / 1000);
        const deadline = unix_timestamp + 300;
        await router.swapExactETHForTokens(web3.utils.toWei('0.0001'), [weth.address, fusdc.address], addresses[0], deadline, {value: web3.utils.toWei('0.001')});
    } catch (error) {
        console.log(error);
    }
};

const masterchef = async function (addresses) { //called at the end of module.exports
    const MasterChef = artifacts.require('sushiswap/MasterChef.sol');
    const SBS = artifacts.require('sushiswap/SBS.sol');

    await deployer.deploy(SBS);
    sbs = SBS.deployed();

    await deployer.deploy(
        MasterChef,
        sbs.address, // SushiToken _sushi
        admin, //address _devaddr
        web3.utils.to.wei('100'), // uint256 _sushiPerBlock, e.g. 100 sushi for ea block
        1, // uint256 _startBlock; block where sushi rewards will start
        100, // uint256 _bonusEndBlock; where it ends
    );
    masterchef = await MasterChef.deployed();
    console.log("Address masterchef:", masterchef.address);

    await sbs.setMasterChefAddress(masterchef.address);
}

const addPool = async function () { //called at the end of module.exports
    await masterchef.add(
      30,
      pair1,
      true
    )
    await masterchef.add(
      20,
      pair2,
      true
    )
    await masterchef.add(
      50,
      pair3,
      true
    )
  }

  const stacking = async function () { //called at the end of module.exports
    const SBStacking = artifacts.require('SBStacking.sol');
    await deployer.deploy(SBStacking, sbs.address);
    const sbstacking = SBStacking.deployed();

    await sbs.setStackingAddress(sbstacking);
  }

  

