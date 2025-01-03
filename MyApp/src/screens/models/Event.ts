export interface Event {
    id?: string; // Peut être généré localement ou récupéré depuis l'API
    title: string;
    location: string;
    date: string; // Format ISO
    time: string; // Format ISO
    category: string;
  }
  