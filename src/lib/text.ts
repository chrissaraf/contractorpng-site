// Greek capitals never carry accents.
export const caps = (s: string) => s.normalize('NFD').replace(/́/g, '').normalize('NFC').toUpperCase();
