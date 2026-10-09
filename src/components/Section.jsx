import { useEffect, useRef, useState } from 'react';

export default function Section({ id, index, title, children, className = '' }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return setShown(true);
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id={id} ref={ref} className={`wrap section reveal ${shown ? 'in' : ''} ${className}`}>
      {title && (
        <header className="section-head">
          <span className="idx">{index}</span>
          <h2>{title}</h2>
          <span className="rule" />
        </header>
      )}
      {children}
    </section>
  );
}
