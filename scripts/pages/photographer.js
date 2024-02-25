import getPhotographers from '../utils/api.js';
import {
  photographerFactory,
  mediaFactory,
} from '../factories/photographer.js';
import openLightbox from '../utils/lightbox.js';
// créer le header du photographe
function headerPhotographer(photographer) {
  const photographeName = document.querySelector('.photograph-name');
  const photographeLocation = document.querySelector('.photograph-location');
  const photographeTagline = document.querySelector('.photograph-tagline');
  const photographeHeader = document.querySelector('.photograph-header');

  photographeName.innerText = photographer.name;
  photographeLocation.innerText = photographer.location;
  photographeTagline.innerText = photographer.tagline;

  const img = document.createElement('img');
  img.setAttribute('src', photographer.portrait);
  img.setAttribute('alt', photographer.name);
  img.setAttribute('tabindex', 0);
  img.classList.add('img-rounded');
  photographeHeader.appendChild(img);
}

// Fonction pour afficher la galerie d'images
function displayMedia(medias) {
  const imagesContainer = document.getElementById('photographer-images');
  // console.log(imagesContainer);
  imagesContainer.innerHTML = '';
  // console.log(medias);
  medias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    imagesContainer.appendChild(mediaCardDOM);
  });
}

// Fonction d'initialisation
async function init() {
  // Récupération de l'ID du photographe
  const params = new URL(document.location).searchParams;
  const photographerId = params.get('id');

  // mettre le condition
  // Vérifier si l'ID existe et est une valeur valide avant la création de la carte du média
  //  if (!photographerId) {
  //   // Redirection vers la page d'accueil si l'ID est inexistant ou incorrect
  //   window.location.href = 'http://127.0.0.1:5500/index.html';
  //   return null;
  // }

  // Récupération de l'objet photographe correspondant avec ses medias
  const photographers = await getPhotographers();
  // console.log(photographers);
  const photographer = photographers.find((item) => item.id == photographerId);
  // const photographerMedias = photographer.medias;
  // console.log(photographer.medias);
  // console.log('photographer avec ses medias:',photographer);
  // console.log(' ses medias:',photographer.medias);
  // affichage le header du photographe
  headerPhotographer(photographer);
  //   const sortedMedias = sortMediaBy('likes',photographer.medias);
  // affichage la galerie du photographe
  displayMedia(photographer.medias);

  // afficher le nombre du like et le tarif
  // Récupération des valeurs pour la bannière des likes
  const countLikes = document.querySelector('.count-likes');
  // console.log(countLikes);
  const tarif = document.querySelector('.tarif');
  // console.log(tarif);
  // On tag le total des likes et du tarif journalier dans la bannière
  let totalLikes = photographer.medias.reduce((sum, obj) => sum + obj.likes, 0);
  // console.log(totalLikes);
  countLikes.innerText = totalLikes;
  // countLikes.innerText = `${totalLikes}`;
  tarif.innerText = `${photographer.price}€/jour`;

  // Evenement 'click' sur toute la partie main
  const main = document.getElementById('main');
  main.addEventListener('click', (event) => {
    //  récupèration des coordonnées du click
    const x = event.clientX;
    const y = event.clientY;
    // console.log(x,y);
    // console.log(event.target);
    // console.log(event.target.tagName);
    if (
      (event.target.tagName === 'IMG' || event.target.tagName === 'VIDEO')
      && event.target.parentElement.className !== 'photograph-header'
    ) {
      const photographerMedias = photographer.medias;
      // console.log(photographerMedias);
      const mediaId = event.target.id;
      // console.log(mediaId);
      const media = photographerMedias.find((media) => media.id === mediaId);
      // console.log(media);
      const mediaIndex = photographerMedias.indexOf(media);
      // console.log(mediaIndex);
      openLightbox(photographerMedias, x, y, mediaIndex);
    }
    // On incrémente une seule fois les compteurs de likes lorsqu'on clique dessus
    // if (event.target.className === 'fa-regular fa-heart') {
    //   const liked = event.target.parentElement;
    //   // console.log(liked);

    //   if (!liked.classList.contains('liked')) {
    //     liked.classList.add('liked');
    //     totalLikes += 1;
    //     countLikes.innerText = `${totalLikes}`;

    //     // Changer la classe de l'icône de cœur de 'fa-regular' à 'fa-solid'
    //     const heartIcons = liked.querySelector('.fa-regular.fa-heart');
    //     heartIcons.classList.remove('fa-regular');
    //     heartIcons.classList.add('fa-solid');
    //     const likeCount = liked.querySelector('span');
    //     likeCount.textContent = parseInt(likeCount.textContent, 10) + 1;
    //   }
    //   // je vide le coeur et decremente le compte des likes
    // }
  });
  // Fonction pour gérer les événements de clic et de touche Entrée
//   function handleLikeEvent(event) {
//     // On incrémente une seule fois les compteurs de likes lorsqu'on clique dessus
//     if (event.target.className === 'fa-regular fa-heart' || (event.key === 'Enter' && event.target.classList.contains('fa-regular') && event.target.parentElement.className === 'liked')) {
//       const liked = event.target.parentElement;

//       if (!liked.classList.contains('liked')) {
//         liked.classList.add('liked');
//         totalLikes += 1;
//         countLikes.innerText = `${totalLikes}`;

//         // Changer la classe de l'icône de cœur de 'fa-regular' à 'fa-solid'
//         const heartIcons = liked.querySelector('.fa-regular.fa-heart');
//         heartIcons.classList.remove('fa-regular');
//         heartIcons.classList.add('fa-solid');

//         const likeCount = liked.querySelector('span');
//         likeCount.textContent = parseInt(likeCount.textContent, 10) + 1;
//       }
//       // je vide le coeur et decremente le compte des likes
//     }
//   }

//   // Ajouter un écouteur d'événements pour les clics
//   document.addEventListener('click', handleLikeEvent);

//   // Ajouter un écouteur d'événements pour les touches Entrée
//   document.addEventListener('keydown', handleLikeEvent);

// }



  let lastLikedElement = null;

  // const countLikes = document.getElementById('countLikes'); // Assurez-vous d'ajuster l'ID en conséquence

  function handleLikeEvent(event) {
    const liked = event.target.parentElement;
    const heartIcon = liked.querySelector('.fa-heart');

    if (
      (event.target.classList.contains('fa-regular') && liked && !liked.classList.contains('liked')) ||
      (event.key === 'Enter' && liked && liked.classList.contains('liked'))
    ) {
      if (!liked.classList.contains('liked')) {
        // Première fois qu'on aime
        liked.classList.add('liked');
        totalLikes += 1;
        countLikes.innerText = `${totalLikes}`;
  
        // Changer la classe de l'icône de cœur de 'fa-regular' à 'fa-solid'
        const heartIcons = liked.querySelector('.fa-regular.fa-heart');
        heartIcons.classList.remove('fa-regular');
        heartIcons.classList.add('fa-solid');
  
        const likeCount = liked.querySelector('span');
        likeCount.textContent = parseInt(likeCount.textContent, 10) + 1;
        lastLikedElement = liked;
      } else if (lastLikedElement === liked) {
        // Deuxième clic, annuler le like
        liked.classList.remove('liked');
        totalLikes -= 1;
        countLikes.innerText = `${totalLikes}`;
  
        // Changer la classe de l'icône de cœur de 'fa-solid' à 'fa-regular'
        
        heartIcon.classList.remove('fa-solid');
        heartIcon.classList.add('fa-regular');
  
        const likeCount = liked.querySelector('span');
        likeCount.textContent = parseInt(likeCount.textContent, 10) - 1;
        lastLikedElement = null;
      }
  
      event.stopPropagation(); // Empêche la propagation de l'événement
    }
  }
  

  // Ajouter un écouteur d'événements pour les clics
  document.addEventListener('click', handleLikeEvent);

  // Ajouter un écouteur d'événements pour les touches Entrée
  document.addEventListener('keydown', handleLikeEvent);}

init();
// L'attribut tabindex dans le contexte de
// la balise <img> est utilisé pour spécifier l'ordre de tabulation
// des éléments interactifs sur une page web
// En d'autres termes, il détermine comment la navigation par tabulation
// (en utilisant la touche Tab) se comporte lorsque l'utilisateur parcourt
// les éléments de la page.
