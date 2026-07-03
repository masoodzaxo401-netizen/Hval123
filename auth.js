/* ================================================================== *
 * مدرسة زاخو — نظام الصلاحيات والتحقق الذكي والمستقل (تطوير مسعود)
 * ================================================================== */

// 1. قاعدة البيانات الثابتة لجميع طاقم المدرسة الـ 20 مع أدوارهم وموادهم
window.HVAL_USERS_LIST = {
  // --- الإدارة والمعاونين (أدوار مزدوجة) ---
  "diar_math": { name: "المدير: ديار سرحان", role: "admin", subject: "mathematics" }, 
  "bilind_sports": { name: "المعاون: بلند فرحان", role: "teacher", subject: "sports" }, 
  "mehvan_comp": { name: "المعاون: مهفان قاسم", role: "teacher", subject: "computer" }, 

  // --- 3 معلمين رياضيات (عدا المدير ديار ليصبح المجموع 4) ---
  "math_t1": { name: "معلم الرياضيات (أ)", role: "teacher", subject: "mathematics" },
  "math_t2": { name: "معلم الرياضيات (ب)", role: "teacher", subject: "mathematics" },
  "math_t3": { name: "معلم الرياضيات (ج)", role: "teacher", subject: "mathematics" },

  // --- 2 كردية ---
  "kurdish_t1": { name: "معلم الكردية 1", role: "teacher", subject: "kurdish" },
  "kurdish_t2": { name: "معلم الكردية 2", role: "teacher", subject: "kurdish" },

  // --- 2 انجليزي ---
  "english_t1": { name: "معلم الإنكليزي 1", role: "teacher", subject: "english" },
  "english_t2": { name: "معلم الإنكليزي 2", role: "teacher", subject: "english" },

  // --- 2 عربية ---
  "arabic_t1": { name: "معلم العربية 1", role: "teacher", subject: "arabic" },
  "arabic_t2": { name: "معلم العربية 2", role: "teacher", subject: "arabic" },

  // --- 2 كيمياء ---
  "chemistry_t1": { name: "معلم الكيمياء 1", role: "teacher", subject: "chemistry" },
  "chemistry_t2": { name: "معلم الكيمياء 2", role: "teacher", subject: "chemistry" },

  // --- 2 فيزياء ---
  "physics_t1": { name: "معلم الفيزياء 1", role: "teacher", subject: "physics" },
  "physics_t2": { name: "معلم الفيزياء 2", role: "teacher", subject: "physics" },

  // --- 2 أحياء ---
  "biology_t1": { name: "معلم الأحياء 1", role: "teacher", subject: "biology" },
  "biology_t2": { name: "معلم الأحياء 2", role: "teacher", subject: "biology" },

  // --- 1 فنية ---
  "art_t1": { name: "معلم الفنية", role: "teacher", subject: "art" },

  // --- 1 جينوسايد ---
  "genocide_t1": { name: "معلم الجينوسايد", role: "teacher", subject: "genocide" }
};

// 2. الذكاء الخارق: السيطرة الفورية على زر تسجيل الدخول
(function() {
  const initAuthSystem = () => {
    const loginForm = document.getElementById("loginForm");
    if (!loginForm) return;

    // منع أي سكريبت آخر من أخذ التحكم بالفورم
    loginForm.addEventListener("submit", function(e) {
      const usernameInput = document.getElementById("username");
      const passwordInput = document.getElementById("password");
      
      if (!usernameInput || !passwordInput) return;

      const userKey = usernameInput.value.trim();
      const passValue = passwordInput.value.trim();

      // إذا كان المستخدم ينتمي لطاقم المدرسة (المعلمين أو الإدارة)
      if (window.HVAL_USERS_LIST[userKey]) {
        // نوقف الكود الـ 1110 سطر القديم فوراً ونمنع تحديث الصفحة
        e.preventDefault();
        e.stopImmediatePropagation();

        // التحقق من كلمة المرور الموحدة
        if (passValue === "hval2026") {
          const userData = window.HVAL_USERS_LIST[userKey];
          alert(`خێرهاتی أهلاً بك: ${userData.name}`);

          // حفظ الجلسة محلياً ليتعرف عليه الموقع بالكامل
          sessionStorage.setItem("currentUser", JSON.stringify(userData));
          window.currentUser = userData; // حفظ في المتغير العام أيضاً للضمان

          // تنفيذ إجراءات الدخول والتبديل بين الشاشات
          executeSmartRouting(userData);
        } else {
          alert("❌ كلمة المرور غير صحيحة الخاصة بالمعلم!");
        }
      }
      // إذا كان حساب طالب، لا نتدخل ونترك كود الـ 1110 سطر القديم يعمل طبيعياً للطلاب
    }, true); // طوق الحماية البرمجي (Capture: True) للتنفيذ أولاً وقبل الجميع
  };

  // 3. دالة التوجيه الذكي وقفل المواد للمعلمين
  const executeSmartRouting = (user) => {
    // إخفاء بوابة تسجيل الدخول (Portal)
    const portalSection = document.getElementById("portal") || document.getElementById("home");
    if (portalSection) portalSection.style.display = "none";

    // تفعيل التوجيه للمدير أو المعلم
    if (user.role === "admin") {
      // إظهار لوحة المدير (ابحث عن المتاح في كودك القديم)
      const adminPanel = document.getElementById("admin-panel") || document.getElementById("grades");
      if (adminPanel) adminPanel.style.display = "block";
      
      const selectElement = document.querySelector("#subjectSelect") || document.querySelector("select[name='subject']");
      if (selectElement) selectElement.value = user.subject;
    } 
    else if (user.role === "teacher") {
      // إظهار لوحة المعلم
      const teacherPanel = document.getElementById("teacher-panel") || document.getElementById("grades");
      if (teacherPanel) teacherPanel.style.display = "block";
      
      // السحر هنا: قفل واجهة اختيار المواد على مادة المعلم الفعلي تلقائياً
      const selectElement = document.querySelector("#subjectSelect") || document.querySelector("select[name='subject']");
      if (selectElement) {
        selectElement.value = user.subject;
        selectElement.disabled = true; // قفل تام لكي لا يرى المعلم درجات غيره
      }
    }

    // تشغيل دوال التحديث التلقائية المتواجدة في ملفك الـ 1110 أسطر لعرض جدول الطلاب فوراً
    if (typeof filterStudentsBySubject === "function") filterStudentsBySubject();
    if (typeof renderTeacherTable === "function") renderTeacherTable();
    if (typeof updateDashboard === "function") updateDashboard();
  };

  // تشغيل النظام فور جاهزية الـ DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAuthSystem);
  } else {
    initAuthSystem();
  }
})();