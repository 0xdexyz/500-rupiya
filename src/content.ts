import type { MediaId } from './media';

/* All site copy and business data lives here.
   Empty strings mean "not supplied yet": the UI hides those fields until they
   are filled in, so nothing is ever invented. */

const env = import.meta.env;

export const site = {
  name: 'Hearing Sensitivity',
  tagline: 'Professional hearing care and modern hearing solutions, with personalised support across our branches.',
  hours: 'Monday to Saturday, 9am – 5pm',
  /** Contact numbers. The first is the main number, used wherever there is a single "Call" action. */
  phones: ['+91 97756 28498', '+91 90460 81118', '+91 89005 12563'],
  /** Leave empty until confirmed: empty fields are hidden. */
  email: '',
  /** WhatsApp number with country code, digits only (e.g. 91XXXXXXXXXX). Optional. */
  whatsapp: '',
  /** Where appointment requests are POSTed as JSON (a form service or webhook). Set VITE_APPOINTMENT_URL. */
  appointmentEndpoint: (env.VITE_APPOINTMENT_URL as string | undefined) ?? '',
  bookHref: '/contact#book',
};

/** tel: link for a phone number as displayed. */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

export const socials = [
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/hearing.sensitivity/' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/share/1AD1614e8d/' },
  { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@hearingsensitivity' },
] as const;

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Hearing Aids', to: '/hearing-aids' },
  { label: 'Branches', to: '/branches' },
  { label: 'Contact', to: '/contact' },
];

export type IconName =
  | 'ear'
  | 'chat'
  | 'tune'
  | 'support'
  | 'speech'
  | 'chip'
  | 'person'
  | 'compass'
  | 'pin'
  | 'clock'
  | 'phone'
  | 'mail'
  | 'calendar';

export interface Branch {
  id: string;
  number: string;
  name: string;
  /** Fill in once verified. Empty fields are not shown. */
  address: string;
  hours: string;
  phone: string;
  /** The branch's Google Maps link. */
  mapsUrl: string;
}

export const branches: Branch[] = [
  { id: 'tarkeshwar', number: '01', name: 'Tarkeshwar', address: '', hours: site.hours, phone: '', mapsUrl: '' },
  {
    id: 'singur',
    number: '02',
    name: 'Singur',
    address: '1st Floor, Reliance Smart Building, Kismat Apurbapur, Natun Bazar, Singur, West Bengal 712409',
    hours: site.hours,
    phone: '',
    mapsUrl: '',
  },
  { id: 'arambagh', number: '03', name: 'Arambagh', address: '', hours: site.hours, phone: '', mapsUrl: '' },
];

/** Google Maps link for a branch. Until its exact link is added, this opens a Maps search
    for the branch's address, or for the branch name when no address is known yet. */
