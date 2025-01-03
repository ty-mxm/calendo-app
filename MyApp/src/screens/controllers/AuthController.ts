import { registerUser, loginUser, logoutUser } from '../services/AuthService';
import { User } from '../models/User';

export async function handleRegister(user: User): Promise<void> {
    try {
      await registerUser(user);
      alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message || 'Erreur inconnue lors de l’inscription');
      } else {
        alert('Une erreur inattendue est survenue lors de l’inscription.');
      }
    }
  }
  
  export async function handleLogin(email: string, password: string): Promise<string | null> {
    try {
      const token = await loginUser(email, password);
      alert('Connexion réussie !');
      return token;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message || 'Erreur inconnue lors de la connexion');
      } else {
        alert('Une erreur inattendue est survenue lors de la connexion.');
      }
      return null;
    }
  }
  
  export async function handleLogout(): Promise<void> {
    try {
      await logoutUser();
      alert('Déconnexion réussie.');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message || 'Erreur inconnue lors de la déconnexion');
      } else {
        alert('Une erreur inattendue est survenue lors de la déconnexion.');
      }
    }
  }
  
