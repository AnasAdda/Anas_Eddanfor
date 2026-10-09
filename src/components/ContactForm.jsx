import { useState } from 'react';
import { supabase } from '../lib/supabase.js';
import Icon from './Icon.jsx';

const empty = { name: '', email: '', message: '', website: '' };

export default function ContactForm() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error | limited

  const update = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    // Hidden field only bots fill in.
    if (form.website) return setStatus('sent');
    setStatus('sending');
    const { error } = await supabase.from('contact_messages').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    });
    if (error) return setStatus(/too many/i.test(error.message) ? 'limited' : 'error');
    setForm(empty);
    setStatus('sent');
  }

  if (status === 'sent') {
    return (
      <div className="form-done" role="status">
        <span className="done-icon">✓</span>
        <h3>Message sent</h3>
        <p className="muted">Thanks for reaching out. I'll get back to you soon.</p>
        <button className="btn" onClick={() => setStatus('idle')}>Send another</button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="field-row">
        <label>
          <span>Name</span>
          <input name="name" value={form.name} onChange={update} required maxLength={120} autoComplete="name" />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" value={form.email} onChange={update} required maxLength={254} autoComplete="email" />
        </label>
      </div>
      <label>
        <span>Message</span>
        <textarea name="message" value={form.message} onChange={update} required maxLength={5000} rows={5} />
      </label>
      <input className="hp" name="website" value={form.website} onChange={update} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {status === 'limited' && <p className="form-error" role="alert">You've sent several messages already. Please try again in a few minutes.</p>}
      {status === 'error' && <p className="form-error" role="alert">Something went wrong. Please try again or email me directly.</p>}
      <button className="btn primary" type="submit" disabled={status === 'sending'}>
        <Icon name="mail" size={18} />{status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
