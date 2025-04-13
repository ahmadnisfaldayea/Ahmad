document.addEventListener('DOMContentLoaded', function() {
    // التنقل المتجاوب
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // نموذج الاتصال
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // جمع بيانات النموذج
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // إنشاء كائن الرسالة
            const messageData = {
                name: name,
                phone: phone,
                email: email,
                message: message,
                date: new Date().toISOString()
            };
            
            // الحصول على الرسائل المخزنة سابقاً
            let messages = JSON.parse(localStorage.getItem('dentalLabMessages')) || [];
            
            // إضافة الرسالة الجديدة
            messages.push(messageData);
            
            // تخزين الرسائل المحدثة
            localStorage.setItem('dentalLabMessages', JSON.stringify(messages));
            
            // إعادة تعيين النموذج
            contactForm.reset();
            
            // عرض رسالة نجاح
            alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
        });
    }

    // تكبير صور معرض الأعمال
    const portfolioItems = document.querySelectorAll('.portfolio-item img');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            // يمكن إضافة وظيفة عرض الصورة بشكل مكبر هنا
            // مثال: إنشاء طبقة عرض للصورة المكبرة
        });
    });
});
