# Streaming Call Option

# Getting Started

SETUP 
 
0. run `npm install`
1. change `.env.template` to `.env` 
2. fill in `.env` `GOERLI_DEPLOYER_PRIVATE_KEY` is private key for owner or seller while `SENDER_PRIVATE_KEY` is for buyer's private key.
3. using `GOERLI` testnet.
4. get `fdai` (fake dai) and `fdaix` (fake dai x, for streaming premium) for buyer. go to [this](https://goerli.etherscan.io/token/0x88271d333C72e51516B67f5567c728E702b3eeE8?a=0xbb78ebf787951cf921783163be1b8423a4dc752e#writeContract) and click contract > write contract > mint 
5. go to [this](https://app.superfluid.finance/) to swap `fdai` to `fdaix`
6. get link [here](https://faucets.chain.link/) (We will use LINK as underlying asset)
7. setting up `fake price feed` go to `contracts\FakePriceFeed` copy all of it and paste in [REMIX](https://remix.ethereum.org/)
deploy it on goerli with started current price of 1x10^18 (1 Link)
8. copy address of fake price feed and paste it in `scripts\createOption.js` line 55 (LINK/USD price feed)

After done setup next we will working on Option process.
1. deploy option contract `npx hardhat deploy --reset`
2. approve Link so that option can transfer link from owner [here](https://goerli.etherscan.io/token/0x326c977e6efc84e512bb9c30f76e30c160ed06fb#writeContract)
3. create option by running `npx hardhat run scripts/createOption.js` 
you can verify by run `npx hardhat run scripts/readOptionData.js` `option ready` should be true and `option active` should be false
4. [Buyer turn] (don't forget to change sender to buyer's wallet address) run ` npx hardhat run scripts/createFlow.js` (buyer must have fdaix) 
you can verify by run `npx hardhat run scripts/readOptionData.js` `option ready` should be true and `option active` should be true
you can go [here](https://console.superfluid.finance/) and paste option's address to see streaming
5. back to remix run `setCurrentPrice` func set it param to `2x10^18` (it strike price)
6. [Buyer turn] approve fdai so that option can transfer fdai from buyer (strike price) [here](https://goerli.etherscan.io/token/0x88271d333C72e51516B67f5567c728E702b3eeE8?a=0xbb78ebf787951cf921783163be1b8423a4dc752e#writeContract)
7. [Buyer turn] run `npx hardhat run scripts/exerciseOption.js` for exercise (buyer must have dai follow to strike price amount)
you can verify by run `npx hardhat run scripts/readOptionData.js` `option ready` should be false and `option active` should be false
right now buyer should have link from option and owner of option should hvae fdai with same amount as strike price.


