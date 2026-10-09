import { MARK, WORD } from './logoPaths.js';

export function LogoMark({ className }) {
  return (
    <svg className={className} viewBox="0 0 455.52 262" fill="currentColor" role="img" aria-label="Anas Danfor logo">
      {MARK.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

export function LogoFull({ className }) {
  return (
    <svg className={className} viewBox="0 0 455.52 348.91" fill="currentColor" role="img" aria-label="Anas Danfor logo">
      {[...MARK, ...WORD].map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}
