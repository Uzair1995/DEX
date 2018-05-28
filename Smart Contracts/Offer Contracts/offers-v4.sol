pragma solidity ^0.4.24;

contract OffersContract {
    
    event OfferPlaced(string indexed offerHash,
        string sellerBankaccountNumber,
        string sellerBankName,
        uint offeredEthQuantity,
        uint fiatQuantity,
        address indexed sellerAddress,
        address indexed buyerAddress,
        address arbitratorAddress,
        uint arbitratorFee,
        bool isActive);
    
    
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
    
    
    mapping (address => Offer) offers;
    address [] public currentOffersAddresses;
    
    
    function placeSellOffer(
        string _fiatCurrency,
        string _sellerBankaccountNumber,
        string _sellerBankName,
        uint _offeredEthQuantity,
        uint _fiatQuantity,
        address _sellerAddress,
        address _buyerAddress,
        address _arbitratorAddress,
        uint _arbitratorFee) external {
            Offer storage offer = offers[_sellerAddress];
            offer.fiatCurrency = _fiatCurrency;
            offer.sellerFiatAccount.accountNumber = _sellerBankaccountNumber;
            offer.sellerFiatAccount.bankName = _sellerBankName;
            offer.offeredEthQuantity = _offeredEthQuantity;
            offer.fiatQuantity = _fiatQuantity;
            offer.sellerAddress = _sellerAddress;
            offer.buyerAddress = _buyerAddress;
            offer.arbitratorAddress = _arbitratorAddress;
            offer.arbitratorFee = _arbitratorFee;
            offer.isActive = true;
            currentOffersAddresses.push(_sellerAddress);
            emit OfferPlaced(_fiatCurrency, _sellerBankaccountNumber, _sellerBankName, _offeredEthQuantity, _fiatQuantity, _sellerAddress, _buyerAddress, _arbitratorAddress, _arbitratorFee, true);
    }
    
    function getOfferFromAddress(address _address) view public returns(string, uint, uint, address, address, address, bool) {
        return (
            offers[_address].fiatCurrency,
            offers[_address].offeredEthQuantity,
            offers[_address].fiatQuantity,
            offers[_address].sellerAddress,
            offers[_address].buyerAddress,
            offers[_address].arbitratorAddress,
            offers[_address].isActive);
    }
    
    function getOfferDetailsFromAddress(address _address) view public returns(uint, string, string) {
        return (
            offers[_address].arbitratorFee,
            offers[_address].sellerFiatAccount.accountNumber,
            offers[_address].sellerFiatAccount.bankName);
    }
    
    function getCurrentOffersCount() view public returns(uint) {
        return currentOffersAddresses.length;
    }
}
