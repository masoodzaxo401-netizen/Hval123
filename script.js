/* =========================================================
   ئامادەییا هەڤال يا كوران — School Management PWA
   Pure Vanilla JS · RBAC · i18n (EN/AR/KU) · Firebase-ready
   DEV: Masod Yehya Amin
   ========================================================= */
/* ================================================================== *
 * نظام تسجيل الدخول الذكي والمباشر للمعلمين والإدارة (إضافة مسعود)
 * ================================================================== */

/* ================================================================== *
 * نظام صلاحيات معلمين وإدارة مدرسة زاخو (القائمة الكاملة والنهائية)
 * ================================================================== */

window.HVAL_USERS_LIST = {
  // --- الإدارة والمعاونين (أدوار مزدوجة) ---
  "diar_math": { name: "المدير: ديار سرحان", role: "admin", subject: "mathematics" }, 
  "bilind_sports": { name: "المعاون: بلند فرحان", role: "teacher", subject: "sports" }, 
  "mehvan_comp": { name: "المعاون: مهفان قاسم", role: "teacher", subject: "computer" }, 

  // --- 3 معلمين رياضيات (عدا المدير ديار ليصبح المجموع 4) ---
  "math_t1": { name: "زیرڤان علی", role: "teacher", subject: "mathematics" },
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

// المراقبة الفورية عند تسجيل الدخول
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const loginButton = document.querySelector("#loginBtn") || document.querySelector("button[type='submit']") || document.querySelector(".login-submit");
    const usernameInput = document.querySelector("#username") || document.querySelector("input[type='text']");
    const passwordInput = document.querySelector("#password") || document.querySelector("input[type='password']");

    if (loginButton) {
      loginButton.addEventListener("click", function(e) {
        const userKey = usernameInput.value.trim();
        const passValue = passwordInput.value.trim();

        if (window.HVAL_USERS_LIST[userKey] && passValue === "hval2026") {
          e.preventDefault();
          e.stopPropagation();

          const loggedUser = window.HVAL_USERS_LIST[userKey];
          alert(`خێرهاتی أهلاً بك: ${loggedUser.name}`);

          if (loggedUser.role === "admin") {
            document.getElementById("admin-panel").style.display = "block";
            document.getElementById("login-screen").style.display = "none";
            
            const subjectSelect = document.querySelector("#subjectSelect") || document.querySelector("select[name='subject']");
            if (subjectSelect) subjectSelect.value = loggedUser.subject;
          } 
          else if (loggedUser.role === "teacher") {
            document.getElementById("login-screen").style.display = "none";
            const teacherPanel = document.getElementById("teacher-panel");
            if (teacherPanel) teacherPanel.style.display = "block";
            
            const subjectSelect = document.querySelector("#subjectSelect") || document.querySelector("select[name='subject']");
            if (subjectSelect) {
              subjectSelect.value = loggedUser.subject;
              subjectSelect.disabled = true; 
              
              if (typeof filterStudentsBySubject === "function") filterStudentsBySubject();
              if (typeof renderTeacherTable === "function") renderTeacherTable();
            }
          }
        }
      });
    }
  }, 1000);
});

/* ------------------------------------------------------------------ *
 * 0. CONSTANTS
 * ------------------------------------------------------------------ */
const SUBJECTS = [
  "kurdish", "arabic", "english", "mathematics", "physics",
  "chemistry", "biology", "history", "geography", "islamic",
];
const CLASSES = ["Grade 10", "Grade 11", "Grade 12"];
const ROLES = ["admin", "teacher", "media", "developer", "student"];
const PASS_MARK = 50;

/* ------------------------------------------------------------------ *
 * 1. LOCALIZATION (English · Arabic · Kurdish Badini/Arabic script)
 * ------------------------------------------------------------------ */
