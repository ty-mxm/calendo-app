// src/controllers/TeamController.ts
import { TeamService } from '../services/TeamService';
import { Team } from '../models/Team';

export const TeamController = {
  getAllTeams: async (): Promise<Team[]> => {
    try {
      return await TeamService.getAllTeams();
    } catch (error) {
      console.error("Erreur lors de la récupération des équipes :", error);
      throw new Error("Impossible de récupérer les équipes.");
    }
  },
  getTeamById: async (id: string): Promise<Team | undefined> => {
    try {
      return await TeamService.getTeamById(id);
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'équipe avec l'ID ${id} :`, error);
      throw new Error("Impossible de récupérer l'équipe.");
    }
  },
  async saveTeamChanges(teamName: string, members: string[]) {
    
    await TeamService.updateTeamMembers(teamName, members);
  },
  getTeamByName: async (name: string) => {
    return await TeamService.getTeamByName(name);
  },
  createTeam: async (teamName: string): Promise<Team> => {
    try {
      return await TeamService.createTeam(teamName);
    } catch (error) {
      console.error("Erreur lors de la création de l'équipe :", error);
      throw new Error("Impossible de créer l'équipe.");
    }
  },
  addMember: async (teamId: string, memberName: string): Promise<void> => {
    try {
      await TeamService.addMember(teamId, memberName);
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un membre :", error);
      throw new Error("Impossible d'ajouter le membre.");
    }
  },
  removeMember: async (teamId: string, memberName: string): Promise<void> => {
    try {
      await TeamService.removeMember(teamId, memberName);
    } catch (error) {
      console.error("Erreur lors de la suppression d'un membre :", error);
      throw new Error("Impossible de supprimer le membre.");
    }
  },
  deleteTeam: async (teamId: string): Promise<void> => {
    try {
      const response = await fetch(`https://votre-api.com/api/teams/${teamId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // Gestion des erreurs en fonction du code de statut
        if (response.status === 404) {
          throw new Error("L'équipe n'existe pas.");
        } else {
          throw new Error("Erreur lors de la suppression de l'équipe.");
        }
      }
    } catch (error: unknown) {
      // Lancer une erreur personnalisée pour la remonter à l'appelant
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Erreur inconnue lors de la suppression.");
      }
    }
  },
};