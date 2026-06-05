---
layout: article
title: "The Hierarchical Distribution of Information"
subtitle: "Toward a Theory of State and Strategic Knowledge in Hierarchical Systems"
date: 2026-06-05
last_modified_at: 2026-06-05
schema:
  type: Essays and Papers
author: "Kennidy L. Guimarães"
categories: [Information Theory]
tags: [Edge Systems, Hierarchy, Information Theory, Complex Systems, Information Degrowth, Economics, Hayek]
image: /assets/img/og/the-hierarchical-distribution-of-information.png
references:
  - "Hayek, F. A. 'The Use of Knowledge in Society.' The American Economic Review, vol. 35, n. 4, set. 1945, pp. 519–530. https://home.uchicago.edu/~vlima/courses/econ200/spring01/hayek.pdf"
---

{% include ref-tooltips.html references=page.references %}

There is a widespread belief that the greater the power concentrated in an individual, the greater the information that individual holds about the states of the system over which they exercise authority. This, however, does not correspond to observed reality; on the contrary, empirical evidence and structural analysis point to a relationship that is the inverse of this common assumption.

It is not uncommon to find, both in history and in literary satire, examples of leaders who held absolute power over their subordinates — including their agents — in an almost messianic fashion. Yet to what extent does such an image reflect the informational reality of those leaders?

Consider a general: he commands soldiers, corporals, sergeants, captains, and the entire hierarchical chain of a portion of an army. Would it be misleading to call him the man in charge? Indeed, it would not. Yet, paradoxically, he is precisely the agent with the least direct access to real "command" over his immediate subordinates — and, consequently, over the agents situated below them.

The general has access to the overarching strategies and is the one who determines where each sergeant will direct each soldier. He does not, however, have access to real-time field variables. The general knows himself in full; he knows his direct subordinates to a lesser degree, since he is unaware of their actual intentions; and he knows the subordinates of his subordinates to a progressively smaller degree — and so on down the chain to the common soldier.

---

### 1. Formal Definitions

To formalize the argument, we define three distinct categories of information:

- **$$I_t$$ (Total Information)** — The set of all information whose existence influences, to any degree, the state or outcome of a given system, regardless of whether it is accessible to any agent.
- **$$I_e$$ (State Information)** — A contextual subset of $$I_t$$ available to a given agent, as a function of their position, interaction, or observation within the system.
- **$$I_a$$ (Accessible Information)** — The portion of State Information that can be effectively perceived, understood, processed, and used by the agent.

Not all information existing within a system is fully known to all agents; nor does all information known to an agent constitute the total informational content of the system. There is, therefore, a total set of information ($$I_t$$), its partial transmission to agents ($$I_e$$), and, finally, how much of that transmission is effectively accessible or processable by the receiving agent ($$I_a$$).

Based on these definitions, we can establish that, for any agent in relation to themselves, $$I_e = I_a$$, since all information virtually contained within the agent is fully accessible to them — barring cognitive impairments that would prevent such access. This does not imply, however, that $$I_e = I_t$$.

This finding speaks directly to Hayek's argument in *The Use of Knowledge in Society*: we do not have access to the totality of information contained in another individual, and even if we did, we would still lack full interpretive access to it {% include ref.html n=1 %}.

---

### 2. The Degrowth of State Information

When descending one hierarchical level — from the commander to their subordinate — we encounter a structural distinction between total existing information and accessible information. The commander gains access only to the portion of total existing information that is passed on to them by their subordinate, mediated by that subordinate's perceptual and intentional limitations. We refer to this phenomenon as **State Information degrowth**.

For each hierarchical level through which $$I_e$$ is transmitted, a degrowth of magnitude $$\alpha$$ occurs. Thus, the soldier at the edge of the operational chain has access to the full state information of their mission — $$I_e = I_a$$, for them. When transmitting this information upward to their superiors, a degrowth in the level of informational access occurs, even if unintentionally.

Considering $$n$$ levels of hierarchical distance between the soldier and the general, there will be at least $$n$$ levels of informational degrowth. Formally: <br>
*Eq. 1*

<div class="math-block">

