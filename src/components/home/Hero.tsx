import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { GalleryImage } from '@/components/gallery/GalleryImage';
import { business } from '@/data/business';
import { heroSlides } from '@/data/media';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';
import { en } from '@/i18n/en';

/**
 * Moving white dots joined by lines within 150px, drifting outward, drawn
 * toward the cursor within 400px. Static under reduced motion.
 */
function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    type Dot = { x: number; y: number; vx: number; vy: number; r: number };
    let dots: Dot[] = [];
    let raf = 0;
    const mouse = { x: -1e4, y: -1e4 };

    const size = () => {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      const count = Math.round((canvas.width * canvas.height) / 800 / 12);
      dots = Array.from({ length: Math.min(80, Math.max(30, count)) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        r: 1 + Math.random() * 2.5,
      }));
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(parent);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -1e4;
      mouse.y = -1e4;
    };
    parent.addEventListener('pointermove', onMove);
    parent.addEventListener('pointerleave', onLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const d of dots) {
        if (!reduced) {
          d.x += d.vx;
          d.y += d.vy;
          if (d.x < -10) d.x = canvas.width + 10;
          if (d.x > canvas.width + 10) d.x = -10;
          if (d.y < -10) d.y = canvas.height + 10;
          if (d.y > canvas.height + 10) d.y = -10;
        }
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fill();
      }
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        if (!a) continue;
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          if (!b) continue;
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 150) {
            ctx.strokeStyle = `rgba(255,255,255,${(0.4 * (1 - dist / 150)).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < 400) {
          ctx.strokeStyle = `rgba(255,255,255,${(0.6 * (1 - md / 400)).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      parent.removeEventListener('pointermove', onMove);
      parent.removeEventListener('pointerleave', onLeave);
    };
  }, [reduced]);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}

const pill =
  'inline-flex min-w-[100px] items-center justify-center rounded-full border-2 border-ink bg-ink px-5 py-3 text-[16px] text-[#EDEDED] transition-colors duration-instant hover:border-[#A8A8A8] hover:bg-[#A8A8A8] hover:text-[#232323]';

/**
 * Hero slider: two photographs fading every five seconds behind a title in a
 * black label, a one-line subtitle, and on the second slide two pill buttons.
 * A white curve crosses the top edge and particles drift over the image.
 */
export function Hero() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const slides = en.home.slides;

  useEffect(() => {
    if (reduced || heroSlides.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), 5000);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <section
      className="relative h-[calc(100vh-4.5rem)] min-h-[32rem] overflow-hidden bg-ink supports-[height:100svh]:h-[calc(100svh-4.5rem)] [@media(max-height:480px)]:min-h-[22rem] [@media(max-height:480px)]:h-[calc(100svh-3.5rem)]"
      aria-label={en.home.headline}
    >
      {heroSlides.map((s, i) => (
        <div
          key={s.image.id}
          aria-hidden={i !== index}
          className={cn('absolute inset-0 transition-opacity duration-scene ease-soft', i === index ? 'opacity-100' : 'opacity-0')}
        >
          <div key={i === index ? 'on' : 'off'} className={cn('h-full w-full', i === index && !reduced && 'animate-slide-zoom')}>
            <GalleryImage image={s.image} sizes="100vw" priority={i === 0} className="h-full w-full" />
          </div>
        </div>
      ))}

      <Particles />

      <svg aria-hidden="true" className="absolute left-0 top-0 h-[50px] w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M0 0 C50 100 50 100 100 0 L100 0 0 0" fill="#ffffff" />
      </svg>

      {slides.map((s, i) => (
        <div
          key={s.title}
          aria-hidden={i !== index}
          className={cn('absolute left-0 top-1/2 w-full -translate-y-1/2 px-[10%] text-center transition-opacity duration-slow', i === index ? 'opacity-100' : 'pointer-events-none opacity-0')}
        >
          {/* The first slide's title is the page's single H1; later slides repeat it as H2. */}
          {i === 0 ? (
            <h1 key={`t${i === index ? 'on' : 'off'}`} className={cn('text-[26px] font-normal leading-[30px] text-[#D8D8D8] sm:text-[40px] sm:leading-[54px]', i === index && !reduced && 'animate-rise')}>
              <span className="bg-ink px-[10px]">{s.title}</span>
              <span className="sr-only"> — {en.home.h1Suffix}</span>
            </h1>
          ) : (
            <h2 key={`t${i === index ? 'on' : 'off'}`} className={cn('text-[26px] font-normal leading-[30px] text-[#D8D8D8] sm:text-[40px] sm:leading-[54px]', i === index && !reduced && 'animate-rise')}>
              <span className="bg-ink px-[10px]">{s.title}</span>
            </h2>
          )}
          <p key={`s${i === index ? 'on' : 'off'}`} className={cn('hero-subtitle my-[15px] text-[16px] text-ink', i === index && !reduced && 'animate-rise-late')}>
            {s.subtitle}
          </p>
          {s.buttons && (
            <div key={`b${i === index ? 'on' : 'off'}`} className={cn('mt-2 flex flex-wrap justify-center gap-[10px]', i === index && !reduced && 'animate-rise-later')}>
              <Link to="/" className={cn(pill, 'min-h-[44px]')}>
                {business.shortName.toUpperCase()}
              </Link>
              <a href={`mailto:${business.email}`} className={cn(pill, 'min-h-[44px]')}>
                {en.actions.emailUs.toUpperCase()}
              </a>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
