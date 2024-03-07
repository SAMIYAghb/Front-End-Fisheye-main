import getPhotographers from '../utils/getPhotographers.js';
import { photographerFactory } from '../factories/photographer.js';

// Affiche les données des photographes
function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

// Fonction pour vérifier si l'ID du photographe est valide
// export default function isValidPhotographerId(photographerId, photographers) {
//   return photographers.some((photographer) => photographer.id === photographerId);
// }
// Initialisation
async function init() {
  // On attend la récupération des données
  const photographers = await getPhotographers();
  // console.log(photographers);
  displayData(photographers);
}

init();

// code a mettre dans photographer js
// Vérifier si l'ID est valide
// if (!photographerId || !isValidPhotographerId(photographerId, photographers)) {
//   // Redirection vers la page d'accueil si l'ID est inexistant ou incorrect
//   window.location.href = 'http://127.0.0.1:5500/index.html';
//   return null;
// }
