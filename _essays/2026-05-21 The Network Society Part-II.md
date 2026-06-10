---
layout: article
title: "The Network Society: From IP Shortage to NAT"
subtitle: "Part-II Como saímos de uma comunicação End-To-End para aglomerados conectados"
date: 2026-05-20
last_modified_at: 2026-05-20
schema:
  type: Essays and Papers
author: "Kennidy L. Guimarães"
categories: [Network Protocols]
tags: [Network protocols, Internet, DARPA, Networks, TCP, IP, TCP/IP]
image: /assets/img/og/the-network-society-tcp-ip-protocol-and-the-birth-of-the-internet.png
references: 
  - "RFC: 791 Internet Protocol. https://www.rfc-editor.org/rfc/rfc791"
  - "RFC: 1519 Classless Inter-Domain Routing (CIDR) https://www.rfc-editor.org/rfc/rfc1519"
  - "RFC: 950 Internet Standard Subnetting Procedure https://www.rfc-editor.org/rfc/rfc950"
  - "Computer Networks (5th Edition) Andrew Tanenbaum https://www.amazon.com/Computer-Networks-5th-Andrew-Tanenbaum/dp/0132126958"
  - "RFC: 1918 Address Allocation for Private Internets https://www.rfc-editor.org/rfc/rfc1918" 
  - "RFC: 1631 The IP Network Address Translator (NAT) https://www.rfc-editor.org/rfc/rfc1631"
  - "RFC: 6888 Common Requirements for Carrier-Grade NATs (CGNs) https://www.rfc-editor.org/rfc/rfc6888.html"
series: "The-Network-Society"
series_part: 2
related:
  - title: "TCP/IP Protocol and the Birth of the Internet"
    category: "Network Protocols"
    date: "2026"
    url: "#"

---
{% include ref-tooltips.html references=page.references %}

No primeiro artigo da série “The Network Society”, abordei como a internet surgiu de redes simples de comunicação estéril entre si, para comunicações Full Duplex, que permitem comunicação ativa end-to-end, por meio do TCP/IP. Neste segundo artigo, explicarei como surgiu uma das maiores limitações deste sistema, e porquê os engenheiros subestimaram o primeiro cálculo, e como isso levou ao fim (parcial) da comunicação End-to-End.

Internet, é assim que a chamamos hoje, a suíte de Protocolos TCP/IP, para um usuário comum basta apenas que se conecte a uma rede Wifi, e passe a desfrutar de todos os dados, informações, e utilitários que ela pode fornecer, tudo a poucos cliques de distância, do outro lado dessa rede, há inúmeros computadores que quase nunca são desligados, que quase nunca dormem.

Cada um com um número de identificação próprio, como discutimos, IP, o protocolo de cada máquina que permite localizar cada máquina conectada neste emaranhado de conexões.

---

## O modelo Classful

Porém, como descrito no primeiro artigo, as máquinas não se conectam diretamente a outras redes, antes, era necessária a conexão a um roteador (ou se preferir Gateway, comum nos RFCs), essa organização pode ser entendida como duas partes, uma parte dedicada à rede e outra ao Host que deseja usar a rede.

Para organizar essa estrutura, já que à época o número de IPs superava em muito o número de máquinas, foi criado o modelo Classful (A, B e C) para organização em classes.

### Classe A

A primeira classe (A), fornecia suporte a uma rede de 8 bits, e 24 bits para hosts. Ou seja, essa classe poderia fornecer suporte para até 16 milhões de Hosts por rede.

Devido ao grande suporte para host na época, era limitada para Governos, Centros militares, universidades e grandes empresas, poderia-se imaginar que mesmo para a época, dificilmente uma empresa possuiria mais de 16 milhões de máquinas em seu edifício.

### Classe B

A segunda classe (B), fornecia suporte de 16 bits tanto para a rede quanto para os hosts, ou seja, mais de 65 mil máquinas conectadas em uma mesma rede, destinada a empresas de médio porte, escritórios e outros.

### Classe C