const DICT = {
  en: {
    school_name: "Hval Boys Preparatory", school_tag: "School Management Portal",
    nav_home: "Home", nav_grades: "Grades", nav_teachers: "Teachers", nav_contact: "Contact", nav_dev: "Developer",
    theme_logo: "Royal Blue", theme_kurd: "Kurdistan", theme_prem: "Premium Gold",
    login: "Login", logout: "Logout",
    hero_badge: "Official Student Portal",
    hero_title: "Excellence in Education, Every Single Day",
    hero_sub: "A modern platform for students, teachers and administration to manage grades, announcements and academic life — securely from any device.",
    hero_cta: "Student Login", hero_cta2: "Meet Our Teachers",
    stat_students: "Students", stat_teachers: "Teachers", stat_subjects: "Subjects",
    announcements: "Announcements", new_post: "New Post",
    portal_title: "Login Portal", portal_sub: "Sign in to access your grades and notifications.",
    username: "Username", password: "Password", demo_accounts: "Demo accounts",
    grades_title: "Grades Dashboard",
    grades_sub: "Activity 1 (10) + Midterm (20) + Activity 2 (10) + Final (60) = Total (100)",
    need_login: "Please log in to view this section.",
    teachers_title: "Teachers Directory", teachers_sub: "Our dedicated academic staff.",
    contact_title: "Contact & Support", contact_sub: "Have a question? Reach out and we will get back to you.",
    contact_addr: "Duhok, Kurdistan Region, Iraq",
    full_name: "Full name", email: "Email", message: "Message", send_msg: "Send Message",
    dev_title: "Developer Portal", dev_sub: "Override account roles across the system.",
    dev_only: "Developer access only.", footer_tag: "Building the leaders of tomorrow.",
    /* dynamic */
    welcome: "Welcome", role: "Role", save: "Save", cancel: "Cancel", close: "Close",
    add_student: "Add Student", delete: "Delete", edit: "Edit", export_csv: "Export CSV",
    students_registry: "Students Registry", all_grades: "All Student Grades",
    broadcast: "Broadcast Notification", publish: "Publish Announcement",
    title: "Title", body: "Content", image: "Image", image_upload: "Upload image (ImgBB)",
    or_paste_url: "or paste an image URL", post: "Post",
    subject: "Subject", class: "Class", select_class: "Select class", select_subject: "Select subject",
    enter_grades: "Enter Grades", my_grades: "My Grades", notifications: "Notifications",
    no_data: "No data yet.", no_notifs: "No notifications yet.", no_announce: "No announcements yet.",
    activity1: "Activity 1", midterm: "Midterm", activity2: "Activity 2", final: "Final", total: "Total",
    name: "Name", generate: "Generate", change_role: "Change Role", update: "Update",
    passing: "Passing", failing: "Failing", average: "Average", search: "Search…",
    student: "Student", print: "Print", target: "Target", all_students: "All students",
    credentials_gen: "Generated Credentials", credentials_hint: "Save or print these credentials before closing.",
    confirm_del_student: "Delete this student and their account?",
    login_success: "Welcome back!", login_fail: "Invalid username or password.",
    logout_done: "You have been logged out.", fill_all: "Please fill in all fields correctly.",
    invalid_email: "Enter a valid email address.", msg_sent: "Your message has been sent!",
    student_added: "Student added successfully.", student_deleted: "Student removed.",
    role_updated: "Role updated.", grade_saved: "Grades saved.", announce_posted: "Announcement published.",
    announce_deleted: "Announcement deleted.", notif_sent: "Notification broadcasted.",
    offline_mode: "Offline demo mode — add Firebase keys in firebase-config.js to sync online.",
    admin: "Administrator", teacher: "Teacher", media: "Media / Publisher", developer: "Developer",
    subjects_taught: "Subject", registry_hint: "Add, view and remove students. Usernames & passwords are generated automatically.",
    posted_by: "Posted by", targeted: "For you",
    kurdish: "Kurdish", arabic: "Arabic", english: "English", mathematics: "Mathematics",
    physics: "Physics", chemistry: "Chemistry", biology: "Biology", history: "History",
    geography: "Geography", islamic: "Islamic Studies",
    account: "Account",
  },
  ar: {
    school_name: "إعدادية هَڤال للبنين", school_tag: "بوابة إدارة المدرسة",
    nav_home: "الرئيسية", nav_grades: "الدرجات", nav_teachers: "المعلمون", nav_contact: "التواصل", nav_dev: "المطور",
    theme_logo: "الأزرق الملكي", theme_kurd: "كوردستان", theme_prem: "الذهبي الفاخر",
    login: "تسجيل الدخول", logout: "خروج",
    hero_badge: "البوابة الرسمية للطلاب",
    hero_title: "التميّز في التعليم، كل يوم",
    hero_sub: "منصة عصرية للطلاب والمعلمين والإدارة لإدارة الدرجات والإعلانات والحياة الأكاديمية بأمان من أي جهاز.",
    hero_cta: "دخول الطالب", hero_cta2: "تعرّف على معلمينا",
    stat_students: "طالب", stat_teachers: "معلم", stat_subjects: "مادة",
    announcements: "الإعلانات", new_post: "منشور جديد",
    portal_title: "بوابة الدخول", portal_sub: "سجّل الدخول للوصول إلى درجاتك وإشعاراتك.",
    username: "اسم المستخدم", password: "كلمة المرور", demo_accounts: "حسابات تجريبية",
    grades_title: "لوحة الدرجات",
    grades_sub: "نشاط ١ (١٠) + نصف السنة (٢٠) + نشاط ٢ (١٠) + النهائي (٦٠) = المجموع (١٠٠)",
    need_login: "الرجاء تسجيل الدخول لعرض هذا القسم.",
    teachers_title: "دليل المعلمين", teachers_sub: "كادرنا الأكاديمي المتفاني.",
    contact_title: "التواصل والدعم", contact_sub: "لديك سؤال؟ تواصل معنا وسنعود إليك.",
    contact_addr: "دهوك، إقليم كوردستان، العراق",
    full_name: "الاسم الكامل", email: "البريد الإلكتروني", message: "الرسالة", send_msg: "إرسال الرسالة",
    dev_title: "بوابة المطور", dev_sub: "تعديل صلاحيات أي حساب في النظام.",
    dev_only: "الوصول للمطور فقط.", footer_tag: "نبني قادة الغد.",
    welcome: "أهلاً", role: "الصلاحية", save: "حفظ", cancel: "إلغاء", close: "إغلاق",
    add_student: "إضافة طالب", delete: "حذف", edit: "تعديل", export_csv: "تصدير CSV",
    students_registry: "سجل الطلاب", all_grades: "درجات جميع الطلاب",
    broadcast: "بث إشعار", publish: "نشر إعلان",
    title: "العنوان", body: "المحتوى", image: "صورة", image_upload: "رفع صورة (ImgBB)",
    or_paste_url: "أو الصق رابط صورة", post: "نشر",
    subject: "المادة", class: "الصف", select_class: "اختر الصف", select_subject: "اختر المادة",
    enter_grades: "إدخال الدرجات", my_grades: "درجاتي", notifications: "الإشعارات",
    no_data: "لا توجد بيانات بعد.", no_notifs: "لا توجد إشعارات بعد.", no_announce: "لا توجد إعلانات بعد.",
    activity1: "النشاط ١", midterm: "نصف السنة", activity2: "النشاط ٢", final: "النهائي", total: "المجموع",
    name: "الاسم", generate: "توليد", change_role: "تغيير الصلاحية", update: "تحديث",
    passing: "ناجح", failing: "راسب", average: "المعدل", search: "بحث…",
    student: "الطالب", print: "طباعة", target: "المستهدف", all_students: "جميع الطلاب",
    credentials_gen: "بيانات الدخول المُولّدة", credentials_hint: "احفظ أو اطبع هذه البيانات قبل الإغلاق.",
    confirm_del_student: "حذف هذا الطالب وحسابه؟",
    login_success: "مرحباً بعودتك!", login_fail: "اسم المستخدم أو كلمة المرور غير صحيحة.",
    logout_done: "تم تسجيل خروجك.", fill_all: "الرجاء تعبئة جميع الحقول بشكل صحيح.",
    invalid_email: "أدخل بريداً إلكترونياً صحيحاً.", msg_sent: "تم إرسال رسالتك!",
    student_added: "تمت إضافة الطالب بنجاح.", student_deleted: "تم حذف الطالب.",
    role_updated: "تم تحديث الصلاحية.", grade_saved: "تم حفظ الدرجات.", announce_posted: "تم نشر الإعلان.",
    announce_deleted: "تم حذف الإعلان.", notif_sent: "تم بث الإشعار.",
    offline_mode: "الوضع التجريبي — أضف مفاتيح Firebase في firebase-config.js للمزامنة عبر الإنترنت.",
    admin: "مدير / إدارة", teacher: "معلم", media: "ناشر / إعلام", developer: "مطور",
    subjects_taught: "المادة", registry_hint: "أضف واعرض واحذف الطلاب. تُولّد أسماء المستخدمين وكلمات المرور تلقائياً.",
    posted_by: "بواسطة", targeted: "لك",
    kurdish: "الكردية", arabic: "العربية", english: "الإنجليزية", mathematics: "الرياضيات",
    physics: "الفيزياء", chemistry: "الكيمياء", biology: "الأحياء", history: "التاريخ",
    geography: "الجغرافيا", islamic: "التربية الإسلامية",
    account: "الحساب",
  },
  ku: {
    school_name: "ئامادەییا هەڤال يا كوران", school_tag: "دەرگەها بەڕێڤەبرنا خواندنگەهێ",
    nav_home: "سەرەکی", nav_grades: "نمرە", nav_teachers: "مامۆستا", nav_contact: "پەیوەندی", nav_dev: "پەرەپێدەر",
    theme_logo: "شینێ شاهانە", theme_kurd: "کوردستان", theme_prem: "زێڕینێ بلند",
    login: "چوونا ژوورێ", logout: "دەرکەفتن",
    hero_badge: "دەرگەها فەرمی یا خواندکاران",
    hero_title: "بلندی د پەروەردەیێ دا، هەر ڕۆژ",
    hero_sub: "پلاتفۆرمەکا نوی بۆ خواندکار، مامۆستا و بەڕێڤەبریێ بۆ بەڕێڤەبرنا نمرە و راگەهاندن و ژیانا زانستی ب پاراستی ژ هەر ئامێرەکێ.",
    hero_cta: "چوونا خواندکاری", hero_cta2: "مامۆستایێن مە ناسبکە",
    stat_students: "خواندکار", stat_teachers: "مامۆستا", stat_subjects: "بابەت",
    announcements: "راگەهاندن", new_post: "پۆستا نوی",
    portal_title: "دەرگەها چوونێ", portal_sub: "بچە ژوورێ بۆ گەهشتنا نمرە و ئاگەهداریێن خۆ.",
    username: "ناڤێ بکارهێنەری", password: "نهێنیوشە", demo_accounts: "هەژمارێن نمونە",
    grades_title: "داشبۆردا نمرەیان",
    grades_sub: "چالاکی ١ (١٠) + ناڤبڕ (٢٠) + چالاکی ٢ (١٠) + کۆتایی (٦٠) = کۆ (١٠٠)",
    need_login: "ژ کەرەما خۆ بچە ژوورێ بۆ دیتنا ڤێ بەشێ.",
    teachers_title: "لیستا مامۆستایان", teachers_sub: "ستافێ مە یێ زانستی یێ دلسۆز.",
    contact_title: "پەیوەندی و پشتگیری", contact_sub: "پرسیارەک هەیە؟ پەیوەندیێ بکە و ئەم ڤەدگەرینە تە.",
    contact_addr: "دهۆک، هەرێما کوردستانێ، عێراق",
    full_name: "ناڤێ تەمام", email: "ئیمەیل", message: "پەیام", send_msg: "پەیامێ بشینە",
    dev_title: "دەرگەها پەرەپێدەری", dev_sub: "گوهۆڕینا دەسەڵاتێن هەر هەژمارەکێ د سیستەمی دا.",
    dev_only: "تنێ گەهشتنا پەرەپێدەری.", footer_tag: "سەرکردەیێن سبەهی ئاڤا دکەین.",
    welcome: "بخێرهاتی", role: "دەسەڵات", save: "پاراستن", cancel: "بەتالکرن", close: "گرتن",
    add_student: "زێدەکرنا خواندکاری", delete: "ژێبرن", edit: "دەستکاری", export_csv: "دەرهاویشتنا CSV",
    students_registry: "تۆمارا خواندکاران", all_grades: "نمرەیێن هەمی خواندکاران",
    broadcast: "بەلاڤکرنا ئاگەهداری", publish: "بلاڤکرنا راگەهاندنێ",
    title: "سەرناڤ", body: "ناڤەرۆک", image: "وێنە", image_upload: "بارکرنا وێنەی (ImgBB)",
    or_paste_url: "یان لینکێ وێنەی بلکینە", post: "بلاڤکرن",
    subject: "بابەت", class: "پۆل", select_class: "پۆلێ هەلبژێرە", select_subject: "بابەتی هەلبژێرە",
    enter_grades: "تۆمارکرنا نمرەیان", my_grades: "نمرەیێن من", notifications: "ئاگەهداری",
    no_data: "هێشتا داتا نینن.", no_notifs: "هێشتا ئاگەهداری نینن.", no_announce: "هێشتا راگەهاندن نینن.",
    activity1: "چالاکی ١", midterm: "ناڤبڕ", activity2: "چالاکی ٢", final: "کۆتایی", total: "کۆ",
    name: "ناڤ", generate: "دروستکرن", change_role: "گوهۆڕینا دەسەڵاتی", update: "نویکرن",
    passing: "دەربازبوو", failing: "دەرنەبازبوو", average: "ناڤنجی", search: "لێگەڕان…",
    student: "خواندکار", print: "چاپکرن", target: "ئارمانج", all_students: "هەمی خواندکار",
    credentials_gen: "زانیاریێن چوونێ یێن دروستکری", credentials_hint: "پێش گرتنێ ئەڤ زانیاریانە بپارێزە یان چاپبکە.",
    confirm_del_student: "ئەڤ خواندکار و هەژمارا وی ژێببە؟",
    login_success: "بخێرهاتی ڤەگەڕی!", login_fail: "ناڤێ بکارهێنەری یان نهێنیوشە چەوتە.",
    logout_done: "تو ژ سیستەمی دەرکەفتی.", fill_all: "ژ کەرەما خۆ هەمی خانەیان ب دروستی پڕبکە.",
    invalid_email: "ئیمەیلەکا دروست بنڤیسە.", msg_sent: "پەیاما تە هاتە شاندن!",
    student_added: "خواندکار ب سەرکەفتی هاتە زێدەکرن.", student_deleted: "خواندکار هاتە ژێبرن.",
    role_updated: "دەسەڵات هاتە نویکرن.", grade_saved: "نمرە هاتنە پاراستن.", announce_posted: "راگەهاندن هاتە بلاڤکرن.",
    announce_deleted: "راگەهاندن هاتە ژێبرن.", notif_sent: "ئاگەهداری هاتە بەلاڤکرن.",
    offline_mode: "دۆخێ نمونە — کلیلێن Firebase د firebase-config.js دا زێدەبکە بۆ هەماهەنگی.",
    admin: "بەڕێڤەبەر", teacher: "مامۆستا", media: "بلاڤکەر / راگەهاندن", developer: "پەرەپێدەر",
    subjects_taught: "بابەت", registry_hint: "خواندکاران زێدەبکە، ببینە و ژێببە. ناڤ و نهێنیوشە ب ئۆتۆماتیک دروست دبن.",
    posted_by: "ژ لایێ", targeted: "بۆ تە",
    kurdish: "کوردی", arabic: "عەرەبی", english: "ئینگلیزی", mathematics: "بیرکاری",
    physics: "فیزیا", chemistry: "کیمیا", biology: "زیندەزانی", history: "دیرۆک",
    geography: "جوگرافیا", islamic: "پەروەردەیا ئیسلامی",
    account: "هەژمار",
  },
};

