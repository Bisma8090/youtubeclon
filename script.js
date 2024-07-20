document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('iconn');
    const listButton = document.getElementById('list');
    const sidebar = document.getElementById('sidebar');

    menuButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevents the click event from bubbling up and immediately closing the sidebar
        sidebar.classList.toggle('show');
    });

    listButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevents the click event from bubbling up and immediately closing the sidebar
        sidebar.classList.toggle('show');
    });

    document.addEventListener('click', function (event) {
        const target = event.target;
        if (!target.closest('#sidebar') && !target.closest('#iconn') && !target.closest('#list')) {
            sidebar.classList.remove('show');
        }
    });
});


const API_KEY = 'AIzaSyCM_fKruyjmBh4yPcwWCZ-7TPWwNc92lHY';
const videoIds = [
    'yotA9ZEFAi8',
    'voXYG17rhQA',
    'bLUkIgY8MTE',
    'W7-D0hqX-P0',
    'ypf6WHYpeRU',
    '6tOgL86F3RU',
    'RlS8rqOXPDk',
    'WpD-VBcbWQE',
    '-8UsDtDsSfw',
    'cyFOdAoLe2E',
    'snn29wkKTi4',
    '6hMD8S5t5dc'
];

// Function to format views
function formatViews(views) {
    if (views >= 1_000_000) {
        return (views / 1_000_000).toFixed(1) + 'M';
    } else if (views >= 1_000) {
        return (views / 1_000).toFixed(1) + 'K';
    } else {
        return views;
    }
}

// Function to format date
function formatDate(dateStr) {
    const now = new Date();
    const uploadDate = new Date(dateStr);
    const diffInYears = now.getFullYear() - uploadDate.getFullYear();
    const diffInMonths = (now.getFullYear() - uploadDate.getFullYear()) * 12 + now.getMonth() - uploadDate.getMonth();

    if (diffInYears > 0) {
        return diffInYears + ' year' + (diffInYears > 1 ? 's' : '') + ' ago';
    } else if (diffInMonths > 0) {
        return diffInMonths + ' month' + (diffInMonths > 1 ? 's' : '') + ' ago';
    } else {
        return 'Less than a month ago';
    }
}

// Function to fetch video details from the YouTube Data API
async function fetchVideoDetails(videoId) {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.items[0];
    } catch (error) {
        console.error('Error fetching video details:', error);
        return null;
    }
}

// Function to display videos
async function displayVideos() {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = ''; // Clear any existing content

    for (const videoId of videoIds) {
        const video = await fetchVideoDetails(videoId);
        if (video) { // Ensure video data is valid
            const views = formatViews(parseInt(video.statistics.viewCount, 10));
            const uploadDate = formatDate(video.snippet.publishedAt);
            const videoElement = document.createElement('div');
            videoElement.classList.add('video');
            videoElement.innerHTML = `
                <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                <div class="video-details">
                    <div class="video-title">${video.snippet.title}</div>
                    <div class="video-channel">${video.snippet.channelTitle}</div>
                    <div class="video-views">${views} • ${uploadDate}</div>
                </div>
            `;
            videoContainer.appendChild(videoElement);
        }
    }
}

displayVideos();


document.addEventListener('DOMContentLoaded', function() {
    const notifyButton = document.getElementById('notify');
    const notificationPanel = document.getElementById('notification-panel');

    notifyButton.addEventListener('click', function(event) {
        event.preventDefault();
        const rect = notifyButton.getBoundingClientRect();
        notificationPanel.style.top = `${rect.bottom + window.scrollY}px`;
        notificationPanel.style.left = `${rect.left + window.scrollX}px`;
        notificationPanel.style.display = notificationPanel.style.display === 'none' ? 'block' : 'none';
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('#notification-panel') && !event.target.closest('#notify')) {
            notificationPanel.style.display = 'none';
        }
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const notifyButton = document.getElementById('notify-small');
    const notificationPanel = document.getElementById('notification-panel1');

    notifyButton.addEventListener('click', function(event) {
        event.preventDefault();
        const rect = notifyButton.getBoundingClientRect();
        notificationPanel.style.top = `${rect.bottom + window.scrollY}px`;
        notificationPanel.style.left = `${rect.left + window.scrollX}px`;
        notificationPanel.style.display = notificationPanel.style.display === 'none' ? 'block' : 'none';
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('#notification-panel1') && !event.target.closest('#notify-small')) {
            notificationPanel.style.display = 'none';
        }
    });
});

