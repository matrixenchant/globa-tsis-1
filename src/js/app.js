import { DragGesture } from '@use-gesture/vanilla';
import anime from 'animejs';
import '../sass/main.scss';
import { changeAge, events, mountEvents } from './mount';

mountEvents()

const $scroll = document.querySelector('.wrapper-scroll');
const setX = (x) => {
  anime({
    targets: $scroll,
    translateX: x,
  });
};

const eventWidth = window.innerWidth * 0.9;
const eventGap = 200;

document.querySelector('.timeline').style.left = `${eventWidth / 2}px`;
document.querySelector('.timeline').style.width = `${eventWidth * (events.length - 1) + ((events.length - 1) * eventGap)}px`;
setX((window.innerWidth - eventWidth) / 2);

let activeEvent = 0;
let disabled = false;

const gesture = new DragGesture($scroll, ({ active, movement: [mx, my] }) => {
  if (disabled) return;

  $scroll.style.cursor = 'grabbing';

  if (!active && mx !== 0) {
    const prevEvent = events[activeEvent];

    if (mx < -100) activeEvent++;
    if (mx > 100) activeEvent--;

    const event = events[activeEvent];

    if (prevEvent?.age !== event?.age) {
      changeAge(event.age);
    }

    $scroll.style.cursor = 'grab';
    disabled = true;
    setTimeout(() => {
      disabled = false;
    }, 450);
  }

  const offset = (window.innerWidth - eventWidth) / 2 + (-activeEvent * eventWidth) + (-eventGap * activeEvent);

  anime({
    targets: $scroll,
    translateX: active ? offset + mx : offset,
    duration: active ? 0 : 400,
    easing: 'easeOutCubic',
  });
});
