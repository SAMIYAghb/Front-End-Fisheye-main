// class MediaVideo{
//     constructor(param1){
// this.param1 = param1;
//     }
//     renderHtml(){
//         return `<video src="${this.param1}">`
//     }
// }


// class MediaVideo{
//     constructor(param1){
// this.param1 = param1;
//     }
//     renderHtml(){
//         return `<video src='${this.url}' type='video/mp4' alt='${this.title}' title='${this.title}' id='${this.id}' tabindex='0' aria-label='${this.title}'></video>
//         <figcaption class='video-caption'>${this.title}</figcaption>`
//     }
// }

// class MediaVideo {
//     constructor(src) {
//         this.src = src;
//     }
//     renderHtml() {
//         return `<video src="${this.src}"></video>`;
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

class MediaVideo extends Media {
    constructor(data) {
        super(data);
        this.type = "video";
        this.src = data.video;
    }

    renderHtml() {
        const figure = document.createElement('figure');
    figure.innerHTML = `
      <video controls src='assets/images/${this.photographerId}/${this.src}' alt='${this.title}'id='${this.id}' tabindex='0' aria-label='${this.title}'>${this.title}</video>
      <figcaption class="video-caption">${this.title}</figcaption>
      <span tabindex='0'>${this.likes}</span>
      <i tabindex='0' class='fa-regular fa-heart' aria-label='likes' role='button' title='likes'></i>
    `;
    return figure;
  }
}
export default MediaVideo;
