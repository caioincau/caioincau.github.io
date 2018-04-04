---
layout: post
title: "Performance Webpack Parte 2"
date: 2018-04-03 21:15:33
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


##Versionamento de cache

Nós podemos tirar proveito do cache do navegador, mas para isso, precisamos invalidar o cache após realizarmos mudanças em nosso código, o meio mais comum de fazer isso, é mudando os nomes do arquivos.

Antigamente tinhamos o applications_v1.js, applications_v2.js e assim por diante.

Com o webpack podemos gerar um hash automático a cada build que houver alterações e usar essa váriavel gerada, para concatenar no nomes dos arquivos:

{% highlight javascript %}
module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.[chunkhash].js',
            // → bundle.8e0d62a03.js
    },
};
{% endhighlight %}

Caso você use o HtmlWebpackPlugin, ele irá trocar as referências ao seu bundle no html, pelo novo valor, já com o hash concatenado.

##Cache dos vendors

Tente extrair as libs de vendors em um bundle separado, isso é bom para paralelizar as request e também é uma ótima estratégia de cache, pois seu vendors tende a mudar menos que sua aplicação, seu hash/cache pode mudar menos.

Através do CommonsChunkPlugin podemos dar um nome para o chunk de código e passar uma função que ensina quais arquivos deverão estar em cada chunk.

{% highlight javascript %}
module.exports = {
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: module => module.context &&
                module.context.includes('node_modules'),
        }),
    ],
};
{% endhighlight %}

Mas precisamos carregar tudo de uma vez? Os vendors e toda a aplicação?
