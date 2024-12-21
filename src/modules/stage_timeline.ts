import observe_class from '../utils/class_observer';
import gsap from 'gsap';
import '../styles/stage_timeline.scss';

const stage_timeline = document.querySelector('#stage_timeline') as HTMLElement;

const timeline_top = stage_timeline.querySelector('.timeline_top') as HTMLElement;
const photo_array = [...timeline_top.querySelectorAll('.photo')] as HTMLElement[];

const timeline_bottom = stage_timeline.querySelector('.timeline_bottom') as HTMLElement;
const timeline_button = timeline_bottom.querySelector('.timeline_button') as HTMLElement;
const timeline = timeline_bottom.querySelector('.timeline') as HTMLElement;
const timeline_legend = timeline_bottom.querySelector('.timeline_legend') as HTMLElement;
const timeline_points = [...timeline_bottom.querySelectorAll('.timeline_point')] as HTMLElement[];

const next_stage = document.querySelector('#stage_ask') as HTMLElement;

observe_class(stage_timeline, start);

let step = 3;
let max_steps = 4;
let can_forward = false;

function update_step() {
  step += 1;

  if (step === max_steps) {
    const tl = gsap.timeline();

    tl.to(photo_array, {
      duration: 1.5,
      ease: 'power4.inOut',
      rotateZ: -90,
      scale: 0,
      onComplete() {},
    })
      .to(
        timeline,
        {
          width: 0,
          duration: 1.5,
          ease: 'power4.inOut',
        },
        '-=1'
      )
      .to(
        timeline_legend,
        {
          alpha: 0,
          onComplete() {
            stage_timeline.classList.remove('active');
            finish();
          },
        },
        '-=0.5'
      );
  } else {
    const tl = gsap.timeline({ defaults: { stagger: { amount: 2 } } });

    can_forward = false;

    setTimeout(() => timeline_points[step].classList.add('active'), 2250);

    gsap.to(timeline, {
      '--progress': step * 33,
      duration: 3,
      ease: 'power4.inOut',
    });

    tl.to(photo_array, {
      duration: 1.5,
      ease: 'power4.inOut',
      rotateY: -90,
      alpha: 0,
      onComplete() {
        photo_array.forEach((p, idx) => {
          const outer = p.querySelector('.outer') as HTMLImageElement;
          const inner = p.querySelector('.inner img') as HTMLImageElement;

          outer.src = `/timeline/timeline_${step}_${idx}.png`;
          inner.src = `/timeline/photos/${step}_${idx}.jpg`;
        });
      },
    })
      .to(photo_array, {
        duration: 1.5,
        ease: 'power4.inOut',
        rotateY: 0,
        alpha: 1,
        onComplete() {
          can_forward = true;
        },
      })
      .to(
        timeline_button,
        {
          keyframes: {
            x: [-10, 0],
          },
          alpha: 1,
          duration: 1.5,
          ease: 'power4.out',
        },
        '-=1'
      );
  }
}

function start() {
  timeline_button.addEventListener('click', () => {
    if (can_forward) {
      update_step();

      gsap.to(timeline_button, {
        x: 10,
        alpha: 0,
        duration: 1.5,
        ease: 'power4.out',
      });
    }
  });

  const tl = gsap.timeline();

  tl.from(photo_array, {
    stagger: {
      amount: 1,
    },
    duration: 1,
    ease: 'power4.inOut',
    rotateY: -90,
    alpha: 0,
  })
    .from(
      timeline,
      {
        width: 0,
        ease: 'power4.inOut',
        duration: 2,
      },
      '-=0.5'
    )
    .from(
      timeline_legend,
      {
        alpha: 0,
        ease: 'power4',
        duration: 1.5,
        onComplete() {
          can_forward = true;
        },
      },
      '-=0.75'
    )
    .from(
      timeline_button,
      {
        scale: 0,
        x: -10,
        ease: 'power4.inOut',
        duration: 1.5,
      },
      '-=2'
    );
}

function finish() {
  next_stage.classList.add('active');
}
