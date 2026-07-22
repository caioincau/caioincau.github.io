---
layout: post
title: "MCP não é sobre conectar tudo, é sobre não conectar o que não precisa"
date: 2026-09-28 10:00:00
image: '/assets/img/'
description: "Cada MCP server conectado é mais superfície de decisão para o agente errar. A pergunta certa não é o que dá para conectar, é o que vale a pena conectar"
tags:
- pessoal
- carreira
- tecnologia
- ia
categories:
- pessoal
- carreira
twitter_text: "MCP não é sobre conectar tudo"
---

Nas últimas semanas tive a mesma conversa umas quatro vezes, com pessoas diferentes, sempre no mesmo formato. Alguém do time me manda um print do config de MCP servers, com Slack, Jira, GitHub, banco de dados, Confluence, um sistema interno qualquer, tudo ligado ao mesmo tempo, e pergunta "o que mais eu deveria conectar".

Minha resposta tem sido sempre a mesma, e ela não é popular: provavelmente nada. Talvez até menos do que já está aí.

Isso soa contraintuitivo. MCP existe justamente para dar contexto e ferramentas ao agente, então por que eu estaria advogando por conectar menos coisa, não mais?


## O motivo é como o agente decide, não o que ele sabe

Todo mundo trata MCP como se fosse só sobre acesso: quanto mais sistema conectado, mais contexto o Claude Code tem, mais completo fica o trabalho dele. Só que isso ignora a parte cara do processo, que não é ter acesso, é decidir o que fazer com o acesso.

Cada MCP server conectado não é só uma porta a mais aberta. É uma ferramenta a mais que o agente precisa considerar antes de agir. Se eu conecto Jira, Slack, um banco de dados e três APIs internas de uma vez, toda tarefa simples passa por um momento em que o modelo avalia se alguma daquelas ferramentas é relevante, mesmo quando nenhuma é.

Isso tem custo em dois lugares que eu me importo de verdade:

- **Velocidade**: mais ferramentas disponíveis, mais tokens gastos considerando qual usar, mais latência antes da primeira ação. Em tarefa onde o contexto certo já estava no repositório, isso é puro desperdício.

- **Qualidade da decisão**: quanto mais opções irrelevantes na mesa, maior a chance do agente escolher a errada. Não é teórico, é o mesmo motivo pelo qual um menu de restaurante enorme demais deixa a experiência pior, não melhor.


## O segundo problema, que ninguém fala em voz alta

Cada MCP conectado carrega permissão. Slack conectado é o agente conseguindo ler canal, mandar mensagem, ver histórico. Banco de dados conectado é o agente rodando query, às vezes com mais acesso do que a pessoa que pediu a tarefa teria sozinha.

Ninguém audita isso com o mesmo rigor que audita um IAM role de produção, mas deveria. Toda vez que eu vejo alguém conectando "só para ver se ajuda" um MCP server que dá acesso de escrita em um sistema crítico, eu penso no mesmo AT Field que a gente discute em segurança de verdade: proteção não é sobre bloquear tudo, é sobre saber exatamente o que está exposto e por quê.

Superfície de ferramenta e superfície de permissão crescem juntas. Se eu não consigo justificar o motivo de um MCP estar ligado, ele é risco parado, não capacidade.


## A pergunta errada e a pergunta certa

A pergunta que a maioria faz é "quais sistemas eu poderia conectar". Essa pergunta sempre tem resposta positiva, porque tecnicamente dá para conectar quase tudo. Não é uma pergunta útil, é só uma lista de possibilidades.

A pergunta que eu tento fazer, e que tento puxar do time, é outra: qual problema recorrente e específico eu tenho, que um MCP server resolveria de forma melhor do que eu fazendo manualmente. Não "poderia ajudar". Melhor. Mais rápido, mais confiável, ou eliminando um passo que hoje é chato o suficiente para eu evitar fazer.

Alguns exemplos concretos de quando vale a pena, de times que eu acompanho em Unsecured:

- Um squad que consulta toda hora o schema e os dados de um sistema interno específico para entender comportamento de cliente antes de tomar decisão de crédito. Conectar aquele sistema via MCP elimina um ciclo de troca de aba, copiar resultado, colar no contexto, repetido dezenas de vezes por semana. Isso é problema recorrente, específico, com solução clara melhor que o manual.

- Um time que vive verificando status de incidente e histórico de deploy antes de decidir se pode seguir com uma mudança. Conectar a ferramenta de observabilidade certa economiza contexto de troca de ferramenta e reduz erro de julgamento por informação desatualizada.

E quando não vale a pena, que é a maioria dos casos que eu vejo:

- Conectar Jira "porque outros times conectaram" quando ninguém no squad usa o agente para nada relacionado a ticket. Isso é ferramenta parada, ocupando espaço de decisão, sem retorno nenhum.

- Conectar tudo que existe internamente "para não precisar conectar de novo depois". Isso inverte a lógica: em vez de resolver um problema específico, cria um inventário de acesso que ninguém mais vai revisar.


## O que eu tenho pedido para os squads

Antes de qualquer MCP novo entrar no setup do time, a pergunta que eu faço é simples: me mostra o problema recorrente que isso resolve, e me mostra por que fazer manualmente é pior. Se a resposta for vaga, tipo "dá mais contexto" ou "pode ser útil depois", a resposta é não, ao menos por enquanto.

Também tenho pedido revisão periódica dos MCP servers já conectados, do mesmo jeito que a gente revisa permissão de acesso a sistema de produção. Ferramenta que ninguém usou nas últimas semanas é candidata a sair, não a ficar esperando um caso de uso aparecer.

Isso não é sobre desconfiar de MCP como tecnologia. É sobre tratar cada conexão como uma decisão de arquitetura, com trade-off real, e não como upgrade automático de capacidade.


## Conclusão

MCP é uma das coisas mais importantes que aconteceram para tornar Claude Code útil em contexto real de trabalho, e eu seria hipócrita se fingisse o contrário depois de tudo que já escrevi aqui sobre IA-First. Mas útil não é sinônimo de "conectar mais".

O agente bom não é o que tem acesso a tudo. É o que tem acesso exatamente ao que precisa, para as tarefas que ele de fato resolve melhor com aquele acesso. O resto é superfície de risco disfarçada de produtividade.

Se você está montando o setup de MCP do seu time e quer exemplos práticos de onde isso funciona bem, o capítulo sobre MCP servers do livro [Mastering Claude Code](https://leanpub.com/mastering-claude-code) tem casos concretos que me ajudaram a pensar em critério, não só em possibilidade.
