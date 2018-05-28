pragma solidity ^0.4.24;

contract OffersContract {
    
    struct SellerFiatAccount {
        string accountNumber;
        string bank;
        string agency;
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
        string _accountNumber,
        string _bank,
        string _agency,
        string _fiatCurrency,
        uint _ethQuantity,
        uint _fiatQuantity,
        uint _arbitratorFee) external {
            Offer storage offerer = offers[_address];
            offerer.sellerFiatAccount.accountNumber = _accountNumber;
            offerer.sellerFiatAccount.bank = _bank;
            offerer.sellerFiatAccount.agency = _agency;
            offerer.fiatCurrency = _fiatCurrency;
            offerer.ethQuantity = _ethQuantity;
            offerer.fiatQuantity = _fiatQuantity;
            offerer.arbitratorFee = _arbitratorFee;
            offerList.push(offerer);
    }
    
     function getOfferCount() view public returns (uint) {
        return offerList.length;
    }
    
    function getOfferFromAddress(address _address) view public returns(string,uint,uint,uint,string,string,string) {
        return (offers[_address].fiatCurrency,offers[_address].ethQuantity,offers[_address].fiatQuantity,offers[_address].arbitratorFee,offers[_address].sellerFiatAccount.accountNumber,offers[_address].sellerFiatAccount.bank,offers[_address].sellerFiatAccount.agency);
    }
}
