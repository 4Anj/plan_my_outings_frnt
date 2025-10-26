const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = {
  // Groups
  createGroup: async (data: { name: string; mood: string; budget_level: string }) => {
    const response = await fetch(`${API_URL}/group`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  joinGroup: async (code: string, data: { name: string; lat?: number; lng?: number }) => {
    const response = await fetch(`${API_URL}/group/${code}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getGroup: async (code: string) => {
    const response = await fetch(`${API_URL}/group/${code}`);
    return response.json();
  },

  getSuggestions: async (code: string, source: 'google' | 'tmdb') => {
    const response = await fetch(`${API_URL}/group/${code}/suggestions?source=${source}`, {
      method: 'POST',
    });
    return response.json();
  },

  createPoll: async (code: string, data: { title: string; options: Array<{id: string; title: string}> }) => {
    const response = await fetch(`${API_URL}/group/${code}/polls`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  votePoll: async (code: string, pollId: number, data: { member_id: number; option_id: string; emoji: string }) => {
    const response = await fetch(`${API_URL}/group/${code}/polls/${pollId}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  sendChat: async (code: string, data: { member_id: number; message: string }) => {
    const response = await fetch(`${API_URL}/group/${code}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};