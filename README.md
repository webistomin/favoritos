<!-- Favoritos is a JavaScript plugin that adds some HTML5 canvas magic to your favicon. With just a wee bit of code, we can make some really cool effects. -->

<p align="center">
  <img width="130" height="120" src="https://raw.githubusercontent.com/webistomin/favoritos/master/assets/logo.png" alt="Favoritos">
</p>
<h1 align="center">Favoritos</h1>

<h4 align="center">Favoritos is a JavaScript plugin that adds some HTML5 canvas magic to your favicon. With just a wee bit of code, we can make some really cool effects.</h4>

<h5 align="center">⭐️ Star me on GitHub — it helps!</h5>

<p align="center">
  <a href="https://travis-ci.org/webistomin/favoritos">
    <img src="https://travis-ci.org/webistomin/favoritos.svg?branch=master"
         alt="Travis CI">
  </a>
  <a href="https://codecov.io/gh/webistomin/favoritos">
    <img src="https://codecov.io/gh/webistomin/favoritos/branch/master/graph/badge.svg" alt="codecoverage" />
  </a>
  <a href="https://www.codefactor.io/repository/github/webistomin/favoritos"><img src="https://www.codefactor.io/repository/github/webistomin/favoritos/badge" alt="CodeFactor" /></a>
  <img alt="GitHub issues" src="https://img.shields.io/github/issues/webistomin/favoritos">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/webistomin/favoritos">
  <img alt="npm type definitions" src="https://img.shields.io/npm/types/favoritos">
  <a href="https://bundlephobia.com/result?p=favoritos@1.0.0">
  <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/favoritos/1.0.0">
  </a>
</p>

<p align="center">
<a href="https://www.npmjs.com/package/favoritos"><img alt="npm" src="https://img.shields.io/npm/v/favoritos" /></a>
<a href="https://www.npmjs.com/package/favoritos"><img alt="downloads" src="https://img.shields.io/npm/dm/favoritos" /></a>
  <a href="https://www.jsdelivr.com/package/npm/favoritos"><img alt="jsdeliver" src="https://data.jsdelivr.com/v1/package/npm/favoritos/badge?style=rounded"/></a>
  <!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
  <img src="https://img.shields.io/badge/all_contributors-1-orange.svg" alt="contributors"> 
  <!-- ALL-CONTRIBUTORS-BADGE:END -->
</p>

<p align="center">
  <a href="#key-features-">Key Features</a> •
  <a href="#demo-">Demo</a> •
  <a href="#installation-">Installation</a> •
  <a href="#how-to-use-">How To Use</a> •
  <a href="#browsers-support-">Browsers support</a> •
  <a href="#license-">License</a>  •
  <a href="#contributing-">Contributing</a>
</p>

## Key Features ✨

* **Small.** ~ 2.76KB (minified and gzipped). <a href="https://github.com/ai/size-limit">Size Limit</a> controls the size.
* **No dependencies.**
* **Friendly and flexible configuration**
* **Easy to use**
* **Typescript** support
* **Tree shakeable**
* **SSR friendly**

## Demo 👀

### [DEMO](https://webistomin.github.io/favoritos/)

## Installation 🚀

### Using package managers

#### npm
```shell script
$ npm install favoritos --save
```

#### yarn
```shell script
$ yarn add favoritos
```

### via CDN

Add script right before closing `</body>` tag

```html
<script src="https://unpkg.com/favoritos@1.0.0/dist/favoritos.iife.js"></script>
or
<script src="https://cdn.jsdelivr.net/npm/favoritos@1.0.0/dist/favoritos.iife.min.js"></script>
```

