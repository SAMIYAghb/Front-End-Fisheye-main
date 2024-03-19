
class PhotographerFactory {
  static createPhotographer(data) {
    const { name, portrait, city, tagline, country, price, id } = data;
    console.log(data)
    class Photographer {
      constructor() {
        this.name = name;
        this.portrait = portrait;
        this.tagline = tagline;
        this.price = price;
        this.id = id;
        this.city = city;
        this.country = country;
        this.medias = [];
      }

      getPortraitPath() {
        return `assets/photographers/small/${this.portrait}`;
      }

      getLocation() {
        console.log(`${this.city}, ${this.country}`);
        return `${this.city}, ${this.country}`;
      }

      getMedias(media){
        this.medias.push(media);
      }


      getUserCardDOM() {
        const article = document.createElement("article");
        article.innerHTML = `
                      <a href='photographer.html?id=${this.id}' aria-label='photographer ${this.name}'>
                          <img src=${this.portrait} alt='${this.name}' class='photographer-img'>
                          <h2 class='photograph-name'>${this.name}</h2>
                      </a>
                      <p class='photograph-city'>${this.city}</p>
                      <p class='photograph-tagline'>${this.tagline}</p>
                      <p class='photograph-price'>${this.price}€/jour</p>
                  `;
        return article;
      }
    }
    // const photographer = new Photographer();
    // console.log(photographer)
    return new Photographer();
  }
}
export default PhotographerFactory;
