function horizontalLoop(items: HTMLElement[], config: LoopConfig = {}): GSAPTimeline {
  items = gsap.utils.toArray(items);
  config = config || {};
  const tl: GSAPTimeline = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: 'none' },
    onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
  });

  const length: number = items.length;
  const startX: number = items[0].offsetLeft;
  const times: number[] = [];
  const widths: number[] = [];
  const xPercents: number[] = [];
  let curIndex: number = 0;
  const pixelsPerSecond: number = (config.speed || 1) * 100;
  const snap: (value: number) => number = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1);

  gsap.set(items, {
    xPercent: (i: number, el: HTMLElement): number => {
      const w: number = widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px') as string);
      xPercents[i] = snap(
        parseFloat(gsap.getProperty(el, 'x', 'px') as string) / w * 100 +
        parseFloat(gsap.getProperty(el, 'xPercent') as string)
      );
      return xPercents[i];
    },
  });

  gsap.set(items, { x: 0 });

  const totalWidth: number =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth * parseFloat(gsap.getProperty(items[length - 1], 'scaleX') as string) +
    (parseFloat(config.paddingRight as any) || 0);

  for (let i = 0; i < length; i++) {
    const item: HTMLElement = items[i];
    const curX: number = (xPercents[i] / 100) * widths[i];
    const distanceToStart: number = item.offsetLeft + curX - startX;
    const distanceToLoop: number = distanceToStart + widths[i] * parseFloat(gsap.getProperty(item, 'scaleX') as string);

    tl.to(
      item,
      {
        xPercent: snap((curX - distanceToLoop) / widths[i] * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100),
        },
        {
          xPercent: xPercents[i],
          duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add('label' + i, distanceToStart / pixelsPerSecond);

    times[i] = distanceToStart / pixelsPerSecond;
  }

  interface Vars {
    modifiers?: { time: (t: number) => number };
    overwrite?: boolean;
    [key: string]: any;
  }

  function toIndex(index: number, vars: Vars = {}): GSAPTween {
    vars = vars || {};
    if (Math.abs(index - curIndex) > length / 2) {
      index += index > curIndex ? -length : length;
    }
    const newIndex: number = gsap.utils.wrap(0, length, index);
    let time: number = times[newIndex];

    if (time > tl.time() !== index > curIndex) {
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }

    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }

  tl.next = (vars: Vars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars: Vars) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index: number, vars: Vars) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true);

  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }

  return tl;
}