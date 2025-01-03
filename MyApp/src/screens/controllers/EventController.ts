import { EventService } from '../services/EventService';
import { Event } from '../models/Event';

export const EventController = {
  getAllEvents: async (): Promise<Event[]> => {
    return await EventService.getAllEvents();
  },
  getEventById: async (id: string): Promise<Event | undefined> => {
    return await EventService.getEventById(id);
  },
  createEvent: async (event: Event): Promise<void> => {
    await EventService.createEvent(event);
  },
  updateEvent: async (event: Event): Promise<void> => {
    await EventService.updateEvent(event);
  },
  deleteEvent: async (id: string): Promise<void> => {
    await EventService.deleteEvent(id);
  },
};
