---
layout: article
title: "DDD in Practice: Modeling Entities and Value Objects - Part III"
subtitle: "Serie: Domain-Driven Design: From Problem to Code. Modeling Entities and Value Objects according to context"
date: 2026-05-04
last_modified_at: 2026-05-04
author: "Kennidy L. Guimarães"
categories: [architecture, Domain-Driven-Design]
tags: [systems, Architecture, DDD, Series]
series: "ddd-in-practice"
series_part: 3
image: /assets/img/og/ddd-in-practice-modeling-entities-and-value-objects-part-iii.png
references:
  - "Evans, E. (2003). Domain-Driven Design: Tackling Complexity in the Heart of Software. Addison-Wesley. https://www.domainlanguage.com/ddd/"
  - "Fowler, M. Value Object. martinfowler.com. https://martinfowler.com/bliki/ValueObject.html"
related:
  - title: "DDD in Practice: from problem to model - Part I"
    category: "Software Architecture"
    date: "2026"
    url: "#"
  - title: "DDD in Practice: From Ubiquitous Language to Bounded Context - Part II"
    category: "Software Architecture"
    date: "2026"
    url: "#"
---

In the previous article, we dealt exclusively with Ubiquitous Language and the pain points of a multilingual system — when the goal is the exact opposite: a system where each context speaks the language of its own context. In this article, we will address precisely that. From where we left off, we could observe that an order in our pizzeria's kitchen is a pizza order, and an order in the Fiscal domain is a fiscal document — which are entirely different things.

---

### Modeling Entities and Value Objects According to Context

However, we cannot simply create fields and code classes — that would spiral into chaos within a few months. What we need first is to define where to begin.

We know there are differences between orders, and that these orders are distinct from one another. That distinction truly matters, because it allows us to treat each type differently, respecting the contexts. Otherwise, we would face a cascade of problems, with a thousand distinct orders sharing the same system under similar logic — a recipe for chaos.

To resolve this, we need to isolate the order and understand what constitutes it.

For Pizza, an order is composed of information about the number of Flavors, which must follow a predefined list; order add-ons, such as stuffed crust (very common in Brazil, far less so in Italy); and whether it includes a drink, which must also be subject to a predefined list of beverages.

You may have noticed something: a Pizza order comes with additional validations — the Flavor, for instance, must follow a predefined list. Flavors cannot be mixed freely, like Sardine and Chocolate Pizza. Furthermore, the system still needs to verify whether the ingredients are within their expiry date, and that responsibility belongs to the Pizza order (or rather, to its Value Object), not to the Fiscal Order.

Even so, we cannot pollute our order by throwing everything that is the Pizza order's responsibility into a single class. Assuming that would be the same as assuming that six months from now everyone will still remember which line contains what — so we need to divide.

It is clear to us that the pizza's responsibility belongs to the pizza order, but it should be equally clear that each ingredient must be responsible for itself and for its own expiry. It is as if, when trying to use the cheese, the cheese itself stops you by informing that it is past its expiry date — rather than the `PizzaOrder` class going to check it personally. The `PizzaOrder` class only orchestrates its own scope, and each ingredient orchestrates the smaller scope beneath it.

We can therefore define that the ingredients will be Value Objects, since they follow two fundamental rules.

