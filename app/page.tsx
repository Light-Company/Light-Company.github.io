import type { Metadata } from "next";
import Image from "next/image";
import {
  chatGPTSignInPath,
  chatGPTSignOutPath,
  getChatGPTUser,
} from "./chatgpt-auth";

export const metadata: Metadata = {
  title: "The Light Company · AI That Points to the Work",
  description:
    "A lamp that sees the workbench, understands the task, and projects the next step onto the exact part.",
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
};

const eventDate = new Date("2026-08-20T19:00:00-07:00");
const eventDay = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "America/Los_Angeles",
}).format(eventDate);
const eventShortDay = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "America/Los_Angeles",
}).format(eventDate);

const loop = [
  {
    number: "01",
    title: "Observe",
    body: "Cameras keep the bench, parts, tools, and hands in view.",
  },
  {
    number: "02",
    title: "Reason",
    body: "A vision-language model reads the task and its current state.",
  },
  {
    number: "03",
    title: "Project",
    body: "The next instruction lands on the exact physical target.",
  },
  {
    number: "04",
    title: "Verify",
    body: "The system checks the result before the work moves on.",
  },
];

const benchStories: VideoStory[] = [
  {
    index: "01",
    kind: "Registered Guidance",
    title: "Instructions Stay With the Work",
    body: "The instruction layer follows a moving page. The same registration loop can keep assembly guidance attached to parts and tools.",
    src: "/media/registered-guidance.mp4",
    poster: "/media/registered-guidance.jpg",
    format: "portrait",
  },
  {
    index: "02",
    kind: "Live Workbench",
    title: "The Bench Becomes the Interface",
    body: "The system sees an object, measures it, and places the result beside it—without sending the operator to another screen.",
    src: "/media/hero-workbench.mp4",
    poster: "/media/hero-workbench.jpg",
    format: "wide",
  },
  {
    index: "03",
    kind: "Object Measurement",
    title: "Measurements Land on the Object",
    body: "The camera reads the scene. The projector puts the answer next to the thing being measured.",
    src: "/media/object-measurement.mp4",
    poster: "/media/object-measurement.jpg",
    format: "portrait",
  },
  {
    index: "04",
    kind: "Geometry Pass",
    title: "Guidance Locks to Real Surfaces",
    body: "See the bench, understand its geometry, and answer in light. This is the core loop in its simplest form.",
    src: "/media/measure.mp4",
    poster: "/media/measure.jpg",
    format: "wide",
  },
  {
    index: "05",
    kind: "System View",
    title: "One Rig Watches the Workspace",
    body: "An overhead camera keeps the working surface in view while the projector turns it into a hands-free display.",
    src: "/media/overhead.mp4",
    poster: "/media/overhead.jpg",
    format: "portrait",
  },
  {
    index: "06",
    kind: "Perception",
    title: "It Tracks the Person Doing the Work",
    body: "Pose, motion, and presence let guidance respond to the operator—not just a fixed instruction script.",
    src: "/media/track-person.mp4",
    poster: "/media/track-person.jpg",
    format: "portrait",
  },
  {
    index: "07",
    kind: "Object Awareness",
    title: "Place an Object. The System Responds.",
    body: "The system recognizes what enters the workspace and projects context beside the physical object.",
    src: "/media/object.mp4",
    poster: "/media/object.jpg",
    format: "portrait",
  },
];

const spatialStories: VideoStory[] = [
  {
    index: "08",
    kind: "Scene Scan",
    title: "Build a Spatial View",
    body: "The camera maps the workspace before an instruction reaches a surface.",
    src: "/media/scene-scan.mp4",
    poster: "/media/scene-scan.jpg",
    format: "square",
  },
  {
    index: "09",
    kind: "Room Geometry",
    title: "Read the Geometry",
    body: "Walls, floors, furniture, and usable work surfaces are reconstructed from the live scene.",
    src: "/media/room-layout.mp4",
    poster: "/media/room-layout.jpg",
    format: "wide",
  },
  {
    index: "10",
    kind: "Segmentation",
    title: "Label Every Surface",
    body: "The system separates table, chair, wall, floor, and door so projected UI lands on the right plane.",
    src: "/media/room-seg.mp4",
    poster: "/media/room-seg.jpg",
    format: "square",
  },
  {
    index: "11",
    kind: "Generalization",
    title: "Work Across Unfamiliar Rooms",
    body: "The goal is adaptive guidance that reads the live environment instead of requiring every setup to be pre-authored.",
    src: "/media/rooms-grid.mp4",
    poster: "/media/rooms-grid.jpg",
    format: "wide",
  },
];

