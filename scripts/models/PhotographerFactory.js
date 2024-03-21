import Photographer from './Photographer.js';

class PhotographerFactory {
  static createPhotographer(data) {
    const {
      name, portrait, city, tagline, country, price, id
    } = data;
    return new Photographer({
      name, portrait, city, tagline, country, price, id
    });
  }
}

export default PhotographerFactory;
