// ملف JavaScript الخاص بلوحة التحكم
document.addEventListener('DOMContentLoaded', function() {
    // التحقق من حالة تسجيل الدخول
    checkLoginStatus();
    
    // معالجة نموذج تسجيل الدخول
    const loginForm = document.getElementById('login-form');
    const loginResponse = document.getElementById('login-response');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // التحقق من بيانات تسجيل الدخول
            if (username === 'ahmad' && password === 'ahmad123') {
                // تسجيل الدخول بنجاح
                loginResponse.className = 'login-response mt-3 text-center success';
                loginResponse.innerHTML = '<i class="fas fa-check-circle me-2"></i> تم تسجيل الدخول بنجاح! جاري التحويل...';
                
                // تخزين حالة تسجيل الدخول
                localStorage.setItem('adminLoggedIn', 'true');
                
                // التحويل إلى لوحة التحكم بعد 1.5 ثانية
                setTimeout(function() {
                    showAdminPanel();
                }, 1500);
            } else {
                // فشل تسجيل الدخول
                loginResponse.className = 'login-response mt-3 text-center error';
                loginResponse.innerHTML = '<i class="fas fa-times-circle me-2"></i> اسم المستخدم أو كلمة المرور غير صحيحة!';
            }
        });
    }
    
    // زر تسجيل الخروج
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // حذف حالة تسجيل الدخول
            localStorage.removeItem('adminLoggedIn');
            
            // العودة إلى صفحة تسجيل الدخول
            showLoginForm();
        });
    }
    
    // التنقل بين أقسام لوحة التحكم
    const navLinks = document.querySelectorAll('[data-section]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // إزالة الفئة النشطة من جميع الروابط
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // إضافة الفئة النشطة إلى الرابط الحالي
            this.classList.add('active');
            
            // إخفاء جميع الأقسام
            const sections = document.querySelectorAll('.admin-section');
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // إظهار القسم المطلوب
            const targetSection = this.getAttribute('data-section');
            document.getElementById(`${targetSection}-section`).classList.add('active');
        });
    });
    
    // تغيير الصورة الشخصية
    const changeProfileBtn = document.getElementById('change-profile-btn');
    const profileImage = document.getElementById('profile-image');
    const profilePreview = document.getElementById('profile-preview');
    
    if (changeProfileBtn && profileImage) {
        changeProfileBtn.addEventListener('click', function() {
            profileImage.click();
        });
        
        profileImage.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    profilePreview.src = e.target.result;
                }
                
                reader.readAsDataURL(this.files[0]);
            }
        });
    }
    
    // معالجة نموذج الملف الشخصي
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // محاكاة حفظ البيانات
            showAlert('تم حفظ بيانات الملف الشخصي بنجاح!', 'success');
        });
    }
    
    // تعديل الخدمات
    const editServiceBtns = document.querySelectorAll('.edit-service-btn');
    const editServiceModal = new bootstrap.Modal(document.getElementById('editServiceModal'));
    const serviceIdInput = document.getElementById('service-id');
    const serviceNameInput = document.getElementById('service-name');
    const serviceDescriptionInput = document.getElementById('service-description');
    const serviceImageInput = document.getElementById('service-image');
    const serviceImagePreview = document.getElementById('service-image-preview');
    const saveServiceBtn = document.getElementById('save-service-btn');
    
    // بيانات الخدمات
    const services = [
        { id: 1, name: 'جسور معدنية', description: 'جسور معدنية عالية الجودة مصنوعة من أفضل المواد لضمان المتانة والراحة.' },
        { id: 2, name: 'جسور خزفية', description: 'جسور خزفية بمظهر طبيعي تماماً تمنحك ابتسامة جميلة وثقة أكبر.' },
        { id: 3, name: 'زيركون', description: 'تيجان وجسور زيركون بأعلى جودة للحصول على مظهر طبيعي ومتانة فائقة.' },
        { id: 4, name: 'بدلات - تقويم', description: 'بدلات أسنان كاملة وتقويم بتصميم مخصص يناسب احتياجاتك الفردية.' }
    ];
    
    if (editServiceBtns.length > 0) {
        editServiceBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const serviceId = parseInt(this.getAttribute('data-id'));
                const service = services.find(s => s.id === serviceId);
                
                if (service) {
                    serviceIdInput.value = service.id;
                    serviceNameInput.value = service.name;
                    serviceDescriptionInput.value = service.description;
                    
                    // إعادة تعيين معاينة الصورة
                    serviceImagePreview.src = '';
                    serviceImagePreview.classList.add('d-none');
                    
                    // فتح النافذة المنبثقة
                    editServiceModal.show();
                }
            });
        });
        
        // معاينة صورة الخدمة
        serviceImageInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    serviceImagePreview.src = e.target.result;
                    serviceImagePreview.classList.remove('d-none');
                }
                
                reader.readAsDataURL(this.files[0]);
            }
        });
        
        // حفظ تغييرات الخدمة
        saveServiceBtn.addEventListener('click', function() {
            const serviceId = parseInt(serviceIdInput.value);
            const serviceName = serviceNameInput.value;
            const serviceDescription = serviceDescriptionInput.value;
            
            // تحديث بيانات الخدمة في المصفوفة
            const serviceIndex = services.findIndex(s => s.id === serviceId);
            if (serviceIndex !== -1) {
                services[serviceIndex].name = serviceName;
                services[serviceIndex].description = serviceDescription;
                
                // تحديث الجدول
                const serviceRow = document.querySelector(`tr td:first-child:contains(${serviceId})`).parentNode;
                serviceRow.cells[1].textContent = serviceName;
                serviceRow.cells[2].textContent = serviceDescription;
                
                // إغلاق النافذة المنبثقة
                editServiceModal.hide();
                
                // عرض رسالة نجاح
                showAlert('تم تحديث الخدمة بنجاح!', 'success');
            }
        });
    }
    
    // إدارة معرض الأعمال
    const portfolioGallery = document.querySelector('.admin-gallery');
    const addPortfolioBtn = document.getElementById('add-portfolio-btn');
    const portfolioModal = new bootstrap.Modal(document.getElementById('portfolioModal'));
    const portfolioIdInput = document.getElementById('portfolio-id');
    const portfolioTitleInput = document.getElementById('portfolio-title');
    const portfolioImageInput = document.getElementById('portfolio-image');
    const portfolioImagePreview = document.getElementById('portfolio-image-preview');
    const savePortfolioBtn = document.getElementById('save-portfolio-btn');
    
    // بيانات معرض الأعمال
    const portfolioItems = [
        { id: 1, title: 'عمل 1', image: 'images/portfolio/446a3281e8d8f8bc3bbbd5f7f34e0d1d.jpg' },
        { id: 2, title: 'عمل 2', image: 'images/portfolio/140db64658dd45ff52d7e0dc04f26a4b.jpg' },
        { id: 3, title: 'عمل 3', image: 'images/portfolio/6cbe1e7728c6f382470226c7ceef04d5.jpg' },
        { id: 4, title: 'عمل 4', image: 'images/portfolio/580225b57e9715953ebe0d48aaffc926.jpg' },
        { id: 5, title: 'عمل 5', image: 'images/portfolio/84dfafb13cade4d2fc4458c78a24438a.jpg' },
        { id: 6, title: 'عمل 6', image: 'images/portfolio/4e003aad01ae4c480816edcfb136cad8.jpg' },
        { id: 7, title: 'عمل 7', image: 'images/portfolio/ca21af727bec250a7ff5bc72d5748596.jpg' }
    ];
    
    // عرض عناصر معرض الأعمال
    function renderPortfolioItems() {
        if (portfolioGallery) {
            portfolioGallery.innerHTML = '';
            
            portfolioItems.forEach(item => {
                const portfolioItem = document.createElement('div');
                portfolioItem.className = 'admin-gallery-item';
                portfolioItem.setAttribute('data-id', item.id);
                
                portfolioItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}">
                    <div class="admin-gallery-overlay">
                        <div class="admin-gallery-actions">
                            <div class="admin-gallery-btn edit-portfolio-btn" data-id="${item.id}">
                                <i class="fas fa-edit"></i>
                            </div>
                            <div class="admin-gallery-btn delete-portfolio-btn" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </div>
                        </div>
                        <div class="admin-gallery-title">${item.title}</div>
                    </div>
                `;
                
                portfolioGallery.appendChild(portfolioItem);
            });
            
            // تفعيل أزرار التعديل والحذف
            activatePortfolioButtons();
        }
    }
    
    // تفعيل أزرار معرض الأعمال
    function activatePortfolioButtons() {
        // أزرار التعديل
        const editPortfolioBtns = document.querySelectorAll('.edit-portfolio-btn');
        editPortfolioBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const portfolioId = parseInt(this.getAttribute('data-id'));
                const portfolioItem = portfolioItems.find(item => item.id === portfolioId);
                
                if (portfolioItem) {
                    // تعيين عنوان النافذة المنبثقة
                    document.getElementById('portfolioModalLabel').textContent = 'تعديل الصورة';
                    
                    // تعبئة النموذج
                    portfolioIdInput.value = portfolioItem.id;
                    portfolioTitleInput.value = portfolioItem.title;
                    
                    // عرض معاينة الصورة
                    portfolioImagePreview.src = portfolioItem.image;
                    portfolioImagePreview.classList.remove('d-none');
                    
                    // فتح النافذة المنبثقة
                    portfolioModal.show();
                }
            });
        });
        
        // أزرار الحذف
        const deletePortfolioBtns = document.querySelectorAll('.delete-portfolio-btn');
        deletePortfolioBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const portfolioId = parseInt(this.getAttribute('data-id'));
                
                if (confirm('هل أنت متأكد من حذف هذه الصورة؟')) {
                    // حذف العنصر من المصفوفة
                    const portfolioIndex = portfolioItems.findIndex(item => item.id === portfolioId);
                    if (portfolioIndex !== -1) {
                        portfolioItems.splice(portfolioIndex, 1);
                        
                        // إعادة عرض المعرض
                        renderPortfolioItems();
                        
                        // عرض رسالة نجاح
                        showAlert('تم حذف الصورة بنجاح!', 'success');
                    }
                }
            });
        });
    }
    
    // إضافة صورة جديدة
    if (addPortfolioBtn) {
        addPortfolioBtn.addEventListener('click', function() {
            // إعادة تعيين النموذج
            document.getElementById('portfolioModalLabel').textContent = 'إضافة صورة جديدة';
            portfolioIdInput.value = '';
            portfolioTitleInput.value = '';
            portfolioImageInput.value = '';
            portfolioImagePreview.src = '';
            portfolioImagePreview.classList.add('d-none');
            
            // فتح النافذة المنبثقة
            portfolioModal.show();
        });
    }
    
    // معاينة صورة المعرض
    if (portfolioImageInput) {
        portfolioImageInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    portfolioImagePreview.src = e.target.result;
                    portfolioImagePreview.classList.remove('d-none');
                }
                
                reader.readAsDataURL(this.files[0]);
            }
        });
    }
    
    // حفظ صورة المعرض
    if (savePortfolioBtn) {
        savePortfolioBtn.addEventListener('click', function() {
            const portfolioId = portfolioIdInput.value ? parseInt(portfolioIdInput.value) : null;
            const portfolioTitle = portfolioTitleInput.value;
            
            if (!portfolioTitle) {
                alert('يرجى إدخال عنوان الصورة!');
                return;
            }
            
            if (!portfolioId && !portfolioImageInput.files.length) {
                alert('يرجى اختيار صورة!');
                return;
            }
            
            if (portfolioId) {
                // تحديث صورة موجودة
                const portfolioIndex = portfolioItems.findIndex(item => item.id === portfolioId);
                if (portfolioIndex !== -1) {
                    portfolioItems[portfolioIndex].title = portfolioTitle;
                    
                    if (portfolioImageInput.files.length) {
                        // محاكاة تحديث الصورة (في التطبيق الحقيقي، سيتم رفع الصورة إلى الخادم)
                        portfolioItems[portfolioIndex].image = portfolioImagePreview.src;
                    }
                    
                    // عرض رسالة نجاح
                    showAlert('تم تحديث الصورة بنجاح!', 'success');
                }
            } else {
                // إضافة صورة جديدة
                const newId = portfolioItems.length > 0 ? Math.max(...portfolioItems.map(item => item.id)) + 1 : 1;
                
                portfolioItems.push({
                    id: newId,
                    title: portfolioTitle,
                    image: portfolioImagePreview.src
                });
                
                // عرض رسالة نجاح
                showAlert('تمت إضافة الصورة بنجاح!', 'success');
            }
            
            // إعادة عرض المعرض
            renderPortfolioItems();
            
            // إغلاق النافذة المنبثقة
            portfolioModal.hide();
        });
    }
    
    // عرض عناصر معرض الأعمال عند تحميل الصفحة
    renderPortfolioItems();
    
    // وظائف مساعدة
    
    // التحقق من حالة تسجيل الدخول
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
        
        if (isLoggedIn) {
            showAdminPanel();
        } else {
            showLoginForm();
        }
    }
    
    // عرض نموذج تسجيل الدخول
    function showLoginForm() {
        document.getElementById('login-section').classList.remove('d-none');
        document.getElementById('admin-panel-section').classList.add('d-none');
    }
    
    // عرض لوحة التحكم
    function showAdminPanel() {
        document.getElementById('login-section').classList.add('d-none');
        document.getElementById('admin-panel-section').classList.remove('d-none');
    }
    
    // عرض رسالة تنبيه
    function showAlert(message, type) {
        // إنشاء عنصر التنبيه
        const alertElement = document.createElement('div');
        alertElement.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
        alertElement.style.zIndex = '9999';
        alertElement.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        // إضافة العنصر إلى الصفحة
        document.body.appendChild(alertElement);
        
        // إزالة العنصر بعد 3 ثوانٍ
        setTimeout(function() {
            alertElement.remove();
        }, 3000);
    }
});

// تمديد jQuery للبحث عن النص
if (typeof jQuery !== 'undefined') {
    jQuery.expr[':'].contains = function(a, i, m) {
        return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };
}
