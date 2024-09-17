import videoData from './videoData.js';
document.addEventListener('DOMContentLoaded', () => {
    const videoContainer = document.getElementById('video-container');
    const imageContainer = document.getElementById('image-container');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const updateVideoWidth = () => {
        const videoElements = document.querySelectorAll('.video-js');
        videoElements.forEach(videoElement => {
            if (window.innerWidth <= 768) {
                videoElement.style.maxWidth = '360px';
            } else {
                videoElement.style.maxWidth = '600px';
            }
            videoElement.style.width = '100%';
        });
    };
    const loadImages = (type) => {
        const categories = videoData[type].categories;
        imageContainer.innerHTML = '';
        categories.forEach(categoryData => {
            const imgElement = document.createElement('img');
            imgElement.src = categoryData.src;
            imgElement.alt = categoryData.alt;
            imgElement.classList.add('category-image');
            imgElement.dataset.category = categoryData.category;
            imgElement.dataset.type = type;
            imageContainer.appendChild(imgElement);
        });
    };
    loadImages('character');
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
    imageContainer.addEventListener('click', (event) => {
        const category = event.target.dataset.category;
        const type = event.target.dataset.type;
        if (category && type && videoData[type] && videoData[type][category]) {
            videoContainer.innerHTML = '';
            videoData[type][category].forEach(video => {
                const p = document.createElement('p');
                p.textContent = video.title;
                videoContainer.appendChild(p);
                const videoElement = document.createElement('video');
                videoElement.className = 'video-js';
                videoElement.setAttribute('controls', '');
                videoElement.setAttribute('preload', 'auto');
                videoElement.setAttribute('loop', '');
                videoElement.setAttribute('autoplay', '');
                videoElement.setAttribute('muted', '');
                updateVideoWidth();
                const source = document.createElement('source');
                source.src = video.url;
                source.type = 'video/mp4';
                videoElement.appendChild(source);
                videoContainer.appendChild(videoElement);
                videoContainer.appendChild(document.createElement('br'));
                const player = videojs(videoElement);
            });
        }
    });
});
