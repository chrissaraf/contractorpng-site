// Projects from the offers archive (jobs that went ahead). Public info only: area and year,
// never client names, addresses, amounts or photos of clients' homes.
export type Project = {
  id: number;
  cat: 'rep' | 'ren' | 'new';
  kind: 'tower' | 'house' | 'plan' | 'stone' | 'green';
  title: string;
  text: string;
  place: string;
  year: number;
  services: string[];
  wide?: boolean;
};

export const catLabel = { rep: 'Επισκευή', ren: 'Ανακαίνιση', new: 'Κατασκευή' } as const;

export const projects: Project[] = [
  { id: 1, cat: 'new', kind: 'stone', wide: true, title: 'Τρεις πέτρινες κατοικίες τύπου κελί', text: 'Νέα κατασκευή τριών παραδοσιακών κατοικιών των 45 m² η καθεμία, στην κυκλαδίτικη αρχιτεκτονική.', place: 'Αλινοβροχιά, Σέριφος', year: 2026, services: ['nisia-petrines-katoikies'] },
  { id: 2, cat: 'rep', kind: 'tower', title: 'Αποκατάσταση πολυκατοικίας', text: 'Άδεια μικρής κλίμακας, ικριώματα, οπλισμοί και βαφή όψης, μαρμαροποδιές, κιγκλιδώματα, καμινάδα.', place: 'Ζωγράφου', year: 2026, services: ['episkevi-opseon-feronta'] },
  { id: 3, cat: 'rep', kind: 'house', title: 'Ανανέωση κτιρίου στο Δασκαλειό', text: 'Ικριώματα, οπλισμοί, ανακαίνιση λουτρού, ηλεκτρολογικά, βαφές και θερμά αλουμίνια.', place: 'Δασκαλειό, Κερατέα', year: 2025, services: ['episkevi-opseon-feronta', 'energeiaki-anavathmisi', 'anakainiseis'] },
  { id: 4, cat: 'ren', kind: 'plan', title: 'Ιατρείο που έγινε κατοικία', text: 'Μετατροπή σε δύο επίπεδα: αποξηλώσεις, νέες τοιχοποιίες, υδραυλικά, ηλεκτρολογικά, πλακίδια.', place: 'Κηφισιά', year: 2026, services: ['anakainiseis', 'gypsosanides-ilektromichanologika'] },
  { id: 5, cat: 'rep', kind: 'stone', title: 'Κοινόχρηστα και κελί στο Λιβάδι', text: 'Οπλισμοί, επιχρίσματα, στεγανώσεις, δάπεδα, και εσωτερικά κελιού με καλαμωτή και αποκάλυψη πέτρας.', place: 'Λιβάδι, Σέριφος', year: 2026, services: ['nisia-petrines-katoikies', 'steganoseis', 'episkevi-opseon-feronta'] },
  { id: 6, cat: 'ren', kind: 'tower', wide: true, title: 'Υδραυλικά επτά μπάνιων και δύο κουζινών', text: 'Πλήρης υδραυλική εγκατάσταση με αποχέτευση, υδρορροές και ηλιακό, μαζί με επιχρίσματα και θερμοπρόσοψη.', place: 'Σίφνος', year: 2025, services: ['gypsosanides-ilektromichanologika', 'nisia-petrines-katoikies', 'energeiaki-anavathmisi'] },
  { id: 7, cat: 'new', kind: 'green', title: 'Θερμοκήπιο με αλουμίνια', text: 'Κατασκευή θερμοκηπίου με σκελετό και κουφώματα αλουμινίου.', place: 'Άγιος Στέφανος', year: 2025, services: [] },
];

export const projectsFor = (slug: string) => projects.filter((p) => p.services.includes(slug));
