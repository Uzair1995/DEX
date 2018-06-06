export const EscrowContract_ABI = [
	{
		"constant": false,
		"inputs": [],
		"name": "signerForArbitratorForSeller",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "sellerAmountDeposit",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "buyerSecurityDeposit",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "sellerAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "buyerAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "raiseDisputeForSeller",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "tradeHash",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_offeredAmount",
				"type": "uint256"
			}
		],
		"name": "updateOfferedAmount",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "sellerDisputeRaise",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "releaseFundsToBuyer",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "signerForBuyer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_arbitratorFees",
				"type": "uint256"
			}
		],
		"name": "updateArbitratorFees",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "updateOwner",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "buyerSentFiatAmount",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "depositForBuyer",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isArbitratorAgreeingForBuyer",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isBuyerAgreeing",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tradeHash",
				"type": "bytes32"
			},
			{
				"name": "_sellerAddress",
				"type": "address"
			},
			{
				"name": "_buyerAddress",
				"type": "address"
			},
			{
				"name": "_arbitratorAddress",
				"type": "address"
			},
			{
				"name": "_arbitratorFees",
				"type": "uint256"
			},
			{
				"name": "_offeredAmount",
				"type": "uint256"
			}
		],
		"name": "setDataToStartEscrow",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "raiseBuyerSentFiatAmount",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "arbitratorFees",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "offeredAmount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_arbitratorAddress",
				"type": "address"
			}
		],
		"name": "updateArbitrator",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "depositForSeller",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "raiseDisputeForBuyer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "arbitratorAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "releaseFundsToSeller",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "signerForArbitratorForBuyer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "signerForSeller",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_sellerAddress",
				"type": "address"
			}
		],
		"name": "updateSeller",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isArbitratorAgreeingForSeller",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isSellerAgreeing",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "buyerDisputeRaise",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_buyerAddress",
				"type": "address"
			}
		],
		"name": "updateBuyer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_tradeHash",
				"type": "bytes32"
			},
			{
				"name": "_sellerAddress",
				"type": "address"
			},
			{
				"name": "_buyerAddress",
				"type": "address"
			},
			{
				"name": "_arbitratorAddress",
				"type": "address"
			},
			{
				"name": "_arbitratorFees",
				"type": "uint256"
			},
			{
				"name": "_offeredAmount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "caller",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "UpdateOwner",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "caller",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "newSeller",
				"type": "address"
			}
		],
		"name": "UpdateSeller",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "caller",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "newBuyer",
				"type": "address"
			}
		],
		"name": "UpdateBuyer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "caller",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "newArbitrator",
				"type": "address"
			}
		],
		"name": "UpdateArbitrator",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "caller",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "arbitratorFees",
				"type": "uint256"
			}
		],
		"name": "UpdateArbitratorFees",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "caller",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "offeredAmount",
				"type": "uint256"
			}
		],
		"name": "UpdateOfferedAmount",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "caller",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "sellerAddress",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "RecievedFromSeller",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "caller",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "buyerAddress",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "RecievedFromBuyer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "caller",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "sellerAddress",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "amountToRelease",
				"type": "uint256"
			}
		],
		"name": "ReleaseFundsForSeller",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "caller",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "buyerAddress",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "ReleaseFundsForBuyer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "caller",
				"type": "address"
			}
		],
		"name": "RaiseBuyerSentFiatAmount",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "caller",
				"type": "address"
			}
		],
		"name": "SignerForSeller",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "caller",
				"type": "address"
			}
		],
		"name": "SignerForBuyer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "caller",
				"type": "address"
			}
		],
		"name": "SignerForArbitratorForBuyer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "caller",
				"type": "address"
			}
		],
		"name": "SignerForArbitratorForSeller",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "caller",
				"type": "address"
			}
		],
		"name": "RaiseDisputeForSeller",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "caller",
				"type": "address"
			}
		],
		"name": "RaiseDisputeForBuyer",
		"type": "event"
	}
];

