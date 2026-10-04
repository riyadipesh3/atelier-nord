import { useEffect, useRef, useState, type ReactNode } from 'react'

/* Shared primitives. Scroll reveal uses IntersectionObserver, never a scroll
   listener, and collapses to fully visible under prefers-reduced-motion. */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* Sections: heading stacks vertically, never split-header */
function SectionHead({
  kicker,
  title,
  body,
}: {
  kicker?: string
  title: string
  body?: string
}) {
  return (
    <div className="max-w-2xl">
      {kicker ? <p className="micro mb-5">{kicker}</p> : null}
      <h2 className="display display-md">{title}</h2>
      {body ? <p className="lede mt-6">{body}</p> : null}
    </div>
  )
}

const WORK = [
  {
    client: 'Fenwick Coffee',
    scope: 'Brand system, storefront',
    year: '2025',
    seed: 'atelier-fenwick-coffee-brand',
  },
  {
    client: 'Loam Studio',
    scope: 'Site build, design system',
    year: '2025',
    seed: 'atelier-loam-studio-web',
  },
  {
    client: 'Mercer & Wilde',
    scope: 'Campaign, art direction',
    year: '2024',
    seed: 'atelier-mercer-wilde-campaign',
  },
]

const CAPABILITIES = [
  {
    n: '01',
    title: 'Brand identity',
    body: 'Marks, type systems, and colour built to survive contact with real production.',
  },
  {
    n: '02',
    title: 'Web design',
    body: 'Layout and interaction designed in the browser, not handed over from a slide.',
  },
  {
    n: '03',
    title: 'Front-end build',
    body: 'Accessible, fast builds with clean semantic markup and no visual regressions.',
  },
  {
    n: '04',
    title: 'Design systems',
    body: 'Token sets and components your team can extend without calling us each sprint.',
  },
]

/* Client marks are drawn as inline SVG monograms rather than text wordmarks,
   so the strip reads as a logo wall instead of a list of names. */
const CLIENTS = [
  { name: 'Fenwick Coffee', mark: 'F' },
  { name: 'Loam Studio', mark: 'L' },
  { name: 'Mercer & Wilde', mark: 'M' },
  { name: 'Halden Group', mark: 'H' },
  { name: 'Pallas Press', mark: 'P' },
  { name: 'Rowan Supply', mark: 'R' },
]

