export type RootStackParamList = {
  ForgotPassword: undefined;
  Login: undefined;
  SignUp: undefined;
  GetStarted: undefined;
  Home: undefined;
  Main: undefined;

  Teams: { newTeam?: string };
  AddTeam: undefined;
  TeamDetails: { teamName: string };

  AddEvent: undefined;
  EventDetails: { event: Event };
  EditEvent: { event: Event };

  Bucketlists: undefined;
  BucketlistDetails: undefined;

  Calendar: undefined;
  CalendarDetails: undefined;

  Dashboard: undefined;
  Notifications: undefined;
  NotificationsSettings: undefined;
  Profile: undefined;
  Settings: undefined;
};

export interface Event {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  category: string;
}
