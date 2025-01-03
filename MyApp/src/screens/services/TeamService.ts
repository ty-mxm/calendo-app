// src/services/TeamService.ts
import { Team } from '../models/Team';

const teams: Team[] = [
  {
    id: '1',
    name: 'Team 1',
    members: ['Sofia', 'Bob'],
    bucketlists: [],
  },
  {
    id: '2',
    name: 'Team 2',
    members: ['Charlie', 'Yanis'],
    bucketlists: [],
  },
  {
    id: '3',
    name: 'Team 3',
    members: ['Ty', 'Jean'],
    bucketlists: [],
  },
];

export const TeamService = {
  getAllTeams: async (): Promise<Team[]> => {
    return teams; // Simule une réponse de l'API
  },
  getTeamById: async (id: string): Promise<Team | undefined> => {
    return teams.find((team) => team.id === id);
  },
  getTeamByName: async (name: string): Promise<Team | undefined> => {
    return teams.find((team) => team.name === name);
  },
  createTeam: async (teamName: string): Promise<Team> => {
    const newTeam: Team = {
      id: `${Date.now()}`, // Simule un ID unique
      name: teamName,
      members: [],
      bucketlists: [],
    };
    teams.push(newTeam);
    return newTeam;
  },
  addMember: async (teamId: string, memberName: string): Promise<void> => {
    const team = teams.find((team) => team.id === teamId);
    if (team && !team.members.includes(memberName)) {
      team.members.push(memberName);
    }
  },
  async updateTeamMembers(teamName: string, members: string[]) {
    const team = teams.find((t) => t.name === teamName);
    if (team) {
      team.members = members;
    }
  },
  removeMember: async (teamId: string, memberName: string): Promise<void> => {
    const team = teams.find((team) => team.id === teamId);
    if (team) {
      team.members = team.members.filter((member) => member !== memberName);
    }
  },
};
