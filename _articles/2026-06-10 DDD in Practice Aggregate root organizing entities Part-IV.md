---
layout: article
title: "DDD in Practice: Aggregate Root Organizing Entities - Part IV"
subtitle: "Series: Domain-Driven Design: From Problem to Code. Aggregating Rules and Building Consistency."
slug: ddd-in-practice-aggregate-root-organizing-entities-part-iv
description: "Learn how Aggregate Root controls entities, protects invariants and guarantees consistency in Domain-Driven Design."
date: 2026-06-10
last_modified_at: 2026-06-10
schema:
  type: Article
author: "Kennidy L. Guimarães"
categories: [architecture, Domain-Driven-Design]
tags: [systems, Architecture, DDD, Series]
series: "ddd-in-practice"
series_part: 4
image: /assets/img/og/ddd-in-practice-aggregate-root-organizing-entities-part-iv.png

references:
  evans:
    text: "Evans, E. (2003). Domain-Driven Design: Tackling Complexity in the Heart of Software. Addison-Wesley"
    url: "https://www.domainlanguage.com/ddd/"
  
  fowler:
    text: "Fowler, M. DDD Aggregate. martinfowler.com."
    url: "https://martinfowler.com/bliki/DDD_Aggregate.html"

related:
  - title: "DDD in Practice: from problem to model - Part I"
    category: "Software Architecture"
    date: "2026"
    url: "#"
  - title: "DDD in Practice: From Ubiquitous Language to Bounded Context - Part II"
    category: "Software Architecture"
    date: "2026"
    url: "#"
  - title: "DDD in Practice: Modeling Entities and Value Objects - Part III"
    category: "Software Architecture"
    date: "2026"
    url: "#"
---

{% include ref-tooltips.html references=page.references %}

In the previous article, I explained how Value Objects work, why we should use them, and whether they allow objects within objects; I also explained Entities, which serve to gather the context of Value Objects, take their output, and apply validation rules.

In this article, I will cover the Aggregates responsible for bringing all entities together into a single order and ensuring that the integrity of the whole is respected {% include ref.html id="evans" %} {% include ref.html id="fowler" %}.

In the words of Martin Fowler:
<div class="destaque-bloco">

“An Aggregate is a Domain-Driven Design pattern. A DDD Aggregate is a cluster of domain objects that can be treated as a single unit. An example may be an order and its line items; these will be separate objects, but it is useful to treat the order (together with its line items) as a single Aggregate.”
</div>

---

### Following the Development of the System

Still following the development of the system for Laggio Pizzeria, the customer can now select their order and send it to the kitchen.

A function inside the Flavor Value Object allows control over the selected flavors; the Value Object is managed within the Kitchen entity. The Kitchen entity is defined by the project scope and is responsible for everything related to the kitchen, such as drinks, doughs, flavors, and other elements.

However, an order is not made only from the ingredients in the kitchen, so there will be an entity such as Address and another such as Fiscal, in addition to promotional and bounded-context entities, entities which, although similar to the others, are used for specific rules such as promotions or premium customers.

For this example, we will assume that you already understand how entities work and how Value Objects operate.

### Entity Structure

Thus, we will have the following example:

```text
Entity : ValueObject

Kitchen : Flavor, Drinks, Ingredients
Address : PostalCode, Street
Fiscal  : FlavorValuesAmount
```

Here we are following a simpler and cleaner structure, yet descriptive enough for you to understand.

Each entity will work with values received through its constructors or method calls.

Thus:

```text
Call or Constructor -> Entity -> ValueObject
```

### The Consistency Problem

The main problem that an Aggregate aims to solve lies primarily in maintaining consistency among entities that work together.

For example, when building an order, we would have to create and validate each entity individually. This would not only increase the complexity of the call, but would also open the door to invalid system states.

<div class="nota-autor">

“I am assuming that you actually have a Value Object with proper data handling.”
</div>

Thus, we would have to ensure that everyone working on the same software project received a small cheat sheet explaining how to correctly build the order, which would be both complex and unnecessary.
What we need is to aggregate this entire structure into a single class at once. This way, whenever we call that class, we are working with the entire structure as a single unit.

However, this alone does not guarantee cohesion; it guarantees aggregation.
An Aggregate Root is more than a class containing a collection of entities: it must define the boundaries of the unit and ensure that the rules keeping that unit consistent are respected.

With this, we can create a class that will serve as the Aggregate and will need to enforce the invariants of the whole.

An invariant is basically a rule that must remain true for the aggregate to be considered valid.
A simple example: if the pizza order arrives empty from the View, should it still call the Fiscal entity or the others?

_No._

It should reject the operation, because an order without items does not represent a valid unit within the domain.
The Aggregate is responsible for its state and for the consistency of the objects within it.

### Aggregate Example

Thus, we can create an Aggregate as follows:

```text
class OrderAggregate

    // Entities
    kitchen : KitchenEntity
    address : AddressEntity
    fiscal  : FiscalEntity

    // Constructor
    constructor(orderDTO: OrderDTO)

        if orderDTO is null then
            throw Exception("Order data cannot be empty")
        end if

        this.kitchen = new KitchenEntity(orderDTO.flavors)
        this.address = new AddressEntity(orderDTO.postalCode)
        this.fiscal  = new FiscalEntity(orderDTO.flavorValues)

        this.validateInvariants()

    end constructor

    // Invariant validation — each entity knows its own rules
    method validateInvariants(): boolean

        if not this.kitchen.isValid() then
            throw Exception("Order must have at least one flavor")
        end if

        if not this.address.isValid() then
            throw Exception("Order must have a valid address")
        end if

        if not this.fiscal.isValid() then
            throw Exception("Order must have a valid fiscal value")
        end if

        return true

    end method

    // Output — delegates summary construction to each entity
    method getOrderSummary(): OrderSummaryDTO

        return new OrderSummaryDTO(
            flavors    : this.kitchen.getSummary(),
            postalCode : this.address.getSummary(),
            totalValue : this.fiscal.getSummary()
        )

    end method

end class
```

