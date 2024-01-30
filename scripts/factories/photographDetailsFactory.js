// // créer des objets de manière générique,
// function photographerDetailsFactory(data) {
//   const { name, portrait, city, country, tagline, price, id } = data;

//   const picture = `../assets/photographers/${portrait}`;

//   function getUserCardDOM() {
//     // Déclaration des éléments du DOM
//     const article = document.createElement("article");
//     const h2 = document.createElement("h2");
//     const h4 = document.createElement("h4");
//     const p = document.createElement("p");

//     // les valeurs
//     article.classList.add("photographer_card");
//     h2.textContent = name;
//     h2.setAttribute("aria-label", "Nom du photographe");
//     h4.textContent = city;
//     h4.setAttribute("aria-label", "Ville et pays du photographe");
//     p.textContent = tagline;
//     p.setAttribute("aria-label", "Tag line");

//     article.appendChild(h2);
//     article.appendChild(h4);
//     article.appendChild(p);

//     return article;
//   }

//   function getUserAvatarDOM() {
//     const img = document.createElement("img");
//     img.setAttribute("src", picture);
//     img.setAttribute("alt", "Photo de " + name);
//     img.classList.add("photographer_avatar");

//     return img;
//   }

//   return {
//     name,
//     picture,
//     city,
//     tagline,
//     price,
//     getUserCardDOM,
//     getUserAvatarDOM,
//   };
// }
// export { photographerDetailsFactory };
