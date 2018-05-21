pragma solidity ^0.4.24;

contract MultiSigWallet {

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
    
    uint public sellerAmountDeposit;
    uint public buyerSecurityDeposit;

    modifier onlyBuyerAllowed() {
        if (msg.sender != buyerAddress)
            revert();
        _;
    }
    modifier onlySellerAllowed() {
        if (msg.sender != sellerAddress)
            revert();
        _;
    }
    modifier onlyArbitratorAllowed() {
        if (msg.sender != arbitratorAddress)
            revert();
        _;
    }
    modifier onlyOwnerAllowed() {
        if (msg.sender != owner)
            revert();
        _;
    }

    modifier buyerSignatureCheck() {
        if (!isBuyerAgreeing)
            revert();
        _;
    }
    modifier sellerSignatureCheck() {
        if (!isSellerAgreeing)
            revert();
        _;
    }
    modifier signaturesCheckToReleaseAmountToBuyer() {
        if (!isArbitratorAgreeingForBuyer && !isSellerAgreeing)
            revert();
        _;
    }
    modifier signaturesCheckToReleaseAmountToSeller() {
        if (!isArbitratorAgreeingForSeller && !isBuyerAgreeing)
            revert();
        _;
    }
    
    modifier addressNotNull(address _address) {
        if (_address == address(0))
            revert();
        _;
    }
    modifier zeroSellerAmountCheck() {
        if (sellerAmountDeposit != 0)
            revert();
        _;
    }
    modifier zeroBuyerAmountCheck() {
        if (buyerSecurityDeposit != 0)
            revert();
        _;
    }
    modifier nonzeroSellerAmountCheck() {
        if (sellerAmountDeposit == 0)
            revert();
        _;
    }
    modifier nonzeroBuyerAmountCheck() {
        if (buyerSecurityDeposit == 0)
            revert();
        _;
    }
    
    modifier verifyOfferedAmount (uint value) {
        if(value != offeredAmount)
             revert();
        _;
    }
    modifier verifyIsAmountNonzero (uint value) {
        if(value == 0)
             revert();
        _;
    }


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
    function updateOwner(address _owner) external onlyOwnerAllowed addressNotNull(_owner) {
        owner = _owner;
        emit UpdateOwner(owner);
    }
    function updateSeller(address _sellerAddress) external onlyOwnerAllowed zeroSellerAmountCheck addressNotNull(_sellerAddress) {
        sellerAddress = _sellerAddress;
        emit UpdateSeller(sellerAddress);
    }
    function updateBuyer(address _buyerAddress) external onlyOwnerAllowed zeroBuyerAmountCheck addressNotNull(_buyerAddress) {
        buyerAddress = _buyerAddress;
        emit UpdateBuyer(buyerAddress);
    }
    function updateArbitrator(address _arbitratorAddress) external onlyOwnerAllowed zeroBuyerAmountCheck zeroSellerAmountCheck addressNotNull(_arbitratorAddress) {
        arbitratorAddress = _arbitratorAddress;
        emit UpdateArbitrator(arbitratorAddress);
    }
    
    //trade fees and trade amount update functions. Called at the start of a trade only by arbitrator
    function updateArbitratorFees(uint _arbitratorFees) external onlyArbitratorAllowed verifyIsAmountNonzero(_arbitratorFees) zeroBuyerAmountCheck zeroSellerAmountCheck {
        arbitratorFees = _arbitratorFees;
    }
    function updateOfferedAmount(uint _offeredAmount) external onlyArbitratorAllowed verifyIsAmountNonzero(_offeredAmount) zeroBuyerAmountCheck zeroSellerAmountCheck {
        offeredAmount = _offeredAmount;
    }

    //call these functions with the trade amount to deposit to escrow
    function depositForSeller() external payable onlySellerAllowed zeroSellerAmountCheck verifyIsAmountNonzero(msg.value) verifyOfferedAmount(msg.value) {
        sellerAmountDeposit = msg.value;
        emit RecievedFromSeller(sellerAddress, msg.value);
    }
    function depositForBuyer() external payable onlyBuyerAllowed zeroBuyerAmountCheck verifyIsAmountNonzero(msg.value) verifyOfferedAmount(msg.value) {
        buyerSecurityDeposit = msg.value;
        emit RecievedFromBuyer(buyerAddress, msg.value);
    }
    
    //call these functions without any value to release funds either to buyer or seller
    function releaseFundsToBuyer() external payable signaturesCheckToReleaseAmountToBuyer nonzeroSellerAmountCheck nonzeroBuyerAmountCheck {
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
    function releaseFundsToSeller() external payable signaturesCheckToReleaseAmountToSeller nonzeroSellerAmountCheck nonzeroBuyerAmountCheck {
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
    function signerForBuyer() external onlyBuyerAllowed nonzeroBuyerAmountCheck nonzeroSellerAmountCheck {
        isBuyerAgreeing = true;
    }
    function signerForSeller() external onlySellerAllowed nonzeroBuyerAmountCheck nonzeroSellerAmountCheck {
        isSellerAgreeing = true;
    }
    function signerForArbitratorForBuyer() external onlyArbitratorAllowed nonzeroBuyerAmountCheck nonzeroSellerAmountCheck {
        isArbitratorAgreeingForBuyer = true;
    }
    function signerForArbitratorForSeller() external onlyArbitratorAllowed nonzeroBuyerAmountCheck nonzeroSellerAmountCheck {
        isArbitratorAgreeingForSeller = true;
    }
}