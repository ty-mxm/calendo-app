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
  Teams: { newTeam: string };
  AddTeam: undefined;
  TeamDetails: { teamName: string };
  EventDetails: { event: Event };
  Bucketlists: undefined;
  BucketlistDetails: undefined;
  Calendar: undefined;
  CalendarDetails: undefined;
  Dashboard: undefined;
  Notifications: undefined;
  NotificationsSettings: undefined;
  Profile: undefined;
  Settings: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  SignUp: undefined;
  GetStarted: undefined;
  ChangePassword: undefined;
};
