// src/models/Team.ts
export interface Team {
    id: string;
    name: string;
    members: string[];
    bucketlists: string[]; // Liste des IDs de bucketlists associées
  }
  