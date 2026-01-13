import { Roast } from '@/types/roast';
import xrp from './xrp.json';
import wbGamesSundance from './wb-games-sundance.json';

export const roasts: Roast[] = [
  wbGamesSundance as Roast,
  xrp as Roast,
];

export function getRoast(slug: string): Roast | undefined {
  return roasts.find(r => r.slug === slug);
}

export function getAllRoasts(): Roast[] {
  return roasts;
}
