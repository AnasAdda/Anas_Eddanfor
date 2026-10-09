import { useEffect, useState } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Section from './components/Section.jsx';
import Icon from './components/Icon.jsx';
import { LogoFull } from './components/Logo.jsx';
import ContactForm from './components/ContactForm.jsx';
import {
  profile, education, experience, skills, softSkills,
  certificates, languages, interests,
} from './data.js';

function useTheme() {
  const systemDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme'); } catch { return null; }
  });
  useEffect(() => {
    if (theme) document.documentElement.dataset.theme = theme;
  }, [theme]);
  const dark = theme ? theme === 'dark' : systemDark();
  const toggle = () => {
    const next = dark ? 'light' : 'dark';
    setTheme(next);
    try { localStorage.setItem('theme', next); } catch { /* storage unavailable */ }
  };
  return [dark, toggle];
}

export default function App() {
  const [dark, toggleTheme] = useTheme();

  return (
    <>
      <Nav dark={dark} onToggleTheme={toggleTheme} />
      <main>
        <Hero />

        <Section id="education" index="01" title="Education">
          <article className="card feature">
            <div>
              <p className="label">{education.level} · {education.period}</p>
              <h3>{education.degree}</h3>
              <p className="muted">{education.school}</p>
            </div>
            <div className="feature-side">
              <p className="label">Graduation project</p>
              <p>{education.project}</p>
            </div>
          </article>
        </Section>

        <Section id="experience" index="02" title="Experience">
          <ol className="timeline">
            {experience.map(job => (
              <li key={job.role} className="card">
                <p className="label">{job.period}</p>
                <h3>{job.role}</h3>
                <p className="muted">{job.org}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="skills" index="03" title="Skills">
          <div className="skills">
            {skills.map(group => (
              <article key={group.title} className="card">
                <div className="icon"><Icon name={group.icon} /></div>
                <h3>{group.title}</h3>
                <ul className="tags">
                  {group.items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <p className="soft">+ {softSkills.join(' · ')}</p>
        </Section>

        <Section id="certificates" index="04" title="Certificates">
          <ul className="certs">
            {certificates.map(c => (
              <li key={c.name} className="card">
                <span className="issuer">{c.issuer}</span>
                <strong>{c.name}</strong>
              </li>
            ))}
          </ul>
        </Section>

        <Section className="two-col">
          <div>
            <header className="section-head"><span className="idx">05</span><h2>Languages</h2><span className="rule" /></header>
            <div className="card langs">
              {languages.map(l => (
                <div key={l.name}>
                  <div className="lang-row"><strong>{l.name}</strong><span className="muted">{l.level}</span></div>
                  <div className="bar"><i style={{ width: `${l.pct}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <header className="section-head"><span className="idx">06</span><h2>Interests</h2><span className="rule" /></header>
            <ul className="tags big">
              {interests.map(i => <li key={i}>{i}</li>)}
            </ul>
          </div>
        </Section>

        <Section id="contact">
          <div className="contact">
            <div className="grid-bg" aria-hidden="true" />
            <div className="contact-intro">
              <p className="label">Contact</p>
              <h2>Let's build something reliable.</h2>
              <p className="muted">Open to roles in automation, data center infrastructure and design. Send a message here or reach me directly.</p>
              <div className="contact-links">
                <a href={`mailto:${profile.email}`}><Icon name="mail" size={18} />{profile.email}</a>
                <a href={profile.cv} download><Icon name="arrow" size={18} />Download CV</a>
              </div>
            </div>
            <ContactForm />
          </div>
        </Section>
      </main>

      <footer className="wrap footer">
        <LogoFull className="logo-full" />
        <p>© {new Date().getFullYear()} Anas Eddanfor</p>
      </footer>
    </>
  );
}
