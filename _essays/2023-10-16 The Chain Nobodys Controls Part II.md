---
layout: article
title: "How Blockchain Works: Blocks, Hashes and Mining"
subtitle: "Part 2 — The Chain Nobody Controls"
date: 2023-10-16
author: "Kennidy L. Guimarães"
email: "kennidyLguimaraes@gmail.com"
categories: [bitcoin, blockchain, cryptography]
series: "the-chain-nobody-controls"
series_part: 2
references:
  - "Nakamoto, S. (2008). Bitcoin: A Peer-to-Peer Electronic Cash System. https://bitcoin.org/bitcoin.pdf"
  - "Satoshi Nakamoto — Bitcoin Wiki. https://en.bitcoin.it/wiki/Satoshi_Nakamoto"
  - "IBM. What is Blockchain? https://www.ibm.com/topics/blockchain"
  - "Wikipedia. 2007–2008 Financial Crisis. https://en.wikipedia.org/wiki/2007%E2%80%932008_financial_crisis"
  - "U.S. Senate Committee on Banking, Housing, and Urban Affairs. (2013). https://www.govinfo.gov/content/pkg/CHRG-113shrg86598/pdf/CHRG-113shrg86598.pdf"
  - "The Times. (2009). Chancellor on brink of second bailout for banks. https://www.thetimes.com/article/chancellor-alistair-darling-on-brink-of-second-bailout-for-banks-n9l382mn62h"
  - "Blockchair. Bitcoin Block 0 (Genesis Block). https://blockchair.com/bitcoin/block/0"
  - "U.S. Bureau of Labor Statistics. (2022). Purchasing Power of the Consumer Dollar. https://www.bls.gov/cpi/factsheets/purchasing-power-constant-dollars.htm"
  - "Dai, W. (1998). B-Money. http://www.weidai.com/bmoney.txt"
  - "Back, A. (2002). Hashcash — A Denial of Service Counter-Measure. http://www.hashcash.org/papers/hashcash.pdf"
  - "IMF. Inflation. https://www.imf.org/en/Publications/fandd/issues/Series/Back-to-Basics/Inflation"
  - "Reuters. Why scarcity is an important feature of bitcoin. https://www.reuters.com/plus/cme/why-scarcity-is-an-important-feature-of-bitcoin"
  - "Wikipedia. Gold Reserve Act. https://en.wikipedia.org/wiki/Gold_Reserve_Act"
  - "An Act to Protect the Currency System of the United States. https://govtrackus.s3.amazonaws.com/legislink/pdf/stat/48/STATUTE-48-Pg337a.pdf"

---

