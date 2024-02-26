// // l'utilisation des classes pour récupérer des données à
// // partir d'une API, construire des objets représentant les photographes et
// // les médias,
// // Récupération des données avec fetch
// class Api {
//   // La classe Api prend une URL en paramètre lors de son instanciation.
//   constructor(url) {
//     this._url = url;
//   }

//   // La méthode get utilise l'API Fetch pour effectuer une requête GET à l'URL spécifiée.
//   async get() {
//     try {
//       // console.log('Fetching data from:', this._url);
//       const response = await fetch(this._url);
//       if (!response.ok) {
//         throw new Error("La réponse du réseau n'est pas correcte");
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return null;
//       // console.error('Erreur sur la récupération des données:', error);
//     }
//   }
// }

// // Construction du photographe
// // La classe Photographer est utilisée pour créer des objets représentant
// // des photographes à partir des données fournies.
// class Photographer {
//   constructor(data) {
//     this._name = data.name;
//     this._id = data.id;
//     this._city = data.city;
//     this._country = data.country;
//     this._tagline = data.tagline;
//     this._price = data.price;
//     this._portrait = data.portrait;
//   }

//   // méthodes d'accès (get) pour récupérer différentes propriétés du photographe.
//   get name() { return this._name; }

//   get id() { return this._id; }

//   get tagline() { return this._tagline; }

//   get price() { return this._price; }

//   // ournir un chemin d'accès complet à l'image du portrait du photographe.
//   get portrait() { return `assets/photographers/small/${this._portrait}`; }

//   get location() { return `${this._city}, ${this._country}`; }

//   // get medias() { return []; }
//   get medias() {
//     return this._medias || [];
//   }
// }

// // Construction des medias
// // La classe Media est utilisée pour créer des objets représentant
// // des médias à partir des données fournies
// class Media {
//   constructor(data) {
//     this._id = data.id;
//     this._photographerId = data.photographerId;
//     this._title = data.title;
//     this._likes = data.likes;
//     this._date = data.date;
//     this._price = data.price;
//     this._image = data.image;
//     this._video = data.video;
//     this._type = null;
//     this._url = null;
//   }

//   // get méthode d'accès pour récupérer différentes propriétés du média
//   get id() { return this._id; }

//   get photographerId() { return this._photographerId; }

//   get title() { return this._title; }

//   get likes() { return this._likes; }

//   get date() { return this._date; }

//   get price() { return this._price; }

//   // Les propriétés type et url sont dynamique en fonction des propriétés _image et _video.
//   get type() {
//     if (this._type === null) {
//       if (this._image) {
//         this._type = 'image';
//       } else if (this._video) {
//         this._type = 'video';
//       }
//     }
//     return this._type;
//   }

//   get url() {
//     if (this._url === null) {
//       if (this._type === 'image') {
//         this._url = this._image;
//       } else if (this._type === 'video') {
//         this._url = this._video;
//       }
//     }
//     return this._url;
//   }
// }
// // Récupération des données et construction des objets de chaque photographe
// // la fonction getPhotographers utilise la classe Api pour récupérer
// // les données des photographes et des médias depuis des fichiers JSON.
// async function getPhotographers() {
//   const api = new Api('./data/photographers.json');
//   const data = await api.get();

//   const photographers = data.photographers.map((photographerData) => {
//     // crée des objets Photographer pour chaque photographe
//     const photographer = new Photographer(photographerData);
//     // console.log('Photographer:', photographer);
//     return {
//       name: photographer.name,
//       id: photographer.id,
//       tagline: photographer.tagline,
//       price: photographer.price,
//       portrait: photographer.portrait,
//       location: photographer.location,
//       medias: photographer.medias,
//     };
//   });
//   // crée des objets Media pour chaque média.
//   const medias = data.media.map((mediaData) => {
//     const media = new Media(mediaData);
//     // console.log('media:', media);
//     return {
//       id: media.id,
//       photographerId: media.photographerId,
//       title: media.title,
//       likes: media.likes,
//       date: media.date,
//       price: media.price,
//       type: media.type,
//       url: media.url,
//     };
//   });

