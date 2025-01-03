import { User } from '../models/User';

const BASE_URL = 'http://192.168.2.26:3000/api/auth';

export async function registerUser(user: User): Promise<void> {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erreur lors de l’inscription');
  }
}

export async function loginUser(email: string, password: string): Promise<string> {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erreur lors de la connexion');
  }

  const data = await response.json();
  return data.token; // Supposant que l'API retourne un token
}

export async function logoutUser(): Promise<void> {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erreur lors de la déconnexion');
  }
}
