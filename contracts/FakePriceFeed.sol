// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.13;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract FakePriceFeed is AggregatorV3Interface {
    uint8 public decimal = 8;
    string public desc;
    uint256 public vers = 1;
    int256 public currentPrice;

    constructor(int256 _currentPrice) {
        currentPrice = _currentPrice;
    }

    function setCurrentPrice(int256 _currentPrice) public {
        currentPrice = _currentPrice;
    }

    function decimals() external view returns (uint8) {
        return decimal;
    }

    function description() external view returns (string memory) {
        return desc;
    }

    function version() external view returns (uint256) {
        return vers;
    }

    function getRoundData(uint80 _roundId)
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        return (_roundId, currentPrice, 0, 0, 0);
    }

    function latestRoundData()
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        return (0, currentPrice, 0, 0, 0);
    }
}