_Hint:_ for a better performance add [preconnect](https://css-tricks.com/using-relpreconnect-to-establish-network-connections-early-and-increase-performance/) link in the head of your document. 

```html 
<head>
  <!-- for unkpg cdn --> 
  <link rel="preconnect" href="https://unpkg.com">

  <!-- for jsdelivr cdn -->
  <link rel="preconnect" href="https://cdn.jsdelivr.net">  


  <!-- dns-prefetch only for IE11 --> 
  <!--	<link rel="dns-prefetch" href="https://unpkg.com"> -->
  <!--	<link rel="dns-prefetch" href="https://cdn.jsdelivr.net"> -->
</head>
```

## How to use 🤔

### 1. Initialize favoritos

**Option A: Using ES 2015:**
```js
import Favoritos from 'favoritos';

const favoritos = new Favoritos({
  icon: {
    // Your options
  },
  badge: {
    // Your options
  },
  debug: {
    // Your options
  },
});
```

**Option B: Using CommonJS:**
```js
const Favoritos = require('favoritos');

const favoritos = new Favoritos({
  icon: {
    // Your options
  },
  badge: {
    // Your options
  },
  debug: {
    // Your options
  },
});
```

**Option C: Using CDN:**
```js
/* Favoritos is available from global namespace */
const favoritos = new Favoritos({
  icon: {
    // Your options
  },
  badge: {
    // Your options
  },
  debug: {
    // Your options
  },
});
```

### 2. Add magic to your favicon

#### Options

#### Icon options
<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Default value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>iconSelector</code></td>
      <td><code>'link[rel*="icon"]'</code></td>
      <td>A selector for your favicon where magic will be drawn.</td>
    </tr>
    <tr>
      <td><code>backgroundColor</code></td>
      <td><code>'#d21f3c'</code></td>
      <td>Background color for the icon. Used when rendering the progress bar. May be a string or an array. If an array is passed, a gradient will be drawn.
      </td>
    </tr>
    <tr>
      <td><code>shape</code></td>
      <td><code>'circle'</code></td>
      <td>The shape for the icon. Can take the following values: <code>​​circle</code>, <code>rect</code>.
      </td>
    </tr>
    <tr>
      <td><code>lineWidth</code></td>
      <td><code>4</code></td>
      <td>Line width for your icon.</td>
    </tr>
    <tr>
      <td><code>width</code></td>
      <td><code>32</code></td>
      <td>Width for your icon. Initially, there is the width of a standard favicon.
      </td>
    </tr>
    <tr>
      <td><code>height</code></td>
      <td><code>32</code></td>
      <td>Height for your icon. Initially, there is the height of a standard favicon.
      </td>
    </tr>
  </tbody>
</table>

#### Badge options
<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Default value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fontSize</code></td>
      <td><code>18</code></td>
      <td>Font size of badge text.</td>
    </tr>
    <tr>
      <td><code>backgroundColor</code></td>
      <td><code>'#d21f3c'</code></td>
      <td>Background color for the badge.</td>
    </tr>
    <tr>
      <td><code>fontFamily</code></td>
      <td><code>'Helvetica, Arial, sans-serif'</code></td>
      <td>Font family for the badge text.</td>
    </tr>
    <tr>
      <td><code>shape</code></td>
      <td><code>'circle'</code></td>
      <td>The shape for the icon. Can take the following values: <code>​​circle</code>, <code>rect</code>.
      </td>
    </tr>
    <tr>
      <td><code>position</code></td>
      <td><code>'bottom-right'</code></td>
      <td>Position for your badge. Can take the following values: <code>top-left</code>, <code>top-right</code>, <code>bottom-left</code>, <code>bottom-right</code>.
      </td>
    </tr>
    <tr>
      <td><code>minWidth</code></td>
      <td><code>22</code></td>
      <td>Minimal width for your badge.</td>
    </tr>
    <tr>
      <td><code>minHeight</code></td>
      <td><code>22</code></td>
      <td>Minimal height for your icon.</td>
    </tr>
  </tbody>
</table>

#### Debug options

_Debug mode can be useful if you want to look at the favicon near_

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Default value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>enabled</code></td>
      <td><code>false</code></td>
      <td>Turns debugging on and off.</td>
    </tr>
    <tr>
      <td><code>debugSelector</code></td>
      <td><code>'#favoritos-debug'</code></td>
      <td>Element selector where the canvas will be drawn.</td>
    </tr>
  </tbody>
</table>

## 3. Call methods

**favoritos.drawBadge()**

```js
favoritos.drawBadge('')

favoritos.drawBadge(1)

favoritos.drawBadge(123)
```

Draws a badge on top of the favicon. With an empty string – an empty badge will be drawn. You can also pass numbers.

---

**favoritos.drawImage()**

```js
/* Image example */
const img = document.querySelector('.my-image');
favoritos.drawImage(img)

/* Video example */
const video = document.querySelector('.my-video');
video.addEventListener('play', function () {
function step() {
  favoritos.drawImage(video)
  requestAnimationFrame(step)
}
requestAnimationFrame(step);
})
```

Draws a picture or video instead of your favicon. Takes one argument - the content to be drawn. Image or video **must have** `crossorigin="anonymous"` attribute

---

**favoritos.drawProgress()**

```js
/* Scroll progress example */
document.addEventListener('scroll', () => {
  const root = document.documentElement;
  const scrollTopInPx = root.scrollTop;
  const pageHeightInPx = root.scrollHeight - root.clientHeight;
  const scrollPercent = (scrollTopInPx / pageHeightInPx) * 100;
  const scrollPercentRounded = Math.round(scrollPercent);
  
  favoritos.drawProgressBar(scrollPercentRounded);
})

/* XHR example */
const formData = new FormData();
formData.append('files', /* Your data */);
const xhr = new XMLHttpRequest();

xhr.open('POST', '');
xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

xhr.upload.addEventListener('progress', (event) => {
  if (event.lengthComputable) {
    const complete = (event.loaded / event.total * 100 | 0);
    favoritos.drawProgressBar(complete);
  }
});

xhr.send(formData);
```

Allows you to draw a progress bar instead of your icon. The progress bar shape depends on the option <code>shape</code> passed during library initialization.

The method takes two arguments: <code>progress</code> and  <code>useFavicon</code>. <code>progress</code> indicates how much has already been completed. Value from 0 to 100. <code>useFavicon</code> indicates whether to draw the progress bar on top of the favicon.

---

**favoritos.setOptions()**

```js
/* For example, set icon background color to green if task was done */
favoritos.setOptions({
  icon: {
    backgroundColor: 'green'
  }
})
```

You can change any options for the library. But after the change, you must definitely call the icon renderer with the method of which you use (<code>drawBadge()</code> or <code>drawProgress()</code>).

---

**favoritos.setIcon()**

```js
/* Change favicon on tab change */
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    document.title = 'Hello again! 😀';
    favoritos.setIcon('./on-visible.png')
  } else {
    document.title = 'I miss you! 😭';
    favoritos.setIcon('./on-visible.png')
  }
})

/* Change favicon on theme change */
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
  const newColorScheme = event.matches ? "dark" : "light";
  if (newColorScheme === 'dark') {
    favoritos.setIcon('./dark-favicon.png')
  } else {
    favoritos.setIcon('./light-favicon.png')
  }
});
```

Simply draws a new favicon.

---

**favoritos.reset()**

```js
favoritos.reset();
```

Resets the library to its original state. Draws your default favicon.

---

## Browsers support 🌎


| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/yandex/yandex_48x48.png" alt="Yandex" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Yandex |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| IE11*, Edge 12+| 40+ | 42+ | 10.1+| 10.3+ | 29+| 15.6+


`*` – For IE11 you need to install **Object.assign** polyfill. Also IE11 cannot render base64 icons, so the <code>setIcon</code> method only works there.

If you want to send a polyfill only to browsers that need it, there's a handy service called [Polyfill.io](https://polyfill.io/v3/url-builder/) which does just that, it offers a wide array of polyfills.

Here's an example of using [polyfill.io](https://polyfill.io/v3/url-builder/) to polyfill only the `Object.assign`  feature, so if we put this right before closing `</body>` tag of `index.html` and `Favoritos` script, Polyfill.io will read the user agent and use that information to determine if the browser requires a polyfill for the feature or features listed. Since I'm using Chrome it will send back an empty response since my browser doesn't need it, pretty slick.

```html
<script src="https://polyfill.io/v3/polyfill.min.js?features=Object.assign"></script>
```

## License 📄

### [MIT](https://github.com/webistomin/favoritos/blob/master/LICENSE)

## Contributing 🎉

Found a bug? Missing a specific feature?
Your contributions are always welcome! Please have a look at the [contribution guidelines](https://github.com/webistomin/favoritos/blob/master/CONTRIBUTING.md) first.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/webistomin"><img src="https://avatars0.githubusercontent.com/u/30475699?v=4" width="100px;" alt=""/><br /><sub><b>Alexey Istomin</b></sub></a><br /><a href="#infra-webistomin" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/webistomin/favoritos/commits?author=webistomin" title="Code">💻</a> <a href="#ideas-webistomin" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
