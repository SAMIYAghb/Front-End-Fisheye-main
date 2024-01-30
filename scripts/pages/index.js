// import  {photographerTemplate} from '../templates/photographer.js';

//      async function getPhotographers() {
//         try {
//             const response = await fetch('../../data/photographers.json');           
//             if (!response.ok) {
//                 throw new Error(`Erreur HTTP: ${response.status}`);
//             }
//             const data = await response.json();
//             // console.log(response);
//             // console.log(data);
//             // console.log(data.photographers);
//             // console.log(data.media);
//             return data;   
//         } catch (error) {
//             console.error('Erreur lors de la récupération des photographes:', error.message);
//             // afficher un message à l'utilisateur ou effectuer une action spécifique.
//         }
//     }
    
//     // getPhotographers();
//     async function displayData(photographers) {
//         const photographersSection = document.querySelector(".photographer_section");

//         photographers.forEach((photographer) => {
//             const photographerModel = photographerTemplate(photographer);
//             console.log(photographerModel);
//             const userCardDOM = photographerModel.getUserCardDOM();

//             //  Créer un lien vers la page détaillée avec l'ID du photographe
//         const link = document.createElement('a');
//         link.setAttribute('href', `photographer.html?id=${photographer.id}`);
//         link.appendChild(userCardDOM);
//             // photographersSection.appendChild(userCardDOM);
//             // Ajoutez le lien à la section des photographes

//              // Améliorations pour l'accessibilité
//         link.setAttribute('aria-label', `Voir les détails du photographe ${photographer.name}`);
//         link.addEventListener('focus', () => {
//             // Ajoutez un style visuel pour indiquer que le lien est actuellement focusé
//             link.style.outline = '2px solid blue';
//         });
//         link.addEventListener('blur', () => {
//             // Réinitialisez le style visuel lorsqu'on quitte le focus
//             link.style.outline = 'none';
//         });
        
//         photographersSection.appendChild(link);
//         });
//     }

//     async function init() {
//         // Récupère les datas des photographes
//         const { photographers } = await getPhotographers();
//         // console.log(photographers);
//         displayData(photographers);
//     }
    
//     init();
   

// Affiche les données des photographes
function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

// Initialisation
async function init() {
    
    
    //On attend la récupération des données
    const photographers = await getPhotographers();
    console.log(photographers);
    displayData(photographers);

}

init();
    
