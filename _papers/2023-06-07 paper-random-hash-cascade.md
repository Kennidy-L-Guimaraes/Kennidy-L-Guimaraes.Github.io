---
layout: article
title: "Random Hash Cascade (RHC): A Pseudo-Random Hashing Algorithm Using Mersenne Twister and SHA-256"
subtitle: "Study: Utilization of Hash Cascades for Pseudo-Random Hash Generation"
date: 2023-06-07
last_modified_at: 2026-03-29
schema:
  type: ScholarlyArticle  
author: "Kennidy L. Guimarães"
email: "me@kennidylguimaraes.com"
categories: [cryptography, algorithms]
tags: [hashing, pseudo-random, mersenne twister, sha-256, distributed systems, entropy, security]
image: /assets/img/og/rhc-random-hash-cascade.png
description: "Random Hash Cascade (RHC) is a hashing algorithm that combines Mersenne Twister and SHA-256 to generate pseudo-random values with high entropy and low collision probability. This paper explores its structure, performance, and security implications."
references:
  - "Matsumoto, M., & Nishimura, T. (1998). Mersenne Twister: A 623-Dimensionally Equidistributed Uniform Pseudo-Random Number Generator. https://dl.acm.org/doi/pdf/10.1145/272991.272995"
  - "Guimarães, K. L. (2024). RHC Collision Test Output — [RHCHashTest_2024-12-30_00-28-45.txt](/files/papers/rhc/RHCHashTest_2024-12-30_00-28-45.txt)"
---

## Abstract

The use of pseudo-random values has become increasingly essential, being widely employed in various areas such as cryptography, security, monetization, and data analysis. This study presents the development of an algorithm in the construction phase, **Random Hash Cascade (RHC)**, which aims to provide a satisfactory balance between security and performance. RHC utilizes the Mersenne Twister (MT) algorithm, combined with mathematical operations on arrays, to generate reliable and efficient results. It is important to highlight that, as this is a developing algorithm, caution must be exercised in its application, and complementary testing is essential to validate its effectiveness and security in different scenarios.

**Keywords:** Pseudo-random numbers, Mersenne Twister, Random Hash Cascade, SHA-256, Cryptography, Hash functions, Entropy, Collision resistance, Security, Salt.

---

## 1. Introduction

The use of algorithms that generate pseudo-random values has become increasingly necessary. The generated values are used for a wide range of functions and applications — security, cryptography, authentication, validation, and monetization, among other fields.

Although working with truly "random" values is impractical under the deterministic rules that govern computing, working with **pseudo-random values** is a functional and well-understood approach.

