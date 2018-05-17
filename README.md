# DEX
Decentralized Crypto-to-Fiat Exchange
DEX is divided into two phases first phase is Crypto-to-Fiat focusing on Ethereum based escrow service and the second phase is Crypto-to-Crypto exchange using atomic swaps and related technologies.





Phase 1 Trade: BTC <-> Fiat/Crypto:

With respect to the user's journey, first of all, the user will be asked to set up the software. He will need to create new addresses or enter his own addresses with private keys.
The second part of the journey would be to show the current market rates to the users. This can be done using any api which is providing the desired results.
The last part consits of trade. Trade includes:
1)Order Placing (P2P -> Broadcasting)
2)Order Locking or Order matching
3)Escrow deposit to the address (also include HTLC)
4)Verification
5)Payout using multisig

1) Order Placing:
The order book will be completely decentralized. All nodes or computers will be connected with a P2P network. At startup every trader will load all offers for his selected national currency from the P2P network peers he connects to. These offers will fill up the order book visible to the user. If the users want to trade with a new offer, they will have to broadcast a message that will contain the details of the trade as well as the arbitrator that they have chosen. The details of the trade include name of the currencies, amount they want to buy or sell, rate at which they are buying and selling and lastly the payment methods they want to use for fiat currency. This message will be signed so that the authenticity of the offer can be maintained. There will be a time to live for the broadcasted message that will tell that the offer is still valid.

2) Order Locking:
The user which is accepting the offer will validate the offer and he will also have to check that the order is still valid. Furthermore, he will also have to agree with that the arbitrator chosen.

3) Deposit Transaction:
A deposit transaction is created using a 2-of-3 multi-signature to fund the escrow address. The deposit transaction is passed for completion and signing between the traders over the messaging channel. Finally it is published to the blockchain by the offerer. The deposit transaction to the escrow address contains:
	-Input from Buyer: Security deposit + mining fee to send to buyer address from escrow + trading fees -> fix mining fee (Slow, Fast, Medium)
	-Input from Seller: Security deposit + mining fee to send to escrow + trade amount + trading fees
	-Input from arbitrator: Security deposit
	-Output to escrow address: 3*Security deposit + mining fee to send to buyer address from escrow + trade amount + 2*trading fees
One more thing that BISQ has added is that they are creating a contranct, which is signed by both the parties and contains all the details of the trade. This contract is stored locally and can only be used incase of dispute.

4) Verification:
Once the deposit transaction is broadcasted a countdown will start in which the buyer will have to pay fiat currency to the seller using the selected payment method. The seller wil have to wait for the buyer to send the fiat amount. If the amount is arrived according to the parameters defined in the contract, then the seller will proceed to the payout using multisig.
And if not then there will be a case of dispute.

5) Payout using multisig:
The payout transaction contains:
	-Input: Funds from multisig escrow address, signed by buyer
	-Output to buyer: Security deposit refund + release of payment to Alice
	-Output to seller: Security deposit refund
	-Output to arbitrator: Security deposit refund + trading fee/2
	-Output to exchange: trading fee + trading fee/2
	




Phase 2 Trade: Crypto <-> Crypto:

For doing crypto to crypto we will need to implement atomic swap mechanisms. We will be writing HTLC (Hashed timelock contracts) on every chain. We may not be needing to download whole blockchains. We can use the same network as above to recieve and validate transactions.




Ref and motivation:
- https://github.com/KomodoPlatform/KomodoPlatform/wiki/BarterDEX-%E2%80%93-A-Practical-Native-DEX
- https://github.com/KomodoPlatform/KomodoPlatform/wiki/barterDEX-Whitepaper-v2
