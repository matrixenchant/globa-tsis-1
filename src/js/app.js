import { ScrollGesture } from '@use-gesture/vanilla';
import anime from 'animejs';
import '../sass/main.scss';
import './map';
import { changeAge, events, mountEvents } from './mount';
import { animateMap } from './map';
mountEvents();

const getRectByIndex = (i) => {
  return document.querySelector(`.event:nth-child(${i})`).getBoundingClientRect();
};

const init = () => {
  const $scroll = document.querySelector('.wrapper-scroll');
  const firstEventWidth = getRectByIndex(1).width;

  // Init Styles
  document.querySelector('.timeline').style.left = `${
    (window.innerWidth - firstEventWidth) / 2 + firstEventWidth / 2
  }px`;
  document.querySelector('.timeline').style.width = `${getRectByIndex(events.length).x}px`;

  document.querySelector(`.event:nth-child(1)`).style.marginLeft = `${
    (window.innerWidth - firstEventWidth) / 2
  }px`;
  const maxScrollX = $scroll.getBoundingClientRect().width - window.innerWidth * 0.6;

  // Observer
  function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
      }
    });
  }

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.0,
  };

  const observer = new IntersectionObserver(handleIntersection, options);
  const targetElement = document
    .querySelectorAll('.event-pointer')
    .forEach((el) => observer.observe(el));

  // Scroll Handler
  let age = 'Neolithic era';

  const scroll = new ScrollGesture(window, ({ xy: [x, y] }) => {
    const progressScroll = y / (document.body.scrollHeight - window.innerHeight);

    const targetX = maxScrollX * progressScroll;

    animateMap(progressScroll)

    for (let i = 0; i < events.length; i++) {
      const { x } = document
        .querySelector(`.event:nth-child(${i + 1})`)
        .querySelector('.event-pointer')
        .getBoundingClientRect();

      const center = window.innerWidth * 0.5;
      if (center - window.innerWidth * 0.2 <= x && x <= center + window.innerWidth * 0.2) {
        const event = events[i];

        if (event.age !== age) {
          console.log('change age to: ', event.age);
          changeAge(event.age);
          age = event.age;
        }
      }
    }

    anime({
      targets: $scroll,
      translateX: -targetX,
      duration: 0,
    });
  });

  window.dispatchEvent(new CustomEvent('scroll'));
};

setTimeout(init, 100);
