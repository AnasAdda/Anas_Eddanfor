import Icon from './Icon.jsx';
import { profile, stats } from '../data.js';

export default function Hero() {
  const [first, ...rest] = profile.name.split(' ');
  const last = rest.pop();
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true" style={{ backgroundImage: `url(${profile.heroBg})` }} />
      <div className="grid-bg" aria-hidden="true" />
      <div className="glow" aria-hidden="true" />
      <div className="wrap hero-inner">
        <div className="hero-text">
          <p className="status"><span className="dot" />Available for opportunities · {profile.location}</p>
          <h1>{first} {rest.join(' ')} <span className="accent-text">{last}</span></h1>
          <p className="lead">{profile.intro}</p>
          <ul className="roles">
            {profile.roles.map(r => <li key={r}>{r}</li>)}
          </ul>
          <div className="cta">
            <a className="btn primary" href="#contact"><Icon name="mail" size={18} />Get in touch</a>
            <a className="btn" href={profile.cv} download>Download CV <Icon name="arrow" size={16} /></a>
          </div>
        </div>
        <div className="hero-photo">
          <div className="orbit orbit-1" aria-hidden="true"><i /></div>
          <div className="orbit orbit-2" aria-hidden="true"><i /></div>
          <img src={profile.photo} alt="Portrait of Anas Eddanfor" width="594" height="596" />
        </div>
      </div>
      <div className="wrap">
        <dl className="stats">
          {stats.map(s => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value}{s.unit && <small>{s.unit}</small>}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
