# AnimateMe

AnimateMe is an animation library i made for CSS and JS

## TODO

CSS

1. Support for combining animation
2. Delay

JS

1. Chain animations with .then

## Demo

View Demo [here](https://animateme.ibrahimfadel.com)

## Installation

Download this project as [zip](https://github.com/IbrahimFadel/quickAnims/tree/master/dist)

## Usage

### JS

Include the animateMe.js or animateMe.min.js file:

```html
<script src="dist/js/animateMe.js"></script>
```

To apply an animation:

```js
animateMe({
  targets: ".targetElement #otherTarget",
  animations: {
    translateX: {
      value: "300px"
    },
    skewX: {
      value: "30deg"
    }
  },
  infinite: false,
  delay: 1000,
  duration: "2s",
  easing: "linear"
});
```

### CSS

Include the animateMe.css file:

```html
<link rel="stylesheet" type="text/css" href="dist/css/animateMe.css">
```

To apply the animation give the element the 'animateMe' class:

```html

<h1 class="animateMe">Hello, World!</h1>

```

Then select any of the following animatations to add to the classList:

| Animation Name |
|-----------|
| `bounce` |
| `jiggle` |
| `fadeIn` |
| `fadeInSlow` |
| `haltingStopRight` |
| `rotClock` |
| `rotCounterClock` |
| `slideInRight` |
| `slideInLeft` |
| `slideInUp` |
| `slideInDown` |
| `squeeze` |
| `flipInLeft` |
| `flipInRight` |
| `zoomOutLeft` |
| `zoomOutRight` |
| `flipX` |
| `flipY` |

and add one to the class list:

```html
<h1 class="animateMe squeeze">Hello, World!</h1>
```

If you want it to repeat forever, add the infinite class:

```html
<h1 class="animateMe infinite squeeze">Hello, World!</h1>
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
