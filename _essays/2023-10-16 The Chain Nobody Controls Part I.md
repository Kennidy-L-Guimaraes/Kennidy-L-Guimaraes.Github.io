---
layout: article
title: "The Chain Nobody Controls: Bitcoin as an Intangible Asset and the Double-Spending Problem"
subtitle: "Part I - A System Designed for a World Without Trust"
date:  2023-10-16
author: "Kennidy L. Guimarães"
categories: [bitcoin & blockchain]
tags: [Bitcoin, Blockchain, Chains of links, Hash, Mathematics, Satoshi Nakamoto]
image: /assets/img/og/bitcoin-as-an-intangible-asset-and-the-double-spending-problem.png
references:
  - "Nakamoto, S. (2008). Bitcoin: A Peer-to-Peer Electronic Cash System. https://bitcoin.org/bitcoin.pdf"
  - "Satoshi Nakamoto — Bitcoin Wiki. https://en.bitcoin.it/wiki/Satoshi_Nakamoto"
  - "IBM. What is Blockchain? https://www.ibm.com/topics/blockchain"
  - "Wikipedia. 2007–2008 Financial Crisis. https://en.wikipedia.org/wiki/2007%E2%80%932008_financial_crisis"
  - "U.S. Senate Committee on Banking, Housing, and Urban Affairs. (2013). Hearing on the Financial Crisis. https://www.govinfo.gov/content/pkg/CHRG-113shrg86598/pdf/CHRG-113shrg86598.pdf"
  - "The Times. (2009). Chancellor Alistair Darling on brink of second bailout for banks. https://www.thetimes.com/article/chancellor-alistair-darling-on-brink-of-second-bailout-for-banks-n9l382mn62h"
  - "Blockchair. Bitcoin Block 0 (Genesis Block). https://blockchair.com/bitcoin/block/0"
  - "U.S. Bureau of Labor Statistics. (2022). Purchasing Power of the Consumer Dollar. https://www.bls.gov/cpi/factsheets/purchasing-power-constant-dollars.htm"
  - "Dai, W. (1998). B-Money. http://www.weidai.com/bmoney.txt"
  - "Back, A. (2002). Hashcash — A Denial of Service Counter-Measure. http://www.hashcash.org/papers/hashcash.pdf"
series: "the-chain-nobody-controls"
series_part: 1
related:
  - title: "How the Blockchain Works: Mining, Time, and Scarcity"
    category: "Bitcoin"
    date: "2023"
    url: "#"
---
{% include ref-tooltips.html references=page.references %}


Trust is a risk asset.
Employers trust employees to perform their work; employees trust employers to pay them. Buyers trust merchants to deliver goods honestly, while merchants trust that the money they receive is legitimate and retains value.
Contracts depend on courts, banks depend on governments, and society itself depends on the assumption that these systems will continue to function tomorrow as they do today.

As Satoshi Nakamoto once wrote:
<div class="destaque-bloco">
 "The root problem with conventional currency is all the trust that's required to make it work."
</div>

The monetary system, however, has not always proven worthy of that trust.
Financial crises, uncontrolled monetary expansion, banking collapses, and the progressive erosion of purchasing power raised a fundamental question: what if value could exist independently of governments, banks, or centralized financial institutions?
What if monetary integrity could be enforced not by political promises, but by transparent mathematical rules?

From this idea emerged Bitcoin and, with it, the blockchain: a distributed system designed to validate transactions without requiring centralized trust.

### Value, Ownership, and Digital Assets

Assets can generally be divided into two categories: tangible and intangible.
_Tangible assets_ possess physical existence: land, gold, paper money, buildings, or any object whose ownership is materially observable.
_Intangible assets_, on the other hand, derive their existence from legal, informational, or cryptographic recognition rather than physical form.

---

### Cryptographic Ownership

Bitcoin is an intangible asset, much like digital cash. It has no physical form, nor does a file containing "your bitcoins" exist somewhere on a central server.

