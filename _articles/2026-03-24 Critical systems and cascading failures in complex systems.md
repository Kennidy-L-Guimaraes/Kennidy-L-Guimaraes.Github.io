---
layout: article
title: "Critical systems and cascading failures in complex systems"
subtitle: "Why Failures at the Weakest Link Are Not Isolated Events"
date: 2026-03-24
author: "Kennidy L. Guimarães"
email: "me@kennidylguimaraes.com"
categories: [computer-science]
image: /assets/img/og/critical-systems-and-cascading-failures-in-complex-systems.png
references:
  - "Cascading failures in complex networks https://academic.oup.com/comnet/article/8/2/cnaa013/5849333"
  - "Reliability Evaluation of Machine Center Components Based on Cascading Failure Analysis https://link.springer.com/article/10.1007/s10033-017-0144-y"
  - "Failure dependence and cascading failures: A literature review and research opportunities https://www.sciencedirect.com/science/article/pii/S0951832024008378"
---

If you have developed many projects, or lived through the security bubble between 2000 and 2015, you have probably heard the terms "critical project" or "safety-critical" repeatedly. This is directly tied to the state of digital security and the digitalization process that, in my country (Brazil), was already happening en masse during that period.

---

## Criticality Levels

Every project has criticality levels; we can define them based on the consequences of a failure, considering the collateral damage caused both economically and environmentally and socially, as well as the statistical inevitability of failures in complex systems.

### Safety-Critical Systems (SCS)

These are systems whose failures cause large-scale damage, including death, physical injury, and environmental impact. A classic example is the **Therac-25** case, which resulted in a combination of these problems: deaths, physical injuries, and direct environmental impacts.

### Mission-Critical Systems (MCS)

These are systems whose failures cause operational disruptions that may lead, even if indirectly, to medium-scale damage. An example would be an error, attack, or failure that disrupts banking services, directly affecting the economic and social scope and potentially leading, in many cases, to larger systemic effects.

### Business-Critical Systems (BCS)

These are systems that cause significant losses, even if they do not directly threaten the existence of the business — such as failures in ERPs, point-of-sale systems, and other systems that incorrectly estimate values related to sales, inventory, or taxes.

---

## Mathematical Foundations of Criticality

### The Weakest Link

