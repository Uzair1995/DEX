pragma solidity ^0.4.24;

contract EscrowContract {

    event UpdateOwner(address indexed newOwner);
    event UpdateSeller(address indexed newSeller);
    event UpdateBuyer(address indexed newBuyer);
    event UpdateArbitrator(address indexed newArbitrator);
    event RecievedFromSeller(address indexed sellerAddress, uint indexed value);
    event RecievedFromBuyer(address indexed buyerAddress, uint indexed value);
    event ReleaseFundsForBuyer(address indexed buyerAddress, uint indexed value);
    event ReleaseFundsForSeller(address indexed sellerAddress, uint indexed amountToRelease);
    
    address public owner;   //owner of the contract. In our case the main contract will be the owner
    address public sellerAddress;   //seller address set by the owner for trade
    address public buyerAddress;    //buyer address set by the owner for trade
    address public arbitratorAddress;   //arbitratoe address
    uint public arbitratorFees; //arbitrator fees will only be set by the arbitrator or default fees
    uint public offeredAmount;  //the amount on which the trade is done. Set by the intializer of the trade.
    
    bool public isBuyerAgreeing;    //Raising this will intend that "Buyer admits that he has done something wrong and he is letting the seller take all the ETH"
    bool public isSellerAgreeing;   //Raising this will intend that "Seller admits that he has received the fiat amount and letting all the ETH go to Buyer"
    bool public isArbitratorAgreeingForBuyer;   //In case of dispute, arbitrator is agreeing for buyer
    bool public isArbitratorAgreeingForSeller;  //In case of dispute, arbitrator is agreeing for seller
    bool public sellerDisputeRaise; //check if the seller raised the dispute
    bool public buyerDisputeRaise;  //check if the buyer raised the dispute
    bool public buyerSentFiatAmount;    //check if the buyer has sent the fiat amount to the seller
    
    uint public sellerAmountDeposit;    //current deposited amount by seller
    uint public buyerSecurityDeposit;   //current deposited amount by buyer
    

    /// @dev Contract constructor sets initial owners and required number of confirmations.
    //Use 0x0000000000000000000000000000000000000000 to set null address.
    //Use 0 to set zero arbitrator fees and offered amount
    constructor (address _sellerAddress, address _buyerAddress, address _arbitratorAddress, uint _arbitratorFees, uint _offeredAmount) public {
        owner = msg.sender;
        sellerAddress = _sellerAddress;
        buyerAddress = _buyerAddress;
        arbitratorAddress = _arbitratorAddress;
        arbitratorFees = _arbitratorFees;
        offeredAmount = _offeredAmount;
    }
    
    //update functions for the owner, called only when the trade is not in progress
    function updateOwner(address _owner) external {
        require(msg.sender==owner);
        require(_owner!=address(0));
        
        owner = _owner;
        emit UpdateOwner(owner);
    }
    function updateSeller(address _sellerAddress) external {
        require(msg.sender==owner);
        require(_sellerAddress!=address(0));
        require(sellerAmountDeposit==0);
        sellerAddress = _sellerAddress;
        emit UpdateSeller(sellerAddress);
    }
    function updateBuyer(address _buyerAddress) external {
        require(msg.sender==owner);
        require(_buyerAddress!=address(0));
        require(buyerSecurityDeposit==0);
        buyerAddress = _buyerAddress;
        emit UpdateBuyer(buyerAddress);
    }
    function updateArbitrator(address _arbitratorAddress) external {
        require(msg.sender==owner);
        require(_arbitratorAddress!=address(0));
        require(buyerSecurityDeposit==0);
        require(sellerAmountDeposit==0);
        arbitratorAddress = _arbitratorAddress;
        emit UpdateArbitrator(arbitratorAddress);
    }
    //trade fees and trade amount update functions. Called at the start of a trade only by arbitrator
    function updateArbitratorFees(uint _arbitratorFees) external {
        require(msg.sender==arbitratorAddress);
        require(_arbitratorFees!=0);
        require(buyerSecurityDeposit==0);
        require(sellerAmountDeposit==0);
        arbitratorFees = _arbitratorFees;
    }
    function updateOfferedAmount(uint _offeredAmount) external {
        require(msg.sender==arbitratorAddress);
        require(_offeredAmount!=0);
        require(buyerSecurityDeposit==0);
        require(sellerAmountDeposit==0);
        offeredAmount = _offeredAmount;
    }


    //call these functions with the trade amount to deposit to escrow
    function depositForSeller() external payable {
        require(msg.sender==sellerAddress);
        require(sellerAmountDeposit==0);
        require(msg.value==offeredAmount);
        sellerAmountDeposit = msg.value;
        emit RecievedFromSeller(sellerAddress, msg.value);
    }
    function depositForBuyer() external payable {
        require(msg.sender==buyerAddress);
        require(buyerSecurityDeposit==0);
        require(msg.value==offeredAmount);
        buyerSecurityDeposit = msg.value;
        emit RecievedFromBuyer(buyerAddress, msg.value);
    }
    
    
    //call these functions without any value to release funds either to buyer or seller
    function releaseFundsToBuyer() external payable {
        require(isArbitratorAgreeingForBuyer || isSellerAgreeing);
        require(sellerAmountDeposit!=0 && buyerSecurityDeposit!=0);
        require(buyerSecurityDeposit==offeredAmount);
        uint amountToRelease = buyerSecurityDeposit + sellerAmountDeposit - arbitratorFees;
        offeredAmount = 0;
        sellerAmountDeposit = 0;
        buyerSecurityDeposit = 0;
        isBuyerAgreeing = false;
        isSellerAgreeing = false;
        isArbitratorAgreeingForBuyer = false;
        isArbitratorAgreeingForSeller = false;
        sellerDisputeRaise = false;
        buyerDisputeRaise = false;
        buyerSentFiatAmount = false;
        arbitratorAddress.transfer(arbitratorFees);
        buyerAddress.transfer(amountToRelease);
        emit ReleaseFundsForBuyer(buyerAddress, amountToRelease);
    }
    function releaseFundsToSeller() external payable {
        require(isArbitratorAgreeingForSeller || isBuyerAgreeing);
        require(sellerAmountDeposit!=0 && buyerSecurityDeposit!=0);
        require(sellerAmountDeposit==offeredAmount);
        uint amountToRelease = buyerSecurityDeposit + sellerAmountDeposit - arbitratorFees;
        offeredAmount = 0;
        sellerAmountDeposit = 0;
        buyerSecurityDeposit = 0;
        isBuyerAgreeing = false;
        isSellerAgreeing = false;
        isArbitratorAgreeingForBuyer = false;
        isArbitratorAgreeingForSeller = false;
        sellerDisputeRaise = false;
        buyerDisputeRaise = false;
        buyerSentFiatAmount = false;
        arbitratorAddress.transfer(arbitratorFees);
        sellerAddress.transfer(amountToRelease);
        emit ReleaseFundsForSeller(sellerAddress, amountToRelease);
    }
    
    
    function raiseBuyerSentFiatAmount() external {
        require(msg.sender==buyerAddress);
        require(offeredAmount!=0);
        require(buyerSecurityDeposit==offeredAmount);
        buyerSentFiatAmount = true;
    }
    //voting functions for buyer seller and arbitrator
    function signerForBuyer() external {
        require(msg.sender==buyerAddress);
        require(offeredAmount!=0);
        require(buyerSecurityDeposit==offeredAmount);
        require(sellerAmountDeposit==offeredAmount);
        isBuyerAgreeing = true;
    }
    function signerForSeller() external {
        require(msg.sender==sellerAddress);
        require(offeredAmount!=0);
        require(buyerSecurityDeposit==offeredAmount);
        require(sellerAmountDeposit==offeredAmount);
        isSellerAgreeing = true;
    }
    function signerForArbitratorForBuyer() external {
        require(msg.sender==arbitratorAddress);
        require(offeredAmount!=0);
        require(buyerSecurityDeposit<=offeredAmount);
        require(sellerAmountDeposit<=offeredAmount);
        isArbitratorAgreeingForBuyer = true;
    }
    function signerForArbitratorForSeller() external {
        require(msg.sender==arbitratorAddress);
        require(offeredAmount!=0);
        require(buyerSecurityDeposit<=offeredAmount);
        require(sellerAmountDeposit<=offeredAmount);
        isArbitratorAgreeingForSeller = true;
    }
    function raiseDisputeForSeller() external {
        require(msg.sender==sellerAddress);
        require(offeredAmount!=0);
        require(sellerAmountDeposit==offeredAmount);
        sellerDisputeRaise = true;
    }
    function raiseDisputeForBuyer() external {
        require(msg.sender==buyerAddress);
        require(offeredAmount!=0);
        require(buyerSecurityDeposit==offeredAmount);
        buyerDisputeRaise = true;
    }
    
}