// تحميل صور معرض الأعمال
document.addEventListener('DOMContentLoaded', function() {
    // قائمة بأسماء ملفات الصور في مجلد معرض الأعمال
    const portfolioImages = [
        '446a3281e8d8f8bc3bbbd5f7f34e0d1d.jpg',
        '140db64658dd45ff52d7e0dc04f26a4b.jpg',
        '6cbe1e7728c6f382470226c7ceef04d5.jpg',
        '580225b57e9715953ebe0d48aaffc926.jpg',
        '84dfafb13cade4d2fc4458c78a24438a.jpg',
        '4e003aad01ae4c480816edcfb136cad8.jpg',
        'ca21af727bec250a7ff5bc72d5748596.jpg'
    ];

    // الحصول على عنصر معرض الأعمال
    const portfolioContainer = document.querySelector('.portfolio-gallery');

    // إضافة كل صورة إلى المعرض
    portfolioImages.forEach((image, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.setAttribute('data-bs-toggle', 'modal');
        portfolioItem.setAttribute('data-bs-target', '#imageModal');
        portfolioItem.setAttribute('data-img', `images/portfolio/${image}`);
        
        portfolioItem.innerHTML = `
            <img src="images/portfolio/${image}" alt="عمل ${index + 1}" class="img-fluid">
            <div class="portfolio-overlay">
                <div class="portfolio-overlay-content">
                    <i class="fas fa-search-plus"></i>
                    <h5>عرض التفاصيل</h5>
                </div>
            </div>
        `;
        
        portfolioContainer.appendChild(portfolioItem);
    });

    // تفعيل النقر على صور المعرض لعرضها في النافذة المنبثقة
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('imageModalLabel');
    
    portfolioItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-img');
            modalImage.src = imgSrc;
            modalTitle.textContent = `عمل ${index + 1} - معرض الصور`;
        });
    });

    // معالجة نموذج الاتصال
    const contactForm = document.getElementById('contact-form');
    const formResponse = document.getElementById('form-response');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // الحصول على قيم الحقول
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // عرض مؤشر التحميل
            formResponse.className = 'form-response mt-3 text-center';
            formResponse.style.display = 'block';
            formResponse.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">جاري الإرسال...</span></div>';
            
            // محاكاة إرسال البيانات (في الإصدار النهائي، سيتم إرسال البيانات إلى الخادم)
            setTimeout(function() {
                // عرض رسالة النجاح
                formResponse.className = 'form-response mt-3 text-center success';
                formResponse.innerHTML = '<i class="fas fa-check-circle me-2"></i> تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.';
                
                // تسجيل البيانات في وحدة التحكم (للتوضيح فقط)
                console.log({
                    name,
                    email,
                    phone,
                    service,
                    message
                });
                
                // إعادة تعيين النموذج
                contactForm.reset();
                
                // إخفاء رسالة النجاح بعد 5 ثوانٍ
                setTimeout(function() {
                    formResponse.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }

    // تمرير سلس للروابط الداخلية
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// وظائف لوحة الإدارة
let isLoggedIn = false;
const adminUsername = 'ahmad';
const adminPassword = 'ahmad123';

function adminLogin(username, password) {
    if (username === adminUsername && password === adminPassword) {
        isLoggedIn = true;
        localStorage.setItem('adminLoggedIn', 'true');
        return true;
    }
    return false;
}

function adminLogout() {
    isLoggedIn = false;
    localStorage.removeItem('adminLoggedIn');
}

function checkAdminAuth() {
    return isLoggedIn || localStorage.getItem('adminLoggedIn') === 'true';
}

// التحقق من حالة تسجيل الدخول عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        isLoggedIn = true;
    }
});