A terceira e última classe (C), fornecia um suporte à rede de 24 bits, porém, somente 8 bits por host, comum mesmo para os padrões atuais, e era destinada ao público geral ou pequenas escolas, que não possuíssem mais de 254 hosts (ou computadores).


<div class="nota-autor">

Nota Sobre Classful: <br>

Além das classes A, B e C, existiam também as classes D e E.
A Classe D foi reservada para multicast IPv4, permitindo comunicação de um-para-muitos (one-to-many), enquanto a Classe E permaneceu reservada para uso experimental e pesquisa.
Essas classes foram omitidas da explicação principal por não participarem diretamente do modelo tradicional de alocação de hosts das classes A, B e C.
Para mais detalhes sobre multicast IPv4, consulte a RFC 1112.

</div>
---

## O Grande Desperdício

O modelo parecia eficiente no início, porém possuía um problema estrutural grave: desperdício massivo de endereços IPv4.
Imagine uma empresa com aproximadamente três mil funcionários, cada um utilizando um computador próprio.
Essa empresa não precisaria da capacidade absurda de uma Classe A. Porém, também ultrapassaria facilmente o limite de uma Classe C, que suportava apenas 254 hosts.
Na prática, restava apenas uma opção: receber uma Classe B inteira.

Isso significava obter suporte para mais de 65 mil endereços IP, mesmo utilizando apenas cerca de três mil deles. Todo o restante permaneceria inutilizado.
Por exemplo, se a empresa fictícia Data&Courage recebesse a rede _65.0.0.0/16_, ela poderia utilizar endereços entre: _65.0.0.1_ até _65.0.255.254_. 

Porém, se existissem apenas mil máquinas conectadas, dezenas de milhares de endereços permaneceriam sem uso _(~64 mil endereços)_.

---

## O Crescimento das Tabelas de Roteamento

O desperdício de endereços não era o único problema.
Conforme a Internet crescia, roteadores do backbone precisavam armazenar cada vez mais informações de roteamento para saber como alcançar diferentes redes espalhadas pelo mundo.

Essas tabelas poderiam conter entradas como:

65.0.0.0/24<br>
65.0.1.0/24<br>
65.0.2.0/24

Cada entrada representava uma rede inteira.
Os roteadores da Internet não precisavam saber quais computadores estavam ativos dentro dessas redes. Eles apenas precisavam saber qual caminho seguir para alcançar aquela rede específica.
Conforme milhares de novas organizações se conectavam à Internet, o número de rotas crescia rapidamente, aproximando a infraestrutura global de um problema de escalabilidade extremamente sério.
Se este problema continuasse enfrentariamos, filas intermináveis, listas extensas com milhões de conexões, algumas levando a lugar nenhum.

---

## O Trabalho do grupo de Fuller

O Vince Fuller e seu grupo de trabalho {% include ref.html n=2 %}, observaram que, com o crescente número de hosts conectados à internet, o desperdício de IPs tornou-se problemático, e em pouco tempo haveria escassez de IPs, causando a exclusão de Hosts da rede.
Nas palavras do Memorando:
<div class="destaque-bloco">

“ A causa fundamental deste problema é a falta de uma rede classe de tamanho apropriado para médio porte organização; classe C, com um máximo de 254 anfitriões endereços, é muito pequeno, enquanto a classe B, que permite até 65.534 endereços, é muito grande para a maioria das organizações.” {% include ref.html n=2 %}
</div>

Embora o memorando estivesse concentrado em resolver este problema, e o crescimento das tabelas de roteamento, ele não tinha por objetivo solucionar o problema da possível escassez de IPs, o grupo considerava a própria solução temporária até que uma nova ideia surgisse e fosse definitiva para solucionar a escassez.

<div class="destaque-bloco">

“Este plano deve ser viável por pelo menos três (3) anos, após os quais, espera-se que ocorra a implantação de uma solução adequada a longo prazo.” {% include ref.html n=2 %}
</div>

