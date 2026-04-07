---
layout: article
title: "How A* Uses Heuristics and Mathematics to Define the Best and Least Costly Route"
subtitle: "A mathematical leap forward from Dijkstra's algorithm with guided search"
date: 2026-04-1
last_modified_at: 2026-04-1
schema: 
  type: ScholarlyArticle  
author: "Kennidy L. Guimarães"
categories: [algorithms]
tags: [algorithms, Mathematical, Graphs, Search]
image: /assets/img/og/how-a-uses-heuristics-and-mathematics-to-define-the-best-and-least-costly-route.png
references:
  - "Hart, P. E., Nilsson, N. J., & Raphael, B. (1968). A Formal Basis for the Heuristic Determination of Minimum Cost Paths. IEEE Transactions on Systems Science and Cybernetics, 4(2), 100–107."         # [1]
  - "University of Auckland. A* Search Algorithm — Research Notes. https://www.cs.auckland.ac.nz/courses/compsci709s2c/resources/Mike.d/astarNilsson.pdf"         # [2]
  - "GeeksforGeeks. A* Search Algorithm. https://www.geeksforgeeks.org/dsa/a-search-algorithm/"         # [3]
---

Having explained Dijkstra's algorithm, we cannot overlook another algorithm that uses a similar system but is profoundly different: the **A* algorithm** (read as "A-star"). Peter Hart, Nils Nilsson, and Bertram Raphael from the Stanford Research Institute (now SRI International) published the foundational paper on this algorithm [[1]](#ref-1).

A* can be seen as an evolution of Dijkstra's algorithm, with changes in its mathematical formulation and the incorporation of heuristics. It represents a kind of "controlled mathematical leap" to discover the best route. If the heuristic is good, it can be significantly faster than Dijkstra; however, if the heuristic is poor, you would probably prefer Dijkstra. A* is used in GPS routing, artificial intelligence, and navigation systems, just like Dijkstra itself. Let's focus on what truly matters: its formulation.

---

### The Core Concept

Imagine a bus traveling from the city of Santa Amélia to Florianópolis. At first glance, it seems like a simple journey: take the main highway, go straight, turn at city X, then onto road Y, and continue. However, since it is a bus, it must respect road regulations and follow its designated route.

The problem is that in large urban centers, the shortest path in kilometers is not always the fastest in time. This depends on variables such as traffic, road closures, or slow traffic flow.

In this case, Dijkstra's algorithm could still find the least costly path based on fixed costs, but it doesn't naturally handle dynamic estimates or predictions. A*, on the other hand, allows us to incorporate an estimate (heuristic) of these conditions, helping to point toward the potentially fastest route based on both the actual cost and a "good guess" about the remaining journey.

<span class="destaque-bloco">
"A* is not a greedy algorithm — it does not discard paths directly. It works with a priority queue data structure, calculating and recalculating the best routes based on costs." — Hart, Nilsson, & Raphael (1968)
</span>

---

### The Mathematical Foundation

To move from the current point, suppose we are at point A heading toward point B. The algorithm calculates the total estimated cost of this path as $T_c$ (Total Cost), which represents the best route found so far. The remaining cost is not known with precision, but can be estimated through a heuristic.

We possess values in weights, similar to Dijkstra's algorithm, but now the heuristic comes into play. Considering the movement from $A \to B$, we can use current conditions as variables and, from this, estimate the cost of $B \to C$.

If this estimate indicates that proceeding through $C$ results in a lower total cost than alternatives such as $C \to D$ or $D \to E$, then the algorithm prioritizes that path.

**A* does not discard paths directly.** It maintains a priority queue structure, recalculating the best routes based on costs. For example:

- If the cost from point A to B is 10, and from point B to C is 15, while from point B to D is 12, it does not abandon the path to C.
- That path remains in memory because from C, there may still be a better route to the final destination.

This occurs because A* considers not only the accumulated cost so far but also an estimate of the remaining cost. Thus, something that is more expensive now may become cheaper in total.

---

### The A* Evaluation Function

A* uses a mathematical function to perform its calculations:

<div class="math-block">

$$F(n) = g(n) + h(n)$$

</div>

Where:

