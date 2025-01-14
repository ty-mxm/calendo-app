import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Event {
  id: string;
  title: string;
  date: string;
  team: string;
  location: string;
  startTime: string;
  endTime: string;
}

interface EventContextProps {
  events: Event[];
  addEvent: (newEvent: Event) => void;
}

const EventContext = createContext<EventContextProps | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);

  const addEvent = (newEvent: Event) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]); // Ajoute un événement à la liste
  };

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = (): EventContextProps => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
};