Então surge a ideia, no grupo de Fuller, para criar o CIDR, Roteamento entre domínios sem classes.
O objetivo é singular, remover o sistema de classes antes do esgotamento completo dos endereços IPs.
Mas não apenas isso, permitir a flexibilização do uso de endereços IPs, e diminuir o desperdício. Note diminuir o desperdício, a idéia aqui não era efetivamente solucionar o problema da escassez, mas, fechar a torneira que a essa altura estava aberta por tempo de mais. 

Para isso é necessária a utilização de um novo mecanismo, que compense as Classes.
A ideia é basicamente alocar os números das classes para cada provedor de serviço de rede, elas repassam subconjuntos orientados por máscara de bits do espaço de endereços do provedor {% include ref.html n=2 %}.

---

## Máscara de Rede

A máscara de rede é um valor de 32 bits utilizado para definir qual parte de um endereço IP pertence à rede e qual parte pertence aos Hosts.
Ela precisa possuir exatamente 32 bits para alinhar-se corretamente aos endereços IPv4, que também utilizam 32 bits {% include ref.html n=3 %}.

Em um exemplo simples, considere o seguinte endereço:

200.10.0.0/16

Onde o “/16” representa o prefixo CIDR (_Classless Inter-Domain Routing_).

Isso significa que:

- Os primeiros 16 bits pertencem à rede
- Os 16 bits restantes pertencem aos Hosts

Ou seja:

<div class="math-block">

32 Bits - 16 Bits = 16 Bits para Hosts

</div>

Como descrito anteriormente CIDR substituiu o antigo modelo de classes fixas (Classe A, B e C), permitindo criar redes mais flexíveis e reduzindo o desperdício de endereços IPv4.
Com o novo modelo, tornou-se possível definir redes com tamanhos específicos utilizando diferentes prefixos numéricos, como:

/19, /20, /21, /22, /27

Cada valor representa uma quantidade distinta de bits reservados para rede e Hosts.

Por exemplo, uma empresa que precise de aproximadamente 7000 Hosts não precisará utilizar uma Classe C (insuficiente) nem uma Classe B inteira (desperdício excessivo). Com CIDR, é possível calcular um bloco mais adequado.

Utilizando um prefixo /19:

<div class="math-block">

32 Bits - 19 Bits = 13 Bits para Hosts

</div>

Resultando em:

<div class="math-block">

2^13 = 8.192 Hosts

</div>

Dessa forma, a rede comportaria até 8192 endereços, com desperdício significativamente menor (1.192 IPs) quando comparado ao modelo classful. Adiante falarei mais sobre como utilizar os Hosts _"desperdiçados"_.

<div class="nota-autor">

Nota sobre os valores: <br>
Os prefixos CIDR são dinâmicos e variam conforme a necessidade da rede. Neste exemplo utilizamos "/19" apenas como referência prática, mas qualquer outro valor válido poderia ser utilizado, como "/14", "/22" ou "/27".

</div>

---

## Conversão da Máscara

Um prefixo "/19" significa que:

- 19 bits estão reservados para rede
- 13 bits estão reservados para Hosts

Convertendo esse prefixo para notação decimal, obtemos a seguinte máscara:

255.255.224.0

Essa conversão é realizada representando:

- Bits da rede com valor `1`
- Bits dos Hosts com valor `0`

A representação binária de `/19` ficará da seguinte forma:

<div class="math-block">

11111111.11111111.11100000.00000000

</div>

Convertendo cada octeto binário para decimal:

- `11111111` = 255
- `11111111` = 255
- `11100000` = 224
- `00000000` = 0

Resultando em:

255.255.224.0

A máscara de rede permite que computadores e roteadores determinem:

- Qual parte do endereço identifica a rede
- Qual parte identifica o Host
- Se um dispositivo pertence à rede local
- Ou se o tráfego deverá ser encaminhado para outra rede através de um Gateway

Essa distinção é fundamental para compreendermos os conceitos de rede local, rede pública, IP privado e os mecanismos de reaproveitamento de endereços IPv4 que veremos a seguir.

---

## O reaproveitamento de Espaço IPv4