- **F(n)** — evaluation function of node n, representing the total estimated cost
- **g(n)** — cost of the path from the starting point to the current node (for example, from A to B)
- **h(n)** — heuristic that estimates the cost from the current node to the final destination
- **n** — node in the graph

It is important to note that this calculation is performed whenever we want to move from one node to another. For example, if we wish to go from $A \to B$, we calculate both the cost and the estimate.

In our example, if we want to reach Z:

For the path $A \to B \to C$:
<div class="math-block">

$$F(C) = g(C) + h(C) = 10 + 50 = 60$$
</div>
For the path $A \to B \to D$:
<div class="math-block">

$$F(D) = g(D) + h(D) = 10 + 30 = 40$$
</div>

The path $A \to B \to C$, although presenting a higher cost value (60), is not discarded immediately. It remains stored because it may still result in the best route to Z.

The algorithm works with estimates: it uses the current value of $F(n)$ to prioritize the most promising paths. Thus, even though the path through C exists, the algorithm will continue exploring the path through D first, since, at the moment, it presents a lower estimated cost ($F(D) < F(C)$). The path through C remains as an alternative and can be explored later if it proves more advantageous.

---

### Where Does the Heuristic Come From?

Up to this point, we have used $h(n)$ values as ready-made data, but it is worth explaining where they come from and how they are calculated.

**The heuristic is an estimation function of the remaining cost to reach the objective.** In our example, it represents the approximate cost of traveling the remaining portion of the journey, considering known conditions of the roads.

In practice, we calculate $h(n)$ based on the distance between the graph's edges and the final point, using an estimation function. A simple and effective approach is **Euclidean distance**, which measures the straight line between two points:

<div class="math-block">

$$h(n) = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

</div>

Where $(x_1, y_1)$ are the coordinates of the current node and $(x_2, y_2)$ are the coordinates of the final destination (Florianópolis in our case).

This function provides an estimate of the remaining cost because the straight-line distance is always less than or equal to the actual path — it never overestimates. This property is called **admissibility**, and it is what guarantees that A* finds the optimal path.

This is precisely why Street 10 (St10), despite having a relatively low edge cost (20), presents $h = 80$: geographically, it is far from the final destination. Meanwhile, Street 9 (St9), with $h = 5$, is well-positioned relative to Florianópolis, making it a more promising choice from the perspective of total estimated cost.

Therefore, the heuristic functions as a probabilistic compass: it does not guarantee the exact path, but guides the algorithm in the right direction, preventing it from wasting processing power exploring routes that are, geometrically, heading in the wrong direction.

---

### The Two Lists: Open and Closed

The A* algorithm works with two lists:

- **Open List:** nodes that are known but not yet processed
- **Closed List:** nodes that have already been processed with defined cost

At each iteration, the algorithm selects the node with the lowest $F(n)$:

<div class="math-block">

$$F(n) = g(n) + h(n)$$

</div>

This node is removed from the open list and moved to the closed list.

With a consistent heuristic, the closed list is never revisited — it contains nodes already processed with the best known cost at that moment. Without consistency, it may be necessary to reopen nodes.

The open list, on the other hand, is constantly reorganized, prioritizing the lowest $F(n)$.

**Important:** if a node already exists in the Open List with a lower $g$ cost, we ignore any new path with a higher $g$. This ensures we always use the best known cost at that moment.

---

### Practical Step-by-Step Simulation

Let's analyze in practice how this works. Imagine we have the following scenario: traveling from Santa Amélia to Florianópolis, the bus needs to take the best route — the fastest and most efficient.

For this, we will work with a vector and two lists. Not all streets have exits or lead us to the best path; some are blocked or have high and irregular traffic.

We represent our route as:
<div class="math-block">

$$R = \{ \text{SA}, \text{St}_n(\text{cost\_edge}, h), \ldots, \text{FP} \}$$

</div>

Where:
- **R** is the route
- **SA** is Santa Amélia (starting point)
- **St** is Street n
- **(cost_edge, h)** are the values associated with each node
- **cost_edge** represents the cost to reach that node (defined by the edge) from the previous one
- **h** represents the heuristic (estimate of remaining cost to destination)

<div class="math-block">

