/**
 * Ash TV - Compact Desktop Floating Controls with App Download Modal
 * Updated: Direct Download via Store Icons, QR Code & Warning Note
 */

(function() {
    if (window.innerWidth <= 992) return;
    if (document.querySelector('.ash-floating-pill')) return;

    // ১. আপনার APK ফাইলের লিঙ্ক
    const apkUrl = "#"; 

    const allStyles = `
        .ash-floating-pill {
            position: fixed;
            right: 25px;
            bottom: 90px;
            display: flex;
            flex-direction: column;
            background: rgba(18, 18, 18, 0.9);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 40px;
            width: 44px;
            z-index: 10009;
            box-shadow: 0 10px 25px rgba(0,0,0,0.6);
            overflow: hidden;
            animation: fadeInRight 0.5s ease-out;
        }
        .pill-btn {
            width: 100%;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #94a3b8;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
        }
        .pill-btn:hover { color: #10b981; background: rgba(255, 255, 255, 0.05); }
        .pill-btn:not(:last-child) { border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
        .pill-btn svg { width: 18px; height: 18px; }
        
        .ash-app-modal-overlay {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.85);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 10010;
            backdrop-filter: blur(5px);
        }
        .ash-app-modal {
            background: #1a1a1a;
            width: 90%;
            max-width: 360px;
            border-radius: 16px;
            padding: 30px 25px;
            position: relative;
            text-align: center;
            border: 1px solid rgba(255,255,255,0.1);
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }
        .close-modal-btn {
            position: absolute;
            top: 12px; right: 12px;
            background: rgba(255,255,255,0.05);
            color: #94a3b8;
            border: none;
            width: 28px; height: 28px;
            border-radius: 50%;
            cursor: pointer;
        }
        .modal-title { color: #fff; font-size: 20px; font-weight: 700; margin-bottom: 5px; }
        .qr-container {
            background: #fff;
            padding: 12px;
            border-radius: 12px;
            display: inline-block;
            margin: 20px 0;
        }
        .qr-container img { width: 160px; height: 160px; display: block; }
        
        .store-btns { 
            display: flex; 
            gap: 12px; 
            justify-content: center; 
            margin-bottom: 20px; 
        }
        .store-btns a { 
            display: inline-block; 
            transition: transform 0.2s; 
        }
        .store-btns a:hover { transform: scale(1.05); }
        .store-btns img { height: 40px; }

        .ash-warning-note {
            background: rgba(255, 193, 7, 0.1);
            border: 1px solid rgba(255, 193, 7, 0.25);
            padding: 12px;
            border-radius: 10px;
            text-align: left;
        }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = allStyles;
    document.head.appendChild(styleSheet);

    // ২. পপআপ (Modal) HTML - বাটনগুলোর সাথে লিঙ্ক যুক্ত করা হয়েছে
    const modalHTML = `
        <div class="ash-app-modal-overlay" id="appModalOverlay">
            <div class="ash-app-modal">
                <button class="close-modal-btn" onclick="closeAppModal()">✕</button>
                <div class="modal-title">Get Ash TV App</div>
                <p style="color: #94a3b8; font-size: 14px; margin: 0;">Scan QR Code</p>
                
                <div class="qr-container">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(apkUrl)}" alt="QR Code">
                </div>

                <div style="display: flex; align-items: center; margin: 10px 0 25px;">
                    <div style="flex: 1; height: 1px; background: rgba(255,255,255,0.15);"></div>
                    <div style="padding: 0 15px; color: #64748b; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">OR</div>
                    <div style="flex: 1; height: 1px; background: rgba(255,255,255,0.15);"></div>
                </div>
                
                <div class="store-btns">
                    <a href="${apkUrl}"><img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play"></a>
                    <a href="${apkUrl}"><img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store"></a>
                </div>

               
            </div>
        </div>
    `;

    const pillHTML = `
        <div class="pill-btn" data-tooltip="Download App" onclick="openAppModal()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M11.82 2.276c-.028.1-.042 2.182-.042 6.269v6.119l-2.43-2.427c-1.732-1.73-2.464-2.436-2.55-2.459-.185-.048-.475-.028-.609.041-.222.115-.411.421-.411.666 0 .296-.022.271 3.193 3.494 2.127 2.132 3.157 3.138 3.267 3.189.11.051.6 0 .6 0s1.14-1.057 3.267-3.189c3.215-3.223 3.193-3.198 3.193-3.494 0-.245-.189-.551-.411-.666-.134-.069-.424-.089-.609-.041-.086.023-.818.729-2.55 2.459l-2.43 2.427V9.06c0-4.087-.014-6.169-.042-6.269a.8.8 0 0 0-.353-.448.95.95 0 0 0-.545-.067M4.805 20.28c-.391.092-.633.519-.524.924.059.218.288.453.5.511.225.063 14.213.063 14.438 0s.306-.191.306-.191-.348-1.246-.348-1.246c-.194-.045-14.181-.043-14.372.002"/></svg>
        </div>
        <div class="pill-btn" data-tooltip="Scroll to Top" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M11.82 8.276a1 1 0 0 0-.2.075c-.044.024-1.478 1.445-3.187 3.156-2.808 2.814-3.111 3.13-3.153 3.288a.75.75 0 0 0 .925.925c.158-.042.449-.32 2.985-2.853L12 10.061l2.81 2.806c2.536 2.533 2.827 2.811 2.985 2.853a.75.75 0 0 0 .925-.925c-.042-.158-.345-.474-3.153-3.288-1.709-1.712-3.152-3.136-3.207-3.165a.94.94 0 0 0-.54-.066"/></svg>
        </div>
    `;

    window.openAppModal = function() {
        document.getElementById('appModalOverlay').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    window.closeAppModal = function() {
        document.getElementById('appModalOverlay').style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    function init() {
        const modalDiv = document.createElement('div');
        modalDiv.innerHTML = modalHTML;
        document.body.appendChild(modalDiv.firstElementChild);

        const pillDiv = document.createElement('div');
        pillDiv.className = 'ash-floating-pill';
        pillDiv.innerHTML = pillHTML;
        document.body.appendChild(pillDiv);
    }

    window.addEventListener('load', init);
})();
