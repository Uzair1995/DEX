pragma solidity 0.4.10;

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
            throw;
        _;
    }
    modifier onlySellerAllowed() {
        if (msg.sender != sellerAddress)
            throw;
        _;
    }
    modifier onlyArbitratorAllowed() {
        if (msg.sender != arbitratorAddress)
            throw;
        _;
    }
    modifier onlyOwnerAllowed() {
        if (msg.sender != owner)
            throw;
        _;
    }

    modifier buyerSignatureCheck() {
        if (!isBuyerAgreeing)
            throw;
        _;
    }
    modifier sellerSignatureCheck() {
        if (!isSellerAgreeing)
            throw;
        _;
    }
    modifier signaturesCheckToReleaseAmountToBuyer() {
        if (!isArbitratorAgreeingForBuyer && !isSellerAgreeing)
            throw;
        _;
    }
    modifier signaturesCheckToReleaseAmountToSeller() {
        if (!isArbitratorAgreeingForSeller && !isBuyerAgreeing)
            throw;
        _;
    }
    
    modifier addressNotNull(address _address) {
        if (_address == address(0))
            throw;
        _;
    }
    modifier zeroSellerAmountCheck() {
        if (sellerAmountDeposit != 0)
            throw;
        _;
    }
    modifier zeroBuyerAmountCheck() {
        if (buyerSecurityDeposit != 0)
            throw;
        _;
    }
    modifier nonzeroSellerAmountCheck() {
        if (sellerAmountDeposit == 0)
            throw;
        _;
    }
    modifier nonzeroBuyerAmountCheck() {
        if (buyerSecurityDeposit == 0)
            throw;
        _;
    }
    
    modifier verifyOfferedAmount (uint value) {
        if(value != offeredAmount)
             throw;
        _;
    }
    modifier verifyIsAmountNonzero (uint value) {
        if(value == 0)
             throw;
        _;
    }


    /// @dev Contract constructor sets initial owners and required number of confirmations.
    function MultiSigWallet () public {
        owner = msg.sender;
    }
    
    //update functions for the owner, called only when the trade is not in progress
    function updateOwner(address _owner) external onlyOwnerAllowed addressNotNull(_owner) {
        owner = _owner;
        UpdateOwner(owner);
    }
    function updateSeller(address _sellerAddress) external onlyOwnerAllowed zeroSellerAmountCheck addressNotNull(_sellerAddress) {
        sellerAddress = _sellerAddress;
        UpdateSeller(sellerAddress);
    }
    function updateBuyer(address _buyerAddress) external onlyOwnerAllowed zeroBuyerAmountCheck addressNotNull(_buyerAddress) {
        buyerAddress = _buyerAddress;
        UpdateBuyer(buyerAddress);
    }
    function updateArbitrator(address _arbitratorAddress) external onlyOwnerAllowed zeroBuyerAmountCheck zeroSellerAmountCheck addressNotNull(_arbitratorAddress) {
        arbitratorAddress = _arbitratorAddress;
        UpdateArbitrator(arbitratorAddress);
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
        RecievedFromSeller(sellerAddress, msg.value);
    }
    function depositForBuyer() external payable onlyBuyerAllowed zeroBuyerAmountCheck verifyIsAmountNonzero(msg.value) verifyOfferedAmount(msg.value) {
        buyerSecurityDeposit = msg.value;
        RecievedFromBuyer(buyerAddress, msg.value);
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
        ReleaseFundsForBuyer(buyerAddress, amountToRelease);
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
        ReleaseFundsForSeller(sellerAddress, amountToRelease);
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