$$
R =
\begin{bmatrix}
\text{Santa Amélia} \\
\text{St}_1(10, 7) \\
\text{St}_2(15, 5) \\
\text{St}_3(12, 4) \\
\text{St}_4(69, 10) \\
\text{St}_5(17, 22) \\
\text{St}_6(88, 7) \\
\text{St}_7(39, 27) \\
\text{St}_8(73, 33) \\
\text{St}_9(25, 5) \\
\text{St}_{10}(20, 80) \\
\text{Florianópolis}
\end{bmatrix}
$$

</div>

In this route, St3, St6, and St7 have traffic that is practically stopped and do not have valid connections in the graph for this example, so they do not participate in the simulation.

The valid routes are:
<div class="math-block">

$$
R =
\begin{bmatrix}
\text{St}_1(10, 7) \\
\text{St}_2(15, 5) \\
\text{St}_4(69, 10) \\
\text{St}_5(17, 22) \\
\text{St}_8(73, 33) \\
\text{St}_9(25, 5) \\
\text{St}_{10}(20, 80)
\end{bmatrix}
$$

</div>

Each one has its own connections.

#### Graph Connections

<div class="math-block">
$$
\begin{aligned}
\text{SA} &\rightarrow \{\text{St}_1, \text{St}_2, \text{St}_{10}\} \\
\text{St}_1 &\rightarrow \{\text{St}_4, \text{St}_5\} \\
\text{St}_2 &\rightarrow \{\text{St}_5, \text{St}_9\} \\
\text{St}_4 &\rightarrow \{\text{St}_8\} \\
\text{St}_5 &\rightarrow \{\text{St}_9, \text{St}_8\} \\
\text{St}_8 &\rightarrow \{\text{FP}\} \\
\text{St}_9 &\rightarrow \{\text{St}_{10}\} \\
\text{St}_{10} &\rightarrow \{\text{FP}
\}
\end{aligned}
$$
</div>

#### Edge Costs

<div class="math-block">

$$
\begin{aligned}
\text{SA} &\rightarrow \{(\text{St}_1, 10), (\text{St}_2, 15), (\text{St}_{10}, 20)\} \\
\text{St}_1 &\rightarrow \{(\text{St}_4, 69), (\text{St}_5, 17)\} \\
\text{St}_2 &\rightarrow \{(\text{St}_5, 17), (\text{St}_9, 25)\} \\
\text{St}_5 &\rightarrow \{(\text{St}_8, 73), (\text{St}_9, 25)\} \\
\text{St}_8 &\rightarrow \{(\text{FP}, 73)\} \\
\text{St}_9 &\rightarrow \{(\text{St}_{10}, 20)\} \\
\text{St}_{10} &\rightarrow \{(\text{FP}, 80)\}
\end{aligned}
$$
</div>

---

### Step-by-Step Execution

**Iteration 1: Expand SA**

We calculate F for each direct neighbor of SA:
<div class="math-block">

$$F(\text{St}_1) = g(\text{St}_1) + h(\text{St}_1) = 10 + 7 = 17$$
$$F(\text{St}_2) = g(\text{St}_2) + h(\text{St}_2) = 15 + 5 = 20$$
$$F(\text{St}_{10}) = g(\text{St}_{10}) + h(\text{St}_{10}) = 20 + 80 = 100$$
</div>

- **Open List:** $$\text{\{ SA }\} \rightarrow \{(\text{St}_1, 17), (\text{St}_2, 20), (\text{St}_{10}, 100)\}$$
- **Closed List:** $$\text{\{SA}\} $$

SA enters the closed list with cost 0 — it is the starting point. The lowest F is St₁, so we expand it next.

**Iteration 2: Expand St₁**
<div class="math-block">

$$g(\text{St}_4) = g(\text{St}_1) + \text{edge}(\text{St}_1 \to \text{St}_4) = 10 + 69 = 79 \quad \Rightarrow \quad F = 79 + 10 = 89$$
$$g(\text{St}_5) = g(\text{St}_1) + \text{edge}(\text{St}_1 \to \text{St}_5) = 10 + 17 = 27 \quad \Rightarrow \quad F = 27 + 22 = 49$$
</div>

- **Open List:** $$(\text{St}_2, 20), (\text{St}_5, 49), (\text{St}_4, 89), (\text{St}_{10}, 100)$$
- **Closed List:** $$ \text{\{ SA, St₁ }\}$$

The lowest F is now St₂.

