import { useMemo, useState } from "react";
import type { DomainSection, ExperienceEntry, Profile, ProjectItem, SkillMatrix } from "./types";
import { usePortfolioData } from "./usePortfolioData";

/* ------------------------------------------------------------------ */
/*  Ambient background: cyber-grid + gradient blurs                    */
/* ------------------------------------------------------------------ */

function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-cyber-grid bg-grid [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent_100%)]" />
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-indigo-600/25 blur-[120px]" />
      <div className="absolute top-1/3 -right-40 h-[480px] w-[480px] rounded-full bg-sky-500/20 blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 h-[420px] w-[420px] rounded-full bg-indigo-500/10 blur-[120px]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { href: "#portfolio", label: "Portfolio & Domains" },
  { href: "#stack", label: "Stack" },
  { href: "#timeline", label: "Timeline" },
  { href: "#contact", label: "Contact" },
];

function Header({ profile }: { profile: Profile }) {
  const primaryEmail = profile.email[0];

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <div className="leading-tight">
            <p className="font-display text-sm font-semibold tracking-wide text-slate-100 sm:text-base">
              {profile.name}
            </p>
            <p className="font-mono text-[11px] text-slate-400">{profile.title}</p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-2 sm:gap-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 font-mono text-xs text-slate-300 transition-colors hover:bg-white/5 hover:text-sky-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${primaryEmail}`}
            className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 font-mono text-xs text-sky-300 shadow-glow transition-colors hover:bg-sky-400/20"
          >
            {profile.mobile}
          </a>
        </nav>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero({ profile }: { profile: Profile }) {
  const yearsMatch = profile.summary.match(/(\d+)\+?\s*years?/i);
  const years = yearsMatch ? yearsMatch[1] : "14";

  return (
    <section className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-20 pt-16 sm:pt-24 lg:flex-row lg:items-center">
      <div className="flex-1 animate-fade-up">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-400/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-indigo-300">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
          {profile.location}
        </p>
        <h1 className="font-display text-4xl font-bold leading-[1.08] text-slate-50 sm:text-5xl lg:text-6xl">
          {profile.name}
        </h1>
        <p className="mt-3 font-display text-lg text-sky-300 sm:text-xl">{profile.title}</p>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
          {profile.summary}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {profile.email.map((address) => (
            <a
              key={address}
              href={`mailto:${address}`}
              className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 font-mono text-xs text-slate-300 transition-all hover:border-sky-400/40 hover:bg-sky-400/5 hover:text-sky-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-slate-600 transition-colors group-hover:bg-sky-400" />
              {address}
            </a>
          ))}
          <a
            href={`tel:${profile.mobile.replace(/\s+/g, "")}`}
            className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 font-mono text-xs text-slate-300 transition-all hover:border-indigo-400/40 hover:bg-indigo-400/5 hover:text-indigo-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-slate-600 transition-colors group-hover:bg-indigo-400" />
            {profile.mobile}
          </a>
        </div>
      </div>

      {/* Signature element: a terminal-style status readout */}
      <div className="w-full max-w-md animate-fade-up rounded-2xl border border-white/10 bg-slate-900/60 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 font-mono text-[11px] text-slate-500">status.sh</span>
        </div>
        <div className="space-y-2.5 px-5 py-5 font-mono text-xs text-slate-400">
          <p>
            <span className="text-indigo-400">$</span> whoami
          </p>
          <p className="pl-4 text-slate-200">{profile.name.toLowerCase().replace(/\s+/g, "_")}</p>
          <p>
            <span className="text-indigo-400">$</span> uptime --production
          </p>
          <p className="pl-4 text-slate-200">
            {years}+ years <span className="text-slate-500">// zero downtime on principles</span>
          </p>
          <p>
            <span className="text-indigo-400">$</span> status
          </p>
          <p className="pl-4">
            <span className="text-emerald-400">●</span>{" "}
            <span className="text-slate-200">open to architecture &amp; leadership roles</span>
            <span className="ml-1 inline-block h-3 w-1.5 animate-blink bg-sky-400 align-middle" />
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Domain-Driven Portfolio Section                                    */
/* ------------------------------------------------------------------ */

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:-translate-y-1 hover:border-sky-400/40 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-sky-950/40">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-display text-lg font-semibold text-slate-100 transition-colors group-hover:text-sky-300">
            {project.name}
          </h4>
          {project.duration && (
            <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-2.5 py-0.5 font-mono text-[11px] text-sky-300">
              {project.duration}
            </span>
          )}
        </div>

        {(project.company || project.role) && (
          <p className="mt-1 font-mono text-xs text-slate-400">
            {project.role}
            {project.company && project.role && <span className="text-slate-600"> · </span>}
            {project.company && <span className="text-slate-300">{project.company}</span>}
          </p>
        )}

        <p className="mt-4 text-sm leading-relaxed text-slate-300">{project.description}</p>

        {project.highlights && project.highlights.length > 0 && (
          <div className="mt-4 space-y-2 border-t border-white/5 pt-3">
            {project.highlights.map((highlight, idx) => (
              <div key={idx} className="flex gap-2.5 text-xs text-slate-400">
                <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-sky-400" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 space-y-3 border-t border-white/5 pt-4">
        {project.integrations && project.integrations.length > 0 && (
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400">
              APIs &amp; Integrations:
            </span>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {project.integrations.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-emerald-400/20 bg-emerald-400/5 px-2 py-0.5 font-mono text-[11px] text-emerald-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        <div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-indigo-300">
            Tech Stack:
          </span>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PortfolioSection({ portfolioProjects }: { portfolioProjects: DomainSection[] }) {
  const [activeDomainId, setActiveDomainId] = useState<string>(portfolioProjects[0]?.id ?? "");

  const activeDomain = useMemo(() => {
    return portfolioProjects.find((d) => d.id === activeDomainId) ?? portfolioProjects[0];
  }, [portfolioProjects, activeDomainId]);

  if (!portfolioProjects || portfolioProjects.length === 0) return null;

  return (
    <section id="portfolio" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-sky-400">
          Domain Experience &amp; Projects
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-slate-100 sm:text-3xl">
          Systems Engineered Across Industries
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
          Over 14 years of architecting scalable applications across high-compliance fintech, regulated logistics, automotive platforms, e-commerce ecosystems, and high-concurrency real-time apps.
        </p>
      </div>

      {/* Domain Navigation Tabs */}
      <div
        role="tablist"
        aria-label="Portfolio domain tabs"
        className="mb-8 flex flex-wrap gap-2 border-b border-white/5 pb-4"
      >
        {portfolioProjects.map((domain) => {
          const isActive = domain.id === activeDomainId;
          return (
            <button
              key={domain.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveDomainId(domain.id)}
              className={`rounded-full px-4 py-2 font-mono text-xs transition-all ${
                isActive
                  ? "border border-sky-400/50 bg-sky-400/10 text-sky-300 shadow-glow"
                  : "border border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200"
              }`}
            >
              {domain.domain}
            </button>
          );
        })}
      </div>

      {/* Active Domain Overview Banner */}
      {activeDomain && (
        <div className="animate-fade-up">
          <div className="mb-8 rounded-2xl border border-indigo-400/20 bg-indigo-500/[0.04] p-6 backdrop-blur-md sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-indigo-400">
                  Domain Specialization
                </span>
                <h3 className="mt-1 font-display text-xl font-bold text-slate-100 sm:text-2xl">
                  {activeDomain.domain}
                </h3>
              </div>
              <span className="inline-flex self-start rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 font-mono text-xs text-sky-300">
                {activeDomain.featuredProjects.length} Key Initiative{activeDomain.featuredProjects.length > 1 ? "s" : ""}
              </span>
            </div>
            <p className="mt-3 font-mono text-xs font-medium text-sky-300">{activeDomain.tagline}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{activeDomain.summary}</p>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {activeDomain.featuredProjects.map((project, idx) => (
              <ProjectCard key={`${project.name}-${idx}`} project={project} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Skills: interactive tab matrix                                     */
/* ------------------------------------------------------------------ */

function SkillsMatrix({ skills }: { skills: SkillMatrix }) {
  const categories = useMemo(() => Object.keys(skills), [skills]);
  const [active, setActive] = useState(categories[0] ?? "");

  if (categories.length === 0) return null;

  return (
    <section id="stack" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-sky-400">
            Technical Stack
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-slate-100 sm:text-3xl">
            The toolkit, by domain
          </h2>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Skill categories"
        className="mb-8 flex flex-wrap gap-2 border-b border-white/5 pb-4"
      >
        {categories.map((category) => {
          const isActive = category === active;
          return (
            <button
              key={category}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(category)}
              className={`rounded-full px-4 py-2 font-mono text-xs transition-all ${
                isActive
                  ? "border border-sky-400/50 bg-sky-400/10 text-sky-300 shadow-glow"
                  : "border border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        key={active}
        className="grid animate-fade-up grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
      >
        {skills[active].map((tech) => (
          <div
            key={tech}
            className="group rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-center transition-all hover:-translate-y-0.5 hover:border-indigo-400/40 hover:bg-indigo-400/5"
          >
            <span className="font-mono text-xs text-slate-300 transition-colors group-hover:text-indigo-300">
              {tech}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Experience: glowing timeline                                       */
/* ------------------------------------------------------------------ */

function ExperienceCard({ entry, isLast }: { entry: ExperienceEntry; isLast: boolean }) {
  return (
    <div className="relative pl-10 sm:pl-14">
      {!isLast && (
        <span className="absolute left-[7px] top-6 h-full w-px bg-gradient-to-b from-sky-400/50 via-indigo-400/20 to-transparent sm:left-[11px]" />
      )}
      <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-sky-400 bg-slate-950 shadow-glow sm:h-4 sm:w-4" />

      <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:-translate-y-0.5 hover:border-sky-400/30 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-sky-950/40 sm:p-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="font-display text-lg font-semibold text-slate-100 sm:text-xl">
            {entry.role}
          </h3>
          <span className="font-mono text-[11px] uppercase tracking-wider text-sky-400">
            {entry.period}
          </span>
        </div>
        <p className="mt-1 font-mono text-xs text-slate-400">
          {entry.company} <span className="text-slate-600">·</span> {entry.location}
        </p>

        <ul className="mt-4 space-y-2.5">
          {entry.bullets.map((bullet, idx) => (
            <li key={idx} className="flex gap-3 text-sm leading-relaxed text-slate-400">
              <span className="mt-2 h-1 w-1 flex-none rounded-full bg-indigo-400/70" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ExperienceTimeline({ experience }: { experience: ExperienceEntry[] }) {
  return (
    <section id="timeline" className="mx-auto max-w-6xl px-6 py-20">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-sky-400">
        Engineering Timeline
      </p>
      <h2 className="mt-2 font-display text-2xl font-semibold text-slate-100 sm:text-3xl">
        Where the systems got built
      </h2>

      <div className="mt-10 space-y-8">
        {experience.map((entry, idx) => (
          <ExperienceCard key={`${entry.company}-${idx}`} entry={entry} isLast={idx === experience.length - 1} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer / Contact                                                   */
/* ------------------------------------------------------------------ */

function Footer({ profile }: { profile: Profile }) {
  return (
    <footer id="contact" className="border-t border-white/5 bg-slate-950/60">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-14 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-sky-400">
            Let's build something
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-slate-100 sm:text-3xl">
            {profile.email[0]}
          </h2>
        </div>
        <p className="font-mono text-xs text-slate-500">
          © {new Date().getFullYear()} {profile.name} — built with React, TypeScript &amp; Tailwind
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Loading / Error states                                             */
/* ------------------------------------------------------------------ */

function CenteredMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <AmbientBackground />
      <p className="relative font-mono text-sm text-slate-400">{children}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  App                                                                 */
/* ------------------------------------------------------------------ */

export default function App() {
  const { data, loading, error } = usePortfolioData();

  if (loading)
    return (
      <CenteredMessage>loading profile.json, skills.json, experience.json, portfolio.json…</CenteredMessage>
    );
  if (error || !data)
    return (
      <CenteredMessage>
        couldn't load resume data{error ? ` — ${error}` : ""}. check /public/data/*.json.
      </CenteredMessage>
    );

  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <div className="relative">
        <Header profile={data.profile} />
        <main>
          <Hero profile={data.profile} />
          <PortfolioSection portfolioProjects={data.portfolioProjects} />
          <SkillsMatrix skills={data.skills} />
          <ExperienceTimeline experience={data.experience} />
        </main>
        <Footer profile={data.profile} />
      </div>
    </div>
  );
}
