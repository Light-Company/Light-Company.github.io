import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prism · AI guidance projected onto physical work",
  description:
    "A desk lamp with cameras and a projector that sees the workbench, understands the task, and points to the next action. Built for robotics and hardware teams.",
};

const loop = [
  {
    number: "01",
    title: "Observe",
    body: "Cameras track the bench, the parts, the tools, and your hands.",
  },
  {
    number: "02",
    title: "Reason",
    body: "A vision-language model understands the task and its current state.",
  },
  {
    number: "03",
    title: "Project",
    body: "The next action lands in light on the exact part that needs it.",
  },
  {
    number: "04",
    title: "Verify",
    body: "Prism checks the result before moving to the next step.",
  },
];

const upcomingDemos = [
  {
    index: "01",
    title: "Assembly guidance",
    body: "Projected steps land on the correct fastener and follow the part as it moves.",
  },
  {
    index: "02",
    title: "Soldering walkthrough",
    body: "Prism highlights the pad, component, and orientation while both hands stay on the work.",
  },
  {
    index: "03",
    title: "Cooking with intelligence",
    body: "Ingredients, timing, and the next action appear on the counter as the recipe moves forward.",
  },
];

type PageProps = {
  searchParams: Promise<{ rsvp?: string }>;
};

function PrismMark() {
  return (
    <svg
      className="brand-mark"
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="prism-spectrum" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EC6F9E" />
          <stop offset=".5" stopColor="#9DA3FF" />
          <stop offset="1" stopColor="#4AA3F0" />
        </linearGradient>
      </defs>
      <path
        d="M32 10 55 50H9L32 10Z"
        fill="none"
        stroke="url(#prism-spectrum)"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M9 50 32 34 55 50" fill="none" stroke="#9DA3FF" />
      <path d="M32 10v24" fill="none" stroke="#ECEAF2" opacity=".7" />
    </svg>
  );
}

function ViewfinderCorners() {
  return (
    <>
      <span className="corner corner-tl" aria-hidden="true" />
      <span className="corner corner-tr" aria-hidden="true" />
      <span className="corner corner-bl" aria-hidden="true" />
      <span className="corner corner-br" aria-hidden="true" />
    </>
  );
}

