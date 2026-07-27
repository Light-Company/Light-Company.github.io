import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "The Light Company · AI guidance projected onto physical work",
  description:
    "A lamp that sees a workbench, understands the task, and projects the next action onto the exact part. Built for robotics and hardware teams.",
};

type PageProps = {
  searchParams: Promise<{ rsvp?: string }>;
};

type VideoStory = {
  index: string;
  kind: string;
  title: string;
  body: string;
  src: string;
  poster: string;
  format: "wide" | "portrait" | "square";
  side?: "left" | "right";
};

const loop = [
  {
    number: "01",
    title: "Observe",
    body: "Cameras track the bench, every part, every tool, and your hands.",
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
    body: "The system checks the result before moving to the next step.",
  },
];

const benchStories: VideoStory[] = [
  {
    index: "01",
    kind: "WORKING PROTOTYPE",
    title: "Instructions stay registered to the work.",
    body: "A live instruction layer follows the page as it moves. The same registration loop puts assembly guidance directly onto parts and tools.",
    src: "/media/registered-guidance.mp4",
    poster: "/media/registered-guidance.jpg",
    format: "portrait",
    side: "left",
  },
  {
    index: "02",
    kind: "WORKING PROTOTYPE",
    title: "The workbench becomes the interface.",
    body: "The system sees the object, measures it, and projects the result beside it. The operator never has to translate a screen back to the bench.",
    src: "/media/hero-workbench.mp4",
    poster: "/media/hero-workbench.jpg",
    format: "wide",
  },
  {
    index: "03",
    kind: "WORKING PROTOTYPE",
    title: "Measurements land on the object.",
    body: "The camera reads dimensions from the physical scene. The projector puts the answer where it is useful: on the table, next to the thing.",
    src: "/media/object-measurement.mp4",
    poster: "/media/object-measurement.jpg",
    format: "portrait",
    side: "right",
  },
  {
    index: "04",
    kind: "WORKING PROTOTYPE",
    title: "Projected guidance locks to real surfaces.",
    body: "This earlier measurement pass shows the core loop in its simplest form: see the bench, understand the geometry, and answer in light.",
    src: "/media/measure.mp4",
    poster: "/media/measure.jpg",
    format: "wide",
  },
  {
    index: "05",
    kind: "THE SYSTEM",
    title: "One rig watches the whole workspace.",
    body: "An overhead camera keeps the working surface in view while the projector turns it into a shared, hands-free display.",
    src: "/media/overhead.mp4",
    poster: "/media/overhead.jpg",
    format: "portrait",
    side: "left",
  },
  {
    index: "06",
    kind: "PERCEPTION PIPELINE",
    title: "It tracks the person doing the work.",
    body: "Pose, motion, and presence are read from the live scene so guidance can react to the operator, not just a fixed instruction script.",
    src: "/media/track-person.mp4",
    poster: "/media/track-person.jpg",
    format: "portrait",
    side: "right",
  },
  {
    index: "07",
    kind: "WORKING PROTOTYPE",
    title: "Place an object. The system responds beside it.",
    body: "The system recognizes what entered the workspace and projects context next to the physical object instead of opening another window.",
    src: "/media/object.mp4",
    poster: "/media/object.jpg",
    format: "portrait",
    side: "left",
  },
];

const spatialStories: VideoStory[] = [
  {
    index: "08",
    kind: "PERCEPTION PIPELINE",
    title: "The system first builds a spatial view of the room.",
    body: "The camera maps the physical workspace before any instruction layer reaches a surface.",
    src: "/media/scene-scan.mp4",
    poster: "/media/scene-scan.jpg",
    format: "square",
    side: "right",
  },
  {
    index: "09",
    kind: "PERCEPTION PIPELINE",
    title: "It reads the geometry.",
    body: "Walls, floors, furniture, and usable work surfaces are reconstructed from the live scene.",
    src: "/media/room-layout.mp4",
    poster: "/media/room-layout.jpg",
    format: "wide",
  },
  {
    index: "10",
    kind: "PERCEPTION PIPELINE",
    title: "It labels every surface.",
    body: "The system separates table, chair, wall, floor, and door so projected UI lands on the right physical plane.",
    src: "/media/room-seg.mp4",
    poster: "/media/room-seg.jpg",
    format: "square",
    side: "left",
  },
  {
    index: "11",
    kind: "PERCEPTION PIPELINE",
    title: "The same model works across unfamiliar rooms.",
    body: "The goal is adaptive guidance: understand the live environment instead of asking an engineer to pre-author every possible setup.",
    src: "/media/rooms-grid.mp4",
    poster: "/media/rooms-grid.jpg",
    format: "wide",
  },
];

