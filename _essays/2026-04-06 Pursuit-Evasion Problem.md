---
layout: article
title: "Pursuit-Evasion Problem: A Probabilistic Search Analysis in a Deterministic Scope"
subtitle: "When fifty blind humans try to eliminate an ant in a dark room"
date: 2026-04-06
last_modified_at: 2026-04-06
schema:
  type: Essay
author: "Kennidy L. Guimarães"
categories: [mathematics]
tags: [pursuit-evasion, probability, search theory, game theory, mathematics]
image: /assets/img/og/pursuit-evasion-problem-a-probabilistic-search-analysis-in-a-deterministic-scope.png
---

Imagine yourself in a dark room, as dark as it can possibly be. With you are many people — a reasonable number, perhaps fifty of them — all in a room of approximately $100\,\text{m}^2$.

In that same room there is an ant, and only one ant. The objective of every human present is the same: to eliminate the ant. It does not matter whether the instrument used will be a hand, a foot, a knee, or even a head; the goal is singular: to exterminate it.

---

### The Initial Dynamics

At first glance, the objective may seem impossible, given the dynamics involved. When a human is at point $A_1$, the ant may be at point $Z_7$, and nothing guarantees that, in the next instant, it will not be at some other point entirely.

However, considering the number of individuals — fifty humans — and the region that can be used for the fatal blow (the entire area of the human body that touches the ant on the two-dimensional plane), we can define a **lethal action area**.

Let $T$ be time. When $T \to \infty$, the ant will meet its end at some instant $t < T$. In probabilistic terms, we have:

<div class="math-block">

$$P(\text{death}) \to 1 \quad \text{when} \quad T \to \infty$$

</div>

However, it is not mathematically impossible for the ant to survive:

<div class="math-block">

$$P(\text{survival}) \neq 0$$

</div>

Therefore, even though the probability is extremely low, it is never zero.

---

### Probabilistic Search in a Deterministic Scope

The fact that the humans are blind within a bounded space does not significantly increase the ant's chances. Even without direct perception, the humans can communicate — albeit imperfectly — progressively reducing the gaps in the space.

Thus, a human at $A_1$ covers their region and communicates a probabilistic estimate (for instance, the possibility that the ant is at $X_1$), and another human carries out the corresponding inspection.

Even without knowing the exact position, the agents conduct a search that increases, over time, the probability of the ant's death. Denoting by $m_T$ this cumulative probability, we have:

- $m_T$ grows over time;
- $\lim_{T \to \infty} m_T = 1$.

We call this **probabilistic search in a deterministic scope**, where the scope is the finite space of the room.

You might think: well, we can help the ant — we can set up a single escape route sized for it, something the size of ten grains of sand. But in this unfair system, we must apply the condition that everyone now knows the escape point, even though they do not know the escape time. Within an infinite time $T$, the ant may flee today, be attempting it right now, tomorrow, a year from now, or even ten years from now; the model imposes no temporal decay on the probability of escape.

---

### The Escape Route

Suppose there exists an escape route $Y_7$, compatible with the size of the ant. Every human knows this point, but none knows when the ant will attempt to reach it.

Although this might at first appear to be an advantage for the ant, this shared information becomes, in practice, a structural disadvantage: by revealing its ultimate objective, the ant concentrates the agents' attention on a critical region of the space, increasing the probability of interception along its trajectory.

Thus, even with the existence of the route, the ant remains subject to the uncertainty of interception from the initial point $A$ to $Y_7$. The path begins to function as a **probabilistic corridor of accumulated risk**.

We can represent this risk accumulation through a cumulative hazard function, where $P(M_i \mid \neg M_1, \ldots, \neg M_{i-1})$ denotes the probability of death at instant $i$ given that the ant has survived until then:

<div class="math-block">

$$F(n) = 1 - \prod_{i=1}^{n} \left(1 - P(M_i \mid \neg M_1, \ldots, \neg M_{i-1})\right)$$

</div>

Where each factor $(1 - P(M_i \mid \cdots))$ represents the conditional survival probability at instant $i$. This formulation is consistent with the structure of cumulative survival probability: $F(n)$ grows monotonically at each step and converges to 1 when $n \to \infty$, provided each conditional probability is strictly positive.

You will notice that the faster the agents are, the greater the area they will cover and the lower the ant's probability of survival.
It may not understand that, in truth, its fate was defined from the very beginning. This is the case of a zero-sum existence, because regardless of its action — advancing, retreating, attempting escape, or remaining static — the outcome, given $T$, is always $t < T$: death within $T$. Although there is a chance the ant escapes alive, its probability of success is strictly limited by the space and the conditions of the system, even if there exists some scenario in which it manages to escape.

The greater the agents' coverage capacity, the greater the accumulated risk to the ant.

---