$$I_G = I_e(S) \cdot \alpha^n$$
</div>
Where:
- $$I_G$$ — information that reaches the general (center)
- $$I_e(S)$$ — total state information contained in the soldier or edge agent
- $$n$$ — number of intermediate agents (degrowth levels)
- $$\alpha$$ — degrowth factor per level, with $$0 < \alpha < 1$$

Generalizing to any hierarchical level $$h$$, degrowth is expressed recursively:<br>
*Ax. 1*
<div class="math-block">

$$I_e(h+1) = \alpha \cdot I_e(h), \quad 0 < \alpha < 1$$
</div>

Which directly implies:<br>
*Ax. 3a*

<div class="math-block">

$$\frac{dI_e}{dh} < 0$$

</div>

That is, state information decreases monotonically as one moves toward the center of the hierarchy.

---

### 3. The Growth of Abstract Information

Although the general holds lesser $$I_e$$ relative to the common soldier, he shares with other central agents strategic information that is deliberately withheld from edge agents. A general will not inform each soldier of the final objectives of a campaign, at the risk of intelligence leaks and operational compromise. We refer to this second type of information as **Abstract Information** ($$I_b$$), since it differs structurally from edge information: it does not describe the immediate state of the field, but rather the strategic objectives and contexts of the system.

While the soldier at the edge holds $$I_e \gg I_b$$, the general at the center holds $$I_b \gg I_e$$. The transmission of this abstract information from the center to the edge also undergoes a relative degrowth process:<br>
*Ax. 2*
<div class="math-block">

$$I_b(h-1) = \beta \cdot I_b(h), \quad 0 < \beta < 1$$
</div>

Which implies:<br>
*Ax. 3b*

<div class="math-block">

$$\frac{dI_b}{dh} > 0$$
</div>

That is, abstract information increases monotonically as one moves from the edge level ($$h = 0$$) toward the center ($$h = n$$).

---

### 4. The Hierarchical Informational Equilibrium Point (HIEP)

From the preceding axioms, it follows that $$I_e$$ and $$I_b$$ are inversely proportional along the hierarchy. Formalizing the set of axioms:

| Axiom | Expression |
|---|---|
| Ax. 1 | $$I_e(h+1) = \alpha \cdot I_e(h), \quad 0 < \alpha < 1$$ |
| Ax. 2 | $$I_b(h-1) = \beta \cdot I_b(h), \quad 0 < \beta < 1$$ |
| Ax. 3 | $$\dfrac{dI_e}{dh} < 0 \;\text{ and }\; \dfrac{dI_b}{dh} > 0$$ |
| Ax. 4 | $$I_b(h) \cdot I_e(h) \approx \text{constant} \;\Rightarrow\; I_e \cdot I_b = k$$ |

Given that $$I_e$$ and $$I_b$$ vary in monotonically opposite directions along the hierarchy, there necessarily exists a point $$h^*$$ at which these two quantities are equal — the **Hierarchical Informational Equilibrium Point (HIEP)**. It is at this level that accessible information $$I_a$$ reaches its relative maximum, since the agent simultaneously holds relevant state information and strategic contextual information.

Under the assumption of exponential degrowth, the position of the HIEP can be determined analytically. Parameterizing in terms of the expanded forms:

<div class="math-block">

$$I_e(h) = I_e(0) \cdot \alpha^h$$
$$I_b(h) = I_b(n) \cdot \beta^{(n - h)}$$
</div>

Imposing $$I_e(h^*) = I_b(h^*)$$ and solving for $$h^*$$:<br>
*HIEP Corollary*

<div class="math-block">

$$h^* = \frac{n \cdot \log(\beta)}{\log(\alpha) + \log(\beta)}$$
</div>

Where $$n$$ is the total number of hierarchical levels, $$\alpha$$ the degrowth factor of $$I_e$$, and $$\beta$$ the degrowth factor of $$I_b$$. The position $$h^*$$ varies with the asymmetry between $$\alpha$$ and $$\beta$$: hierarchies with strong retention of abstract information ($$\beta$$ close to 1) tend to shift the HIEP toward the edge; hierarchies with strong field filtering ($$\alpha$$ close to 0) tend to shift it toward the center.

