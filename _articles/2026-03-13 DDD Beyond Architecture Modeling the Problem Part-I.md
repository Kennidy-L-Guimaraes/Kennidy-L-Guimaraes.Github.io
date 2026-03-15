---
layout: article
title: "DDD in practice: from problem to model - Part I"
subtitle: "Serie: Domain-Driven Design: From Problem to Code. Why domain modeling matters more than the pattern itself"
date: 2026-03-13
author: "Kennidy L. Guimarães"
categories: [software-architecture, domain-driven-design]
series: "ddd-in-practice"
series_part: 1
references:
  - "Evans, E. (2003). Domain-Driven Design: Tackling Complexity in the Heart of Software. Addison-Wesley. https://www.domainlanguage.com/ddd/"
  - "Vernon, V. (2013). Implementing Domain-Driven Design. Addison-Wesley. https://vaughnvernon.com/"
  - "Martin, R. C. (2008). Clean Code: A Handbook of Agile Software Craftsmanship. Prentice Hall."
  - "Fowler, M. (2002). Patterns of Enterprise Application Architecture. Addison-Wesley. https://martinfowler.com/eaaCatalog/"
  - "Newman, S. (2015). Building Microservices. O'Reilly Media. https://www.oreilly.com/library/view/building-microservices/9781491950340/"
related:
  - title: "DDD in Practice: Modeling the Real System"
    category: "Software Architecture"
    date: "2026"
    url: "#"
---

