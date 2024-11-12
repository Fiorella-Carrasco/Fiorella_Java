
//noticias
document.addEventListener('DOMContentLoaded', () => {
    fetch('noticia.json')
        .then(response => response.json())
        .then(data => displayNews(data))
        .catch(error => console.error('Error al cargar las noticias:', error));
});

function displayNews(articles) {
    const nuevoContenedor = document.getElementById('nuevoContenido');
    nuevoContenedor.innerHTML = '';

    articles.forEach((article, index) => {
        const nuevaNoticia = document.createElement('div');
        nuevaNoticia.className = `news-item-${index}`;

        const titulo = document.createElement('h2');
        titulo.textContent = article.titulo;
        nuevaNoticia.appendChild(titulo);

        const descripcion = document.createElement('p');
        descripcion.textContent = article.descripcion;
        nuevaNoticia.appendChild(descripcion);

        const link = document.createElement('a');
        link.href = article.url;
        link.textContent = 'Leer más';
        link.target = '_blank';
        nuevaNoticia.appendChild(link);

        nuevoContenedor.appendChild(nuevaNoticia);
    });
}


