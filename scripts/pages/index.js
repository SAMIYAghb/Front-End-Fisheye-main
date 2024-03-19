import getPhotographers from '../models/getPhotographers.js';
import PhotographerFactory from '../models/Photographer.js';

// Affiche les données des photographes
function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographerData) => {
    const photographer = PhotographerFactory.createPhotographer(photographerData);
    // console.log(photographer)

    const userCardDOM = photographer.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

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
//   window.location.href = 'index.html';
//   return null;
// }
