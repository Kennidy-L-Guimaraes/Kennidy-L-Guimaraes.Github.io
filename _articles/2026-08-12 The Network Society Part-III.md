---
layout: article
title: "The Network Society: MAC Address, BOOTP and DHCP"
subtitle: "Part III — How the First Network Connection Is Made"
description: "Learn what DHCP is, the successor to BOOTP, and how computers perform their first network communication"
slug: the-network-society-macaddress-bootp-and-dhcp 
date: 2026-08-12
last_modified_at: 2026-08-12
schema:
  type: Article
author: "Kennidy L. Guimarães"
categories: [Network Protocols]
tags: [Network protocols, Internet, DARPA, Networks, Classful, DHCP, BOOTP, DORA, MACADDRESS, Public-IP, Private-IP, NAT, CGNAT, RFC]
image: /assets/img/og/the-network-society-mac-address-bootp-and-dhcp.png
references:
  macaddress: 
    text: "MAC Address Wikipedia: "
    url: "https://pt.wikipedia.org/wiki/Endere%C3%A7o_MAC"
  
  ieee: 
    text: "Guidelines for Use of Extended Unique Identifier (EUI), Organizationally Unique Identifier (OUI), and Company ID (CID)"
    url: "https://standards.ieee.org/wp-content/uploads/import/documents/tutorials/eui.pdf"

  rfc951: 
    text: "RFC 951 BOOTSTRAP PROTOCOL (BOOTP)"
    url: "https://www.rfc-editor.org/rfc/rfc951.html"

    
  rfc2131:
    text: "RFC: 2131 Dynamic Host Configuration Protocol"
    url: "https://www.rfc-editor.org/rfc/rfc2131.html"

  RalphDroms: 
    text: "Ralph Droms"
    url: "https://datatracker.ietf.org/person/rdroms.ietf@gmail.com"

series: "The-Network-Society"
series_part: 3
related:
  - title: "The Network Society: CIDR, NAT and the Collapse of End-to-End"
    category: "Network Protocols"
    date: "2026"
    url: "#"

---

{% include ref-tooltips.html references=page.references %}

In the previous articles, we were able to understand how Anne can send a message, such as an image, to Peter, and how that list of packets travels across multiple backbones that form the internet until it reaches Peter's network.

This is really far from magic, except to those who don't understand it deeply.

But before going further into the infrastructure, we must go back a few steps and climb down the ladder so that we can, at last, answer a question.
For Anne's computer to have an IP on the local network, it must already be identified by the network — but how is that possible without being on the network yet? (Paradoxical)

---

## The MAC Address

