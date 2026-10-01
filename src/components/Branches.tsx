import { useRef, useState, type KeyboardEvent } from 'react';
import { branches, directionsUrl, type Branch } from '../content';
import { Pill } from './Bits';
import { Icon } from './Icons';
import { Arrow } from './Marks';

const bookHref = (b: Branch) => `/contact?branch=${b.id}#book`;

/** Address, hours and phone, showing only the details that have been supplied. */
function Facts({ b }: { b: Branch }) {
  return (
    <ul className="branch-facts">
      {b.address && (
        <li>
          <Icon name="pin" size={20} />
          <address>{b.address}</address>
        </li>
      )}
      {b.hours && (
        <li>
          <Icon name="clock" size={20} />
          <span>{b.hours}</span>
        </li>
      )}
      {b.phone && (
        <li>
          <Icon name="phone" size={20} />
          <a href={`tel:${b.phone.replace(/\s/g, '')}`}>{b.phone}</a>
        </li>
      )}
    </ul>
  );
}

function Actions({ b, light = false }: { b: Branch; light?: boolean }) {
  return (
    <div className="branch-actions">
      <a className={`pill pill-${light ? 'light' : 'auto'}`} href={directionsUrl(b)} target="_blank" rel="noreferrer">
        <span>Get Directions</span>
        <span className="pill-arrow">
          <Arrow dir="out" />
          <Arrow dir="out" />
        </span>
      </a>
      <Pill to={bookHref(b)} variant="ghost">
        Book Appointment
      </Pill>
    </div>
  );
}

/* Branch selector: tabs on a line, the selected branch's details beside them.
   Arrow keys move between branches, as with any tab list. */
export function BranchPicker() {
  const [active, setActive] = useState(0);
  const tabs = useRef<HTMLButtonElement[]>([]);
  const b = branches[active];

  const onKey = (e: KeyboardEvent) => {
    const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + branches.length) % branches.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="card picker" data-reveal>
      <div className="picker-tabs" role="tablist" aria-label="Branches" onKeyDown={onKey}>
        {branches.map((br, i) => (
          <button
            key={br.id}
            ref={(el) => {
              if (el) tabs.current[i] = el;
            }}
            role="tab"
            id={`tab-${br.id}`}
            aria-selected={i === active}
            aria-controls="branch-panel"
            tabIndex={i === active ? 0 : -1}
            className={`picker-tab ${i === active ? 'is-on' : ''}`}
            onClick={() => setActive(i)}
          >
            <span className="picker-node" aria-hidden="true" />
            <span className="micro">Branch {br.number}</span>
            <span className="picker-name">{br.name}</span>
          </button>
        ))}
      </div>
      <div className="picker-panel" id="branch-panel" role="tabpanel" aria-labelledby={`tab-${b.id}`} key={b.id}>
        <p className="micro">Branch {b.number}</p>
        <h3 className="picker-title">{b.name}</h3>
        <Facts b={b} />
        <Actions b={b} />
      </div>
    </div>
  );
}

/** One branch as a full card, for the branches page. */
export function BranchCard({ b, delay = 0 }: { b: Branch; delay?: number }) {
  return (
    <article className="card branch-card" id={b.id} data-reveal style={{ ['--d' as string]: `${delay}ms` }}>
      <div className="branch-card-head">
        <span className="num-badge">{b.number}</span>
        <span className="micro">Branch {b.number}</span>
      </div>
      <h3 className="branch-card-name">{b.name}</h3>
      <Facts b={b} />
      <Actions b={b} />
    </article>
  );
}
