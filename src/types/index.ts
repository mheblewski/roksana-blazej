export type VisualType = 'date' | 'calendar' | 'map' | 'countdown' | 'note';

export interface CardSection {
  id: string;
  tag: string;
  title: string;
  cardLead: string;
  cardNote: string;
  sideTitle: string;
  sideLead: string;
  facts: [string, string][];
  visual: VisualType;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