let lang = localStorage.getItem("hval_lang") || "en";
const RTL_LANGS = ["ar", "ku"];
const t = (k) => (DICT[lang] && DICT[lang][k]) || DICT.en[k] || k;

/* ------------------------------------------------------------------ *
 * 2. DATA LAYER (Firebase Realtime DB when configured, else local)
 * ------------------------------------------------------------------ */
const USE_FIREBASE =
  window.FIREBASE_CONFIG &&
  typeof firebase !== "undefined" &&
  !String(window.FIREBASE_CONFIG.apiKey).includes("YOUR_");

let fdb = null;
if (USE_FIREBASE) {
  try {
    firebase.initializeApp(window.FIREBASE_CONFIG);
    fdb = firebase.database();
  } catch (e) {
    console.log("[v0] Firebase init failed, falling back to local:", e.message);
  }
}

const LS_KEY = "hval_db_v1";
const localRead = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; }
  catch { return {}; }
};
const localWrite = (o) => localStorage.setItem(LS_KEY, JSON.stringify(o));

const splitPath = (p) => p.split("/").filter(Boolean);
function getNested(obj, path) {
  return splitPath(path).reduce((o, k) => (o == null ? undefined : o[k]), obj);
}
function setNested(obj, path, val) {
  const keys = splitPath(path); let o = obj;
  for (let i = 0; i < keys.length - 1; i++) { o[keys[i]] = o[keys[i]] || {}; o = o[keys[i]]; }
  o[keys[keys.length - 1]] = val;
}
function delNested(obj, path) {
  const keys = splitPath(path); let o = obj;
  for (let i = 0; i < keys.length - 1; i++) { if (o == null) return; o = o[keys[i]]; }
  if (o) delete o[keys[keys.length - 1]];
}

const DB = {
  async get(path) {
    if (fdb) { const s = await fdb.ref(path).get(); return s.val(); }
    return getNested(localRead(), path) ?? null;
  },
  async set(path, val) {
    if (fdb) return fdb.ref(path).set(val);
    const o = localRead(); setNested(o, path, val); localWrite(o);
  },
  async update(path, val) {
    if (fdb) return fdb.ref(path).update(val);
    const o = localRead(); const cur = getNested(o, path) || {};
    setNested(o, path, { ...cur, ...val }); localWrite(o);
  },
  async remove(path) {
    if (fdb) return fdb.ref(path).remove();
    const o = localRead(); delNested(o, path); localWrite(o);
  },
  async push(path, val) {
    const id = fdb ? fdb.ref(path).push().key
      : "id" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    await this.set(path + "/" + id, { ...val, id });
    return id;
  },
};

const asArray = (obj) => (obj ? Object.values(obj) : []);

/* ------------------------------------------------------------------ *
 * 3. SEED DATA (runs once if the database is empty)
 * ------------------------------------------------------------------ */
async function seedIfEmpty() {
  const existing = await DB.get("users");
  if (existing) return;

  const users = {
    admin:  { id: "admin",  username: "admin",   password: "admin123", role: "admin",     name: "Rojan Ahmed" },
    dev:    { id: "dev",    username: "dev",     password: "dev123",   role: "developer", name: "Masod Yehya Amin" },
    media:  { id: "media",  username: "media",   password: "media123", role: "media",     name: "Dilan Sabri" },
    t_math: { id: "t_math", username: "teacher", password: "teach123", role: "teacher",   name: "Karwan Salih",  subject: "mathematics" },
    t_phys: { id: "t_phys", username: "aland",   password: "phys123",  role: "teacher",   name: "Aland Nabi",    subject: "physics" },
    t_eng:  { id: "t_eng",  username: "shirin",  password: "eng123",   role: "teacher",   name: "Shirin Omar",   subject: "english" },
  };

  const students = {
    s1: { id: "s1", name: "Hemin Jamal",   username: "student", className: "Grade 10" },
    s2: { id: "s2", name: "Rezan Ako",     username: "rezan.ako", className: "Grade 10" },
    s3: { id: "s3", name: "Diyar Kamal",   username: "diyar.kamal", className: "Grade 11" },
    s4: { id: "s4", name: "Sipan Farhad",  username: "sipan.farhad", className: "Grade 12" },
  };
  // Link student accounts (login users)
  users.student = { id: "student", username: "student", password: "study123", role: "student", name: "Hemin Jamal", studentId: "s1" };
  users.u_s2 = { id: "u_s2", username: "rezan.ako", password: "rezan123", role: "student", name: "Rezan Ako", studentId: "s2" };
  users.u_s3 = { id: "u_s3", username: "diyar.kamal", password: "diyar123", role: "student", name: "Diyar Kamal", studentId: "s3" };
  users.u_s4 = { id: "u_s4", username: "sipan.farhad", password: "sipan123", role: "student", name: "Sipan Farhad", studentId: "s4" };

  const mk = (a1, mid, a2, fin) => ({ a1, mid, a2, final: fin, total: a1 + mid + a2 + fin });
  const grades = {
    s1: { mathematics: mk(9, 17, 8, 50), english: mk(8, 15, 9, 45), physics: mk(7, 12, 6, 30) },
    s2: { mathematics: mk(6, 10, 5, 22), english: mk(9, 18, 10, 55) },
    s3: { physics: mk(10, 19, 9, 58), mathematics: mk(8, 16, 8, 48) },
  };

  const announcements = {
    a1: { id: "a1", title: "New Academic Year 2026 Begins", body: "Welcome back! Classes resume Sunday. Please check your schedule on the portal.", image: "", author: "Administration", date: Date.now() - 86400000 },
    a2: { id: "a2", title: "Science Fair Registration Open", body: "Students can now register for the annual science fair. Speak to your science teacher for details.", image: "", author: "Media Team", date: Date.now() - 43200000 },
  };

  const notifications = {
    n1: { id: "n1", title: "Midterm Exams", body: "Midterm exams start next week. Good luck to all students!", target: "all", date: Date.now() - 3600000 },
  };

  await DB.set("users", users);
  await DB.set("students", students);
  await DB.set("grades", grades);
  await DB.set("announcements", announcements);
  await DB.set("notifications", notifications);
  console.log("[v0] Seed data created.");
}

