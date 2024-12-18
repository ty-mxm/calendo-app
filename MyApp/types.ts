// types.ts

export interface Event {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  category: string;
}
export type RootStackParamList = {
  Home: { newEvent?: Omit<Event, 'id'> };
  AddEvent: { selectedTeam?: string };
  EditEvent: { event: Event };
  Main: undefined;
  Teams: undefined;
  AddTeam: undefined;
  TeamDetails: { teamName: string };
  EventDetails: { eventName: string; team: string; bucketlist: string; category: string };
  Bucketlists: undefined;
  BucketlistDetails: undefined; 
  Calendar: undefined;         
  CalendarDetails: undefined;  
  Dashboard: undefined;        
  Notifications: undefined;    
  NotificationsSettings: undefined; // Ajout ici
  Profile: undefined;
  Settings: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  SignUp: undefined;
  GetStarted: undefined;
  
};


