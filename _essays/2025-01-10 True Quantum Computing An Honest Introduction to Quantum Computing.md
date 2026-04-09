---
layout: article
title: "True Quantum Computing: An Honest Introduction to QC"
subtitle: "Where quantum physics intertwines with computing."
date: 2025-01-10
last_modified_at: 2026-04-09
schema:
  type: Essays
author: "Kennidy L. Guimarães"
categories: [computer science]
tags: [quantum computing, qubits, quantum mechanics, cryptography, entanglement]
image: /assets/img/og/true-quantum-computing-an-honest-introduction-to-qc.png
references:
  - "NUREG-1717. Systematic Radiological Assessment of Exemptions for Source and Byproduct Materials. U.S. Nuclear Regulatory Commission. https://www.orau.org/health-physics-museum/collection/consumer/glass/vaseline-uranium-glass.html"         # [1]
  - "Oliveira, Maria Luiza de. (2018). Desvios de conceitos da teoria quântica pela bricolagem de não cientistas. Dissertação (mestrado) — Universidade Estadual de Campinas. https://hdl.handle.net/20.500.12733/1634823"         # [2]
  - "LiveScience. Quantum mechanics: Definitions, axioms, and key concepts of quantum physics. https://www.livescience.com/33816-quantum-mechanics-explanation.html"         # [3]
  - "Stanford Encyclopedia of Philosophy. The Uncertainty Principle. https://plato.stanford.edu/entries/qt-uncertainty/"         # [4]
  - "Let's Talk Science. Introduction to the Atom. https://letstalkscience.ca/educational-resources/backgrounders/introduction-atom"         # [5]
  - "Brilliant. Quantum Entanglement. https://brilliant.org/wiki/quantum-entanglement/"         # [6]
  - "TechMonitor. What Is A Bit? https://www.techmonitor.ai/what-is/what-is-a-bit/"         # [7]
  - "Institute for Quantum Computing, University of Waterloo. Qubits. https://uwaterloo.ca/institute-for-quantum-computing/resources/quantum-101/qist/qubits"         # [8]
  - "Liu, Qiyu. (2023). Comparisons of Conventional Computing and Quantum Computing Approaches. Highlights in Science, Engineering and Technology. 38. 502–507. https://www.researchgate.net/publication/369465303"         # [9]
  - "Odeh, Ammar & Abdelfattah, Eman. (2016). Quantum sort algorithm based on entanglement qubits. https://www.researchgate.net/profile/Ammar-Odeh/publication/304188668"         # [10]
  - "U.S. Department of Energy. DOE Explains... Bosons and Fermions. https://www.energy.gov/science/doe-explainsbosons-and-fermions"         # [11]
  - "Singh, Rohit & Bodile, Roshan M. A Quick Guide to Quantum Communication. IEEE. https://arxiv.org/html/2402.15707v1"         # [12]
  - "Cloud Security Alliance. CSA Sets Countdown Clock to Quantum. 2022. https://cloudsecurityalliance.org/press-releases/2022/03/09/cloud-security-alliance-sets-countdown-clock-to-quantum"         # [13]
related:
  - title: "Related Article Title"
    category: "Science"
    date: "2025"
    url: "#"
---

You have certainly heard the term "Quantum" applied to some product, service, or project. The problem is that this term has been used in a way completely disconnected from its real meaning — because something quantum can only truly be quantum if it deals with phenomena at a subatomic scale. Yet some marketing agents believe this term can be applied to any product, service, or project. Which is, fatally, a mistake.

