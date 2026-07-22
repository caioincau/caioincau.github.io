---
layout: post
title: "O que aprendi tentando meter Claude Code no CI/CD do time"
date: 2026-10-26 10:00:00
image: '/assets/img/'
description: "Os erros que cometi tentando automatizar revisão de PR e manutenção com Claude Code rodando direto no GitHub Actions"
tags:
- pessoal
- carreira
- tecnologia
- ia
categories:
- pessoal
- carreira
twitter_text: "O que aprendi tentando meter Claude Code no CI/CD"
---

Faz umas seis semanas que eu falei para o Rech, meio de brincadeira, "bora meter o Claude Code direto no pipeline, revisando PR sozinho antes de qualquer humano olhar". Ele topou na hora, o que já devia ter me deixado desconfiado, porque o Rech topa qualquer experimento de IA sem pensar duas vezes.

Resultado: rodamos o experimento em dois dos meus times por um mês, e o que eu esperava que fosse um post de vitória fácil virou um post de "olha os buracos que eu não vi antes de cair neles". Não me arrependo de ter tentado. Mas se eu fosse fazer de novo, faria bem diferente.


## O que a gente tentou construir

A ideia no papel era simples. Todo PR aberto dispara uma action no GitHub Actions, o Claude Code roda como um agente com acesso ao diff, lê o CLAUDE.md do projeto (esse aqui eu já expliquei em outro post), e comenta no PR com sugestões: bug óbvio, teste faltando, padrão que a gente já abandonou, esse tipo de coisa.

Depois, empolgados com o resultado inicial, fomos além: deixamos o mesmo agente rodar tarefas de manutenção agendadas, tipo atualizar dependência menor e abrir PR sozinho quando o teste passasse verde.

No papel, cada peça fazia sentido isolada. Juntas, expuseram um problema que eu não tinha dimensionado direito: eu estava tratando "rodar em CI" como se fosse a mesma coisa que "rodar no meu terminal com Claude Code", só que automatizado. Não é. É outro contexto de risco inteiro.


## Erro 1: dei permissão demais para o agente rodando sozinho

Esse foi o mais feio. Para o fluxo de manutenção funcionar sem fricção, configuramos o agente com token de escrita no repositório e permissão para abrir PR automaticamente. Fizemos isso rápido demais, sem pensar no cenário de "e se o agente decidir fazer algo além do escopo que eu pedi".

Aconteceu exatamente isso. Numa das rodadas de atualização de dependência, o agente identificou um teste quebrando por causa da nova versão de uma lib, e ao invés de parar e reportar, ele foi lá e alterou o teste para passar. Tecnicamente "resolveu". Na prática, mascarou uma quebra de comportamento real que só pegamos porque um dev revisou o diff por curiosidade, não porque o processo pegou.

Isso é o tipo de erro que não aparece em incidente de produção na hora. Aparece semanas depois, quando alguém pergunta "por que esse teste não cobre mais esse caso" e ninguém lembra.

A lição não é "não dê permissão nenhuma". É que permissão de escrita em CI precisa ser proporcional ao escopo real da tarefa, e "atualizar dependência" não deveria nunca incluir "editar teste para passar".


## Erro 2: achamos que custo e tempo eram irrelevantes

Rodar Claude Code localmente, num terminal, tem uma sensação de custo baixo porque é você esperando, é seu tempo. Rodar em CI, disparando a cada PR, em paralelo, em vários times, é outra conta inteira.

Descobrimos isso do jeito ruim, olhando a fatura do mês. Cada PR médio disparava uma sessão de agente lendo o repositório inteiro mais o diff, e como não colocamos limite de escopo nem cache de contexto, o custo por execução era bem maior do que o esperado. Multiplicado pelo volume de PR dos meus times, virou um número que chamou atenção de gente que eu não queria que prestasse atenção nisso ainda.

O tempo de execução também surpreendeu. A promessa era "review em segundos". Na prática, PRs maiores levavam minutos, e isso empurrava para trás o restante do pipeline, criando fila. Um time reclamou que o CI ficou mais lento depois que a gente "acelerou" com IA. Ironia dolorosa.


## Erro 3: a falsa sensação de segurança

Esse foi o mais perigoso de todos, porque é silencioso. Depois de duas semanas com o agente comentando em todo PR, comecei a notar um padrão nas revisões humanas: ficaram mais rasas. Um dev me falou, sem querer soar displicente, "relaxei um pouco porque a IA já passou o olho".

"A IA já passou o olho" virou desculpa, não reforço. É exatamente o oposto do que eu queria. O objetivo nunca foi substituir revisão humana, era dar mais sinal antes da revisão humana acontecer. Mas na prática, quando você automatiza uma camada de verificação, as pessoas inconscientemente delegam julgamento para ela, mesmo quando você não pediu isso.

Isso conecta direto com algo que já vinha martelando desde os posts anteriores da série: o gargalo real de qualquer processo com IA envolvida é julgamento humano, não velocidade de execução. Colocar IA em CI sem reforçar isso explicitamente é apostar que ninguém vai preguiçar. Alguém sempre preguiça.


## O que eu mudaria da próxima vez

Depois desse mês, cheguei em três mudanças que eu levaria para qualquer novo experimento parecido:

- **Permissão read-only por padrão**: o agente em CI comenta, sugere, sinaliza risco. Não escreve, não abre PR sozinho, não altera teste. Se algum fluxo de verdade precisa de escrita automática, isso é uma decisão separada, com escopo super restrito e revisão de quem aprovou aquele fluxo específico.

- **Escopo de contexto limitado, não o repositório inteiro**: em vez de deixar o agente ler tudo a cada execução, delimitamos o que ele processa ao diff mais um contexto mínimo necessário. Isso resolveu boa parte do custo e do tempo de execução.

- **Comunicação explícita de que aquilo é sinal, não veredito**: coloquei isso no CLAUDE.md do projeto e reforcei nos meus 1:1s e nas syncs de time. O comentário do agente no PR é um ponto de partida para a revisão humana, nunca substitui ela. Parece óbvio escrito assim, mas óbvio não escrito vira suposição errada em duas semanas.


## Onde isso realmente ajuda versus onde é over-engineering

No fim, o que ficou claro é que IA em CI/CD ajuda muito em tarefa de sinal rápido e barato: detectar padrão abandonado, apontar teste faltando óbvio, sinalizar convenção quebrada. É trabalho mecânico de primeira passada, exatamente onde a IA é boa.

Onde vira over-engineering é quando a gente tenta empurrar decisão de julgamento para dentro do pipeline: o que é bug real versus comportamento esperado, o que pode ser automatizado sem revisão, o que é seguro deixar o agente resolver sozinho. Isso ainda precisa de humano no loop, sempre, e fingir que não precisa é o tipo de atalho que só aparece caro depois.

Não descartamos o experimento. Reduzimos o escopo, tiramos a escrita automática, e hoje funciona bem melhor do que na primeira versão inflada que eu desenhei com o Rech naquela conversa de brincadeira. Mas cheguei lá cometendo os três erros acima, não evitando eles.

Se você está pensando em integrar Claude Code no seu GitHub Actions, escrevi um capítulo dedicado a isso no meu livro, "Mastering Claude Code", cobrindo integração com CI/CD passo a passo, incluindo boa parte dos limites de permissão e escopo que eu só aprendi na marra. Está na Leanpub: https://leanpub.com/mastering-claude-code.
