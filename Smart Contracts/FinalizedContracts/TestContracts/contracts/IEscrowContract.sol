pragma solidity ^0.4.24;

contract IEscrowContract {
    function setDataToStartEscrow (bytes32 _tradeHash, address _sellerAddress, address _buyerAddress, address _arbitratorAddress, uint _arbitratorFees, uint _offeredAmount) external;
}