The criticality of a system can be analyzed by considering two fundamental principles: the inevitability of failures over time and the tendency of systems to fail at their most fragile points [[1]](#ref-1).

Formally, we define a system $S$ composed of components $C_i$, each with a failure probability $P(F_i)$. There therefore exists a component $W \in S$ such that:

<div class="math-block">

$$\forall S,\; \exists\, W \in S \;:\; P(F_W) = \max \{ P(F_i) \mid C_i \in S \}$$

</div>

That is, every system has a weakest link, defined as the component with the highest probability of failure.

### The Inevitability of Failure

Given that the probability of failure is never zero — an observation empirically grounded in Murphy's Law, according to which no system is absolutely error-proof — we have:
<div class="math-block">

$$P(F_W) > 0 \;\Rightarrow\; P\!\left(\exists\; t \leq T : F_W(t)\right) \to 1 \text{ when } T \to \infty$$

</div>

That is: given enough time, the probability that the failure manifests approaches 1. When this failure occurs at the weakest link, it can compromise the system as a whole:
<div class="math-block">

$$\exists\; t \;:\; F_W(t) \;\Rightarrow\; F_S(t)$$

</div>

<div class="nota-autor">
  Note
  The implication above should be read under the probabilistic perspective established previously. A positive probability does not guarantee the occurrence of the event at a specific instant, but it does guarantee its occurrence with probability 1 in the limit of time.
</div>

<div class="nota-autor">
Note on Murphy's Law
Murphy's Law does not constitute a formal law in the mathematical sense, but rather an empirical heuristic that expresses the observation that complex systems are subject to failure.
From a probabilistic standpoint, this intuition can be formalized by considering the repetition of events with a non-zero probability of failure. Let p>0 be the probability of a failure occurring in a single execution.
</div>
---

## The Therac-25 Case

The Therac-25 project failed significantly by ignoring these premises. The existence of failure conditions — combined with the absence of robust containment mechanisms — led to the materialization of failures at the system's most vulnerable point: the radiation control software. These failures occurred at unforeseen moments, affecting the system catastrophically.

---

## Design Responsibility

Failures do not always stem exclusively from user error; they are often a consequence of design decisions. The user operates within the permissions defined by the system. If the system allows data input without validation or accepts weak credentials, it is structurally exposed. Security must be restrictive by definition, but balanced in relation to usability.

Furthermore, user behavior naturally tends toward the exploration of limits. Systems must be designed with this reality in mind, whether through technical restriction or through adequate guidance about the consequences of actions.

---

## Criticality Function

Criticality can be formally represented as a function of the probability of failure and the associated impact:
<div class="math-block">

$$C = P(F) \cdot I$$

</div>
where $C$ represents criticality, $P(F)$ the probability of failure occurrence, and $I$ the impact caused by that failure.

**Limitation:** This formulation treats $P(F)$ and $I$ as independent variables. In complex systems, this is rarely true — high-impact failures often have probabilities correlated with design decisions. This limitation must be considered when interpreting results.

If one wishes to model the probability from observable events, it can be defined as:
<div class="math-block">

$$P(F) = \frac{E_f}{E_t}$$

</div>

where $E_f$ represents the number of events that lead to failure and $E_t$ the total number of possible events. Thus, criticality can be expressed as:
<div class="math-block">

$$C = \left(\frac{E_f}{E_t}\right) \cdot I$$

</div>
For systems composed of multiple components, criticality can be evaluated in an aggregated form:
<div class="math-block">

$$C_S = \sum_{i=1}^{n} P(F_i) \cdot I(F_i)$$

</div>
with the observation that the most critical component tends to dominate the total risk, especially when its probability of failure is significantly higher than the others.

---

## Classification and Criticality Dashboard

When dealing with events at a macro scale, results may not be precise; in this context, classifications based on historical data or qualitative scales are used. A criticality gradation is thus defined with thresholds $\theta_1 < \theta_2 < \theta_3$ determined by domain:

| Class | Interval | Description |
|:---:|:---|:---|
| **A** | $C < \theta_1$ | Low criticality |
| **B** | $\theta_1 \leq C < \theta_2$ | Medium criticality |
| **C** | $\theta_2 \leq C < \theta_3$ | High criticality |
| **D** | $C \geq \theta_3$ | Extreme criticality |

The thresholds $\theta_1, \theta_2, \theta_3$ are defined by domain — civil, industrial, or military — which is conceptually honest, since the magnitude of acceptable impact varies according to context. Or, if preferred, the standard and conventional notation (SCS, MCS, and BCS) can be used.

Based on these metrics, it is possible to structure a project criticality dashboard and identify its most sensitive modules. For example:

| Module | Class |
|:---|:---:|
| Sales module | C |
| Tax module | D |
| Access module | B |
| Update module | A |

The goal is to maintain a continuous history and perform recurring analyses on where criticalities are being detected, which failures have been corrected, which defects have been identified, and how the system reassessment evolves. If, for example, multiple failures prevent a module from functioning and result in partial shutdown, its criticality must be reclassified — potentially evolving from an A level to somewhere between B and C — reflecting the increase in operational risk.

---

## Cascading Failures and Systemic Criticality

We know that failures do not occur in isolation, but rather progressively and in chain. An initial failure can trigger a sequence of events that propagate through the system, amplifying its original impact [[1]](#ref-1)[[2]](#ref-2).

<span class="destaque-bloco">
One of the most dramatic processes that spread in complex networks is the cascade of failures when a failure in part of the system leads to new failures in the same and in other systems that continue to propagate. Eventually, the entire system may become dysfunctional and collapse catastrophically. - Journal of Complex Networks, Volume 8, Issue 2, April 2020...
</span>


We can therefore estimate criticality not only by the direct impact of a failure, but also by the subsequent effects it provokes.

### Recursive Impact

Defining the total impact of a failure in component $i$ as $\mathcal{I}(i)$, we have:
<div class="math-block">

$$\mathcal{I}(i) = I(F_i) + \sum_{j \,\in\, \text{dep}(i)} P(F_j \mid F_i) \cdot \mathcal{I}(j)$$

</div>
where $\text{dep}(i)$ is the set of components that directly depend on $i$. The total systemic criticality then becomes:
<div class="math-block">

$$C_S = \sum_{i=1}^{n} P(F_i) \cdot \mathcal{I}(i)$$

</div>
This model captures propagations of arbitrary depth — not just immediate failures, but complete chains of dependency. This is what is formally known as **systemic failure in graphs**.

### Structural Analogy

A problem that starts at $A_1$ can lead to an error in $A_2$, which in turn has its own dependencies, propagating the failure to $A_3$ and so on, until the system is interrupted or unforeseeable side effects occur [[2]](#ref-2).
<span class="destaque-bloco">
For intuitive analysis: it is like a house of cards. Upon removing a structural element at the base, the balance of the whole is compromised, and collapse tends to propagate progressively — revealing cascading failures throughout the system. The recursive model of $\mathcal{I}(i)$ is the exact formalization of this behavior.
</span>

### Conclusion

The solution to the problems of criticality and cascading failure involves the mathematical and historical analysis of the system, with the goal of developing techniques that involve rapid decoupling and replacement of the defective module. In software, this translates into backups and version control for localized failure replacement, system restart, or safer deployment.

Git has made this process considerably safer: with versioning it is possible to revert to a verified state and deploy a functional moment of the system. However, in offline systems — without Git or an equivalent resource — constant backups are not always respected, and when they are performed, they may capture the error itself along with the system state, making the backup a preservation of the failure.

A complementary and equally relevant mechanism is the **Circuit Breaker**. Inspired by electrical circuit breakers, the pattern automatically interrupts the flow of operations toward a failing component, preventing the localized failure from propagating through the dependency chain. The Circuit Breaker operates in three states: closed (normal operation), open (failures detected, requests blocked), and half-open (controlled attempt at resumption). Applied to systemic criticality, it acts directly on $P(F_j \mid F_i)$ — reducing the probability of propagation by isolating the defective component before $\mathcal{I}(i)$ accumulates along the chain.

For example, a system that presents a criticality D failure every 1,000 transactions can have its total impact estimated by the following expression, which aggregates the direct damage with the accumulated cascading impact across all dependent components:
<div class="math-block">

$$\mathcal{I}(i) = I(F_i) + \sum_{j \,\in\, \text{dep}(i)} P(F_j \mid F_i) \cdot \mathcal{I}(j)$$
</div>
Considering $P(F) = \frac{1}{1000} = 0{,}001$ per transaction and expanding over the dependency chain across $n$ components:

<div class="math-block">

$$C_S = \sum_{i=1}^{n} P(F_i) \cdot \mathcal{I}(i)$$
</div>

The result classifies the system as **critical at class D**, requiring immediate intervention. With the Circuit Breaker active, the value of $P(F_j \mid F_i)$ tends to zero for isolated components, reducing $C_S$ and containing the progression of criticality before it reaches irreversible levels.

Defining the criticality of a system and applying the necessary corrections — in software or in higher hardware layers — requires constant and direct analysis, consistent backups, well-configured Circuit Breakers, and a rapid update mechanism for error mitigation that, as we have seen in this text, has a real probability of occurrence.

---

### Author's Note

<div class="nota-autor">

This article does not claim to explore beyond the limits of software criticality or to offer an exhaustive mathematical basis for all concepts in the field. The system presented here is based on the theory of the weakest link and Murphy's Law — which, as is well known, does not constitute a scientific or mathematical law in the formal sense, but serves to describe scenarios in which the inevitable may occur.

Some important caveats deserve mention. First, not every failure at the weakest link brings down the system: propagation depends on the topology of dependencies, the presence of redundancies, and containment mechanisms such as the Circuit Breaker — which, by isolating the defective component, can interrupt the chain before it becomes systemic. Second, the probabilistic models presented are valid only under stationary conditions, that is, they assume that failure probabilities do not vary significantly over time. In systems with variable load, progressive component degradation, or environmental changes, the values of $P(F_i)$ must be continuously reassessed. Third, the formalization of Murphy's Law through the limit $P \to 1$ when $T \to \infty$ is valid under assumptions of independence — or ergodicity — and infinite repetition: correlated events, finite time windows, or systems with recovery mechanisms alter this result and must be treated with specific models.

</div>