function hideLoadingMessage(iframe) {
    const loadingMessage = iframe.previousElementSibling; // Obtiene el div con el mensaje de carga
    if (loadingMessage) {
        loadingMessage.style.display = 'none';
    }
}

const videos = [
    { id: "k01w02336zg", title: "Mi negocio crece - video promocional 1" },
    { id: "B1-bH3Z8Qgw", title: "Mi negocio crece - video promocional 2" },
    { id: "V_k2Vi94crA", title: "Mi negocio crece - video promocional 3" },
    { id: "uUmlXcFiJDM", title: "Nutriditas - video promocional 1" },
    { id: "1akO1Em5P6M", title: "Nutriditas - video promocional 2" },
    { id: "12Su9fMM3YQ", title: "Nutriditas - video promocional 3" },
    { id: "WXUiIwD6-OI", title: "Nutriditas - video promocional 4" },
    { id: "UVR06KO3s34", title: "Nutriditas - video promocional 5" },
    { id: "t_XiHq-GnUE", title: "Nutriditas - video promocional 6" },
    { id: "pJOvDhyL0Fg", title: "Nutriditas - video promocional 7" },
    { id: "CnlbZQuttmI", title: "Nutriditas - video promocional 8" },
    { id: "ftXLZTCFgSc", title: "Nutriditas - video promocional 9" },
    { id: "UqkIJgi7Flo", title: "Nutriditas - video promocional 10" },
    { id: "ALPdUnONy9k", title: "Nutriditas - video promocional 11" },
    { id: "QA1oI1xr-ZU", title: "Nutriditas - video promocional 12" },
    { id: "YM4s68cOEeU", title: "Nutriditas - video promocional 13" },
    { id: "moRNbKXUJik", title: "Nutriditas - video promocional 14" },
    { id: "E9hWR264PCU", title: "Nutriditas - video promocional 15" },
    { id: "aeBLOhUzyZ0", title: "Nutriditas - video promocional 16" },
    { id: "zdPROziW2qU", title: "Nutriditas - video promocional 17" },
    { id: "bk82sgo_rEk", title: "Arvore Da Vida - video promocional 1" },
    { id: "B6SM5KTxBo0", title: "Arvore Da Vida - video promocional 2" },
    { id: "Uylz-m54dbI", title: "Arvore Da Vida - video promocional 3" },
    { id: "m68xFytjpcs", title: "Arvore Da Vida - video promocional 4" },
    { id: "v8zspr5nZQ0", title: "Arvore Da Vida - video promocional 5" },
    { id: "lJy6xze9u8g", title: "Arvore Da Vida - video promocional 6" },
    { id: "SCmwTi59A28", title: "Arvore Da Vida - video promocional 7" },
    { id: "S5OGixEiscQ", title: "Arvore Da Vida - video promocional 8" },
    { id: "4-A5wZjFd0k", title: "Arvore Da Vida - video promocional 9" },
    { id: "CXgJhDS8NLI", title: "Arvore Da Vida - video promocional 10" },
    { id: "smmo-M4wOdU", title: "Arvore Da Vida - video promocional 11" },
    { id: "EkS7P3y3ogg", title: "Arvore Da Vida - video promocional 12" }
];

const videosPerPage = 8;
let currentPage = 1;

/*function renderVideos() {
    const list = document.getElementById("videos-list");
    list.innerHTML = "";
    const start = (currentPage - 1) * videosPerPage;
    const end = start + videosPerPage;
    const videosToShow = videos.slice(start, end);

    videosToShow.forEach(video => {
        const li = document.createElement("li");
        li.classList.add("videos__item");
        li.innerHTML = `
            <div class="video-container">
                <iframe width="100%" height="220px" src="https://www.youtube.com/embed/${video.id}" 
                    title="${video.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen></iframe>
            </div>
            <div class="detalles__video">
                <h3>${video.title}</h3>
                <p>Video generado para negocio local</p>
            </div>
        `;
        list.appendChild(li);
    });

    renderPagination();
}*/

function renderVideos() {
    const list = document.getElementById("videos-list");
    list.innerHTML = "";

    // Nuevo código: Agregar mensaje de carga
    const loadingMessage = document.createElement("p");
    loadingMessage.innerText = "Cargando videos...";
    loadingMessage.classList.add("loading-message"); // Puedes definir esta clase en CSS
    list.appendChild(loadingMessage);

    const start = (currentPage - 1) * videosPerPage;
    const end = start + videosPerPage;
    const videosToShow = videos.slice(start, end);

    // Simular carga con un pequeño retraso
    setTimeout(() => {
        list.innerHTML = ""; // Quitar mensaje de carga antes de mostrar los videos

        videosToShow.forEach(video => {
            const li = document.createElement("li");
            li.classList.add("videos__item");
            li.innerHTML = `
                <div class="video-container">
                    <iframe width="100%" height="220px" src="https://www.youtube.com/embed/${video.id}" 
                        title="${video.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowfullscreen></iframe>
                </div>
                <div class="detalles__video">
                    <h3>${video.title}</h3>
                    <p>Video generado para negocio local</p>
                </div>
            `;
            list.appendChild(li);
        });

        renderPagination(); // Renderizar la paginación después de mostrar los videos
    }, 1000); // Retraso de 1 segundo (puedes ajustarlo)
}

function renderPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = `<p id="parrafo1">Haz clic en los números para cambiar de página.</p>`; // Mensaje de instrucción
    const totalPages = Math.ceil(videos.length / videosPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.innerHTML = `<strong>${i}</strong>&nbsp;&nbsp;&nbsp;`; // Número con separación
        button.classList.add("page-button");
        button.style.cursor = "pointer"; // Cambia el cursor a una manita
        if (i === currentPage) button.style.fontWeight = "bold"; // Negrita en la página activa

        button.addEventListener("click", () => {
            currentPage = i;
            renderVideos();
        });

        pagination.appendChild(button);
    }
}

document.addEventListener("DOMContentLoaded", renderVideos);