That's a fair question, one that was my own doubt for some time as well. What Anne doesn't know is that every computer, when it leaves the factory, comes with a firmware (NIC), a network interface card (something that began with Xerox's work in the mid-1970s). This card exists to provide a connection interface for multiple devices, such as Ethernet, Wi-Fi, and Bluetooth. Although this interface isn't strictly responsible for everything in the connection, it is the one that provides the numbering routers expect: the MAC Address {% include ref.html id="macaddress" %} (Media Access Control address). For a traditional EUI-48 address, the identifier is 48 bits long, commonly represented as 6 bytes {% include ref.html id="ieee" %}. The first 24 bits traditionally identify an IEEE-assigned Organizationally Unique Identifier (OUI), while the remaining 24 bits are assigned within that organization’s address space (this way, the manufacturer can operate over a variation of 24 bits for each piece of hardware).

Generally speaking, having a MAC Address makes your computer unique and also identifiable (a subject for another article). I won't go too deep into the MAC Address question; for that, it's enough to read the primary sources {% include ref.html id="ieee" %}. But assume that your device already left the factory with at least one 48-bit (6-byte) identifier that is unique and allows it to be identified on the network, or on any other network. In fact, the chances of a collision are ridiculously low.

<div class="nota-autor">

A note on spoofed or virtual MACs: <br>
Modern devices can have several MAC addresses that are registered or temporarily used by the device. This is the case with some smartphones that, for security and privacy reasons, use "random" MACs when connecting to certain Wi-Fi networks.

In this case, the network doesn't distinguish between a legitimate MAC and a virtual or spoofed one. To the network, that address is simply a valid MAC being used by a network interface.

MAC Spoofing is a technique that can be performed by software or by the operating system itself, which, in practice, amounts to the same thing as far as network communication is concerned. It consists of changing the value of the MAC used by the interface before frames are transmitted to the network.

This doesn't mean the network card has been physically altered, nor that the address originally assigned by the manufacturer has been erased. The operating system can simply instruct the network interface to use a different address during communication.

It's also important to distinguish a spoofed MAC from a virtual network interface. A virtual interface can have its own MAC address and exist as a logical interface created by the system, by a virtual machine, a bridge, or another virtualization mechanism. Spoofing a MAC, on the other hand, consists specifically of making an interface use an address different from the one it would normally use.

Therefore, a MAC Address shouldn't be understood as a physical, immutable identity of the device. It's an address used to identify an interface in local network communication and, depending on the technology and configuration used, it can be changed, temporarily replaced, or even created by software.

</div>

---

## The First Connection with BOOTP

However, simply having a MAC address doesn't guarantee that a device can participate in an IP network. For that, a protocol capable of providing network configuration information, such as the IP address, is needed. One of the first protocols developed for this purpose was BOOTP (Bootstrap Protocol), created in 1985 by a working group led by Bill Croft {% include ref.html id="rfc951" %}. Although it has now been largely replaced by DHCP, understanding how it works helps us understand the evolution of the latter.

<div class="nota-autor">

A note on Broadcast and Unicast: <br>
Sharing is done via Broadcast, meaning the packet is addressed to all hosts in the network domain simultaneously, and each one receives it at the same time, but only the one that knows how to respond carries out the assignment {% include ref.html id="rfc951" %}. Broadcast is something so fundamental and complex that it deserves an article of its own, and so it goes on the list of articles I might write.
</div>

Generally speaking, when a host starts up, it doesn't yet know its IP address, nor does it know which server can provide one. For that reason, it sends a BOOTREQUEST message via broadcast to the entire local network using the UDP protocol. All devices receive this message, but only a BOOTP server is responsible for processing it and responding with a BOOTREPLY message, containing the configuration information previously registered for that device.

BOOTP relies almost exclusively on a static database maintained by the server. In this database, each MAC address is previously associated with an IP address and other network parameters. Thus, by identifying the client's MAC Address in the BOOTREQUEST message, the server is able to locate the corresponding information and send it to the host, allowing it to start communicating normally on the IP network.

**But what happens when an unknown device tries to use BOOTP?**
For example, a host that hasn't been previously registered on the server but still sends a BOOTREQUEST message via broadcast in an attempt to obtain a network configuration.

The answer is _simple_: essentially nothing happens. Since the server has no association between that MAC address and any previously registered configuration, it can't assign a valid IP address to the client. In practice, the host remains without a functional network configuration and, consequently, can't participate in the IP network.

This is how Anne's computer gets its own identifier on the local network. Even two computers from the same manufacturer, of the same model, and purchased at the same store will be seen as distinct devices, since each network interface has a unique MAC Address assigned by the manufacturer. This identifier allows local network equipment, such as switches and routers, to distinguish each device even before an IP address is assigned, and it enables protocols like BOOTP to correctly associate a network configuration with the requesting client. Furthermore, during communication on the local network, Ethernet frames use MAC addresses so that each packet is delivered to the correct physical interface.

---

### Fixed Lists

However, even with the protocol solving part of the problem, it still created a second one: fixed lists. An administrator needed to register each machine in the BOOTP server's database so that the server could correlate the MAC address with the corresponding IP address.
For a home setup, this isn't much of a problem, after all, we're talking about a handful of devices. In corporate networks and more complex environments, however, this process could consume weeks or even months of administrative work. What's more, a single mistake, such as registering the same IP address for two different MAC addresses, could cause network conflicts whose identification might take days or even weeks, depending on the number of hosts involved. In many cases, an extensive and exhausting audit would be needed to locate the source of the problem.
To resolve this limitation, a more reliable mechanism was needed, that is, one that would let the host itself identify by its MAC address and have the server assign an IP address dynamically, without depending on manual registration by administrators. This is precisely the need that gave rise to DHCP (Dynamic Host Configuration Protocol).

---

## Dynamic Host Configuration Protocol (DHCP)

Dynamic Host Configuration Protocol
DHCP is a protocol developed by Dr. Ralph Droms's Network Working Group {% include ref.html id="rfc2131" %}{% include ref.html id="RalphDroms" %}.
What Dr. Droms's team realized is that the entire BOOTP process could simply be automated, in a fast, reliable, and verifiable way.
To do this, there's no need to build something from scratch, but rather to improve something that already works well, so that it works even better.
In this sense, it would be necessary to change the way BOOTP operates.

At first glance, you may notice that DHCP does the same thing as BOOTP, that is, the host prepares a data packet that is sent via broadcast to every participant on a network (even without an internet connection, this can be done over radio waves). This packet can be understood as a block, with information and fields to be filled in with access parameters.

To go deeper into DHCP, you need to understand the concept of DORA — Discover-Offer-Request-Ack, which in summary is everything DHCP does. I'll start by explaining DHCP Discover, which is closely tied to BOOTP {% include ref.html id="rfc951" %}.

---

### DHCP Discover

The first step is similar to BOOTP and involves creating an information packet, with fields for a DHCP server's responses. This packet is sent via broadcast to all nearby devices; it uses a unique address for this, such as FF:FF:FF:FF:FF:FF. This can happen in several ways, over a network cable or a radio/network signal (DHCP doesn't depend on an internet connection, only on the local physical medium, whether Wi-Fi, copper Ethernet cable, or fiber optics, since the communication happens entirely within the local network).

