pragma solidity ^0.4.24;

contract MainEscrowContract {
    
    struct Offer {
        string tradingAccount;
        string fiatCurrency;
        uint ethQuantity;
        uint fiatQuantity;
        uint arbitratorFee;
    }
    
    mapping (address => Offer) offers;
    address[] public offerAccountList;
    
    function placeOffer(address _address,string _tradingAccount, string _fiatCurrency, uint _ethQuantity,uint _fiatQuantity,uint _arbitratorFee) external {
        Offer storage offerer = offers[_address];
        offerer.tradingAccount = _tradingAccount;
        offerer.fiatCurrency = _fiatCurrency;
        offerer.ethQuantity = _ethQuantity;
        offerer.fiatQuantity = _fiatQuantity;
        offerer.arbitratorFee = _arbitratorFee;

        offerAccountList.push(_address);
    }
    
    function getOfferAccounts() view public returns (address[]) {
        return offerAccountList;
    }
    
    function getOffer(address _address) view public returns(string,string,uint,uint,uint) {
        return (offers[_address].tradingAccount,offers[_address].fiatCurrency,offers[_address].ethQuantity,offers[_address].fiatQuantity,offers[_address].arbitratorFee);
    }
    
     function getOfferCount() view public returns (uint) {

        return offerAccountList.length;
    }
    
    
    
    
}