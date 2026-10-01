import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { branches, services, site, telHref } from '../content';
import { Arrow } from './Marks';

type Field = 'name' | 'phone' | 'branch' | 'service' | 'date' | 'message';
type Status = 'idle' | 'sending' | 'sent' | 'whatsapp' | 'email' | 'offline' | 'error';

const EMPTY: Record<Field, string> = { name: '', phone: '', branch: '', service: '', date: '', message: '' };

const MAIN = site.phones[0];
const callUs = MAIN ? (
  <>
    call us on <a href={telHref(MAIN)}>{MAIN}</a>
  </>
) : null;

function statusMessage(status: Status): ReactNode {
  switch (status) {
    case 'sent':
      return 'Thank you. Your request has been sent, and our team will contact you to confirm a time.';
    case 'whatsapp':
      return 'Your request is ready in WhatsApp. Press send there to complete it.';
    case 'email':
      return 'Your request is ready in your email app. Press send there to complete it.';
    case 'offline':
      return callUs ? (
        <>
          Online requests are not available at the moment. Please {callUs} ({site.hours}), or visit your preferred branch.
        </>
      ) : (
        `Online requests are not available at the moment. Please visit your preferred branch, ${site.hours}.`
      );
    case 'error':
      return callUs ? <>Sorry, your request could not be sent. Please try again, or {callUs}.</> : 'Sorry, your request could not be sent. Please try again.';
    default:
      return null;
  }
}

function localToday() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

/* Appointment request. It is delivered through whichever channel is configured in
   content.ts: a JSON endpoint first, then WhatsApp, then email. With none set, the
   visitor is told plainly to visit a branch instead of being shown a false success. */
export default function AppointmentForm() {
  const [params] = useSearchParams();
  const preset = branches.find((b) => b.id === params.get('branch'))?.name ?? '';
  const [values, setValues] = useState({ ...EMPTY, branch: preset });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const today = useMemo(localToday, []);

  // a branch's "Book Appointment" link can arrive while this page is already open
  useEffect(() => {
    if (preset) setValues((v) => ({ ...v, branch: preset }));
  }, [preset]);

  const set = (k: Field) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
    if (status !== 'idle' && status !== 'sending') setStatus('idle');
  };

  const validate = () => {
    const e: Partial<Record<Field, string>> = {};
    if (values.name.trim().length < 2) e.name = 'Please enter your full name.';
    const digits = values.phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 13) e.phone = 'Please enter a phone number we can call you on.';
    if (!values.branch) e.branch = 'Please choose a branch.';
    if (values.date && values.date < today) e.date = 'Please choose today or a later date.';
    return e;
  };

  const summary = () => {
    const date = values.date
      ? new Date(`${values.date}T00:00:00`).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
      : 'Flexible';
    return [
      `Appointment request for ${site.name}`,
      `Name: ${values.name.trim()}`,
      `Phone: ${values.phone.trim()}`,
      `Branch: ${values.branch}`,
      `Service: ${values.service || 'Not sure yet'}`,
      `Preferred date: ${date}`,
      values.message.trim() && `Message: ${values.message.trim()}`,
    ]
      .filter(Boolean)
      .join('\n');
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    const found = validate();
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const text = summary();

    if (site.appointmentEndpoint) {
      setStatus('sending');
      try {
        const res = await fetch(site.appointmentEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // `content` lets a chat webhook (e.g. Discord) post the summary as-is
          body: JSON.stringify({ ...values, content: text, submittedAt: new Date().toISOString() }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus('sent');
        setValues({ ...EMPTY });
      } catch {
        setStatus('error');
      }
      return;
    }
    if (site.whatsapp) {
      window.open(`https://wa.me/${site.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      setStatus('whatsapp');
      return;
    }
    if (site.email) {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Appointment request: ${values.branch}`)}&body=${encodeURIComponent(text)}`;
      setStatus('email');
      return;
    }
    setStatus('offline');
  };

  const err = (k: Field) =>
    errors[k] ? (
      <span className="field-error" id={`${k}-error`}>
        {errors[k]}
      </span>
    ) : null;
  const aria = (k: Field) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${k}-error` : undefined });

  return (
    <form ref={formRef} className="card appt-form" onSubmit={submit} noValidate data-reveal>
      <div className="field">
        <label htmlFor="f-name">
          Full Name <span aria-hidden="true">*</span>
        </label>
        <input id="f-name" name="name" type="text" autoComplete="name" required value={values.name} onChange={set('name')} {...aria('name')} />
        {err('name')}
      </div>
      <div className="field">
        <label htmlFor="f-phone">
          Phone Number <span aria-hidden="true">*</span>
        </label>
        <input
          id="f-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          value={values.phone}
          onChange={set('phone')}
          {...aria('phone')}
        />
        {err('phone')}
      </div>
      <div className="field">
        <label htmlFor="f-branch">
          Preferred Branch <span aria-hidden="true">*</span>
        </label>
        <select id="f-branch" name="branch" required value={values.branch} onChange={set('branch')} {...aria('branch')}>
          <option value="">Choose a branch</option>
          {branches.map((b) => (
            <option key={b.id} value={b.name}>
              {b.name}
            </option>
          ))}
        </select>
        {err('branch')}
      </div>
      <div className="field">
        <label htmlFor="f-service">Service Required</label>
        <select id="f-service" name="service" value={values.service} onChange={set('service')}>
          <option value="">Not sure yet</option>
          {services.map((s) => (
            <option key={s.id} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="f-date">Preferred Date</label>
        <input id="f-date" name="date" type="date" min={today} value={values.date} onChange={set('date')} {...aria('date')} />
        {err('date')}
      </div>
      <div className="field field-wide">
        <label htmlFor="f-message">Message</label>
        <textarea id="f-message" name="message" rows={4} value={values.message} onChange={set('message')} />
      </div>
      <div className="form-foot field-wide">
        <button className="pill pill-dark form-submit" type="submit" disabled={status === 'sending'}>
          <span>{status === 'sending' ? 'Sending…' : 'Request Appointment'}</span>
          <span className="pill-arrow">
            <Arrow />
            <Arrow />
          </span>
        </button>
        <p className="form-note">Fields marked * are required. We use these details only to arrange your appointment.</p>
      </div>
      <p className={`form-status ${status}`} role="status" aria-live="polite">
        {statusMessage(status)}
      </p>
    </form>
  );
}