Below you can see an image showing exactly how such a packet is formatted. The numbers in parentheses indicate the size of each field in octets.
<figure class="artigo-figura">
<img src="{{ site.baseurl }}/files/essays/the-network-society/part-III/DHCPDISCOVER.drawio.png" alt="DHCPDISCOVER">
  <figcaption>Figure 1: DHCPDISCOVER packet sent from a host to all hosts on the network; at least one host (the DHCP server) is expected to respond</figcaption>
</figure>

I won't explain every option, only the most important ones for understanding the mechanism. If you're interested, all of them can be found directly in RFC 2131 {% include ref.html id="rfc2131" %}.

The first field on the first line, Op (Operation), refers exclusively to the message type, that is, whether it represents a request or a response. Since the DHCP server reuses the same packet structure, when this field is set to 1, it means a request (BOOTREQUEST); when it's set to 2, it represents a response (BOOTREPLY), the same way it worked in the BOOTP protocol {% include ref.html id="rfc2131" %}.

The only field on the second line, Xid (Transaction ID), is a pseudo-random number generated by the client (the host wanting to join the network). This identifier is used by both the client and the DHCP server to correlate requests and responses, functioning as a kind of transaction signature, allowing both to know exactly which request a given response belongs to.

The only field on the fifth line, Yiaddr (Your IP Address), corresponds to the IP address that will be assigned by the DHCP server to the client. During the initial request, when the message has Op = 1, this field is normally left empty, or contains the value 0.0.0.0, indicating that the host doesn't yet have a valid IP address. After processing the request, the DHCP server fills this field with an available address on its network, such as 153.70.72.14 (_An Op = 1 value does not solely mean that the host lacks an actual IP address—as you will see in Figure 3 later on—but can also simply indicate that the message originates from a requesting host, whereas Op = 2 indicates it originates from a DHCP server._).

The only field on the eighth line, Chaddr (Client Hardware Address), contains the client's physical address (MAC Address). Unlike the Yiaddr field, this value isn't changed by the DHCP server. It's used to uniquely identify the device that made the request and, when possible, to allow the response to be sent directly to the client via unicast.

With the packet ready, but still without the proper data, DHCP Discover will be sent to every device on the network, and it will wait for a response. That response can only come from the DHCP Server, which is the only one that will respond; the other hosts on the network tend to receive and discard or ignore the packet, since they aren't DHCP servers.

---

### DHCP Offer

As soon as the DHCP server receives a Discover-type packet, it will respond. The first step is to check the packet's compliance, whether the values provided are legitimate and correct; only then will it search its database tables for an available local IP and correlate it with the MAC. This will ensure that every packet sent to that IP is redirected to the related MAC via unicast, directly (_However, I would point out that the actual IP-to-MAC resolution is the job of ARP, not DHCP. DHCP merely provides the IP configuration and maintains the client binding._).

At this layer, another distinction between DHCP and BOOTP appears: DHCP provides up to three ways of allocating and correlating MACs and IPs. The first is Automatic Allocation, which assigns a permanent IP to a MAC, preferably used for internal servers that don't rely on DNS and need to keep the same IP without changes for communication. The second is Dynamic Allocation: DHCP assigns an IP to a MAC for a set period of time, which ensures constant IP turnover on a network and, for that reason, can't be used for servers. The third and last is Manual Allocation, when a network administrator explicitly defines an IP for a MAC, and DHCP's job is solely to carry out the correlation between the two.

In the image below, you can see how the DHCP server's response to the requesting host takes place. This response can be sent via broadcast or directly to the client's MAC address (unicast), depending on the implementation and the host's capabilities. But I should stress that this still isn't that host's IP, because the DHCP server needs a reply to confirm that the host has accepted the packet.

<figure class="artigo-figura">
<img src="{{ site.baseurl }}/files/essays/the-network-society/part-III/DHCPOFFER.drawio.png" alt="DHCPOFFER">
  <figcaption>Figure 2: DHCPOFFER packet sent from a DHCP Server to a host</figcaption>
</figure>

As mentioned, the address _192.168.1.100_ doesn't yet belong to the host; it can accept that address, and will need to inform the DHCP server so the correlation can be finalized. The process becomes much faster now, because the host already knows exactly who the DHCP server on the network is; this process is called DHCP Request.

