import observe_class from '../utils/class_observer';
import gsap from 'gsap';
import '../styles/stage_blue.scss';
import { TextPlugin } from 'gsap/TextPlugin';

const stage_blue = document.querySelector('#stage_blue') as HTMLElement;

const top = stage_blue.querySelector('.top') as HTMLElement;
const middle = stage_blue.querySelector('.middle') as HTMLElement;
const bottom = stage_blue.querySelector('.bottom') as HTMLElement;
const wrapper = stage_blue.querySelector('.wrapper') as HTMLElement;

gsap.registerPlugin(TextPlugin);

observe_class(stage_blue, start);

function start() {
  const tl = gsap.timeline();

  console.log('should');

  tl.from(stage_blue, {
    x: 10,
    y: 10,
    ease: 'elastic',
    duration: 1,
  })
    .to(top, { text: ':)', duration: 0 })
    .from(top, {
      x: 10,
      y: 10,
      ease: 'elastic',
      duration: 1,
    })
    .to(middle, {
      text: 'Depois de tudo isso, só espero que você saiba o quanto é especial para mim e o quanto quero construir algo lindo ao seu lado.',
      delay: 1,
      duration: 2,
      ease: 'none',
    })
    .to(bottom, {
      text: 'Você é especial de um jeito que transforma meus dias, e tudo o que eu quero é estar ao seu lado, vivendo algo único e verdadeiro.',
      duration: 2,
      delay: 1,
      ease: 'none',
    })
    .from(wrapper, {
      alpha: 0,
      onStart() {
        wrapper.classList.add('active');
      },
    });
}