Se aprendemos algo, relacionado ao ClassFul, é que o desperdício de IP é realmente algo lastimável, e isso porque quando se trata do IPv4 há um número limitado deles.
O CIDR limitou esse desperdício, como no exemplo anterior, entretanto, ainda parece haver algum desperdício, no capítulo anterior cerca de 1.192 IPs haviam sido desperdiçados, o que pode ser aproveitado.

Há uma boa explicação de como esse aproveitamento funciona no capítulo 5 do livro de Andrew Tanenbaum (**Computer Networks 5th Edition**) {% include ref.html n=4 %}.
Entretanto, condensarei essa explicação, de forma resumida, com uma analogia simples.
Consideramos que a empresa fictícia SourceMobile tenha requisitado para suas máquinas algo como 256 IPs.
Eles certamente não precisarão muito mais do que isso, então recebem um endereço como este:

192.168.0.0/24

Se realizarmos o cálculo, teremos:
<div class="math-block">

32 Bits - 24 Bits = 8 Bits
</div>

<div class="math-block">

2^8 = 256 endereços possíveis para Hosts
</div>

O intervalo entre o IP que eles receberam, (192.168.0.0), e o máximo que eles podem utilizar dentro deste bloco é:
_192.168.0.0_ até _192.168.0.255_.
Isso ocorre porque, em uma máscara /24, os primeiros 24 bits representam a rede, enquanto os últimos 8 bits são reservados para Hosts.
Assim, apenas o último octeto pode variar.

Porém, o CIDR permite que esse bloco seja subdividido em redes menores, desde que os intervalos respeitem o alinhamento binário correto da máscara utilizada.

### Subdivisão em /26

Por exemplo, podemos dividir esse /24 em múltiplas redes /26:

192.168.0.0/26 <br>
192.168.0.64/26 <br>
192.168.0.128/26 <br>
192.168.0.192/26 

Cada bloco /26 possui 64 endereços.
Por isso, os intervalos válidos precisam começar em múltiplos de 64, e não em múltiplos de 24.
Isso significa que algo como:

_192.168.0.72/26_

não seria um endereço de rede válido para um bloco CIDR /26, pois ele quebra o alinhamento binário esperado pela máscara (Lembre-se: múltiplos de 64).

_192.168.0.128/26_

seria válido em nosso exemplo.
No exemplo utilizamos múltiplos de 64 pois, como estamos utilizando /26, podemos fazer o cálculo:
<div class="math-block">

32 Bits - 26 Bits = 6 Bits
2^6 = 64 endereços possíveis

</div>

Então, para cada novo bloco de endereços, um novo intervalo de 64 deve ser respeitado.
Isso ocorre porque um IP não pode ser fornecido separadamente dentro do CIDR, eles são fornecidos em blocos matematicamente alinhados de acordo com a máscara utilizada.
Por esse motivo, valores válidos para redes /26 seriam:

192.168.0.0/26 <br>
192.168.0.64/26 <br>
192.168.0.128/26 <br>
192.168.0.192/26

### Por que /26 e não /19?
Você pode se perguntar: por que /26 e não qualquer outro valor, como por exemplo /19?
Utilizamos esse valor porque estamos subdividindo os endereços não utilizados dentro de uma rede /24.
Como um bloco /24 possui:
<div class="math-block">

32 Bits - 24 Bits = 8 Bits
2^8 = 256 endereços
</div>

o novo bloco precisa permanecer dentro desse intervalo original.
Se utilizássemos uma máscara menor, como /19, o bloco resultante seria muito maior do que o /24, ultrapassando completamente o espaço disponível:

<div class="math-block">

32 Bits - 19 Bits = 13 Bits
2^13 = 8192 endereços
</div>

O que geraria subdivisões excessivas e aumentaria a quantidade de operações de roteamento necessárias.
Assim, o CIDR busca equilibrar a utilização do espaço disponível, a quantidade de Hosts necessários e a eficiência do roteamento.
<div class="nota-autor">

Nota sobre alocação de endereços: <br>

