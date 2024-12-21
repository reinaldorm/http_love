import observe_class from '../utils/class_observer';
import gsap from 'gsap';
import '../styles/stage_ask.scss';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const stage_ask = document.querySelector('#stage_ask') as HTMLElement;
const asking = stage_ask.querySelector('.asking') as HTMLElement;

const nav = stage_ask.querySelector('.stage_nav') as HTMLElement;
const yes = nav.querySelector('.yes') as HTMLElement;
const no = nav.querySelector('.no') as HTMLElement;

observe_class(stage_ask, start);

function finish() {}

function startAnimation(splitText: SplitText) {
  gsap.to(splitText.chars, {
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
  const splitText = new SplitText(asking, { type: 'chars' });

  finish();

  const tl = gsap.timeline();

  yes.addEventListener('click', finish);
  no.addEventListener('click', finish);

  tl.from(splitText.chars, {
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