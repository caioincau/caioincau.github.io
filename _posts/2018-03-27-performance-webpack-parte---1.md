---
layout: post
title: "Performance Webpack Parte - 1"
date: 2018-03-27 07:15:08
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

# Performacne Webpack

Essa é a primeira de um série de posts sobre performance Webpack, falei sobre este tema no JSSP, foi uma das talks que eu percebi mais interesse das pessoas.

Por isso acho justo compartilhar o tema em formato de blog posts, para disseminar esse conhecimento para quem não teve a chance de ir no meetup.

Sem mais delongas, vamos começar.

Os posts irão abordar os seguintes temas:

* Diminuir o tamanho dos arquivos no Front-End
* Melhorias de cache
* Monitorar e analisar a aplicação

Vamos começar por:

## Diminuir o tamanho dos arquivos no Front-End


### Ligue a minificação

O primeiro passo e mais básico, é ligar a minificação, pode parecer algo batido, mas ainda é possível encontrar sites sem esta otimização.
Para que nunca usou minificação, o processo básicamente remove os espaços em branco, além de substituir os simbolos, por simbolos menores, economizando kbytes.
O processo é simples usando o plugin UglifyJS:

{% highlight javascript %}
const webpack = require('webpack');

module.exports = {
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
    ],
};
{% endhighlight %}

#### Código que escrevemos

{% highlight javascript %}
// comments.js
import './comments.css';
export function render(data, target) {
    console.log('Rendered!');
}
{% endhighlight %}

#### Código após compile do webpack com babel

{% highlight javascript %}
// bundle.js (part of)
"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["render"] = render;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__comments_css__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__comments_css_js___default =
__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__comments_css__);

function render(data, target) {
console.log('Rendered!');
}
{% endhighlight %}

#### Código após o UglifyJS

{% highlight javascript %}
// minified bundle.js (part of)
"use strict";function t(e,n){console.log("Rendered!")}
Object.defineProperty(n,"__esModule",{value:!0}),n.render=t;var o=r(1);r.n(o)
{% endhighlight %}

### Minifique seu CSS

Podemos realizar um processo similar com nosso css, mas para isso, precisamos ativar essa opção no seu loader.

Para os não familiarizados com webpack, os loaders são módulos que ensinam ao webpack, como lidar com cada tipo de arquivo.


{% highlight javascript %}
// webpack.config.js
module.exports = {
    module: {
        rules: [
        {
            test: /\.css$/,
            use: [
                'style-loader',
                { loader: 'css-loader', options: { minimize: true } },
            ],
        },
        ],
    },
};
{% endhighlight %}

### Ligue o NODE_ENV em modo de produção

Ligue o ```NODE_ENV=production```

Muitas das nossas dependências, usam o NODE_ENV para verificar se aplicam ou não otimizações como importar o .map, ou remover console.log.

Parece algo comum, mas muitas pessoas acabam não se preocupando com isso, ou mudam o padrão, como 'production', é uma String que não uma váriavel "extraída", mudar esse nome pode alterar o comportamento das nossas dependências.

A maioria dos frameworks modernos como React e VueJS confiam nessa variável para otimizar o build.

Mas é possível melhorar ainda mais esse processo.

### Usando o DefinePlugin

Podemos usar o `webpack.DefinePlugin` para substituir as ocorrências de `process.env.NODE_ENV` para `'production'`

{% highlight javascript %}
// webpack.config.js
const webpack = require('webpack');

module.exports = {
plugins: [
    new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
    }),
    new webpack.optimize.UglifyJsPlugin(),
],
};
{% endhighlight %}

Deste modo o UglifyJS vai avaliar uma expressão como essa do Vue:

{% highlight javascript %}
if (typeof val === 'string') {
    name = camelize(val);
    res[name] = { type: null };
} else if ("production" !== 'production') {
    warn('props must be strings when using array syntax.');
}
{% endhighlight %}

E automáticamente remover o else que retornará false, ou seja, deadcode.

Transformando em:

{% highlight javascript %}
if (typeof val === 'string') {
    name = camelize(val);
    res[name] = { type: null };
}
{% endhighlight %}

Ainda falando em bibliotecas externas, podemos otimizar nossos imports também.

### Use ES imports!

Quando você usa ES modules, o webpack é capaz de fazer o famoso `'tree-shaking'` e trazer somente o necessário dos arquivos importados.

Vamos pegar o seguinte código de exemplo:

{% highlight javascript %}
// comments.js
export const render = () => { return 'Rendered!'; };
export const commentRestEndpoint = '/rest/comments';

// index.js
import { render } from './comments.js';
render();
{% endhighlight %}

Agora vamos ver como ficam os imports após compilado:

Veja que ele remove a função `commentRestEndpoint` ao perceber que ela, apesar de estar no arquivo, não foi utilizada.

{% highlight javascript %}
(function(n,e){"use strict";var r=function(){return"Rendered!"};e.b=r})
{% endhighlight %}

Vale lembrar que se você usa babel, é necessário passar `{ modules: false }` no env, para evitar o uso de CommonJS.

Falamos de script, falamos de css, mas ainda temos um grande vilão no nosso bundle size, as imagens!

### Imagens inline

Podemos tratar imagens pequenas, para deixá-las inline em formato base64.

{% highlight javascript %}
// webpack.config.js
module.exports = {
module: {
    rules: [
    {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'url-loader',
        options: {
        // Inline files smaller than 10 kB (10240 bytes)
        limit: 10 * 1024,
        },
    },
    ],
}
};
{% endhighlight %}

No caso acima, transformamos em inline, qualquer imagem menor que 10kb, evitando por exemplo que várias request sejam abertas apenas para trazer ícones.

### LIB HELL

Em média, mas da metade do JavaScript de uma aplicação vem de suas dependências, e parte disso pode ser simplesmente desnecessário.

Vamos citar alguns exemplos básicos, o Lodash tem 72 KB minificado, mas vamos chutar alto, quantos métodos dele vocês usam? 15, 20?

Isso significa que temos algo em torno de 65kb não usados, o Lodash já suporta imports através de ES modules, assim ativando o three-shaking.

Outro grande exemplo é o moment.js, como sabemos que a API de datas do JS não é das mais satisfatórias, o moment é uma depedência comum nas aplicações de hoje.

Ele possui 223 KB minificado, o que no projeto que trabalho seria mais da metade do nosso projeto, porém 170kb são de arquivos de locale, boa parte deles podem ser excluídos e podemos fazer isso através do webpack:

{% highlight javascript %}
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
    plugins: [
        // To strip all locales except “en”
        new MomentLocalesPlugin(),

        // Or: To strip all locales except “en”, “es-us” and “ru”
        // (“en” is built into Moment and can’t be removed)
        new MomentLocalesPlugin({
            localesToKeep: ['es-us', 'ru'],
        }),
    ],
};
{% endhighlight %}

Você pode ver essa e outras técnicas de otimização no [Chrome Labs](https://github.com/GoogleChromeLabs/webpack-libs-optimizations)


### Concatenação de ES modules

Ligue a concatenação de ES modules, quando o webpack usava CommonJS, lá no webpack 1, cada módulo precisava ser englobado dentro de uma função, hoje, com o uso dos ES Modules a mesma função pode englobar vários módulos.

Vale lembrar que ligar esta melhoria iria quebrar os módulos de hot-reload, por isso, essa configuração só deve ser usada em produção.

{% highlight javascript %}
const webpack = require('webpack');

module.exports = {
plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
],
};
{% endhighlight %}