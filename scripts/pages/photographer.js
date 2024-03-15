import getPhotographers from '../models/getPhotographers.js';
import {
  mediaFactory,
} from '../factories/photographer.js';
import openLightbox from '../models/lightbox.js';

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
// selectionner les element de la selectBox
const sortImagesButton = document.getElementById('sort-images-button');
const sortImagesSelect = document.getElementById('sort-images-select');
// console.log(sortImagesSelect);// ul
const dropdownOptions = sortImagesSelect.querySelectorAll('li');
// console.log(dropdownOptions);
// const sortDropdown = sortImagesSelect.parentElement;

// Fonction pour afficher la galerie d'images
function displayMedia(medias) {
  const imagesContainer = document.getElementById('photographer-images');
  // console.log(imagesContainer);
  imagesContainer.innerHTML = '';
  medias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    imagesContainer.appendChild(mediaCardDOM);
  });
}

// selectBox
// tri des images
function sortMediaBy(sortBy, media) {
  // console.log(sortBy, media);

  const updateButton = sortBy.replace('likes', 'Popularité').replace('date', 'Date').replace('title', 'Titre');
  sortImagesButton.innerText = updateButton;
  const comparator = (a, b) => {
    if (a[sortBy] > b[sortBy]) return 1;
    if (a[sortBy] < b[sortBy]) return -1;
    return 0;
  };

  return media.sort(updateButton === 'Titre' ? comparator : (a, b) => comparator(b, a));
}
//  sélection le filtre (par click ou par touches)
function selectedFilter(event, medias) {
  // console.log(event, medias);
  //  désélectionner tous les éléments de la liste déroulante (dropdownOptions).
  dropdownOptions.forEach((option) => {
    option.setAttribute('aria-selected', 'false');
  });
  event.setAttribute('aria-selected', 'true');
  // la valeur associée à cet élément est extraite
  // via l'attribut data-value et stockée dans la variable selectedOption.
  const selectedOption = event.getAttribute('data-value');
  // console.log(selectedOption);

  // ferme le menu déroulant
  sortImagesButton.setAttribute('aria-expanded', 'false');
  sortImagesButton.removeAttribute('class');
  sortImagesSelect.removeAttribute('class');
  // Tri les images
  const sortedMedia = sortMediaBy(selectedOption, medias);
  // Affiche les images triées
  displayMedia(sortedMedia);
}

