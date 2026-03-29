// ১. নিরাপত্তা: Frame Busting এবং Anti-Inspect
if (window.top !== window.self) { window.top.location = window.self.location; }

(function() {
    setInterval(() => {
        const threshold = 160;
        if (window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold) {
            window.location.href = "https://www.kamrulbd.com";
        }
    }, 1000);
})();

// ২. বাংলাদেশ টাইম অনুযায়ী সঠিক তারিখ বের করার ফাংশন
function getDhakaDate() {
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Dhaka',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(new Date());
}

const loadImaPlugin = () => {
    return new Promise((resolve) => {
        if (window.ClapprGoogleImaPlugin) return resolve();
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/clappr-google-ima-plugin@latest/dist/clappr-google-ima-plugin.min.js";
        script.onload = resolve;
        script.onerror = resolve;
        document.head.appendChild(script);
    });
};

let player;
let _allChannels = [];
let _currentFilter = 'All';
let isFirstLoad = true;
const targetM3U = 'https://www.ashtv.com.bd/server/iptv.m3u?v=' + Date.now();
let adIntervalTimer; 
let userRef; 
let manualAdTimeout;

// --- Firebase Configuration ---
const firebaseConfig = {
    apiKey: "t8GvPhpzSza7zouJYlU6Jsau4gN864dsiFbJUIGq",
    authDomain: "ash-iptv.firebaseapp.com",
    databaseURL: "https://ash-iptv-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ash-iptv",
    storageBucket: "ash-iptv.appspot.com",
    appId: "ash-iptv"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();

 /*  const adList = [
 /*    { video: "https://github.com/kamrulbangladesh/my-ads/raw/refs/heads/main/trip7teen.mp4", link: "https://www.facebook.com/trip7teen.bd" },
/*     { video: "https://github.com/kamrulbangladesh/my-ads/raw/refs/heads/main/kessifashion.mp4", link: "https://www.kessifashion.com/" },
 /*    { video: "https://github.com/kamrulbangladesh/my-ads/raw/refs/heads/main/kamrulbd.mp4", link: "https://www.kamrulbd.com/" },
 /*    { video: "https://github.com/kamrulbangladesh/my-ads/raw/refs/heads/main/ashvideo.mp4", link: "https://www.ashtoursbd.com/" }
/*  ];

const AD_DURATION_SEC = 6;           
const INITIAL_AD_DELAY = 10000;      
const AD_COOLDOWN_MS = 30 * 60 * 1000; 

/* ============================================================
   PLAYER & ADS LOGIC
   ============================================================ */

async function initPlayer(src, channelName) {
    closeAdAndResume(); 

    if (userRef) {
        const dhakaTimeStr = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Dhaka' });
        userRef.update({
            channel: channelName, // ড্যাশবোর্ড আপডেট
            last_play: dhakaTimeStr
        });
    }
    
    await loadImaPlugin();
    startMainPlayer(src);
    
    if (manualAdTimeout) clearTimeout(manualAdTimeout);

    db.ref("ads_enabled").once("value", (snapshot) => {
        if (snapshot.val() === true) {
            checkAndShowAd();
        }
    });
}

function checkAndShowAd() {
    const lastAdTime = localStorage.getItem('lastManualAdTime');
    const now = Date.now();
    if (!lastAdTime || (now - lastAdTime) > AD_COOLDOWN_MS) {
        if (manualAdTimeout) clearTimeout(manualAdTimeout);
        manualAdTimeout = setTimeout(() => {
            showManualAdOverlay();
            localStorage.setItem('lastManualAdTime', Date.now());
        }, INITIAL_AD_DELAY);
    }
}

function startMainPlayer(src) {
    if(player) player.destroy();
    const playerPlugins = window.ClapprGoogleImaPlugin ? [ClapprGoogleImaPlugin] : [];
    player = new Clappr.Player({
        source: src,
        parentId: "#player",
        autoPlay: true,
        width: "100%", 
        height: "100%",
        plugins: playerPlugins,
        ima: {
            adTagUrl: '',
            showCountdown: true,
        },
        mimeType: "application/x-mpegURL",
        hideMediaControl: true,
        mediacontrol: {seekbar: "#e50914", buttons: "#FFFFFF"},
        playback: { 
            hlsjsConfig: { enableWorker: true, xhrSetup: (xhr) => { xhr.withCredentials = false; } } 
        }
    });
}

function showManualAdOverlay() {
    if(player) player.mute(); 
    const randomAd = adList[Math.floor(Math.random() * adList.length)];
    const adContainer = document.getElementById('ad-container');
    const adVideo = document.getElementById('ad-video');
    const skipBtn = document.getElementById('skip-btn');
    const adProgressFill = document.getElementById('ad-progress-fill');
    
    if(!adContainer || !adVideo) return;
    adVideo.setAttribute('playsinline', '');
    adVideo.setAttribute('preload', 'auto');
    adContainer.style.display = 'block';
    skipBtn.style.display = 'none'; 
    adProgressFill.style.width = '0%';
    adVideo.src = randomAd.video;
    adVideo.load();
    adVideo.muted = true; 
    
    const playPromise = adVideo.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            setTimeout(() => { adVideo.muted = false; }, 200);
            startAdTimer();
        }).catch(() => {
            adVideo.muted = true;
            adVideo.play();
            startAdTimer();
        });
    }

    adVideo.onclick = () => window.open(randomAd.link, '_blank');

    function startAdTimer() {
        if(adIntervalTimer) clearInterval(adIntervalTimer);
        const startTime = Date.now();
        adIntervalTimer = setInterval(() => {
            const elapsed = (Date.now() - startTime) / 1000;
            const percentage = (elapsed / AD_DURATION_SEC) * 100;
            if (percentage <= 100) { 
                adProgressFill.style.width = percentage + '%'; 
            } else { 
                clearInterval(adIntervalTimer); 
                adProgressFill.style.width = '100%'; 
                skipBtn.style.display = 'flex'; 
            }
        }, 50);
    }
    adVideo.onended = () => closeAdAndResume();
}