/* ------------------------------------------------------------------ *
 * 4. SESSION / AUTH
 * ------------------------------------------------------------------ */
let session = null; // current user object

async function restoreSession() {
  const id = localStorage.getItem("hval_session");
  if (!id) return null;
  const u = await DB.get("users/" + id);
  session = u || null;
  return session;
}

async function login(username, password) {
  const users = asArray(await DB.get("users"));
  const u = users.find(
    (x) => x.username.toLowerCase() === username.toLowerCase().trim() && x.password === password
  );
  if (!u) return false;
  session = u;
  localStorage.setItem("hval_session", u.id);
  return true;
}

function logout() {
  session = null;
  localStorage.removeItem("hval_session");
}

/* ------------------------------------------------------------------ *
 * 5. DOM HELPERS
 * ------------------------------------------------------------------ */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const el = (tag, cls, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  return e;
};
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const initials = (name) => name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
const fmtDate = (ts) => new Date(ts).toLocaleDateString(lang === "en" ? "en-GB" : lang === "ar" ? "ar" : "ku", { day: "2-digit", month: "short", year: "numeric" });

function toast(msg, type = "ok") {
  const wrap = $("#toastWrap");
  const icon = type === "bad" ? "fa-circle-exclamation" : "fa-circle-check";
  const t2 = el("div", `toast ${type}`, `<i class="fa-solid ${icon}"></i><span>${esc(msg)}</span>`);
  wrap.appendChild(t2);
  setTimeout(() => { t2.style.opacity = "0"; setTimeout(() => t2.remove(), 300); }, 3200);
}

function openModal(title, bodyNode) {
  $("#modalTitle").textContent = title;
  const body = $("#modalBody");
  body.innerHTML = "";
  body.appendChild(bodyNode);
  $("#modal").hidden = false;
}
function closeModal() { $("#modal").hidden = true; }

/* ------------------------------------------------------------------ *
 * 6. i18n + THEME + RTL
 * ------------------------------------------------------------------ */
function applyLang() {
  const html = document.documentElement;
  html.lang = lang;
  html.dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr";
  $$("[data-i18n]").forEach((n) => { n.textContent = t(n.dataset.i18n); });
  $(".lang-current").textContent = lang.toUpperCase();
  localStorage.setItem("hval_lang", lang);
}
function setLang(l) { lang = l; applyLang(); rerenderDynamic(); }

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("hval_theme", theme);
  const meta = { logo: "#1e3a8a", kurdistan: "#197a3d", premium: "#0e0e11" }[theme] || "#1e3a8a";
  $('meta[name="theme-color"]').setAttribute("content", meta);
}

/* ------------------------------------------------------------------ *
 * 7. ROUTER / NAV
 * ------------------------------------------------------------------ */
function navigate(view) {
  $$(".view").forEach((v) => v.classList.toggle("active", v.id === view));
  $$(".nav-link").forEach((a) => a.classList.toggle("active", a.dataset.nav === view));
  closeMobileNav();
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (view === "grades") renderGrades();
  if (view === "developer") renderDeveloper();
  if (view === "teachers") renderTeachers();
}

function closeMobileNav() {
  $("#mainNav").classList.remove("open");
  $("#navBackdrop").classList.remove("show");
  $("#hamburger").setAttribute("aria-expanded", "false");
}

/* ------------------------------------------------------------------ *
 * 8. AUTH UI
 * ------------------------------------------------------------------ */
function refreshAuthUI() {
  const loggedIn = !!session;
  $("#loginTriggerBtn").hidden = loggedIn;
  $("#userChip").hidden = !loggedIn;
  $(".nav-dev").hidden = !(session && (session.role === "developer" || session.role === "admin"));

  if (loggedIn) {
    $("#userName").textContent = session.name;
    $("#userRole").textContent = t(session.role);
    $("#userAvatar").textContent = initials(session.name);
  }
  // Media/Admin can create announcements
  $("#newAnnounceBtn").hidden = !(session && (session.role === "media" || session.role === "admin"));
}

/* ------------------------------------------------------------------ *
 * 9. ANNOUNCEMENTS (Home)
 * ------------------------------------------------------------------ */
async function renderAnnouncements() {
  const list = $("#announceList");
  const data = asArray(await DB.get("announcements")).sort((a, b) => b.date - a.date);
  list.innerHTML = "";
  if (!data.length) { list.appendChild(el("p", "empty", t("no_announce"))); return; }

  const canDelete = session && (session.role === "media" || session.role === "admin");
  data.forEach((a) => {
    const card = el("article", "announce-card");
    card.innerHTML = `
      ${a.image ? `<img src="${esc(a.image)}" alt="${esc(a.title)}" loading="lazy" />` : ""}
      <div class="announce-body">
        <h3>${esc(a.title)}</h3>
        <p>${esc(a.body)}</p>
        <div class="announce-meta">
          <span><i class="fa-regular fa-user"></i> ${esc(a.author)} · ${fmtDate(a.date)}</span>
          ${canDelete ? `<button class="del-announce" data-del-announce="${a.id}"><i class="fa-solid fa-trash"></i></button>` : ""}
        </div>
      </div>`;
    list.appendChild(card);
  });

  $$("[data-del-announce]").forEach((b) =>
    b.addEventListener("click", async () => {
      await DB.remove("announcements/" + b.dataset.delAnnounce);
      toast(t("announce_deleted"));
      renderAnnouncements();
    })
  );
}

/* ------------------------------------------------------------------ *
 * 10. TEACHERS DIRECTORY
 * ------------------------------------------------------------------ */
async function renderTeachers() {
  const grid = $("#teachersGrid");
  const teachers = asArray(await DB.get("users")).filter((u) => u.role === "teacher");
  grid.innerHTML = "";
  if (!teachers.length) { grid.appendChild(el("p", "empty", t("no_data"))); return; }
  teachers.forEach((tt) => {
    const card = el("article", "teacher-card");
    card.innerHTML = `
      <div class="teacher-ava">${initials(tt.name)}</div>
      <h3>${esc(tt.name)}</h3>
      <div class="subj">${t(tt.subject || "subject")}</div>
      <p class="bio">${t("teacher")}</p>`;
    grid.appendChild(card);
  });
}

/* ------------------------------------------------------------------ *
 * 11. GRADES (role-aware)
 * ------------------------------------------------------------------ */
async function renderGrades() {
  const gate = $("#gradesGate");
  const content = $("#gradesContent");
  if (!session) { gate.hidden = false; content.hidden = true; return; }
  gate.hidden = true; content.hidden = false;
  content.innerHTML = "";

  if (session.role === "student") return renderStudentGrades(content);
  if (session.role === "teacher") return renderTeacherGrades(content);
  if (session.role === "admin") return renderAdminGrades(content);
  // media / developer: show read-only overview
  return renderAdminGrades(content, true);
}

