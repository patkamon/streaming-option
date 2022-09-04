//goerli addresses - change if using a different network
const host = "0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9";
const cfa = "0xEd6BcbF6907D4feEEe8a8875543249bEa9D308E8";
const fDAIx = "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00";
const dai = "0x88271d333C72e51516B67f5567c728E702b3eeE8";

//your address here...
const owner = "0xF0A94EC0F27203C399e17d5533A77e00F9813450";

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;

    const { deployer } = await getNamedAccounts();
    console.log("deployer" + deployer);

    await deploy("TradeableCashflowOption", {
        from: deployer,
        args: [owner, "super option", "OPTx", host, cfa, fDAIx, dai],
        log: true,
    });

    // await deploy("YourContract", {
    //   // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    //   from: deployer,
    //   //args: [ "Hello", ethers.utils.parseEther("1.5") ],
    //   log: true,
    // });

    /*
    // Getting a previously deployed contract
    const YourContract = await ethers.getContract("YourContract", deployer);
    await YourContract.setPurpose("Hello");
  
    To take ownership of yourContract using the ownable library uncomment next line and add the 
    address you want to be the owner. 
    // yourContract.transferOwnership(YOUR_ADDRESS_HERE);

    //const yourContract = await ethers.getContractAt('YourContract', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  */

    /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

    /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

    /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */
};
module.exports.tags = ["TradeableCashflowOption"];
