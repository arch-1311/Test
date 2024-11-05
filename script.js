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

    // Tamil months' approximate Gregorian start dates (for current year)
    const tamilMonths = [
        { name: "சித்திரை", start: new Date(now.getFullYear(), 3, 14) },
        { name: "வைகாசி", start: new Date(now.getFullYear(), 4, 15) },
        { name: "ஆனி", start: new Date(now.getFullYear(), 5, 15) },
        { name: "ஆடி", start: new Date(now.getFullYear(), 6, 15) },
        { name: "ஆவணி", start: new Date(now.getFullYear(), 7, 15) },
        { name: "புரட்டாசி", start: new Date(now.getFullYear(), 8, 15) },
        { name: "ஐப்பசி", start: new Date(now.getFullYear(), 9, 18) }, // Oct 18 typically marks Aippasi start
        { name: "கார்த்திகை", start: new Date(now.getFullYear(), 10, 16) },
        { name: "மார்கழி", start: new Date(now.getFullYear(), 11, 15) },
        { name: "தை", start: new Date(now.getFullYear() + 1, 0, 15) }, // Tamil year continues into next Gregorian year
        { name: "மாசி", start: new Date(now.getFullYear() + 1, 1, 13) },
        { name: "பங்குனி", start: new Date(now.getFullYear() + 1, 2, 14) }
    ];

    // Find the current Tamil month and calculate the day within that month
    let tamilMonth = tamilMonths[tamilMonths.length - 1]; // Start with the last month
    let tamilDay = 1;

    // Loop through the months and find the correct month and calculate the day of the month
    for (let i = 0; i < tamilMonths.length; i++) {
        if (now >= tamilMonths[i].start) {
            tamilMonth = tamilMonths[i];
            tamilDay = Math.floor((now - tamilMonth.start) / (1000 * 60 * 60 * 24)) + 1; // Days since the start of the month
        } else {
            break;
        }
    }

    // Tamil days (for the week)
    const tamilDays = ["ஞாயிறு", "திங்கள்", "செவ்வாய்", "புதன்", "வியாழன்", "வெள்ளி", "சனி"];
    const day = tamilDays[now.getDay()];

    const year = now.getFullYear();

    // Split time and suffix (AM/PM)
    const [time, suffix] = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).split(" ");

    // Display formatted date in Tamil
    document.getElementById('date-time-tamil').innerHTML = `${day}, ${tamilDay} ${tamilMonth.name}, ${year} | ${time} ${suffix}`;
}

// Update both date-times every second
setInterval(updateTime, 1000);
setInterval(updateTimeTamil, 1000);

// Initial call to display the date-times immediately
updateTime();
updateTimeTamil();
