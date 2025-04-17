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
    { id: "htFgb08-d1s", title: "Arvore Da Vida - video promocional 1" },
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
    { id: "EkS7P3y3ogg", title: "Arvore Da Vida - video promocional 12" },
    { id: "h572XXNmWSg", title: "Hogar es vivir - video promocional 1" },
    { id: "dFujpjJXhG0", title: "Hogar es vivir - video promocional 2" },
    { id: "yMFWkZzLbjA", title: "Hogar es vivir - video promocional 3" }
];



const videosPerPage = 8;
let currentPage = 1;
let players = [];

function renderVideos() {
    const list = document.getElementById("videos-list");
    list.innerHTML = "";

    const loadingMessage = document.createElement("p");
    loadingMessage.innerText = "Cargando videos...";
    loadingMessage.classList.add("loading-message");
    list.appendChild(loadingMessage);

    const start = (currentPage - 1) * videosPerPage;
    const end = start + videosPerPage;
    const videosToShow = videos.slice(start, end);

    setTimeout(() => {
        list.innerHTML = "";
        players = [];

        videosToShow.forEach((video, index) => {
            const li = document.createElement("li");
            li.classList.add("videos__item");

            const playerId = `player-${video.id}-${index}`;

            li.innerHTML = `
                <div class="video-container">
                    <div id="${playerId}"></div>
                </div>
                <div class="detalles__video">
                    <h3>${video.title}</h3>
                    <p>Video generado para negocio local</p>
                </div>
            `;
            list.appendChild(li);

            setTimeout(() => {
                const player = new YT.Player(playerId, {
                    height: '220',
                    width: '100%',
                    videoId: video.id,
                    events: {
                        'onStateChange': onPlayerStateChange
                    }
                });
                players.push(player);
            }, 100);
        });

        renderPagination();
    }, 1000);
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        players.forEach(player => {
            if (player !== event.target) {
                player.pauseVideo();
            }
        });
    }
}


function renderPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const infoText = document.createElement("p");
    infoText.id = "parrafo1";
    infoText.textContent = "Haz clic en los numeros para cambiar de página.";
    pagination.appendChild(infoText);

    const totalPages = Math.ceil(videos.length / videosPerPage);
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
        infoText.textContent = "Haz clic en los botones para cambiar de página.";
        const navWrapper = document.createElement("div");
        navWrapper.classList.add("pagination-mobile");

        // Botón anterior
        const prevBtn = document.createElement("button");
        prevBtn.textContent = "Anterior";
        prevBtn.disabled = currentPage === 1;
        prevBtn.classList.add("pagination-button");
        prevBtn.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                renderVideos();
            }
        });
        navWrapper.appendChild(prevBtn);

        // Botón siguiente
        const nextBtn = document.createElement("button");
        nextBtn.textContent = "Siguiente";
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.classList.add("pagination-button");
        nextBtn.addEventListener("click", () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderVideos();
            }
        });
        navWrapper.appendChild(nextBtn);

        pagination.appendChild(navWrapper);
    } else {
        const numbersWrapper = document.createElement("div");
        numbersWrapper.classList.add("pagination-desktop");

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.innerHTML = `<strong>${i}</strong>&nbsp;&nbsp;`; // <- 2 espacios
            button.classList.add("page-button");
            button.style.cursor = "pointer";
            if (i === currentPage) button.style.fontWeight = "bold";

            button.addEventListener("click", () => {
                currentPage = i;
                renderVideos();
            });

            numbersWrapper.appendChild(button);
        }

        pagination.appendChild(numbersWrapper);
    }
}


document.addEventListener("DOMContentLoaded", renderVideos);