Você pode imaginar essa subdivisão como a divisão de um disco rígido.
Temos o espaço já alocado e o espaço ainda não alocado.
Infelizmente, não compramos discos rígidos exatamente do tamanho das nossas necessidades.
O mercado trabalha com tamanhos padronizados, então quase sempre existe algum espaço sobrando.
Esse espaço restante pode ser subdividido e reaproveitado posteriormente para outros usuários ou serviços com necessidades menores.
O CIDR funciona de maneira semelhante.
Um grande bloco de endereços IPv4 é entregue para um provedor, que posteriormente subdivide esse espaço em blocos menores de acordo com a necessidade de cada cliente.
Assim, um cliente que precise de aproximadamente 500 endereços não precisa receber um bloco gigantesco e desperdiçar milhares de IPs.
O provedor pode fornecer apenas um subconjunto adequado daquele espaço maior.
Para o cliente final, todo esse processo é praticamente invisível.
Ele apenas recebe um bloco compatível com sua necessidade, enquanto o restante do espaço continua disponível para novas subdivisões e reutilização.
</div>

---

## O Furo em CIDR

O chamado “Furo” não ocorre por meio de alguma tecnologia específica.
Ele é apenas consequência da própria forma de endereçamento utilizada pelo CIDR.
Se parte do bloco principal estiver ocupada por redes menores e outra parte permanecer livre, esse espaço não utilizado passa a ser um “furo” dentro do bloco original.

Além disso, o sistema CIDR sempre prioriza a rota mais específica.
Esse mecanismo é conhecido como Longest Prefix Match (Falarei disso em outro artigo, já que requer um artigo próprio).

Por enquanto, aceite isso, quanto maior for a precisão da máscara de rede, maior será sua prioridade durante o roteamento.

Assim, uma rede menor e mais específica pode “recortar” parte de uma rede maior, fazendo com que determinados pacotes sejam direcionados para ela em vez da rota mais ampla.
É justamente esse comportamento que produz o efeito conhecido informalmente como “furo” dentro da tabela de roteamento.
Isso parece realmente complexo, mas imagine a seguinte situação:

a IANA _(Internet Assigned Numbers Authority)_ possui a lista de endereços IPv4 ainda não alocados.
Isso é necessário para evitar conflitos entre endereços IP, como explicado no artigo anterior.

A partir disso, a IANA repassa grandes blocos de endereços para as RIRs _(Registros Regionais da Internet)_, organizações responsáveis pela distribuição regional desses endereços.

Na América Latina e Caribe, por exemplo, essa responsabilidade pertence à _LACNIC_.
As operadoras e provedores de rede recebem esses blocos das RIRs e passam a distribuí-los para clientes, empresas e outras redes menores.

Porém, agora não realizam mais a distribuição isolada de IPs, mas sim de blocos orientados por CIDR, como por exemplo:
12.1.0.0/16
A partir desse bloco principal, a operadora pode subdividir o espaço disponível em redes menores, de acordo com a necessidade de cada cliente:

12.1.0.0/24 <br>
12.1.1.0/26 <br>
12.1.1.64/26 <br>
12.1.2.0/27

E assim sucessivamente.
Isso permite um aproveitamento muito mais eficiente dos endereços IPv4, reduzindo desperdício e evitando a distribuição massiva de blocos enormes para pequenas redes.


---

## A carência dos IPv4, IP público e IP privado

Mesmo com o brilhante trabalho do grupo de Fuller que conseguiu reduzir drasticamente e realocar endereços IPs desperdiçados, a internet e a comunidade em geral ainda estavam à beira da total carência de IPs.

No cálculo inicial não era estimado que a internet seria adotada como um mecanismo mundial para comunicação, streaming, networking, trabalho e outros.

Com o advento dos smartphones, câmeras conectadas à rede, e a popularização dos computadores, o número de IPs foi reduzindo drasticamente.
Uma universidade poderia fazer uso de 200 IPs para seus computadores, estes mesmos alunos teriam telefones que precisariam de IPs, e computadores em casa que necessitariam de IPs.
Se cada membro de uma família possuísse um telefone, cada telefone precisaria de um novo IP, impressoras e etc.
Logo o número de máquinas superaria o número de pessoas, que já haviam superado o intervalo de IPs disponíveis.

