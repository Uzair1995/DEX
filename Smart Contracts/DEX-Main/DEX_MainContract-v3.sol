pragma solidity ^0.4.24;

import "./EscrowContract.sol";

contract DEX_MainContract {
    
    struct SellerFiatAccount {
        string accountNumber;
        string bankName;
    }
    struct Offer {
        string fiatCurrency;
        SellerFiatAccount sellerFiatAccount;
        uint offeredEthQuantity;
        uint fiatQuantity;
        address sellerAddress;
        address buyerAddress;
        address arbitratorAddress;
        uint arbitratorFee;
    }

    address public owner;

    mapping (bytes32 => Offer) sellOffers;
    mapping (bytes32 => Offer) buyOffers;
    bytes32 [] public currentSellOffersAddresses;
    bytes32 [] public currentBuyOffersAddresses;
    address[] public escrowContracts;
    
    constructor () public {
        owner = msg.sender;
    }
    
    function placeSellOffer(string _fiatCurrency, string _sellerBankaccountNumber, string _sellerBankName, uint _offeredEthQuantity, uint _fiatQuantity, address _arbitratorAddress) external returns (bytes32) {
        bytes32 tradeHash = keccak256(msg.sender, now, _offeredEthQuantity, _fiatQuantity);
        if(sellOffers[tradeHash].sellerAddress != address(0)) revert();
        Offer storage offer = sellOffers[tradeHash];
        offer.fiatCurrency = _fiatCurrency;
        offer.sellerFiatAccount.accountNumber = _sellerBankaccountNumber;
        offer.sellerFiatAccount.bankName = _sellerBankName;
        offer.offeredEthQuantity = _offeredEthQuantity;
        offer.fiatQuantity = _fiatQuantity;
        offer.sellerAddress = msg.sender;
        offer.arbitratorAddress = _arbitratorAddress;
        currentSellOffersAddresses.push(tradeHash);
        return tradeHash;
    }
    function placeBuyOffer(string _fiatCurrency, uint _offeredEthQuantity, uint _fiatQuantity, address _arbitratorAddress) external returns (bytes32) {
        bytes32 tradeHash = keccak256(msg.sender, now, _offeredEthQuantity, _fiatQuantity);
        if(buyOffers[tradeHash].buyerAddress != address(0)) revert();
        Offer storage offer = buyOffers[tradeHash];
        offer.fiatCurrency = _fiatCurrency;
        offer.offeredEthQuantity = _offeredEthQuantity;
        offer.fiatQuantity = _fiatQuantity;
        offer.buyerAddress = msg.sender;
        offer.arbitratorAddress = _arbitratorAddress;
        currentBuyOffersAddresses.push(tradeHash);
        return tradeHash;
    }
    
    function getSellOfferFromTradeHash(bytes32 _tradeHash) view external returns(string, uint, uint, address, address, address) {
        return (
            sellOffers[_tradeHash].fiatCurrency,
            sellOffers[_tradeHash].offeredEthQuantity,
            sellOffers[_tradeHash].fiatQuantity,
            sellOffers[_tradeHash].sellerAddress,
            sellOffers[_tradeHash].buyerAddress,
            sellOffers[_tradeHash].arbitratorAddress);
    }
    function getSellOfferDetailsFromTradeHash(bytes32 _tradeHash) view external returns(uint, string, string) {
        return (
            sellOffers[_tradeHash].arbitratorFee,
            sellOffers[_tradeHash].sellerFiatAccount.accountNumber,
            sellOffers[_tradeHash].sellerFiatAccount.bankName);
    }
    function getBuyOfferFromTradeHash(bytes32 _tradeHash) view external returns(string, uint, uint, address, address, address) {
        return (
            buyOffers[_tradeHash].fiatCurrency,
            buyOffers[_tradeHash].offeredEthQuantity,
            buyOffers[_tradeHash].fiatQuantity,
            buyOffers[_tradeHash].sellerAddress,
            buyOffers[_tradeHash].buyerAddress,
            buyOffers[_tradeHash].arbitratorAddress);
    }
    function getBuyOfferDetailsFromTradeHash(bytes32 _tradeHash) view external returns(uint, string, string) {
        return (
            buyOffers[_tradeHash].arbitratorFee,
            buyOffers[_tradeHash].sellerFiatAccount.accountNumber,
            buyOffers[_tradeHash].sellerFiatAccount.bankName);
    }
    
    function getCurrentSellOffersCount() view external returns(uint) {
        return currentSellOffersAddresses.length;
    }
    function getCurrentBuyOffersCount() view external returns(uint) {
        return currentBuyOffersAddresses.length;
    }
 
    function cancelSellOffer(bytes32 _tradeHash) external returns (bool) {
        require (sellOffers[_tradeHash].sellerAddress == msg.sender);
        require (sellOffers[_tradeHash].buyerAddress == address(0));
        delete sellOffers[_tradeHash];
        return true;
        //also need to clear currentSellOffersAddresses array before returning true.
    }
    function cancelBuyOffer(bytes32 _tradeHash) external returns (bool) {
        require(buyOffers[_tradeHash].buyerAddress == msg.sender);
        require(buyOffers[_tradeHash].sellerAddress == address(0));
        delete buyOffers[_tradeHash];
        return true;
        //also need to clear currentBuyOffersAddresses array before returning true.
    }
    
    function takeSellOffer(bytes32 _tradeHash) external returns (address) {
        require(sellOffers[_tradeHash].sellerAddress != address(0));
        require(sellOffers[_tradeHash].buyerAddress == address(0));
        sellOffers[_tradeHash].buyerAddress = msg.sender;
        address addressOfNewEscrow = createEscrowContract(sellOffers[_tradeHash].sellerAddress, sellOffers[_tradeHash].buyerAddress, sellOffers[_tradeHash].arbitratorAddress, 0, sellOffers[_tradeHash].offeredEthQuantity);
        return addressOfNewEscrow;
    }
    function takeBuyOffer(bytes32 _tradeHash, string _sellerBankaccountNumber, string _sellerBankName) external returns (address) {
        require(buyOffers[_tradeHash].buyerAddress != address(0));
        require(buyOffers[_tradeHash].sellerAddress == address(0));
        buyOffers[_tradeHash].sellerAddress = msg.sender;
        buyOffers[_tradeHash].sellerFiatAccount.accountNumber = _sellerBankaccountNumber;
        buyOffers[_tradeHash].sellerFiatAccount.bankName = _sellerBankName;
        address addressOfNewEscrow = createEscrowContract(buyOffers[_tradeHash].sellerAddress, buyOffers[_tradeHash].buyerAddress, buyOffers[_tradeHash].arbitratorAddress, 0, buyOffers[_tradeHash].offeredEthQuantity);
        return addressOfNewEscrow;
    }
    
    
    
    function createEscrowContract (address _sellerAddress, address _buyerAddress, address _arbitratorAddress, uint _arbitratorFees, uint _offeredAmount) private returns (address) {
        address addressOfNewEscrow = new EscrowContract(_sellerAddress, _buyerAddress, _arbitratorAddress, _arbitratorFees, _offeredAmount);
        escrowContracts.push(addressOfNewEscrow);
        return addressOfNewEscrow;
    }
    
}