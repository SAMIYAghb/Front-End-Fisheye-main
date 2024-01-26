    // asynic function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        // let photographers = [
        //     {
        //         "name": "Ma data test",
        //         "id": 1,
        //         "city": "Paris",
        //         "country": "France",
        //         "tagline": "Ceci est ma data test",
        //         "price": 400,
        //         "portrait": "account.png"
        //     },
        //     {
        //         "name": "Autre data test",
        //         "id": 2,
        //         "city": "Londres",
        //         "country": "UK",
        //         "tagline": "Ceci est ma data test 2",
        //         "price": 500,
        //         "portrait": "account.png"
        //     },
        // ]
        // et bien retourner le tableau photographers seulement une fois récupéré
        // return ({
        //     photographers: [...photographers, ...photographers, ...photographers]})
    // }
     async function getPhotographers() {
        try {
            const response = await fetch('../../data/photographers.json');           
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            const data = await response.json();
            // console.log(response);
            // console.log(data);
            // console.log(data.photographers);
            // console.log(data.media);
            return data;   
        } catch (error) {
            console.error('Erreur lors de la récupération des photographes:', error.message);
            // afficher un message à l'utilisateur ou effectuer une action spécifique.
        }
    }
    
    // getPhotographers();
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();

            //  Créer un lien vers la page détaillée avec l'ID du photographe
        const link = document.createElement('a');
        link.setAttribute('href', `photographer.html?id=${photographer.id}`);
        link.appendChild(userCardDOM);
            // photographersSection.appendChild(userCardDOM);
            // Ajoutez le lien à la section des photographes

             // Améliorations pour l'accessibilité
        link.setAttribute('aria-label', `Voir les détails du photographe ${photographer.name}`);
        link.addEventListener('focus', () => {
            // Ajoutez un style visuel pour indiquer que le lien est actuellement focusé
            link.style.outline = '2px solid blue';
        });
        link.addEventListener('blur', () => {
            // Réinitialisez le style visuel lorsqu'on quitte le focus
            link.style.outline = 'none';
        });
        
        photographersSection.appendChild(link);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        // console.log(photographers);
        displayData(photographers);
    }
    
    init();
    
    