Não era uma estimativa grosseira, era nítido que não haveria endereços para todos, e possivelmente bilhões de pessoas ficariam sem acesso à internet {% include ref.html n=5 %}.

Para resolver este problema, mesmo que de forma paliativa, a comunidade de engenharia da Internet chegou a um consenso: poderíamos realizar a separação entre duas camadas de endereçamento, os IPs que se conectam diretamente à Internet e os IPs utilizados apenas para comunicação local.
Nem todo dispositivo conectado a uma rede realmente precisava estar acessível pela Internet, e isso rapidamente se tornou evidente.

Porém, mesmo dentro de uma rede local, esses dispositivos ainda precisavam de identificadores únicos para comunicação interna.
Assim, surgiu a separação entre IPs públicos e IPs privados.
Os IPs públicos são endereços roteáveis na Internet global.

Eles precisam ser únicos e são distribuídos por organizações como a Internet Assigned Numbers Authority e pelas RIRs (Registros Regionais da Internet).
Já os IPs privados pertencem apenas à rede local.
Eles não são roteáveis diretamente pela Internet pública e podem ser reutilizados em diferentes redes sem causar conflitos globais.

<div class="destaque-bloco">

“Vamos nos referir aos anfitriões na primeira e segunda categorias como ‘privado’. Vamos nos referir aos anfitriões na terceira categoria como ‘público’”. {% include ref.html n=5 %}
</div>

Por exemplo, milhões de redes ao redor do mundo podem utilizar simultaneamente:
_192.168.0.1_
sem qualquer problema, pois esses endereços permanecem isolados dentro de suas respectivas redes locais.
Isso só é possível porque a RFC 1918 {% include ref.html n=5 %} definiu intervalos reservados exclusivamente para uso privado:

10.0.0.0/8 <br>
172.16.0.0/12 <br>
192.168.0.0/16 

Dessa forma, dispositivos locais podem se comunicar internamente utilizando IPs privados, enquanto o acesso à Internet ocorre por meio de um IP público compartilhado.

É claro que ao fazer uso de IPs privados, é necessária a compreensão que a alteração para um IP público estaria sujeita à reconfiguração manual da máquina, o que pode ser uma clara desvantagem em comparação ao IP público, que se comunica tanto com a internet quanto localmente.

<div class="destaque-bloco">

“Uma grande desvantagem do uso do espaço de endereço privado é que ele pode na verdade, reduzir a flexibilidade de uma empresa para acessar a Internet. Uma vez que alguém se compromete a usar um endereço privado, ele está se comprometendo a renumerar parte ou a totalidade de uma empresa, caso se decida fornecer Conectividade IP entre essa parte (ou toda a empresa) e a Internet.” {% include ref.html n=5 %}
</div>

Entretanto para a maioria das pessoas isso não representa uma desvantagem considerável.
Tome como exemplo Peter, que ao receber a imagem de Anne (artigo anterior), pode decidir imprimir essa imagem.
Ele utilizará uma impressora que está conectada à rede LAN, com endereço de IP privado.
A impressora não estar disponível para a rede pública (internet), se converte para ele em benefício e segurança.

<figure class="artigo-figura">
<img src="{{ site.baseurl }}/files/essays/the-network-society/Figure6.drawio.png" alt="Hosts">
  <figcaption>Figure 2: Conexão entre o IP público do roteador de Peter, sua camerâ, computador e impressora com IPs privados</figcaption>
</figure>

---

## O Colapso Iminente e a Solução com NAT

As soluções apresentadas como CIDR e a separação do IP público e privado, são consideradas medidas paliativas, ou seja, elas resolvem um problema temporariamente até que surja uma medida definitiva.

Entretanto, mesmo com essas medidas, o número de IPs começara a diminuir drasticamente, isso porque com as pessoas utilizando um número maior de computadores de uso pessoal, a escassez prevista para alguns anos à frente, parecia se antecipar cada vez mais rápido.
Neste cenário K. Egevang publica um memorando {% include ref.html n=6 %}, propondo aquilo que segundo ele, poderia complementar o CIDR ou mesmo substituí-lo.
<div class="destaque-bloco">