const ambientStories: VideoStory[] = [
  {
    index: "12",
    kind: "Ambient Study",
    title: "A Blank Wall Becomes Useful",
    body: "Projected content occupies only the light it needs. The rest of the room stays the room.",
    src: "/media/ambient-bird.mp4",
    poster: "/media/ambient-bird.jpg",
    format: "portrait",
  },
  {
    index: "13",
    kind: "Ambient Study",
    title: "Quiet by Default",
    body: "It can sit like a framed print, then become an interface when the task calls for one.",
    src: "/media/ambient-art.mp4",
    poster: "/media/ambient-art.jpg",
    format: "portrait",
  },
  {
    index: "14",
    kind: "Hand Interaction",
    title: "Reach Into the Interface",
    body: "Controls appear on a physical surface and respond to a real hand. Nothing is strapped to the person using it.",
    src: "/media/ambient-display.mp4",
    poster: "/media/ambient-display.jpg",
    format: "portrait",
  },
  {
    index: "15",
    kind: "Surface Study",
    title: "Put the Next Action Anywhere",
    body: "The workbench is the first wedge. The same interface can extend to cooking, repair, and shared spaces.",
    src: "/media/artwork.mp4",
    poster: "/media/artwork.jpg",
    format: "portrait",
  },
  {
    index: "16",
    kind: "Original Reel",
    title: "The Interface Leaves the Screen",
    body: "Guidance moves into the same physical space as the hands, tools, and objects it is helping with.",
    src: "/media/signoff.mp4",
    poster: "/media/signoff.jpg",
    format: "portrait",
  },
];

const upcomingDemos = [
  ["01", "Assembly Guidance", "Projected steps on the exact fastener and part."],
  ["02", "Soldering Walkthrough", "Pad, component, and orientation highlighted in place."],
  ["03", "Cooking With Intelligence", "Ingredients, timing, and next actions on the counter."],
];

function LightMark({ priority = false }: { priority?: boolean }) {
  return (
    <Image
      className="light-mark"
      src="/brand/light-company-mark.svg"
      alt=""
      width="225"
      height="183"
      priority={priority}
      aria-hidden="true"
    />
  );
}

function Brand({ priority = false }: { priority?: boolean }) {
  return (
    <span className="brand-lockup" translate="no">
      <LightMark priority={priority} />
      <span>Light Company</span>
    </span>
  );
}

