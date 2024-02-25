// Factory pour générer les photographes de la page d'acceuil
function photographerFactory(data) {
  //  déstructuration pour extrait des propriétés de l'objet data
  const {
    name, portrait, location, tagline, price, id,
  } = data;

  // Vérifier si l'ID existe et est une valeur valide avant la création de la carte du photographe
  // if (!id) {
  // Redirection vers la page d'accueil si l'ID est inexistant
  // ou incorrectconsole.log('Redirection vers la page d\'accueil car l\'ID est
  // inexistant ou incorrect.');

  //   window.location.href = 'http://127.0.0.1:5500';
  //   return null;
  // }
  // console.log(window.location.href);

  function getUserCardDOM() {
    const article = document.createElement('article');
    article.innerHTML = `
            <a href="photographer.html?id=${id}" aria-label="photographer ${name}">
                <img src=${portrait} alt="${name}" class="photographer-img">
                <h2 class="photograph-name">${name}</h2>
            </a>
            <p class="photograph-location">${location}</p>
            <p class="photograph-tagline">${tagline}</p>
            <p class="photograph-price">${price}€/jour</p>
        `;
    return (article);
  }

  return {
    name, portrait, location, tagline, getUserCardDOM,
  };
}

// appeler photographerFactory avec un objet data,
// cela crée un objet contenant les propriétés spécifiées,
// appeler la fonction getUserCardDOM pour obtenir la représentation DOM de la carte du photographe.

// Factory pour générer la galerie d'images du photographe
function mediaFactory(media) {
  const {
    title, likes, price, date, type, url, id,
  } = media;
  // console.loag(url);

  function getMediaCardDOM() {
    const figure = document.createElement('figure');
    // remplacer les espaces par "%20" pour s'assurer que l'URI est correctement formaté.
    const uri = url.replace(' ', '%20');
    // figure.tabIndex = 0;
    // En fonction du type du média (image ou video), l'élément <figure>
    // est construit différemment :
    if (type === 'image') {
      figure.innerHTML = `
            <img src="${uri}" alt="${title}" title="${title}" id="${id}" tabindex="0">
            <figcaption>${title}</figcaption>
        `;
    } else {
      figure.innerHTML = `
            <video src="${uri}" type="video/mp4" alt="${title}" title="${title}" id="${id}" tabindex="0"></video>
            <figcaption class="video-caption">${title}</figcaption>
        `;
    }
    // quel que soit le type de média, un bloc commun est ajouté à l'élément <figure> :
    figure.innerHTML += `           
                <span  aria-label="likes">${likes}</span>           
                <i tabindex="0" class="fa-regular fa-heart"></i>
        `;
    return (figure);
  }

  return {
    title, likes, price, date, type, url, id, getMediaCardDOM,
  };
}

export { photographerFactory };
export { mediaFactory };
// Lorsqu'on' appele mediaFactory avec un objet media,
// cela crée un objet avec les propriétés spécifiées:
// et génère un élément <figure> qui représente la carte du média.
