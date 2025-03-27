function hideLoadingMessage(iframe) {
    const loadingMessage = iframe.previousElementSibling; // Obtiene el div con el mensaje de carga
    if (loadingMessage) {
        loadingMessage.style.display = 'none';
    }
}