Harder than implementing a healthy software architecture is *not* implementing one. That is the kind of problem that surfaces after months of work: the system that ran fine yesterday starts throwing errors and everything grinds to a halt. The problem extends beyond the technical — it strikes the financial health of the company, especially when critical services are involved. And nearly every service is critical. [[1]](#ref-1)

---

### Critical Projects: For Whom, Why, and the Language of the Business

Imagine you were hired to build software for a restaurant. You can do it in a way that lasts, or this could be your first and last job for "Laggio Pizzeria." The place sells dozens of distinct flavors, sources ingredients from multiple suppliers, offers discounts for regulars and staff, and operates under a set of tax rules that can land them in serious trouble if data is entered incorrectly. [[2]](#ref-2)

Yes, even a pizzeria's software is a critical system. Maybe not to you — but certainly to the owner and manager of that chain.

Before you open your code editor and start building a heavily procedural system — I say that from personal experience with procedural software I wrote in the past — you need to sit down with the manager, the accountant, or the domain lead: the person responsible for coordinating the pizzeria's internal operations. This is the first and most important step, because it is where you begin to understand the system and the domains of DDD.

<span class="destaque-bloco">
"The heart of software is its ability to solve domain-related problems for its user." — Eric Evans, Domain-Driven Design (2003)
</span>

---

### Identifying a Domain

In this example, the pizzeria will have at least two domains (there are actually more, but let's keep it to that number). The first is the fiscal domain, because it is the most critical part. Understanding the tax rules is what keeps the system viable — no company will use software that handles taxes incorrectly. This area deserves special attention. [[1]](#ref-1)

We extract a domain like this: Laggio Pizzeria sells pizzas, pays taxes, has internal discounts, and issues a receipt for every customer and every supplier. It makes the pizzas based on what the customer ordered through an online form. The kitchen receives an order informing it only of what was requested — with no mention of payment method. That is not the kitchen's responsibility, and it is good that they do not know about it. Payment is the billing system's responsibility.

The pizza begins to be made according to what the customer ordered. Here we are talking about the fiscal domain — which covers billing and discounts — and the Kitchen domain. We are separating by responsibility, and that is what domain separation means. But understand this: a domain is a distinction between layers. The separation is not made exclusively on responsibilities, but on the layers of business rules. The kitchen is a layer because it is essential to the business and has multiple sub-layers, which I will explain further ahead.

**The cook is not the cashier, and the cashier is not the cook.**

In DDD, we call this separation a **Bounded Context**. Each context has its own rules and clear responsibilities. [[1]](#ref-1)

Can you imagine how chaotic it would be if the accountant had to drop their spreadsheets to go bake pizzas? Do not do that in your software either.

So we have the Kitchen domain and the Fiscal domain. Now what?

---

### Entities and Responsibilities

Now that we understand the pizza's journey from order to payment, we can define the entities in each domain. Think about the kitchen domain: it needs to be orchestrated by rules, with a head chef and cooks ready to make the best pizza your palate has ever tasted.  [[2]](#ref-2)

A common mistake is treating an entity as a step. Notice: the pizza does not leave the head chef and pass through the other cooks — it is orchestrated by the head chef and then prepared by the rest. It is a subtle difference in thinking, but it makes all the difference.

**The domain is the area. Entities are the pieces within that area.**

In our kitchen, there is an oven for baking pizzas, a dough freezer, a cook responsible for seasonings, and, of course, the head chef.

When an order is received, one entity is responsible for verifying its details. That entity, and that entity alone, is responsible for saying whether the order is empty or contains something absurd — like an infinite quantity of pizzas. If something goes wrong, the system knows who to hold accountable.

The order then moves to the ingredient and seasoning cook, who can invalidate it if the necessary ingredients are not available.

See? That is another entity acting under its own rules.

The order manager cannot cancel the pizza because of missing ingredients — they should not even know whether ingredients are missing. They cancel for absurdities or for empty orders. And the ingredient cook does not need to worry about empty or absurd orders, because a prior entity already checked for that.

These are entities: they have their own rules and responsibilities limited to their own scope. The ingredient cook should not be collecting orders — that is not their responsibility.

---

### Value Objects: Every Object Has Its Own Rule and Validation

Knowing that ingredients are available, the ingredient cook still needs to verify the quality of each one — after all, the ingredients are their responsibility. Here we see that each ingredient can have its own rules, different from the rules of the entity that manages it. [[3]](#ref-3)

For example: we have doughs, and each dough has an expiration date. Some are sweet and others savory. Therefore, a sweet dough should not contain ingredients from a savory one.

In this case, each kitchen object has its own rules. Those rules should not be the ingredient cook's concern. The cook still holds the responsibilities of their role, but since each object has its own values and rules, the objects themselves must validate themselves.

This is what we call **Value Objects**: objects without their own identity, defined by their values, and responsible for their own rules. [[1]](#ref-1)

The ingredient cook's role is to orchestrate that analysis, ensuring all products are compatible with each other. They can take a product and check its rule, but they cannot change it — a product's rules can only be modified by the product itself. They must not leak out of their scope.

If everything checks out, the order is forwarded to the next unit: the head chef.

---

### Aggregates: The Entity Orchestrator

The head chef is the one who can say whether an order can or cannot be fulfilled — not for lack of ingredients, but based on whether the entities under their coordination have the capacity to do so.

This is what we call an **Aggregate**. It coordinates multiple entities and can reject an order only if one of the entities it contains is unable to fulfill its part. [[1]](#ref-1)

In practice, it does not validate state directly — it only coordinates other entities. That is what sets it apart from a regular entity.

For example: the head chef coordinates both the ingredient cook and the line cook. They manage everyone but cannot modify the rules established in contract with the other entities. So an empty order is still rejected by the order manager and never reaches the head chef. But if an order arrives without going through the ingredient cook, the head chef prevents it from moving forward to production. They ensure everyone does their part, without changing the kitchen's rules. If everything checks out, the order is finally forwarded to production.

---

### Factory: Where Everything Is Made

The Factory is the only place where the pizza is truly made — where flavors are combined, the dough is baked, and the entire process takes place, potentially involving different entities and, sometimes, different domains. [[2]](#ref-2)

If you have been paying attention, you noticed this: the order is received by the order manager, but the Factory has no access to it. It does not even know the order manager exists or what role they play. It trusts the head chef entirely and receives from them, and only from them, what needs to be done — meaning the order only reaches the Factory after all validations have been completed.

The result is converted into a finished Pizza. In software terms, it returns the object ready and validated.

It is worth noting that the Factory must operate under contracts. This implies safety and guarantees quality: every pizza will be baked at temperature X, for time Y, and delivered in a box. That must be mandatory, preventing a raw or incomplete pizza from being sent out.

---

### Repository: Where the Result Is Stored

When the pizza is ready, it is sent to the counter, still without a price tag. For now, only the system knows what is in that box. There is no label — just a pizza in a box.

The Repository is not responsible for validating anything, and that is important to affirm: it trusts that the Factory always delivers everything ready. Its only job is to store the object.

In programming, the Repository is an intermediary layer between the data persistence layer — but not the database itself — and the application layer. It lets you modularize data access, allowing for a quick and clean swap of databases when needed. [[4]](#ref-4)

It is important to note that each domain can have its own Repository, with its own persistence responsibility. The Kitchen's Repository does not know the Fiscal Repository, and it does not need to. Each one answers only for what is its own.

You can picture that relationship like this:

<pre class="mermaid">
flowchart TD

subgraph KITCHEN_DOMAIN["Kitchen Domain"]

OP["ProductionOrder
Aggregate Root"]

OV["OrderValidator
Entity"]

IM["IngredientManager
Entity"]

PF["PizzaFactory"]

VO1["Dough
Value Object"]
VO2["Ingredient
Value Object"]
VO3["OvenTemperature
Value Object"]

REP["KitchenOrderRepository"]

OP --> OV
OV --> IM
IM --> PF

IM --> VO1
IM --> VO2

PF --> VO3

PF --> REP

end
</pre>

That wraps up the Kitchen domain — but we are not done.

Now it is the Fiscal domain's turn to show its structure.

---

### Consolidating with a Second Domain

The Fiscal domain will receive a box. It does not need to open it and inspect the contents. It only needs to know the quantity of ingredients used and which ones were consumed in each pizza — and, of course, who the customer is.

But here, too, there are entity divisions, and this depends heavily on each country's tax system.

**Entity: Cost Accounting**

The first entity is Cost Accounting. It receives the quantity of ingredients used — dough, onion, tomato, sauce, chicken, cheese, etc. — and, based on that, calculates the cost of each ingredient.

It knows that the pizza's ingredients cost, say, 10.00~USD, and that per contract it was baked for 20 minutes, consuming 0.20~USD in energy. Every value counts here — none is fully negligible. [[3]](#ref-3)

It knows the cost of packaging, a share of the company's profit, the kitchen's commission, and so on. It is the entity that manages the values.

And remember: some values have their own rules, such as an average of a spent value. Sometimes an absolute value cannot be calculated, and depending on the scenario, a maximum or minimum must be imposed. That is also a Value Object, as described earlier.

With the total value calculated — say, $17.60 — it is forwarded to the next entity.

**Entity: Tax Calculator**

This is the agent responsible for applying the pizzeria's tax rules. It can add 5% if the pizza uses imported onions, or apply a 2% discount if the pizzeria uses locally grown tomatoes.

Important: it does not apply promotional discounts. Think of this domain literally as a tax auditor. It does not set promotions, but it can apply reductions according to fiscal rules. [[1]](#ref-1)

And that is exactly what separates the entities: not just the macro responsibility, but the layers of rules each one must apply. If it were only about responsibility, the entire Fiscal Domain would be a single entity, since the general responsibility is pricing. Think in terms of *responsible layers*.

With the pizza's final values calculated with taxes applied, we forward to the next entity.

**Entity: Promotions**

This entity is very important. It does not need to know what the pizza is made of, unless the promotion is based on flavor rather than loyalty.

In our case, the pizzeria rewards loyalty. So the only information it needs is the purchase count and the customer's name.

It is the one that determines what discount to grant. For example: it can query the database and check the customer's name and how many times they purchased that week. That access is made through the Fiscal domain's Repository — just as the Kitchen has its own, the Fiscal domain has its own, without either needing to know the other. [[4]](#ref-4)

Whether the pizza was sweet or savory does not matter here. The Promotions entity has no way of knowing, because prior entities limit what reaches it. It only needs those two pieces of information to approve or deny a discount.

---

### Aggregate and Aggregate Root

All those fiscal entities also need to be coordinated. The fiscal manager is responsible for that, orchestrating the steps — for instance, refusing an order if any entity is not operational, such as the tax calculation service.

So we have two coordinators: the Head Chef and the Fiscal Manager. Both are Aggregates. But they also need to answer to a higher instance.

If you thought of the pizzeria owner, you are mistaken. That is linear human thinking, and software does not care about org charts.

The real question is: who can encapsulate all the rules necessary for an order to exist validly within the system?

**The Order.**

It functions as an **Aggregate Root**. It encapsulates all the rules necessary for an order to exist validly within the system, ensuring consistency across the items, the discounts, and the final total. [[1]](#ref-1)

You can picture that relationship like this:

<pre class="mermaid">
flowchart TD

subgraph FISCAL_DOMAIN["Fiscal Domain"]

INV["Invoice
Aggregate Root"]

CC["CostCalculator
Entity"]

TC["TaxCalculator
Entity"]

PC["PromotionCalculator
Entity"]

VO1["Price
Value Object"]
VO2["TaxRate
Value Object"]
VO3["Discount
Value Object"]

REP["InvoiceRepository"]

INV --> CC
CC --> TC
TC --> PC

CC --> VO1
TC --> VO2
PC --> VO3

PC --> REP

end
</pre>

Note that some engineering details were left lightly explored, and others were deliberately set aside. The goal of this example was not to present a complete implementation of Domain-Driven Design, but to understand the type of problem that gave rise to this approach, so it can be expressed more faithfully.

Here is a simplified view of both domains and entities in the Pizzeria:

<pre class="mermaid">
flowchart LR

subgraph KITCHEN_CONTEXT["Bounded Context: Kitchen"]

PK["ProductionOrder<br>Aggregate Root"]

PF["PizzaFactory"]

EVENT1["PizzaProduced<br>Domain Event"]

PK --> PF
PF --> EVENT1

end


subgraph FISCAL_CONTEXT["Bounded Context: Fiscal"]

INV["Invoice<br>Aggregate Root"]

CC["CostCalculator"]

TC["TaxCalculator"]

PC["PromotionCalculator"]

EVENT2["PriceCalculated<br>Domain Event"]

INV --> CC
CC --> TC
TC --> PC
PC --> EVENT2

end


EVENT1 -->INV
</pre>

---

### DDD: What It Is Not, and What It Is

Throughout this article, we identified the main building blocks that form a DDD-modeled system: [[1]](#ref-1) &  [[2]](#ref-2)

**Bounded Context** — the separation between domains by layers of business rules.

**Entity** — an object with its own identity and responsibilities limited to its own scope.

**Value Object** — an object without identity, defined by its values, and responsible for its own rules.

**Aggregate** — an entity orchestrator that ensures all entities fulfill their part without altering their rules.

**Aggregate Root** — the highest-level instance that encapsulates the rules necessary for the order to exist validly.

**Factory** — where the object is truly produced, always valid by contract.

**Repository** — the intermediary persistence layer; each domain with its own, each one responsible for its own data access.

DDD is not an inflexible rule, nor an isolated architecture. It can be applied in different architectural styles — MVC, layered architectures, or even simpler systems. [[5]](#ref-5)

Generic and reusable components remain useful. Common validations, data normalization, and other technical responsibilities can be implemented in shared structures, avoiding rework and code repetition without compromising domain modeling.

In real development, however, applying DDD is not trivial, especially for junior developers. In many cases, the importance of this approach only becomes clear after working with tightly coupled legacy systems — organized around interface events or incoherent structures where business rules are scattered across the codebase.

Beyond that, with rare exceptions, early-career developers rarely participate directly in discussions about business rules with managers, investors, or specialists in areas like tax and legal. This is largely a matter of trust and professional maturity.

And yet it is precisely in that dialogue between domain experts and developers that DDD finds its true value. Even an apparently simple system — like a pizzeria's — can be extremely critical to a business's operation.

An unhandled error, a poorly modeled entity, or a misapplied tax rule can result in systems going down during peak demand, incorrectly calculated taxes, or promotions applied the wrong way.  [[3]](#ref-3)

In more complex scenarios, integrations with other systems can also introduce inconsistencies into the domain model. In those cases, structures like **Anti-Corruption Layers** become important for protecting the core domain against external rules or structures that could compromise its consistency. [[5]](#ref-5)

<span class="destaque-bloco">
Thinking the domain is only half the work. The other half is preventing the code from destroying the model.
</span>

---

### Conclusion

In this article we walked through the core building blocks of DDD — Bounded Context, Entity, Value Object, Aggregate, Aggregate Root, Factory, and Repository — not as abstract patterns, but as natural solutions to the real problems a software system faces when it needs to model a business domain faithfully.

The analogy of the pizzeria served to show that even an apparently simple system demands careful separation of responsibilities, clearly scoped rules, and a model that resists the chaos of growth.

In **Part II: Modeling the Real System**, we will step down one level and translate this mental map into actual engineering — where these ideas finally take shape in code.