<span class="destaque-bloco">
"If I have two point objects that represent the cartesian coordinates of (2,3), it makes sense to treat them as equal. Objects that are equal due to the value of their properties, in this case their x and y coordinates, are called value objects." — Martin Fowler [[2]](#ref-2)
</span>

Each object holds a single responsibility. In the case of Flavors, the object returns whether a given Flavor is on the list, whether it is valid, whether a quantity X is available. Each object has its own rules and data validation methods.

This ensures that the Entity object is only responsible for orchestrating the Value Objects, and that the Aggregate object is responsible for coordinating the Entities. It is a hierarchical staircase.

---

### Building the Value Objects

With this in mind, we first need to build our Value Objects — starting with `Flavor`. This object verifies whether the submitted Flavor is available on the list and, assuming that when registering Parmesan Cheese in the database we also register its expiry date, checks whether it is still within that date.

In C#, this would look as follows:

```csharp
public class Flavor
{
    public string Name { get; }
    public DateTime ExpiryDate { get; }

    private static readonly IReadOnlyList<string> AvailableFlavors = new List<string>
    {
        "Margherita", "Calabrese", "Chicken with Catupiry", "Four Cheeses"
    };

    public Flavor(string name, DateTime expiryDate)
    {
        if (!AvailableFlavors.Contains(name))
            throw new ArgumentException($"Flavor '{name}' is not available. Available Flavors: {string.Join(", ", AvailableFlavors)}");

        if (expiryDate < DateTime.Today)
            throw new ArgumentException($"The Flavor '{name}' is past its expiry date.");

        Name = name;
        ExpiryDate = expiryDate;
    }
}
```

This way we do not need to worry about validating inside the Entity, because the `Flavor` object already delivers a ready and reliable value. What remains for the `PizzaOrder` Entity is simply to use it:

```csharp
public class PizzaOrder
{
    public Flavor Flavor { get; }
    public string Drink { get; }
    public int Quantity { get; }

    public PizzaOrder(Flavor flavor, string drink, int quantity)
    {
        Flavor = flavor;
        Drink = drink;
        Quantity = quantity;
    }
}
```

In the previous example I used fixed lists as values, but in DDD we do not use values directly from external layers without first separating the connections. There is local data, such as SQLite, and remote data, such as PostgreSQL, and having that separation across layers limits the confusion and problems that arise from a lack of single responsibility. The structure can follow something like `Database → SQLiteController → SQLiteDatabase` or `Database → SQLController → PostgreSQLDatabase`. Depending on the case, you may have a single DAO class in more legacy systems (Data Access Object).

---

### Applying the Same Principle to Drinks

Continuing, we apply the same principle to Drinks. They must be on a predefined list, or be possible to prepare from a list of fruits registered in the database. These boundaries are what prevent someone from ordering cheese juice or ketchup juice — even if the option does not appear on the menu initially. In programming, we must always account for the curious. The `PizzaOrder` Entity would look like this:

```csharp
public class PizzaOrder
{
    public Flavor Flavor { get; }
    public Drink Drink { get; }
    public int Quantity { get; }

    public PizzaOrder(Flavor flavor, Drink drink, int quantity)
    {
        Flavor = flavor;
        Drink = drink;
        Quantity = quantity;
    }
}
```

A question may arise: can there be objects within a Value Object — objects within objects? Yes, there can. One example is generic exceptions — you may want to avoid writing the same exception repeatedly. Knowing the use case, you can write a base exception that each Value Object adapts as minimally as possible to display to the user or operator. Another example is a formatting class that removes special characters, whitespace, or unintended uppercase letters:

```csharp
public static class Formatter
{
    public static string Normalize(string value) =>
        value?.Trim().ToLower() ?? string.Empty;
}
```

There are many scenarios where this is useful, including but not limited to database classes. In many cases they are referred to as Services, but that is a generic term — Services also designates the return services of an API or other layers. Pay close attention to your own organization's documentation.

---

### Back to the Entity

Now with the Value Objects ready, we can turn our attention to the Entity. Its role is to receive the order coming from the View, through the Aggregate, and then return the completed order. It will work with the following information: Pizza Flavor, Drinks, and Ingredient Removal (for allergy management or consumer preference). We know that Drinks and Pizza Flavor are Value Objects, and that ingredient removal is not the responsibility of the Order, but of the ingredient itself — which must know whether it is included or not. In other words, it is the `Flavor`'s responsibility.

The premise of the code would look like this:

```csharp
public class Flavor
{
    public string Name { get; }
    public DateTime ExpiryDate { get; }
    private readonly List<string> _ingredients;

    public Flavor(string name, DateTime expiryDate, List<string> ingredients)
    {
        Name = name;
        ExpiryDate = expiryDate;
        _ingredients = ingredients ?? new List<string>();
    }

    public Flavor RemoveIngredient(string ingredient)
    {
        var updatedIngredients = new List<string>(_ingredients);
        updatedIngredients.Remove(ingredient);
        return new Flavor(Name, ExpiryDate, updatedIngredients);
    }

    public IReadOnlyList<string> Ingredients => _ingredients.AsReadOnly();
}
```

<span class="destaque-bloco">
 <strong>Note:</strong> Some analogies were used to make the explanation simpler, and will be clarified here. First, Value Objects must be immutable — and that is a rule. Avoid hardcoded values unless the system genuinely requires them. Once instantiated, they must remain pure, as they represent values within the domain and concentrate important validations. Think of them as consistency checkpoints of the system — not in a structural sense, but in the sense of ensuring that the data passing through them is already valid and reliable.
</span>

<span class="destaque-bloco">
 It is clear that in the examples we used hardcoded values to simplify, but in real systems the data comes from external sources, such as a database, generally fed by other systems such as inventory or management. In that scenario, the Value Object remains immutable, but new instances can be created from updated data, without the object itself being altered.
</span>

<span class="destaque-bloco">
 Second, the examples used are basic and intentionally minimal. The full complexity of a DDD-based system was not covered — only the essentials for understanding. In practice, it is common for an Entity to have identity, invariants, and explicit business rules, in addition to frequently working with abstractions such as interfaces, and applying principles such as Dependency Inversion and Dependency Injection.
</span>

---

### What an Entity Should Do — and What It Definitely Should Not

As we have seen, Value Objects handle their own validations, given their nature. But then, what does the Entity do? The Entity is the business rule translated into code. For example, it does not need to concern itself with whether the `Flavor` Value Object is doing its job — that is taken as given. Even so, it needs to place it within the appropriate context, retrieve its value, and, if necessary, handle it — applying the remaining rules on that basis.

It governs not just a single object, but several, applying the necessary conditions. This is because we do not call a Value Object exclusive to a domain directly from the View — that would be a failure in the hierarchy. We call the Entity, which holds the Value Object within its domain, and then pass the data through. (And even the Entity is not called directly in all cases, since its lifecycle is managed by the Aggregate.)

You can therefore understand the flow as follows:

```
Application → Aggregate → Entity → Value Object
```

or

```
Pizzeria Online Form → Order → PizzaOrder → Flavor
```

Consequently, an Entity must not be an orchestrator of other Entities outside its own scope — that would be assuming the role of the Aggregate. It must not validate everything internally, taking on full responsibility — that would make it play the role of a Value Object. And it must not take on more than one responsibility, such as "validating the Pizza Order and the user's address" — that would take it outside its scope and turn it into a catch-all class. Before long, you would find delivery code buried inside the Pizza Order, lost among the Flavors.

With that, we can clearly define what an Entity should do and what it should not: it is not the orchestrator of other domains, only of its own; it does not orchestrate any Value Objects outside those defined within its context; and it does not "skip the queue" — it is always accessed through the Aggregate or a Factory.

---

### Conclusion

We saw in the first article of this series (*DDD in Practice: From Problem to Model — Part I*), through a pizzeria example, how DDD works in general and what problem it aims to solve: inadequate domain modeling, which frequently leads to high coupling and excessive dependency between classes and objects. The example may have been quite textual for some readers, but it serves as a consolidation exercise. For instance, we understood that an Aggregate is responsible for ensuring the consistency of a set of objects within a context, controlling its root and coordinating its interactions, and that an Entity is defined by its identity within a context. This allowed us to visualize the system as a whole — much like a Bounded Context alignment meeting.

In the second article (*DDD in Practice: From Ubiquitous Language to Bounded Context — Part II*), we understood what Ubiquitous Language is and what Bounded Contexts truly are, as well as how to separate them properly — making use of certain unspoken but frequently observed rules in practice, such as: if you think your class is overloaded, it is because it has been overloaded for long enough.

In this third article (*DDD in Practice: Modeling Entities and Value Objects — Part III*), we followed how to create Entities, what they do and what they do not do, what Value Objects are, and how to structure each one according to its responsibility.

I also want to make clear that what has been presented here should not be treated as absolute truth. In development, a "truth" can be absolute within a company for as long as that context and those rules are maintained. However, upon changing companies or projects, you will find that those same rules do not always apply in the same way. Therefore, use these concepts with care: avoid both ignoring them and making them overly rigid. Not every piece of software benefits from DDD; some require a leaner and more pragmatic approach.
