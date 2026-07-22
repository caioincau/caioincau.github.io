---
layout: post
title: "Subagents: delegar para IA como eu delego para gente"
date: 2026-10-12 10:00:00
image: '/assets/img/'
description: "O que orquestrar subagents no Claude Code me ensinou sobre como eu quebro trabalho para meus próprios M2s e M3s"
tags:
- pessoal
- carreira
- liderança
- tecnologia
- ia
categories:
- pessoal
- carreira
twitter_text: "Subagents: delegar para IA como eu delego para gente"
---

Semana passada eu estava investigando um problema de performance que atravessava três serviços diferentes de Unsecured. Em vez de fazer isso sequencialmente, subi três subagents em paralelo no Claude Code: um investigando o Earner, outro o Hagen, outro o Capo. Cada um com escopo isolado, cada um voltando com um relatório curto do que encontrou.

Funcionou bem demais. E no meio do processo eu me peguei pensando: isso é exatamente o que eu deveria estar fazendo com meus M2s e M3s, e nem sempre faço.

## O que é um subagent, no fundo

Para quem não usa Claude Code no dia a dia, subagent é basicamente um agente especializado que você delega uma parte de uma tarefa maior, com escopo bem definido, contexto suficiente para decidir sozinho, e rodando em paralelo com outros subagents fazendo outras partes. No final, cada um volta com um resultado, e você, o orquestrador, integra tudo.

O paralelo com gestão de time é quase constrangedor de tão direto. Eu tenho 9 times, 12 diretos, e o trabalho de verdade nunca foi "fazer", é orquestrar quem faz o quê, com que contexto, e como eu verifico o resultado sem virar gargalo.

A diferença é que com subagents esse princípio fica exposto de um jeito bruto, sem as camadas de educação corporativa que a gente usa com gente. Não tem como fingir que delegação vaga funciona. Se o escopo não está claro, o subagent trava, alucina, ou entrega a coisa errada. Rápido. Sem cerimônia.

## Delegação boa depende de três coisas

Reparando em como eu escrevo um prompt bom para um subagent, cheguei em três elementos que sempre precisam estar presentes:

- **Escopo claro**: o que exatamente essa parte da tarefa cobre, e mais importante, o que ela não cobre. Se dois subagents têm escopo sobreposto, eles pisam um no outro ou duplicam trabalho.

- **Contexto suficiente para decidir sozinho**: não adianta dar a tarefa e faltar o "porquê". Um subagent sem contexto do sistema maior vai tomar decisões tecnicamente corretas e estrategicamente erradas, porque não sabe o que realmente importa ali.

- **Um jeito de verificar sem microgerenciar**: eu não acompanho o subagent linha por linha enquanto ele trabalha. Eu defino como vou avaliar o resultado antes de delegar, e reviso o output no final. Se preciso ficar checando cada passo, a delegação falhou na largada.

Tirando "Claude Code" da frase, isso é literalmente o que eu ensino nos meus 1:1 de calibração para M2 novo: escopo, contexto, critério de verificação. Só que com subagent essas três coisas ficam explícitas em texto, porque é a única forma de comunicação que existe. Com gente, a gente costuma pular etapas porque acha que "ficou implícito na conversa". Quase nunca fica.

## O exemplo prático: paralelizar a investigação

Voltando ao caso do início: o problema de performance parecia estar em algum lugar entre três serviços, e a forma óbvia de investigar seria pegar um dev sênior e deixar ele vasculhar sequencialmente, serviço por serviço, por um dia inteiro.

Em vez disso, separei a investigação em três frentes independentes, uma por serviço, escrevi para cada subagent o que ele devia checar, que sinais procurar, e como reportar de volta — não "me conta tudo que você viu", mas "me diga se encontrou o gargalo, onde, e com que evidência". Rodei os três em paralelo. Em vinte minutos tinha três relatórios curtos, e o problema real estava na interação entre Hagen e Capo, coisa que eu só enxerguei porque consegui comparar os três relatórios lado a lado, rápido, ainda com o contexto fresco na cabeça.

Se eu tivesse investigado sequencialmente, ou pior, jogado "investiga esse problema de performance" sem quebrar em partes, provavelmente teria gastado o dobro do tempo e ainda chegado numa hipótese pior, porque ia perder o contexto de uma parte enquanto investigava a outra.

Isso me fez repensar como eu quebro trabalho complexo para os meus M2s e M3s. Minha tendência natural, principalmente sob pressão, é jogar o problema inteiro para uma pessoa só e confiar que ela vai organizar as partes. Funciona, mas é lento, e sobrecarrega quem recebe. O modelo de subagent me lembrou que, quando o problema tem partes genuinamente independentes, o certo é quebrar eu mesmo, dar escopo isolado para cada pessoa ou squad, definir como vou integrar os resultados, e deixar rodar em paralelo. O trabalho de orquestração é meu, não deveria ser terceirizado para quem está executando uma parte.

## Onde a delegação ruim aparece nos dois casos

O padrão de delegação ruim é idêntico com pessoa ou com agente: jogar uma tarefa vaga, sem contexto do porquê, sem definir como o resultado vai ser avaliado, e torcer para dar certo.

Com subagent isso quebra na hora, o resultado vem incoerente ou fora do escopo esperado, e você percebe rápido que o prompt estava mal feito. Com gente, o custo aparece depois, silenciosamente: a pessoa entrega algo tecnicamente ok mas estrategicamente errado, ou trava no meio porque faltou contexto e não teve coragem de perguntar, ou o EM vira microgerente porque nunca definiu com clareza o que "pronto" significa.

Prefiro achar que a IA me deixou mais rigoroso comigo mesmo nesse ponto, porque ela não perdoa delegação preguiçosa. Gente às vezes compensa minha falta de clareza com esforço extra, adivinhação, ou pura teimosia de dar certo mesmo assim. Subagent não compensa nada. Só executa o que você realmente escreveu.

## Conclusão

Orquestrar subagents virou, sem eu planejar, um exercício de repensar minha própria prática de delegação com pessoas. Escopo claro, contexto suficiente, critério de verificação sem microgerenciamento — isso sempre foi o que separa delegação boa de delegação ruim, só que a IA tornou o preço de fazer errado imediato e óbvio, em vez de escondido em semanas de retrabalho.

Escrevi mais sobre isso no capítulo de orquestração de subagents do meu livro, "Mastering Claude Code", com exemplos práticos de como quebrar tarefas complexas em partes paralelas de verdade. Está na Leanpub: https://leanpub.com/mastering-claude-code.
