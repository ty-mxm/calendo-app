import { Choice } from '../models/Choice';
import { ChoiceService } from '../services/ChoiceService';

export const ChoiceController = {
    getChoices: async (eventId: string): Promise<Choice[]> => {
        return await fetch(`https://api.example.com/events/${eventId}/choices`).then((res) =>
          res.json()
        );
      },
      
      addChoice: async (eventId: string, choice: string): Promise<Choice> => {
        const response = await fetch(`https://api.example.com/events/${eventId}/choices`, {
          method: 'POST',
          body: JSON.stringify({ choice }),
          headers: { 'Content-Type': 'application/json' },
        });
        return response.json();
      },
      
      voteForChoice: async (eventId: string, choice: string) => {
        return await ChoiceService.voteForChoice(eventId, choice);
      },
      
};