//   // Ajout d'un tableau contenant les medias pour chaque photographe
//   // associe les médias à leurs photographes respectifs en ajoutant
//   // un tableau medias à chaque objet photographe.
//   medias.forEach((media) => {
//     const photographer = photographers.find((p) => p.id === media.photographerId);
//     const tmpName = photographer.name;
//     const tmpUrl = media.url;
//     // Les URLs des médias sont ajustées en fonction du type (image ou vidéo)
//     // et du nom du photographe.
//     if (photographer) {
//       if (media.type === 'image') {
//         // media.url = `assets/images/${tmpName}/small/${tmpUrl}`
//         media.url = `assets/images/${tmpName}/${tmpUrl}`;
//         photographer.medias.push(media);
//         // console.log(media.url);
//       } else {
//         media.url = `assets/images/${tmpName}/${tmpUrl}`;
//         photographer.medias.push(media);
//         // console.log(media.url);
//       }
//     }
//   });
//   return photographers;
// }
// // export { getPhotographers };
// export default getPhotographers;
/**/
// import Photographer from './Photographer.js';
// import Media from './Media.js';

// class Api {
//   constructor(url) {
//     this.url = url;
//   }

//   async get() {
//     try {
//       const response = await fetch(this.url);
//       if (!response.ok) {
//         throw new Error("La réponse du réseau n'est pas correcte");
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return null;
//     }
//   }
// }

// class Photographer {
//   constructor(data) {
//     this.name = data.name;
//     this.id = data.id;
//     this.city = data.city;
//     this.country = data.country;
//     this.tagline = data.tagline;
//     this.price = data.price;
//     this.portrait = data.portrait;
//   }

//   getPortraitPath() {
//     return `assets/photographers/small/${this.portrait}`;
//   }

//   getLocation() {
//     return `${this.city}, ${this.country}`;
//   }

//   getMedias() {
//     return this.medias || [];
//   }
// }

// class Media {
//   constructor(data) {
//     this.id = data.id;
//     this.photographerId = data.photographerId;
//     this.title = data.title;
//     this.likes = data.likes;
//     this.date = data.date;
//     this.price = data.price;
//     this.image = data.image;
//     this.video = data.video;
//     this.type = null;
//     this.url = null;
//   }

//   getId() {
//     return this.id;
//   }

//   getPhotographerId() {
//     return this.photographerId;
//   }

//   getTitle() {
//     return this.title;
//   }

//   getLikes() {
//     return this.likes;
//   }

//   getDate() {
//     return this.date;
//   }

//   getPrice() {
//     return this.price;
//   }

//   getType() {
//     if (this.type === null) {
//       if (this.image) {
//         this.type = 'image';
//       } else if (this.video) {
//         this.type = 'video';
//       }
//     }
//     return this.type;
//   }

//   getUrl() {
//     if (this.url === null) {
//       if (this.type === 'image') {
//         this.url = this.image;
//       } else if (this.type === 'video') {
//         this.url = this.video;
//       }
//     }
//     return this.url;
//   }
// }

// async function getPhotographers() {
//   const api = new Api('./data/photographers.json');
//   const data = await api.get();

//   const photographers = data.photographers.map((photographerData) => {
//     const photographer = new Photographer(photographerData);
//     return {
//       name: photographer.name,
//       id: photographer.id,
//       tagline: photographer.tagline,
//       price: photographer.price,
//       portrait: photographer.getPortraitPath(),
//       location: photographer.getLocation(),
//       medias: photographer.getMedias(),
//     };
//   });

//   const medias = data.media.map((mediaData) => {
//     const media = new Media(mediaData);
//     return {
//       id: media.getId(),
//       photographerId: media.getPhotographerId(),
//       title: media.getTitle(),
//       likes: media.getLikes(),
//       date: media.getDate(),
//       price: media.getPrice(),
//       type: media.getType(),
//       url: media.getUrl(),
//     };
//   });

//   medias.forEach((media) => {
//     const photographer = photographers.find((p) => p.id === media.photographerId);
//     const tmpName = photographer.name;
//     const tmpUrl = media.url;
//     if (photographer) {
//       if (media.type === 'image' || media.type === 'video') {
//         media.url = `assets/images/${tmpName}/${tmpUrl}`;
//         photographer.medias.push(media);
//       }
//     }
//   });

//   return photographers;
// }

// export default getPhotographers;

// api.js
class Api {
  constructor(url) {
    this.url = url;
  }

  async get() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error("La réponse du réseau n'est pas correcte");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  }
}

export default Api;
