/* Cache Update Popup for ASH TV */

(function() {

    console.log("Popup script loaded...");



    const style = document.createElement('style');

    style.innerHTML = `

        .popup-overlay {

            display: none;

            position: fixed;

            z-index: 999999 !important;

            left: 0;

            top: 0;

            width: 100%;

            height: 100%;

            background-color: rgba(0, 0, 0, 0.85);

            align-items: center;

            justify-content: center;

            backdrop-filter: blur(8px);

        }

        .popup-content {

            background: #ffffff;

            padding: 30px;

            border-radius: 20px;

            max-width: 340px;

            width: 85%;

            text-align: center;

            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);

            animation: slideIn_popup 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

            font-family: Arial, sans-serif;

        }

        .popup-icon { font-size: 60px; margin-bottom: 10px; }

        .popup-title { margin: 0 0 10px; color: #000; font-size: 22px; font-weight: 800; }

        .popup-text { font-size: 15px; color: #444; line-height: 1.6; margin-bottom: 25px; }

        .popup-btn {

            background: #e50914;

            color: #fff;

            border: none;

            padding: 14px;

            border-radius: 10px;

            cursor: pointer;

            font-weight: bold;

            width: 100%;

            font-size: 16px;

            box-shadow: 0 4px 10px rgba(229, 9, 20, 0.3);

        }

        @keyframes slideIn_popup {

            from { transform: scale(0.8); opacity: 0; }

            to { transform: scale(1); opacity: 1; }

        }

    `;

    document.head.appendChild(style);



    const popupHTML = `

        <div id="cache-popup" class="popup-overlay">

            <div class="popup-content">

                <div class="popup-icon">🚀</div>

                <h3 class="popup-title">নতুন আপডেট!</h3>

                <p class="popup-text">

                   নতুন চ্যানেল এবং ফিচার পেতে অ্যাপটি একবার রিফ্রেশ করুন অথবা অ্যাপের ক্যাশ ক্লিয়ার করুন।

                </p>

                <button id="close-popup-btn" class="popup-btn">ঠিক আছে</button>

            </div>

        </div>

    `;

    

    const wrapper = document.createElement('div');

    wrapper.innerHTML = popupHTML;

    document.body.appendChild(wrapper);



    // কি (Key) পরিবর্তন করা হয়েছে যাতে আপনার ডিভাইসে আবার শো করে

    const popupKey = "ash_tv_final_update_mar_26"; 

    const popupOverlay = document.getElementById('cache-popup');

    const closeBtn = document.getElementById('close-popup-btn');



    // পপআপ দেখানোর লজিক

    if (!localStorage.getItem(popupKey)) {

        console.log("Showing popup now...");

        setTimeout(() => {

            popupOverlay.style.display = 'flex';

        }, 500); // দ্রুত দেখানোর জন্য সময় কমিয়েছি

    } else {

        console.log("Popup already seen by user.");

    }



    closeBtn.onclick = function() {

        popupOverlay.style.display = 'none';

        localStorage.setItem(popupKey, 'true');

    };



})();
