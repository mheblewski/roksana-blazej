import { CardSection } from '../types';

export const CARD_SECTIONS: CardSection[] = [
  {
    id: 'intro',
    tag: 'Save the Date',
    title: 'Roksana\n& Błażej',
    cardLead: '27 maja 2027',
    cardNote: 'Stodoła Jordanów',
    sideTitle: 'Bierzemy ślub!',
    sideLead: 'Zachowaj tę datę, bo chcemy ją spędzić z Tobą.',
    facts: [
      ['Data', '27 maja 2027'],
      ['Miejsce', 'Stodoła Jordanów'],
    ],
    visual: 'date',
  },
  {
    id: 'when',
    tag: 'Kiedy',
    title: 'Czwartek,\nBoże Ciało',
    cardLead: 'Start: 17:00',
    cardNote: '27 maja 2027',
    sideTitle: 'Plan wieczoru',
    sideLead: 'Najpierw ceremonia, później wesele, muzyka i taniec.',
    facts: [
      ['17:00', 'ceremonia ślubna'],
      ['po ceremonii', 'przyjęcie weselne'],
    ],
    visual: 'calendar',
  },
  {
    id: 'where',
    tag: 'Gdzie',
    title: 'Stodoła\nJordanów',
    cardLead: 'Jordanów 4B',
    cardNote: '95-060 Jordanów',
    sideTitle: 'Lokalizacja',
    sideLead: 'Jordanów 4B, 95-060 Jordanów',
    facts: [],
    visual: 'map',
  },
  {
    id: 'countdown',
    tag: 'Odliczanie',
    title: 'Do wielkiego\ndnia',
    cardLead: 'Czekamy razem',
    cardNote: '27 maja 2027, 17:00',
    sideTitle: 'Coraz bliżej',
    sideLead: 'Licznik prowadzi do rozpoczęcia ceremonii.',
    facts: [],
    visual: 'countdown',
  },
  {
    id: 'finale',
    tag: 'Do zobaczenia',
    title: 'Będzie nam\nbardzo miło',
    cardLead: 'że będziesz z nami',
    cardNote: 'Roksana & Błażej',
    sideTitle: 'Do zobaczenia',
    sideLead: 'Zapisz datę i widzimy się 27 maja 2027.',
    facts: [
      ['Para', 'Roksana i Błażej'],
      ['Data', '27 maja 2027'],
      ['Start', '17:00'],
    ],
    visual: 'note',
  },
];

export const TOTAL_STEPS = CARD_SECTIONS.length + 1;