export default function App() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--color-ink)] focus:px-4 focus:py-2 focus:text-[var(--color-canvas)]"
      >
        Skip to content
      </a>

      {/* ---------------------------------------------------------------- */}
      {/* NAV - single line at desktop, 72px                              */}
      {/* ---------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 border-b border-[var(--color-hairline)] bg-[var(--color-canvas)]/92 backdrop-blur-sm">
        <div className="shell flex h-[72px] items-center justify-between">
          <a
            href="#top"
            className="font-display text-[1.0625rem] font-bold tracking-[-0.03em] text-[var(--color-ink)]"
          >
            Atelier Nord
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {['Work', 'Capabilities', 'Studio', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[0.875rem] font-medium text-[var(--color-body)] transition-colors hover:text-[var(--color-ink)]"
              >
                {item}
              </a>
            ))}
          </nav>

          <a href="#contact" className="btn btn-primary hidden md:inline-flex">
            Start a project
          </a>

          <button
            type="button"
            aria-label={navOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={navOpen}
            aria-controls="mobile-nav"
            onClick={() => setNavOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center border border-[var(--color-hairline)] text-[var(--color-ink)] md:hidden"
          >
            <span className="flex w-4 flex-col gap-[4px]">
              <span
                className={`h-px w-full bg-[var(--color-ink)] transition-transform duration-200 ${
                  navOpen ? 'translate-y-[2.5px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-px w-full bg-[var(--color-ink)] transition-transform duration-200 ${
                  navOpen ? '-translate-y-[2.5px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>

        {navOpen ? (
          <div id="mobile-nav" className="border-t border-[var(--color-hairline)] md:hidden">
            <nav className="shell flex flex-col py-4">
              {['Work', 'Capabilities', 'Studio', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setNavOpen(false)}
                  className="border-b border-[var(--color-hairline)] py-3.5 text-[1rem] font-medium text-[var(--color-ink)] last:border-b-0"
                >
                  {item}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setNavOpen(false)}
                className="btn btn-primary mt-5 w-full"
              >
                Start a project
              </a>
            </nav>
          </div>
        ) : null}
      </header>

      <main id="main">
        {/* -------------------------------------------------------------- */}
        {/* HERO - asymmetric split, fits viewport, max 4 text elements     */}
        {/* -------------------------------------------------------------- */}
        <section id="top" className="shell pt-20 pb-16 md:pt-24 md:pb-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="micro mb-6">Brand and web studio</p>
              <h1 className="display display-xl">
                Design that holds up
                <br />
                in production.
              </h1>
              <p className="lede mt-8">
                We build brand and web systems for companies that have outgrown
                templates. Every project ships with the files and code to keep it.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href="#contact" className="btn btn-primary">
                  Start a project
                </a>
                <a href="#work" className="btn btn-secondary">
                  See selected work
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 lg:pt-16">
              <Reveal>
                <div className="frame aspect-4/5 w-full">
                  <img
                    src="https://picsum.photos/seed/atelier-nord-studio-hero/1200/1500"
                    alt="Atelier Nord studio workspace with printed brand sheets on a wall"
                    loading="eager"
                    width={1200}
                    height={1500}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* CLIENT STRIP - logo wall under hero, logos only, no labels      */}
        {/* -------------------------------------------------------------- */}
        <section aria-label="Clients" className="border-y border-[var(--color-hairline)] py-9">
          <div className="shell">
            <p className="micro mb-6">Selected clients</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
              {CLIENTS.map((c) => (
                <li key={c.name} className="flex items-center gap-2.5 text-[var(--color-mute)]">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    aria-hidden="true"
                    className="shrink-0 text-[var(--color-mute)]"
                  >
                    <rect
                      x="0.75"
                      y="0.75"
                      width="20.5"
                      height="20.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <text
                      x="11"
                      y="15.6"
                      textAnchor="middle"
                      fontFamily="Archivo Variable, sans-serif"
                      fontSize="11.5"
                      fontWeight="700"
                      fill="currentColor"
                    >
                      {c.mark}
                    </text>
                  </svg>
                  <span className="font-display text-[0.875rem] font-semibold tracking-[-0.02em]">
                    {c.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* WORK - asymmetric 2+1, not three equal cards                   */}
        {/* -------------------------------------------------------------- */}
        <section id="work" className="shell py-24 md:py-32">
          <Reveal>
            <SectionHead
              title="Selected work"
              body="Three projects from the last two years, with what they were actually for."
            />
          </Reveal>

          <div className="mt-16 grid gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <article>
                <div className="frame aspect-4/3 w-full">
                  <img
                    src={`https://picsum.photos/seed/${WORK[0].seed}/1400/1050`}
                    alt="Fenwick Coffee storefront signage and printed menus"
                    loading="lazy"
                    width={1400}
                    height={1050}
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-6">
                  <h3 className="font-display text-[1.125rem] font-bold tracking-[-0.02em] text-[var(--color-ink)]">
                    {WORK[0].client}
                  </h3>
                  <p className="shrink-0 text-[0.8125rem] text-[var(--color-mute)]">
                    {WORK[0].year}
                  </p>
                </div>
                <p className="mt-1.5 text-[0.9375rem] text-[var(--color-body)]">
                  {WORK[0].scope}
                </p>
              </article>
            </Reveal>

            <div className="flex flex-col gap-6 lg:col-span-5">
              <Reveal delay={80}>
                <article>
                  <div className="frame aspect-16/11 w-full">
                    <img
                      src={`https://picsum.photos/seed/${WORK[1].seed}/1200/825`}
                      alt="Loam Studio website shown on a desktop monitor"
                      loading="lazy"
                      width={1200}
                      height={825}
                    />
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-6">
                    <h3 className="font-display text-[1.125rem] font-bold tracking-[-0.02em] text-[var(--color-ink)]">
                      {WORK[1].client}
                    </h3>
                    <p className="shrink-0 text-[0.8125rem] text-[var(--color-mute)]">
                      {WORK[1].year}
                    </p>
                  </div>
                  <p className="mt-1.5 text-[0.9375rem] text-[var(--color-body)]">
                    {WORK[1].scope}
                  </p>
                </article>
              </Reveal>

              <Reveal delay={160}>
                <article>
                  <div className="frame aspect-16/11 w-full">
                    <img
                      src={`https://picsum.photos/seed/${WORK[2].seed}/1200/825`}
                      alt="Mercer and Wilde campaign photography laid out on a table"
                      loading="lazy"
                      width={1200}
                      height={825}
                    />
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-6">
                    <h3 className="font-display text-[1.125rem] font-bold tracking-[-0.02em] text-[var(--color-ink)]">
                      {WORK[2].client}
                    </h3>
                    <p className="shrink-0 text-[0.8125rem] text-[var(--color-mute)]">
                      {WORK[2].year}
                    </p>
                  </div>
                  <p className="mt-1.5 text-[0.9375rem] text-[var(--color-body)]">
                    {WORK[2].scope}
                  </p>
                </article>
              </Reveal>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* CAPABILITIES - numbered rows, no card grid, no 3-equal-cards    */}
        {/* -------------------------------------------------------------- */}
        <section id="capabilities" className="border-t border-[var(--color-hairline)] py-24 md:py-32">
          <div className="shell">
            <Reveal>
              <SectionHead
                kicker="What we do"
                title="Four capabilities, no account layer"
                body="You work with the people doing the work. There is no strategist translating your brief into something safer."
              />
            </Reveal>

            <div className="mt-16 grid gap-x-16 gap-y-12 md:grid-cols-2">
              {CAPABILITIES.map((c, i) => (
                <Reveal key={c.n} delay={i * 70}>
                  <div className="border-t border-[var(--color-hairline)] pt-6">
                    <p className="font-mono text-[0.6875rem] tracking-[0.08em] text-[var(--color-accent)]">
                      {c.n}
                    </p>
                    <h3 className="mt-4 font-display text-[1.25rem] font-bold tracking-[-0.02em] text-[var(--color-ink)]">
                      {c.title}
                    </h3>
                    <p className="mt-3 max-w-[52ch] text-[0.9375rem] leading-relaxed text-[var(--color-body)]">
                      {c.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* PROCESS - full-bleed inverse band, single theme still light     */}
        {/* -------------------------------------------------------------- */}
        <section className="bg-[var(--color-ink)] py-24 text-[var(--color-on-inverse)] md:py-32">
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-5">
                <p className="text-[0.9375rem] font-medium text-white/70 mb-5">How we work</p>
                <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-bold leading-[1.02] tracking-[-0.035em] text-white">
                  Six weeks, three checkpoints, no surprises in month three.
                </h2>
              </Reveal>

              <div className="lg:col-span-7">
                <ol className="divide-y divide-white/12">
                  {[
                    {
                      w: 'Week 1',
                      t: 'Audit and direction',
                      d: 'We read your existing material, talk to your team, and present three directions with the reasoning attached.',
                    },
                    {
                      w: 'Weeks 2 to 4',
                      t: 'Build in the browser',
                      d: 'Design and front-end move together on a live URL. You see progress daily rather than at a milestone review.',
                    },
                    {
                      w: 'Weeks 5 to 6',
                      t: 'Handover',
                      d: 'Source files, token documentation, and a walkthrough recording. Your team keeps every file we touched.',
                    },
                  ].map((s, i) => (
                    <Reveal key={s.w} delay={i * 80}>
                      <li className="grid gap-3 py-7 md:grid-cols-12 md:gap-8">
                        <p className="font-mono text-[0.6875rem] tracking-[0.08em] text-white/45 md:col-span-3">
                          {s.w}
                        </p>
                        <div className="md:col-span-9">
                          <h3 className="font-display text-[1.125rem] font-bold tracking-[-0.02em] text-white">
                            {s.t}
                          </h3>
                          <p className="mt-2.5 max-w-[58ch] text-[0.9375rem] leading-relaxed text-white/70">
                            {s.d}
                          </p>
                        </div>
                      </li>
                    </Reveal>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* TESTIMONIAL - quote max 3 lines, real attribution               */}
        {/* -------------------------------------------------------------- */}
        <section className="shell py-24 md:py-32">
          <Reveal>
            <figure className="mx-auto max-w-3xl">
              <blockquote className="font-display text-[clamp(1.4rem,2.6vw,2rem)] font-medium leading-[1.22] tracking-[-0.025em] text-[var(--color-ink)]">
                &ldquo;They handed over a system, not a folder of exports. Our
                developers were still building from it a year later.&rdquo;
              </blockquote>
              <figcaption className="mt-7 text-[0.9375rem] text-[var(--color-mute)]">
                Ingrid Bruun, Operations Director at Loam Studio
              </figcaption>
            </figure>
          </Reveal>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* CONTACT - label above input, no placeholder-as-label           */}
        {/* -------------------------------------------------------------- */}
        <section id="contact" className="border-t border-[var(--color-hairline)] py-24 md:py-32">
          <div className="shell">
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-5">
                <h2 className="display display-lg">
                  Tell us what
                  <br />
                  needs building.
                </h2>
                <p className="lede mt-7">
                  Send a paragraph about the project. We reply within two working
                  days, including when the answer is that you do not need us.
                </p>
                <dl className="mt-10 space-y-5">
                  <div>
                    <dt className="text-[0.8125rem] font-semibold text-[var(--color-ink)]">Email</dt>
                    <dd className="mt-1.5 text-[0.9375rem] text-[var(--color-ink)]">
                      studio@ateliernord.dk
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.8125rem] font-semibold text-[var(--color-ink)]">Phone</dt>
                    <dd className="mt-1.5 text-[0.9375rem] text-[var(--color-ink)]">
                      +45 32 84 19 60
                    </dd>
                  </div>
                </dl>
              </Reveal>

              <Reveal className="lg:col-span-7" delay={90}>
                <form className="grid gap-6" noValidate>
                  {[
                    { id: 'name', label: 'Name', type: 'text', hint: 'Who we should reply to.' },
                    { id: 'email', label: 'Email', type: 'email', hint: 'We only use this to answer you.' },
                    { id: 'brief', label: 'About the project', type: 'textarea', hint: 'Two or three sentences is enough.' },
                  ].map((f) => (
                    <div key={f.id} className="grid gap-2">
                      <label
                        htmlFor={f.id}
                        className="text-[0.8125rem] font-semibold text-[var(--color-ink)]"
                      >
                        {f.label}
                      </label>
                      {f.type === 'textarea' ? (
                        <textarea
                          id={f.id}
                          name={f.id}
                          rows={5}
                          aria-describedby={`${f.id}-hint`}
                          className="border border-[var(--color-hairline)] bg-[var(--color-canvas)] px-4 py-3 text-[0.9375rem] text-[var(--color-ink)] placeholder:text-[var(--color-mute)] focus:border-[var(--color-accent)] focus:outline-none"
                        />
                      ) : (
                        <input
                          id={f.id}
                          name={f.id}
                          type={f.type}
                          aria-describedby={`${f.id}-hint`}
                          className="border border-[var(--color-hairline)] bg-[var(--color-canvas)] px-4 py-3 text-[0.9375rem] text-[var(--color-ink)] placeholder:text-[var(--color-mute)] focus:border-[var(--color-accent)] focus:outline-none"
                        />
                      )}
                      <p id={`${f.id}-hint`} className="text-[0.8125rem] text-[var(--color-mute)]">
                        {f.hint}
                      </p>
                    </div>
                  ))}

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button type="submit" className="btn btn-primary">
                      Send brief
                    </button>
                    <p className="text-[0.8125rem] text-[var(--color-mute)]">
                      We reply within two working days.
                    </p>
                  </div>
                </form>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------------------------------------------------------- */}
      {/* FOOTER                                                          */}
      {/* ---------------------------------------------------------------- */}
      <footer className="border-t border-[var(--color-hairline)] py-12">
        <div className="shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[0.875rem] text-[var(--color-mute)]">
            Atelier Nord ApS, Copenhagen
          </p>
          <nav className="flex flex-wrap gap-x-7 gap-y-2">
            {['Work', 'Capabilities', 'Studio', 'Contact'].map((i) => (
              <a
                key={i}
                href={`#${i.toLowerCase()}`}
                className="text-[0.875rem] text-[var(--color-mute)] transition-colors hover:text-[var(--color-ink)]"
              >
                {i}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </>
  )
}