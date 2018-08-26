## Memory Game for Educational Purpose

> This is a pure JavaScript practice without any frameworks, no compilers, no boilerplate, and no libraries.

![screenshot](https://jaej09.github.io/MemoryGame-VanillaJS/img/screenshot.png)

View demo [here](https://jaej09.github.io/MemoryGame-VanillaJS/index.html)

### All about features
- Added a real-time in-browser editor with the HTML5′s contenteditable attribute.
- Playing Mechanical keyboard sound effect when pressing key on your keyboard.
- Prevent delaying when pressing key multiple times.
```
  function playSound(e) {
    audio.currentTime = 0;
    audio.play();
  }
```
