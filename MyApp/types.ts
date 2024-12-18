export type RootStackParamList = {
  Home: { newEvent?: Omit<Event, 'id'> };
  AddEvent: { selectedTeam?: string };
  EditEvent: { event: Event };
  Main: undefined;
  Teams: undefined;
  TeamDetails: { teamName: string };
  EventDetails: { eventName: string; team: string; bucketlist: string; category: string };
  Bucketlists: undefined;
};

export interface Event {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  category: string;
}