Ownership in Bitcoin is defined cryptographically. Control over a wallet is determined by possession of its private keys, which authorize transactions on the network.
Unlike traditional banking systems, however, Bitcoin does not rely on a centralized server maintaining balances and permissions. Instead, the system operates through a distributed ledger replicated across thousands of nodes {% include ref.html n=1 %}, where transactions are publicly verified and permanently recorded.

This is the origin of the well-known expression:

<div class="destaque-bloco"> "Not your keys, not your coins." </div>

In practical terms, control over the cryptographic keys represents control over the asset itself.

---

## The Double-Spending Problem and the Blockchain Concept

Systems like the one described above (trust-based credit systems) have numerous characteristics that many may consider either advantageous or disadvantageous, such as spending controls that prevent a given amount from being sent twice to the same account.

Imagine that Alice owes Bob US$ 50.00 (fifty dollars). She decides to send a check for the amount owed; however, until the check clears, she can still change her mind and cancel it, leaving Bob with a minor trust problem.

<figure class="artigo-figura">
<img src="{{ site.baseurl }}/files/essays/the-chain-nobody-controls/AliceAndBob.webp" alt="Alice And Bob">
  <figcaption>Figure 1 — The image represents a potential breach of trust.</figcaption>
</figure>

Obviously, if she uses other methods such as CreditCard, this will not be possible, since the system administrators will not allow double-spending. When an amount is sent from Alice to Bob, a record is created stating that the funds left account (ALICE-0651) and arrived at account (BOB-0233). This record includes the amount transferred, along with other data such as the time, date, and validation system — in many cases, the system may require that the transaction be held for integrity verification.
This mechanism is crucial to prevent Alice from spending the balance in her account twice.

### The Problem and Its Solution

This problem is known in computer science as the double-spending problem, and it involves preventing the holder of a wallet (card or similar) from spending their funds twice, generating a deficit that may never be covered. The most commonly used approach to prevent double-spending is the use of records. These records must naturally be trustworthy and tamper-proof, so that we can guarantee that Alice paid what she owed Bob, and that Bob received the amount due to him.

You might ask: what does this have to do with blockchain? The answer is simpler than you might think: everything.

The blockchain is the solution that Satoshi Nakamoto (creator of Bitcoin and the blockchain) {% include ref.html n=2 %} found to solve the double-spending problem in Bitcoin. In general terms, the blockchain is a large ledger containing all information about the transfers made on the network, including who transferred what to whom, and when.
The blockchain system is public and auditable by anyone, meaning Bob can track the transfer in real time and verify whether it has been completed. Likewise, Alice can confirm that the amount she sent to Bob has actually reached its destination.

One truly important detail is that the blockchain is a pseudonymous system: although it may appear anonymous, there are ways to link transactions to a person's real-world identity — even if certain methods and practices, when adopted, can make transactions "nearly" untraceable. I will discuss this further in another article.

From this, we can understand that the blockchain is a ledger — a large informational registry that documents every transaction on the Bitcoin network, recording who transferred what to whom, in a manner that is public and easily auditable.
The blockchain is sometimes considered more secure than traditional systems due to its resistance to government censorship. The fact that the system cannot be altered without the consent of the network makes it highly resistant to dishonest manipulation. Every transaction is permanently recorded: it cannot be deleted or undone unless a majority of the network's hash power (commonly called a 51% majority) agrees {% include ref.html n=3 %}.

---

## How the Blockchain Came to Be

It is difficult to determine exactly when the blockchain emerged — it may have been conceived during, or even before, the creation of Bitcoin itself. However, we can estimate its origins by looking at the Bitcoin WhitePaper, written by Satoshi Nakamoto, where the answer is stated directly:

 <span class="destaque-bloco">
 What is needed is an electronic payment system based on cryptographic proof instead of trust, allowing any two willing parties to transact directly with each other without the need for a trusted third party. Transactions that are computationally impractical to reverse would protect sellers from fraud, and routine escrow mechanisms could easily be implemented to protect buyers. In this paper, we propose a solution to the double-spending problem using a peer-to-peer distributed timestamp server to generate computational proof of the chronological order of transactions. The system is secure as long as honest nodes collectively control more CPU power than any cooperating group of attacker nodes. — Satoshi Nakamoto.
 </span>

