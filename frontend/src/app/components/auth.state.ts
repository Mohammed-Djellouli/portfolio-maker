import { signal } from "@angular/core";

// Signal pour suivre l'état de connexion de l'utilisateur
/** on utilise un variable globale pour suivre l'état de connexion, cela permet de
    mettre à jour la navbar et d'autres composants en temps 
    réel lorsque l'utilisateur se connecte ou se déconnecte. */
export const authState = signal(!!localStorage.getItem('token'));

