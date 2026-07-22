---
layout: post
title: "Segurança não é o capítulo que você pula"
date: 2026-11-09 10:00:00
image: '/assets/img/'
description: "Por que sandboxing e permission model de agentes de IA é decisão de liderança, não detalhe técnico de dev ou de time de segurança"
tags:
- pessoal
- carreira
- liderança
- tecnologia
- ia
categories:
- pessoal
- carreira
twitter_text: "Segurança não é o capítulo que você pula"
---

Faz oito posts que eu escrevo sobre IA e engenharia. Comecei falando de como pensar virou mais cansativo que codar. Depois fui para o papel do EM, para 1:1, para CLAUDE.md como memória institucional. Em algum momento no meio do caminho percebi que estava escrevendo, sem querer, um livro inteiro sobre como usar Claude Code de forma séria dentro de um time de verdade.

Este é o último post da série. E guardei para o final o assunto que eu via time depois de time pular, ou tratar como rodapé.

Segurança e permission model de agente de IA.

Não é o capítulo empolgante. Não tem o brilho de "olha quanto mais rápido a gente entrega agora". Mas é o capítulo que decide se, quando algo dá errado, o dano fica contido ou vira incidente de produção com o meu nome embaixo do post-mortem.


## O erro de achar que é assunto de outra pessoa

Toda vez que esse tema aparece em conversa de squad, vejo o mesmo movimento: o dev acha que é decisão de segurança da informação, segurança acha que é decisão de arquitetura, e arquitetura acha que já está resolvido porque "o agente roda em sandbox, relaxa". Resultado: ninguém dono, todo mundo assumindo que alguém já pensou nisso.

Não pensou. E mesmo que tivesse pensado, a decisão de quanto de autonomia um agente tem dentro do meu time não é uma decisão técnica isolada. É uma decisão sobre o que eu, como EM, estou disposto a colocar em risco em nome de velocidade.

Se um agente com permissão de escrita em produção roda um comando destrutivo, quem explica para o Kamakura não é o time de segurança. Sou eu. Se um agente vaza dado sensível de cliente porque ninguém configurou direito o que ele podia ler, a confiança que a organização perde em deixar IA operar com mais autonomia não é só daquele squad. É de Unsecured inteiro, e talvez de Lending inteiro.

Por isso parei de tratar esse assunto como "deixa o time resolver depois". Virou pergunta que eu faço antes de qualquer time meu aumentar autonomia de agente.


## As perguntas que eu faço antes de liberar mais autonomia

Não é uma lista de compliance para preencher. É o mesmo raciocínio que eu uso para decidir quanto de autonomia dar para uma pessoa nova no time, só que aplicado a um agente.

- **O que esse agente pode fazer sozinho, sem ninguém olhando?** Se a resposta inclui qualquer coisa irreversível — deletar dado, rodar migração, mexer em produção — a resposta certa quase sempre é "nada disso sozinho", pelo menos no início.

- **O que exige aprovação humana no meio do caminho?** Isso precisa estar explícito, não implícito. Não é "confio que ele vai perguntar se tiver dúvida". É "esses comandos específicos, essas ações específicas, sempre param e esperam alguém aprovar".

- **O que fica bloqueado, ponto final, não importa o contexto?** Todo time precisa de uma lista curta de "isso aqui a IA nunca faz sozinha", mesmo que pareça óbvio na hora que você escreve. É a mesma lógica do CLAUDE.md que eu descrevi lá atrás: se não está escrito, o agente vai inferir, e às vezes infere errado.

- **Se o agente errar dentro do escopo que ele tem, qual o pior cenário?** Essa é a pergunta que mais gente pula. Não pergunte se vai dar errado. Pergunte o que acontece quando der. Se a resposta te assusta, o escopo está grande demais para o nível de confiança que você tem hoje.

- **Esse time já tem histórico suficiente para eu confiar nesse nível de autonomia?** Não é sobre o agente ser bom. É sobre o time saber configurar, revisar e reagir rápido quando algo sai do script. Autonomia de IA sem maturidade operacional do time é dummy plug sem ninguém no comando.


## O padrão que eu exijo, sem exceção

Independente de qual time, qual serviço, qual criticidade, eu cobro três coisas por padrão antes de deixar qualquer agente ganhar mais autonomia:

- **Sandboxing real, não de mentirinha.** Se o agente não precisa tocar em produção para fazer o trabalho dele, ele não tem credencial para tocar em produção. Ponto. Menos acesso do que parece necessário é o padrão certo, não o excesso "porque facilita".

- **Modelo de permissão explícito e revisado por gente, não só configurado uma vez e esquecido.** O que é auto-aprovado, o que exige humano no loop, o que é proibido — isso precisa ser revisitado toda vez que o escopo do agente muda, do mesmo jeito que eu revisito o nível de autonomia de um relatório quando ele muda de squad ou de responsabilidade.

- **Revisão humana em todo ponto que toca dado sensível de cliente ou sistema de produção.** Não interessa quão rápido o agente é. Esse ponto específico não é sobre velocidade, é sobre AT Field: existe uma fronteira que protege o time e o cliente, e ela não se negocia por produtividade.

Isso não é desconfiar de IA. É a mesma disciplina que eu sempre exigi de gente. Ninguém em Unsecured ganha acesso irrestrito a produção no primeiro mês, por mais talentoso que seja. Constrói-se confiança com histórico, não com salto de fé. Com agente é exatamente igual — só que o "histórico" se acumula em semanas, não em meses, e isso engana muita gente a pular etapa.


## Fechando a série

Escrevi esses oito posts tentando entender, na prática e não na teoria, o que muda quando IA vira parte real do dia a dia de um time de engenharia. Pensar mais cansativo que codar. O papel do EM migrando de acompanhar entrega para proteger e dar contexto. O 1:1 perdendo status operacional e ganhando profundidade. O CLAUDE.md como memória institucional. E agora, para fechar, a régua de autonomia.

E no fim das contas, a régua é sempre a mesma régua. Quanto de autonomia eu dou para um agente de IA é a mesma pergunta que eu sempre fiz sobre quanto de autonomia dar para uma pessoa: depende de contexto, depende de guard rails claros, depende de histórico. Confiança não é um switch que você liga porque a ferramenta é boa. É algo que se constrói, se testa, e se revisa constantemente — para gente e para agente.

Segurança não é o capítulo que você pula porque quer chegar logo na parte de "olha o que a IA já consegue fazer sozinha". É o capítulo que decide se você vai continuar tendo permissão de deixar a IA fazer qualquer coisa sozinha.

Escrevi um capítulo inteiro sobre isso no meu livro, "Mastering Claude Code" — sandboxing, permission model, o que automatizar e o que sempre manter com humano no loop. E esse foi o último post da série sobre o livro. Está na Leanpub para quem quiser o detalhe prático: https://leanpub.com/mastering-claude-code.
