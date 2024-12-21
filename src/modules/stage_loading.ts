import observe_class from '../utils/class_observer';
import gsap from 'gsap';
import '../styles/stage_loading.scss';

const stage_loading = document.querySelector('#stage_loading') as HTMLElement;
const loading_key = document.querySelector('.loading_key') as HTMLElement;
const loading_bar = document.querySelector('.loading_bar') as HTMLElement;
const loading_legend = document.querySelector('.loading_legend') as HTMLElement;
const loading_outer = document.querySelector('.loading_outer') as HTMLElement;
const loading_inner = document.querySelector('.loading_inner') as HTMLElement;
const timeline_starter = document.querySelector('.timeline_starter') as HTMLElement;
const starting_legend = document.querySelector('.starting_legend') as HTMLElement;

let loading_key_rect: DOMRect;
let loading_outer_rect: DOMRect;

observe_class(stage_loading, start);

const next_stage = document.querySelector('#stage_timeline') as HTMLElement;

const max_presses = 30;
let presses = 0;

function animate_heart(loading_heart: HTMLElement) {
  const tl = gsap.timeline();

  const finalX = loading_outer_rect.left + 300 - 32;
  const finalY = loading_outer_rect.top;

  tl.to(loading_heart, {
    top: gsap.utils.random(['+=50', '-=50']),
    left: gsap.utils.random(['+=100', '-=100']),
    duration: 1,
    ease: 'power4.out',
    onComplete: animate_bar,
  }).to(
    loading_heart,
    {
      x: 0,
      left: finalX,
      top: finalY,
      duration: 1,
      ease: 'power4.inOut',
    },
    '-=0.5'
  );

  gsap.to(loading_heart, {
    scale: 0,
    duration: 0.5,
    delay: 1,
    ease: 'power4.inOut',
  });
}

function create_heart() {
  const loading_heart = document.createElement('img');
  loading_heart.classList.add('loading_heart');
  loading_heart.src = '/heart.svg';

  stage_loading.appendChild(loading_heart);

  loading_heart.style.left = `${loading_key_rect.left + loading_key_rect.width / 2 - 16}px`;
  loading_heart.style.top = `${loading_key_rect.top + loading_key_rect.height / 2 - 16}px`;

  animate_heart(loading_heart);
}

function animate_key() {
  gsap.to(loading_key, {
    duration: 0.5,
    keyframes: {
      y: [0, 10, 0],
      '--shadowY': [0.75, 0.35, 0.75],
      ease: 'power4.out',
    },
  });
}

function animate_bar() {
  gsap.to(loading_inner, {
    xPercent: `+=${100 / max_presses}`,
    duration: 0.5,
    ease: 'power4.out',
  });
}

function press(ev: KeyboardEvent) {
  if (ev.code === 'Space') {
    if (presses === 0) loading_key.classList.remove('inactive');

    presses += 1;

    if (presses >= max_presses) finish();

    animate_key();
    create_heart();
  }
}

function start() {
  document.body.style.backgroundColor = '#F0A8D0';

  loading_key_rect = loading_key.getBoundingClientRect();
  loading_outer_rect = loading_outer.getBoundingClientRect();

  const tl = gsap.timeline({ onComplete: () => window.addEventListener('keyup', press) });

  tl.from(loading_key, {
    y: 25,
    ease: 'power4.out',
    scale: 0.75,
    alpha: 0,
    duration: 1.5,
  })
    .from(
      loading_bar,
      {
        y: 25,
        ease: 'elastic',
        scale: 0.75,
        alpha: 0,
        duration: 1.5,
      },
      '-=1.25'
    )
    .from(
      loading_legend,
      {
        y: 25,
        ease: 'elastic',
        scale: 0.75,
        alpha: 0,
        duration: 1.5,
      },
      '-=1.25'
    );
}

function finish() {
  window.removeEventListener('keyup', press);

  const tl = gsap.timeline();

  //clear actual stage

  gsap.killTweensOf(loading_inner);

  const actual_pos = timeline_starter.getBoundingClientRect();

  starting_legend.style.left = `${actual_pos.left}px`;
  starting_legend.style.top = `${actual_pos.top}px`;
  starting_legend.classList.add('starting');

  tl.to(loading_inner, {
    xPercent: 100,
    duration: 2,
    ease: 'power1',
  })
    .to(loading_key, {
      alpha: 0,
    })
    .to(
      loading_bar,
      {
        alpha: 0,
      },
      '-=1'
    )
    .to(
      loading_legend,
      {
        alpha: 0,
      },
      '-=1'
    )
    .to(starting_legend, {
      left: '50%',
      top: '50%',
      scale: 2,
      duration: 1,
      ease: 'power4',
      onComplete: start_typing,
    });

  //start next
}

function start_typing() {
  setTimeout(() => {
    starting_legend.textContent += ' ';
  }, 100);

  setTimeout(() => {
    starting_legend.textContent += 'é';
  }, 400);

  setTimeout(() => {
    starting_legend.textContent += '.';
  }, 700);

  setTimeout(() => {
    starting_legend.textContent += '.';
  }, 1000);

  setTimeout(() => {
    starting_legend.textContent += '.';

    gsap.to(starting_legend, {
      alpha: 0,
      delay: 1,
      duration: 1,
      onComplete() {
        stage_loading.classList.remove('active');
        next_stage.classList.add('active');
      },
    });
  }, 1300);
}
