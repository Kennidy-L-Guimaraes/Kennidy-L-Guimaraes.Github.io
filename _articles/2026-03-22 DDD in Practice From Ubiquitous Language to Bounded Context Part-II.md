---
layout: article
title: "DDD in Practice: From Ubiquitous Language to Bounded Context - Part II"
subtitle: "Serie: Domain-Driven Design: From Problem to Code. How naming things right — and in the right place — shapes the entire architecture"
date: 2026-03-23
author: "Kennidy L. Guimarães"
categories: [software-architecture, domain-driven-design]
series: "ddd-in-practice"
series_part: 2
references:
  - "Evans, E. (2003). Domain-Driven Design: Tackling Complexity in the Heart of Software. Addison-Wesley. https://www.domainlanguage.com/ddd/"
  - "Fowler, M. Ubiquitous Language. martinfowler.com. https://martinfowler.com/bliki/UbiquitousLanguage.html"
  - "Fowler, M. Bounded Context. martinfowler.com. https://martinfowler.com/bliki/BoundedContext.html"
related:
  - title: "DDD in Practice: from problem to model - Part I"
    category: "Software Architecture"
    date: "2026"
    url: "#"
  - title: "DDD in Practice: Modeling Entities and Value Objects - Part III"
    category: "Software Architecture"
    date: "2026"
    url: "#"
---

In the previous article, we covered several topics at once and understood why modeling a system is truly necessary — and where that need comes from. Before building, we must understand the reason for building. Now, before we type a single line of code, there is something crucial to DDD we need to grasp — something that is not exclusive to DDD, but central to Clean Architecture as a whole. It is grounded in Clean Code and in the KISS principle (Keep It Simple, Stupid). I am referring to the **Ubiquitous Language** — and make no mistake: this is not difficult.

---

### Ubiquitous Language

For many developers, writing compact, low-verbosity code that looks technically sophisticated is second nature — and many genuinely believe that the less verbose an object is, the better the programmer who wrote it. That reasoning is, to put it mildly, mistaken — and it runs against the spirit of Clean Code. Nothing is harder to maintain than a function so lean it sounds purely technical and communicates nothing beyond its own existence.

Writing good code does not require making it more complex than it already is. **Ubiquitous Language** addresses exactly this: bridging the language of the code with the language of the business. Even if names become longer, the goal is not brevity — it is comprehension, shared across the entire team, so that even a non-technical stakeholder reading the code can follow what is happening.