Observe the example of degrowth of $$\alpha$$ (edge) and $$\beta$$ (center) with exponential behavior, with the maximum of $$I_a$$ reached where $$I_e \approx I_b$$, in Figure 1.1.

<figure class="artigo-figura">
<img src="{{ site.baseurl }}/files/essays/the-hierarchical-distribution-of-Information/Abstract&ConcreteWithoutDis.DrawIo.png" alt="Abstract & Concrete WithoutDis">
  <figcaption>Figure 1.1 — Exponential degrowth of Ie and Ib across hierarchical levels h, with indication of the HIEP</figcaption>
</figure>

---

### 5. Degrowth and Disruptive Agents

As demonstrated, the values of $$I_e$$ decrease from the edge to the center through successive transformations carried out by the agents within the hierarchical chain. This degrowth may follow exponential or linear behavior, depending on the fragmentation of information transmitted between agents and each agent's capacity to access and retransmit the content received.

Defining $$h$$ as the informational state corresponding to total existing information $$I_t$$, its successive transmission can be represented as:

<div class="math-block">

$$h_0 = I_e$$
$$h_0 \xrightarrow{\alpha_1} F(h_0) \xrightarrow{\alpha_2} F(h_1) \xrightarrow{\alpha_3} F(h_2) \;\rightarrow\; \cdots$$
</div>

Where $$\alpha_i$$ represents the agent responsible for transmission at level $$i$$ and $$F(h)$$ the transformation function applied to the received information. Depending on the characteristics of the agents involved, $$F(h)$$ produces either linear or exponential degrowth:

| Type | Sequence |
|---|---|
| Linear degrowth | $$h_0 = 100 \to h_1 = 87 \to h_2 = 71 \to h_3 = 58 \;\cdots$$ |
| Exponential degrowth | $$h_0 = 100 \to h_1 = 80 \to h_2 = 64 \to h_3 = 51 \;\cdots$$ |

The nature of this degrowth lies partly in $$I_a$$ — the amount of information effectively accessible to each agent and their capacity to retransmit it. As demonstrated, for any agent it holds that $$I_e \geq I_a$$, such that transmission never occurs with perfect integrity.

There are, however, situations in which transmission is altered, withheld, or modified beyond the natural structural degrowth. This occurs when an agent interrupts the continuous information flow in order to omit, redefine, or deliberately add content. We refer to this perturbation as **$$\gamma$$ (gamma)**.

In the first case, $$\gamma$$ acts by reducing information beyond what is expected from structural degrowth: <br> *Intentional omission*:
<div class="math-block">

$$h_0 = 100 \to h_1 = 87 \to h_2 = 71 \xrightarrow{[\gamma]} h_3 = 12 \to h_4 = 10 \;\cdots$$
</div>

In the opposite case, $$\gamma$$ acts by adding or amplifying information: <br> *Intentional falsification*:
<div class="math-block">

$$h_0 = 100 \to h_1 = 87 \to h_2 = 71 \xrightarrow{[\gamma]} h_3 = 91 \to h_4 = 82 \;\cdots$$
</div>

We may also consider a third state, in which information is transmitted by a loyal and honest agent who, due to an inability to fully comprehend the state being conveyed, introduces incoherencies into the fragment passed along. This phenomenon is referred to as **$$\varepsilon$$ (epsilon)** — structural noise. Although the intent differs from that of $$\gamma$$, the effect on the informational chain is analogous.

The oscillations between loyal agents and disruptive agents produce cumulative distortions that directly affect the quality of $$I_a$$. Although at the edge State Information ($$I_e$$) may remain intact, the information that reaches the center may differ substantially due to the transformations accumulated along the hierarchical chain. See the example in Figure 1.2.
<figure class="artigo-figura">
<img src="{{ site.baseurl }}/files/essays/the-hierarchical-distribution-of-Information/Abstract&ConcreteWithDis.DrawIo.png" alt="Abstract & Concrete WithoutDis">
  <figcaption>Figure 1.2 — Effect of disruptive agents gamma and structural noise epsilon on the informational flow from edge to center</figcaption>
