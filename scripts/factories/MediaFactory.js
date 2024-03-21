import MediaImage from './MediaImage.js';
import MediaVideo from './MediaVideo.js';

class MediaFactory {
  /* eslint class-methods-use-this: off */
  createMedia(data) {
    if (data.image) {
      return new MediaImage(data);
    }
    if (data.video) {
      return new MediaVideo(data);
    }
    return true;
  }
}
export default MediaFactory;
