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
function isValidPhotographerId(photographerId, photographers) {
  return photographers.some((photographer) => photographer.id == photographerId);
}
// Initialisation
async function init() {
  // On attend la récupération des données
  const photographers = await getPhotographers();
  // console.log(photographers);
  displayData(photographers);
}

init();