“É possível que o CIDR não seja adequado para manter o IP…
Este memorando propõe outra solução de curto prazo, a reutilização de endereços, que complementa CIDR ou mesmo torna desnecessário.”
</div>

A solução descrita por ele era um Tradutor de Endereços de Rede IP conhecido como NAT.
A sua principal vantagem?
Ele pode ser instalado sem alterar o roteador ou os Hosts que dele dependem, isso é, centralização do problema.

### A desvantagem do NAT

A sua principal desvantagem é a eliminação das rotas End-to-End, para compensar com um aumento ou salvaguarda de IPs na rede.
Há ao menos dois tipos principais de NAT.

Inicialmente, explicaremos o primeiro tipo, chamado apenas de NAT, normalmente instalado na borda de uma rede LAN.
Ele funciona traduzindo pacotes entre endereços IP privados e um endereço IP público.
Imagine assim: ao invés de distribuir um IP público para cada computador da rede, as operadoras distribuem apenas um IP público ao roteador NAT, mantendo computadores, impressoras, câmeras e telefones utilizando IPs privados dentro da rede local.

À primeira vista, isso parece um problema.
Como esses dispositivos possuem apenas IPs privados, eles não são acessíveis diretamente pela Internet pública.
De fato, apenas o NAT possui um IP público real e roteável na Internet.
Todos os demais Hosts da rede local permanecem “escondidos” atrás dele.

### Como Anne acessa Peter

Mas então como Anne consegue acessar Peter, que está na Internet?
A resposta é tradução.

Vamos supor que Anne deseje enviar novamente uma foto para Peter.
Anne também possui um IP privado, e seu computador está tecnicamente Offline (sem acesso direto à internet), porém, esses detalhes para ela, não são interessantes.

Vamos presumir que Anne está utilizando um serviço para compartilhamento de imagens fictício (PicShare).
Ao enviar a imagem, o roteador de Anne, fragmentará em pedaços o pacote de dados (imagem), e utilizará de um NAT, ainda em uma conexão privada, entre o pacote de dados e o roteador.

A partir do roteador, teremos acesso à rede pública.
O roteador, sabe que o pacote pertence a Anne, pois, recebeu o pacote através do IP privado de seu computador (192.168.67.226).

Desta forma o Roteador utilizará uma função de NAT, informando que o IP 192.168.67.226 (Anne) na porta 3020, deseja enviar o fragmento Part-1 para o IP 136.157.81.0 (Servidor do PicShare) na porta 5030.
O NAT registra isso em uma tabela interna.

Em seguida ele substituirá o IP privado de Anne, pelo seu IP público (33.20.210.228), e a partir disso, redirecionará o pacote Part-1 para o IP de destino 136.157.81.0:5030.
É importante ressaltar que não apenas o IP é substituído, mas a porta também.
O NAT substitui a porta original de Anne por uma porta temporária (1800), uma medida de segurança.

Os fragmentos do pacote serão enviados para o IP público do servidor da PicShare, e de lá poderão ser encaminhados a Peter.
Para o servidor da PicShare, o pacote não veio do IP privado de Anne, ele não pode ter acesso a isso, ele veio do IP de seu roteador _NAT 33.20.210.228:1800_.

<figure class="artigo-figura">
<img src="{{ site.baseurl }}/files/essays/the-network-society/Figure7.drawio.png" alt="Hosts">
  <figcaption>Figure 2: Anne envia um pacote para Peter através do servidor da PicShare, o pacote faz Hop, a cada servidor Backbone, até chegar o destino. Note as funções NATs mencionadas.</figcaption>
</figure>

<div class="nota-autor">

Nota sobre o NAT: <br>

O NAT não é um hardware específico, na verdade inicialmente ele era um software instalado em uma máquina que servia os provedores e gerenciava as listas, entretanto atualmente ele é integrado juntamente ao Gateway, conhecido como roteador doméstico, em forma de uma função e protocolo.

