---
layout: article
title: "Understanding the Mathematical Functioning of Hashing"
subtitle: "A Technical Overview of SHA-256: Architecture, Operations, and Security"
date: 2024-11-25
author: "Kennidy L. Guimarães"
email: "kennidyLguimaraes@gmail.com"
categories: [cryptography, hash]
tags: [algorithms, Computer Science, systems, Mathematical]
image: /assets/img/og/understanding-the-mathematical-functioning-of-hashing.png
references:
  - "National Institute of Standards and Technology. (2015). Secure Hash Standard (SHS). FIPS PUB 180-4. https://csrc.nist.gov/publications/detail/fips/180/4/final"
  - "Eastlake, D., & Hansen, T. (2011). US Secure Hash Algorithms (SHA and SHA-based HMAC and HKDF). RFC 6234. https://datatracker.ietf.org/doc/html/rfc6234"
  - "Wang, X., Yin, Y. L., & Yu, H. (2005). Finding Collisions in the Full SHA-1. CRYPTO 2005."
  - "Merkle, R. C. (1979). Secrecy, Authentication, and Public Key Systems. Stanford University PhD Thesis."
  - "Davies, D. W., & Price, W. L. (1989). Security for Computer Networks. Wiley."
  - "Brown, G. (2017). How secure is 256-bit security? 3Blue1Brown. https://www.3blue1brown.com/lessons/256-bit-security"
  - "Harper, D. (2010). How long would it take to count to a trillion? Numberphile reference."
---

Cryptographic hash functions are a foundational primitive in modern security systems, yet their internal mathematical mechanisms are rarely examined in detail outside of academic circles. This article offers a precise, technically grounded explanation of the SHA-256 algorithm — a member of the SHA-2 family developed by the NSA and standardized by NIST. We examine its complete processing pipeline, from binary encoding and padding through block decomposition, compression rounds, and final digest construction. We further analyze the practical infeasibility of brute-force attacks against SHA-256 by comparing its key space to measurable physical constants of the observable universe. The article is intended for developers and technical readers who are familiar with basic cryptographic concepts and seek a more rigorous understanding of how hashing actually works.

**Keywords:** SHA-256, cryptographic hash functions, Merkle–Damgård, Davies–Meyer, XOR, bit shifting, padding, compression, brute-force resistance, SHA-2.

---

## 1. Introduction

Many developers are familiar with the concept of cryptographic hash functions, but a detailed understanding of how these functions operate mathematically is less commonly explored. This article aims to provide a precise and objective explanation of the hashing process — not a simplified overview, but a structured walkthrough of the mathematical mechanisms that underpin it.

The focus here is SHA-256, a member of the SHA-2 family. It is worth clarifying from the outset that hash functions are used across a broad range of applications beyond cryptography — including data addressing in hash tables and content-addressable storage. However, this article is primarily concerned with the cryptographic and general-purpose use of SHA-256.

---

## 2. What Is SHA-256?

SHA-256 is a cryptographic hash function that transforms any input data into a fixed-size output of **256 bits (32 bytes)**, regardless of the size of the original input. For example, applying SHA-256 to the string `"pizza"` produces the following deterministic value:

<div class="math-block">
9ed1515819dec61fd361d5fdabb57f41ecce1a5fe1fe263b98c0d6943b9b232e
</div>

This output — referred to as a **hash** or **digest** — is computationally infeasible to reverse to the original input. This one-way property is foundational to its use in security and data integrity applications.

---

## 3. Historical Background

SHA-256 was developed by the **National Security Agency (NSA)** and published in **2001** under FIPS PUB 180-2. It was designed as a secure replacement for SHA-1, which had begun to show structural vulnerabilities.

The algorithm is built upon two well-established constructions:

