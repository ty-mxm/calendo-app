export type RootStackParamList = {
  Home: undefined;
  EventDetails: { event: Event };
  AddEvent: undefined;
  EditEvent: { event: Event };
  Main: undefined; 
  Teams: { newTeam: string }; 
  TeamDetails: { teamName: string };
  
};

// Interface pour les événements
export interface Event {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  category: string;
}
