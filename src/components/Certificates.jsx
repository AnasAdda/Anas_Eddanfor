import { useMemo, useState } from 'react';
import useCertificates from '../lib/useCertificates.js';

const CATEGORIES = ['All', 'AI & Data', 'Cloud & Infrastructure', 'Networking', 'Programming', 'Engineering', 'Language'];

const fmtDate = iso =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });

// Only follow links we expect: site-relative certificate files and https verify pages.
const safeFile = p => (p && /^certificates\/[a-z0-9-]+\.(pdf|jpg|png)$/.test(p) ? p : null);
const safeUrl = u => (u && /^https:\/\//.test(u) ? u : null);

export default function Certificates() {
  const rows = useCertificates();
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(null);

  const { top, children } = useMemo(() => {
    const children = {};
    rows.filter(r => r.parent_slug).forEach(r => { (children[r.parent_slug] ||= []).push(r); });
    return { top: rows.filter(r => !r.parent_slug), children };
  }, [rows]);

  const present = CATEGORIES.filter(c => c === 'All' || top.some(r => r.category === c));
  const shown = filter === 'All' ? top : top.filter(r => r.category === filter);

  return (
    <>
      <div className="filters" role="tablist" aria-label="Filter certificates">
        {present.map(c => (
          <button key={c} role="tab" aria-selected={filter === c}
            className={filter === c ? 'active' : ''} onClick={() => setFilter(c)}>
            {c}
            <span>{c === 'All' ? top.length : top.filter(r => r.category === c).length}</span>
          </button>
        ))}
      </div>

      <ul className="cert-grid">
        {shown.map(c => {
          const file = safeFile(c.file_path);
          const verify = safeUrl(c.verify_url);
          const subs = children[c.slug];
          return (
            <li key={c.slug} className="cert-card">
              <a className="thumb" href={file || undefined} target="_blank" rel="noopener noreferrer" tabIndex={file ? 0 : -1}>
                <img src={`certificates/thumbs/${c.slug}.jpg`} alt="" loading="lazy" width="480" height="340" />
                <span className="cat">{c.category}</span>
              </a>
              <div className="cert-body">
                <p className="issuer">{c.issuer}</p>
                <h3>{c.title}</h3>
                <p className="meta">
                  {fmtDate(c.issued_on)}
                  {c.details && <> · {c.details}</>}
                </p>
                {c.credential_id && <p className="cred">ID {c.credential_id}</p>}
                <div className="cert-links">
                  {file && <a href={file} target="_blank" rel="noopener noreferrer">View certificate</a>}
                  {verify && <a href={verify} target="_blank" rel="noopener noreferrer">Verify ↗</a>}
                </div>
                {subs && (
                  <div className="subs">
                    <button className="subs-toggle" aria-expanded={open === c.slug}
                      onClick={() => setOpen(open === c.slug ? null : c.slug)}>
                      {open === c.slug ? 'Hide' : 'Show'} {subs.length} courses
                    </button>
                    {open === c.slug && (
                      <ol>
                        {subs.map(s => (
                          <li key={s.slug}>
                            <a href={safeFile(s.file_path) || undefined} target="_blank" rel="noopener noreferrer">{s.title}</a>
                            <span>{fmtDate(s.issued_on)}</span>
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
