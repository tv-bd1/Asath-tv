/**
 * ASH IPTV Common Footer Script
 * Fixed: Android TV Logo visibility issue
 */

function loadCommonFooter() {
    const mobileApkUrl = "#";
    const tvApkUrl = "#"; 

    window.downloadApp = function() {
        window.location.href = mobileApkUrl;
    };

    window.downloadTVApp = function() {
        window.location.href = tvApkUrl;
    };

    const footerHTML = `
    <footer style="text-align: center; padding: 40px 20px; border-top: 1px solid var(--border); margin-top: 40px; background: rgba(5, 7, 10, 0.9); backdrop-filter: blur(10px); font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        
        <div style="margin-bottom: 10px;">
            <p style="font-weight: 700; margin-bottom: 10px;">ASH IPTV</p>
            <p style="font-size: 12px; color: var(--text-dim); margin: 0;">
                Copyright Â© 2026, All rights reserved.
            </p>
        </div>

        <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 15px; font-size: 13px; font-weight: 500; margin-bottom: 20px;">
            <a href="#" style="color: var(--text-dim); text-decoration: none; transition: 0.3s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-dim)'">About Us</a>
            <span style="color: var(--border);">|</span>
            <a href="#" style="color: var(--text-dim); text-decoration: none; transition: 0.3s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-dim)'">Privacy Policy</a>
            <span style="color: var(--border);">|</span>
            <a href="#" style="color: var(--text-dim); text-decoration: none; transition: 0.3s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-dim)'">Terms & Conditions</a>
        </div>

        <div style="margin-bottom: 10px;">
            <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; align-items: center;">
                
                
                <div onclick="downloadApp()" style="cursor: pointer; transition: 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" style="height: 40px;">
                </div>
                
                <div onclick="downloadApp()" style="cursor: pointer; transition: 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" style="height: 40px;">
                </div>
                
                <div onclick="downloadTVApp()" style="cursor: pointer; background: #000; border: 1px solid #ededed; border-radius: 6px; padding: 5px 15px; display: flex; align-items: center; gap: 8px; transition: 0.3s; height: 40px; box-sizing: border-box;" onmouseover="this.style.borderColor='var(--primary)'; this.style.transform='scale(1.05)'" onmouseout="this.style.borderColor='#ededed'; this.style.transform='scale(1)'">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#3DDC84" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.523 15.3414C17.0602 15.3414 16.6853 14.9665 16.6853 14.5037C16.6853 14.0408 17.0602 13.6659 17.523 13.6659C17.9859 13.6659 18.3608 14.0408 18.3608 14.5037C18.3608 14.9665 17.9859 15.3414 17.523 15.3414ZM6.47702 15.3414C6.01416 15.3414 5.63928 14.9665 5.63928 14.5037C5.63928 14.0408 6.01416 13.6659 6.47702 13.6659C6.93988 13.6659 7.31476 14.0408 7.31476 14.5037C7.31476 14.9665 6.93988 15.3414 6.47702 15.3414ZM17.8931 11.0567L19.5392 8.20455C19.6455 8.02055 19.5823 7.78534 19.3983 7.67904C19.2144 7.57274 18.9791 7.63584 18.8728 7.81984L17.1932 10.7288C15.7196 10.0559 14.0538 9.68175 12.3 9.68175C10.5462 9.68175 8.88035 10.0559 7.40679 10.7288L5.72717 7.81984C5.62088 7.63584 5.38566 7.57274 5.20166 7.67904C5.01766 7.78534 4.95456 8.02055 5.06086 8.20455L6.70691 11.0567C3.96349 12.5513 2.1121 15.3888 2 18.7056H22C21.8879 15.3888 20.0365 12.5513 17.8931 11.0567Z"/>
                    </svg>
                    <div style="text-align: left; line-height: 1.1;">
                        <p style="margin: 0; font-size: 7px; color: #ccc; text-transform: uppercase;">Download for</p>
                        <p style="margin: 0; font-size: 13px; color: #fff; font-weight: bold;">Android TV</p>
                    </div>
                </div>
                
            </div>
        </div>

        <div style="font-size: 11px; color: rgba(148, 163, 184, 0.4); max-width: 600px; margin: 0 auto; line-height: 1.6;">
            Disclaimer: ASH IPTV is an aggregator of publicly available streaming links. We do not host any content on our servers.
        </div>
    </footer>
    `;

    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadCommonFooter);
} else {
    loadCommonFooter();
}