export default async function Home({ searchParams }: PageProps) {
  const { rsvp } = await searchParams;

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Prism Labs home">
          <PrismMark />
          <span>PRISM LABS</span>
          <span className="brand-divider">/</span>
          <span className="brand-os">PRISMOS</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#proof">See it working</a>
          <a className="nav-cta" href="#rsvp">
            RSVP · AUG 20
          </a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-media" aria-hidden="true">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/media/hero-workbench.jpg"
            >
              <source src="/media/hero-workbench.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="hero-shade" aria-hidden="true" />
          <ViewfinderCorners />

          <div className="hero-content">
            <p className="eyebrow">
              <span className="signal-dot" aria-hidden="true" />
              CLAUDE CODE FOR PHYSICAL WORK
            </p>
            <h1 id="hero-title">
              A desk lamp that projects AI guidance onto the work in your hands.
            </h1>
            <p className="hero-copy">
              Prism sees a workbench, understands the task, and points to the
              exact part. Built first for robotics and hardware teams. No
              headset. No screen switching.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#rsvp">
                RSVP FOR THE AUG 20 DEMO
                <span aria-hidden="true">↗</span>
              </a>
              <p>
                San Francisco
                <span>Hands-on · 2026</span>
              </p>
            </div>
          </div>

          <div className="hero-telemetry mono" aria-hidden="true">
            <span>LIVE BENCH / OBJECTS TRACKED</span>
            <span>PROJECTED REALITY / NO HEADSET</span>
          </div>
        </section>

        <section className="credibility band" aria-labelledby="credibility-title">
          <div className="section-index mono">01 / FOUNDER INSIGHT</div>
          <div className="credibility-grid">
            <div>
              <p className="kicker">BUILT FROM BOTH SIDES OF THE PROBLEM</p>
              <h2 id="credibility-title">
                The display belongs above the bench, not on your face.
              </h2>
            </div>
            <div className="credibility-copy">
              <p>
                Two years building Vision Pro infrastructure showed the limits
                of a display people remove. Years in the hardware trades showed
                the same gap from the other side: instructions live away from
                the work.
              </p>
              <p className="credential-line">
                Former Apple Vision Pro infrastructure engineer
                <span aria-hidden="true">×</span>
                Former hardware trades worker
              </p>
            </div>
          </div>

          <div className="founder-reel">
            <div className="founder-video frame">
              <ViewfinderCorners />
              <video
                className="viewport-video"
                muted
                playsInline
                preload="metadata"
                poster="/media/founder-intro.jpg"
              >
                <source src="/media/founder-intro.mp4" type="video/mp4" />
              </video>
              <span className="media-tag mono">FOUNDER INTRO · 01:00</span>
            </div>
            <div className="timeline">
              <article>
                <span className="mono">2022</span>
                <h3>First projected-reality prototype</h3>
                <p>Mapped a live interface onto moving physical objects.</p>
              </article>
              <article>
                <span className="mono">APPLE</span>
                <h3>Vision Pro infrastructure</h3>
                <p>Worked on spatial computing and saw headset friction firsthand.</p>
              </article>
              <article>
                <span className="mono">NOW</span>
                <h3>Building full-time in San Francisco</h3>
                <p>Used every day to build the next Prism hardware iteration.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="problem band" aria-labelledby="problem-title">
          <div className="section-index mono">02 / PROBLEM</div>
          <div className="split-heading">
            <p className="kicker">THE BROKEN WORKFLOW</p>
            <h2 id="problem-title">AI stops at the edge of the screen.</h2>
            <p>
              People building, fixing, and assembling still stop to search a
              video, read a spec, or translate an instruction back to the part.
            </p>
          </div>
          <div className="workflow" aria-label="The current hands-on work loop">
            {["Look away", "Find the step", "Re-orient", "Do the work", "Look away again"].map(
              (step, index) => (
                <div className="workflow-step" key={step}>
                  <span className="mono">{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                </div>
              ),
            )}
          </div>
        </section>

        <section className="product band" aria-labelledby="product-title">
          <div className="section-index mono">03 / PRODUCT</div>
          <div className="split-heading">
            <p className="kicker">A CLOSED LOOP FOR HANDS-ON WORK</p>
            <h2 id="product-title">Put the interface on the thing itself.</h2>
            <p>
              One lamp combines cameras, a vision-language model, and a
              projector. It sees the task, guides the action, and checks the
              result.
            </p>
          </div>
          <div className="loop-grid">
            {loop.map((item) => (
              <article key={item.number}>
                <span className="loop-number">{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="product-claim">
            Prism can guide a bench it has never seen without an engineer
            authoring every step first.
          </p>
        </section>

        <section className="proof band" id="proof" aria-labelledby="proof-title">
          <div className="section-index mono">04 / WORKING PROTOTYPE</div>
          <div className="proof-heading">
            <div>
              <p className="kicker">REAL FOOTAGE FROM THE PROTOTYPE</p>
              <h2 id="proof-title">The loop works end to end.</h2>
            </div>
            <p>
              The published clips show the core capabilities: registration,
              measurement, and scene understanding. The next three task demos
              are being captured for August 20.
            </p>
          </div>

          <div className="proof-grid">
            <article className="proof-card proof-card-wide">
              <div className="proof-media frame">
                <ViewfinderCorners />
                <video
                  className="viewport-video"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/media/object-measurement.jpg"
                >
                  <source src="/media/object-measurement.mp4" type="video/mp4" />
                </video>
                <span className="media-tag mono">REAL PROTOTYPE FOOTAGE</span>
              </div>
              <div className="proof-meta">
                <span className="mono">01 / OBJECT AWARENESS</span>
                <h3>The bench becomes the interface.</h3>
                <p>
                  Prism reads an object&apos;s dimensions and projects the
                  result beside it, with no screen in the workflow.
                </p>
              </div>
            </article>

            <article className="proof-card">
              <div className="proof-media portrait frame">
                <ViewfinderCorners />
                <video
                  className="viewport-video"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/media/registered-guidance.jpg"
                >
                  <source src="/media/registered-guidance.mp4" type="video/mp4" />
                </video>
                <span className="media-tag mono">REAL PROTOTYPE FOOTAGE</span>
              </div>
              <div className="proof-meta">
                <span className="mono">02 / REGISTRATION</span>
                <h3>Guidance follows the work.</h3>
                <p>
                  A live instruction layer stays registered to the page as it
                  moves. The same loop carries guidance onto parts and tools.
                </p>
              </div>
            </article>

            <article className="proof-card">
              <div className="proof-media square frame">
                <ViewfinderCorners />
                <video
                  className="viewport-video"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/media/scene-scan.jpg"
                >
                  <source src="/media/scene-scan.mp4" type="video/mp4" />
                </video>
                <span className="media-tag mono">REAL PROTOTYPE FOOTAGE</span>
              </div>
              <div className="proof-meta">
                <span className="mono">03 / SCENE UNDERSTANDING</span>
                <h3>It maps the physical workspace.</h3>
                <p>
                  Cameras build a spatial view of the room before the
                  instruction layer reaches the surface.
                </p>
              </div>
            </article>
          </div>

          <div className="upcoming-header">
            <p className="kicker">NEXT PUBLIC CAPTURES</p>
            <span className="mono">FOOTAGE NOT YET PUBLISHED</span>
          </div>
          <div className="upcoming-grid">
            {upcomingDemos.map((demo) => (
              <article className="placeholder-card" key={demo.title}>
                <div className="placeholder-visual" aria-hidden="true">
                  <ViewfinderCorners />
                  <span className="placeholder-cross" />
                  <span className="placeholder-status mono">
                    CAPTURE SCHEDULED
                  </span>
                  <strong>{demo.index}</strong>
                </div>
                <span className="mono">{demo.index} / AUG 20 DEMO</span>
                <h3>{demo.title}</h3>
                <p>{demo.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="wedge band" aria-labelledby="wedge-title">
          <div className="section-index mono">05 / INITIAL WEDGE</div>
          <div className="wedge-grid">
            <div>
              <p className="kicker">START WHERE VARIABILITY HURTS</p>
              <h2 id="wedge-title">High-mix robotics workbenches first.</h2>
            </div>
            <div className="wedge-detail">
              <article>
                <span className="mono">FIRST CUSTOMER</span>
                <h3>Robotics teams</h3>
                <p>
                  Small hardware teams assembling, debugging, and repairing
                  changing systems at a shared bench.
                </p>
              </article>
              <article>
                <span className="mono">JOB TO BE DONE</span>
                <h3>Guide variable work</h3>
                <p>
                  Show the next action, catch mistakes, and verify completion
                  when the task changes too often to pre-author.
                </p>
              </article>
            </div>
          </div>
          <div className="comparison">
            <div>
              <span className="mono">AUTHORED WORK INSTRUCTIONS</span>
              <p>
                Traditional projected-guidance systems are strongest when an
                engineer scripts a repeatable process in advance.
              </p>
            </div>
            <div className="comparison-prism">
              <span className="mono">PRISM</span>
              <p>
                A vision-language model reasons about the live scene, adapts to
                changing work, and verifies the result.
              </p>
            </div>
          </div>
        </section>

        <section className="momentum band" aria-labelledby="momentum-title">
          <div className="section-index mono">06 / PROOF + MOMENTUM</div>
          <div className="momentum-heading">
            <div>
              <p className="kicker">PRE-LAUNCH, WORKING PRODUCT</p>
              <h2 id="momentum-title">The prototype is used, not just shown.</h2>
            </div>
            <p>
              No revenue or external-user claim yet. The strongest proof today
              is a working system and daily founder use.
            </p>
          </div>
          <div className="metric-grid">
            <article>
              <strong>Daily</strong>
              <span>Used to build the next Prism hardware iteration</span>
            </article>
            <article>
              <strong>1 loop</strong>
              <span>Observe, reason, project, and verify</span>
            </article>
            <article>
              <strong>2 tasks</strong>
              <span>Cooking and ambient desk workflows completed</span>
            </article>
            <article className="metric-accent">
              <strong>Aug 20</strong>
              <span>Public hands-on demo in San Francisco</span>
            </article>
          </div>
        </section>

        <section className="rsvp" id="rsvp" aria-labelledby="rsvp-title">
          <div className="rsvp-glow" aria-hidden="true" />
          <ViewfinderCorners />
          <div className="rsvp-topline mono">
            <span>07 / PUBLIC DEMO</span>
            <span>SAN FRANCISCO · AUGUST 20, 2026</span>
          </div>
          <div className="rsvp-grid">
            <div>
              <p className="kicker">COME USE THE PROTOTYPE</p>
              <h2 id="rsvp-title">
                Build hardware and cook with intelligence.
              </h2>
              <p className="rsvp-copy">
                We rented a house in San Francisco for a public, hands-on demo.
                Bring a task, try the prototype, and meet the robotics teams and
                builders shaping the first pilots.
              </p>
            </div>
            <div className="rsvp-form-wrap">
              {rsvp === "thanks" ? (
                <div className="form-message success" role="status">
                  <span className="signal-dot" aria-hidden="true" />
                  <div>
                    <strong>You&apos;re on the list.</strong>
                    <p>
                      We&apos;ll send the San Francisco details before August 20.
                    </p>
                  </div>
                </div>
              ) : (
                <form action="/api/rsvp" method="post" className="rsvp-form">
                  <label htmlFor="email">Email for demo details</label>
                  <div className="input-row">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      required
                      aria-describedby="form-note"
                    />
                    <button type="submit">RSVP / GET NOTIFIED</button>
                  </div>
                  <div className="honey-field" aria-hidden="true">
                    <label htmlFor="company">Company</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  <p id="form-note">
                    One email when details are ready. No newsletter.
                  </p>
                </form>
              )}
              {rsvp === "invalid" && (
                <p className="form-error" role="alert">
                  Enter a valid email address.
                </p>
              )}
              {rsvp === "error" && (
                <p className="form-error" role="alert">
                  The RSVP could not be saved. Email{" "}
                  <a href="mailto:hi@jonny.sh">hi@jonny.sh</a> and we&apos;ll
                  add you.
                </p>
              )}
              <div className="rsvp-details">
                <span>
                  <b>WHEN</b> Thursday, August 20, 2026
                </span>
                <span>
                  <b>WHERE</b> San Francisco · location sent to guests
                </span>
                <span>
                  <b>FOR</b> Robotics teams, hardware builders, angels
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <a className="brand" href="#top" aria-label="Back to top">
          <PrismMark />
          <span>PRISM LABS</span>
        </a>
        <p>Claude Code for physical work.</p>
        <div>
          <span>San Francisco</span>
          <a href="mailto:hi@jonny.sh">hi@jonny.sh</a>
        </div>
      </footer>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (() => {
              const videos = [...document.querySelectorAll('.viewport-video')];
              if (!('IntersectionObserver' in window)) return;
              const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                  const video = entry.target;
                  if (entry.isIntersecting) {
                    const play = video.play();
                    if (play && play.catch) play.catch(() => {});
                  } else {
                    video.pause();
                  }
                });
              }, { threshold: 0.35 });
              videos.forEach((video) => observer.observe(video));
            })();
          `,
        }}
      />
    </>
  );
}
