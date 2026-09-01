import type { Metadata } from 'next';
import Link from 'next/link';
import MusicGeographyShell, { ExternalPolicyLink, PolicySection } from '@/components/projects/MusicGeographyShell';

export const metadata: Metadata = {
  title: 'How Cities Become Musical',
  description: 'A multimodal and spatiotemporal music geography project on musical recognition inequality and relational urban structure.',
};

const stages = [
  ['Sounding place', 'Rhythm, timbre, voice, instrumentation and production may make place audible without relying only on explicit place names.'],
  ['Naming place', 'Titles, lawful textual evidence and official descriptions connect music to neighbourhoods, streets, landmarks and everyday life.'],
  ['Staging place', 'Covers, official music-video metadata, artists, collaborators, venues and events situate works in relational urban scenes.'],
  ['Circulating place', 'Platform metadata and bounded public reception may reinforce, complement, contest or overwrite musical place meanings.'],
];

export default function MusicGeographyProjectPage() {
  return (
    <MusicGeographyShell
      eyebrow="Current research project · 城市音乐地理"
      title="How Cities Become Musical"
      summary="A multimodal and spatiotemporal study of musical recognition inequality: which urban places become audible, who is authorised to narrate them, and how sound, text, visual representation, music-scene networks and platform reception jointly produce public urban memory."
    >
      <div className="grid gap-7">
        <section className="grid lg:grid-cols-[1.35fr_.65fr] gap-7">
          <div className="rounded-2xl border border-neutral-200/70 bg-card p-7 sm:p-9 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Project abstract</p>
            <p className="mt-4 text-lg leading-8 text-neutral-700">
              Cities are not represented equally in music, and urban visibility is not simply a count of songs bearing a city name. This project treats music works as the sampling origin and asks how neighbourhood experience is selectively translated into sound, naming, visual staging and public circulation. Chicago is the principal case for a 2014-2025 longitudinal audit, with an external city used only after equivalent semantic and rights thresholds are met. The study distinguishes represented place from artist origin, recording location, performance location and release geography; models missingness and platform observability explicitly; and links works to artist, collaboration, venue, place and time networks. The intended contribution is a theory and measurement framework for musical recognition inequality, not a standalone multimodal similarity score and not causal inference.
            </p>
            <p className="mt-5 text-base leading-7 text-neutral-600">
              中文摘要：本项目以音乐作品为抽样起点，研究城市社区如何被声音化、命名化、场景化与流通化，以及哪些地方获得持续、多样且具有本地主体性的音乐承认，哪些地方则沉默、被类型锁定或由外部主体替代发声。
            </p>
          </div>

          <aside className="rounded-2xl border border-cyan-200/70 bg-cyan-50/70 dark:bg-cyan-950/20 p-7 shadow-sm">
            <h2 className="text-xl font-serif font-bold text-primary">Research team</h2>
            <dl className="mt-5 space-y-5 text-sm">
              <div><dt className="font-semibold text-neutral-500">Researcher</dt><dd className="mt-1 text-base text-primary">Qiuhao Zhao</dd></div>
              <div><dt className="font-semibold text-neutral-500">Academic affiliation</dt><dd className="mt-1 text-base text-primary">School of Earth Sciences, Zhejiang University</dd></div>
              <div><dt className="font-semibold text-neutral-500">Supervisor</dt><dd className="mt-1"><ExternalPolicyLink href="https://person.zju.edu.cn/en/0091318">Prof. Pingbin Jin</ExternalPolicyLink></dd></div>
              <div><dt className="font-semibold text-neutral-500">Primary study city</dt><dd className="mt-1 text-base text-primary">Chicago, 2014-2025</dd></div>
              <div><dt className="font-semibold text-neutral-500">Status</dt><dd className="mt-1 text-base text-primary">Corpus construction and compliance audit</dd></div>
            </dl>
          </aside>
        </section>

        <PolicySection title="One scientific question, four linked processes">
          <p><strong>Core question:</strong> How is unequal urban recognition produced when music itself, explicit naming, visual staging, scene networks and platform reception do not point to the same places or speak with the same authority?</p>
          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            {stages.map(([title, body]) => (
              <article key={title} className="rounded-xl border border-neutral-200/70 bg-neutral-50/60 dark:bg-neutral-900/30 p-5">
                <h3 className="font-semibold text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{body}</p>
              </article>
            ))}
          </div>
        </PolicySection>

        <PolicySection title="Auditable data design">
          <div className="grid md:grid-cols-3 gap-5">
            <div><h3 className="font-semibold text-primary">A. Representation corpus</h3><p className="mt-2 text-sm">Works enter when represented-place and year evidence are reliable. Full downloadable audio is not a gate.</p></div>
            <div><h3 className="font-semibold text-primary">B. Multimodal analysis corpus</h3><p className="mt-2 text-sm">At least two compliant modalities: audio access/features, lawful text evidence, visual metadata or bounded reception data.</p></div>
            <div><h3 className="font-semibold text-primary">C. Open reproducibility corpus</h3><p className="mt-2 text-sm">A separately labelled subset with openly licensed full audio, text or images. Its size does not limit A or B.</p></div>
          </div>
          <p>The project records place × period × source × query observability so that search failures, rights restrictions and uncollected cells are not mistaken for genuine musical silence.</p>
        </PolicySection>

        <PolicySection title="Platform role and API transparency">
          <p>YouTube is a video identity, official music-page metadata and bounded reception layer - not the source of downloadable song audio. Open or authorised audio is obtained from sources such as Jamendo, FMA and other item-level licensed collections.</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="inline-flex rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/music-geography/developed-with-youtube-sentence-case-light.png" alt="Developed with YouTube" className="h-8 w-auto" />
            </a>
            <Link href="/music-geography/privacy/" className="rounded-xl border border-neutral-200 px-4 py-3 text-sm font-semibold text-accent hover:bg-neutral-50">Privacy Policy</Link>
            <Link href="/music-geography/terms/" className="rounded-xl border border-neutral-200 px-4 py-3 text-sm font-semibold text-accent hover:bg-neutral-50">Terms of Service</Link>
            <Link href="/music-geography/deletion/" className="rounded-xl border border-neutral-200 px-4 py-3 text-sm font-semibold text-accent hover:bg-neutral-50">Data Deletion Policy</Link>
          </div>
          <p className="text-sm">The client uses documented read-only API endpoints, performs no OAuth or write action, does not download YouTube audiovisual content, and refreshes or deletes temporarily stored API Data within 30 days unless a longer period is explicitly approved.</p>
        </PolicySection>

        <PolicySection title="Publication ambition and limits">
          <p>The project is designed for rigorous urban and GIS research: city theory first, multimodal measurement second. Planned validation combines cross-period spatial analysis, explicit missingness, human perception validation and one carefully selected external city. Platform comments are treated as nested and non-representative reception observations, not as residents or general public opinion. The project makes no causal claims.</p>
        </PolicySection>
      </div>
    </MusicGeographyShell>
  );
}