const ambientStories: VideoStory[] = [
  {
    index: "12",
    kind: "AMBIENT UI STUDY",
    title: "A blank wall can become useful without becoming a screen.",
    body: "Projected content occupies only the light it needs. The rest of the room stays the room.",
    src: "/media/ambient-bird.mp4",
    poster: "/media/ambient-bird.jpg",
    format: "portrait",
    side: "right",
  },
  {
    index: "13",
    kind: "AMBIENT UI STUDY",
    title: "Quiet by default.",
    body: "It can sit in a room like a framed print, then become an interface only when the task calls for one.",
    src: "/media/ambient-art.mp4",
    poster: "/media/ambient-art.jpg",
    format: "portrait",
    side: "left",
  },
  {
    index: "14",
    kind: "AMBIENT UI STUDY",
    title: "Reach into the interface.",
    body: "Controls appear on the physical surface and respond to a real hand. Nothing is strapped to the person using it.",
    src: "/media/ambient-display.mp4",
    poster: "/media/ambient-display.jpg",
    format: "portrait",
    side: "right",
  },
  {
    index: "15",
    kind: "AMBIENT UI STUDY",
    title: "Any surface can carry the next useful action.",
    body: "The workbench is the first wedge. The same projected interface can extend to cooking, repair, and shared physical spaces.",
    src: "/media/artwork.mp4",
    poster: "/media/artwork.jpg",
    format: "portrait",
    side: "left",
  },
  {
    index: "16",
    kind: "ORIGINAL SITE REEL",
    title: "The interface leaves the screen.",
    body: "The system puts guidance in the same physical space as the hands, tools, and objects it is helping with.",
    src: "/media/signoff.mp4",
    poster: "/media/signoff.jpg",
    format: "portrait",
    side: "right",
  },
];

const upcomingDemos = [
  {
    index: "01",
    title: "Assembly guidance",
    body: "Projected steps on the exact fastener and part as the build moves.",
  },
  {
    index: "02",
    title: "Soldering walkthrough",
    body: "The pad, component, and orientation highlighted while both hands stay on the work.",
  },
  {
    index: "03",
    title: "Cooking with intelligence",
    body: "Ingredients, timing, and the next action projected onto the counter.",
  },
];

