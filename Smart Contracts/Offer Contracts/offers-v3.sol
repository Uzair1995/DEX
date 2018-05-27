pragma solidity ^0.4.24;

contract OffersContract {
    
    struct SellerFiatAccount {
        string AccountNumber;
        string Bank;
        string Agency;
    }
    
    struct Offer {
        SellerFiatAccount sellerFiatAccount;
        string fiatCurrency;
        uint ethQuantity;
        uint fiatQuantity;
        uint arbitratorFee;
    }
    
    mapping (address => Offer) offers;
    Offer [] public offerList;
    
    function placeOffer(
        address _address,
        string _tradingAccount,
        string _fiatCurrency,
        uint _ethQuantity,
        uint _fiatQuantity,
        uint _arbitratorFee) external {
            Offer storage offerer = offers[_address];
            //offerer.tradingAccount = _tradingAccount;
            offerer.fiatCurrency = _fiatCurrency;
            offerer.ethQuantity = _ethQuantity;
            offerer.fiatQuantity = _fiatQuantity;
            offerer.arbitratorFee = _arbitratorFee;
            offerList.push(offerer);
    }
    
     function getOfferCount() view public returns (uint) {
        return offerList.length;
    }
    
    //function getOfferFromAddress(address _address) view public returns(string,string,uint,uint,uint) {
    //    return (offers[_address].tradingAccount,offers[_address].fiatCurrency,offers[_address].ethQuantity,offers[_address].fiatQuantity,offers[_address].arbitratorFee);
    //}
}