/* ---- Student view ---- */
async function renderStudentGrades(root) {
  const sid = session.studentId;
  const grades = (await DB.get("grades/" + sid)) || {};
  const notifs = asArray(await DB.get("notifications")).filter(
    (n) => n.target === "all" || n.target === sid
  ).sort((a, b) => b.date - a.date);

  root.appendChild(el("h2", "section-title", `<i class="fa-solid fa-award"></i> ${t("my_grades")}`));

  const entries = Object.entries(grades);
  if (!entries.length) {
    root.appendChild(el("p", "empty", t("no_data")));
  } else {
    const wrap = el("div", "breakdown");
    let sum = 0;
    entries.forEach(([subj, g]) => {
      const total = g.total ?? (g.a1 + g.mid + g.a2 + g.final);
      sum += total;
      const pass = total >= PASS_MARK;
      const card = el("article", "bd-card");
      card.innerHTML = `
        <h3>${t(subj)}</h3>
        <div class="bd-row"><span>${t("activity1")} /10</span><span>${g.a1}</span></div>
        <div class="bd-row"><span>${t("midterm")} /20</span><span>${g.mid}</span></div>
        <div class="bd-row"><span>${t("activity2")} /10</span><span>${g.a2}</span></div>
        <div class="bd-row"><span>${t("final")} /60</span><span>${g.final}</span></div>
        <div class="bd-row total"><span>${t("total")} /100</span><span class="${pass ? "grade-pass" : "grade-fail"}">${total}</span></div>
        <div class="progress"><span style="width:${total}%"></span></div>
        <div style="margin-top:.6rem"><span class="pill" style="background:${pass ? "var(--primary-100)" : "var(--accent-soft)"};color:${pass ? "var(--primary)" : "var(--accent)"}">${pass ? t("passing") : t("failing")}</span></div>`;
      wrap.appendChild(card);
    });
    root.appendChild(wrap);
    const avg = Math.round(sum / entries.length);
    root.appendChild(el("p", "muted", `${t("average")}: <strong style="color:var(--primary)">${avg}/100</strong>`));
  }

  root.appendChild(el("h2", "section-title", `<i class="fa-solid fa-bell"></i> ${t("notifications")}`));
  if (!notifs.length) { root.appendChild(el("p", "empty", t("no_notifs"))); return; }
  const nl = el("div", "announce-list");
  notifs.forEach((n) => {
    const c = el("article", "announce-card");
    c.innerHTML = `<div class="announce-body"><h3>${esc(n.title)}</h3><p>${esc(n.body)}</p>
      <div class="announce-meta"><span>${fmtDate(n.date)}</span>${n.target !== "all" ? `<span class="pill">${t("targeted")}</span>` : ""}</div></div>`;
    nl.appendChild(c);
  });
  root.appendChild(nl);
}

/* ---- Teacher view: grade entry grid ---- */
async function renderTeacherGrades(root) {
  const subject = session.subject || SUBJECTS[0];
  root.appendChild(el("h2", "section-title",
    `<i class="fa-solid fa-pen-to-square"></i> ${t("enter_grades")} — <span style="color:var(--primary)">${t(subject)}</span>`));

  const toolbar = el("div", "toolbar");
  toolbar.innerHTML = `
    <div class="group">
      <label>${t("class")}:
        <select id="tClass">${CLASSES.map((c) => `<option value="${c}">${c}</option>`).join("")}</select>
      </label>
    </div>
    <div class="group">
      <button class="btn btn-primary btn-sm" id="saveGradesBtn"><i class="fa-solid fa-floppy-disk"></i> ${t("save")}</button>
    </div>`;
  root.appendChild(toolbar);

  const tableWrap = el("div", "table-wrap");
  root.appendChild(tableWrap);

  const draw = async () => {
    const cls = $("#tClass").value;
    const students = asArray(await DB.get("students")).filter((s) => s.className === cls);
    const grades = (await DB.get("grades")) || {};
    if (!students.length) { tableWrap.innerHTML = `<p class="empty">${t("no_data")}</p>`; return; }
    const rows = students.map((s) => {
      const g = (grades[s.id] && grades[s.id][subject]) || { a1: "", mid: "", a2: "", final: "" };
      const total = (+g.a1 || 0) + (+g.mid || 0) + (+g.a2 || 0) + (+g.final || 0);
      return `<tr data-sid="${s.id}">
        <td>${esc(s.name)}</td>
        <td><input type="number" min="0" max="10" value="${g.a1}" data-f="a1"></td>
        <td><input type="number" min="0" max="20" value="${g.mid}" data-f="mid"></td>
        <td><input type="number" min="0" max="10" value="${g.a2}" data-f="a2"></td>
        <td><input type="number" min="0" max="60" value="${g.final}" data-f="final"></td>
        <td class="total-cell" data-total>${total}</td>
      </tr>`;
    }).join("");
    tableWrap.innerHTML = `
      <table class="data">
        <thead><tr>
          <th>${t("student")}</th><th>${t("activity1")}<br>/10</th><th>${t("midterm")}<br>/20</th>
          <th>${t("activity2")}<br>/10</th><th>${t("final")}<br>/60</th><th>${t("total")}<br>/100</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>`;

    // live total
    $$("#gradesContent input[type=number]").forEach((inp) =>
      inp.addEventListener("input", () => {
        const tr = inp.closest("tr");
        const v = (f) => Math.max(0, +($(`input[data-f=${f}]`, tr).value || 0));
        const caps = { a1: 10, mid: 20, a2: 10, final: 60 };
        const f = inp.dataset.f;
        if (+inp.value > caps[f]) inp.value = caps[f];
        $("[data-total]", tr).textContent = v("a1") + v("mid") + v("a2") + v("final");
      })
    );
  };

  $("#tClass").addEventListener("change", draw);
  $("#saveGradesBtn").addEventListener("click", async () => {
    const trs = $$("#gradesContent tbody tr");
    for (const tr of trs) {
      const sid = tr.dataset.sid;
      const val = (f) => Math.max(0, +($(`input[data-f=${f}]`, tr).value || 0));
      const rec = { a1: val("a1"), mid: val("mid"), a2: val("a2"), final: val("final") };
      rec.total = rec.a1 + rec.mid + rec.a2 + rec.final;
      rec.updatedBy = session.name; rec.updatedAt = Date.now();
      await DB.set(`grades/${sid}/${subject}`, rec);
    }
    toast(t("grade_saved"));
  });

  await draw();
}

/* ---- Admin / overview: all students' grades ---- */
async function renderAdminGrades(root, readOnly = false) {
  // stat cards
  const students = asArray(await DB.get("students"));
  const users = asArray(await DB.get("users"));
  const stats = el("div", "stat-cards");
  stats.innerHTML = `
    ${statCard("fa-user-graduate", students.length, t("stat_students"))}
    ${statCard("fa-chalkboard-user", users.filter((u) => u.role === "teacher").length, t("stat_teachers"))}
    ${statCard("fa-book", SUBJECTS.length, t("stat_subjects"))}
    ${statCard("fa-bullhorn", asArray(await DB.get("announcements")).length, t("announcements"))}`;
  root.appendChild(stats);

  // Admin-only management tools
  if (!readOnly && session.role === "admin") {
    const bar = el("div", "toolbar");
    bar.innerHTML = `
      <h2 class="section-title" style="margin:0"><i class="fa-solid fa-users-gear"></i> ${t("students_registry")}</h2>
      <div class="group">
        <button class="btn btn-primary btn-sm" id="addStudentBtn"><i class="fa-solid fa-user-plus"></i> ${t("add_student")}</button>
        <button class="btn btn-outline btn-sm" id="exportBtn"><i class="fa-solid fa-file-csv"></i> ${t("export_csv")}</button>
        <button class="btn btn-outline btn-sm" id="broadcastBtn"><i class="fa-solid fa-tower-broadcast"></i> ${t("broadcast")}</button>
      </div>`;
    root.appendChild(bar);
    root.appendChild(el("p", "muted", t("registry_hint")));

    const regWrap = el("div", "table-wrap");
    root.appendChild(regWrap);
    await drawRegistry(regWrap);

    $("#addStudentBtn").addEventListener("click", openAddStudent);
    $("#exportBtn").addEventListener("click", exportCredentials);
    $("#broadcastBtn").addEventListener("click", openBroadcast);
  }

  // All grades matrix
  root.appendChild(el("h2", "section-title", `<i class="fa-solid fa-table"></i> ${t("all_grades")}`));
  const grades = (await DB.get("grades")) || {};
  const wrap = el("div", "table-wrap");
  const head = `<tr><th>${t("student")}</th><th>${t("class")}</th>${SUBJECTS.map((s) => `<th>${t(s)}</th>`).join("")}</tr>`;
  const body = students.map((s) => {
    const cells = SUBJECTS.map((subj) => {
      const g = grades[s.id] && grades[s.id][subj];
      if (!g) return `<td class="muted">—</td>`;
      const total = g.total ?? 0;
      return `<td class="${total >= PASS_MARK ? "grade-pass" : "grade-fail"}">${total}</td>`;
    }).join("");
    return `<tr><td>${esc(s.name)}</td><td>${esc(s.className)}</td>${cells}</tr>`;
  }).join("");
  wrap.innerHTML = `<table class="data"><thead>${head}</thead><tbody>${body || `<tr><td colspan="12" class="empty">${t("no_data")}</td></tr>`}</tbody></table>`;
  root.appendChild(wrap);
}

