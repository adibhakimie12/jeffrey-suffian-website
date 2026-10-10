import { useEffect, useState } from 'react';

const words = ['Audit', 'Tax', 'Advisory'];

export function HeroTypingWord() {
  // Keep the first client render identical to the prerendered HTML.
  const [text, setText] = useState(words[0]);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: ReturnType<typeof setTimeout>;
    let word = 0;
    let length = words[0].length;
    let deleting = true;
    function tick() {
      const current = words[word];
      length += deleting ? -1 : 1;
      setText(current.slice(0, length));
      let delay = deleting ? 65 : 120;
      if (length === 0) {
        word = (word + 1) % words.length;
        deleting = false;
        delay = 240;
      } else if (length === current.length && !deleting) {
        deleting = true;
        delay = 1800;
      }
      timer = setTimeout(tick, delay);
    }
    function restart() {
      clearTimeout(timer);
      word = 0;
      length = words[0].length;
      deleting = true;
      setText(words[0]);
      if (!preference.matches) timer = setTimeout(tick, 1800);
    }
    restart();
    preference.addEventListener('change', restart);
    return () => { clearTimeout(timer); preference.removeEventListener('change', restart); };
  }, []);

  return <span aria-hidden="true" className="hero-typing-word mt-1.5 inline-flex min-w-[8.4ch] items-baseline whitespace-nowrap bg-gradient-to-r from-signature-red via-signature-red to-signature-yellow bg-clip-text text-[0.8em] leading-[0.92] text-transparent sm:text-[0.76em]"><span>{text}</span><span className="hero-typing-cursor ml-[0.08em] inline-block h-[0.84em] w-[0.055em] translate-y-[0.08em] rounded-full bg-signature-red" /></span>;
}
