// types.ts
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
  emoji?: string;
  color?: string;
  itemsCount: number;
}

export interface Team {
  id: string;
  name: string;
  members: string[];
  bucketlists: Bucketlist[];
}

export interface Bucketlist {
  category: string;
  items: BucketlistItem[];
}

export interface BucketlistItem {
  id: string;
  title: string;
  addedBy: string;
}

export type RootStackParamList = {
  Home: { newEvent?: Omit<Event, 'id'> };
  AddEvent: { selectedTeam?: string };
  EditEvent: { event: Event };
  Main: undefined;
  Teams: { newTeam?: string };
  AddTeam: undefined;
  TeamDetails: { teamName: string };
  EventDetails: { event: Event };
  Bucketlists: undefined;
  BucketlistDetails: { category: BucketlistCategory };
  AddBucketlist: { teamId: string };
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
