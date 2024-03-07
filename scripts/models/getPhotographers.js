// getPhotographers.js
import Api from './api.js';
import Photographer from './Photographer.js';
import Media from './Media.js';

async function getPhotographers() {
  const api = new Api('./data/photographers.json');
  const data = await api.get();

  const photographers = data.photographers.map((photographerData) => {
    const photographer = new Photographer(photographerData);
    return {
      name: photographer.name,
      id: photographer.id,
      tagline: photographer.tagline,
      price: photographer.price,
      portrait: photographer.getPortraitPath(),
      location: photographer.getLocation(),
      medias: photographer.medias,
    };
  });

  const medias = data.media.map((mediaData) => {
    const media = new Media(mediaData);
    return {
      id: media.getId(),
      photographerId: media.getPhotographerId(),
      title: media.getTitle(),
      likes: media.getLikes(),
      date: media.getDate(),
      price: media.getPrice(),
      type: media.getType(),
      url: media.getUrl(),
    };
  });

  medias.forEach((media) => {
    const photographer = photographers.find((p) => p.id === media.photographerId);
    const tmpName = photographer ? photographer.name : '';
    const tmpUrl = media.url;

    if (photographer && (media.type === 'image' || media.type === 'video')) {
      media.url = `assets/images/${tmpName}/${tmpUrl}`;
      photographer.medias.push(media);
    }
  });

  return photographers;
}

export default getPhotographers;
