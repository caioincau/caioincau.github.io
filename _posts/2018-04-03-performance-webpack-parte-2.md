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

Vamos dar continuidade no [post anterior](https://caio.ninja/performance-webpack-parte-1/) sobre performance em aplicações que usam Webpack.

Nesse segundo post iremos cobrir a parte de melhoria de cache e separação de código.

## Versionamento de cache

Nós podemos tirar proveito do [cache do navegador](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching?hl=pt-br), mas para isso, precisamos invalidar o cache após realizarmos mudanças em nosso código, o meio mais comum de fazer isso, é mudando os nomes do arquivos.

Antigamente tínhamos o applications_v1.js, applications_v2.js e assim por diante.

Com o webpack podemos gerar um hash automático a cada build que houver alterações e usar essa variável gerada, para concatenar no nome dos arquivos:

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

## Cache dos vendors

Tente extrair as libs de vendors em um bundle separado, isso é bom para paralelizar as requisições e também é uma ótima estratégia de cache, pois seu vendors tende a mudar menos que sua aplicação, seu hash/cache pode mudar menos.

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

Mas precisamos carregar tudo de uma vez?

## Lazy Loading

Lazy loading é uma técnica de desenvolvimento, na qual você trás os arquivos sob demanda, de forma "preguiçosa".

Sendo assim, não travamos o carregamento inicial da página para o usuário.

Podemos fazer isso com o uso da função `import`, ela faz a requisição para trazer o arquivo e retorna uma `promisse`, que ao ser resolvida, possui as funções do script importado.

Vamos supor que nós temos um página com uma seção de comentários, mas não queremos trazer os comentários de forma automática, queremos que os comentários sejam carregados apenas quando clicar em "ver comentários".

{% highlight javascript %}
onShowCommentsClick(() => {
    import('./comments').then((comments) => {
        comments.renderComments();
    });
});
{% endhighlight %}

Com o código acima, o arquivo de script `comments` só iria ser carregado no `click`.


## Code Split
Podemos dividir nosso código em mais do que somente dependências e aplicação,  na verdade, podemos dividir nossa aplicação em quantas partes precisarmos, por exemplo, cada rota pode possuir seu código especifico.

Para isso, é só adicionarmos mais entry points no nosso `webpack.config.js`.

{% highlight javascript %}
// webpack.config.js
module.exports = {
    entry: {
        home: './src/Home/index.js',
        article: './src/Article/index.js',
        profile: './src/Profile/index.js'
    },
};
{% endhighlight %}

Caso você use Vue.js, o Code split por rotas [pode ser mais simples](https://router.vuejs.org/en/advanced/lazy-loading.html), o mesmo vale para [React](https://reactjs.org/docs/code-splitting.html)

## Conclusão

Finalizo por aqui o post de hoje, iremos ter uma terceira parte sobre monitoria da aplicação, para garantir que suas melhorias não sejam descartadas sem que você perceba.