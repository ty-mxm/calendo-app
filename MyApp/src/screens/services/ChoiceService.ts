const choices = new Map<string, { choice: string; votes: number }[]>();

export const ChoiceService = {
  getChoices: async (eventId: string) => {
    return choices.get(eventId) || [];
  },
  addChoice: async (eventId: string, choice: string) => {
    const eventChoices = choices.get(eventId) || [];
    eventChoices.push({ choice, votes: 0 });
    choices.set(eventId, eventChoices);
  },
  voteForChoice: async (eventId: string, choice: string) => {
    const eventChoices = choices.get(eventId) || [];
    const index = eventChoices.findIndex((item) => item.choice === choice);
    if (index > -1) {
      eventChoices[index].votes += 1;
      choices.set(eventId, eventChoices);
    }
  },
};
