pragma solidity ^0.4.24;

contract OffersContract {
    
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
        bool isActive;
    }
    
    mapping (bytes32 => Offer) sellOffers;
    mapping (bytes32 => Offer) buyOffers;
    bytes32 [] public currentSellOffersAddresses;
    bytes32 [] public currentBuyOffersAddresses;
    
    function placeSellOffer(string _fiatCurrency, string _sellerBankaccountNumber, string _sellerBankName, uint _offeredEthQuantity, uint _fiatQuantity, address _arbitratorAddress) external {
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
        offer.isActive = true;
        currentSellOffersAddresses.push(tradeHash);
    }
    function placeBuyOffer(string _fiatCurrency, uint _offeredEthQuantity, uint _fiatQuantity, address _arbitratorAddress) external {
        bytes32 tradeHash = keccak256(msg.sender, now, _offeredEthQuantity, _fiatQuantity);
        if(buyOffers[tradeHash].buyerAddress != address(0)) revert();
        Offer storage offer = buyOffers[tradeHash];
        offer.fiatCurrency = _fiatCurrency;
        offer.offeredEthQuantity = _offeredEthQuantity;
        offer.fiatQuantity = _fiatQuantity;
        offer.buyerAddress = msg.sender;
        offer.arbitratorAddress = _arbitratorAddress;
        offer.isActive = true;
        currentBuyOffersAddresses.push(tradeHash);
    }
    
    function getSellOfferFromAddress(bytes32 _tradeHash) view public returns(string, uint, uint, address, address, address, bool) {
        return (
            sellOffers[_tradeHash].fiatCurrency,
            sellOffers[_tradeHash].offeredEthQuantity,
            sellOffers[_tradeHash].fiatQuantity,
            sellOffers[_tradeHash].sellerAddress,
            sellOffers[_tradeHash].buyerAddress,
            sellOffers[_tradeHash].arbitratorAddress,
            sellOffers[_tradeHash].isActive);
    }
    function getSellOfferDetailsFromAddress(bytes32 _tradeHash) view public returns(uint, string, string) {
        return (
            sellOffers[_tradeHash].arbitratorFee,
            sellOffers[_tradeHash].sellerFiatAccount.accountNumber,
            sellOffers[_tradeHash].sellerFiatAccount.bankName);
    }
    function getBuyOfferFromAddress(bytes32 _tradeHash) view public returns(string, uint, uint, address, address, address, bool) {
        return (
            buyOffers[_tradeHash].fiatCurrency,
            buyOffers[_tradeHash].offeredEthQuantity,
            buyOffers[_tradeHash].fiatQuantity,
            buyOffers[_tradeHash].sellerAddress,
            buyOffers[_tradeHash].buyerAddress,
            buyOffers[_tradeHash].arbitratorAddress,
            buyOffers[_tradeHash].isActive);
    }
    function getBuyOfferDetailsFromAddress(bytes32 _tradeHash) view public returns(uint, string, string) {
        return (
            buyOffers[_tradeHash].arbitratorFee,
            buyOffers[_tradeHash].sellerFiatAccount.accountNumber,
            buyOffers[_tradeHash].sellerFiatAccount.bankName);
    }
    
    function getCurrentSellOffersCount() view public returns(uint) {
        return (currentSellOffersAddresses.length);
    }
    function getCurrentBuyOffersCount() view public returns(uint) {
        return (currentBuyOffersAddresses.length);
    }
 
    //function cancelSellOffer(address _sellerAddress){}
}