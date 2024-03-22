import Media from './Media.js';

class MediaVideo extends Media {
  constructor(data) {
    super(data);
    this.type = 'video';
    this.src = data.video;
  }

  renderHtml() {
    const figure = document.createElement('figure');
    figure.innerHTML = `
      <video src='assets/images/${this.photographerId}/${this.src}' alt='${this.title}'id='${this.id}' tabindex='0' aria-label='${this.title}'>${this.title}</video>
      <figcaption class='video-caption'>${this.title}</figcaption>
      <span tabindex='0'>${this.likes}</span>
      <i tabindex='0' class='fa-regular fa-heart' aria-label='likes' role='button' title='likes' ></i>
    `;
    return figure;
  }
}
export default MediaVideo;