### Equation of the Probability of Death

An approximation of the instantaneous rate of growth of the capture probability can be modeled by a differential equation with an exponential form, following the logic of accumulated sweep from *search theory*:

<div class="math-block">

$$\frac{dP}{dt} \approx k \cdot \frac{N_h \cdot S_h \cdot v_h}{A_{\text{total}}} \cdot (1 - P)$$

</div>

Where:

- **$N_h$** — number of humans;
- **$S_h$** — effective sweep width of one human;
- **$v_h$** — average search speed;
- **$A_{\text{total}}$** — total area of the room;
- **$k$** — efficiency constant that weights trajectory overlap and search strategy;
- **$(1 - P)$** — fraction of the space not yet effectively swept.

This differential form is a heuristic inspired by classical random search models. Its solution is:

<div class="math-block">

$$P(t) = 1 - e^{-\,k \cdot \frac{N_h \cdot S_h \cdot v_h}{A_{\text{total}}} \cdot t}$$

</div>

This confirms that $P(t) \to 1$ when $t \to \infty$, and that $P(t) > 0$ for every finite $t$ — preserving survival as a non-zero possibility at any finite instant.

A known and defined route is not fully accounted for, but if it is, it translates into an initial disadvantage; therefore, it is approximately zero ${\approx}0$, since, given the moment $T$ and the agents' coverage area, we disregard it.

---

### Zero-Sum

The system can be interpreted as a zero-sum problem: the success of one side implies the failure of the other.

Even so, the outcome is not deterministic. Although:

<div class="math-block">

$$P(\text{death}) \to 1$$

</div>

remains true, it is also a fact that:

<div class="math-block">

$$P(\text{survival}) > 0$$

</div>

Therefore, the convergence is probabilistic, not absolute.

---

### Strategies

**Ant.** The ant must move so as to avoid regions of high coverage, progressively approaching $Y_7$. Success depends on avoiding intersections with the agents over time.

**Humans.** The humans can divide themselves into two groups:

- **Group A:** active search and interception;
- **Group B:** surveillance of the escape route $Y_7$.

This strategy further reduces the ant's probability of success.

Success for the ant in this scenario could only come through a multiplicity of pre-existing advantages, such as:
- **A:** The ant is considerably faster than the humans.
- **B:** The ant manages to be undetectable to the humans.

Or through a clear human disadvantage, such as:
- **A:** The humans are incapable of conducting the search.
- **B:** The humans are unaware of the escape route or the ant's objective.
- **C:** The humans do not communicate or perform probabilistic estimation.

---

### Conclusion

The problem presented is analogous to real-world search and detection systems, such as submarine tracking, radar, and distributed search.

The main difficulty lies in analyzing the interception time. Although the model uses $T \to \infty$, this time is merely an idealization. In real scenarios, events occur in finite time, even if uncertain.

Thus, the system converges toward capture with a probability tending to 1, but without absolute guarantee.

<span class="destaque-bloco">
**Note:** Probabilistic convergence to 1 does not imply mathematical certainty. The ant can, in theory, always survive — which makes this problem a classic case of asymptotic analysis applied to search systems.
</span>

<div class="destaque-bloco">
Realistic example: One day, you arrive home and, upon entering your bedroom, you spot a cockroach on the wall. It must have come in through the gap under the door or through the window. You immediately close both. Now, the room becomes a closed and bounded system. The only possible exit route is the gap under the door — an exit that both you and the cockroach likely know about.
At that moment, the space transforms into a classic pursuit-evasion problem. Although the cockroach is far faster and more agile than you, the system favors capture. You can turn on the lights, see it, and plan the search. The cockroach, in turn, has only one known escape path.
Given sufficient time $T$, the probability that the cockroach is eliminated tends to 1. The space is finite, the escape route is unique and monitored, and the pursuer possesses visual information and the ability to block the critical point. Even so, at any finite instant, the cockroach retains a positive chance of survival — by running, hiding behind furniture, or exploring corners you have not yet searched.
</div>

---

## Author's Note

<div class="nota-autor">

The equations presented in this essay are **approximate heuristics**, not rigorous derivations of an exact model.

In real pursuit-evasion games with multiple pursuers and a single evader, the probability of capture can be analyzed through reachability sets, optimal strategies in differential games, or persistent policies (such as those studied in *search theory* and swarm robotics). In such cases, the dynamics do not always follow exactly the simple exponential form used here, especially when the evader adopts intelligent adversarial strategies.

The exponential model serves primarily to illustrate **asymptotic convergence** ($P \to 1$ when $T \to \infty$) in finite spaces under persistent search, inspired by classical concepts of accumulated sweep (*sweep width*) from search theory. The essay's closing note reinforces the central point: probabilistic convergence does not equate to mathematical certainty in finite time.
</div>