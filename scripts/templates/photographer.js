function photographerTemplate(data) {
    const { name, portrait, city, country, price, tagline
    } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h4 = document.createElement( 'h4' );
        h4.textContent = city;
        const h5 = document.createElement( 'h5' );
        h5.textContent = tagline;
        const p = document.createElement( 'p' );
        p.textContent = price +'€/jour';
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h4);
        article.appendChild(h5);
        article.appendChild(p);
        return (article);
    }
    return { name, picture, city, tagline, price,getUserCardDOM }
}