function RegistrationCorners() {
  return (
    <span className="registration-corners" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

function StoryCard({ story }: { story: VideoStory }) {
  return (
    <article className={`story-card story-card-${story.format}`}>
      <div className="story-media">
        <RegistrationCorners />
        <video
          className="viewport-video"
          muted
          loop
          playsInline
          preload="none"
          poster={story.poster}
          controls
          width="1280"
          height="960"
          aria-label={story.title}
        >
          <source src={story.src} type="video/mp4" />
        </video>
        <span className="media-label utility">{story.kind}</span>
      </div>
      <div className="story-copy">
        <span className="story-index utility">{story.index}</span>
        <div>
          <h3>{story.title}</h3>
          <p>{story.body}</p>
        </div>
      </div>
    </article>
  );
}

function StoryGallery({ stories }: { stories: VideoStory[] }) {
  return (
    <div className="story-gallery">
      {stories.map((story) => (
        <StoryCard story={story} key={story.src} />
      ))}
    </div>
  );
}

export default async function Home({ searchParams }: PageProps) {
  const { rsvp } = await searchParams;
  const user = await getChatGPTUser();
  const emailDescription = rsvp === "invalid" ? "form-note email-error" : "form-note";

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to Content
      </a>

      <header className="site-header">
        <a className="brand-link" href="#top" aria-label="Light Company home">
          <Brand priority />
        </a>
        <nav aria-label="Primary navigation">
          <a href="#system">How It Works</a>
          <a href="#proof">See It Working</a>
          <a
            className="nav-signin"
            href={user ? chatGPTSignOutPath("/") : chatGPTSignInPath("/")}
            title={user ? `Signed in as ${user.email}` : undefined}
          >
            {user ? "Sign out" : "Sign in"}
          </a>
          <a className="nav-cta" href="#rsvp">
            RSVP · {eventShortDay}
          </a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-beam" aria-hidden="true" />
          <div className="hero-inner">
            <div className="hero-copy-wrap">
              <p className="eyebrow utility">
                <span className="signal-dot" aria-hidden="true" />
                Physical AI · San Francisco
              </p>
              <h1 id="hero-title">
                <span>AI That Points</span>
                <span>to the Work.</span>
              </h1>
              <p className="hero-summary">
                A lamp that sees the workbench, understands the task, and
                projects the next step onto the exact part.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#rsvp">
                  Reserve a Demo Seat <span aria-hidden="true">↗</span>
                </a>
                <p className="event-note">
                  <time dateTime="2026-08-20">{eventShortDay}</time>
                  <span>Hands-on · San Francisco</span>
                </p>
              </div>
              <p className="founder-line utility">
                Built by a former Apple Vision Pro infrastructure engineer and
                hardware trades worker
              </p>
            </div>

            <div className="hero-visual">
              <div className="hero-mark" aria-hidden="true">
                <LightMark />
              </div>
              <div className="hero-video-frame">
                <RegistrationCorners />
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster="/media/img-5010-poster.jpg"
                  controls
                  width="900"
                  height="1200"
                  aria-label="Projected guidance running on the Light Company workbench prototype"
                >
                  <source src="/media/img-5010.mp4" type="video/mp4" />
                </video>
                <span className="media-label utility">Working Prototype</span>
              </div>
              <div className="visual-readout utility" aria-hidden="true">
                <span>Live Workbench / IMG_5010</span>
                <span>Registered to Surface</span>
              </div>
            </div>
          </div>
          <div className="hero-proof utility" aria-label="Product summary">
            <span>No Headset</span>
            <span>Hands Stay on the Work</span>
            <span>Observe · Reason · Project · Verify</span>
          </div>
        </section>

        <section className="thesis section" aria-labelledby="thesis-title">
          <div className="section-label utility">The Missing Interface</div>
          <div className="thesis-grid">
            <h2 id="thesis-title">Keep Your Eyes &amp; Hands on the Build.</h2>
            <div className="thesis-copy">
              <p>
                Today, builders stop to find a video or spec, translate it back
                to the bench, do one step, then look away again.
              </p>
              <p>
                Light Company puts the interface on the thing itself. No screen
                switching. No headset. No guessing which connector the agent
                means.
              </p>
            </div>
          </div>
        </section>

        <section className="system section" id="system" aria-labelledby="system-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow utility">A Closed Loop for Physical Work</p>
              <h2 id="system-title">See It. Understand It. Point. Check.</h2>
            </div>
            <p>
              One rig combines cameras, a vision-language model, and a projector.
              The order matters: every action is grounded in the live scene.
            </p>
          </div>
          <ol className="loop-list">
            {loop.map((item) => (
              <li key={item.number}>
                <span className="loop-number utility">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="founder section" aria-labelledby="founder-title">
          <div className="founder-layout">
            <div className="founder-media">
              <RegistrationCorners />
              <video
                className="viewport-video"
                muted
                playsInline
                preload="none"
                poster="/media/founder-intro.jpg"
                controls
                width="1280"
                height="720"
                aria-label="Founder introduction"
              >
                <source src="/media/founder-intro.mp4" type="video/mp4" />
              </video>
              <span className="media-label utility">Founder Introduction · 01:00</span>
            </div>
            <div className="founder-copy">
              <p className="eyebrow utility">Built From Both Sides of the Problem</p>
              <h2 id="founder-title">The Display Belongs Above the Bench.</h2>
              <p>
                Two years building Vision Pro infrastructure showed the friction
                of a display people remove. Years in the hardware trades showed
                the other half: instructions live away from the work.
              </p>
              <dl className="origin-list">
                <div><dt>2022</dt><dd>First projected-reality prototype</dd></div>
                <div><dt>Apple</dt><dd>Vision Pro infrastructure</dd></div>
                <div><dt>Now</dt><dd>The prototype helps build its next iteration</dd></div>
              </dl>
            </div>
          </div>
        </section>

        <section className="archive section" id="proof" aria-labelledby="proof-title">
          <div className="section-heading archive-heading">
            <div>
              <p className="eyebrow utility">Working System · Not a Render</p>
              <h2 id="proof-title">Proof From the Workbench.</h2>
            </div>
            <p>
              The complete published bench archive: registration, measurement,
              object awareness, and person tracking.
            </p>
          </div>
          <StoryGallery stories={benchStories} />
        </section>

        <section className="wedge section" aria-labelledby="wedge-title">
          <div className="wedge-grid">
            <div>
              <p className="eyebrow utility">First Wedge</p>
              <h2 id="wedge-title">High-Mix Robotics Benches.</h2>
            </div>
            <div className="wedge-copy">
              <p>
                Start with small robotics teams assembling, debugging, and
                repairing changing systems at a shared bench.
              </p>
              <p>
                Show the next action, catch mistakes, and verify completion where
                the work changes too often to pre-author.
              </p>
            </div>
          </div>
        </section>

        <section className="spatial section dark-section" aria-labelledby="spatial-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow utility">Before the System Can Point, It Has to See</p>
              <h2 id="spatial-title">The Room Becomes Context.</h2>
            </div>
            <p>
              Scene geometry tells the agent which surface is a bench, wall,
              floor, or object—and where an instruction can land.
            </p>
          </div>
          <StoryGallery stories={spatialStories} />
        </section>

        <section className="ambient section" aria-labelledby="ambient-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow utility">Beyond the Bench</p>
              <h2 id="ambient-title">Only the Useful Light Appears.</h2>
            </div>
            <p>
              The interface can extend to cooking, repair, and shared spaces
              without turning the whole room into a screen.
            </p>
          </div>
          <StoryGallery stories={ambientStories} />
        </section>

        <section className="next section" aria-labelledby="next-title">
          <div className="next-layout">
            <div>
              <p className="eyebrow utility">Next Public Captures</p>
              <h2 id="next-title">3 Task Demos Next.</h2>
              <p className="next-note">
                These clips are scheduled for capture. The footage above is the
                complete published archive.
              </p>
            </div>
            <div className="next-list">
              {upcomingDemos.map(([index, title, body]) => (
                <article key={index}>
                  <span className="utility">{index}</span>
                  <div><h3>{title}</h3><p>{body}</p></div>
                </article>
              ))}
            </div>
          </div>
          <div className="proof-strip">
            <div><strong>Daily</strong><span>Used to build the next rig</span></div>
            <div><strong>1 Loop</strong><span>Observe, reason, project, verify</span></div>
            <div><strong>2 Tasks</strong><span>Cooking and ambient desk workflows</span></div>
            <div><strong>{eventShortDay}</strong><span>Public demo in San Francisco</span></div>
          </div>
        </section>

        <section className="rsvp section" id="rsvp" aria-labelledby="rsvp-title">
          <div className="rsvp-beam" aria-hidden="true" />
          <div className="rsvp-layout">
            <div className="rsvp-copy">
              <p className="eyebrow utility">Come Use the Prototype</p>
              <h2 id="rsvp-title">Build Hardware With Intelligence in the Room.</h2>
              <p>
                Join a hands-on demo in San Francisco. Bring a task, try the
                prototype, and meet the builders shaping the first pilots.
              </p>
              <dl className="event-details">
                <div><dt>When</dt><dd><time dateTime="2026-08-20">{eventDay}</time></dd></div>
                <div><dt>Where</dt><dd>San Francisco · Location sent to guests</dd></div>
                <div><dt>For</dt><dd>Robotics teams, hardware builders, and angels</dd></div>
              </dl>
            </div>
            <div className="rsvp-form-wrap">
              {rsvp === "thanks" ? (
                <div className="form-message" role="status" aria-live="polite">
                  <span className="signal-dot" aria-hidden="true" />
                  <div>
                    <strong>You’re on the list.</strong>
                    <p>We’ll send the San Francisco details before {eventShortDay}.</p>
                  </div>
                </div>
              ) : (
                <form action="/api/rsvp" method="post" className="rsvp-form">
                  <label htmlFor="email">Email for Demo Details</label>
                  <div className="input-row">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      spellCheck={false}
                      placeholder="you@company.com…"
                      required
                      aria-invalid={rsvp === "invalid"}
                      aria-describedby={emailDescription}
                    />
                    <button type="submit">Reserve My Seat</button>
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
                  <p id="form-note">One email when details are ready. No newsletter.</p>
                </form>
              )}
              {rsvp === "invalid" && (
                <p className="form-error" id="email-error" role="alert">
                  Enter a valid email address, such as name@company.com.
                </p>
              )}
              {rsvp === "error" && (
                <p className="form-error" role="alert">
                  The RSVP could not be saved. Email{" "}
                  <a href="mailto:hi@jonny.sh">hi@jonny.sh</a> to reserve a seat.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <a className="brand-link" href="#top" aria-label="Back to top">
          <Brand />
        </a>
        <p>AI That Points to the Work.</p>
        <div><span>San Francisco</span><a href="mailto:hi@jonny.sh">hi@jonny.sh</a></div>
      </footer>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (() => {
              const videos = [...document.querySelectorAll('.viewport-video')];
              const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
              const pauseAll = () => videos.forEach((video) => video.pause());
              if (reducedMotion.matches) { pauseAll(); return; }
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
              }, { threshold: 0.35, rootMargin: '8% 0px' });
              videos.forEach((video) => observer.observe(video));
              reducedMotion.addEventListener('change', (event) => {
                if (event.matches) pauseAll();
              });
            })();
          `,
        }}
      />
    </>
  );
}
