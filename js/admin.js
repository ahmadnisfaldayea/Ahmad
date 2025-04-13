document.addEventListener('DOMContentLoaded', function() {
    // التحقق من حالة تسجيل الدخول
    const isLoggedIn = localStorage.getItem('dentalLabLoggedIn') === 'true';
    const loginContainer = document.getElementById('loginContainer');
    const adminPanel = document.getElementById('adminPanel');
    
    // عرض لوحة التحكم أو نموذج تسجيل الدخول بناءً على حالة تسجيل الدخول
    if (isLoggedIn) {
        loginContainer.style.display = 'none';
        adminPanel.style.display = 'block';
        loadAdminData();
    } else {
        loginContainer.style.display = 'flex';
        adminPanel.style.display = 'none';
    }
    
    // معالجة نموذج تسجيل الدخول
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // التحقق من بيانات تسجيل الدخول (بسيط للعرض فقط)
            if (username === 'ahmad' && password === 'ahmad123') {
                localStorage.setItem('dentalLabLoggedIn', 'true');
                loginContainer.style.display = 'none';
                adminPanel.style.display = 'block';
                loadAdminData();
            } else {
                loginError.textContent = 'اسم المستخدم أو كلمة المرور غير صحيحة';
            }
        });
    }
    
    // تسجيل الخروج
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.setItem('dentalLabLoggedIn', 'false');
            window.location.reload();
        });
    }
    
    // التنقل بين أقسام لوحة التحكم
    const menuItems = document.querySelectorAll('.admin-menu li');
    const adminSections = document.querySelectorAll('.admin-section');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            
            // إزالة الفئة النشطة من جميع عناصر القائمة
            menuItems.forEach(menuItem => {
                menuItem.classList.remove('active');
            });
            
            // إضافة الفئة النشطة للعنصر المحدد
            this.classList.add('active');
            
            // إخفاء جميع الأقسام
            adminSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // عرض القسم المحدد
            document.getElementById(`${sectionId}-section`).classList.add('active');
        });
    });
    
    // تحميل بيانات لوحة التحكم
    function loadAdminData() {
        // تحميل بيانات الملف الشخصي
        const profileName = document.getElementById('profileName');
        const profileTitle = document.getElementById('profileTitle');
        const profilePhone = document.getElementById('profilePhone');
        const profileEmail = document.getElementById('profileEmail');
        const profileImagePreview = document.getElementById('profileImagePreview');
        
        // تحميل بيانات الخدمات
        const servicesList = document.getElementById('servicesList');
        
        // تحميل معرض الأعمال
        loadPortfolio();
        
        // تحميل الرسائل
        loadMessages();
        
        // معالجة تغيير صورة الملف الشخصي
        const profileImage = document.getElementById('profileImage');
        
        if (profileImage) {
            profileImage.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        profileImagePreview.src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
        
        // معالجة نموذج تعديل الملف الشخصي
        const profileForm = document.getElementById('profileForm');
        
        if (profileForm) {
            profileForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('تم حفظ بيانات الملف الشخصي بنجاح!');
            });
        }
        
        // معالجة تعديل الخدمات
        const editBtns = document.querySelectorAll('.btn-edit');
        const serviceEditForm = document.getElementById('serviceEditForm');
        const editServiceForm = document.getElementById('editServiceForm');
        const cancelServiceEdit = document.getElementById('cancelServiceEdit');
        const serviceIndex = document.getElementById('serviceIndex');
        const serviceName = document.getElementById('serviceName');
        const serviceDescription = document.getElementById('serviceDescription');
        
        if (editBtns.length > 0) {
            editBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = this.getAttribute('data-index');
                    const serviceItem = document.querySelectorAll('.service-item')[index];
                    const name = serviceItem.querySelector('h3').textContent;
                    const description = serviceItem.querySelector('p').textContent;
                    
                    serviceIndex.value = index;
                    serviceName.value = name;
                    serviceDescription.value = description;
                    
                    serviceEditForm.style.display = 'block';
                });
            });
        }
        
        if (cancelServiceEdit) {
            cancelServiceEdit.addEventListener('click', function() {
                serviceEditForm.style.display = 'none';
            });
        }
        
        if (editServiceForm) {
            editServiceForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const index = serviceIndex.value;
                const name = serviceName.value;
                const description = serviceDescription.value;
                
                const serviceItem = document.querySelectorAll('.service-item')[index];
                serviceItem.querySelector('h3').textContent = name;
                serviceItem.querySelector('p').textContent = description;
                
                serviceEditForm.style.display = 'none';
                
                alert('تم تحديث الخدمة بنجاح!');
            });
        }
        
        // معالجة إضافة صور لمعرض الأعمال
        const addPortfolioBtn = document.getElementById('addPortfolioBtn');
        const portfolioUploadForm = document.getElementById('portfolioUploadForm');
        const cancelPortfolioUpload = document.getElementById('cancelPortfolioUpload');
        const uploadPortfolioForm = document.getElementById('uploadPortfolioForm');
        
        if (addPortfolioBtn) {
            addPortfolioBtn.addEventListener('click', function() {
                portfolioUploadForm.style.display = 'block';
            });
        }
        
        if (cancelPortfolioUpload) {
            cancelPortfolioUpload.addEventListener('click', function() {
                portfolioUploadForm.style.display = 'none';
            });
        }
        
        if (uploadPortfolioForm) {
            uploadPortfolioForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const portfolioImage = document.getElementById('portfolioImage');
                const portfolioDescription = document.getElementById('portfolioDescription').value;
                
                if (portfolioImage.files.length > 0) {
                    const file = portfolioImage.files[0];
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        // إنشاء عنصر صورة جديد
                        const portfolioGrid = document.getElementById('adminPortfolioGrid');
                        
                        const portfolioItem = document.createElement('div');
                        portfolioItem.className = 'portfolio-item';
                        
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.alt = portfolioDescription || 'صورة معرض الأعمال';
                        
                        const overlay = document.createElement('div');
                        overlay.className = 'portfolio-item-overlay';
                        
                        const actions = document.createElement('div');
                        actions.className = 'portfolio-item-actions';
                        
                        const deleteBtn = document.createElement('button');
                        deleteBtn.className = 'btn-delete';
                        deleteBtn.textContent = 'حذف';
                        deleteBtn.addEventListener('click', function() {
                            if (confirm('هل أنت متأكد من حذف هذه الصورة؟')) {
                                portfolioItem.remove();
                            }
                        });
                        
                        actions.appendChild(deleteBtn);
                        overlay.appendChild(actions);
                        portfolioItem.appendChild(img);
                        portfolioItem.appendChild(overlay);
                        
                        portfolioGrid.appendChild(portfolioItem);
                        
                        portfolioUploadForm.style.display = 'none';
                        uploadPortfolioForm.reset();
                        
                        alert('تم إضافة الصورة بنجاح!');
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
        }
    }
    
    // تحميل معرض الأعمال
    function loadPortfolio() {
        const portfolioGrid = document.getElementById('adminPortfolioGrid');
        
        if (portfolioGrid) {
            // هنا يمكن تحميل الصور من التخزين المحلي أو من الخادم
            // لأغراض العرض، سنستخدم صور افتراضية
            
            // يمكن استبدال هذا بتحميل الصور الفعلية من التخزين المحلي أو من الخادم
            const portfolioImages = [
                './images/portfolio/446a3281e8d8f8bc3bbbd5f7f34e0d1d.jpg',
                './images/portfolio/140db64658dd45ff52d7e0dc04f26a4b.jpg',
                './images/portfolio/6cbe1e7728c6f382470226c7ceef04d5.jpg',
                './images/portfolio/580225b57e9715953ebe0d48aaffc926.jpg',
                './images/portfolio/84dfafb13cade4d2fc4458c78a24438a.jpg',
                './images/portfolio/4e003aad01ae4c480816edcfb136cad8.jpg',
                './images/portfolio/ca21af727bec250a7ff5bc72d5748596.jpg'
            ];
            
            portfolioGrid.innerHTML = '';
            
            portfolioImages.forEach((src, index) => {
                const portfolioItem = document.createElement('div');
                portfolioItem.className = 'portfolio-item';
                
                const img = document.createElement('img');
                img.src = src;
                img.alt = `صورة معرض الأعمال ${index + 1}`;
                
                const overlay = document.createElement('div');
                overlay.className = 'portfolio-item-overlay';
                
                const actions = document.createElement('div');
                actions.className = 'portfolio-item-actions';
                
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'btn-delete';
                deleteBtn.textContent = 'حذف';
                deleteBtn.addEventListener('click', function() {
                    if (confirm('هل أنت متأكد من حذف هذه الصورة؟')) {
                        portfolioItem.remove();
                    }
                });
                
                actions.appendChild(deleteBtn);
                overlay.appendChild(actions);
                portfolioItem.appendChild(img);
                portfolioItem.appendChild(overlay);
                
                portfolioGrid.appendChild(portfolioItem);
            });
        }
    }
    
    // تحميل الرسائل
    function loadMessages() {
        const messagesList = document.getElementById('messagesList');
        const noMessages = document.getElementById('noMessages');
        
        if (messagesList) {
            // الحصول على الرسائل من التخزين المحلي
            const messages = JSON.parse(localStorage.getItem('dentalLabMessages')) || [];
            
            messagesList.innerHTML = '';
            
            if (messages.length > 0) {
                noMessages.style.display = 'none';
                
                messages.forEach((msg, index) => {
                    const messageItem = document.createElement('div');
                    messageItem.className = 'message-item';
                    
                    const messageHeader = document.createElement('div');
                    messageHeader.className = 'message-header';
                    
                    const messageInfo = document.createElement('div');
                    messageInfo.className = 'message-info';
                    
                    const name = document.createElement('h3');
                    name.textContent = msg.name;
                    
                    const contact = document.createElement('p');
                    contact.innerHTML = `<strong>الهاتف:</strong> ${msg.phone} | <strong>البريد الإلكتروني:</strong> ${msg.email}`;
                    
                    messageInfo.appendChild(name);
                    messageInfo.appendChild(contact);
                    
                    const messageDate = document.createElement('div');
                    messageDate.className = 'message-date';
                    messageDate.textContent = formatDate(msg.date);
                    
                    messageHeader.appendChild(messageInfo);
                    messageHeader.appendChild(messageDate);
                    
                    const messageContent = document.createElement('div');
                    messageContent.className = 'message-content';
                    messageContent.textContent = msg.message;
                    
                    const messageActions = document.createElement('div');
                    messageActions.className = 'message-actions';
                    
                    const deleteBtn = document.createElement('button');
                    deleteBtn.className = 'btn-delete';
                    deleteBtn.textContent = 'حذف';
                    deleteBtn.setAttribute('data-index', index);
                    
                    messageActions.appendChild(deleteBtn);
                    
                    messageItem.appendChild(messageHeader);
                    messageItem.appendChild(messageContent);
                    messageItem.appendChild(messageActions);
                    
                    messagesList.appendChild(messageItem);
                });
                
                // إضافة مستمعي أحداث لأزرار الحذف
                const messageDeleteBtns = document.querySelectorAll('.message-actions .btn-delete');
                messageDeleteBtns.forEach(btn => {
                    btn.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        if (confirm('هل أنت متأكد من حذف هذه الرسالة؟')) {
                            messages.splice(index, 1);
                            localStorage.setItem('dentalLabMessages', JSON.stringify(messages));
                            loadMessages(); // إعادة تحميل الرسائل
                        }
                    });
                });
            } else {
                noMessages.style.display = 'block';
            }
        }
    }
    
    // دالة مساعدة لتنسيق التاريخ
    function formatDate(dateString) {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    }
});