</figure>


---

### 6. Coordination without Complete Information

The foregoing raises a central question: if the system operates with fragmented and progressively diminishing information, how is it possible for it to function and achieve coordinated objectives? The answer can once again be found in Hayek {% include ref.html n=1 %}:

<div class="destaque-bloco">
"The whole acts as one market, not because any of its members survey the whole field, but because their limited individual fields of vision sufficiently overlap so that through many intermediaries the relevant information is communicated to all. The mere fact that there is one price for any commodity — or that local prices are connected in a manner determined by the cost of transport, etc. — brings about the solution which (it is just conceptually possible) might have been arrived at by one single mind possessing all the information which is in fact dispersed among all the people involved in the process." — Hayek, 1945
</div>

All fragmented information, when taken together, retains interpretive directional capacity. Although the general does not know the whole, he knows a diminished fragment of it; and he knows it from another agent, who in turn knows it from another. Each agent acts within a limited and diminishing scope — with intentional or unintentional disruptive agents present — allowing coordination to emerge from the overlap of adjacent informational fields.

Formally: informational decay ($$\alpha$$, $$\beta$$, $$\gamma$$, $$\varepsilon$$) is structural and inevitable, but it does not preclude coordination, because the system does not depend on complete information at any single point — it depends on sufficient overlap between adjacent limited fields.

---

### 7. Limits and Conditions of Validity

#### 7.1. Collapse between Center and Edge

Every system admits exceptions. The first concerns systems in which the displacement between center and edge collapses or coexists within the same state — as in the case of the general on the front line. In such instances, the informational degrowth from edge to center is minimal, since center and edge merge and operate as a single organism, even if they remain formally distinct.

It is therefore appropriate to stipulate a structural minimum of three agents: the center, the intermediate degrowth agent, and the edge. Degrowth occurs from the edge to the agent and from the agent to the center. Formally, when $$H_{\text{center}} \approx H_{\text{edge}}$$, degrowth will tend toward $$n \to 0$$.

#### 7.2. Systems with Chained Validation

The degrowth model is valid in systems with rigid, non-decentralized hierarchies, presupposing a certain degree of freedom in transmission between agents. If that freedom does not exist, it is not reasonable to assume that the same effect will occur.

A contrasting example is digital systems with Blockchain, in which the validation mechanism operates through incentives and block chaining. In these systems, degrowth may not be possible given that inter-agent verification occurs with zero trust and low interpretive freedom — which structurally eliminates the conditions for perturbation $$\gamma$$ and noise $$\varepsilon$$.

#### 7.3. Conservation of Information at the Edge

A fundamental point: information does not disappear. Although fragmented along the hierarchical chain, it remains intact in the original agent — at the edge. Thus, $$I_e$$ and $$I_t$$ persist. Degrowth merely fragments and displaces information from edge to center, and may alter, modify, or omit it. Omission is, by definition, distinct from nonexistence.

---

### 8. Empirical Verification

The structures formalized above can be identified across multiple contexts.

**In the military domain:** the Minister of Defense does not hold greater $$I_e$$ than the general; the general does not hold greater $$I_e$$ than the sergeant, who may even have firsthand knowledge of the relationship between troop morale and the need to advance. The sergeant, in turn, holds lesser $$I_e$$ than the soldier himself — who understands his own physical limits and the relationship between each engagement and his will to fight. The soldier, however, holds lesser $$I_b$$ than the sergeant, who holds lesser $$I_b$$ than his own superior.

**In the means of production:** the executive holds lesser $$I_e$$ than the floor manager, but greater $$I_e$$ than the company's investor. The investor, in turn, holds greater strategic $$I_b$$ — regarding where to allocate funds — than the executive. The point of greatest $$I_a$$, where $$I_e \approx I_b$$, will belong neither to the investor, the executive, nor the worker, but to the agent situated at the convergence between them. Thus, a mid-level manager — close to the workers yet participating in strategic meetings between management and investment — likely occupies a position near the HIEP, by simultaneously holding relevant access to both state information and strategic information.