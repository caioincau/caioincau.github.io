---
layout: post
title: "Hooks: a parte chata do Claude Code que ninguém automatiza e devia"
date: 2026-09-14 10:00:00
image: '/assets/img/'
description: "Por que pedir 'roda o lint' toda vez é desperdício, e o que muda quando o time inteiro automatiza a mesma coisa do mesmo jeito"
tags:
- pessoal
- carreira
- tecnologia
- ia
categories:
- pessoal
- carreira
twitter_text: "Hooks: a parte chata do Claude Code que ninguém automatiza"
---

Semana passada eu estava pareando com um dev de um dos meus times de Dynamic Offers e reparei em um padrão que se repetia toda tarefa: ele terminava uma edição, e a próxima mensagem, sempre, era "roda o lint" ou "roda os testes desse módulo". Fiz a conta rápida de cabeça. Se isso acontece cinco, seis vezes por tarefa, e ele faz duas ou três tarefas por dia, é um bom punhado de mensagens gastas em algo que não deveria exigir decisão nenhuma.

Perguntei por que ele não tinha automatizado isso com hook. A resposta foi a mesma que eu já tinha ouvido de outras três pessoas antes dele: "ainda não configurei, fica para depois". Só que "depois" nunca chega, porque o custo de cada instância isolada parece pequeno demais para justificar parar e configurar. É o clássico problema de o que é barato uma vez e caro cem vezes.


## O que é um hook, rapidamente

Hook no Claude Code é uma ação automática amarrada a um momento específico do fluxo. Antes de rodar um comando, depois de uma edição, quando uma tarefa termina, antes de considerar algo pronto. Você define a regra uma vez, em configuração, e ela roda sozinha, sem precisar pedir.

A diferença entre pedir "roda o lint" toda vez e ter um hook que roda lint automaticamente não é só de tempo economizado. É de atenção. Toda vez que eu preciso lembrar de pedir uma coisa, estou gastando um pedaço de memória de trabalho num passo que é puramente mecânico. E memória de trabalho é exatamente o recurso mais escasso que a gente tem quando está no meio de um problema difícil.


## Três casos que resolvem dor real

Não é sobre automatizar tudo que existe. É sobre automatizar o que é sempre igual, sempre esperado, e sempre esquecido em algum momento de cansaço.

- **Lint automático antes de considerar a tarefa pronta**: hook que roda depois de qualquer edição de código e bloqueia a tarefa como concluída se o lint falhar. Isso resolve o problema mais chato de revisão de PR, que é aquele comentário de estilo que ninguém queria escrever nem receber. O agente já chega com isso resolvido, e a pessoa nem lembra que existiu.

- **Suite de testes relevante depois de uma edição**: não a suite inteira, a suite relacionada ao módulo tocado. Hook que dispara os testes automaticamente assim que uma edição termina, antes de qualquer outra ação. Pega regressão na hora, não trinta minutos depois quando o contexto já foi embora da cabeça de todo mundo.

- **Bloqueio de edição em arquivo sensível**: hook que impede qualquer alteração em arquivos protegidos, tipo configuração de produção ou aquele serviço legado que só pode ser tocado com migração cuidadosa. Isso não é sobre desconfiar do agente. É sobre não depender de ninguém lembrar manualmente que aquele arquivo é perigoso, especialmente às três da tarde de sexta.

- **Notificação quando uma tarefa longa termina**: hook que avisa quando um agente termina algo que rodou em background por um tempo. Parece trivial, mas evita o hábito ruim de ficar checando a cada dois minutos se terminou, que é outra forma de queimar atenção à toa.


## Por que isso importa mais em time do que sozinho

Sozinho, eu poderia argumentar que hook é luxo, porque eu lembro de rodar o lint, eu sei quais arquivos são perigosos, eu tenho o hábito. Em time, esse argumento desmorona rápido.

Cada pessoa lembra de coisas diferentes, em momentos diferentes, com paciência diferente. Um dev sênior de longa data sabe que não deve mexer no Artemisia sem cuidado. Alguém que entrou há duas semanas não sabe, e não é culpa dela, é falta de contexto que ainda não chegou. Se essa regra depende de lembrança individual, ela vai falhar exatamente na hora em que menos se espera, com a pessoa errada, no dia errado.

Hook tira a decisão da cabeça de cada indivíduo e coloca na configuração do projeto. Isso é consistência de verdade, não consistência de sorte. É o mesmo princípio que eu uso para CLAUDE.md, só que em vez de contexto que o agente lê, é comportamento que o agente segue independente de quem está pedindo. Ninguém no time de nove precisa lembrar de nada, porque a regra já está amarrada no lugar certo.

E tem um efeito colateral que eu só percebi depois de ver funcionando: hook bem configurado também ensina. Quando alguém novo vê a suite de testes disparar sozinha depois de uma edição, ela aprende sem perguntar que aquele módulo tem teste esperado ali. É onboarding silencioso, embutido no fluxo, não em documento separado.


## O que evitar

Hook em excesso vira ruído, e ruído o time aprende a ignorar, o que é pior do que não ter hook nenhum. Automatize o que é sempre esperado e sempre repetitivo. Não tente automatizar julgamento, isso ainda é trabalho humano, ou trabalho do agente pensando, não trabalho de regra fixa.


## Conclusão

O erro que eu via meu time cometer não era técnico, era de prioridade. Todo mundo sabia que hook existia, ninguém parava para configurar, porque o custo de cada instância parecia pequeno demais para competir com a entrega do dia. Só que esse custo pequeno, multiplicado por todo mundo, todo dia, é o tipo de imposto que ninguém nota pagando até parar e somar.

Configurar hook é chato. É a parte do Claude Code que fica esquecida na lista de "depois eu configuro". Mas é exatamente esse tipo de coisa chata e invisível que separa um time que usa IA de forma consistente de um time que usa do jeito que cada pessoa lembrou naquele dia.

Escrevi um capítulo inteiro sobre hooks no meu livro, "Mastering Claude Code", com exemplos práticos de configuração para lint, testes e bloqueio de arquivo sensível. Está na Leanpub, para quem quiser o passo a passo: https://leanpub.com/mastering-claude-code.