const statCard = (icon, val, label) =>
  `<div class="stat-card"><div class="ic"><i class="fa-solid ${icon}"></i></div><strong>${val}</strong><span>${label}</span></div>`;

async function drawRegistry(wrap) {
  const students = asArray(await DB.get("students"));
  const users = asArray(await DB.get("users"));
  const rows = students.map((s) => {
    const u = users.find((x) => x.studentId === s.id) || {};
    return `<tr>
      <td>${esc(s.name)}</td><td>${esc(s.className)}</td>
      <td><code>${esc(u.username || s.username || "")}</code></td>
      <td><code>${esc(u.password || "")}</code></td>
      <td class="row-actions">
        <button class="icon-btn danger" data-del-student="${s.id}" title="${t("delete")}"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>`;
  }).join("");
  wrap.innerHTML = `<table class="data"><thead>
      <tr><th>${t("name")}</th><th>${t("class")}</th><th>${t("username")}</th><th>${t("password")}</th><th></th></tr>
    </thead><tbody>${rows || `<tr><td colspan="5" class="empty">${t("no_data")}</td></tr>`}</tbody></table>`;

  $$("[data-del-student]", wrap).forEach((b) =>
    b.addEventListener("click", async () => {
      if (!confirm(t("confirm_del_student"))) return;
      const sid = b.dataset.delStudent;
      const usr = asArray(await DB.get("users")).find((x) => x.studentId === sid);
      await DB.remove("students/" + sid);
      await DB.remove("grades/" + sid);
      if (usr) await DB.remove("users/" + usr.id);
      toast(t("student_deleted"));
      renderGrades();
    })
  );
}

/* ---- Credential generation ---- */
function genUsername(name, existing) {
  let base = name.trim().toLowerCase()
    .replace(/[^a-z\s]/g, "")   // keep latin letters
    .replace(/\s+/g, ".");
  if (!base) base = "student";
  let u = base, i = 1;
  while (existing.includes(u)) u = base + i++;
  return u;
}
function genPassword() {
  const chars = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let p = "";
  for (let i = 0; i < 8; i++) p += chars[Math.floor(Math.random() * chars.length)];
  return p;
}

function openAddStudent() {
  const form = el("form", "form");
  form.innerHTML = `
    <label class="field"><span>${t("name")}</span><input type="text" id="asName" required></label>
    <label class="field"><span>${t("class")}</span>
      <select id="asClass">${CLASSES.map((c) => `<option>${c}</option>`).join("")}</select>
    </label>
    <div style="display:flex;gap:.6rem;justify-content:flex-end;margin-top:.5rem">
      <button type="button" class="btn btn-outline btn-sm" data-close-modal>${t("cancel")}</button>
      <button type="submit" class="btn btn-primary btn-sm"><i class="fa-solid fa-wand-magic-sparkles"></i> ${t("generate")}</button>
    </div>`;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = $("#asName", form).value.trim();
    const cls = $("#asClass", form).value;
    if (!name) return;
    const users = asArray(await DB.get("users"));
    const username = genUsername(name, users.map((u) => u.username));
    const password = genPassword();
    const sid = await DB.push("students", { name, className: cls, username });
    await DB.set("users/u_" + sid, { id: "u_" + sid, username, password, role: "student", name, studentId: sid });
    closeModal();
    toast(t("student_added"));
    showCredentials([{ name, username, password }]);
    renderGrades();
  });
  openModal(t("add_student"), form);
  $$("[data-close-modal]", form).forEach((b) => b.addEventListener("click", closeModal));
}

function showCredentials(list) {
  const box = el("div");
  box.innerHTML = `
    <p class="muted">${t("credentials_hint")}</p>
    <table class="cred-table">
      <thead><tr><th>${t("name")}</th><th>${t("username")}</th><th>${t("password")}</th></tr></thead>
      <tbody>${list.map((c) => `<tr><td>${esc(c.name)}</td><td><code>${esc(c.username)}</code></td><td><code>${esc(c.password)}</code></td></tr>`).join("")}</tbody>
    </table>
    <div style="display:flex;gap:.6rem;justify-content:flex-end;margin-top:1rem">
      <button class="btn btn-outline btn-sm" id="printCredBtn"><i class="fa-solid fa-print"></i> ${t("print")}</button>
      <button class="btn btn-primary btn-sm" data-close-modal>${t("close")}</button>
    </div>`;
  openModal(t("credentials_gen"), box);
  $("#printCredBtn", box).addEventListener("click", () => window.print());
  $$("[data-close-modal]", box).forEach((b) => b.addEventListener("click", closeModal));
}

async function exportCredentials() {
  const students = asArray(await DB.get("students"));
  const users = asArray(await DB.get("users"));
  const rows = [["Name", "Class", "Username", "Password"]];
  students.forEach((s) => {
    const u = users.find((x) => x.studentId === s.id) || {};
    rows.push([s.name, s.className, u.username || s.username || "", u.password || ""]);
  });
  const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = el("a"); a.href = url; a.download = "student-credentials.csv"; a.click();
  URL.revokeObjectURL(url);
  toast(t("export_csv") + " ✓");
}

/* ---- Broadcast notification ---- */
async function openBroadcast() {
  const students = asArray(await DB.get("students"));
  const form = el("form", "form");
  form.innerHTML = `
    <label class="field"><span>${t("title")}</span><input type="text" id="nTitle" required></label>
    <label class="field"><span>${t("body")}</span><textarea id="nBody" rows="3" required></textarea></label>
    <label class="field"><span>${t("target")}</span>
      <select id="nTarget">
        <option value="all">${t("all_students")}</option>
        ${students.map((s) => `<option value="${s.id}">${esc(s.name)} (${esc(s.className)})</option>`).join("")}
      </select>
    </label>
    <div style="display:flex;gap:.6rem;justify-content:flex-end">
      <button type="button" class="btn btn-outline btn-sm" data-close-modal>${t("cancel")}</button>
      <button type="submit" class="btn btn-primary btn-sm">${t("broadcast")}</button>
    </div>`;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await DB.push("notifications", {
      title: $("#nTitle", form).value.trim(),
      body: $("#nBody", form).value.trim(),
      target: $("#nTarget", form).value,
      date: Date.now(),
    });
    closeModal();
    toast(t("notif_sent"));
  });
  openModal(t("broadcast"), form);
  $$("[data-close-modal]", form).forEach((b) => b.addEventListener("click", closeModal));
}

/* ------------------------------------------------------------------ *
 * 12. ANNOUNCEMENT PUBLISHER (Media / Admin)
 * ------------------------------------------------------------------ */
