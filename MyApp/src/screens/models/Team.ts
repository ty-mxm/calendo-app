import { Choice } from "./Choice";

// src/models/Team.ts
export interface Team {
    id: string;
    name: string;
    members: string[];
    bucketlists: string[]; // Liste des IDs de bucketlists associées
    choices: Choice[]; 
    availableSlots: string[]; // Liste des slots disponibles pour les choix
  }
  