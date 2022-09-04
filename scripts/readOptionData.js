//read data on option

const hre = require("hardhat");
require("dotenv");
const Web3 = require("web3");
const ethers = require("ethers");

//all addresses hardcoded for goerli
const hostJSON = require("../artifacts/@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol/ISuperfluid.json");
const hostABI = hostJSON.abi;
const hostAddress = "0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9";

const cfaJSON = require("../artifacts/@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol/IConstantFlowAgreementV1.json");
const cfaABI = cfaJSON.abi;
const cfaAddress = "0xEd6BcbF6907D4feEEe8a8875543249bEa9D308E8";

const tradeableCashflowOptionJSON = require("../artifacts/contracts/TradeableCashflowOption.sol/TradeableCashflowOption.json");
const tradeableCashflowOptionABI = tradeableCashflowOptionJSON.abi;

//temporarily hardcode contract address and sender address
//need to manually enter contract address and sender address here
const deployedTradeableCashflowOption = require("../deployments/goerli/TradeableCashflowOption.json");
const tradeableCashflowOptionAddress = deployedTradeableCashflowOption.address;

//address of owner of option here..need to change this
const _sender = "0xF0A94EC0F27203C399e17d5533A77e00F9813450";

//create a flow
async function main() {
    const web3 = new Web3(
        new Web3.providers.HttpProvider(process.env.GOERLI_ALCHEMY_URL)
    );

    //create contract instances for each of these
    const host = new web3.eth.Contract(hostABI, hostAddress);
    const cfa = new web3.eth.Contract(cfaABI, cfaAddress);
    const tradeableCashflowOption = new web3.eth.Contract(
        tradeableCashflowOptionABI,
        tradeableCashflowOptionAddress
    );

    const fDAIx = "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00";

    const nonce = await web3.eth.getTransactionCount(_sender, "latest"); // nonce starts counting from 0

    //create flow by calling host directly in this function
    //create flow from sender to tradeable cashflow address
    async function readOptionData() {
        // ERC20 underlyingAsset,
        //     uint256 underlyingAmount,
        //     uint8 underlyingDecimals,
        //     AggregatorV3Interface priceFeed,
        //     int96 requiredFlowRate,
        //     uint256 expirationDate,
        //     int256 strikePrice)

        let underlyingAsset = await tradeableCashflowOption.methods
            ._underlyingAsset()
            .call();
        let requiredFlowRate = await tradeableCashflowOption.methods
            ._requiredFlowRate()
            .call();
        let expirationDate = await tradeableCashflowOption.methods
            ._expirationDate()
            .call();
        let strikePrice = await tradeableCashflowOption.methods
            ._strikePrice()
            .call();
        let optionReady = await tradeableCashflowOption.methods
            .optionReady()
            .call();
        let optionActive = await tradeableCashflowOption.methods
            .optionActive()
            .call();
        let underlyingAmount = await tradeableCashflowOption.methods
            ._underlyingAmount()
            .call();

        console.log(`Underlying Asset: ${underlyingAsset}`);
        console.log(`Underlying Amount: ${underlyingAmount}`);

        console.log(`Required Flow Rate: ${requiredFlowRate}`);
        console.log(`Expiration Date: ${expirationDate}`);
        console.log(`Strike Price: ${strikePrice}`);
        console.log(`Option Ready? ${optionReady}`);
        console.log(`Option Active? ${optionActive}`);
    }

    await readOptionData();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