function closeAdAndResume() {
    if(adIntervalTimer) { clearInterval(adIntervalTimer); adIntervalTimer = null; }
    if(manualAdTimeout) { clearTimeout(manualAdTimeout); manualAdTimeout = null; }
    const adVideo = document.getElementById('ad-video');
    const adContainer = document.getElementById('ad-container');
    if(adVideo) { adVideo.pause(); adVideo.src = ""; adVideo.load(); }
    if(adContainer) adContainer.style.display = 'none';
    if(player) { player.unmute(); player.play(); }
}

/* ============================================================
   STATS & SEARCH LOGIC
   ============================================================ */
function initStats() {
    userRef = db.ref("online_users").push();
    const today = getDhakaDate();

    setInterval(() => {
        if(userRef) {
            userRef.update({ last_seen: firebase.database.ServerValue.TIMESTAMP });
        }
    }, 30000);

    const logUserActivity = async (actionText = "Joined App") => {
        const activityRef = db.ref("user_activity").push();
        const DhakaTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' });
        try {
            const cfRes = await fetch('https://www.cloudflare.com/cdn-cgi/trace');
            const cfData = await cfRes.text();
            const dataObj = Object.fromEntries(cfData.split('\n').map(l => l.split('=')));
            const userIP = dataObj.ip || "Unknown IP";
            const countryCode = dataObj.loc || "Global";
            
            fetch(`https://ipapi.co/${userIP}/json/`).then(res => res.json()).then(locData => {
                const cityName = locData.city ? `${locData.city}, ${locData.country_name}` : `Region: ${countryCode}`;
                activityRef.set({ ip: userIP, city: cityName, ua: navigator.userAgent, time: DhakaTime, action: actionText });
                if(userRef) userRef.update({ city: cityName, ip: userIP });
            }).catch(() => {
                activityRef.set({ ip: userIP, city: `Country: ${countryCode}`, ua: navigator.userAgent, time: DhakaTime, action: actionText });
            });
        } catch (e) {
            activityRef.set({ ip: "Private Access", city: "Hidden/VPN", ua: navigator.userAgent, time: DhakaTime, action: actionText });
        }
    };

    db.ref("online_users").on("value", s => { 
        const onlineCount = document.getElementById('online-now'); 
        if(onlineCount) onlineCount.innerText = s.numChildren() || 0; 
    });

    db.ref("total_hits").transaction(c => (c || 0) + 1);
    db.ref("total_hits").on("value", s => { const hitsCount = document.getElementById('total-hits'); if(hitsCount) hitsCount.innerText = (s.val() || 0).toLocaleString(); });
    
    const dailyRef = db.ref("daily_hits/" + today);
    dailyRef.transaction(c => (c || 0) + 1);
    dailyRef.on("value", s => { const dailyCount = document.getElementById('daily-hits'); if(dailyCount) dailyCount.innerText = (s.val() || 0).toLocaleString(); });

    db.ref(".info/connected").on("value", s => { 
        if(s.val()) { 
            userRef.onDisconnect().remove(); 
            // শুরুতে চ্যানেল নাম 'Waiting...' থাকবে। প্লেয়ার চালু হলে অটোমেটিক বদলে যাবে।
            userRef.set({ joined_at: firebase.database.ServerValue.TIMESTAMP, ua: navigator.userAgent, channel: "Waiting..." });
        } 
    });

    logUserActivity("Joined App");
    window.logAction = logUserActivity;
}

