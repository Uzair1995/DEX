pragma solidity ^0.4.24;

import "./EscrowContract.sol";
import "./IEscrowContract.sol";

contract DEX_MainContract {
    
    event SellOfferPlaced(address indexed caller, bytes32 indexed tradeHash);
    event BuyOfferPlaced(address indexed caller, bytes32 indexed tradeHash);
    event SellOfferCanceled(address indexed caller, bytes32 indexed tradeHash);
    event BuyOfferCanceled(address indexed caller, bytes32 indexed tradeHash);
    event EscrowContractCreatedForTrade(address indexed sellerAddress, address indexed buyerAddress, address addressOfNewEscrow, bytes32 indexed tradeHash);
    event CompleteOffer(bytes32 indexed tradeHash);
    event CompleteOfferFailed(bytes32 indexed tradeHash);
    
    struct Offer {
        string fiatCurrency;
        string paymentMethod;
        uint offeredEthQuantity;
        uint fiatQuantity;
        address sellerAddress;
        address buyerAddress;
        address arbitratorAddress;
        uint arbitratorFee;
    }

    address public owner;

    mapping (bytes32 => Offer) public sellOffers;
    mapping (bytes32 => Offer) public buyOffers;
    
    bytes32 [] public currentSellOffersTradeHash;
    bytes32 [] public currentBuyOffersTradeHash;
    address[] public escrowContracts;
    address[] public freeEscrowContracts;
    mapping (bytes32 => uint) private tradeHashIndexes;
    mapping (bytes32 => address) public escrowAddressWithRespectToTradeHash;
    
    constructor () public {
        owner = msg.sender;
    }
    
    function placeSellOffer(string _fiatCurrency, string _paymentMethod, uint _offeredEthQuantity, uint _fiatQuantity, address _arbitratorAddress) external {
        bytes32 tradeHash = keccak256(msg.sender, now, _offeredEthQuantity, _fiatQuantity, _fiatCurrency, "Sell");
        if(sellOffers[tradeHash].sellerAddress != address(0)) revert();
        Offer storage offer = sellOffers[tradeHash];
        offer.fiatCurrency = _fiatCurrency;
        offer.paymentMethod = _paymentMethod;
        offer.offeredEthQuantity = _offeredEthQuantity;
        offer.fiatQuantity = _fiatQuantity;
        offer.sellerAddress = msg.sender;
        offer.arbitratorAddress = _arbitratorAddress;
        currentSellOffersTradeHash.push(tradeHash);
        tradeHashIndexes[tradeHash] = currentSellOffersTradeHash.length - 1;
        emit SellOfferPlaced(msg.sender, tradeHash);
    }
    function placeBuyOffer(string _fiatCurrency, string _paymentMethod, uint _offeredEthQuantity, uint _fiatQuantity, address _arbitratorAddress) external {
        bytes32 tradeHash = keccak256(msg.sender, now, _offeredEthQuantity, _fiatQuantity, _fiatCurrency, "Buy");
        if(buyOffers[tradeHash].buyerAddress != address(0)) revert();
        Offer storage offer = buyOffers[tradeHash];
        offer.fiatCurrency = _fiatCurrency;
        offer.paymentMethod = _paymentMethod;
        offer.offeredEthQuantity = _offeredEthQuantity;
        offer.fiatQuantity = _fiatQuantity;
        offer.buyerAddress = msg.sender;
        offer.arbitratorAddress = _arbitratorAddress;
        currentBuyOffersTradeHash.push(tradeHash);
        tradeHashIndexes[tradeHash] = currentBuyOffersTradeHash.length - 1;
        emit BuyOfferPlaced(msg.sender, tradeHash);
    }
    
    function getSellOfferFromTradeHash(bytes32 _tradeHash) view external returns(string, string, uint, uint, address, address, address) {
        return (
            sellOffers[_tradeHash].fiatCurrency,
            sellOffers[_tradeHash].paymentMethod,
            sellOffers[_tradeHash].offeredEthQuantity,
            sellOffers[_tradeHash].fiatQuantity,
            //sellOffers[_tradeHash].arbitratorFee,
            sellOffers[_tradeHash].sellerAddress,
            sellOffers[_tradeHash].buyerAddress,
            sellOffers[_tradeHash].arbitratorAddress);
    }
    function getBuyOfferFromTradeHash(bytes32 _tradeHash) view external returns(string, string, uint, uint, address, address, address) {
        return (
            buyOffers[_tradeHash].fiatCurrency,
            buyOffers[_tradeHash].paymentMethod,
            buyOffers[_tradeHash].offeredEthQuantity,
            buyOffers[_tradeHash].fiatQuantity,
            //sellOffers[_tradeHash].arbitratorFee,
            buyOffers[_tradeHash].sellerAddress,
            buyOffers[_tradeHash].buyerAddress,
            buyOffers[_tradeHash].arbitratorAddress);
    }
    
    function getCurrentSellOffersCount() view external returns(uint) {
        return currentSellOffersTradeHash.length;
    }
    function getCurrentBuyOffersCount() view external returns(uint) {
        return currentBuyOffersTradeHash.length;
    }
 
    function cancelSellOffer(bytes32 _tradeHash) external {
        require (sellOffers[_tradeHash].sellerAddress == msg.sender);
        require (sellOffers[_tradeHash].buyerAddress == address(0));
        delete sellOffers[_tradeHash];
        deleteSellOfferTradeHash(_tradeHash);
        emit SellOfferCanceled(msg.sender, _tradeHash);
    }
    function cancelBuyOffer(bytes32 _tradeHash) external {
        require(buyOffers[_tradeHash].buyerAddress == msg.sender);
        require(buyOffers[_tradeHash].sellerAddress == address(0));
        delete buyOffers[_tradeHash];
        deleteBuyOfferTradeHash(_tradeHash);
        emit BuyOfferCanceled(msg.sender, _tradeHash);
    }
    
    function takeSellOffer(bytes32 _tradeHash) external {
        require(sellOffers[_tradeHash].sellerAddress != address(0));
        require(sellOffers[_tradeHash].buyerAddress == address(0));
        sellOffers[_tradeHash].buyerAddress = msg.sender;
        createEscrowContract(_tradeHash, sellOffers[_tradeHash].sellerAddress, sellOffers[_tradeHash].buyerAddress, sellOffers[_tradeHash].arbitratorAddress, 0, sellOffers[_tradeHash].offeredEthQuantity);
    }
    function takeBuyOffer(bytes32 _tradeHash) external {
        require(buyOffers[_tradeHash].buyerAddress != address(0));
        require(buyOffers[_tradeHash].sellerAddress == address(0));
        buyOffers[_tradeHash].sellerAddress = msg.sender;
        createEscrowContract(_tradeHash, buyOffers[_tradeHash].sellerAddress, buyOffers[_tradeHash].buyerAddress, buyOffers[_tradeHash].arbitratorAddress, 0, buyOffers[_tradeHash].offeredEthQuantity);
    }
    
    function completeOffer (bytes32 _tradeHash) external {
        require(escrowAddressWithRespectToTradeHash[_tradeHash] == msg.sender);
        if (buyOffers[_tradeHash].buyerAddress != address(0))
        {
            delete buyOffers[_tradeHash];
            deleteBuyOfferTradeHash(_tradeHash);
            freeEscrowContracts.push(escrowAddressWithRespectToTradeHash[_tradeHash]);
            delete escrowAddressWithRespectToTradeHash[_tradeHash];
            emit CompleteOffer(_tradeHash);
        }
        else if (sellOffers[_tradeHash].sellerAddress != address(0)) {
            delete sellOffers[_tradeHash];
            deleteSellOfferTradeHash(_tradeHash);
            freeEscrowContracts.push(escrowAddressWithRespectToTradeHash[_tradeHash]);
            delete escrowAddressWithRespectToTradeHash[_tradeHash];
            emit CompleteOffer(_tradeHash);
        }
        else{
            emit CompleteOfferFailed(_tradeHash);
        }
    }
    
    //private functions
    function createEscrowContract (bytes32 _tradeHash, address _sellerAddress, address _buyerAddress, address _arbitratorAddress, uint _arbitratorFees, uint _offeredAmount) private {
        address escrowAddress;
        if(freeEscrowContracts.length > 0)
        {
            escrowAddress = freeEscrowContracts[freeEscrowContracts.length-1];
            IEscrowContract escrowContractInterface = IEscrowContract(escrowAddress);
            escrowContractInterface.setDataToStartEscrow(_tradeHash, _sellerAddress, _buyerAddress, _arbitratorAddress, _arbitratorFees, _offeredAmount);
            freeEscrowContracts.length--;
        }
        else{
            escrowAddress = new EscrowContract(_tradeHash, _sellerAddress, _buyerAddress, _arbitratorAddress, _arbitratorFees, _offeredAmount);
            escrowContracts.push(escrowAddress);
        }
        escrowAddressWithRespectToTradeHash[_tradeHash] = escrowAddress;
        emit EscrowContractCreatedForTrade(_sellerAddress, _buyerAddress, escrowAddress, _tradeHash);
    }
    function deleteSellOfferTradeHash(bytes32 _tradeHash) private {
        bytes32 tradeHashAtLastIndex = currentSellOffersTradeHash[currentSellOffersTradeHash.length-1];
        currentSellOffersTradeHash[tradeHashIndexes[_tradeHash]] = tradeHashAtLastIndex;
        //delete currentSellOffersAddresses[tradeHashAtLastIndex].index;
        delete tradeHashIndexes[_tradeHash];
        currentSellOffersTradeHash.length--;
    }
    function deleteBuyOfferTradeHash(bytes32 _tradeHash) private {
        bytes32 tradeHashAtLastIndex = currentBuyOffersTradeHash[currentBuyOffersTradeHash.length-1];
        currentBuyOffersTradeHash[tradeHashIndexes[_tradeHash]] = tradeHashAtLastIndex;
        delete tradeHashIndexes[_tradeHash];
        currentBuyOffersTradeHash.length--;
    }
    
}