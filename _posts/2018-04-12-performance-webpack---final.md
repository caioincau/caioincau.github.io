---
layout: post
title: "Performance Webpack - Final"
date: 2018-04-12 10:04:30
image: '/assets/img/'
description:
tags:
- webpack
- web
- javascript
categories:
- Webpack
twitter_text: 'Melhorando a performance webpack'
---

# Performance Webpack - Parte 2

Vou dar continuidade no [post anterior](https://caio.ninja/performance-webpack-parte-2/) sobre performance em aplicações que usam Webpack.

Com este post, também concluo essa série

Nesse terceiro post irei abordar a parte de monitoria de performance na sua aplicação, focada, claro, na parte do bundle que seu webpack gera.

Não iremos cobrir temas como performance diretamente no navegador e afins, acredito que este tema já tenho sido amplamente explorado em outros sites.

Enfim, vamos ao post!

## Melhor visualização com Webpack Dashboard

Com esse plugin, nós podemos ver melhor todos os nossos módulos, sendo que ele mesmo nos envia algumas dicas de onde podemos melhorar o nosso bundle.

![Webpack dashboard](/assets/img/webpack/webpack-dashboard.png)

Sua configuração é muito simples:

Basta importar e adicionar o plugin no seu `webpack.config`

{% highlight javascript %}
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  plugins: [
    new DashboardPlugin(),
  ],
};
{% endhighlight %}

Mas isso só avisa o desenvolvedor enquanto ele estiver com o terminal aberto e como nós, programadores, temos tendência a automatizar tudo, podemos automatizar essa monitoria com CI.

## Bundle size plugin

![Bundle size](/assets/img/webpack/bundlesize.jpg)

Mas como vamos integrar? Primeiro instalamos no projeto:

```
npm install bundlesize --save-dev
```

Depois configuramos no `package.json`:
{% highlight javascript %}
// package.json
{
  "bundlesize": [
    {
      "path": "./dist/*.png",
      "maxSize": "16 kB",
    },
    {
      "path": "./dist/main.*.js",
      "maxSize": "20 kB",
    },
    {
      "path": "./dist/vendors.*.js",
      "maxSize": "35 kB",
    }
  ]
}
{% endhighlight %}

Repare que podemos criar diversar regras, no primeiro caso, limitamos os arquivos `.png` em no máximo 16kb.

Nosso bundle principal em 20kb e nosso vendors em 35kb.

Basta configurar o CI para rodar  o comando `bundlesize` e pronto.

Mas e se o chunk estourar o tamanho? Temos um modo fácil de diagnosticar o problema.

## Webpack bundle analyzer

![Bundle size](/assets/img/webpack/analyzer.gif)

Com esse plugin, podemos:

* Ver o que temos dentro do nosso bundle.
* Encontrar que módulos inflam mais nossos bundles
* Encontrar módulos que estão lá por engano
* Otimizar!


Para rodarmos essa análise, precisamos instalar o `webpack-analyzer`.

{% highlight javascript %}
  npm install webpack-bundle-analyzer --save-dev
{% endhighlight %}

E adicionar seu plugin no webpack:

{% highlight javascript %}
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    plugins: [
        new BundleAnalyzerPlugin(),
    ],
};
{% endhighlight %}

## Conclusão

Com este post terminamos nossa série sobre otimizações de performance em Webpack, espero que tenham gostado.

Deixem seu feedback abaixo e espalhem a palavra do Webpack ❤