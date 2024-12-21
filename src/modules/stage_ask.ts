import observe_class from '../utils/class_observer';
import gsap from 'gsap';
import '../styles/stage_ask.scss';

const stage_ask = document.querySelector('#stage_ask') as HTMLElement;
// const asking = stage_ask.querySelector('.asking') as HTMLElement;

const splitText = [...stage_ask.querySelectorAll('.asking div')] as HTMLElement[];
const nav = stage_ask.querySelector('.stage_nav') as HTMLElement;
const yes = nav.querySelector('.yes') as HTMLElement;
const no = nav.querySelector('.no') as HTMLElement;

const next_stage = document.querySelector('#stage_blue') as HTMLElement;

observe_class(stage_ask, start);

function finish() {
  stage_ask.remove();
  next_stage.classList.add('active');
}

function startAnimation(splitText: HTMLElement[]) {
  gsap.to(splitText, {
    duration: 1,
    repeat: -1,
    yoyo: true,
    stagger: { each: 0.2, repeat: -1, yoyo: true },
    ease: 'sine.in',
    yoyoEase: 'sine.in',
    y: 20,
  });
}

function start() {
  const tl = gsap.timeline();

  yes.addEventListener('click', finish);
  no.addEventListener('click', finish);

  tl.from(splitText, {
    stagger: { amount: 1.5 },
    alpha: 0,
    y: 20,
    rotateZ: -15,
    duration: 2,
    onComplete() {
      startAnimation(splitText);
    },
  }).from(nav, {
    alpha: 0,
    y: -10,
    ease: 'power4.out',
    duration: 1.5,
  });
}
