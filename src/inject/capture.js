document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const imgData = params.get('imgData');
    if (imgData) {
        console.log('imgData', imgData);
        document.getElementById('screenshot').src = imgData;
    }
});