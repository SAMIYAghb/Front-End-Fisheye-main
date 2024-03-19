// class MediaImage{
//     constructor(param1){
// this.param1 = param1;

//     }
//     renderHtml(){
//         return `<img src='${this.param1}'> `;
//     }
// }
// class MediaImage{
//     constructor(id, photographerId, title , image, tags , like, date, price, alt){
// this.param1 = param1;

//     }
//     renderHtml(){
//         return `<img src='${uri}' alt='${this.title}' title='${this.title}' id='${this.id}' tabindex='0' aria-label='${this.title}'>
//         <figcaption>${this.title}</figcaption>'> `;
//     }
// }

// class MediaImage {
//     constructor(src) {
//         this.src = src;
//     }
//     renderHtml() {
//         return `<img src='${this.src}'>`;
//     }
// }

class Media {
  constructor(data) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
  }
}

class MediaImage extends Media {
  constructor(data) {
    super(data);
    this.type = 'image';
    this.src = data.image;
  }

  renderHtml() {
    const figure = document.createElement('figure');
    figure.innerHTML = `
        <img src='assets/images/${this.photographerId}/${this.src}' alt='${this.title}' id='${this.id}' tabindex='0' aria-label='${this.title}'>
        <figcaption>${this.title}</figcaption>
        <span tabindex='0'>${this.likes}</span>
        <i tabindex='0' class='fa-regular fa-heart' aria-label='likes' role='button' title='likes' ></i>
      `;
    return figure;
  }
}
export default MediaImage;
