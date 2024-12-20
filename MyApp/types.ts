export interface Event {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  category: string;
}

export interface BucketlistCategory {
  title: string;
  emoji: string;
  color: string;
  itemsCount: number;
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
  BucketlistDetails: { category: BucketlistCategory };
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
  SyncCalendar: undefined;
};
