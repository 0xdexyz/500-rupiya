/* The supplied photography. `bg` records each file's background so it can be
   blended into the section it sits on instead of showing as a box:
     white  → shown on a white product plinth
     black  → screen-blended into dark sections, or shown on a black plinth
     photo  → a lifestyle photograph, cropped with object-fit: cover */

export type MediaId =
  | 'infinioUltraRic'
  | 'infinioUltraIte'
  | 'held'
  | 'signiaSilver'
  | 'signiaBlack'
  | 'inCanalCase'
  | 'inEar'
  | 'bte'
  | 'customIte'
  | 'resoundCase'
  | 'lineup'
  | 'infinioCase';

export interface MediaItem {
  src: string;
  alt: string;
  w: number;
  h: number;
  bg: 'white' | 'black' | 'photo';
}

export const media: Record<MediaId, MediaItem> = {
  infinioUltraRic: {
    src: '/images/phonak-infinio-ultra-ric.jpg',
    alt: 'Phonak Infinio Ultra receiver-in-canal hearing aids',
    w: 1280,
    h: 1280,
    bg: 'black',
  },
  infinioUltraIte: {
    src: '/images/phonak-infinio-ultra-ite.jpg',
    alt: 'Phonak Infinio Ultra in-the-ear hearing aids',
    w: 1280,
    h: 1280,
    bg: 'black',
  },
  held: {
    src: '/images/hearing-aid-held.jpg',
    alt: 'Phonak hearing aid held between finger and thumb',
    w: 1280,
    h: 853,
    bg: 'photo',
  },
  signiaSilver: {
    src: '/images/signia-ric-silver.jpg',
    alt: 'Signia receiver-in-canal hearing aid, with a woman holding a hearing aid',
    w: 1000,
    h: 1000,
    bg: 'white',
  },
  signiaBlack: {
    src: '/images/signia-ric-black.jpg',
    alt: 'Signia receiver-in-canal hearing aids, with a woman wearing a hearing aid',
    w: 1000,
    h: 1000,
    bg: 'white',
  },
  inCanalCase: {
    src: '/images/in-canal-charging-case.jpg',
    alt: 'Small in-canal hearing aids in an open charging case',
    w: 1280,
    h: 720,
    bg: 'white',
  },
  inEar: {
    src: '/images/hearing-aid-in-ear.jpg',
    alt: 'Close-up of a hearing aid worn in the ear',
    w: 400,
    h: 400,
    bg: 'photo',
  },
  bte: {
    src: '/images/behind-the-ear-hearing-aids.jpg',
    alt: 'Three behind-the-ear hearing aids',
    w: 768,
    h: 363,
    bg: 'white',
  },
  customIte: {
    src: '/images/custom-in-the-ear.jpg',
    alt: 'Custom in-the-ear hearing aid',
    w: 900,
    h: 900,
    bg: 'white',
  },
  resoundCase: {
    src: '/images/resound-charging-case.jpg',
    alt: 'ReSound hearing aids in their charging case',
    w: 1350,
    h: 1000,
    bg: 'white',
  },
  lineup: {
    src: '/images/phonak-lineup.jpg',
    alt: 'Phonak hearing aids in silver, champagne and black',
    w: 516,
    h: 387,
    bg: 'white',
  },
  infinioCase: {
    src: '/images/phonak-infinio-charging-case.jpg',
    alt: 'Phonak Infinio hearing aids with charging case',
    w: 1521,
    h: 1600,
    bg: 'white',
  },
};