The description of the blockchain can be found throughout the whitepaper, as in this passage:

 <span class="destaque-bloco">
 A purely peer-to-peer version of electronic cash would allow online payments to be sent directly from one party to another without going through a financial institution.
 </span>

In essence, the blockchain emerged alongside the idea of Bitcoin, with the WhitePaper serving as the starting point for both.

### The Context of the 2008 Crisis

Some important context must be noted. Bitcoin — and, consequently, the blockchain — emerged at a critical moment in world history: the year was 2008, and the severe crisis triggered by high-risk mortgage lending, known as the subprime bubble, was in full swing. Banks such as Lehman Brothers in the United States began to collapse, and a global economic crisis took hold rapidly {% include ref.html n=4 %}.

In response, governments around the world mobilized massively to rescue financial institutions through monetary subsidies and fiscal policies, seeking to prevent the collapse of the global financial system.

Some estimates suggest that one in four families lost 75% or more of their net worth during this period {% include ref.html n=5 %}. While these measures helped to contain the crisis to some extent, the resulting debt — along with the cost of the bailouts — was passed on to taxpayers. This naturally sparked intense debate across society, and one group in particular seemed genuinely willing to take action.

### The Genesis Block

In 2009, a user operating under the pseudonym Satoshi Nakamoto registered on the site Bitcointalk.org (both BitcoinTalk.org and Bitcoin.org were once under the direct or indirect control of Satoshi Nakamoto; they are now managed by moderators).
The platform was created to discuss and develop the Bitcoin and blockchain project proposed in the 2008 WhitePaper. Discussions on the forum were not limited to technical aspects — though these were the majority — but also addressed the philosophical and logical underpinnings of the currency and the system.

The first block ever mined, known as the Genesis Block (a reference to the Book of Genesis in the Bible), contained not only the initial transaction data but also a reference to the 2008 financial crisis {% include ref.html n=6 %} {% include ref.html n=7 %}. The block carried the following message:

 <span class="destaque-bloco">
 The Times 03/Jan/2009 Chancellor on brink of second bailout for banks
 </span>

The reasons for including this message remain unknown and will likely never be fully clarified. It is widely believed to have been a kind of signal to those involved in the project — something along the lines of: "Bitcoin is trustworthy because it is different from other currencies".

Even so, this interpretation is purely speculative, as Satoshi Nakamoto never publicly explained the exact meaning of the message.

### Restoring Financial Trust

What is undeniable, however, is that Bitcoin and its blockchain system were created with the primary goal of restoring financial trust among people. This purpose extends beyond issues such as inflation, censorship, or payment methods — it encompasses all forms of commerce involving assets of value.

Fiat currencies have been largely responsible for eroding that trust, not only between buyers and sellers, but also among credit agents, governments, and the issuing banks themselves:

<span class="destaque-bloco">
The root problem with conventional currency is all the trust that's required to make it work. The central bank must be trusted not to debase the currency, but the history of fiat currencies is full of breaches of that trust. Banks must be trusted to hold our money and transfer it electronically, but they lend it out in waves of credit bubbles with barely a fraction in reserve. We have to trust them with our privacy, trust them not to let identity thieves drain our accounts. — Satoshi Nakamoto.
</span>

According to a report by the United States Department of Labor covering 2021–2022, the dollar lost 7.4% of its purchasing power due to inflation {% include ref.html n=8 %}.

The statements made by Satoshi Nakamoto — both via email and on the Bitcointalk.org forum — indicate that he had lost confidence in the conventional monetary system, and this distrust appears to have been the primary motivation behind the creation of Bitcoin and the blockchain. Satoshi was inspired by earlier concepts, including B-Money by W. Dai and HashCash by Adam Back {% include ref.html n=9 %}{% include ref.html n=10 %}.

If the blockchain is a public, immutable ledger, auditable by anyone — then who writes to it?

That is a question I will answer in the next article of the *"The Chain Nobody Controls"* series: **How the Blockchain Works: Blocks, Hashes, and Mining — Part II**.

---