// Fonction d'initialisation
async function init() {
  // Récupération de l'ID du photographe
  const params = new URL(document.location).searchParams;
  const photographerId = parseInt(params.get('id'), 10);
  console.log(photographerId);

  if (Number.isNaN(photographerId)) {
    window.location.href = 'index.html';
  }

  // Récupération de l'objet photographe correspondant avec ses medias
  const photographers = await getPhotographers();

  const photographer = photographers.find((item) => item.id === photographerId);

  // affichage le header du photographe
  headerPhotographer(photographer);

  // affichage la galerie du photographe
  // const sortedMedias = sortMediaBy('likes', photographer.medias);
  displayMedia(photographer.medias);
  // displayMedia(sortedMedias);

  // afficher le nombre du like et le tarif
  // Récupération des valeurs pour la bannière des likes
  const countLikes = document.querySelector('.count-likes');
  const tarif = document.querySelector('.tarif');
  // On tag le total des likes et du tarif journalier dans la bannière
  let totalLikes = photographer.medias.reduce((sum, obj) => sum + obj.likes, 0);
  countLikes.innerText = totalLikes;
  // countLikes.innerText = `${totalLikes}`;
  tarif.innerText = `${photographer.price}€/jour`;

  // Evenement 'click' sur toute la partie main
  const main = document.getElementById('main');

  main.addEventListener('click', (event) => {
    const isMediaElement = event.target.tagName === 'IMG' || event.target.tagName === 'VIDEO';

    if (isMediaElement) {
      // Gérer le clic sur les médias (si nécessaire)
      //  récupèration des coordonnées du click
      const x = event.clientX;
      const y = event.clientY;
      // console.log(event.target.tagName);
      if (
        (event.target.tagName === 'IMG' || event.target.tagName === 'VIDEO')
      && event.target.parentElement.className !== 'photograph-header'
      ) {
        const photographerMedias = photographer.medias;
        const mediaId = event.target.id;
        /* eslint-disable eqeqeq */
        const media = photographerMedias.find((medi) => medi.id == mediaId);
        /* eslint-enable eqeqeq */
        const mediaIndex = photographerMedias.indexOf(media);
        openLightbox(photographerMedias, x, y, mediaIndex);
      }
    }

    // click sur le bouton du filtre
    // Vérifie si l'élément déclencheur de l'événement
    // (event.target)a un attribut id='sort-images-button'
    if (event.target.id === 'sort-images-button') {
      sortImagesButton.setAttribute('aria-expanded', 'true');
      sortImagesButton.classList.toggle('active');
      sortImagesSelect.classList.toggle('active');
      dropdownOptions[0].focus();
    }

    // click sur les choix du filtre
    if (event.target.tagName === 'LI') {
      selectedFilter(event.target, photographer.medias);
      // if (event.key === 'Enter') {
      //   event.preventDefault();
      //   selectedFilter(event.target, photographer.medias);
      // }
    }
  });

  // lancer la lightbox en cliquant sur Entrée
  const imagesContainer = document.getElementById('photographer-images');
  imagesContainer.addEventListener('keydown', (event) => {
    // console.log('yyyyy');
    const isMediaElement = event.target.tagName === 'IMG' || event.target.tagName === 'VIDEO';
    if (isMediaElement && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      event.stopPropagation();
      // Gérer l'événement pour les médias (ouvrir la lightbox, par exemple)
      const photographerMedias = photographer.medias;
      const mediaId = event.target.id;
      /* eslint-disable eqeqeq */
      const media = photographerMedias.find((medi) => medi.id == mediaId);
      /* eslint-enable eqeqeq */
      const mediaIndex = photographerMedias.indexOf(media);
      const x = window.innerWidth / 2;
      const y = window.innerHeight / 2;
      openLightbox(photographerMedias, x, y, mediaIndex);
    }
  });

  // likes
  let lastLikedElement = null;
  function handleLikeClick(event) {
    const liked = event.target.parentElement;
    // console.log(liked);
    if (
      event.target.classList.contains('fa-regular') && liked
      && !liked.classList.contains('liked')
    ) {
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
      event.stopPropagation(); // Empêche la propagation de l'événement
    } else if (lastLikedElement === liked) {
      // Deuxième clic, annuler le like
      liked.classList.remove('liked');
      totalLikes -= 1;
      countLikes.innerText = `${totalLikes}`;
      // Changer la classe de l'icône de cœur de 'fa-solid' à 'fa-regular'
      const heartIcon = liked.querySelector('.fa-solid.fa-heart');
      heartIcon.classList.remove('fa-solid');
      heartIcon.classList.add('fa-regular');
      const likeCount = liked.querySelector('span');
      likeCount.textContent = parseInt(likeCount.textContent, 10) - 1;
      lastLikedElement = null;
      event.stopPropagation(); // Empêche la propagation de l'événement
    }
  }
  function handleLikeEnter(event) {
    if (event.key === 'Enter') {
      const liked = event.target.parentElement;
      // console.log(liked);
      if (
        event.target.classList.contains('fa-regular') && liked
        && !liked.classList.contains('liked')
      ) {
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
        event.stopPropagation(); // Empêche la propagation de l'événement
      } else if (lastLikedElement === liked) {
        // Deuxième clic, annuler le like
        liked.classList.remove('liked');
        totalLikes -= 1;
        countLikes.innerText = `${totalLikes}`;
        // Changer la classe de l'icône de cœur de 'fa-solid' à 'fa-regular'
        const heartIcon = liked.querySelector('.fa-solid.fa-heart');
        heartIcon.classList.remove('fa-solid');
        heartIcon.classList.add('fa-regular');
        const likeCount = liked.querySelector('span');
        likeCount.textContent = parseInt(likeCount.textContent, 10) - 1;
        lastLikedElement = null;
        event.stopPropagation(); // Empêche la propagation de l'événement
      }
    }
  }
  // Ajouter un écouteur d'événements pour les clics
  document.addEventListener('click', handleLikeClick);
  // Ajouter un écouteur d'événements pour les touches Entrée
  document.addEventListener('keydown', handleLikeEnter);

  // Ajouter un écouteur d'événements à la liste déroulante
  sortImagesSelect.addEventListener('keydown', (event) => {
  // Si la touche est "Entrée" ou "Espace", et que l'élément actif est une option
    if ((event.key === 'Enter' || event.key === ' ') && event.target.tagName === 'LI') {
      event.preventDefault(); // Empêcher le comportement par défaut de la touche "Espace"
      selectedFilter(event.target, photographer.medias);
    }
  });
  // Définir le filtre initial sur "Popularité" et afficher les médias triés
  const initialFilterOption = sortImagesSelect.querySelector('[data-value="likes"]');
  selectedFilter(initialFilterOption, photographer.medias);
}

init();
// L'attribut tabindex dans le contexte de
// la balise <img> est utilisé pour spécifier l'ordre de tabulation
// des éléments interactifs sur une page web
// En d'autres termes, il détermine comment la navigation par tabulation
// (en utilisant la touche Tab) se comporte lorsque l'utilisateur parcourt
// les éléments de la page.
