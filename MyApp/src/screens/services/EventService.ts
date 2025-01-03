import { Event } from '../models/Event';

const events: Event[] = [
  {
    id: '1',
    title: 'Réunion d’équipe',
    location: 'Salle 101',
    date: '2025-01-03',
    time: '10:00',
    category: 'Travail',
  },
  {
    id: '2',
    title: 'Sortie en équipe',
    location: 'Parc central',
    date: '2025-01-05',
    time: '14:00',
    category: 'Loisir',
  },
];

export const EventService = {
  getAllEvents: async (): Promise<Event[]> => {
    return events; // Simule une réponse de l'API
  },
  getEventById: async (id: string): Promise<Event | undefined> => {
    return events.find((event) => event.id === id);
  },
  createEvent: async (event: Event): Promise<void> => {
    event.id = (events.length + 1).toString(); // Simule l'ajout d'un ID
    events.push(event);
  },
  updateEvent: async (updatedEvent: Event): Promise<void> => {
    const index = events.findIndex((event) => event.id === updatedEvent.id);
    if (index !== -1) {
      events[index] = updatedEvent;
    }
  },
  deleteEvent: async (id: string): Promise<void> => {
    const index = events.findIndex((event) => event.id === id);
    if (index !== -1) {
      events.splice(index, 1);
    }
  },
};
