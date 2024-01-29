function photographerTemplate(data) {
  const { name, portrait, city, country, price, tagline } = data;

  const picture = `assets/photographers/${portrait}`;
  // un lien vers la page détaillée du photographe.
  function getUserCardDOM() {

     // Déclaration des éléments du DOM
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `${name}`); // Ajout d'un attribut alt pour décrire l'image
    // utilise des balises <figure> et <figcaption> pour englober l'image et sa description.
  //   const figcaption = document.createElement("figcaption");
  // figcaption.textContent = `${name}, ${city}, ${tagline}, ${price}€/jour`;
  // figure.appendChild(img);
  // figure.appendChild(figcaption);

    const h2 = document.createElement("h2");
    // Attribution des valeurs
    h2.textContent = name;
    h2.setAttribute("aria-label", "Nom du photographe");
    const h4 = document.createElement("h4");
    h4.textContent = city;
    h4.setAttribute("aria-label", "Ville et pays du photographe");
    const h5 = document.createElement("h5");
    h5.textContent = tagline;
    h5.setAttribute("aria-label", "Tag line");
    const p = document.createElement("p");
    p.textContent = price + "€/jour";
    p.setAttribute("aria-label", "le prix par jour");
// Construction de l'article à renvoyer
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(h4);
    article.appendChild(h5);
    article.appendChild(p);

    return article;
  }

  
  return { name, picture, city, tagline, price, getUserCardDOM };
}

export { photographerTemplate };