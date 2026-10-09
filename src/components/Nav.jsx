import { LogoMark } from './Logo.jsx';
import Icon from './Icon.jsx';
import { profile } from '../data.js';

const links = [
  ['education', 'Education'],
  ['experience', 'Experience'],
  ['skills', 'Skills'],
  ['certificates', 'Certificates'],
  ['contact', 'Contact'],
];

export default function Nav({ dark, onToggleTheme }) {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a href="#top" className="brand" aria-label="Home"><LogoMark className="logo-mark" /></a>
        <nav>
          {links.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <button className="icon-btn" onClick={onToggleTheme} aria-label="Toggle dark mode">
          <Icon name={dark ? 'sun' : 'moon'} size={16} />
        </button>
        <a className="btn small primary nav-cta" href={profile.cv} download>Download CV</a>
      </div>
    </header>
  );
}