**Iteration 3: Expand St₂**
<div class="math-block">

$$g(\text{St}_5) \text{ via St}_2 = 15 + 17 = 32 \quad \Rightarrow \quad F = 32 + 22 = 54$$
</div>

St₅ already exists in the open list with $g = 27$ ($F = 49$). Since $27 < 32$, we keep 49.
<div class="math-block">

$$g(\text{St}_9) = 15 + 25 = 40 \quad \Rightarrow \quad F = 40 + 5 = 45$$
</div>

- **Open List:** $$\{(\text{St}_9, 45), (\text{St}_5, 49), (\text{St}_4, 89), (\text{St}_{10}, 100)\}$$
- **Closed List:** $$\text{\{ SA, St₁, St₂ }\}$$

The lowest F is now St₉.

**Iteration 4: Expand St₉**
<div class="math-block">

$$g(\text{St}_{10}) \text{ via St}_9 = 40 + 20 = 60 \quad \Rightarrow \quad F = 60 + 80 = 140$$
</div>

St₁₀ already exists in the open list with $g = 20$ ($F = 100$). Since $20 < 60$, we keep 100.

- **Open List:** $$\{(\text{St}_5, 49), (\text{St}_4, 89), (\text{St}_{10}, 100)\}$$
- **Closed List:** $$\text{\{ SA, St₁, St₂, St₉ }\}$$

The lowest F is now St₅.

**Iteration 5: Expand St₅**

St₉ is already in the closed list → we ignore it.
<div class="math-block">

$$g(\text{St}_8) = g(\text{St}_5) + \text{edge}(\text{St}_5 \to \text{St}_8) = 27 + 73 = 100 \quad \Rightarrow \quad F = 100 + 33 = 133$$
</div>

- **Open List:** $$\{(\text{St}_4, 89), (\text{St}_{10}, 100), (\text{St}_8, 133)\}$$
- **Closed List:** $$\text{\{ SA, St₁, St₂, St₉, St₅ }\}$$

The lowest F is now St₄.

**Iteration 6: Expand St₄**
<div class="math-block">

$$g(\text{St}_8) \text{ via St}_4 = 79 + 73 = 152 \quad \Rightarrow \quad F = 152 + 33 = 185$$
</div>

St₈ already exists in the open list with $g = 100$ ($F = 133$). Since $100 < 152$, we keep 133.

- **Open List:** $$\{(\text{St}_{10}, 100), (\text{St}_8, 133)\}$$
- **Closed List:** $$\text{\{ SA, St₁, St₂, St₉, St₅, St₄ }\}$$

The lowest F is now St₁₀.

**Iteration 7: Expand St₁₀**

We use the best known g of St₁₀, which is $g = 20$ (direct path SA → St₁₀).
<div class="math-block">

$$g(\text{FP}) = g(\text{St}_{10}) + \text{edge}(\text{St}_{10} \to \text{FP}) = 20 + 80 = 100$$
$$h(\text{FP}) = 0$$
$$F(\text{FP}) = 100 + 0 = 100$$
</div>

- **Open List:** $$\{(\text{St}_8, 133), (\text{FP}, 100)\}$$
- **Closed List:** $$\text{\{ SA, St₁, St₂, St₉, St₅, St₄, St₁₀ }\}$$

**Iteration 8: Expand FP**

FP is the destination. The algorithm terminates.

- **Closed List:** $$\text{\{ SA, St₁, St₂, St₉, St₅, St₄, St₁₀, FP }\}$$

---

### Final Result

By tracing the path backward — from FP to SA, following each node through its predecessor with lowest $g$ — we obtain the optimal route:
<div class="math-block">

$$\text{SA} \to \text{St}_{10} \to \text{FP}$$
</div>

**Total actual cost (g): 100**

What happened to the other paths?
<div class="math-block">

- $\text{SA} \to \text{St}_2 \to \text{St}_9 \to \text{St}_{10} \to \text{FP}$ would have cost $15 + 25 + 20 + 80 = 140$
- $\text{SA} \to \text{St}_1 \to \text{St}_5 \to \text{St}_8 \to \text{FP}$ would have cost $10 + 17 + 73 + 73 = 173$
- $\text{SA} \to \text{St}_2 \to \text{St}_5 \to \text{St}_8 \to \text{FP}$ would have cost $15 + 17 + 73 + 73 = 178$
</div>

