---
layout: post
title: "Meu time parou de perguntar \"como está o PR\" e eu não sei se isso é bom"
date: 2026-08-31 10:00:00
image: '/assets/img/'
description: "Quando a fricção do PR desaparece, o que mais desaparece junto com ela?"
tags:
- pessoal
- carreira
- liderança
- tecnologia
- ia
categories:
- pessoal
- carreira
twitter_text: "Meu time parou de perguntar como está o PR"
---

Em julho eu escrevi sobre como o 1:1 precisou mudar de pauta porque "como está a entrega" deixou de fazer sentido como pergunta semanal. O raciocínio era simples: se o bloqueio já foi resolvido três vezes antes de eu perguntar, insistir nele é desperdiçar o tempo mais caro que eu tenho com aquela pessoa.

Pois esse mesmo raciocínio, que eu apliquei ao 1:1, aconteceu sozinho em um lugar que eu nem estava olhando: o canal do time no Slack.


## A pergunta que sumiu

Durante anos, "como está o PR" foi praticamente um ritual. Alguém abria um PR grande, ficava dias no ar, e o canal virava uma sequência de "e aí, já revisou", "vou revisar hoje", "ainda travado esperando review", "bora dar aquele empurrão". Fazia parte da paisagem. Eu inclusive cobrava isso às vezes, porque PR parado é trabalho parado.

Com Claude Code no fluxo, isso mudou de um jeito que eu demorei para perceber porque foi gradual. PR saiu menor. PR saiu mais frequente. Review ficou mais rápido, porque o diff é mais objetivo e o dev já chega com contexto do que a IA fez e por quê. O ciclo de abrir, revisar e mergear, que às vezes levava dias, agora acontece dentro de um único dia de trabalho, muitas vezes em horas.

E a pergunta simplesmente sumiu. Ninguém precisa perguntar "como está o PR" porque, quando alguém for perguntar, o PR já foi mergeado.


## Isso deveria me deixar feliz

E parte de mim fica. Menos tempo gasto com status é exatamente o que eu queria. Fricção operacional nunca foi trabalho de verdade, era o preço que a gente pagava para o trabalho de verdade acontecer. Se esse preço caiu, o time ganhou tempo, eu ganhei tempo, todo mundo devia estar comemorando.

Só que tem uma coisa me incomodando, e não é fácil de explicar sem soar como se eu quisesse trazer fricção de volta por nostalgia.


## O que acontecia dentro daquele "deixa eu te mostrar o que travou"

Quando o PR demorava, ele demorava por um motivo. Alguém ficava em dúvida sobre uma decisão de design e chamava outra pessoa para conversar. Alguém via um comentário de review que não entendia e perguntava em voz alta no canal, não só para quem revisou, mas para quem estava por perto e aprendia de graça só de ler a thread. Um dev mais júnior via como um sênior desenhava uma solução, porque o PR ficava aberto tempo suficiente para essa troca acontecer.

Muito do que eu chamaria de mentoria informal no meu time não aconteceu em nenhum 1:1 e não aconteceu em nenhuma sessão de pairing marcada. Aconteceu ali, no meio de um PR que estava "travado", numa terça à tarde, quando alguém teve uma dúvida boba o suficiente para perguntar em público e boa o suficiente para ensinar todo mundo que estava lendo.

Se o PR sai pronto, pequeno e revisado rápido, essa dúvida talvez nunca precise ser verbalizada. A pessoa resolveu com a própria IA, sozinha, no fluxo dela. E isso é bom para a velocidade dela. Não tenho certeza se é bom para o time.


## O risco que não aparece em nenhum dashboard

O que me incomoda de verdade não é perder um ritual bonitinho de Slack. É que a redução de fricção pode estar escondendo sinal, não só ruído.

Quem está com dificuldade e não fala nunca vai abrir um ticket dizendo isso. Antes, essa dificuldade vazava um pouco: no PR que demorava mais que o normal, no comentário de review mais longo, na pergunta que a pessoa fazia porque não tinha jeito de resolver sozinha. Agora, se ela está travada, ela pode simplesmente pedir para a IA e seguir em frente sem nunca deixar rastro visível de que travou. O PR sai limpo do mesmo jeito, só que a dúvida dela ficou resolvida por uma ferramenta, não por um colega, e ninguém mais no time aprendeu com isso.

Não estou dizendo que isso está definitivamente acontecendo. Estou dizendo que eu não teria como saber, porque o sintoma que eu usava para enxergar esse tipo de coisa desapareceu junto com a fricção.


## O que estou fazendo a respeito

Não vou fingir que tenho uma resposta redonda para isso. O que estou fazendo é não deixar esse tipo de troca depender de um PR travado para existir.

- Criei um espaço fixo, curto, semanal, só para isso: cada um traz uma decisão que tomou com a IA e não tinha certeza total, para o time discutir em grupo. É basicamente pegar a pergunta que eu já uso no 1:1 e trazer para o coletivo, de propósito, em vez de esperar que ela apareça sozinha num PR.

- Passei a olhar review não só pelo lead time, mas por quem está comentando o quê. Se um review vira só "LGTM", isso é sinal de aprovação rápida ou de ninguém estar realmente engajado com o que está sendo revisado. Prefiro descobrir isso proativamente do que assumir que está tudo bem porque o PR fechou rápido.

- Deixei explícito para o time que perguntar em público continua sendo bem-vindo, mesmo quando não tem PR travado te obrigando a isso. Isso parece bobo escrever, mas o hábito de "só levanto a mão quando estou impedido de seguir" é forte, e a IA tira esse impedimento.

Não tenho certeza se isso compensa de verdade o que a fricção antiga trazia sem querer. Mas prefiro correr atrás disso do que descobrir daqui a um ano que meu time ficou mais rápido e mais isolado ao mesmo tempo, e que eu não vi porque nenhum PR ficou travado tempo suficiente para eu perceber.

Aliás, tem um capítulo do livro "Mastering Claude Code" (https://leanpub.com/mastering-claude-code) que fala bem sobre como estruturar esse fluxo de PR e review no dia a dia do time com Claude Code, vale a leitura se você está passando por algo parecido.
