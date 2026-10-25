import { Badge, ButtonLink, PageHead, Section, Stat } from '@/components/ui';

export const metadata = {
  title: 'Kyerɛ',
  description: 'Kyerɛ, a study app that makes students prove what they know by teaching an AI student. 2nd place at WaCode 2026, Baylor University.',
};

const SHOTS = [
  { src: '/img/kyere/01-home.jpg', title: 'Home', caption: 'Ask what you want to understand, pick a lesson format, or start from a ready learning path.' },
  { src: '/img/kyere/02-lesson.jpg', title: 'Lesson Player', caption: 'One generated script plays as video, narration, slides or reading, with checkpoints, a transcript and sources.' },
  { src: '/img/kyere/03-teach-fen.jpg', title: 'Teach Fen', caption: 'Fen is an AI student who knows only what you told it. A sealed exam, Fen’s belief map and notebook show what the teaching actually covered.' },
  { src: '/img/kyere/06-radar.jpg', title: 'Topic Radar', caption: 'Watching fills at most half of each axis. The rest is earned by answering alone and by teaching.' },
  { src: '/img/kyere/05-overworld.jpg', title: 'Overworld Game', caption: 'Towns built from the syllabus. Game answers use the same graded endpoint as lessons, so play moves the real radar.' },
];

export default function KyerePage() {
  return (
    <>
      <PageHead
        eyebrow="$ cat projects/kyere"
        title="Kyerɛ: Watching Isn’t Knowing"
        lede="A study app for university students. Type a topic or drop in lectures and notes, study a generated syllabus in the format you pick, then prove it. Kyerɛ is Twi for “show”."
      />
      <div className="container">
        <div className="badge-row" style={{ marginBottom: 'var(--s-5)' }}>
          <Badge tone="gold">2nd Place</Badge>
          <Badge tone="accent">WaCode 2026 · Baylor University</Badge>
          <Badge>Team Barney and Friends</Badge>
        </div>
        <div className="cta-row">
          <ButtonLink href="https://kyere-web-611962560954.us-south1.run.app" external>Try the Live App</ButtonLink>
          <ButtonLink href="/talks/wacode-2026-kyere-pitch.pdf" variant="secondary">View Pitch Slides</ButtonLink>
        </div>
        <div className="stats">
          <Stat value="4" label="Lesson Formats, One Script" />
          <Stat value="~700" label="Backend and Frontend Tests" />
          <Stat value="2nd" label="WaCode 2026" />
          <Stat value="All" label="Teammates Wrote Code" />
        </div>
      </div>

      <Section eyebrow="$ git log --author" title="What I Built">
        <p className="card-body" style={{ maxWidth: '62ch', fontSize: 'var(--fs-md)', color: 'var(--fg)' }}>
          I decompiled the games and built them into the project, and brought AI into both the app and the games.
          Stack: FastAPI, SQLAlchemy and Postgres on the backend; React 19, Tailwind 4 and Vite on the frontend;
          Google Cloud Run and Cloud SQL for hosting; MiniMax models and Tavily for text, speech, images, video and web search.
        </p>
      </Section>

      <Section eyebrow="$ ls screenshots/" title="Screenshots">
        <div style={{ display: 'grid', gap: 'var(--s-6)' }}>
          {SHOTS.map((s) => (
            <figure key={s.src} style={{ margin: 0 }}>
              <img className="card-media" style={{ aspectRatio: '16 / 10', objectFit: 'cover' }} src={s.src} alt={`Kyerɛ ${s.title} screen`} loading="lazy" />
              <figcaption className="card-body" style={{ marginTop: 'var(--s-2)' }}>
                <strong style={{ color: 'var(--fg)' }}>{s.title}.</strong> {s.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </>
  );
}
