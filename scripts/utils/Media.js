// media.js
class Media {
  constructor(data) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
    this.image = data.image;
    this.video = data.video;
    this.type = null;
    this.url = null;
  }

  getId() {
    return this.id;
  }

  getPhotographerId() {
    return this.photographerId;
  }

  getTitle() {
    return this.title;
  }

  getLikes() {
    return this.likes;
  }

  getDate() {
    return this.date;
  }

  getPrice() {
    return this.price;
  }

  getType() {
    if (this.type === null) {
      if (this.image) {
        this.type = 'image';
      } else if (this.video) {
        this.type = 'video';
      }
    }
    return this.type;
  }

  getUrl() {
    if (this.url === null) {
      if (this.type === 'image') {
        this.url = this.image;
      } else if (this.type === 'video') {
        this.url = this.video;
      }
    }
    return this.url;
  }
}

export default Media;