function fileToDataURL(file) {
  return new Promise((res) => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(file); });
}
async function uploadImage(file) {
  const key = window.IMGBB_API_KEY;
  if (!key || String(key).includes("YOUR_")) return fileToDataURL(file); // offline fallback
  try {
    const fd = new FormData(); fd.append("image", file);
    const res = await fetch("https://api.imgbb.com/1/upload?key=" + key, { method: "POST", body: fd });
    const j = await res.json();
    return j?.data?.url || (await fileToDataURL(file));
  } catch { return fileToDataURL(file); }
}

function openPublish() {
  const form = el("form", "form");
  form.innerHTML = `
    <label class="field"><span>${t("title")}</span><input type="text" id="pTitle" required></label>
    <label class="field"><span>${t("body")}</span><textarea id="pBody" rows="3" required></textarea></label>
    <label class="field"><span>${t("image_upload")}</span><input type="file" id="pFile" accept="image/*"></label>
    <label class="field"><span>${t("or_paste_url")}</span><input type="url" id="pUrl" placeholder="https://…"></label>
    <div style="display:flex;gap:.6rem;justify-content:flex-end">
      <button type="button" class="btn btn-outline btn-sm" data-close-modal>${t("cancel")}</button>
      <button type="submit" class="btn btn-primary btn-sm">${t("post")}</button>
    </div>`;
  const fileInput = $("#pФile", form);
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let image = $("#pUrl", form).value.trim();
    if (!image && fileInput.files[0]) image = await uploadImage(fileInput.files[0]);
    await DB.push("announcements", {
      title: $("#pTitle", form).value.trim(),
      body: $("#pBody", form).value.trim(),
      image,
      author: session.name,
      date: Date.now(),
    });
    closeModal();
    toast(t("announce_posted"));
    renderAnnouncements();
  });
  openModal(t("publish"), form);
  $$("[data-close-modal]", form).forEach((b) => b.addEventListener("click", closeModal));
}

/* ------------------------------------------------------------------ *
 * 13. DEVELOPER PORTAL (role override)
 * ------------------------------------------------------------------ */
