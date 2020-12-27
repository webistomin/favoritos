---
title: favoritos
description: Make your favicon great again!
features:
- title: 🍤 Tiny
  details: Small footprint ~ 2kb which makes your apps faster to load
- title: 🦾 DX Friendly
  details: Written in TypeScript
- title: 🍞 Easy to use
  details: It's easy to use and has many options to customize
--- 

## Quick Setup

### Installation 🚀

```bash
# install with yarn
yarn add favoritos

# install with npm
npm install favoritos --save
```

Or use a CDN

```html
<script src="https://unpkg.com/favoritos@1.0.1/dist/favoritos.iife.js"></script>
or
<script src="https://cdn.jsdelivr.net/npm/favoritos@1.0.1/dist/favoritos.iife.js"></script>
```

> Hint: for a better performance add preconnect link in the head of your document.

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

### Usage 🤔

#### 1. Initialize `favoritos`

##### Option A: Using ES 2015:

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

##### Option B: Using CommonJS:

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

##### Option C: Using CDN:

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

#### 2. Add magic to your favicon

##### Options

###### **Icon options**
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
      <td>The shape for the icon. Can take the following values: <code>circle</code>, <code>rect</code>.
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

###### **Badge options**
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
      <td>The shape for the icon. Can take the following values: <code>circle</code>, <code>rect</code>.
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

###### **Debug options**

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

#### 3. Call methods

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



