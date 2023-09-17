import anime from 'animejs';

export const events = [
  {
    age: 'Neolithic era',
    date: '10 000 <span>BC</span>',
    content: [
      {
        img: '../assets/test.png',
        label: 'Transition from hunting and gathering to agriculture',
      },
      {
        img: '../assets/test.png',
        label: 'Transition from hunting and gathering to agriculture',
      },
    ],
  },
  {
    age: 'Neolithic era',
    date: '5 000 <span>BC</span>',
    content: [
      {
        img: '../assets/test.png',
        label: 'Transition from hunting and gathering to agriculture',
      },
      {
        img: '../assets/test.png',
        label: 'Transition from hunting and gathering to agriculture',
      },
    ],
  },
  {
    age: 'Neolithic era',
    date: '2 000 <span>BC</span>',
    content: [
      {
        img: '../assets/test.png',
        label: 'Transition from hunting and gathering to agriculture',
      },
      {
        img: '../assets/test.png',
        label: 'Transition from hunting and gathering to agriculture',
      },
    ],
  },
  {
    age: 'New era',
    date: '1000 <span>year</span>',
    content: [
      {
        img: '../assets/test.png',
        label: 'Transition from hunting and gathering to agriculture',
      },
      {
        img: '../assets/test.png',
        label: 'Transition from hunting and gathering to agriculture',
      },
    ],
  },
];

export const mountEvents = () => {
  events.forEach((el, i) => {
    const event = document.createElement('div');
    event.className = 'event';

    const date = document.createElement('div');
    date.className = 'event-date';
    date.innerHTML = el.date;
    event.appendChild(date);

    const pointer = document.createElement('div');
    pointer.className = 'event-pointer';
    event.appendChild(pointer);

    const content = document.createElement('div');
    content.className = 'event-content';
    event.appendChild(content);

    el.content.forEach(({ img, label }) => {
      const div = document.createElement('div');
      div.className = 'event-content__item';

      const $img = document.createElement('img');
      $img.src = img;
      div.appendChild($img);

      const $text = document.createElement('div');
      $text.className = 'event-content__item-text';
      $text.textContent = label;
      div.appendChild($text);

      content.appendChild(div);
    });

    document.querySelector('.wrapper-scroll').append(event);
  });

  const timeline = document.createElement('div');
  timeline.className = 'timeline';
  document.querySelector('.wrapper-scroll').append(timeline);
};

export const changeAge = (newAge) => {
  // HTML
  const wrap = document.createElement('div');
  wrap.className = 'age-item new';

  newAge.split('').forEach((l) => {
    if (l === ' ') {
      const div = document.createElement('div');
      wrap.appendChild(div);
      return;
    }
    const span = document.createElement('span');
    span.textContent = l;
    span.style.transform = 'translateY(100px)';
    wrap.appendChild(span);
  });

  document.querySelector('.age').appendChild(wrap);

  // Anime
  anime({
    targets: document.querySelectorAll('.age-item.active > *'),
    translateY: -100,
    duration: 300,
    delay: anime.stagger(30),
    easing: 'easeOutCubic',
  });

  anime({
    targets: document.querySelectorAll('.age-item.new > *'),
    translateY: 0,
    duration: 300,
    delay: anime.stagger(30),
    easing: 'easeOutCubic',
  });

  setTimeout(() => {
    document.querySelector('.age-item.active').remove();
    const $new = document.querySelector('.age-item.new');
    $new.classList.remove('new');
    $new.classList.add('active');
  }, 350);
};