- **Merkle–Damgård scheme** [[4]](#ref-4): a framework for constructing hash functions that process messages of arbitrary length through an iterated compression function, producing a fixed-size output.
- **Davies–Meyer structure** [[5]](#ref-4): a method for constructing one-way compression functions from block ciphers, where the plaintext is used to modify a running state variable.

SHA-256 belongs to the **SHA-2 family**, which includes SHA-224, SHA-256, SHA-384, SHA-512, SHA-512/224, and SHA-512/256 — each differing in output size and internal word length.

<span class="destaque-bloco">
"We recommend that anyone relying on SHA-1 for security migrate to SHA-2 or SHA-3 as soon as possible." — Chris Celi, NIST scientist.
</span>

In **2005**, Professor Xiaoyun Wang announced a differential attack against SHA-1 demonstrating a viable path to finding **hash collisions** — two distinct inputs that produce the same digest. This vulnerability does not affect SHA-256, but it underscores why the migration away from SHA-1 is necessary. The NIST formally recommends full deprecation of SHA-1 by **December 31, 2030**.

---

## 4. Standards

SHA-256 is currently standardized under **FIPS PUB 180-4** [[1]](#ref-1), which supersedes the earlier FIPS PUB 180-2. The updated standard removed specifications for SHA-1, reflecting growing consensus around its inadequate security margins. Developers and systems integrators should reference FIPS 180-4 as the authoritative specification.

---

## 5. Common Applications

SHA-256 and related hash functions are used across a wide range of security-critical systems:

- **Password hashing**: as a base for key derivation functions (e.g., PBKDF2, bcrypt internally uses hashing primitives).
- **Digital signatures**: TLS/SSL certificates rely on SHA-256 for authentication. Google Trust Services, for instance, uses SHA-256 signatures to verify site authenticity.
- **File integrity verification**: downloads distributed with a SHA-256 checksum allow users to detect corruption or tampering.
- **Version control**: Git uses SHA-256 (migrated from SHA-1) to generate commit identifiers, ensuring the integrity of each code revision.
- **Blockchain and Bitcoin**: SHA-256 is the core hashing primitive in Bitcoin's proof-of-work mechanism.
- **Routing and key derivation**: widely employed in HMAC constructions and key derivation functions in network security protocols.

---

## 6. The Mathematics Behind SHA-256

SHA-256 guarantees that the same input always produces the same output — a property called **determinism**. At the same time, any minimal change in the input — a capital letter, a trailing space — produces a completely different digest. This sensitivity is known as the **avalanche effect**.

Compare:

<div class="math-block">
SHA-256("pizza") = 9ed1515819dec61fd361d5fdabb57f41ecce1a5fe1fe263b98c0d6943b9b232e
SHA-256("Pizza") = 10fd14157...
</div>

The internal processing of SHA-256 occurs in five distinct phases:

1. Pre-processing and Padding
2. Block Decomposition and Variable Initialization
3. Message Schedule Expansion
4. Compression Rounds
5. Digest Construction

---

### 6.1 Pre-Processing and Padding

The input string is first converted to its binary representation. Using `"pizza"` as an example:

<div class="math-block">
p = 01110000
i = 01101001
z = 01111010
z = 01111010
a = 01100001
</div>

Concatenated, this yields 40 bits:

<div class="math-block">
0111000001101001011110100111101001100001
</div>

SHA-256 operates on **512-bit blocks**. Since our input is only 40 bits, a **padding** procedure is applied to bring the total to exactly 512 bits:

1. Append a single `1` bit immediately after the message.
2. Append `0` bits until the total length reaches **448 bits**.
3. Append the **original message length** as a 64-bit big-endian integer, filling the remaining bits.

Formally:

<div class="math-block">

$$M' = M \;\|\; 1 \;\|\; 0^k \;\|\; \langle |M| \rangle_{64}$$

</div>

where $k$ is chosen so that $\|M'\| \equiv 0 \pmod{512}$. For `"pizza"`, this requires appending 472 bits (1 bit + approximately 407 zero bits + 64 length bits).

---

### 6.2 Block Decomposition and Variable Initialization

The padded message is divided into **512-bit blocks**. Since `"pizza"` fits within a single block after padding, we operate on one block only.

SHA-256 initializes eight **32-bit state variables** $A$ through $H$ using the fractional parts of the square roots of the first eight prime numbers:

<div class="math-block">

$$H_0^{(0)} = \lfloor \mathrm{frac}(\sqrt{2}) \cdot 2^{32} \rfloor, \quad H_1^{(0)} = \lfloor \mathrm{frac}(\sqrt{3}) \cdot 2^{32} \rfloor, \quad \ldots$$

</div>

These constants are not arbitrary — they are derived from a verifiable mathematical process, ensuring there are no hidden backdoors (a design principle known as *nothing-up-my-sleeve numbers*).

Each 512-bit block is then divided into **16 words of 32 bits** each, indexed $W[0]$ through $W[15]$.

---

### 6.3 Message Schedule Expansion

The 16 initial words are expanded into **64 words** using the following recurrence relation:

<div class="math-block">

$$W[i] = \sigma_1(W[i-2]) + W[i-7] + \sigma_0(W[i-15]) + W[i-16], \quad 16 \leq i \leq 63$$

</div>

The functions $\sigma_0$ and $\sigma_1$ are defined as bitwise operations combining right rotations ($\ggg$) and right shifts ($\gg$):

<div class="math-block">

$$\sigma_0(x) = (x \ggg 7) \oplus (x \ggg 18) \oplus (x \gg 3)$$

$$\sigma_1(x) = (x \ggg 17) \oplus (x \ggg 19) \oplus (x \gg 10)$$

</div>

Where:
- $\ggg n$ denotes a **right rotation** by $n$ bits (bits shifted out on the right re-enter on the left).
- $\gg n$ denotes a **logical right shift** by $n$ bits (vacated positions are filled with zeros).
- $\oplus$ denotes the **XOR** (exclusive OR) operation: returns 1 only when the two input bits differ.

The specific rotation and shift constants (7, 18, 3, 17, 19, 10) were selected to maximize **diffusion** — ensuring that each output bit depends on many input bits — contributing to the avalanche effect.

---

### 6.4 Compression Rounds

SHA-256 performs **64 rounds of compression**, one for each word $W[i]$. In each round, the state variables $A$–$H$ are updated using the current word $W[i]$ and a round constant $K[i]$.

The 64 constants $K[i]$ are derived from the fractional parts of the cube roots of the first 64 prime numbers:

<div class="math-block">

$$K[i] = \lfloor \mathrm{frac}(\sqrt[3]{p_i}) \cdot 2^{32} \rfloor$$

</div>

Each round applies the following update to the state variables:

<div class="math-block">

$$T_1 = H + \Sigma_1(E) + \mathrm{Ch}(E, F, G) + K[i] + W[i]$$

$$T_2 = \Sigma_0(A) + \mathrm{Maj}(A, B, C)$$

$$H \leftarrow G, \quad G \leftarrow F, \quad F \leftarrow E, \quad E \leftarrow D + T_1$$

$$D \leftarrow C, \quad C \leftarrow B, \quad B \leftarrow A, \quad A \leftarrow T_1 + T_2$$

</div>

Where the auxiliary functions are defined as:

<div class="math-block">

$$\Sigma_0(x) = (x \ggg 2) \oplus (x \ggg 13) \oplus (x \ggg 22)$$

$$\Sigma_1(x) = (x \ggg 6) \oplus (x \ggg 11) \oplus (x \ggg 25)$$

$$\mathrm{Ch}(x, y, z) = (x \land y) \oplus (\lnot x \land z)$$

$$\mathrm{Maj}(x, y, z) = (x \land y) \oplus (x \land z) \oplus (y \land z)$$

</div>

- **Ch** (*Choice*): for each bit position, uses $x$ to select between $y$ and $z$.
- **Maj** (*Majority*): returns the majority value across the three inputs at each bit position.

All additions are performed modulo $2^{32}$.

---

### 6.5 Digest Construction

After all 64 rounds, the compressed state variables are added back to the initial values from before the compression:

<div class="math-block">

$$A \leftarrow A + A_{\text{init}}, \quad B \leftarrow B + B_{\text{init}}, \quad \ldots \quad H \leftarrow H + H_{\text{init}}$$

</div>

If the message contained multiple 512-bit blocks, this output becomes the initial state for the next block — this is the Merkle–Damgård chaining mechanism.

The final SHA-256 digest is the **concatenation** of the eight 32-bit state variables:

<div class="math-block">

$$\text{SHA-256}(M) = A \;\|\; B \;\|\; C \;\|\; D \;\|\; E \;\|\; F \;\|\; G \;\|\; H$$

</div>

This yields the 256-bit (64 hexadecimal character) output.

---

## 7. Brute-Force Attack Infeasibility

To appreciate why SHA-256 is considered computationally secure against brute-force attacks, it is necessary to understand the scale of its key space: $2^{256}$.

### 7.1 Physical Scale Comparisons

Consider the following reference points, ordered by magnitude:

| Quantity | Approximate Value |
|---|---|
| Grains of sand on Earth | $\approx 10^{18}$ |
| Atoms in the observable universe | $\approx 10^{80}$ |
| SHA-256 key space ($2^{256}$) | $\approx 1.16 \times 10^{77}$ |

Even the number of atoms in the observable universe — spanning approximately $9.3 \times 10^{10}$ light-years, including all stars, planets, and galaxies — is less than $2^{256}$.

### 7.2 Computational Time Estimate

The most powerful supercomputer as of 2024, **Frontier** (Oak Ridge National Laboratory, USA), achieves approximately:

<div class="math-block">

$$\text{Frontier} \approx 1.1 \times 10^{18} \text{ operations/second}$$

</div>

Estimating the time required to exhaust even $10^{80}$ operations (fewer than $2^{256}$):

<div class="math-block">

$$T = \frac{10^{80}}{10^{18}} = 10^{62} \text{ seconds}$$

$$T \approx \frac{10^{62}}{365.25 \times 24 \times 3600} \approx 10^{55} \text{ years}$$

</div>

For reference, the current age of the universe is approximately $1.38 \times 10^{10}$ years — more than 44 orders of magnitude smaller than the time required.

> **Note:** This analysis addresses exhaustive brute-force search specifically. It does not preclude the possibility of future algorithmic attacks that exploit structural weaknesses in SHA-256 — though none have been demonstrated to date.

### 7.3 A Note on Quantum Computing

A common counterargument invokes quantum computers. As of 2024, the most advanced quantum processors (e.g., IBM's 433-qubit system) do not pose a practical threat to SHA-256. The qubit count of a quantum processor does not directly translate to cryptographic attack capability — error rates, decoherence, and the requirements for operating at near absolute zero (0 K) impose severe practical constraints.

Grover's algorithm, the most relevant quantum attack against symmetric hash functions, would theoretically reduce SHA-256's effective security from 256 bits to 128 bits — still computationally infeasible with any foreseeable technology. SHA-512 provides an additional security margin under this model.

---

## 8. Conclusion

SHA-256 is a one-way cryptographic hash function that produces a unique, fixed-size digest from any input. Its security derives from a combination of mathematically complex operations — bitwise rotations, XOR, and modular addition — applied across 64 compression rounds, making the relationship between input and output effectively opaque and irreversible.

The algorithm's key space of $2^{256}$ renders brute-force attacks not merely difficult, but physically infeasible: exhausting the search space would require more time than the current age of the universe, even with the most powerful computing hardware available today.

Both SHA-256 and SHA-512 remain considered secure for cryptographic applications. Developers and system architects should, however, remain attentive to ongoing cryptanalysis research and to NIST recommendations, which continue to evolve in response to advances in both classical and quantum computing.

---

## Author's Note
<div class="nota-autor">
This article focuses on the general cryptographic use of SHA-256 within the SHA-2 family. Hash functions serve a broader range of purposes — including hash tables, content addressing, and data deduplication — which are outside the scope of this discussion.

The mathematical representations in Section 6 follow the official FIPS 180-4 specification. Where simplified notation is used, it is explicitly marked as such.
</div>
---