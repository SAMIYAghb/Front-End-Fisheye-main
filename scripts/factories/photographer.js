// Factory pour générer les photographes de la page d'acceuil
function photographerFactory(data) {
    //extrait des propriétés de l'objet data
    const { name, portrait, location, tagline, price, id} = data;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.innerHTML = `
            <a href="photographer.html?id=${id}">
                <img src=${portrait} alt="${name}">
                <h2 class="photograph-name">${name}</h2>
            </a>
            <p class="photograph-location">${location}</p>
            <p class="photograph-tagline">${tagline}</p>
            <p class="photograph-price">${price}€/jour</p>
        `;
        return (article);
    }
    return { name, portrait, location, tagline, getUserCardDOM }
}
