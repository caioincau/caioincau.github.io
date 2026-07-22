---
layout: post
title: "O CLAUDE.md que eu queria ter escrito no meu primeiro dia"
date: 2026-08-03 10:00:00
image: '/assets/img/'
description: "Por que um bom CLAUDE.md é memória institucional, e o time inteiro paga o preço quando ele não existe"
tags:
- pessoal
- carreira
- tecnologia
- ia
categories:
- pessoal
- carreira
twitter_text: "O CLAUDE.md que eu queria ter escrito no meu primeiro dia"
---

Semana passada eu estava revisando um PR de um dos meus times de New Markets e vi uma coisa que me deu um certo desespero. O Claude Code tinha implementado uma feature inteira usando um padrão de erro que a gente abandonou faz mais de um ano. Não estava errado tecnicamente, funcionava, os testes passavam. Só que era o jeito antigo, o jeito que a gente decidiu não usar mais depois de um incidente feio em produção.

O dev me falou uma frase que ficou martelando na cabeça: "pois é, ele sempre faz assim quando eu não falo nada".

Ele sempre faz assim. Todo agente novo, toda sessão nova, o mesmo erro, a mesma pergunta óbvia, a mesma convenção reaprendida do zero. E aí me caiu a ficha de uma coisa que eu deveria ter percebido bem antes: eu estava tratando o CLAUDE.md como um detalhe de configuração, quando na verdade ele é a memória institucional do projeto.


## O custo invisível de repetir contexto

Quando um agente começa uma tarefa sem contexto nenhum do projeto, ele não é burro. Ele está fazendo exatamente o que qualquer pessoa nova faria: inferindo padrões a partir do que consegue ver, e chutando o resto. O problema é que sem um guia, o chute às vezes cai no padrão errado, ou pior, no padrão certo só que com o motivo errado.

E isso não é um erro isolado. É um imposto recorrente. Cada sessão nova, cada tarefa nova, o agente reaprende:

- que convenção de nomenclatura a gente usa
- que padrão de tratamento de erro é aceitável
- quais comandos rodam os testes e quais não
- quais atalhos são proibidos, mesmo que pareçam razoáveis
- por que aquela solução óbvia foi tentada e descartada há dois anos

Se cada um desses pontos exige uma pergunta ao dev, ou pior, exige que o dev descubra o erro só na revisão do PR, o ganho de produtividade que a IA prometia desaparece na correção. Não é a IA que fica mais lenta. É o time que fica preso corrigindo o mesmo tipo de erro em loop.


## O CLAUDE.md não é documentação, é onboarding

Aqui está o ponto que eu demorei para enxergar: escrever um bom CLAUDE.md é o mesmo exercício mental que escrever um bom material de onboarding para gente nova no time.

Quando eu desenhei a metodologia de "onion onboarding" para escalar Unsecured de 18 para 30 engenheiros, o princípio central era simples: não jogue tudo de uma vez, mas garanta que o essencial chegue antes de qualquer código ser escrito. Tech, depois produto, depois domínio de lending. Nessa ordem, porque cada camada depende da anterior para fazer sentido.

Um agente de IA precisa da mesma coisa, só que em um arquivo em vez de um programa de semanas. E a pergunta que eu uso para saber se o CLAUDE.md está bom o suficiente é literalmente: "se eu desse esse arquivo para um engenheiro sênior novo no time, no primeiro dia, ele conseguiria evitar os erros que todo mundo comete nos primeiros três meses?"

Se a resposta é não, o arquivo não está pronto. Não importa se ele está bonito, se tem markdown caprichado. O que importa é se ele carrega o "porquê" por trás das decisões não óbvias.


## O que eu realmente coloco lá dentro

Depois de reescrever o CLAUDE.md de mais de um projeto em Unsecured, cheguei numa estrutura que funciona bem na prática. Não é exaustiva, é o que eu priorizo quando tenho tempo limitado:

- **Convenções que não são óbvias olhando o código**: se o time usa um padrão específico de nomenclatura, de estrutura de pasta, de camada de serviço, isso precisa estar explícito. O agente não vai adivinhar a intenção, só o padrão visível, e às vezes o padrão visível é uma exceção, não a regra.

- **Decisões de arquitetura com o motivo**: não basta dizer "usamos X". Precisa dizer "usamos X porque tentamos Y e deu problema com Z". É exatamente esse contexto que evita que o agente reintroduza uma solução que já foi descartada. Sem o porquê, toda decisão parece arbitrária e, portanto, reversível.

- **Comandos comuns, sem ambiguidade**: como rodar os testes, como buildar, como validar localmente antes de abrir PR. Parece básico, mas é a maior fonte de fricção repetida que eu vejo.

- **Armadilhas conhecidas**: aquele serviço legado que não pode ser tocado sem migração cuidadosa, aquele endpoint que parece deprecado mas ainda tem tráfego de produção, aquele fluxo que quebra silenciosamente se você não atualizar duas tabelas juntas. Isso é conhecimento tribal que normalmente só existe na cabeça de quem já se queimou.

- **O que não fazer, de forma explícita**: às vezes é mais eficiente listar os atalhos tentadores que já causaram problema do que descrever o caminho certo em detalhes.

O paralelo com onboarding de gente nova é quase literal. Documentar para um agente é documentar para um humano novo. A diferença é que o agente lê o arquivo inteiro toda vez, sem preguiça e sem pular parágrafo. Então qualquer coisa que eu escrever ali, ele vai realmente considerar.


## O que isso mudou no meu dia a dia

Depois que comecei a tratar o CLAUDE.md como prioridade, e não como tarefa de sexta à tarde, a diferença ficou visível rápido. Menos PRs voltando com o mesmo tipo de comentário. Menos tempo meu e dos meus M2s e M3s explicando a mesma decisão de arquitetura pela enésima vez, seja para um agente ou para alguém que acabou de entrar no time.

E tem um efeito colateral bom: escrever o CLAUDE.md me força a articular decisões que às vezes só existiam de forma tácita. Se eu não consigo explicar por que fazemos algo de um jeito, isso é sinal de que talvez a decisão precise ser revisitada, não só documentada.

Não é sync rate perfeito, mas é bem melhor que reaprender tudo do zero a cada sessão.


## Conclusão

O erro que cometi não foi usar Claude Code sem contexto. Foi achar que contexto era algo que eu passava verbalmente, numa mensagem aqui, num comentário de PR ali, e que isso seria suficiente. Não é. Contexto que não está escrito em um lugar central se perde, e o time paga o preço de reensinar a mesma coisa repetidamente, para pessoas e para agentes.

Se eu pudesse voltar no meu primeiro dia gerenciando um time em Nubank, escreveria esse arquivo antes de qualquer outra coisa. Hoje, é o primeiro documento que eu reviso quando entro em um projeto novo, e o primeiro que cobro de quem está começando um serviço do zero.

Escrevi um capítulo inteiro sobre isso no meu livro, "Mastering Claude Code", com o passo a passo completo construindo um projeto real, o TaskFlow, do CLAUDE.md vazio até um que realmente funciona como memória institucional. Está na Leanpub, para quem quiser o detalhe prático: https://leanpub.com/mastering-claude-code.
