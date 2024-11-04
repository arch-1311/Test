document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const bannerImage = document.getElementById('banner-image');
    const body = document.body;

    // Apply saved theme without default preference
    if (localStorage.getItem('theme') === 'dark') {
        enableDarkMode();
    } else if (localStorage.getItem('theme') === 'light') {
        enableLightMode();
    }

    // Toggle dark mode
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            enableLightMode();
            localStorage.setItem('theme', 'light');
        } else {
            enableDarkMode();
            localStorage.setItem('theme', 'dark');
        }
    });

    // Functions to enable light and dark modes
    function enableDarkMode() {
        body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        bannerImage.src = 'NOCWHITEBACKGROND.png';
    }

    function enableLightMode() {
        body.classList.remove('dark-mode');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        bannerImage.src = 'NOC2024bg.png';
    }
});

// English Date-Time
function updateTime() {
    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday: 'long' });
    const date = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.getElementById('date-time').innerHTML = `${day}, ${date} | ${time}`;
}

// Tamil Date-Time
function updateTimeTamil() {
    const now = new Date();
    
    // Custom mapping for Tamil days and months
    const tamilDays = ["ஞாயிறு", "திங்கள்", "செவ்வாய்", "புதன்", "வியாழன்", "வெள்ளி", "சனி"];
    const tamilMonths = ["ஜனவரி", "பிப்ரவரி", "மார்ச்", "ஏப்ரல்", "மே", "ஜூன்", "ஜூலை", "ஆகஸ்ட்", "செப்டம்பர்", "அக்டோபர்", "நவம்பர்", "டிசம்பர்"];
    
    const day = tamilDays[now.getDay()];
    const date = now.getDate();
    const month = tamilMonths[now.getMonth()];
    const year = now.getFullYear();
    
    // Split time and suffix (AM/PM)
    const [time, suffix] = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).split(" ");
    
    document.getElementById('date-time-tamil').innerHTML = `${day}, ${date} ${month}, ${year} | ${time} ${suffix}`;
}

// Update both date-times every second
setInterval(updateTime, 1000);
setInterval(updateTimeTamil, 1000);

// Initial call to display the date-times immediately
updateTime();
updateTimeTamil();
