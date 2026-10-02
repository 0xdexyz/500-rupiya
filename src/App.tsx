import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { site } from './content';
import { syncThemeColor } from './lib/theme';
import Cursor from './components/Cursor';
import Footer from './components/Footer';
import Header from './components/Header';
import About from './pages/About';
import Branches from './pages/Branches';
import Contact from './pages/Contact';
import HearingAids from './pages/HearingAids';
import Home from './pages/Home';
import Services from './pages/Services';
import { NotFound, Privacy } from './pages/Simple';

const HOME_DESCRIPTION =
  'Explore personalised hearing care, hearing assessments, hearing-aid consultation, fitting and modern hearing solutions at Hearing Sensitivity.';

const META: Record<string, { title: string; description: string }> = {
  '/': { title: `${site.name} | Hearing Care & Hearing Aids`, description: HOME_DESCRIPTION },
  '/about': {
    title: `About | ${site.name}`,
    description: 'Hearing Sensitivity combines professional hearing care with modern hearing technology, from assessment to ongoing support.',
  },
  '/services': {
    title: `Hearing Care Services | ${site.name}`,
    description: 'Hearing assessment, hearing-aid consultation, fitting, support and hearing technology at Hearing Sensitivity.',
  },
  '/hearing-aids': {
    title: `Hearing Aids | ${site.name}`,
    description: 'Explore behind-the-ear, receiver-in-canal, in-the-ear and rechargeable hearing aids with guidance from Hearing Sensitivity.',
  },
  '/branches': {
    title: `Branches | ${site.name}`,
    description: 'Visit Hearing Sensitivity in Tarkeshwar, Singur or Arambagh. Get directions or book an appointment.',
  },
  '/contact': {
    title: `Contact & Appointments | ${site.name}`,
    description: 'Get in touch with Hearing Sensitivity or request an appointment at your nearest branch.',
  },
  '/privacy': { title: `Privacy | ${site.name}`, description: HOME_DESCRIPTION },
};

function useRouteChrome() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const meta = META[pathname] ?? { title: `Page not found | ${site.name}`, description: HOME_DESCRIPTION };
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
    syncThemeColor();
    if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
}

export default function App() {
  useRouteChrome();
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/hearing-aids" element={<HearingAids />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Cursor />
    </>
  );
}
