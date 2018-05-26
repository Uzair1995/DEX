pragma solidity ^0.4.24;

contract IEscrowContract {
    //update functions for the owner, called only when the trade is not in progress
    function updateOwner(address _owner) external;
    function updateSeller(address _sellerAddress) external;
    function updateBuyer(address _buyerAddress) external;
    function updateArbitrator(address _arbitratorAddress) external;
    
    //trade fees and trade amount update functions. Called at the start of a trade only by arbitrator
    function updateArbitratorFees(uint _arbitratorFees) external;
    function updateOfferedAmount(uint _offeredAmount) external;

    //call these functions with the trade amount to deposit to escrow
    function depositForSeller() external payable;
    function depositForBuyer() external payable;
    
    //call these functions without any value to release funds either to buyer or seller
    function releaseFundsToBuyer() external payable;
    function releaseFundsToSeller() external payable;
    
    //voting functions for buyer seller and arbitrator
    function signerForBuyer() external;
    function signerForSeller() external;
    function signerForArbitratorForBuyer() external;
    function signerForArbitratorForSeller() external;
    
    function raiseDisputeForSeller() external;
    function raiseDisputeForBuyer() external;
}