export const DEX_MainContract_ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tradeHash",
				"type": "bytes32"
			},
			{
				"name": "_sellerBankaccountNumber",
				"type": "string"
			},
			{
				"name": "_sellerBankName",
				"type": "string"
			}
		],
		"name": "takeBuyOffer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tradeHash",
				"type": "bytes32"
			}
		],
		"name": "takeSellOffer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_tradeHash",
				"type": "bytes32"
			}
		],
		"name": "getSellOfferDetailsFromTradeHash",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_tradeHash",
				"type": "bytes32"
			}
		],
		"name": "getBuyOfferFromTradeHash",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tradeHash",
				"type": "bytes32"
			}
		],
		"name": "cancelSellOffer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "currentBuyOffersTradeHash",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCurrentSellOffersCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "escrowAddressWithRespectToTradeHash",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_tradeHash",
				"type": "bytes32"
			}
		],
		"name": "getBuyOfferDetailsFromTradeHash",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_tradeHash",
				"type": "bytes32"
			}
		],
		"name": "getSellOfferFromTradeHash",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "sellOffers",
		"outputs": [
			{
				"name": "fiatCurrency",
				"type": "string"
			},
			{
				"components": [
					{
						"name": "accountNumber",
						"type": "string"
					},
					{
						"name": "bankName",
						"type": "string"
					}
				],
				"name": "sellerFiatAccount",
				"type": "tuple"
			},
			{
				"name": "offeredEthQuantity",
				"type": "uint256"
			},
			{
				"name": "fiatQuantity",
				"type": "uint256"
			},
			{
				"name": "sellerAddress",
				"type": "address"
			},
			{
				"name": "buyerAddress",
				"type": "address"
			},
			{
				"name": "arbitratorAddress",
				"type": "address"
			},
			{
				"name": "arbitratorFee",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "buyOffers",
		"outputs": [
			{
				"name": "fiatCurrency",
				"type": "string"
			},
			{
				"components": [
					{
						"name": "accountNumber",
						"type": "string"
					},
					{
						"name": "bankName",
						"type": "string"
					}
				],
				"name": "sellerFiatAccount",
				"type": "tuple"
			},
			{
				"name": "offeredEthQuantity",
				"type": "uint256"
			},
			{
				"name": "fiatQuantity",
				"type": "uint256"
			},
			{
				"name": "sellerAddress",
				"type": "address"
			},
			{
				"name": "buyerAddress",
				"type": "address"
			},
			{
				"name": "arbitratorAddress",
				"type": "address"
			},
			{
				"name": "arbitratorFee",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tradeHash",
				"type": "bytes32"
			}
		],
		"name": "completeOffer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "escrowContracts",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tradeHash",
				"type": "bytes32"
			}
		],
		"name": "cancelBuyOffer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_fiatCurrency",
				"type": "string"
			},
			{
				"name": "_offeredEthQuantity",
				"type": "uint256"
			},
			{
				"name": "_fiatQuantity",
				"type": "uint256"
			},
			{
				"name": "_arbitratorAddress",
				"type": "address"
			}
		],
		"name": "placeBuyOffer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "currentSellOffersTradeHash",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCurrentBuyOffersCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "freeEscrowContracts",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_fiatCurrency",
				"type": "string"
			},
			{
				"name": "_sellerBankaccountNumber",
				"type": "string"
			},
			{
				"name": "_sellerBankName",
				"type": "string"
			},
			{
				"name": "_offeredEthQuantity",
				"type": "uint256"
			},
			{
				"name": "_fiatQuantity",
				"type": "uint256"
			},
			{
				"name": "_arbitratorAddress",
				"type": "address"
			}
		],
		"name": "placeSellOffer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "caller",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "tradeHash",
				"type": "bytes32"
			}
		],
		"name": "SellOfferPlaced",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "caller",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "tradeHash",
				"type": "bytes32"
			}
		],
		"name": "BuyOfferPlaced",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "caller",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "tradeHash",
				"type": "bytes32"
			}
		],
		"name": "SellOfferCanceled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "caller",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "tradeHash",
				"type": "bytes32"
			}
		],
		"name": "BuyOfferCanceled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "sellerAddress",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "buyerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "addressOfNewEscrow",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "tradeHash",
				"type": "bytes32"
			}
		],
		"name": "EscrowContractCreatedForTrade",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "tradeHash",
				"type": "bytes32"
			}
		],
		"name": "CompleteOffer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "tradeHash",
				"type": "bytes32"
			}
		],
		"name": "CompleteOfferFailed",
		"type": "event"
	}
];

export const IDEX_MainContract_ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tradeHash",
				"type": "bytes32"
			}
		],
		"name": "completeOffer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

export const IEscrowContract_ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tradeHash",
				"type": "bytes32"
			},
			{
				"name": "_sellerAddress",
				"type": "address"
			},
			{
				"name": "_buyerAddress",
				"type": "address"
			},
			{
				"name": "_arbitratorAddress",
				"type": "address"
			},
			{
				"name": "_arbitratorFees",
				"type": "uint256"
			},
			{
				"name": "_offeredAmount",
				"type": "uint256"
			}
		],
		"name": "setDataToStartEscrow",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
];