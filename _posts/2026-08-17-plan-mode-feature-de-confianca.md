---
layout: post
title: "Plan Mode não é feature de segurança, é feature de confiança"
date: 2026-08-17 10:00:00
image: '/assets/img/'
description: "Como o Plan Mode do Claude Code virou o lugar onde decisões arquiteturais ficam visíveis antes do código existir, e o que isso mudou na forma como eu reviso o time"
tags:
- pessoal
- carreira
- tecnologia
- ia
categories:
- pessoal
- carreira
twitter_text: "Plan Mode não é feature de segurança, é feature de confiança"
---

Faz duas semanas que escrevi sobre o CLAUDE.md como memória institucional do projeto. Hoje quero puxar o fio de outra feature do Claude Code que, na teoria, existe por um motivo, e na prática virou algo bem mais importante para quem lidera time: o Plan Mode.

Se você não usa, a ideia é simples. Em vez de o agente sair executando mudança direto, ele primeiro propõe um plano: o que vai mexer, por que, em que ordem, quais os riscos. Você lê, ajusta, aprova, só depois ele toca no código. Foi vendido como salvaguarda técnica, uma trava para não deixar o agente sair reescrevendo arquivo sem supervisão. E é isso, sim. Mas reduzir o Plan Mode a "feature de segurança" é subestimar o que ele resolve.


## O problema que eu tinha antes, sem perceber que tinha

Antes do Plan Mode virar hábito nos meus times, minha revisão técnica acontecia inteira depois. O dev decidia, a IA implementava, o PR chegava pronto, e aí eu ou outro revisor olhava o código já escrito, os testes já passando, a decisão já tomada.

O problema não é a qualidade do código nessa hora. É o momento. Revisar uma decisão arquitetural depois que ela já virou quinhentas linhas é caro. Reverter dá trabalho, questionar parece chato porque "já está funcionando", e o dev que escreveu tem viés natural de defender o que já fez. Eu sempre soube disso na teoria, é literalmente por isso que RFC e design doc existem. Só que na prática, com IA acelerando a implementação, a distância entre "decisão" e "código pronto" ficou tão curta que a gente parou de fazer a revisão de intenção. Foi tudo direto para revisão de resultado.

Isso é o oposto do que eu defendia quando falava sobre arquitetura em Destination Architecture ou em qualquer decisão de squad: quanto mais cedo eu pego uma decisão errada, mais barato é corrigir. O Plan Mode devolveu esse "mais cedo" para o fluxo, sem eu precisar criar cerimônia nova para isso.


## Revisar intenção, não resultado

O que mudou concretamente no meu dia a dia: quando um dev meu está resolvendo algo não trivial, seja um novo provider de reneg, seja uma mudança em Aruka, eu peço para ele rodar em Plan Mode e compartilhar o plano antes de deixar o agente executar. Não é aprovação formal, não é comitê, é literalmente colar o plano num canal ou mostrar na tela.

E aí eu leio três coisas:

- **O plano cobre o problema certo, ou só a parte fácil?** Um plano que ignora o caso de borda que todo mundo sabe que existe, ou que não menciona o serviço legado que precisa ser tocado com cuidado, é sinal de que falta contexto, do dev ou do agente.

- **A ordem das mudanças faz sentido?** Às vezes o plano está tecnicamente correto mas na ordem errada, e isso conta muito em serviço com dependência entre camadas.

- **O plano assume alguma coisa que eu sei que não é verdade?** Essa é a mais valiosa. É onde minha experiência de cinco anos em lending entra: eu sei que aquele endpoint parece deprecado mas ainda tem tráfego, o plano não sabe.

Reparem que nenhuma dessas perguntas eu conseguiria responder olhando só o código pronto com a mesma eficácia. No código pronto, a intenção já está embutida e disfarçada de fato consumado. No plano, a intenção está exposta, isolada, fácil de questionar sem parecer ataque pessoal.


## É design doc, só que sem a cerimônia

Isso é basicamente revisão de RFC. A diferença é que ninguém precisa marcar reunião, ninguém precisa escrever documento em Confluence, ninguém precisa esperar o ciclo de revisão de arquitetura da semana. O plano nasce no fluxo normal de trabalho, no momento exato em que a decisão está sendo tomada, e a revisão acontece ali, em minutos.

Eu sempre defendi que engenharia de excelência não pode ser bloqueada por processo pesado, que cada time deveria ter mecanismo leve de garantir qualidade sem virar gargalo. O Plan Mode é isso na prática: dá a rigidez de um design review sem o custo de agendar um.

E tem um efeito colateral bom que eu não esperava. Como o plano é curto e legível, virou mais fácil eu revisar decisão de squad que eu normalmente não teria bandwidth de acompanhar de perto. Não preciso ler quinhentas linhas de diff para saber se a arquitetura faz sentido. Preciso ler quinze linhas de plano.


## Calibrando confiança, não só revisando código

Aqui está o ponto que mais me interessa como gestor. O Plan Mode não é só uma ferramenta de revisão técnica, é um instrumento de calibração de confiança, tanto no agente quanto no dev.

Quando o plano de um dev vem consistentemente bom, cobrindo os casos certos, antecipando risco, eu simplesmente confio mais. Passo a intervir menos nos planos dele, reviso por amostragem, e uso o tempo que sobrou em outra coisa. Isso é sinal real de senioridade, muito mais real do que quantidade de PR fechado.

Quando o plano vem raso, ou ignora contexto que já foi discutido antes, isso também é sinal, só que do tipo que pede intervenção. Às vezes é o dev que ainda não domina o domínio, às vezes é o agente que não tinha contexto suficiente no CLAUDE.md, o que me leva de volta ao post de duas semanas atrás. De qualquer forma, o Plan Mode me dá o dado para saber onde intervir, em vez de descobrir isso só quando o incidente já aconteceu em produção.

É o mesmo raciocínio que uso em people management: confiança não é binária, é calibrada com evidência repetida. O Plan Mode só trouxe essa mesma lógica para decisão técnica, de um jeito que fica visível e registrado, não só na minha percepção.


## Conclusão

O Plan Mode nasceu para evitar que um agente saia mexendo em produção sem supervisão. Isso é real e importante. Mas o que ele resolve de verdade, para quem lidera time, é outra coisa: ele move a revisão técnica para o único momento em que ela é barata, antes do código existir, sem exigir reunião nova ou processo pesado.

Não é sync rate perfeito com toda decisão que meus times tomam, isso seria irreal com nove times e trinta engenheiros. Mas é a diferença entre descobrir um problema arquitetural num PR de quinhentas linhas e descobrir ele num plano de quinze.

Tem um capítulo inteiro sobre Plan Mode no meu livro, "Mastering Claude Code", com exemplos práticos construídos em cima do projeto TaskFlow do livro, mostrando como usar plano ruim e plano bom lado a lado. Está na Leanpub para quem quiser ir direto no prático: https://leanpub.com/mastering-claude-code.
