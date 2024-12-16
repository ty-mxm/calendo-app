export type RootStackParamList = {
  Home: undefined;
  EventDetails: { event: Event };
  AddEvent: undefined;
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