*Example in pseudocode of an aggregate performing invariant validation.*

It receives the order data through an OrderDTO (Data Transfer Object).

A DTO is a simple way to transfer data from one object to another; it is commonly implemented as a class containing variables that will receive data which the Aggregate or the View can later request.

Each entity implements its own validity rule through the `isValid()` method.

The Aggregate does not need to know the internal structure of any entity. It simply asks whether the entity is valid and reacts to the result.
This preserves the encapsulation of each entity and keeps responsibilities where they belong: the entity knows what makes it valid; the aggregate knows whether the whole can or cannot exist.

Remember: _the aggregate root is, by definition, an object that carries other objects within itself_.

However, its primary responsibility does not lie in the order of calls, but in protecting the rules that keep the aggregate consistent.

The order of creation may vary from one implementation to another, but the invariants must always remain true.

This is the essence of the Aggregate: control over the state of the unit, protection of invariants, and guarantee of consistency among the objects that belong to it.

### What Is the Difference Between an Aggregate and an Aggregate Root?

Many developers often confuse the concepts related to Aggregates.

Always remember this: an aggregate is a concept, and nothing more. It is not a style, but rather the concept of aggregation; in other words, we are saying: let us use these objects together because they only make sense together.

<div class="destaque-bloco">

“We assembled the aggregate root with kitchen, address, and fiscal because it makes sense to work with all of them together in this example. For a small system this is justifiable; however, note this: it only makes sense to keep them within the same aggregate when they operate as a cohesive unit.”
</div>

In theory, an aggregate is an aggregate and therefore always does the same thing: aggregate.
But here lies the distinction.

The Aggregate Root is the entry point of the aggregate.
When we work with an aggregate, we do not access its entities directly; we access the root, and it is the root that controls access and protects the integrity of the unit.

The root allows us to use all resources within the aggregate without losing the cohesion and protection it provides.
The remaining objects belong to the same aggregate, but access occurs through the root, which is responsible for ensuring that the invariants remain valid.

---

### Rules an Aggregate Should Follow

- I. Do Not Depend on the View
Essentially, a good Aggregate is a free Aggregate, one that should never depend directly on the state of the View.
For this, we work with IDs or DTOs; each layer with its own responsibility.

- II. It Must Not Break Its Own Integrity
An Aggregate must not break the scope of its unit.
For example, an order Aggregate should concern itself only with what belongs to the order unit.

- III. No One Should Access Separate Entities Without Going Through the Aggregate
Doing so would, at the very least, break the boundary and allow inconsistent states.

- IV. The First Validation of the Unit Is Performed by the Aggregate
It knows whether an entity should exist within that context.
Thus, we guarantee an intact and previously validated unit.
Naturally, it should not validate the internal values of Value Objects, but rather the integrity of the whole.

- V. If You Are Putting Too Many Entities into an Aggregate, It May Be a Sign That the Boundaries Are Poorly Defined
Not everything that is related necessarily belongs to the same aggregate. The separation between an entity and its aggregate is solely given by the context; it is the context that informs in which aggregate an entity should reside.

- VI. An Aggregate Is Responsible for Itself and for the Objects Within It
In other words: it is either born valid, or it is not born at all.

The rules above assume that invariants are being enforced correctly. It is worth going deeper into what invariants actually are and how they operate within an Aggregate.

---

### Invariants in Depth

Not all rules within a domain are equal. Some rules apply only to a single value — a price 
must not be negative, a quantity must be a whole number. Others apply to the state of the 
whole: a delivered order cannot be cancelled; an order without items cannot proceed to the 
kitchen. These are invariants — rules that must remain true regardless of the operation 
being performed, at any point in the object's lifecycle.

An Aggregate operates across two levels of invariants. The first level belongs to the 
Aggregate itself: rules that govern the consistency of the unit as a whole, such as 
preventing an order from being submitted after the kitchen has closed. The second level 
belongs to the entities within it: each entity knows what makes it valid, and the Aggregate 
trusts that judgment without inspecting internal values directly.

An invariant is always a rule — not an object or an entity. That said, a rule can be 
encapsulated in an object to make it reusable across different Aggregates in the system, 
functioning as a shared module. The rule remains an invariant; the object is simply its 
carrier.


### Conclusion

In this fourth article (*DDD in Practice: Aggregate Root Organizing Entities - Part IV*), we learned the role of Aggregates and the Aggregate Root.

We understood that an aggregate does not exist merely to gather related objects, but primarily to protect domain invariants and ensure the consistency of the unit as a whole.

We also saw how the Aggregate Root acts as the entry point of the aggregate, preventing internal entities from being manipulated directly and ensuring that the whole always remains in a valid state.

As with the previous articles, it is important to remember that the examples presented are educational in purpose and have been simplified to make the concepts easier to understand.

In real systems, aggregates may contain more complex rules, multiple internal entities, domain events, and integrations with other contexts.
The goal here is not to present a definitive implementation, but to provide a solid foundation for understanding how and why Aggregates exist within Domain-Driven Design.

In the next article, we will cover Object Factories and Use Cases, because we will not always use an aggregate for the same purpose; each aggregate may have its own purpose.