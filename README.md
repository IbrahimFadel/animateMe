# Quick Animations

Quick Animations is a css animations library.

## Installation

Download this project as [zip](https://github.com/IbrahimFadel/quickAnims/tree/master/dist)

## Usage

Include the quickAnims.css file:

```html
<link rel="stylesheet" type="text/css" href="dist/quickAnims.css">
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
