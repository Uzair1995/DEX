pragma solidity ^0.4.23;

import "./EscrowContract.sol";

contract CallerContract {
    
    constructor () public {
    }
    
    function createContract (address _sellerAddress, address _buyerAddress, address _arbitratorAddress, uint _arbitratorFees, uint _offeredAmount) public returns (address) {
        return new EscrowContract(_sellerAddress, _buyerAddress, _arbitratorAddress, _arbitratorFees, _offeredAmount);
    }

}