Something similar happened during the early atomic era in the 20th century, with the emergence of commercial products stamped with the terms "Uranium" or "Radiation." Curiously, those were actually more honest in their advertising, since such objects genuinely contained uranium in quantities sufficient to deliver unique and exotic properties. A very detailed analysis of radiation exposures from uranium glass articles can be found in the Nuclear Regulatory Commission publication "Systematic Radiological Assessment of Exemptions for Source and Byproduct Materials" (NUREG-1717) [[1]](#ref-1).

The use of the term "quantum" occurs directly and at times with an obscure intent — many marketing agents use it to make a product or service appear technological and innovative. This new packaging for products happens without any respect for the term's definition. The science of quantum has very little, or absolutely nothing, to do with products like "quantum water bottle, quantum pillow, quantum double bed, and quantum cleaning." It is understandable to use innovative terms to communicate a message to the end customer; however, by not knowing the definition of such a term — or applying it to every product indiscriminately — the result is both a depreciation of the product and term itself, and the disillusionment of the customer upon realizing that the "quantum" product is just a common product, often more expensive.

Although it is true that all matter is made of something quantum, using that fact to justify the label is what is called **bricolagem** — a neologism coined by Kasper (2006) to describe the arbitrary recombination of concepts outside their original context [[2]](#ref-2). Otherwise, we would encounter advertisements with the same level of bricolagem tied to atoms, even though everything is made of atoms ("atomic water bottle, atomic pillow, atomic double bed, and atomic cleaning"). In general, the term quantum refers to the quantum, a concept tied to quantum physics, which studies the behavior of particles at a subatomic scale — including phenomena such as superposition and entanglement. Yet most sellers of such products adopt an obscure and unscientific stance regarding the terminology.

This article aims to provide, in a clear and objective way, a gentle introduction to quantum computing in its early stage — and to answer questions like: what is quantum computing, really, and why does "quantum" make sense in computing?

---

### Introduction to the Quantum World

Due to the naturally complex nature of quantum mechanics, this topic will be drastically condensed — otherwise, it would require not just one article, but several books and entire columns dedicated to explaining how quantum physics works.

You probably know that everything around us is made of atoms. These atoms organize into chains, and those chains form the basis for the structure of objects. However, when we need more detailed and enlightening answers, we need to go even further down the atomic scale — and that is the quantum scale. The quantum scale is the study of atoms at the atomic and subatomic level. This can be summarized as the study of the physics of these atoms together with their reactions to hypothetical scenarios (quantum theories and quantum physics). Quantum physics can answer many questions that classical physics cannot, given the differences in scale — for instance, the physics applied to an object based on its size and mass might not make sense at the quantum scale, where those same objects behave very differently [[3]](#ref-3).

Quantum mechanics emerged gradually to solve problems that classical physics proved unable to answer — such as Max Planck's problem in 1900 regarding blackbody radiation (the distribution of radiation by hot bodies). In quantum physics, particles can behave in ways that, to us, may not make intuitive sense: they can behave like waves, occupy multiple states simultaneously, or entangle in a completely anomalous fashion.

The study of these particles is not easy — starting with their location. There is no way to know with certainty where a particle is; we can only deduce the probability of its position through mathematical analysis. The Schrödinger equation relates the collection of probability amplitudes belonging to one moment in time with those belonging to another. In this way, we can calculate the best and most likely probability for the location of the particle. However, Heisenberg's Uncertainty Principle imposes a limit on that precision: certain pairs of properties, like position and momentum, can only be known up to a point [[4]](#ref-4):

<div class="math-block">

$$\Delta x \cdot \Delta p \geq \frac{\hbar}{2}$$

</div>

where $\Delta x$ is the uncertainty in position, $\Delta p$ is the uncertainty in momentum, and $\hbar = h / 2\pi$ is the reduced Planck constant.

#### How Does Quantum Mechanics Describe Atoms?

In classical physics, electrons were imagined as particles orbiting the atomic nucleus in fixed trajectories, like planets around the Sun — the Rutherford-Bohr model. Quantum mechanics replaces this concept with **orbitals**: regions that represent where there is a higher probability of finding an electron. This electron "cloud" has no defined boundary — these are probabilities derived from the Schrödinger equation [[5]](#ref-5).

<figure class="artigo-figura">
  <img src="{{ site.baseurl }}/files/essays/true-quantum-computing/electron_cloud.png"/>
  <figcaption>Visual representation (Figure 1.0)</figcaption>
</figure>

Given the cloud around the nucleus, we can deduce — respecting Heisenberg's limit — the probability of the electron's momentum and position. You might try to picture it this way: imagine you are looking for someone in New York, but you do not know exactly where she is. Knowing only that she likes to eat something specific — say, hot dogs — you start searching near hot dog restaurants and vendors. This gives you a probability of where she might be, but without absolute certainty. You do not know the exact location (position) or what she is doing precisely (momentum), but you have an idea based on probabilities. Heisenberg's Principle works the same way: you can estimate, but you can never pinpoint both the position and momentum of a particle with arbitrary precision simultaneously.

Now that you have an understanding of atoms and some of their most basic properties, it is important to get acquainted with one that is far from intuitive.

*"Subatomic particles are in everything around us — and events of the past do not limit quantum nature."*

---

### Quantum Entanglement and Teleportation

I hope the previous sections have given you a satisfying introduction to the quantum world. But when discussing quantum physics, we must address quantum entanglement and superposition. This section offers a quick introduction to the topic.

As mentioned earlier, atoms and particles are found in everything around us — and this is not limited to the present; past events do not constrain quantum nature. In 1935, Einstein, Boris Podolsky, and Nathan Rosen proposed the viability of maintaining a correlated configuration for two particles [[6]](#ref-6). These "twin particles" maintained correlated properties: when one particle changed, the other would follow suit.

The particles maintained a "connection" and, according to popular interpretations, could "discover" the state change of their twin — no matter how far apart they were. Einstein called this "spooky action at a distance," and Schrödinger came to call it **entanglement**. This connection is described by some scholars as instantaneous, which seems to challenge our understanding of the limit imposed by the speed of light.

Before measurement, entangled particles are in **superposition** — their properties, like spin, have no defined values. When we measure the spin of one particle, its state collapses randomly to a specific value (for example, "up" or "down"), and the state of the entangled partner collapses instantaneously to the correlated value. However — and this is crucial — it is not possible to control the outcome of the measurement in order to encode a message. You only discover the state that nature randomly determined. In technical terms, quantum entanglement preserves correlations, but the measurement is probabilistic, which prevents any control over the result and, consequently, any superluminal transmission of information.

Although I mentioned instantaneous communication, I must clarify that this truly cannot be used for information transfer, due to the limit imposed by the speed of light. What occurs in practice is an interpretation of data: after measuring spin in region A, we can already say with certainty what state spin B is in — as long as they are entangled.

**Quantum teleportation**, however, really exists — and is theoretically sound. It differs radically from fictional teleportation: while in fiction matter and energy are transported, in quantum teleportation only the quantum state of a particle (such as a qubit) is transferred, after measurement and wave function collapse. This process depends on a classical communication channel to transmit information between the parties, which prevents superluminal transmission [[12]](#ref-12).

Imagine the following: Alice, in Brazil, wants to teleport the state of a qubit (A) to Bob, in Japan, using a pair of entangled qubits (B and C). After performing a Bell measurement on A and B, the state of A is destroyed, and Bob's qubit C is altered due to entanglement. However, for Bob to reconstruct the original state of A in C, Alice needs to send two classical bits with the measurement result — over a channel limited by the speed of light. Those bits allow Bob to apply a quantum gate and recreate the exact state of A in C.

Although the correlation between entangled qubits is instantaneous, the requirement of the classical channel ensures that no information travels faster than light. The **no-cloning theorem** prevents duplication of unknown quantum states. So the quantum state is recreated in C — not copied, as some claim — while the original state of A is destroyed during the measurement, preserving the theorem.

<figure class="artigo-figura">
  <img src="{{ site.baseurl }}/files/essays/true-quantum-computing/quantum_intertwining.png"/>
  <figcaption>Quantum entanglement (Figure 1.1)</figcaption>
</figure>

*"In quantum computing, we take advantage of exactly this fundamental property of spin to build information."*

---

### What Are Spins?

Explaining how Spin works fully would require an entire book on relativistic quantum mechanics or quantum field theory. What follows is an extremely condensed summary — sufficient to understand quantum computing without needing to become a physicist.

Contrary to what the name might suggest, Spin does not necessarily imply that a particle is spinning around its own axis. It is better understood as an **intrinsic angular momentum** — one of the fundamental properties of subatomic particles, such as photons, electrons, protons, and neutrons. You can think of Spin as a discrete quantity of angular momentum, generally in multiples of the reduced Planck constant. (This explanation is extremely simplified. For a physicist, it may be insufficient — but for those seeking to understand quantum computing in a more direct and summarized way, it can serve as a satisfactory starting point.)

In the 1920s, Otto Stern and Walther Gerlach, from the University of Hamburg, Germany, conducted a series of experiments with atomic beams. To summarize their findings: they observed that electrons, when spinning rapidly, produced small magnetic fields independent of those associated with their orbital motion. To explain this phenomenon, the concept of Spin was introduced.

Spin generates a magnetic moment in each particle — as if each one were a miniature magnet. A simple example is the electron: due to its Spin, it possesses a magnetic moment known as the spin magnetic moment. When charged particles with Spin interact with an external magnetic field — such as in MRI machines — they can align with or oppose the field, depending on their configuration.

When two particles have their properties — like Spin — correlated, we call that **quantum entanglement**. If two entangled particles are separated by large distances, measuring the Spin of one determines the Spin of the other instantaneously, even if they are light-years apart.

In a simple and lighthearted way, you can picture Spin dynamics like this: imagine a bunch of basketballs surrounded by spinning tops. Some of those tops spin with their tip pointing up, while others spin with the tip pointing down. Now, imagine that some of these tops are connected to each other — as if they had an "agreement." When one top changes the direction of its spin, the other automatically inverts its position, creating the impression that they always behave as opposites.

We can think of the basketballs as particles, while the spinning tops represent the angular momentum of those particles, acting like a tiny magnet — that is, the Spins. That "agreement" between the tops, where a change in one directly affects the other, can be understood as the famous quantum entanglement. It is important to note that, although I used the analogy with spinning tops, Spin does not represent a real rotational movement like a whirlwind.

Now that we understand what Spins are, we need to understand what Qubits are.

---

### Going Deeper: Pauli, Fermions, and Bosons

All particles that exist in the universe can be divided into two great families: **Bosons** and **Fermions**. The difference between them lies in their spin [[11]](#ref-11).

| Family | Spin Values | Examples |
|---|---|---|
| **Bosons** | Integer (0, 1, 2…) | Photons, gluons, Higgs boson, W and Z particles |
| **Fermions** | Half-integer (1/2, 3/2, 5/2…) | Protons, neutrons, electrons, neutrinos, quarks |

The key distinction is this: fermions cannot occupy the same quantum state at the same time — what we call the **Pauli Exclusion Principle**. This is what explains, for example, why electrons distribute themselves across different shells around an atomic nucleus. Bosons, on the other hand, have no such restriction: several of them can accumulate in the same state, giving rise to collective phenomena such as lasers and the Bose-Einstein condensate.

<figure class="artigo-figura">
  <img src="{{ site.baseurl }}/files/essays/true-quantum-computing/AtomicModel.png"/>
  <figcaption>The image represents an atom in a simple and didactic way, showing the probability cloud, its electron, the boson, and the fermion. (Figure 1.2)</figcaption>
</figure>

The Pauli Exclusion Principle was formulated by Wolfgang Pauli in 1925. More rigorously: the total wave function of a system composed of two identical fermions must be antisymmetric with respect to the exchange of the two particles. For electrons in the same atom, this means two electrons cannot share all four quantum numbers simultaneously:

| Quantum Number | Symbol | Description |
|---|---|---|
| Principal | $n$ | Orbit size and energy (1, 2, 3…) |
| Azimuthal | $l$ | Energy sublevel (0 to $n-1$) |
| Magnetic | $m_l$ | Spatial orientation of the orbital ($-l$ to $+l$) |
| Spin | $m_s$ | Spin direction of the electron ($+\tfrac{1}{2}$ or $-\tfrac{1}{2}$) |

If $n$, $l$, and $m_l$ are equal in two electrons, $m_s$ must necessarily differ — and therefore their spins are opposite. This is why electrons spread across different layers around the nucleus rather than all collapsing into the same shell.

All matter we know arises from the interaction between fermions and bosons. Fermions — protons, neutrons, electrons, quarks — form the building blocks: they make up the atomic nucleus, orbit around it, and constitute the substructure within. Bosons are the "glue" that holds everything connected; gluons, for instance, are what keep quarks bound inside protons and neutrons.

In quantum computing, we take advantage of exactly this fundamental property of spin to build information. The spin of a particle can exist in **superposition** — pointing "up" and "down" at the same time. However, when we perform a measurement, the **wave function collapse** occurs: the spin is forced to assume one of the two possible states. In an electron, we measure spin along an axis (usually called $z$) and obtain either $+\tfrac{1}{2}$ (up) or $-\tfrac{1}{2}$ (down). Before measurement, the spin exists in a combination of both; after, it settles into just one. It is precisely this characteristic that makes spin ideal for use in qubits: it can store the superposition of states and, at the moment of reading, provides a definite result.

Measuring spin does not mean a scientist "looks" directly at the particle and sees it rotating. What actually happens is the interaction between the particle and a measuring device that forces the quantum state to collapse. A classic example is the **Stern-Gerlach experiment**: a beam of atoms is sent through a non-uniform magnetic field. That field interacts with the particles' spin, separating them into two distinct trajectories — corresponding to "spin up" ($+\tfrac{1}{2}$) and "spin down" ($-\tfrac{1}{2}$). In modern laboratories, this measurement can also be done using lasers and microwaves that interact with electrons trapped in electromagnetic traps. The laser can excite the electron such that only one spin state responds by emitting light. If the detector registers emission, we know the spin was in a particular state; if there is no emission, it was in the opposite [[11]](#ref-11).


<figure class="artigo-figura">
  <img src="{{ site.baseurl }}/files/essays/true-quantum-computing/Stern-Gerlach_experiment.svg.png"/>
  <figcaption>The Stern-Gerlach experiment: a beam of atoms is sent through a non-uniform magnetic field. (Figure 1.3 Wiki</figcaption>
</figure>

> **A note on Schrödinger's Cat:** I decided not to dedicate a full section to this experiment for a simple reason — there is plenty of material about it already. But in brief: the thought experiment explains that the position of a spin is completely unknown until it collapses. We only know the spin's position after collapse — which is when we open the hypothetical box and see what is inside. Schrödinger used the cat analogy to illustrate this. The problem is that many people carry the mistaken notion that the animal is somehow "half alive and half dead," a sort of zombie cat. What Schrödinger actually meant is: just as we do not know whether the cat is alive or dead until we open the box, we do not know the position of Spin B until Spin A collapses.

*"The quantum of marketing is empty. The quantum of physics is, perhaps, the strangest and most powerful thing humanity has ever encountered in the structure of reality."*

---

### But What Are Qubits?

A conventional computer uses electrical signals to communicate. These signals form the basis for building data — and even images. This system is represented by values of electrical oscillation between 0 and 1: what we call binary language, or the language of computers.

I will not go deep into how binary language works, but understand that it forms what we know as **Bits**. A bit is the smallest unit of data a conventional computer can hold — it is short for *binary digit*, because it is always in one of two physical states represented by a binary value (0 or 1). A group of eight bits equals one Byte; a group of ~1024 Bytes equals one Kilobyte; ~1024 KB equals one Megabyte; and ~1024 MB equals one Gigabyte. This is the standard structure for conventional computers — used for both storage and data processing. The more Gigabytes a computer has, the greater its storage capacity — though that may not necessarily reflect its actual processing power [[7]](#ref-7).

You can understand the **qubit** as a quantum bit. Like conventional bits, it can also assume two positions (0 or 1) — using atoms or photons. But a quantum bit can assume a **third position**: quantum superposition, which allows this bit to be in a combination of 0 and 1 simultaneously, until it is measured. The key differences lie in quantum entanglement: in simple terms, it allows a qubit to assume two positions at the same time. Since each bit is entangled with another, when one assumes the value Zero the other assumes One — but because quantum entanglement knows no boundaries, we can say that the position of bit 0 or bit 1 is essentially the same. In summary, the bit is in superposition, assuming both states simultaneously (0 and 1) [[8]](#ref-8).

A simple and concrete example of a qubit is Spin: the orientation of a Spin assumes a binary property — either fully up or fully down, never in between. Using this Spin property, we can build a qubit based on the binary orientation of Spin. But that is just one example; you could also use other properties of atoms and photons, such as the energy levels of electrons in neutral atoms or ions, or polarization states of photons.

Qubits can be represented in 3D through the **Bloch sphere**. This representation allows us to describe the quantum state of a single qubit (a complex two-dimensional vector) as a three-dimensional vector with real values. The north and south poles correspond to states $|0\rangle$ and $|1\rangle$; any point on the surface of the sphere represents a valid superposition:

<div class="math-block">

$$|\psi\rangle = \cos\!\left(\frac{\theta}{2}\right)|0\rangle + e^{i\varphi}\sin\!\left(\frac{\theta}{2}\right)|1\rangle$$

</div>

where $\theta \in [0, \pi]$ and $\varphi \in [0, 2\pi)$ are the spherical angles that determine the qubit's state. The Bloch sphere provides a clear understanding of qubit superposition and how its state can be visualized in three dimensions, making it easier to interpret quantum phenomena.

<figure class="artigo-figura">
  <img src="{{ site.baseurl }}/files/essays/true-quantum-computing/Bloch_Sphere_representation.svg.png"/>
  <figcaption>Three-dimensional Bloch sphere (Figure 1.4)</figcaption>
</figure>

<pre class="mermaid">
graph LR
  A[Classical Bit] -->|0 or 1| B[Deterministic State]
  C[Qubit] -->|Superposition| D[0 + 1 simultaneously]
  D -->|Measurement| E[Collapses to 0 or 1]
  C -->|Entanglement| F[Correlated with other qubits]
</pre>

---

### The Power of a Qubit

As discussed in the previous sections, a qubit is a bit with quantum properties. But how does that revolutionize computing in general? When I mentioned quantum entanglement, I highlighted that entangled particles have properties that seem to challenge our notions of speed and distance — because by measuring the state of one particle, the state of the other becomes immediately known, regardless of the distance between them. These properties, combined with quantum superposition, allow qubits to process multiple operations simultaneously. This represents a much greater processing power than traditional methods, enabling revolutionary advances in cryptography, molecular simulation, and complex problem optimization [[9]](#ref-9).

You can try to visualize it this way: due to quantum superposition, a qubit can be simultaneously in two states (0 and 1) before being measured. With quantum entanglement, the state of one qubit is directly related to its twin — so by measuring one, the state of the other is instantaneously known. This property, combined with the ability to perform calculations in parallel, allows us to solve problems that would require an astronomical level of processing power by classical means.

It is relatively common to compare qubits and bits. Although they share a similar origin and operate under related principles, they are concepts that function in completely different ways. Classical computers have a structure that gives them an advantage in specific tasks — especially in work of a linear nature, like sorting data in a list using algorithms such as Merge Sort. However, that does not make classical computers superior to quantum ones overall. Quantum computers were not created with the promise of massively replacing classical computing — they are expensive and demand highly specialized use. On the other hand, quantum computers have clear advantages in areas involving other mathematical dimensions, such as combinatorial problems, large-number factorization, simulation of quantum environments, and genetic analyses.

Understand it from this angle: if a classical computer, using Grover's algorithm, takes $O(n)$ to search an unsorted list, a quantum computer using the same algorithm takes approximately $O(\sqrt{n})$ — because, in quantum superposition, all possible states can be available simultaneously [[10]](#ref-10):

<div class="math-block">

$$\text{Classical: } O(n) \qquad \text{Quantum (Grover): } O(\sqrt{n})$$

</div>

For this scenario, imagine you have an unsorted list with 1 billion items. A classical computer might take about 0.1s (a negligible time) to verify each item:

<div class="math-block">

$$\text{Classical: } 10^9 \times 0{,}1\,\text{s} = 10^8\,\text{s} \approx 3{,}17\,\text{years}$$

$$\text{Quantum (Grover): } \sqrt{10^9} \approx 31{,}623 \times 0{,}1\,\text{s} \approx 52\,\text{minutes}$$

</div>

Note that, even using the same hypothetical verification time of 0.1s, the difference is tens of thousands of times in favor of the quantum computer. It is important to note that this example is not entirely fair to classical computers — some have enough processing power to significantly reduce the time needed. Even so, the example is valuable for understanding the fundamental differences between the algorithms involved.

---

### Quantum Computers vs. Cryptographic Algorithms

Something present in the popular imagination is the fear of losing privacy due to advances in quantum computing. In part, this fear has technical and theoretical grounding.

To understand this potential threat, we must first understand the two main types of cryptography: symmetric and asymmetric.

In **symmetric** systems, the same key is used for both encryption and decryption. Security depends on two main factors: the implementation of the encryption algorithm and the secure distribution of the key. An example of this type of algorithm is the Rijndael cipher at 512 bits (AES).

**Asymmetric** systems are known for using key pairs: a public key for validation, and a private key to ensure data security. A widely used example is the RSA algorithm, employed in messaging protocols, emails, and online certifications.

In general, both symmetric and asymmetric cryptography will be impacted by the advent of quantum computers — though in different ways, and asymmetric systems more severely. I will not go into the internal workings of RSA and AES here, but I recommend reading dedicated articles on the subject.

RSA bases its security on the factoring of large prime numbers, which requires an exponentially growing level of processing power for each additional prime — infeasible for classical computers, but completely viable for quantum ones using **Shor's algorithm**. These systems could derive security keys in days or weeks, depending on the implementation.

The impact on AES is more contained. A quantum computer using Grover's algorithm would effectively halve the key size: a 512-bit cipher would be reduced to 256 bits, which is still considered extremely secure.

| System | Quantum Threat | Algorithm | Severity |
|---|---|---|---|
| RSA | High | Shor's | Breakable in days/weeks |
| AES-512 | Moderate | Grover's | Reduced to ~256-bit |

The Cloud Security Alliance (CSA) estimates that by 2030, quantum computers may be capable of breaking current cryptographic algorithms [[13]](#ref-13). Projections indicate that around 200,000 qubits would be needed to break RSA-2048 in 24 hours — a scenario far from the current capacity of hundreds to a few thousand physical qubits.

---

### Conclusion

Quantum mechanics is not a metaphor. It is a set of rigorously tested physical principles that describe the behavior of matter at subatomic scales: superposition, entanglement, wave function collapse, Pauli exclusion. All of these phenomena, far from being philosophical abstractions, are the substrate upon which quantum computing is built.

Qubits are not faster bits. They are bits that operate under a qualitatively different logic — a logic where information can exist in multiple states simultaneously, and where measurement itself is an irreversible physical event with real consequences. Algorithms like Shor's and Grover's demonstrate concrete computational advantages over the best classical algorithms for specific problem classes. The cryptographic infrastructure that sustains the internet as we know it already faces a real challenge on the horizon.

The "quantum" of marketing is empty. The quantum of physics is, perhaps, the strangest and most powerful thing humanity has ever encountered in the structure of reality.

## Author's Note
<div class="nota-autor">
The essay presented here does not formally address all aspects of quantum computing, nor is that its objective; it is an explanatory analysis of what quantum computing is in response to the misuse of the term "quantum." You may, and probably did, have some difficulty understanding all the explanations if, and only if, this is your first contact with quantum physics. If you are already in the field of particle physics, then this essay may have become familiar and routine material.
</div>