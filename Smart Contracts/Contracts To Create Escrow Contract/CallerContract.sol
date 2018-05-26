pragma solidity ^0.4.23;

import "./EscrowContract.sol";

contract CallerContract {
    
    address[] public escrowContracts;
    address owner;
    
    constructor () public {
        owner = msg.sender;
    }
    
    function createContract (address _sellerAddress, address _buyerAddress, address _arbitratorAddress, uint _arbitratorFees, uint _offeredAmount) public {
        address addressOfNewEscrow = new EscrowContract(_sellerAddress, _buyerAddress, _arbitratorAddress, _arbitratorFees, _offeredAmount);
        escrowContracts.push(addressOfNewEscrow);
    }

}