Blockchain is a distributed and immutable ledger — the infrastructure that makes Bitcoin possible. In Part 1 of this series, we saw how it solves the double-spending problem. Now we go one level deeper: how this structure actually works internally, block by block, hash by hash [[1]](#ref-1).

---

### How Blockchain Works

Blockchain is a distributed and immutable ledger that records transactions in blocks interconnected through cryptographic hashes. Each block contains a timestamp, transaction data, a digital signature to ensure authenticity, and the hash of the previous block header, creating a chain of blocks ("Blockchain").

Blockchain is managed by a *peer-to-peer* (P2P) network, which distributes the data among the network's *nodes*. In other words, each *node* holds a backup copy that ensures authenticity, guaranteeing that no other copy can be altered without consensus [[3]](#ref-3).

Each *node* must perform a **proof of work**, which we can call mining. This process consists of solving a complex mathematical problem, whose complexity is defined by the network based on the number of *nodes*. The more *nodes*, the more complex the problem becomes (determined by the network's *hashrate*), and the more computational power is required to solve it.

When the problem is solved, a reward is paid to the computer or *pool* that solved it. **Pools** are the voluntary connection of multiple computers to obtain a greater competitive advantage. Normally, the reward is divided among the members of the *pool*, with a portion reserved for the administrators.

---

### The Structure of the Blockchain

As explained earlier, the blockchain is a ledger that involves solving complex mathematical problems and a linked list. It is important to understand that, although its theoretical design is somewhat simple, its practical applicability is complex and follows a flow of Merkle trees (*Merkle Tree*).

Blocks contain some information that is necessary for the functioning and operation of the network as a whole, including: the digital signature of the previous block, the *hash* of the previous block, date and time, Merkle tree, and the transaction (destination address and value).

<figure class="artigo-figura">
  <img src="{{ site.baseurl }}/files/essays/the-chain-nobody-controls/structure-of-a-block-in-blockchain.png" alt="structure of a block in blockchain" />
  <figcaption>Figure 1 — Simple representation taken from the Bitcoin whitepaper. www.shiksha.com</figcaption>
</figure>

The requirement to contain the signature of the previous block creates what can be called a chain between blocks, since each block remains linked to a previous block. In simple terms, the last block will always be the most up-to-date and will always be treated as the main block.

<figure class="artigo-figura">
  <img src="{{ site.baseurl }}/files/essays/the-chain-nobody-controls/TCNCBlockchain.png" alt="Diagram of chained blocks in the blockchain" />
  <figcaption>Figure 2 — Simple representation taken from the Bitcoin whitepaper.</figcaption>
</figure>

This ensures that with each transaction, a new block is generated and added to the mining queue. When the block is mined, its transaction becomes trustworthy on the blockchain and cannot be altered — that is, a transaction cannot be undone (reversed).
Suppose that a fake block is forced through the blockchain network; we explain why this is not an economically viable task.

### Mining and Problem Solving

To add a block to the chain, it is necessary to solve a mathematical problem called **proof of work** (*Proof of Work*). The computer that solves this mathematical problem receives a small amount corresponding to the transaction fees. Proof of work consists of finding a *nonce* that, when combined with the block’s value, satisfies the condition of the problem.

We can illustrate this problem as follows:

```
H(A || B) = 0001832d32...
H(A || B₁) = 9f3a7c8a12...
H(A || B₂) = 7a51c92d77...
```



Considering `H` as a hash function such as SHA-256, `A` as a known value contained in the block header, `B` as an unknown value (*nonce*), and `A || B` as the concatenation between them, the objective is to find a value of `B` such that the resulting hash satisfies a predefined condition.

In Bitcoin mining, the condition is defined as:

<div class="math-block">

$$
H(A \parallel B) < T
$$

</div>

Where:

- \(H\) is the hash function (SHA-256 applied twice),
- \(A\) represents the known part of the block header,
- \(B\) represents the *nonce*,
- \(T\) represents the **network target**, which determines the mining difficulty.

Since cryptographic hash functions behave like pseudo-random functions, it is not possible to directly compute the correct value of \(B\). Instead, the miner must test many possible values until the condition is satisfied.

The search process can be described as a brute-force iteration:

<div class="math-block">

$$
B_k = k, \quad k = 0,1,2,3,\dots
$$

</div>

For each candidate value \(B_k\), the miner computes:

<div class="math-block">

$$
h_k = H(A \parallel B_k)
$$

</div>

The block is considered valid when:

<div class="math-block">

$$
h_k < T
$$

</div>

Because SHA-256 produces a 256-bit output, the probability that a single hash attempt succeeds is approximately:

<div class="math-block">

$$
P(\text{success}) = \frac{T}{2^{256}}
$$

</div>

This means that miners must perform a very large number of hash computations before finding a valid nonce. If the probability of success per attempt is \(p\), the expected number of attempts required is approximately:

<div class="math-block">

$$
E[\text{attempts}] \approx \frac{1}{p}
$$

</div>

This computational effort is what constitutes the **proof of work**.

In addition, the network has the capacity for **self-adjustment**. Every 2016 blocks, the network recalculates the value of \(T\) in order to maintain an average block generation time of approximately **ten minutes**. If blocks are being mined too quickly, the target is reduced, increasing the difficulty. If blocks are mined too slowly, the target increases, reducing the difficulty.

Finally, each block contains the hash of the previous block, forming a chronological chain. This relationship can be represented as:

<div class="math-block">

$$
H_n = H(B_n), \quad B_n = \{ \text{data}_n, H_{n-1} \}
$$

</div>

Where $H_{n-1}$ is the hash of the previous block. This structure ensures that altering any past block would require recomputing the proof of work for all subsequent blocks, making the blockchain computationally secure.

### TimeChain and Smart Contracts

As demonstrated in the previous sections, the blockchain is composed of an arrangement of blocks that contain various pieces of information. Among this information are date and time, which can be used as a **global clock**. Although this functionality is little explored, it is plausible that the blockchain may be used to capture date and time data and provide this resource through an API. In this way, it would be possible to establish smart contracts, which could easily be built using Bitcoin Script.

For example, Maria and João decide that on a Sunday night, at 12:00, they will perform a transaction with RoadTurism, a tourism company. They plan to take a tour to see the flower fields in the city and, for that reason, they cannot stay awake until late. However, they still do not have the money (Sats), which should only arrive in their accounts around 11:00 on the same day. Knowing that it is guaranteed that both will receive the transfer, they decide to create a script (Bitcoin Script) for a smart contract. Thus, as soon as the Sats arrive in their accounts, the amount will immediately be sent to the RoadTurism wallet.

This is just one example of how the TimeChain can be used together with smart contracts. However, you may choose to use it simply as a "wall clock" — that is, to check the time, even if with lower precision. In some scenarios, this may be a logical and functional choice, especially when the costs of maintaining or providing a date and time API become high due to the number of requests.

See below the script for the implementation. Note how Bitcoin Script is a stack-based language (*StackScript*). Read more about Bitcoin Script at [en.bitcoin.it/wiki/Script](https://en.bitcoin.it/wiki/Script).

```bitcoin
OP_IF
  <UNIX_TIMESTAMP_12:00_SUNDAY> OP_CHECKLOCKTIMEVERIFY OP_DROP
  <ROAD_TOURISM_ADDRESS> OP_DUP OP_HASH160 <HASH160_RECIPIENT_PUBLIC_KEY> OP_EQUALVERIFY OP_CHECKSIG
OP_ELSE
  OP_HASH160 <HASH160_MARIA_PUBLIC_KEY> OP_EQUALVERIFY
  OP_HASH160 <HASH160_JOAO_PUBLIC_KEY> OP_EQUALVERIFY
  2 OP_CHECKMULTISIG
OP_ENDIF
```

---

### Privacy

Although the blockchain is public and all transactions are accessible, it is possible to maintain a good level of privacy and anonymity. Unlike traditional banking systems, the blockchain allows complete user anonymity, since there is no practical way to directly link users to their wallets — although this is possible and has occurred numerous times, in most cases it happens due to human failure rather than flaws in the system.

Consider, for example, a user living under a tyrannical government. They may choose to use their wallet together with Onion *proxies*, adopt a pseudonym, and split their funds across several wallets without a direct connection. If they prefer, they can resort to mixing systems, perform transfers directly through their *node*, and then switch the *node* or change their IP.

Even if this user does not have internet access, it is still possible to perform transactions using radio, satellite, laser, images, and even the Moon as an intermediary. It is evident that users in such situations would prefer regions with laws and governments more favorable to their interests. However, even in unstable governments, it is possible to keep finances secure at some level. Transporting value will also not be a problem: the user can memorize the *passphrase* or simply encrypt it and write it down on a piece of paper. Later, they only need to type it into an *input* and enter the password to decrypt it; often, the Rijndael algorithm will be sufficient to guarantee security.

---

### Security

Defining something as secure is always a challenge; there is no infallible solution or "silver bullet." Anything can be considered insecure if we take all extraordinary probabilities into account. However, if we focused on those probabilities, we would end up avoiding many everyday activities.

<span class="destaque-bloco">
Theoretically, we can state that the blockchain is unbreakable. However, it is important to highlight that something is unbreakable only until the moment it ceases to be. There is no way to predict with certainty when or how that might occur. What we can say is that blockchain security is among the most advanced, thanks to the use of sophisticated mathematics and innovative technologies.
</span>

Now consider a hypothetical scenario in which an individual or organization attempted to defraud the blockchain. To do so would require extremely advanced computational power, and the financial return obtained would be minimal. This happens because the blockchain uses a decentralized registry system to verify transactions between blocks through proof of work. In this case, it would be more advantageous for the organization to collaborate with miners in validating blocks and receive legitimate rewards. The logic is simple: if being honest is more advantageous and profitable than being dishonest, the logical choice would be to avoid fraudulent practices.

<span class="destaque-bloco">
This is deeply connected to the theory of <em>Perverse Incentives</em>: if a certain individual understands that the punishment for their crime is financial restriction and the restriction of their freedom, the operational cost of committing the crime is discouraged by the underlying punishment. In the opposite case, if the organization that promises such retaliation does not have the means to punish them — or if the penalty is too mild — they will be encouraged to commit the crime. Imagine that the punishment for stealing a car were merely returning the vehicle: the offender would think, "in the worst case, I will lose an asset that was not even mine to begin with."
</span>

Even so, this does not mean that the blockchain is completely secure. As mentioned, everything becomes insecure when we consider extraordinary probabilities. In fact, during the planning and early implementation of the blockchain, failures occurred that compromised the network and funds. It is true that over the more than 15 years since the emergence of this technology, many of these flaws have been corrected by security specialists around the world, and the technology has evolved significantly.

If your question is "Is blockchain safe for me?", the answer is: **it depends**. The chances of something bad happening are relatively low, considering the maturity of the technology, the number of documented incidents, and the robustness of the solutions employed. However, it is more important to reflect on questions such as:

- Do I understand blockchain technology?
- Am I storing my access keys securely?
- What are the chances that my wallet has been compromised?
- Is the application I use (*wallet*) secure and open source?

Notice how security can be compromised, especially by the human factor. In many cases, the weakest link in the security chain is not the blockchain technology itself, but the user.

---

### Bitcoin, a Scarce Asset

Scarcity is an important characteristic of Bitcoin and of the blockchain network itself. But to understand this concept, we first need to understand what inflation is.

According to the IMF (*International Monetary Fund*), inflation measures how much a set of goods and services has become more expensive over a given period, usually a year [[11]](#ref-11). Many people associate inflation with rising prices and, although this is somewhat correct, price increases are not inflation itself but rather one of its consequences.

Inflation can be defined as the increase of the monetary base, which in turn reduces the purchasing power of the currency in circulation. For example, imagine that there are only 50,000 units of a currency called "Native Silver — Pn", produced based on a single mine in a certain country. This currency is very valuable because there are few units, and unless new mines are discovered for exploration, new coins cannot be minted.

Now suppose that 90% of these coins are in full circulation, while the remainder is under the control of the country’s central bank or reserved as a financial fund. If this nation faces unexpected problems — such as storms, hurricanes, earthquakes, or other disasters — this may lead to the depletion of national reserves. Without new mines available, the country may resort to a small "trick": mixing copper with silver. In this case, there will be inflation for two reasons: the increase of the monetary base, with many more coins in circulation; and the deterioration of the backing, since the coin is no longer 99.9% silver but a mixture — and therefore will have a lower value. The greater the quantity of coins in circulation, the higher the inflation; the greater the amount of copper, the lower the value of each unit.

<span class="destaque-bloco">
The same occurred when President Franklin D. Roosevelt changed the statutory price of gold from *US$ 20.67* to *US$ 35.00* per troy ounce after the approval of the Gold Reserve Act — which granted the American president full powers to define the value of gold and allowed the rupture of the Dollar/Gold backing into Dollar/Issuer Trust. One year earlier, in 1933, Executive Order 6102 had made it a crime for U.S. citizens to own or trade gold anywhere in the world. The confiscated gold was stored at Fort Knox [[13]](#ref-13)[[14]](#ref-14).
</span>

Roosevelt justified the Gold Reserve Act of 1934 with the following words:

<span class="destaque-bloco">
"Since there was not enough gold to pay all holders of gold obligations, [...] the Government should, in the interest of justice, allow no one to be paid in gold."
</span>

Unlike gold or the dollar, Bitcoin is scarce. It is not possible to print more bitcoins beyond those predefined in its source code — there will be no more than 21 million units for all 8 billion inhabitants, including its subdivision into *satoshis* (21M × 100M). This means that Bitcoin inflation is unlikely. (Note that I refer to inflation, not deflation — something that can indeed occur and deserves further research.)

Furthermore, unlike gold, it is not possible to confiscate your bitcoins by decree. They exist only on the blockchain network, distributed globally. Carrying out an act like the Gold Reserve Act is practically unfeasible, since there can be no viable and practical control. The premise of Bitcoin is this: it is yours, and no one — not even the creator (Satoshi Nakamoto) — can take it. Not even a single *satoshi*.

---

### Conclusion

Bitcoin is a scarce asset, limited to 21,000,000 units. Each unit can be divided into 100,000,000 *satoshis*, which in turn can be further subdivided into even smaller units. The blockchain is an arrangement of immutable blocks that records information from every Bitcoin transaction, and it is fundamental to guaranteeing the existence and security of Bitcoin.

The probability of a successful brute-force attack against the Bitcoin network and its blockchain is extremely low due to its complexity and the immense processing power required. Furthermore, the costs for an attacker to carry out any kind of attack would be exorbitant and, in contrast, the financial gains obtained would be insignificant. For this reason, it is often more profitable to join the blockchain network as a miner, contributing to its security and obtaining rewards, rather than attempting to attack it.

To learn more about Bitcoin and Blockchain, access (*Bitcoin Whitepaper & BitcoinTalk*) in the references.

---