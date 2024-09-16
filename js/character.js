import videoData from './videoData.js';

document.addEventListener('DOMContentLoaded', () => {
    const videoContainer = document.getElementById('video-container');
    const imageContainer = document.getElementById('image-container');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    // 動態加載圖片
    const loadImages = (type) => {
        const categories = videoData[type].categories;
        imageContainer.innerHTML = ''; // 清空 image-container
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

    // 加載 character 類別的圖片
    loadImages('character');

    // 點擊菜單按鈕開啟或關閉側邊欄
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    imageContainer.addEventListener('click', (event) => {
        const category = event.target.dataset.category;
        const type = event.target.dataset.type;
        if (category && type && videoData[type] && videoData[type][category]) {
            videoContainer.innerHTML = ''; // 清空影片容器

            videoData[type][category].forEach(video => {
                const p = document.createElement('p');
                p.textContent = video.title;
                videoContainer.appendChild(p);

                const videoElement = document.createElement('video');
                videoElement.className = 'video-js';
                videoElement.controls = true;
                videoElement.preload = 'auto';
                videoElement.loop = true;
                videoElement.autoplay = true;
                videoElement.muted = true;
                videoElement.dataset.setup = '{}';

                const source = document.createElement('source');
                source.src = video.url;
                source.type = 'video/mp4';
                videoElement.appendChild(source);

                videoElement.addEventListener('loadedmetadata', () => {
                    const videoRatio = videoElement.videoHeight / videoElement.videoWidth;
                    videoElement.style.height = `${videoElement.offsetWidth * videoRatio}px`;
                });

                videoContainer.appendChild(videoElement);
                videoContainer.appendChild(document.createElement('br'));
            });
        }
    });
});