Em um próximo artigo explicarei mais sobre o Roteador, é importante que você aceite o conceito de época para compreender os conceitos atuais e futuros da tecnologia de roteamento.

Note também que as portas e os IPs, são fictícios e servem apenas para exemplificar, alguns conceitos foram ocultos para serem explicados posteriormente, como DHCP.
</div>

<div class="nota-autor">

Nota sobre o CGNAT: <br>

Não seria impreciso dizer que após o crescimento expansivo da internet, sites, smartphones, dispositivos IOTs e outros, possuir um único IP público por residência parecia insuficiente.
Isso porque já nos anos 2000 o número de computadores começava a substituir o número de indivíduos.

As provedoras e a comunidade da internet tinham um novo desafio em mãos, como comportar tantas pessoas com tantas máquinas?
A essa altura o IPv6 já estava em processo de adoção e implementação (discutiremos mais sobre o IPv6 em outros artigos deste ensaio), porém, toda a infraestrutura da internet ainda estava em IPv4, e dificilmente poderia ser substituída automaticamente a baixo custo.

Então surgiu uma outra solução paliativa.

Note que todas essas soluções são paliativas, porém, algumas são implementadas até os dias de hoje — ainda podem ser chamadas de paliativas? —

A solução passou a ser utilizar uma segunda camada de NAT, os chamados Carrier-Grade NATs (CGNs), poderiam ser adicionados na primeira camada, transformando o IP público do NAT no roteador em um IP privado, e assim permitir um único IP público na primeira camada, que, poderia ser utilizado por inúmeros assinantes.
Por exemplo, poderiam haver 50 mil usuários (NAT) em um único CGNAT, com um único endereço de IP público, com cada um destes 50 mil usuários possuindo computadores, televisores, câmeras, telefones com IPs privados, em uma conexão NAT -> CGNAT, que faria a tradução do endereço, e a listagem dos pacotes {% include ref.html n=7 %}.
</div>
<div class="nota-autor">

Nota sobre as Portas: <br>

Você deve ter reparado que as portas são variadas mas não ilimitadas.
Note que as portas nesta estrutura acabam trabalhando como valores complementares ao IP, isso significa que um CGNAT acaba gerenciando um número grande de portas (~65 mil portas).

Se o CGNAT possui um número grande de NATs emitindo ordens e requisições, então, poderá haver um esgotamento de tais portas, Port Exhaustion, e o provedor provavelmente fará a reinicialização dessas portas para impedir a queda da conexão, ou, configurará um timeout para conexões inativas.

Falarei sobre as portas mais comuns e outros protocolos em outro artigo da série.
</div>
---

## Conclusão

No primeiro artigo da série The Network Society, abordei como saímos de conexões externas estéreis, e passamos a ter uma conexão End-to-End, a criação do TCP como protocolo, e o surgimento do IP.
Fizemos o caminho completo com Hop-By-Hop, analisando o tráfego de Anne e Peter.

Neste segundo artigo, tratei das limitações do IPv4, das classes e seus problemas, e das infindáveis camadas paliativas, que não apenas adicionaram complexidade, mas como solucionaram problemas de segurança, escalabilidade e gerenciamento de rede.
O projeto todo não foi arquitetado de forma pronta, mas, devidamente desenvolvido conforme as necessidades da rede.

Acompanhamos que antes do pacote de Anne chegar a Peter, ele precisará passar por um NAT, que utilizará um IP público único, transformando o IP privado de Anne em um IP completamente diferente, com uma porta temporária, e que será encaminhado para o servidor, onde poderá chegar a Peter.

Vimos também como o IP de Anne recebe uma máscara de rede, e como ele é calculado, e para quê é utilizado.
Porém, isso não é tudo, ainda restam muitas perguntas não respondidas do primeiro e segundo artigo que iremos responder.
Como o roteador de Anne sabe o IP privado de seu computador?
Como o computador de Peter sabe qual é seu computador na lista do grupo local?
E, será que Anne e Peter precisam decorar IPs privados e públicos sempre?

---



