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
    
    address public owner;
    address public sellerAddress;
    address public buyerAddress;
    address public arbitratorAddress;
    uint public arbitratorFees;
    uint public offeredAmount;
    
    bool public isBuyerAgreeing;
    bool public isSellerAgreeing;
    bool public isArbitratorAgreeingForBuyer;
    bool public isArbitratorAgreeingForSeller;
    bool public sellerDisputeRaise;
    bool public buyerDisputeRaise;
    
    uint public sellerAmountDeposit;
    uint public buyerSecurityDeposit;
    

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
        require(msg.value>0 && msg.value+sellerAmountDeposit<=offeredAmount);

        sellerAmountDeposit = msg.value;
        emit RecievedFromSeller(sellerAddress, msg.value);
    }
    
    function depositForBuyer() external payable {
        require(msg.sender==buyerAddress);
        require(buyerSecurityDeposit==0);
        require(msg.value>0 && msg.value+buyerSecurityDeposit<=offeredAmount);
        
        buyerSecurityDeposit = msg.value;
        emit RecievedFromBuyer(buyerAddress, msg.value);
    }
    
    //call these functions without any value to release funds either to buyer or seller
    function releaseFundsToBuyer() external payable {
        require(isArbitratorAgreeingForBuyer && isSellerAgreeing);
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
        arbitratorAddress.transfer(arbitratorFees);
        buyerAddress.transfer(amountToRelease);
        emit ReleaseFundsForBuyer(buyerAddress, amountToRelease);
    }
    
    function releaseFundsToSeller() external payable {
        require(isArbitratorAgreeingForSeller && isBuyerAgreeing);
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
        arbitratorAddress.transfer(arbitratorFees);
        sellerAddress.transfer(amountToRelease);
        emit ReleaseFundsForSeller(sellerAddress, amountToRelease);
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
        require(buyerSecurityDeposit==offeredAmount);
        require(sellerAmountDeposit==offeredAmount);
        
        sellerDisputeRaise = true;
    }
    
    function raiseDisputeForBuyer() external {
        require(msg.sender==buyerAddress);
        require(offeredAmount!=0);
        require(buyerSecurityDeposit==offeredAmount);
        require(sellerAmountDeposit==offeredAmount);
       
        buyerDisputeRaise = true;
    }
    
}