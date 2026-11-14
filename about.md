---
layout: default
title: About
permalink: /about/
---

<main class="about" markdown="1">

<img class="about-photo" src="{{ site.author.photo | relative_url }}" alt="{{ site.title }}" onerror="this.remove()">

# About

Writer, Software Developer, and CyberOP (Cybersecurity Operations) Researcher. Among my projects are software solutions for machine management, such as **Basileus**, and data encryption, such as **Gladius**, both available as free and open-source software (FLOSS).

## What you will find here

- **Series**, such as *The Network Society*, which walk through a subject in order, from the first concept to the last.
- **Standalone articles** on architecture, algorithms and security.
- **Diagrams** drawn in Mermaid. Click any diagram to enlarge it.

_The articles are written in English. The language switcher at the top translates the page automatically, so the translation may be imperfect._

## Earlier writing

My commentaries, meditations and other older material are on the previous site, [veridarium.com](https://www.veridarium.com){:target="_blank" rel="noopener"}.

## Contact

{% for s in site.socials %}[{{ s.name }}]({{ s.url }}){:target="_blank" rel="noopener"}{% unless forloop.last %} · {% endunless %}{% endfor %}

You can also follow new articles through the [RSS feed]({{ '/feed.xml' | relative_url }}).

</main>