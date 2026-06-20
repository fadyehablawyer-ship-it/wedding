// --- إعدادات التاريخ والوقت ---
const weddingDate = new Date("September 27, 2026 18:00:00").getTime();

const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = d < 10 ? "0" + d : d;
    document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
    document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
    document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;

    if (distance < 0) {
        clearInterval(countdown);
        document.getElementById("days").innerText = "00";
    }
}, 1000);

// --- تخصيص رابط الضيف (الـ URL Parameters) ---
// الرابط هيكون شكله كدة: https://username.github.io/?invite=Ahmed
const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get('invite');

if (guestName) {
    const cleanName = decodeURIComponent(guestName);
    document.getElementById("welcome-container").classList.remove("hidden");
    document.getElementById("guest-name-welcome").innerText = `الأستاذ / الأستاذة: ${cleanName}`;
    document.getElementById("form-name").value = cleanName;
}

// --- التحكم في الموسيقى الخلفية ---
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");

musicBtn.addEventListener("click", () => {
    if (music.paused) {
        music.play().catch(e => console.log("التحميل التلقائي محجوب بواسطة المتصفح"));
        musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        music.pause();
        musicBtn.innerHTML = '<i class="fas fa-music"></i>';
    }
});

// --- إرسال فورمة الحضور RSVP وتأثير الـ Confetti ---
document.getElementById("rsvp-form").addEventListener("submit", function(e) {
    e.preventDefault();
    
    // إطلاق تأثير الاحتفال الفاخر
    confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#c5a880', '#ffffff', '#fcf9f2']
    });

    // إخفاء الفورمة وإظهار رسالة النجاح
    this.classList.add("hidden");
    document.getElementById("success-msg").classList.remove("hidden");

    // توجيه تأكيد بديل وسريع عبر الواتساب للرقم المطلوب لضمان وصول البيانات فورا بدون سيرفر
    const phone = document.getElementById("form-phone").value;
    const name = document.getElementById("form-name").value;
    const guests = document.getElementById("form-guests").value;
    
    const whatsappText = encodeURIComponent(`مرحباً فادي ومريم، أنا بأكد حضور فرحكم الجميل!\nالاسم: ${name}\nرقم الهاتف: ${phone}\nعدد الحضور: ${guests}`);
    setTimeout(() => {
        window.open(`https://wa.me/201220784066?text=${whatsappText}`, '_blank');
    }, 2000);
});

// --- الدخول السري للوحة التحكم (الضغط المتكرر) ---
let clickCount = 0;
document.getElementById("copyright").addEventListener("click", () => {
    clickCount++;
    if (clickCount === 5) {
        alert("سيتم تحويلك الآن إلى صفحة الإدارة السرية (تتطلب تهيئة Supabase)");
        clickCount = 0;
    }
});