<span class="destaque-bloco">
"By using a model-based language pervasively and not being satisfied until it flows, we approach a model that is complete and comprehensible, composed of simple elements that combine to express complex ideas." — Eric Evans [[1]](#ref-1)
</span>

Consider the example below. You may not know C# syntax, but the code is readable even to developers working in other languages:

```csharp
// Abbreviated — not ubiquitous
ObjPiz p = svc.getMtdPiz(id);
p.setFlgPrt(true);

// Ubiquitous Language
ReadyPizza pizza = kitchen.FetchReadyPizza(orderId);
pizza.Pack();
```

Or, without any comments, still perfectly understandable:

```csharp
// Not ubiquitous
if (ord.getSts() == 2 && ord.getItms().size() > 0) {
    prcSvc.exec(ord.getId());
}

// Ubiquitous Language
if (order.IsConfirmed() && order.HasItems()) {
    kitchen.StartPreparation(order);
}
```

Ubiquitous Language has several layers that go beyond simply naming things well. It must be alive, aligned with the shared vocabulary of the environment, and faithful to the business rules. Domain events are a clear illustration of this:

```csharp
// Technical — not ubiquitous
StatusChangedEvent
RecordUpdatedEvent
DataProcessedEvent

// Ubiquitous Language
OrderConfirmed
PaymentDeclined
DeliveryCompletedSuccessfully
PizzaOutForDelivery
```

The code tells a story — it reads almost like a book. This makes it far easier to understand complex systems and their underlying logic:

```
Factory.PreparingOrder(ReceivesTheOrder) → Returns OrderReady
```

At times, it becomes necessary to refactor the Ubiquitous Language itself to keep it more precise [[2]](#ref-2):

```
Factory.PreparingPizza(ReceivesTheOrder) → Returns PizzaReady
```

Which makes it even more readable and faithful to the domain.

---

### What Can Be Said About Ubiquitous Language in DDD

**I.** Ubiquitous Language is the business language translated into code.

**II.** APIs, dependencies, and all parts of the system must speak the same language (with the exception of infrastructure — databases and similar components).

**III.** It is a living language — one that can and should be refactored to stay current and accurate [[2]](#ref-2).

**IV.** If someone unfamiliar with the syntax reads the code and understands it, and if collaborators — from management to operations — recognise the verbs being used, then the code is ubiquitous.

---

### A More Refined Example in C\#

Now let us see how this applies to a more complete structure. Observe the two classes below:

```csharp
// Not ubiquitous
public class Obj
{
    public int Id { get; set; }
    public string Nm { get; set; }
    public int Sts { get; set; }
    public List<ObjItem> Itms { get; set; }
    public decimal TtVal { get; set; }
}

// Ubiquitous Language
public class Order
{
    public int Id { get; set; }
    public string CustomerName { get; set; }
    public OrderStatus Status { get; private set; }
    public List<OrderItem> Items { get; private set; }
    public decimal TotalAmount { get; private set; }
}
```

Without any additional comments, you can already tell which of the two translates the business language into code.

---

### Bounded Context

Once the language is defined, we must define the contexts. This is because "Order," in the Kitchen domain, refers to a food preparation request — while in the Fiscal domain, it refers to a billing document. These distinctions must be well-structured, and the contexts properly separated.

Naming things well is the first step, but in larger projects, a name alone is not enough. Imagine a solution with dozens of classes — if both "orders" live in the same place without physical separation, context exists only in the name, not in the structure. Over time, boundaries weaken and one context begins to bleed into the other.

Contexts are often shaped by human culture itself. False cognates are a vivid example: in Portuguese, *cachorro* means dog, and *cachorrinho* means puppy — but in Spanish, *cachorro* refers to any young animal, regardless of species. The same applies to false cognates in English: the word changes, and the context changes with it [[3]](#ref-3).

This is why separation must be reinforced in the very organisation of the code, following the hierarchy of module, package, and context:

```
Module     → represents the main domain
  Package  → groups related functionality
    Context → isolates the rules of that specific context
```

In practice, in C#, this translates into namespaces that carry the context with them. Notice that both classes below are named `Order` — no prefix, no suffix — and yet there is absolutely no ambiguity:

```csharp
namespace Pizzeria.Kitchen.Orders
{
    public class Order
    {
        public RequestedPizza Pizza { get; private set; }
        public OrderStatus Status { get; private set; }

        public void StartPreparation() { ... }
        public void Finalise() { ... }
    }
}

namespace Pizzeria.Fiscal.Orders
{
    public class Order
    {
        public decimal TaxableAmount { get; private set; }
        public string InvoiceKey { get; private set; }

        public void IssueInvoice() { ... }
        public void Cancel() { ... }
    }
}
```

The namespace carries the context:

```
Pizzeria.Kitchen.Orders.Order  → the food preparation order
Pizzeria.Fiscal.Orders.Order   → the fiscal/billing order
```

The name `Order` within each context is clean and pure — it speaks exactly the language of its domain. Anyone working in the Kitchen context will never confuse it with the Fiscal one — and neither will the compiler. Two contexts can share the same class name, and that is not a problem: it is a sign that the contexts are well-defined and independent.

This separation, of course, goes beyond naming. Meetings must follow the same nomenclature — meaning "Order" should never appear alone in a conversation, but rather "Kitchen Order" and "Fiscal Order."

And although it has been implied throughout, it bears stating clearly: all of this depends on documentation. The team lead must document the language with the same rigour applied to documenting the system itself.

A context leak is the shortest path to larger, harder-to-trace problems in the codebase.

---

### The Living Glossary

To prevent context leaks, we use a **Living Glossary**. The word *living* is a direct reference to the refactoring that will inevitably occur — it is common to rename things over time: `Order → PizzaOrder → OtherOrder`. Maintaining a system that records terms and their identities over time is exactly what we need.

The term "Living" is borrowed from the same spirit as Living Documentation: it must be actively maintained, not archived and forgotten.

<pre class="mermaid">
graph LR
    A[Meeting] -->|New term emerges| B[Living Glossary]
    B -->|Term is reviewed| C[Code]
    C -->|Refactoring needed| B
    B -->|Context defined| D[Bounded Context]
</pre>

Below is an example of what this glossary looks like in practice:

| Term | Context | Definition |
|---|---|---|
| Order | Kitchen | Preparation request received, with items and production status |
| Order | Fiscal | Document with taxable value linked to an invoice |
| ReadyPizza | Kitchen | Finished pizza, awaiting packaging and dispatch for delivery |
| DeliveryCompleted | Delivery | Order confirmed as received by the customer |
| Cancellation | General | Order that will not be prepared or delivered, with a recorded reason |

In practice, this document can live in a wiki, in a file alongside the repository, or anywhere the team consults frequently. The format does not matter — the habit does: every time a new term surfaces in a meeting, it enters the glossary before it enters the code.

---

### Conclusion

With that, we have defined the Ubiquitous Language, the Bounded Context, and the Living Glossary. Together, these three elements form the foundation on which a well-structured domain model is built — one that is readable, maintainable, and resilient to the complexity that comes with time.

But what about Entities and Value Objects? That is precisely what we will explore in the next installment: **DDD in Practice: Modeling Entities and Value Objects — Part III**.

## Author's Note
<div class="nota-autor">
As noted in the first article of this series (<em>DDD in Practice: from problem to model — Part I</em>), it is unlikely that a junior developer will take part in choosing the language or attending the meetings that define the project's scope. In that case, it is genuinely important that such a developer reads the project documentation and has at least a working understanding of the language and contexts involved — to avoid the risk of using <code>OrderPizza</code> inside a <code>Pizza</code> class and ending up writing something like <code>Pizza.OrderPizza(Pizza)</code>, creating a small but telling monster. Instead, the developer should understand the full scope first, and only after the contexts are isolated, write good implementations such as <code>Pizza.Order(NewPizza)</code>. Much of what is described here — including the code examples — illustrates both what to do and what to avoid when writing good code, even though all context depends entirely on each company and each system. DDD is not a mandatory imposed standard, and that is reflected in the fact that your organisation may occasionally choose to adopt a partial DDD approach.
</div>