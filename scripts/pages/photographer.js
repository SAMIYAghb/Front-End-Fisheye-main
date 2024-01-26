// //Mettre le code JavaScript lié à la page photographer.html
let params = (new URL(document.location)).searchParams;
let photographer_id = params.get('id');
let medias;
let photographer;

// 
async function getPhotographer(photographer_id) {
    try {
      const response = await fetch("../../data/photographers.json");
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      const photographers = data.photographers;
      
      let result = null;
      
      photographers.forEach(element => {
        if (element.id == photographer_id) {
          result = element;
        }
      });
      
      if (result) {
        console.log(result);
      } else {
        console.log("Photographe non trouvé");
      }
      
      return result;
    } catch (error) {
      console.error("Erreur lors de la récupération des photographes:", error.message);
    }
  }
  // getPhotographer('243');

  async function getMediaByPhotographerId(photographer_id) {
    console.log("Photographer ID:", photographer_id);
    try {
      const response = await fetch("../../data/photographers.json");
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
  
      const data = await response.json();
    //   console.log(data.media)
      const media = data.media;
  
      console.log(media);
      const mediaOfPhotographer = media.filter(item => item.photographerId == photographer_id);
      console.log(mediaOfPhotographer)

      if (mediaOfPhotographer.length > 0) {
        console.log(mediaOfPhotographer);
      } else {
        console.log("Aucun média trouvé pour ce photographe");
      }
      
  
      return mediaOfPhotographer;
      

    } catch (error) {
      console.error("Erreur lors de la récupération des médias:", error.message);
      throw error;
    }

  //   const mediaOfPhotographer = {};
    
  //   for (const item of media) {
  //     if (item.photographerId == photographer_id) {
  //       mediaOfPhotographer.push(item);
  //       // console.log(mediaOfPhotographer)
  //     }
  //   }

  //   if (mediaOfPhotographer.length > 0) {
  //     console.log(mediaOfPhotographer);
  //   } else {
  //     console.log("Aucun média trouvé pour ce photographe");
  //   }

  //   return mediaOfPhotographer;
  // } catch (error) {
  //   console.error("Erreur lors de la récupération des médias:", error.message);
  // }
  }
  // getMediaByPhotographerId()
  // getMediaByPhotographerId("82")



// Photographer's detail
async function displayPhotographer(photographer) {
  console.log(photographer)
  const photographersHeader = document.querySelector(".photograph-header");
  // console.log(photographersHeader);
  const contactButton = document.querySelector(".contact_button");
  // console.log(contactButton);
  const photographerDetails = photographerTemplate(photographer);
  console.log(photographerDetails);
//   const userCardDOM = photographerDetails.getUserCardDOM();
//   console.log(userCardDOM);
//   const photographerAvatar = photographerDetails.getUserAvatarDOM();
  // photographersHeader.insertBefore(userCardDOM, contactButton);
//   photographersHeader.appendChild(photographerAvatar);
}

async function init() {
  // Récupère les medias et photographes
  medias = await getMediaByPhotographerId(photographer_id);
//   console.log(medias)
  photographer = await getPhotographer(photographer_id);
    // console.log(photographer);
  displayPhotographer(photographer);
  // displayMedias(medias);
}

init();
