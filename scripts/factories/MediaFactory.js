// class MediaFactory{
//     createMedia(item){
// let media;
// if(item.img){
//     media = new MediaImage(param1);
// }else if (item.video) {
//     media = new MediaVideo(param1);
// }
//     }
//     return media;
// }

// class MediaFactory {
//   createMedia(item) {
//     let media;
//     if (item.mediaType === 'image') {
//       media = new MediaImage(item.src);
//     } else if (item.mediaType === 'video') {
//       media = new MediaVideo(item.src);
//     }
//     return media;
//   }
// }
// const api = new Api("./data/photographers.json");
//   const data = await api.get();
// const factory = new MediaFactory();
// const media = factory.createMedia(data);
// console.log(media.renderHtml()); // Output: <video src="chemin/vers/video.mp4"></video>


// class MediaFactory {
//     createMedia(data) {
//         if (data.image) {
//             return new MediaImage(data);
//         } else if (data.video) {
//             return new MediaVideo(data);
//         }
//     }
// }

// import Api from "./api.js";
import MediaImage from './MediaImage.js';
import MediaVideo from './MediaVideo.js';

class MediaFactory {
    createMedia(data) {
        if (data.image) {
            return new MediaImage(data);
        } else if (data.video) {
            return new MediaVideo(data);
        }
    }
}
export default MediaFactory;
// Exemple d'utilisation
// const api = new Api("./data/photographers.json");
//   const data = await api.get();
//   console.log(data)
// const jsonData = /* Votre objet JSON ici */;

// const mediaFactory = new MediaFactory();
// const medias = data.media.map(item => mediaFactory.createMedia(item));

// Pour afficher le HTML de chaque média
// medias.forEach(media => {
//     const mediaHtml = media.renderHtml();
//     console.log(mediaHtml); // Ou utilisez mediaHtml pour l'afficher où vous le souhaitez dans votre application
// });