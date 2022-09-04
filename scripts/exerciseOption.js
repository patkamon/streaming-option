//script which exercises the option

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
const _sender = "0xbb78Ebf787951CF921783163Be1B8423A4Dc752e";

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
    async function exerciseOption() {
        // ERC20 underlyingAsset,
        //     uint256 underlyingAmount,
        //     uint8 underlyingDecimals,
        //     AggregatorV3Interface priceFeed,
        //     int96 requiredFlowRate,
        //     uint256 expirationDate,
        //     int256 strikePrice)

        let txData = await tradeableCashflowOption.methods
            .exerciseOption()
            .encodeABI();

        //send the tx to the tradeableCashflowOption
        let tx = {
            to: tradeableCashflowOptionAddress,
            gas: 3500000,
            nonce: nonce,
            data: txData,
        };

        let signedTx = await web3.eth.accounts.signTransaction(
            tx,
            process.env.SENDER_PRIVATE_KEY
        );

        await web3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
            function (error, hash) {
                if (!error) {
                    console.log(
                        "🎉 The hash of your transaction is: ",
                        hash,
                        "\n Check Alchemy's Mempool to view the status of your transaction!"
                    );
                } else {
                    console.log(
                        "❗Something went wrong while submitting your transaction:",
                        error
                    );
                }
            }
        );
    }

    await exerciseOption();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
