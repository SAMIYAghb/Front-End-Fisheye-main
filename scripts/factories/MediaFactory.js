import MediaImage from './MediaImage.js';
import MediaVideo from './MediaVideo.js';

class MediaFactory {
    createMedia = (data) => {
    if (data.image) {
      return new MediaImage(data);
    }
    if (data.video) {
      return new MediaVideo(data);
    }
  };
}
export default MediaFactory;