export const directionsUrl = (b: Branch) =>
  b.mapsUrl ||
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.address ? `${site.name}, ${b.address}` : `${site.name} ${b.name}`)}`;

export const services: { id: string; title: string; body: string; icon: IconName }[] = [
  { id: 'assessment', title: 'Hearing Assessment', body: 'Professional evaluation to understand your hearing needs.', icon: 'ear' },
  {
    id: 'consultation',
    title: 'Hearing Aid Consultation',
    body: 'Guidance in choosing a hearing solution suited to your hearing requirements and lifestyle.',
    icon: 'chat',
  },
  { id: 'fitting', title: 'Hearing Aid Fitting', body: 'Personalised fitting and adjustment for comfortable everyday use.', icon: 'tune' },
  {
    id: 'support',
    title: 'Hearing Aid Support',
    body: 'Guidance, adjustments and ongoing assistance to help you get the most from your hearing device.',
    icon: 'support',
  },
  { id: 'speech', title: 'Hearing & Speech Support', body: 'Support for hearing and communication needs where appropriate.', icon: 'speech' },
  {
    id: 'technology',
    title: 'Hearing Technology',
    body: 'Access to modern hearing solutions from established hearing-technology brands.',
    icon: 'chip',
  },
];

export const trust: { title: string; body: string; icon: IconName }[] = [
  { title: 'Personalised Care', body: 'Advice shaped around your hearing, your routine and the people you talk to most.', icon: 'person' },
  { title: 'Professional Guidance', body: 'Clear explanations at every step, from assessment to everyday use.', icon: 'compass' },
  { title: 'Advanced Hearing Technology', body: 'Modern hearing solutions from established hearing-technology brands.', icon: 'chip' },
  { title: 'Multiple Convenient Locations', body: 'Branches in Tarkeshwar, Singur and Arambagh.', icon: 'pin' },
];

export const benefits: { title: string; body: string; tone: string }[] = [
  { title: 'Personalised Guidance', body: 'Solutions selected around individual hearing needs.', tone: 'navy' },
  { title: 'Professional Fitting', body: 'Hearing devices are fitted and adjusted for comfortable use.', tone: 'teal' },
  { title: 'Modern Technology', body: 'Access to contemporary hearing-aid solutions.', tone: 'slate' },
  { title: 'Ongoing Support', body: 'Continued assistance after your hearing-aid fitting.', tone: 'ocean' },
  { title: 'Convenient Locations', body: 'Multiple branches for easier access to hearing care.', tone: 'ink' },
];

export interface Category {
  id: string;
  name: string;
  body: string;
  image: MediaId;
}

/** Hearing-aid styles, each illustrated with one of the supplied photographs. */
export const categories: Category[] = [
  {
    id: 'bte',
    name: 'Behind-the-Ear',
    body: 'A versatile style that rests behind the ear, with sound carried into the ear through a slim tube or wire.',
    image: 'bte',
  },
  {
    id: 'ric',
    name: 'Receiver-in-Canal',
    body: 'A small, discreet style with the speaker placed inside the ear canal.',
    image: 'signiaSilver',
  },
  {
    id: 'ite',
    name: 'In-the-Ear',
    body: 'Shaped to sit within the outer ear, with no part resting behind it.',
    image: 'customIte',
  },
  {
    id: 'rechargeable',
    name: 'Rechargeable Hearing Solutions',
    body: 'Hearing aids that charge in their case, without small batteries to change.',
    image: 'resoundCase',
  },
];

/** Products pictured in the supplied photography. Names follow the branding visible in each
    image. They are examples of hearing technology, not a price list or a stock list. */
export const products: { id: string; name: string; category: string; image: MediaId }[] = [
  { id: 'infinio-ultra-ric', name: 'Phonak Infinio Ultra', category: 'ric', image: 'infinioUltraRic' },
  { id: 'infinio-ultra-ite', name: 'Phonak Infinio Ultra', category: 'ite', image: 'infinioUltraIte' },
  { id: 'infinio-case', name: 'Phonak Infinio with charging case', category: 'rechargeable', image: 'infinioCase' },
  { id: 'phonak-lineup', name: 'Phonak hearing aids', category: 'ric', image: 'lineup' },
  { id: 'signia-silver', name: 'Signia receiver-in-canal', category: 'ric', image: 'signiaSilver' },
  { id: 'signia-black', name: 'Signia receiver-in-canal', category: 'ric', image: 'signiaBlack' },
  { id: 'bte', name: 'Behind-the-ear hearing aids', category: 'bte', image: 'bte' },
  { id: 'custom-ite', name: 'Custom in-the-ear hearing aid', category: 'ite', image: 'customIte' },
  { id: 'resound-case', name: 'ReSound with charging case', category: 'rechargeable', image: 'resoundCase' },
  { id: 'in-canal-case', name: 'In-canal hearing aids with charging case', category: 'rechargeable', image: 'inCanalCase' },
];

export const home = {
  hero: {
    label: 'Hearing care',
    /* [word] marks the words the highlight moves between. */
    lines: ['Better [Hearing].', 'Better [Connection].'],
    body: 'Personalised hearing care and advanced hearing solutions, professionally fitted around your individual needs.',
    cta: 'Book an Appointment',
    secondary: 'Explore Hearing Solutions',
    /* What fills the right of the first screen:
       'photo'   a photograph from `image`, running to the edge of the screen and fading into the page
       'product' a product cut-out from `image`, floating on the page (`shadow` adds a ground shadow) */
    kind: 'photo' as 'photo' | 'product',
    image: 'heroWearer' as MediaId,
    shadow: false,
  },
  trust: { label: 'Why people come to us' },
  about: {
    label: 'About',
    heading: 'Care That Starts\nWith Listening',
    text: 'Hearing Sensitivity is focused on helping people [hear more clearly] and stay connected to the people and moments that matter. From hearing assessment and consultation to hearing-aid fitting and ongoing support, our approach combines [professional care] with [modern hearing technology].',
    link: 'More about us',
  },
  services: {
    label: 'Services',
    heading: 'Complete Hearing Care',
    body: 'From your first hearing assessment to support long after your fitting, each step is explained clearly and arranged around you.',
    link: 'View all services',
  },
  solutions: {
    label: 'Hearing aids',
    heading: 'Advanced Hearing\nSolutions',
    body: 'Explore modern hearing-aid solutions designed around comfort, clarity and everyday life.',
    explore: 'Explore',
  },
  featured: {
    label: 'Technology',
    heading: 'Modern Technology.\nPersonalised Care.',
    body: 'Modern hearing technology can be compact, discreet and designed for everyday life. Our team helps you understand your options and find a solution suited to your hearing needs.',
    cta: 'Explore Hearing Aids',
    image: 'infinioUltraRic' as MediaId,
  },
  life: {
    label: 'Everyday life',
    heading: 'Designed For\nReal Life',
    body: 'Modern hearing aids are designed to fit naturally into everyday routines. With the right technology, professional fitting and ongoing support, hearing care can become a comfortable part of daily life.',
    /* large photograph, round close-up, and a product that fits the daily routine */
    images: { main: 'held', round: 'inEar', side: 'signiaBlack' } as Record<'main' | 'round' | 'side', MediaId>,
  },
  why: { label: 'Why choose us', heading: 'Why Choose\nHearing Sensitivity' },
  branches: {
    label: 'Branches',
    heading: 'Find Hearing Sensitivity\nNear You',
    text: 'Visit us in [Tarkeshwar], [Singur] or [Arambagh]. Choose a branch to get directions or book an appointment.',
  },
  cta: {
    label: 'Appointments',
    heading: 'Ready To Hear\nMore Clearly?',
    body: 'Speak with our team to discuss your hearing needs and explore suitable hearing solutions.',
  },
};

/** The care path drawn in the services diagram. */
export const journey = {
  source: 'You',
  targets: [
    { label: 'Assessment', tone: 'teal', icon: 'ear' as IconName },
    { label: 'Consultation', tone: 'blue', icon: 'chat' as IconName },
    { label: 'Fitting', tone: 'slate', icon: 'tune' as IconName },
    { label: 'Support', tone: 'sand', icon: 'support' as IconName },
  ],
};

export const about = {
  hero: {
    label: 'About',
    heading: 'Care That Starts\nWith Listening',
    body: 'Hearing Sensitivity is focused on helping people hear more clearly and stay connected to the people and moments that matter. From hearing assessment and consultation to hearing-aid fitting and ongoing support, our approach combines professional care with modern hearing technology.',
  },
  principles: {
    label: 'How we work',
    items: [
      { title: 'We listen first', body: 'Each visit starts with a conversation about how you hear day to day, and the situations you would like to hear better in.' },
      { title: 'Personalised guidance', body: 'Hearing solutions are selected around your individual hearing needs, comfort and routine, and explained in plain language.' },
      { title: 'Professional fitting', body: 'Hearing devices are fitted and adjusted so they feel comfortable for everyday use.' },
      { title: 'Ongoing support', body: 'Help continues after your fitting, with guidance and adjustments as you settle in.' },
      { title: 'Care close to home', body: 'Branches in Tarkeshwar, Singur and Arambagh make appointments and follow-up visits easier to reach.' },
    ],
  },
  approach: {
    label: 'Our approach',
    text: 'From your first assessment to everyday use, we help you understand your hearing, explore suitable options and feel comfortable with your hearing aids. Family members are welcome to join appointments and ask questions.',
  },
  technology: {
    label: 'Technology with a human touch',
    heading: 'Modern hearing technology, explained clearly',
    body: 'Hearing aids today can be small, discreet and designed around everyday life. We take the time to explain the options, so you and your family can decide with confidence.',
    steps: ['Assessment', 'Consultation', 'Fitting', 'Support'],
    image: 'lineup' as MediaId,
  },
  branches: { label: 'Our branches' },
  cta: home.cta,
};

export const servicesPage = {
  hero: {
    label: 'Services',
    heading: 'Complete\nHearing Care',
    body: 'Professional hearing care at every stage, from understanding your hearing to living comfortably with your hearing aids.',
  },
  list: { label: 'What we offer' },
  journey: {
    label: 'Your visit',
    heading: 'One clear path, from first visit to everyday use',
    body: 'Most people begin with a hearing assessment. From there, we talk through suitable options, fit and adjust your hearing aids, and stay available for support.',
  },
  cta: home.cta,
};

export const hearingAidsPage = {
  hero: {
    label: 'Hearing aids',
    heading: 'Advanced Hearing\nSolutions',
    body: 'Explore modern hearing-aid solutions designed around comfort, clarity and everyday life.',
    image: 'infinioUltraIte' as MediaId,
  },
  styles: { label: 'Hearing aid styles', all: 'All styles' },
  note: 'Hearing aids shown are examples of modern hearing technology. Our team will explain which options suit your hearing needs.',
  choose: {
    label: 'Choosing a hearing aid',
    heading: 'We help you choose with confidence',
    body: 'The right hearing aid depends on your hearing, your lifestyle and what feels comfortable. We guide you through each step.',
    steps: ['Hearing assessment', 'Consultation and guidance', 'Fitting and follow-up'],
  },
  unsure: {
    label: 'Not sure which style?',
    text: 'You do not need to know which hearing aid you want before you visit. Book an appointment and we will explain the options that suit you.',
  },
  cta: home.cta,
};

export const branchesPage = {
  hero: {
    label: 'Branches',
    heading: 'Find Hearing Sensitivity\nNear You',
    body: 'Three branches, one standard of care. Choose the branch that is easiest for you to reach.',
  },
  list: { label: 'Our branches' },
  visit: {
    label: 'Visiting us',
    text: 'All three branches are open [Monday to Saturday, 9am – 5pm]. Booking ahead helps us give you the time you need.',
  },
  cta: home.cta,
};

export const contactPage = {
  hero: {
    label: 'Contact',
    heading: 'Get In Touch',
    body: 'Speak with our team to discuss your hearing needs, ask a question or arrange an appointment at your nearest branch.',
  },
  book: {
    label: 'Appointment enquiry',
    heading: 'Book an Appointment',
    body: 'Share a few details and our team will contact you to arrange a suitable time.',
  },
};

export const privacy = {
  label: 'Privacy',
  heading: 'Privacy',
  body: [
    'This website does not use advertising cookies or tracking. Your light or dark theme choice is stored in your own browser only.',
    'Details you enter in the appointment form are sent to Hearing Sensitivity so that our team can respond to your enquiry.',
  ],
};
