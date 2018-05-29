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
    }
    
    mapping (bytes32 => Offer) sellOffers;
    mapping (bytes32 => Offer) buyOffers;
    bytes32 [] public currentSellOffersAddresses;
    bytes32 [] public currentBuyOffersAddresses;
    
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
        currentBuyOffersAddresses.push(tradeHash);
    }
    
    function getSellOfferFromAddress(bytes32 _tradeHash) view public returns(string, uint, uint, address, address, address) {
        return (
            sellOffers[_tradeHash].fiatCurrency,
            sellOffers[_tradeHash].offeredEthQuantity,
            sellOffers[_tradeHash].fiatQuantity,
            sellOffers[_tradeHash].sellerAddress,
            sellOffers[_tradeHash].buyerAddress,
            sellOffers[_tradeHash].arbitratorAddress);
    }
    function getSellOfferDetailsFromAddress(bytes32 _tradeHash) view public returns(uint, string, string) {
        return (
            sellOffers[_tradeHash].arbitratorFee,
            sellOffers[_tradeHash].sellerFiatAccount.accountNumber,
            sellOffers[_tradeHash].sellerFiatAccount.bankName);
    }
    function getBuyOfferFromAddress(bytes32 _tradeHash) view public returns(string, uint, uint, address, address, address) {
        return (
            buyOffers[_tradeHash].fiatCurrency,
            buyOffers[_tradeHash].offeredEthQuantity,
            buyOffers[_tradeHash].fiatQuantity,
            buyOffers[_tradeHash].sellerAddress,
            buyOffers[_tradeHash].buyerAddress,
            buyOffers[_tradeHash].arbitratorAddress);
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
 
    function cancelSellOffer(bytes32 _tradeHash) external returns (bool) {
        require (sellOffers[_tradeHash].sellerAddress != address(0));
        if (sellOffers[_tradeHash].buyerAddress != address(0)) return false;
        delete sellOffers[_tradeHash];
        return true;
        //also need to clear currentSellOffersAddresses array before returning true.
    }
    function cancelBuyOffer(bytes32 _tradeHash) external returns (bool) {
        require(buyOffers[_tradeHash].buyerAddress != address(0));
        if (buyOffers[_tradeHash].sellerAddress != address(0)) return false;
        delete buyOffers[_tradeHash];
        return true;
        //also need to clear currentBuyOffersAddresses array before returning true.
    }
    
    function takeSellOffer(bytes32 _tradeHash) external returns (bool) {
        require(sellOffers[_tradeHash].sellerAddress != address(0));
        require(sellOffers[_tradeHash].buyerAddress == address(0));
        sellOffers[_tradeHash].buyerAddress = msg.sender;
        return true;
        //here the escrow process will get started
    }
    function takeBuyOffer(bytes32 _tradeHash, string _sellerBankaccountNumber, string _sellerBankName) external returns (bool) {
        require(buyOffers[_tradeHash].buyerAddress != address(0));
        require(buyOffers[_tradeHash].sellerAddress == address(0));
        buyOffers[_tradeHash].sellerAddress = msg.sender;
        buyOffers[_tradeHash].sellerFiatAccount.accountNumber = _sellerBankaccountNumber;
        buyOffers[_tradeHash].sellerFiatAccount.bankName = _sellerBankName;
        return true;
        //here the escrow process will get started
    }
    
}