Therefore, even though the heuristic of St₁₀ is high ($h = 80$) — which caused it to be deprioritized initially — the algorithm did not discard it. It remained in the open list and, when its turn came, revealed the cheapest path.

This perfectly illustrates the intelligence of A*: the heuristic guides the search, but the actual accumulated cost ($g$) is always considered, guaranteeing that the optimal path is found.

<span class="destaque-bloco">
**Important Note:** The heuristic is not added to the final cost of the solution. It only composes the function $f(n) = g(n) + h(n)$, which is used to prioritize the expansion of nodes during the search. The actual cost of the route is given exclusively by $g$.
</span>

You can follow the journey on the Graph below:
 
 <figure class="artigo-figura">
 <img src="{{ site.baseurl }}/files/articles/mathematics-A-star/graph-A-star.png" alt="A* Graph">
   <figcaption>Figure 1 — The image represents a graph of the best path according to A*..</figcaption>
 </figure>
 
---

### The A* Algorithm in Pseudocode

<div class="math-block">

$$\text{For each node } n:$$
$$g(n) = \text{lowest accumulated cost known up to } n$$
$$f(n) = g(n) + h(n)$$
$$\text{Always expand: } n^* = \arg\min_{n \in \text{OPEN}} f(n)$$

</div>

This is exactly the logic applied in the process.

---

### Heuristic Quality and Algorithm Performance

The heuristic (h) plays a fundamental role in the algorithm's performance, as it guides the search toward the objective. However, A* does not depend exclusively on it to function correctly:

- **If $h(n) = 0$ for all nodes:** A* reduces to Dijkstra's algorithm, still guaranteeing the optimal path, but with greater computational cost.

- **If the heuristic is admissible** (never overestimates the actual cost): A* maintains optimality.

- **If it is inconsistent or overestimates:** The algorithm may lose the guarantee of finding the best path.

Therefore, the heuristic does not define how the algorithm works, but rather its efficiency.

---

### Computational Complexity

The complexity of A* in the worst case is:

<div class="math-block">

$$O(b^d)$$

</div>

Where:

- **b** = branching factor (average number of neighbors per node)
- **d** = depth of the solution

This means the growth is exponential with respect to depth. Although the branching factor directly impacts the number of nodes explored, depth has the most critical effect on total growth, since the number of nodes grows approximately as:
<div class="math-block">

$$b^0 + b^1 + b^2 + \ldots + b^d$$
</div>

In other words, the cost is dominated by the deepest levels of the tree.

---

### Conclusion

The A* algorithm represents a significant evolution in pathfinding. It combines the proven principles of Dijkstra's algorithm with the intelligent guidance of heuristics, creating a method that is both optimal and efficient. The algorithm's brilliance lies in its ability to balance two competing objectives: exploring the most promising paths (guided by the heuristic) while never discarding potentially optimal solutions (maintained by the actual cost).

In practical applications like GPS navigation, game artificial intelligence, and robotics, A* finds the best route not by examining all possibilities, but by making informed local decisions that, collectively, guarantee the global optimum. The bus driver leaving Santa Amélia will follow Street 10 directly to Florianópolis, bypassing congested streets entirely.

Every time a video game character finds the quickest path to their destination, every time a drone calculates the most efficient flight path, every time a logistics company optimizes delivery routes — the mathematics of A* is working behind the scenes, proving that a good heuristic combined with rigorous cost accounting produces excellence in problem-solving.

## Author's Note

<div class="nota-autor">
The example presented is purely illustrative and has been partially simplified to improve readability and comprehension. While many resources rely on tables and graphical representations, this article intentionally emphasizes a mathematical approach to highlight the underlying logic of the algorithm.
For a deeper understanding, it is recommended to complement this reading with other materials on the subject. The goal is not only to understand how a path is found, but why each decision is made, and how cost and estimation guide the process.

This is not intended to be a formal paper, nor an exhaustive treatment of the subject, but rather a focused explanation designed to support conceptual understanding. Additional details can be found in the references below.
This article is maintained as a living document and may be updated over time to improve clarity, accuracy, and completeness. Verified issues or inconsistencies can be reported for correction in future revisions.
</div>