function filterChannels() {
    const searchQuery = document.getElementById('channelSearch').value.toLowerCase();
    renderChannels(_currentFilter, searchQuery);
}

/* ============================================================
   M3U LOAD & RENDER
   ============================================================ */
async function loadM3U() {
    const statusMsg = document.getElementById('status-msg');
    try {
        const response = await fetch(targetM3U);
        const data = await response.text();
        const lines = data.split('\n');
        _allChannels = [];
        let currentChannel = {};
        for (let line of lines) {
            line = line.trim();
            if (line.startsWith('#EXTINF')) {
                let nameMatch = line.split(',')[1] || "Unknown Channel";
                let logoMatch = line.match(/tvg-logo="([^"]+)"/);
                let groupMatch = line.match(/group-title="([^"]+)"/);
                currentChannel = { name: nameMatch.trim(), logo: logoMatch ? logoMatch[1] : 'https://cdn-icons-png.flaticon.com/512/716/716429.png', group: groupMatch ? groupMatch[1] : 'Others' };
            } else if (line.startsWith('http')) {
                currentChannel.url = line;
                _allChannels.push(currentChannel);
                currentChannel = {};
            }
        }
        setupCategoryMenu();
        renderChannels('All');
    } catch (error) { if(statusMsg) statusMsg.innerText = "Error loading playlist."; }
}

function setupCategoryMenu() {
    const menu = document.getElementById('menu');
    if(!menu) return;
    const categories = ['All', ...new Set(_allChannels.map(ch => ch.group))];
    menu.innerHTML = '';
    categories.forEach(cat => {
        const span = document.createElement('span');
        span.innerText = cat;
        span.className = "category-tab"; 
        span.onclick = function() {
            _currentFilter = cat;
            document.getElementById('channelSearch').value = ''; 
            document.querySelectorAll('#menu span').forEach(s => s.classList.remove('active'));
            span.classList.add('active');
            renderChannels(cat);
            const offsetLeft = span.offsetLeft - (menu.offsetWidth / 2) + (span.offsetWidth / 2);
            menu.scrollTo({ left: offsetLeft, behavior: 'smooth' });
        };
        menu.appendChild(span);
    });
    if(menu.firstChild) menu.firstChild.classList.add('active');
}

function renderChannels(filter, searchQuery = '') {
    const container = document.getElementById('channel-container');
    if(!container) return;
    container.innerHTML = '';
    
    let list = filter === 'All' ? _allChannels : _allChannels.filter(ch => ch.group === filter);
    if(searchQuery) list = list.filter(ch => ch.name.toLowerCase().includes(searchQuery));
    
    list.forEach((ch, index) => {
        const div = document.createElement('div');
        div.className = 'channel';
        div.innerHTML = `<img src="${ch.logo}" onerror="this.src='https://cdn-icons-png.flaticon.com/512/716/716429.png'"><span>${ch.name}</span>`;
        div.onclick = function() {
            document.querySelectorAll('.channel').forEach(c => c.classList.remove('active'));
            div.classList.add('active');
            initPlayer(ch.url, ch.name);
            if(window.logAction) window.logAction("Watching: " + ch.name);
        };
        container.appendChild(div);

        // ফিক্স: প্রথম চ্যানেলটি অটো প্লে করার সময় সাথে সাথে ডাটাবেজ আপডেট হবে
        if (isFirstLoad && index === 0 && !searchQuery) {
            isFirstLoad = false; 
            div.classList.add('active');
            
            // প্লেয়ার স্টার্ট করার আগেই ডাটাবেজে নাম পাঠিয়ে দেওয়া হচ্ছে
            setTimeout(() => {
                if(userRef) {
                    userRef.update({ channel: ch.name }); 
                }
                initPlayer(ch.url, ch.name); 
            }, 1000);
        }
    });
}

window.skipNow = function(event) { if(event) event.stopPropagation(); closeAdAndResume(); };
document.addEventListener('contextmenu', e => e.preventDefault(), false);
document.onkeydown = function(e) { if(e.keyCode == 123 || (e.ctrlKey && e.shiftKey && [73, 67, 74].includes(e.keyCode)) || (e.ctrlKey && e.keyCode == 85)) return false; };
// একদম শেষে window.onload এর পরিবর্তে এটি ব্যবহার করতে পারেন
document.addEventListener('DOMContentLoaded', () => {
    loadM3U();
    initStats();
});
