import videoData from './videoData.js';
document.addEventListener('DOMContentLoaded', () => {
    const videoContainer = document.getElementById('video-container');
    const imageContainer = document.getElementById('image-container');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
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
            imgElement.addEventListener('click', () => {
                loadVideos(categoryData.category);
            });
        });
    };
    const loadVideos = (category) => {
        videoContainer.innerHTML = '';
        const videoList = videoData.character[category];
        if (videoList) {
            let videoCounter = 1;
            videoList.forEach(video => {
                const videoId = `video-${videoCounter}`;
                const videoElement = createVideoElement(video.title, video.url, videoId);
                videoContainer.appendChild(videoElement);
                videojs(videoId);
                videoCounter++;
            });
        } else {
            console.error(`Category "${category}" not found in videoData.`);
        }
    };
    const createVideoElement = (title, url, videoId) => {
        const container = document.createElement('div');
        container.className = 'video-container';
        const videoTitle = document.createElement('div');
        videoTitle.className = 'video-title';
        videoTitle.textContent = title;
        const videoElement = document.createElement('video');
        videoElement.id = videoId;
        videoElement.className = 'video-js vjs-default-skin';
        videoElement.setAttribute('controls', '');
        videoElement.setAttribute('preload', 'auto');
        videoElement.setAttribute('loop', '');
        videoElement.setAttribute('autoplay', '');
        videoElement.setAttribute('muted', '');
        const sourceElement = document.createElement('source');
        sourceElement.src = url;
        sourceElement.type = 'video/mp4';
        videoElement.appendChild(sourceElement);
        container.appendChild(videoTitle);
        container.appendChild(videoElement);
        videoElement.addEventListener('loadedmetadata', () => {
            requestAnimationFrame(() => {
                const videoWidth = videoElement.clientWidth;
                const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;
                const videoHeight = videoWidth / aspectRatio;
                videoElement.style.height = `${videoHeight}px`;
            });
        });
        return container;
    };
    loadImages('character');
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
});