async function renderDeveloper() {
  const gate = $("#devGate");
  const content = $("#devContent");
  if (!session || session.role !== "developer") { gate.hidden = false; content.hidden = true; return; }
  gate.hidden = true; content.hidden = false;

  const users = asArray(await DB.get("users"));
  const rows = users.map((u) => `
    <tr>
      <td>${esc(u.name)}</td>
      <td><code>${esc(u.username)}</code></td>
      <td><span class="pill">${t(u.role)}</span></td>
      <td>
        <select data-role-for="${u.id}">
          ${ROLES.map((r) => `<option value="${r}" ${r === u.role ? "selected" : ""}>${t(r)}</option>`).join("")}
        </select>
      </td>
      <td><button class="btn btn-primary btn-sm" data-save-role="${u.id}">${t("update")}</button></td>
    </tr>`).join("");

  content.innerHTML = `
    <div class="table-wrap">
      <table class="data">
        <thead><tr><th>${t("name")}</th><th>${t("username")}</th><th>${t("role")}</th><th>${t("change_role")}</th><th></th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;

  $$("[data-save-role]", content).forEach((b) =>
    b.addEventListener("click", async () => {
      const id = b.dataset.saveRole;
      const role = $(`[data-role-for="${id}"]`, content).value;
      await DB.update("users/" + id, { role });
      if (session.id === id) { session.role = role; refreshAuthUI(); }
      toast(t("role_updated"));
      renderDeveloper();
    })
  );
}

/* ------------------------------------------------------------------ *
 * 14. RE-RENDER DYNAMIC (on language change)
 * ------------------------------------------------------------------ */
function rerenderDynamic() {
  refreshAuthUI();
  renderAnnouncements();
  const active = $(".view.active")?.id;
  if (active === "grades") renderGrades();
  if (active === "teachers") renderTeachers();
  if (active === "developer") renderDeveloper();
}

/* ------------------------------------------------------------------ *
 * 15. FORM VALIDATION HELPERS
 * ------------------------------------------------------------------ */
function setError(field, msg) {
  const f = field.closest(".field");
  if (f) f.classList.toggle("invalid", !!msg);
  const em = f?.querySelector(".err");
  if (em) em.textContent = msg || "";
}
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/* ------------------------------------------------------------------ *
 * 16. EVENT WIRING
 * ------------------------------------------------------------------ */
function wireEvents() {
  // Navigation (data-nav)
  $$("[data-nav]").forEach((a) =>
    a.addEventListener("click", (e) => { e.preventDefault(); navigate(a.dataset.nav); })
  );
  // scroll-to portal
  $$("[data-scroll]").forEach((b) =>
    b.addEventListener("click", () => {
      navigate("home");
      document.getElementById(b.dataset.scroll)?.scrollIntoView({ behavior: "smooth", block: "center" });
    })
  );

  // Hamburger
  $("#hamburger").addEventListener("click", () => {
    const open = $("#mainNav").classList.toggle("open");
    $("#navBackdrop").classList.toggle("show", open);
    $("#hamburger").setAttribute("aria-expanded", String(open));
  });
  $("#navBackdrop").addEventListener("click", closeMobileNav);

  // Dropdowns
  const wireDropdown = (id) => {
    const dd = $("#" + id);
    const btn = dd.querySelector(".tool-btn");
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      $$(".dropdown.open").forEach((d) => d !== dd && d.classList.remove("open"));
      dd.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(dd.classList.contains("open")));
    });
  };
  wireDropdown("langDropdown");
  wireDropdown("themeDropdown");
  document.addEventListener("click", () => $$(".dropdown.open").forEach((d) => d.classList.remove("open")));

  // Language pick
  $$("[data-lang]").forEach((b) =>
    b.addEventListener("click", () => { setLang(b.dataset.lang); })
  );
  // Theme pick
  $$("[data-theme-pick]").forEach((b) =>
    b.addEventListener("click", () => { setTheme(b.dataset.themePick); })
  );

  // Password toggles
  $$("[data-toggle-pw]").forEach((b) =>
    b.addEventListener("click", () => {
      const inp = document.getElementById(b.dataset.togglePw);
      const show = inp.type === "password";
      inp.type = show ? "text" : "password";
      b.querySelector("i").className = show ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
    })
  );

  // Login triggers
  $("#loginTriggerBtn").addEventListener("click", () => {
    navigate("home");
    $("#portal").scrollIntoView({ behavior: "smooth", block: "center" });
    $("#loginUser").focus();
  });
  $("#gateLoginBtn").addEventListener("click", () => {
    navigate("home");
    $("#portal").scrollIntoView({ behavior: "smooth", block: "center" });
  });

  // Login form
  $("#loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const uField = $("#loginUser"), pField = $("#loginPass");
    let ok = true;
    if (!uField.value.trim()) { setError(uField, t("fill_all")); ok = false; } else setError(uField, "");
    if (!pField.value) { setError(pField, t("fill_all")); ok = false; } else setError(pField, "");
    if (!ok) return;

    const msg = $("#loginMsg");
    const success = await login(uField.value, pField.value);
    if (!success) { msg.className = "form-msg bad"; msg.textContent = t("login_fail"); return; }
    msg.className = "form-msg ok"; msg.textContent = t("login_success");
    e.target.reset();
    refreshAuthUI();
    toast(t("login_success"));
    navigate("grades");
  });

  // Logout
  $("#logoutBtn").addEventListener("click", () => {
    logout(); refreshAuthUI(); toast(t("logout_done")); navigate("home");
  });

  // Announcement publish
  $("#newAnnounceBtn").addEventListener("click", openPublish);

  // Contact form
  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const n = $("#cName"), em = $("#cEmail"), ms = $("#cMsg");
    let ok = true;
    if (!n.value.trim()) { setError(n, t("fill_all")); ok = false; } else setError(n, "");
    if (!isEmail(em.value.trim())) { setError(em, t("invalid_email")); ok = false; } else setError(em, "");
    if (!ms.value.trim()) { setError(ms, t("fill_all")); ok = false; } else setError(ms, "");
    const out = $("#contactMsg");
    if (!ok) { out.className = "form-msg bad"; out.textContent = t("fill_all"); return; }
    out.className = "form-msg ok"; out.textContent = t("msg_sent");
    e.target.reset();
    toast(t("msg_sent"));
  });

  // Modal close
  $$("[data-close-modal]").forEach((b) => b.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
}

/* ------------------------------------------------------------------ *
 * 17. INIT
 * ------------------------------------------------------------------ */
async function init() {
  // theme + lang
  setTheme(localStorage.getItem("hval_theme") || "logo");
  applyLang();

  await seedIfEmpty();
  await restoreSession();

  wireEvents();
  refreshAuthUI();
  await renderAnnouncements();

  $("#year").textContent = new Date().getFullYear();

  if (!USE_FIREBASE) console.log("[v0] " + DICT.en.offline_mode);

  // hide splash
  setTimeout(() => $("#splash").classList.add("hide"), 700);
}

document.addEventListener("DOMContentLoaded", init);

/* ------------------------------------------------------------------ *
 * 18. PWA — service worker registration
 * ------------------------------------------------------------------ */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch((err) =>
      console.log("[v0] SW registration failed:", err.message)
    );
  });
}
// 1. آلة صنع كلمة المرور العشوائية
function makeRandomPassword() {
  const lettersAndNumbers = "abcdefghijklmnopqrstuvwxyz1234567890";
  let result = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * lettersAndNumbers.length);
    result += lettersAndNumbers.charAt(randomIndex);
  }
  return result;
}

// 2. آلة توليد الـ 800 طالب ورفعهم إلى فايربيس
async function startGeneratingStudents() {
  const allStudents = {};
  const printList = [];
  const classes = ["Grade 10", "Grade 11", "Grade 12"];

  for (let i = 1; i <= 800; i++) {
    // تحويل الرقم 1 إلى 001، والرقم 50 إلى 050 ليكون الشكل مرتباً
    const serial = String(i).padStart(3, '0'); 
    const username = `hval26_${serial}`; // اسم المستخدم مثل: hval26_001
    const password = makeRandomPassword();  // كلمة مرور عشوائية
    const studentId = `std_${username}`;
    
    // اختيار صف عشوائي لتوزيعهم مبدئياً
    const randomClass = classes[Math.floor(Math.random() * classes.length)];

    // تجهيز الصندوق الخاص بالطالب بحسب نظام مشروعك
    allStudents[studentId] = {
      id: studentId,
      username: username,
      password: password,
      name: `Student ${serial}`,
      role: "student",
      class: randomClass,
      grades: { kurdish: 0, arabic: 0, english: 0, mathematics: 0, physics: 0, chemistry: 0, biology: 0, history: 0, geography: 0, islamic: 0 }
    };

    // تجهيز السطر لطباعته لاحقاً في الإكسل
    printList.push(`${username},${password},${randomClass}`);
  }

  // إرسال كل الصناديق دفعة واحدة إلى خزانة فايربيس فوق السحاب
  if (typeof firebase !== "undefined" && firebase.apps.length > 0) {
    await firebase.database().ref("users").update(allStudents);
    console.log("✅ تم رفع 800 طالب بنجاح إلى فايربيس!");
    
    // طباعة القائمة لكي تنسخها وتضعها في إكسل
    console.log("--- انسخ البيانات بالأسفل وضعها في ملف Excel ---");
    console.log("Username,Password,Class");
    printList.forEach(line => console.log(line));
  } else {
    console.log("❌ خطأ: فايربيس غير متصل، تأكد من ملف الإعدادات!");
  }
}
/* ================================================================== *
 * نظام معالجة الصلاحيات الفوري والنهائي (إصلاح التداخل المباشر)
 * ================================================================== */

window.HVAL_USERS_LIST = {
  "diar_math": { name: "المدير: ديار سرحان", role: "admin", subject: "mathematics" }, 
  "bilind_sports": { name: "المعاون: بلند فرحان", role: "teacher", subject: "sports" }, 
  "mehvan_comp": { name: "المعاون: مهفان قاسم", role: "teacher", subject: "computer" }, 
  "math_t1": { name: "معلم الرياضيات (أ)", role: "teacher", subject: "mathematics" },
  "math_t2": { name: "معلم الرياضيات (ب)", role: "teacher", subject: "mathematics" },
  "math_t3": { name: "معلم الرياضيات (ج)", role: "teacher", subject: "mathematics" },
  "kurdish_t1": { name: "معلم الكردية 1", role: "teacher", subject: "kurdish" },
  "kurdish_t2": { name: "معلم الكردية 2", role: "teacher", subject: "kurdish" },
  "english_t1": { name: "معلم الإنكليزي 1", role: "teacher", subject: "english" },
  "english_t2": { name: "معلم الإنكليزي 2", role: "teacher", subject: "english" },
  "arabic_t1": { name: "معلم العربية 1", role: "teacher", subject: "arabic" },
  "arabic_t2": { name: "معلم العربية 2", role: "teacher", subject: "arabic" },
  "chemistry_t1": { name: "معلم الكيمياء 1", role: "teacher", subject: "chemistry" },
  "chemistry_t2": { name: "معلم الكيمياء 2", role: "teacher", subject: "chemistry" },
  "physics_t1": { name: "معلم الفيزياء 1", role: "teacher", subject: "physics" },
  "physics_t2": { name: "معلم الفيزياء 2", role: "teacher", subject: "physics" },
  "biology_t1": { name: "معلم الأحياء 1", role: "teacher", subject: "biology" },
  "biology_t2": { name: "معلم الأحياء 2", role: "teacher", subject: "biology" },
  "art_t1": { name: "معلم الفنية", role: "teacher", subject: "art" },
  "genocide_t1": { name: "معلم الجينوسايد", role: "teacher", subject: "genocide" }
};

// فحص فوري ومستمر للمدخلات بمجرد أن يكتب المستخدم
document.addEventListener("DOMContentLoaded", () => {
  // تتبع دوري كل نصف ثانية للقبض على الواجهة دون إحداث بطء
  setInterval(() => {
    const userInput = document.getElementById("username");
    const passInput = document.getElementById("password");
    const loginBtn = document.getElementById("loginBtn");

    if (userInput && passInput && loginBtn && !loginBtn.dataset.secured) {
      loginBtn.dataset.secured = "true";

      // نضع مستمع حدث عند النقر بالماوس (Click) وليس Submit، ليكون أسرع من أي دالة أخرى
      loginBtn.addEventListener("click", function(e) {
        const u = userInput.value.trim();
        const p = passInput.value.trim();

        if (window.HVAL_USERS_LIST[u]) {
          // إيقاف إجباري وفوري لكافة الأحداث والدوال المربوطة بالزر بالأسفل
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();

          if (p === "hval2026") {
            const user = window.HVAL_USERS_LIST[u];
            alert(`خێرهاتی أهلاً بك: ${user.name}`);

            // حفظ الجلسة محلياً ليتعرف عليه النظام
            sessionStorage.setItem("currentUser", JSON.stringify(user));

            // إخفاء شاشة تسجيل الدخول
            const portal = document.getElementById("portal") || document.getElementById("home");
            if (portal) portal.style.display = "none";

            // التوجيه بناءً على الصلاحية لقفل المواد
            if (user.role === "admin") {
              const adminView = document.getElementById("admin-panel") || document.getElementById("grades");
              if (adminView) adminView.style.display = "block";
              
              const sel = document.querySelector("#subjectSelect") || document.querySelector("select[name='subject']");
              if (sel) sel.value = user.subject;
            } else {
              const teachView = document.getElementById("teacher-panel") || document.getElementById("grades");
              if (teachView) teachView.style.display = "block";
              
              const sel = document.querySelector("#subjectSelect") || document.querySelector("select[name='subject']");
              if (sel) {
                sel.value = user.subject;
                sel.disabled = true; // قفل القائمة تماماً للمعلم
              }
            }

            // تشغيل دوال التحديث المدمجة في مشروعك الأصلي لتعبئة الجدول فوراً
            if (typeof filterStudentsBySubject === "function") filterStudentsBySubject();
            if (typeof renderTeacherTable === "function") renderTeacherTable();
            if (typeof updateDashboard === "function") updateDashboard();
            
          } else {
            alert("كلمة المرور غير صحيحة!");
          }
        }
      }, { capture: true }); // أولوية التنفيذ القصوى
    }
  }, 500);
});