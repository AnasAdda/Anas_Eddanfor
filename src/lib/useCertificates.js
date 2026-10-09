import { useEffect, useState } from 'react';
import { supabase } from './supabase.js';
import fallback from '../certificates.json';

const byOrder = (a, b) => a.sort_order - b.sort_order;

// Renders the bundled list immediately, then swaps in the live rows from Supabase.
export default function useCertificates() {
  const [rows, setRows] = useState(() => [...fallback].sort(byOrder));

  useEffect(() => {
    let cancelled = false;
    supabase
      .from('certificates')
      .select('slug, title, issuer, category, issued_on, credential_id, verify_url, file_path, details, parent_slug, sort_order')
      .order('sort_order')
      .then(({ data, error }) => {
        if (!cancelled && !error && data?.length) setRows(data);
      });
    return () => { cancelled = true; };
  }, []);

  return rows;
}

export const topLevelCount = fallback.filter(c => !c.parent_slug).length;