function LightMark() {
  return (
    <Image
      className="light-mark"
      src="/brand/light-company-mark.svg"
      alt=""
      width="42"
      height="42"
      aria-hidden="true"
    />
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

function VideoStory({ story }: { story: VideoStory }) {
  return (
    <article
      className={`video-story video-story-${story.format} video-story-${story.side ?? "full"}`}
    >
      <div className="video-story-inner">
        <div className="video-stage frame">
          <ViewfinderCorners />
          <video
            className="viewport-video"
            muted
            loop
            playsInline
            preload="metadata"
            poster={story.poster}
            aria-label={story.title}
          >
            <source src={story.src} type="video/mp4" />
          </video>
          <span className="media-tag mono">{story.kind}</span>
        </div>
        <div className="video-story-copy">
          <span className="mono">{story.index} / VIDEO ARCHIVE</span>
          <h3>{story.title}</h3>
          <p>{story.body}</p>
        </div>
      </div>
    </article>
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
        <a className="brand" href="#top" aria-label="The Light Company home">
          <LightMark />
          <span>THE LIGHT COMPANY</span>
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
          <div className="hero-beams" aria-hidden="true">
            <span className="hero-beam" />
          </div>

          <div className="hero-inner">
            <div className="hero-content">
              <p className="eyebrow">
                <span className="signal-dot" aria-hidden="true" />
                CLAUDE CODE FOR PHYSICAL WORK
              </p>
              <h1 id="hero-title">
                A lamp that projects AI guidance onto robotics and hardware work.
              </h1>
              <p className="hero-copy">
                The system sees the bench, understands the task, and points to
                the exact part. No headset. No screen switching. Both hands stay
                on the work.
              </p>
              <p className="hero-credential mono">
                BUILT BY A FORMER APPLE VISION PRO INFRASTRUCTURE ENGINEER
                <span>×</span>
                FORMER HARDWARE TRADES WORKER
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

            <div className="hero-media">
              <div className="hero-video-shell">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster="/media/img-5010-poster.jpg"
                  aria-label="The Light Company projected workbench prototype"
                >
                  <source src="/media/img-5010.mp4" type="video/mp4" />
                </video>
                <span className="media-tag mono">WORKING PROTOTYPE</span>
              </div>
              <div className="hero-video-meta mono" aria-hidden="true">
                <span>IMG_5010 / LIVE WORKBENCH</span>
                <span>NO HEADSET</span>
              </div>
            </div>
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
                Apple Vision Pro infrastructure
                <span aria-hidden="true">×</span>
                Hardware trades
                <span aria-hidden="true">×</span>
                Building full-time in SF
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
                aria-label="Founder introduction"
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
                <p>Saw headset friction from inside spatial computing.</p>
              </article>
              <article>
                <span className="mono">NOW</span>
                <h3>Used to build the system itself</h3>
                <p>The prototype helps build the next hardware iteration.</p>
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
              Builders still stop, find a video or spec, re-orient to the part,
              do one step, then look away again. Screen-bound agents cannot
              point at a physical connector, fastener, or solder pad.
            </p>
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
        </section>

        <section className="archive-intro band" id="proof" aria-labelledby="proof-title">
          <div className="section-index mono">04 / EVERY PUBLISHED VIDEO</div>
          <div className="archive-heading">
            <p className="kicker">THE WORKING SYSTEM, NOT A RENDER</p>
            <h2 id="proof-title">See the loop from every angle.</h2>
            <p>
              These are the full set of videos published across the original
              site: physical registration, object awareness, perception,
              room understanding, and ambient interface studies.
            </p>
          </div>
        </section>

        <div className="video-sequence" aria-label="Prototype videos">
          {benchStories.map((story) => (
            <VideoStory story={story} key={story.src} />
          ))}
        </div>

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
        </section>

        <section className="chapter band" aria-labelledby="spatial-title">
          <div className="section-index mono">06 / UNDERSTAND THE SPACE</div>
          <div className="chapter-heading">
            <p className="kicker">BEFORE THE SYSTEM CAN POINT, IT HAS TO SEE</p>
            <h2 id="spatial-title">
              The physical scene becomes context for the agent.
            </h2>
          </div>
        </section>

        <div className="video-sequence" aria-label="Perception videos">
          {spatialStories.map((story) => (
            <VideoStory story={story} key={story.src} />
          ))}
        </div>

        <section className="chapter band" aria-labelledby="ambient-title">
          <div className="section-index mono">07 / BEYOND THE BENCH</div>
          <div className="chapter-heading">
            <p className="kicker">THE INTERFACE CAN LIVE IN THE ROOM</p>
            <h2 id="ambient-title">
              Only the useful light appears. Everything else stays physical.
            </h2>
          </div>
        </section>

        <div className="video-sequence" aria-label="Ambient interface videos">
          {ambientStories.map((story) => (
            <VideoStory story={story} key={story.src} />
          ))}
        </div>

        <section className="upcoming band" aria-labelledby="upcoming-title">
          <div className="section-index mono">08 / NEXT PUBLIC CAPTURES</div>
          <div className="upcoming-heading">
            <div>
              <p className="kicker">FOOTAGE NOT YET PUBLISHED</p>
              <h2 id="upcoming-title">Three task demos next.</h2>
            </div>
            <p>
              The archive above is real published media. These task-specific
              clips are clearly marked until the August 20 capture replaces
              them.
            </p>
          </div>
          <div className="upcoming-list">
            {upcomingDemos.map((demo) => (
              <article key={demo.title}>
                <span className="mono">{demo.index} / CAPTURE SCHEDULED</span>
                <h3>{demo.title}</h3>
                <p>{demo.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="momentum band" aria-labelledby="momentum-title">
          <div className="section-index mono">09 / PROOF + MOMENTUM</div>
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
              <span>Used to build the next hardware iteration</span>
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
            <span>10 / PUBLIC DEMO</span>
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
          <LightMark />
          <span>THE LIGHT COMPANY</span>
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
              }, { threshold: 0.3, rootMargin: '10% 0px 10% 0px' });
              videos.forEach((video) => observer.observe(video));
            })();
          `,
        }}
      />
    </>
  );
}