---

### DHCP Request

Having accepted the IP address from the DHCP server, all that's left for the host — in this case, Anne's computer or phone — is to create a new DHCP/BOOTP packet, to state which IP it will use from now on and, above all, from which DHCP server it's receiving this IP. This packet is sent to the DHCP servers on the network.
In other words, the Options will now contain new fields, and the DHCP Message Type will now be Request, as if the host were asking the DHCP server for that IP to now belong to it.
A note on Request and Broadcast:
The host doesn't send a Request via unicast, precisely because every DHCP server on the network needs to know who owns each IP and which server provided it — so communication remains broadcast until the final step. This matters because it's common to have more than one DHCP server on the same network: large corporations often use multiple servers to avoid overloading a single point, and even on smaller networks, each router (gateway) frequently already comes with its own built-in DHCP server.

Notice in the image below how the packet can be structured.

<figure class="artigo-figura">
<img src="{{ site.baseurl }}/files/essays/the-network-society/part-III/DHCPREQUEST.drawio.png" alt="DHCPREQUEST">
  <figcaption>Figure 3: DHCPREQUEST packet sent from a host to a DHCP Server</figcaption>
</figure>

With this, the host formally informs every DHCP server on the network that it's requesting this IP address, and now only needs confirmation from the DHCP server that the relationship is complete.

---

### DHCP ACK

That confirmation comes in the form of another packet, now sent from the DHCP server to the host that requested it. It can arrive via unicast or broadcast, and what matters here is that, from this point on, the host can finally use the IP. The ACK is the confirmation that the correlation in the DHCP server's database was made successfully, and that every packet delivered to that IP address will be redirected to the network card of the registered MAC.

At this point, what actually changes in the packet is its type: the DHCP Message Type becomes DHCPACK, and the Yiaddr field will contain the accepted IP.

After receiving the response and adopting the IP address contained in the Yiaddr field, the client becomes identified both by its MAC address and by its IP address, allowing communication on the network to proceed normally.

<div class="nota-autor">

A note on the ARP protocol: <br> 
If I have a MAC and an IP, how does that packet actually get delivered? That answer belongs to another protocol, ARP (Address Resolution Protocol), which will be covered in a dedicated article in this saga, should I decide to write about the topic. In short, ARP is the one responsible for, in practice, delivering packets on the local network, resolving the correlation between the destination IP and the corresponding physical MAC at the moment of delivery — something DHCP doesn't do.

</div>

Below you can see the complete communication. Notice that DORA is split into up to four parts, with some descriptions; now Anne's laptop can, in fact, connect to the SHAREON network, and so every host on the network is properly registered.

<figure class="artigo-figura">
<img src="{{ site.baseurl }}/files/essays/the-network-society/part-III/DHCPMAP.drawio.png" alt="DHCPCOMPLETE">
  <figcaption>Figure 4: Network communication between Anne's laptop, the Gateway/Router, and the DHCP server</figcaption>
</figure>

In the first article of this series, I covered several topics, some to a lesser degree than others, and that's because I didn't want to start from the lowest steps. Explaining the relationship between MAC and IP (DHCP) before explaining what an IP is and why it's necessary would be like explaining what rain is without first explaining what water is.

When I said that the internet, and everything that makes it up, is a tangle of protocols, I meant it. We explained a lot, and we understood a lot; still, we've only scratched the surface, and there's much more to understand. Between ARP and the mathematical algorithms that make this structure possible, explaining how and when we overcome connection lapses, and what a ping actually is, would take pages and pages of articles, in fact, an entire book, like Tanenbaum's. And he already did that, and did it very well. It's something I might do myself one day; I don't rule out the idea entirely, but it would require considerable time.

---

## Conclusion

In previous articles, we were able to see how a simple image file leaves Anne's SHAREON network and reaches Peter's MISHARE network. In this article, we climbed down the protocol ladder and understood how Anne's laptop or smartphone announces itself on the network, and how it can have an IP without ever having connected to it before.

This article explained, in parts, how DHCP's DORA process works. Of course, I didn't cover DHCP in full depth, you can read RFC 2131 {% include ref.html id="rfc2131" %}, which is a primary source, to study it further. In doing so, you'll discover that DHCP can perform more functions than just assigning an IP to a MAC; it can, for example, also function as a relay for an external network.

But there's still at least one question left unanswered from the previous article, and several from the one before that: how can Anne send an image to Peter without knowing his IP? By that, I mean: does Anne need to memorize the IP of all her friends? Or does she only need a single address? In the next article, I'll cover a bit more about DNS and CNAME.

---