import { EventService } from '../services/EventService'; // Service pour les interactions avec les données
import { Event } from '../models/Event'; // Modèle pour la structure des événements

export const EventController = {
  /**
   * Récupère tous les événements disponibles
   * @returns {Promise<Event[]>} - Liste des événements
   */
  getAllEvents: async (): Promise<Event[]> => {
    try {
      return await EventService.getAllEvents();
    } catch (error) {
      console.error("Erreur lors de la récupération des événements :", error);
      throw new Error("Impossible de récupérer les événements.");
    }
  },

  /**
   * Récupère un événement par son ID
   * @param {string} id - ID de l'événement
   * @returns {Promise<Event | undefined>} - L'événement correspondant ou undefined
   */
  getEventById: async (id: string): Promise<Event | undefined> => {
    try {
      return await EventService.getEventById(id);
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'événement avec l'ID ${id} :`, error);
      throw new Error("Impossible de récupérer l'événement.");
    }
  },

  /**
   * Crée un nouvel événement
   * @param {Event} event - Les données de l'événement à créer
   * @returns {Promise<void>}
   */
  createEvent: async (event: Event): Promise<void> => {
    try {
      await EventService.createEvent(event);
    } catch (error) {
      console.error("Erreur lors de la création de l'événement :", error);
      throw new Error("Impossible de créer l'événement.");
    }
  },

  /**
   * Met à jour un événement existant
   * @param {Event} event - Les données mises à jour de l'événement
   * @returns {Promise<void>}
   */
  updateEvent: async (event: Event): Promise<void> => {
    try {
      await EventService.updateEvent(event);
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'événement avec l'ID ${event.id} :`, error);
      throw new Error("Impossible de mettre à jour l'événement.");
    }
  },

  /**
   * Supprime un événement par son ID
   * @param {string} id - ID de l'événement à supprimer
   * @returns {Promise<void>}
   */
  deleteEvent: async (id: string): Promise<void> => {
    try {
      await EventService.deleteEvent(id);
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'événement avec l'ID ${id} :`, error);
      throw new Error("Impossible de supprimer l'événement.");
    }
  },
};