The **Mersenne Twister** algorithm (Makoto Matsumoto and Takuji Nishimura) [[1]](#ref-1) was chosen as the mathematical foundation, having proven efficient and reliable across diverse scenarios. Its primary appeal is its extraordinarily long period before repetition:

<div class="math-block">

$$2^{19937} - 1$$

</div>

This makes it highly recommended for tasks requiring non-repeating sequences. The operation of RHC depends on the Mersenne Twister and its shift operations, complemented by entropy-increasing factors to minimize collision probability.

> This document does not explore the internal workings of Mersenne Twister in depth. For further reading, refer to: *"Mersenne Twister: A 623-Dimensionally Equidistributed Uniform Pseudo-Random Number Generator"* — Makoto Matsumoto and Takuji Nishimura, January 1, 1998.

---

## 2. RHC-256

The algorithm uses a **time seed** combined with mathematical operations and hash functions such as SHA-2 and SHA-256.

### 2.1 Time Seed

The time seed is crucial in this algorithm. The system must capture the time in `HH:MM:SS:ms` format to perform the mathematical operations. The captured value is then converted into a numeric seed:

<div class="math-block">

$$X = 10{:}45{:}34{:}200 \;\Rightarrow\; X = 10{,}453{,}420$$

</div>

$X$ is the initial time seed, which then passes through mathematical pre-processing before entering the Mersenne Twister.

### 2.2 Pre-Processing Operations

The seed is multiplied by a set of randomly chosen constants:

<div class="math-block">

$$A,\; B,\; C,\; D,\; E \;=\; 25,\; 13,\; 19,\; 97,\; 17$$

$$X \;=\; \left(\frac{X \times A \times B \times C \times D \times E}{X \bmod \mathrm{Random}(A)}\right)$$

</div>

### 2.3 Mersenne Twister Application

The pre-processed seed $X$ is passed into the Mersenne Twister. The algorithm's full mathematical behavior — including twist and tempering operations — is abstracted here as $f(\cdot)$:

<div class="math-block">

$$Y = f(X)$$

</div>

The variable $Y$ receives the output of the MT function. This step is critical — the reliability of MT is what prevents early collisions in the generation pipeline.

### 2.4 Array Construction

$Y$ is stored in an array alongside ten of its counterparts, each generated from a distinct seed:

<div class="math-block">

$$V_{01} = \{\, Y_1,\; Y_2,\; \ldots,\; Y_n \,\}$$

</div>

These arrays are then composed into a higher-order structure:

<div class="math-block">

$$V_{09} = [\, V_{08} + V_{07} + V_{06} + \cdots \,]$$

</div>

### 2.5 Block and Hash Cascade Formation

The final structure is stored in a **block** formed by the composed arrays. The cascade is built as follows:

<div class="math-block">

$$BK_1 = \text{SHA256}(V_{09} \;\|\; a, b, c, d, e)$$

$$BK_2 = \text{SHA256}(V_{09} \;\|\; BK_1)$$

$$BK_3 = \text{SHA256}(V_{09} \;\|\; BK_1 \;\|\; BK_2)$$

$$BK_4 = \text{SHA256}\!\left(\, \text{SHA256}(BK_1) \;\|\; \text{SHA256}(BK_2) \;\|\; \text{SHA256}(BK_3) \,\right)$$

</div>

For the cascade to function, a new hash is applied at each new block. Each block is **linked** to its predecessor — block 2 contains the hash of block 1. The final block concatenates all prior values before computing the terminal hash.

> The algorithm allows the inclusion of constants $(a, b, c, d, e)$ arbitrarily. However, fixing these values may increase the predictability of the final hash.

### 2.6 Hash Function Selection

**SHA-256** was used in this study given its speed and security. If performance is not the primary concern, a cascade between **SHA-256** and **SHA-512** is a viable option — this does not imply a direct security gain, but the system becomes more robust against **pre-image attacks**.

---

## 3. Security Analysis: Attack Complexity

A common concern regarding the use of Mersenne Twister (MT) in cryptographic contexts is its classical vulnerability: given access to 624 consecutive raw MT outputs, an attacker can reconstruct its internal state. However, in RHC, raw MT outputs are never directly exposed. What is available to an external observer is exclusively the final result of the SHA-256 cascade — a one-way, computationally irreversible transformation. This fundamentally breaks the linearity that makes MT vulnerable in direct use.

### 3.1 Brute-Force Search Space

For an attacker to reproduce a hash generated by RHC, they would need to independently determine all secret variables of the system. The total search space is composed of the following layers of uncertainty:

1. **Time seed** (`HH:MM:SS:ms`): approximately $8.64 \times 10^7$ possible values per day.
2. **Randomly generated constants** $A, B, C, D, E$: assuming a range of 1 to 100 for each, the combinatorial space is $100^5 = 10^{10}$ possibilities.
3. **Seed multiplicity per block**: for each block, $n$ values of $Y$ are generated with independent seeds, raising the search space to $(8.64 \times 10^7 \times 10^{10})^n$ per block.
4. **Sequential chaining between blocks**: since $BK_2$ depends on $BK_1$, $BK_3$ depends on $BK_1$ and $BK_2$, and so on, an attacker cannot parallelize the search across blocks — each must be reproduced in sequence, multiplicatively compounding the total space.

For a conservative estimate with just one block and $n = 10$ seeds, the search space is on the order of:

<div class="math-block">

$$(8.64 \times 10^7 \times 10^{10})^{10} \approx 10^{173}$$

</div>

This value grows multiplicatively with each additional block, making exhaustive search computationally infeasible with currently available resources.

### 3.2 Uniform Distribution vs. Unpredictability

It is important to note that the absence of collisions across $10^6$ samples demonstrates good statistical distribution, but does not by itself constitute proof of cryptographic unpredictability. Uniform distribution and unpredictability are distinct properties: the former measures the fairness of output distribution, while the latter measures an attacker's inability to predict future outputs given knowledge of prior ones.

In RHC, unpredictability is achieved through the combination of the exponential search space described above and the one-way nature of SHA-256, which prevents process reversal. Additional testing with standardized test suites such as **NIST STS** or **TestU01** is recommended to formally quantify both properties in future versions of the algorithm.

---

## 4. Conclusion

Random hashes are a necessary balance between efficiency and security. The RHC algorithm successfully generated $10^6$ random hashes without repetition, verified in real-time by a program developed in **Delphi/Object Pascal** and subsequently validated against a wordlist, confirming the **absence of collisions**.

Efficiency benchmarks:

<div class="math-block">

$$\textbf{Intel Core i5 (1st gen):} \quad \approx 11{,}000\ \text{H/min} \;\approx\; 185\ \text{H/s}$$

$$\textbf{Intel Core i5 (10th gen):} \quad \approx 266{,}000\ \text{H/min}, \quad 20 \times 10^6\ \text{hashes without collision}$$

</div>

---

## Author's Note — March 11, 2026
<div class="nota-autor"> 
The test values will be made available in the References tab below. I am currently re-running the tests.
 
Please take into account the nature of this paper: it is a **technical study**. It does not guarantee that applying this algorithm in your system will provide complete security or computational infeasibility. **Recalculate with the assistance of a mathematician and a security engineer** — this is strongly advisable.
 
For production environments, only apply credentialed, audited security systems such as [OpenSSL](https://www.openssl.org).
 
From the final considerations: I tested this algorithm in software specifically designed to search for collisions and identified none across more than **60 million generated hashes**. Any of those hashes could straightforwardly be used in conjunction with salts — though you may prefer a simpler approach such as:
 
<div class="math-block">
Hash( Random(24 bytes  |  16 bytes) )
</div>
</div> 
Thank you for taking the time to read this paper.
 
---