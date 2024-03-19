
import Api from "./api.js";
import PhotographerFactory from "./Photographer.js";

async function getPhotographers() {
  const api = new Api("./data/photographers.json");
  const data = await api.get();
  const medias = [];

  const photographers = data.photographers.map((photographerData) => {
    const photographer =
      PhotographerFactory.createPhotographer(photographerData);
    const photographerMedias = data.media.filter(
      (mediaData) => mediaData.photographerId === photographer.id
      
    );
    return {
      name: photographer.name,
      id: photographer.id,
      tagline: photographer.tagline,
      price: photographer.price,
      portrait: photographer.getPortraitPath(),
      city: photographer.getLocation(),
      country: photographer.getLocation(),
      medias: photographerMedias,
    };

  });
  return photographers;
}


export default getPhotographers;

