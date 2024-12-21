import gsap from 'gsap';
import '../styles/stage_start.scss';

const stage_start = document.querySelector('#stage_start') as HTMLElement;
const start_button = document.querySelector('.start_button') as HTMLElement;
const start_heart = document.querySelector('.start_heart') as HTMLElement;

const next_stage = document.querySelector('#stage_loading') as HTMLElement;

start_button.addEventListener('click', start);

function start() {
  start_button.removeEventListener('click', start);
  start_button.classList.add('pressed');
  const tl = gsap.timeline();

  setTimeout(() => {
    {
      next_stage.classList.add('active');
      stage_start.remove();
    }
  }, 3000);

  tl.to(start_button, {
    '--heart_fill': '#F0A8D0',
    '--shadow_y': 0.25,
    duration: 1,
    y: 10,
    ease: 'power4',
  }).to(start_heart, {
    scale: 100,
    duration: 2,
    ease: 'power4.inOut',
  });
}

// debug
