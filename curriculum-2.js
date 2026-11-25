/* Curriculum part 2: arrays & strings, functions, pointers, structs, OOP, STL, capstone */
var CURRICULUM = window.CURRICULUM || [];
CURRICULUM.push(
{
  id: 'arrays',
  nav: 'Arrays و Strings',
  title: 'الـ Arrays والـ Strings',
  subtitle: 'خزن قوايم في متغير واحد، وافهم ليه العد بيبدأ من صفر',
  blocks: [
    { type: 'p', text: 'تخيل عندك درجات 30 طالب. هتعمل `grade1` و `grade2` لحد `grade30`؟ أكيد لأ. الـ array بتخزن قايمة قيم من نفس النوع في متغير واحد، وتوصل لأي عنصر فيها برقمه (الـ index).' },
    { type: 'code', code: `int nums[6] = {4, 8, 15, 16, 23, 42};

cout << nums[0] << endl;   // 4: أول عنصر
cout << nums[5] << endl;   // 42: آخر عنصر
nums[2] = 100;             // تعديل العنصر التالت` },
    { type: 'note', warn: true, text: 'العد بيبدأ من صفر مش واحد: أول عنصر هو `nums[0]`، وآخر عنصر في array حجمها 6 هو `nums[5]`. لو كتبت `nums[6]` انت خارج حدود الـ array: C++ مش هتمنعك، بس القيمة اللي هتقراها زبالة، ودي من أخطر أغلاط C++ الصامتة (undefined behavior).' },
    { type: 'h', text: 'المرور على array بلوب' },
    { type: 'code', code: `#include <iostream>
using namespace std;

int main() {
    int nums[6] = {4, 8, 15, 16, 23, 42};
    int sum = 0;
    for (int i = 0; i < 6; i++) {
        sum += nums[i];
    }
    cout << "المجموع: " << sum << endl;
    cout << "المتوسط: " << sum / 6 << endl;
    return 0;
}` },
    { type: 'code', code: `# الناتج:
المجموع: 108
المتوسط: 18` },
    { type: 'p', text: 'اللوب بتلف بالـ index من 0 لحد الحجم ناقص واحد، وكل لفة بتقرأ عنصر. شفت نمط التراكم تاني؟ هو هو بتاع الدرس اللي فات، بس المرات دي فوق array.' },
    { type: 'h', text: 'string: array من الحروف بس أذكى' },
    { type: 'p', text: 'الـ `string` جواها حروف متترتبة زي الـ array، بس عليها وظايف جاهزة كتير. توصل لأي حرف بقوسين مربعين، وتجمع نصوص بعلامة +، وتعرف طولها بـ size():' },
    { type: 'code', code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string first = "Ahmed";
    string last = "Wael";
    string full = first + " " + last;
    cout << full << endl;      // Ahmed Wael
    cout << full.size() << endl;  // 10
    cout << full[0] << endl;      // A
    return 0;
}` },
    { type: 'p', text: '`full.size()` رجعت 10: خمسة حروف Ahmed + مسافة + أربعة حروف Wael. و`full[0]` جابت أول حرف: A. زي الـ array بالظبط، العد من صفر.' },
    { type: 'note', text: 'ليه العد من صفر أصلاً؟ لأن الـ index بيمثل البعد عن بداية الـ array في الذاكرة: العنصر الأول بعيد صفر خطوة عن البداية. السبب ده هيبان أوضح لما نوصل للـ pointers في درس قريب.' },
    { type: 'h', text: 'حدود الـ array التقليدية' },
    { type: 'list', items: [
      'حجمها ثابت: int nums[6] ماتكبرش بعد ما اتعملت. عايز قايمة بتكبر؟ دي vector في درس الـ STL.',
      'مش بتراقب الحدود: مفيش تحذير لو عديت الآخر.',
      'عشان كده في الشغل الحقيقي، أغلب الناس بتستخدم vector بدل الـ array الخام. بس لازم تفهم الـ array الأول لأنها الأساس اللي vector مبنية عليه.'
    ] }
  ],
  quiz: [
    { q: 'في `int nums[6]`، إيه الـ index بتاع أول عنصر؟', options: [
      { text: '1' },
      { text: '0' },
      { text: '6' }
    ], answer: 1, explain: 'العد في C++ بيبدأ من صفر: nums[0] هو الأول، وnums[5] هو الأخير.' },
    { q: 'كتبت `cout << nums[6]` على array حجمها 6. إيه اللي هيحصل؟', options: [
      { text: 'خطأ ترجمة واضح هيمنع البرنامج من إنه يتشغل أصلاً ويعرض الخطأ' },
      { text: 'البرنامج هيقرا قيمة من خارج الـ array (سلوك غير معرف) من غير تحذير' },
      { text: 'هيطبع آخر عنصر عادي في الـ array لأن C++ بتحمي الحدود تلقائياً' }
    ], answer: 1, explain: 'C++ مش بتراقب حدود الـ array: بتقرا من ذاكرة مش بتاعتك والنتيجة زبالة أو crash. آخر index صحيح هو الحجم ناقص واحد.' },
    { q: 'لو `string s = "C++";` وبعدين `s += "17";`، إيه ناتج `cout << s << endl << s.size();`؟', options: [
      { text: 'C++17 وبعدين 5' },
      { text: 'C++17 وبعدين 3' },
      { text: 'خطأ: ممنوع تجمع string' }
    ], answer: 0, explain: 'علامة + بتجمع النصوص: C++ مع 17 تديك C++17، وطولها 5 حروف. متعودش على دي من لغات تانية: الجمع هنا نصي فعلاً.' }
  ],
  exercises: [
    { task: 'اعمل array فيها 6 أرقام واحسب مجموعهم ومتوسطهم', code: `#include <iostream>
using namespace std;

int main() {
    int nums[6] = {4, 8, 15, 16, 23, 42};
    int sum = 0;
    for (int i = 0; i < 6; i++) {
        sum += nums[i];
    }
    cout << "المجموع: " << sum << endl;
    cout << "المتوسط: " << sum / 6 << endl;
    return 0;
}`, why: 'الناتج: المجموع 108 والمتوسط 18. نمط التراكم فوق array: اللوب بيجيب العناصر واحد واحد والمتغير بيجمع.' },
    { task: 'اكتب برنامج يعكس كلمة: يقرأ string ويطبعها بالمقلوب', code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string word = "hello";
    string rev = "";
    for (int i = word.size() - 1; i >= 0; i--) {
        rev += word[i];
    }
    cout << rev << endl;
    return 0;
}

// الناتج: olleh`, why: 'اللوب ماشية بالظهر: من آخر index (size ناقص واحد) لحد صفر. جربها في المعمل: string و for و cout كلهم مدعومين.' }
  ]
},
{
  id: 'functions',
  nav: 'الـ Functions',
  title: 'الـ Functions: قسّم الكود لقطع ليها اسم',
  subtitle: 'التصريح والتعريف، المعاملات والقيمة الراجعة، ونطاق المتغيرات',
  blocks: [
    { type: 'p', text: 'لحد دلوقتي كل كودنا جوه `main`. تخيل برنامج فيه 5000 سطر كده: مستحيل تقرا فيه أو تلاقي غلطة. الـ function بتاخد قطعة كود ليها مهمة واحدة وتديلها اسم، وبعدها تندهها من أي حتة مليون مرة.' },
    { type: 'code', code: `#include <iostream>
using namespace std;

int add(int a, int b) {
    return a + b;
}

int biggest(int a, int b) {
    if (a > b) return a;
    return b;
}

int main() {
    cout << add(3, 4) << endl;      // 7
    cout << biggest(9, 4) << endl;  // 9
    return 0;
}` },
    { type: 'h', text: 'تشريح الـ function' },
    { type: 'list', items: [
      'نوع الراجع (return type): int في add يعني الـ function بترجع عدد صحيح. لو مش بترجع حاجة نكتب void.',
      'الاسم: add, بنده الـ function بيه.',
      'المعاملات (parameters): (int a, int b), المتغيرات اللي بتستقبل القيم اللي تبعتها.',
      'الجسم: الكود بين القوسين المعقوصين.',
      'return: بترجع النتيجة وتقفل الـ function فوراً. أي كود بعد return مش بيتنفذ.'
    ] },
    { type: 'h', text: 'ليه فوق main؟' },
    { type: 'p', text: 'الـ compiler بيقرأ الملف من فوق لتحت، فلازم يعرف الـ function قبل ما تتنده. الحل الشائع: عرّف الـ functions فوق `main` زي المثال. في المشاريع الكبيرة بنكتب declaration (الترويسة بس) فوق والتعريف الكامل تحت أو في ملف تاني.' },
    { type: 'h', text: 'void: function مش بترجع حاجة' },
    { type: 'code', code: `void greet(string name) {
    cout << "أهلاً يا " << name << "!" << endl;
}

// في main:
greet("Ahmed");   // الناتج: أهلاً يا Ahmed!` },
    { type: 'h', text: 'نطاق المتغيرات (Scope)' },
    { type: 'code', code: `int main() {
    int x = 5;
    if (true) {
        int x = 10;   // متغير جديد مختلف، بيغطي على اللي بره
        cout << x << endl;   // 10
    }
    cout << x << endl;       // 5
    return 0;
}` },
    { type: 'p', text: 'أي متغير بيعيش جوه القوسين المعقوصين اللي اتعرف فيهم بس. متغير جوه function مش شايفاه بره، والعكس. لو عرفت متغير بنفس الاسم جوه بلوك أصغر، الجديد بيغطي على القديم لحد ما البلوك تخلص.' },
    { type: 'h', text: 'القيم بتتبعت نسخة (Pass by Value)' },
    { type: 'code', code: `void tryChange(int x) {
    x = 99;
}

int main() {
    int n = 5;
    tryChange(n);
    cout << n << endl;   // 5 مش 99!
    return 0;
}` },
    { type: 'p', text: 'لما تبعت متغير لـ function، C++ بتبعت **نسخة** منه. الـ function غيرت النسخة، والأصل `n` فضل 5. ده السلوك الافتراضي واسمه pass by value. عايز الـ function تعدل الأصل بجد؟ دي حكاية الـ references والـ pointers، وده درسنا الجاي بالظبط.' }
  ],
  quiz: [
    { q: 'function مش بترجع أي قيمة. إيه نوع الراجع الصح؟', options: [
      { text: 'int', mono: true },
      { text: 'void', mono: true },
      { text: 'return', mono: true }
    ], answer: 1, explain: 'void معناها "فاضي": الـ function بتنفذ شغل (زي الطباعة) من غير ما ترجع نتيجة.' },
    { q: 'إيه ناتج `cout << add(3, 4);` لو add بتجمع رقمين؟', options: [
      { text: 'add(3, 4)', mono: true },
      { text: '34' },
      { text: '7' }
    ], answer: 2, explain: 'الـ function بتتنفذ الأول ونتيجتها (3+4=7) هي اللي بتتطبع. النداء بيتستبدل بالقيمة الراجعة.' },
    { q: 'بعت متغير لـ function والـ function غيرت قيمته. ليه الأصل ماتغيرش؟', options: [
      { text: 'لأن C++ بتبعت نسخة من القيمة مش المتغير نفسه' },
      { text: 'لأن الـ compiler فيه bug بيمنع تعديل القيمة الأصلية وقت التنفيذ' },
      { text: 'لأن المتغير لازم يتعرف const عشان الـ function تقدر تقرأه بس' }
    ], answer: 0, explain: 'pass by value: الـ function بتاخد نسخة وتلعب فيها براحتها. عشان تعدل الأصل محتاج reference (&) أو pointer، وده موضوع الدرس الجاي.' }
  ],
  exercises: [
    { task: 'اكتب function اسمها `isPrime` بتاخد int وترجع bool: هل الرقم أولي؟ وجربها على 7 و 8', code: `#include <iostream>
using namespace std;

bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i < n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    cout << isPrime(7) << endl;   // 1 (يعني true)
    cout << isPrime(8) << endl;   // 0 (يعني false)
    return 0;
}`, why: 'الناتج 1 و 0 لأن bool بتتطبع أرقام. الفكرة: لو لقيت أي قاسم بين 2 و n-1 اطلع false فوراً، لو اللوب خلصت من غير ولا قاسم يبقى أولي.' },
    { task: 'حوّل كود المضروب من تمرين اللوبات لـ function اسمها `factorial` بتاخد n وترجع الناتج', code: `#include <iostream>
using namespace std;

int factorial(int n) {
    int result = 1;
    for (int i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

int main() {
    cout << factorial(5) << endl;   // 120
    return 0;
}`, why: 'نفس لوجيك التمرين القديم، بس دلوقتي متغلف في function تقدم تندهها بأي رقم: factorial(5) تديك 120، factorial(3) تديك 6.' }
  ]
},
{
  id: 'pointers',
  nav: 'الـ Pointers بالحدس',
  title: 'الـ Pointers بالحدس: عناوين الذاكرة',
  subtitle: '& بتجيب العنوان و * بتفتحه: من غير وجع دماغ',
  blocks: [
    { type: 'p', text: 'الـ pointers أشهر حاجة بتخوف الطلبة من C++. الحقيقة إن الفكرة بسيطة جداً لو اتفهمت بالحدس: الذاكرة زي شارع طويل مليان بيوت مرقمة. كل متغير بيتخزن في "بيت" له عنوان. الـ pointer هو متغير بيخزن **عنوان** بيت تاني، مش قيمة عادية.' },
    { type: 'code', code: `int x = 5;
int* p = &x;   // p بيخزن عنوان x في الذاكرة

cout << x << endl;    // 5: القيمة
cout << p << endl;    // عنوان زي 0x7ffc1a2b3c4d (بيختلف كل تشغيلة)
cout << *p << endl;   // 5: القيمة اللي في العنوان ده` },
    { type: 'p', text: 'علامتين بس هما اللي محتاجين تثبتوا في دماغك: `&` قبل المتغير بتجيب **عنوانه**، و`*` قبل الـ pointer بتفتح العنوان وتجيب **المحتوى** (أو تغيره). لما نقول `int* p` معناها: p مؤشر على متغير من نوع int.' },
    { type: 'h', text: 'التعديل من خلال الـ pointer' },
    { type: 'code', code: `#include <iostream>
using namespace std;

int main() {
    int x = 5;
    int* p = &x;
    cout << x << endl;   // 5
    *p = 10;             // عدل محتوى العنوان
    cout << x << endl;   // 10: x نفسها اتغيرت!
    return 0;
}` },
    { type: 'p', text: 'لما كتبنا `*p = 10` احنا مش غيرنا الـ pointer، احنا رحنا للعنوان اللي هو شاور عليه وغيرنا اللي جواه. وعشان العنوان ده هو بيت `x` نفسه، قيمة `x` اتغيرت. دي أقوى فكرة في الدرس: الـ pointer بيديك وصول مباشر لبيت تاني في الذاكرة.' },
    { type: 'h', text: 'ليه كل ده مهم؟' },
    { type: 'list', items: [
      'الـ arrays جوه الجوه pointers: اسم الـ array بيمثل عنوان أول عنصر، وده سر العد من صفر.',
      'تعديل المتغيرات جوه functions: بدل pass by value اللي بتبعت نسخة.',
      'الذاكرة الديناميكية: متغيرات بتتعمل وقت التشغيل بـ new ومكانها مش ثابت.',
      'هياكل البيانات المتقدمة: linked lists و trees مبنية كلها على pointers.',
      'الأداء: بدل ما تنسخ بيانات ضخمة، تبعت عنوانها بس.'
    ] },
    { type: 'h', text: 'references: الأخ الألطف' },
    { type: 'code', code: `void addOne(int& x) {   // & بعد النوع: x مرجع للأصل مش نسخة
    x++;
}

int main() {
    int n = 5;
    addOne(n);
    cout << n << endl;   // 6: الأصل اتغير فعلاً
    return 0;
}` },
    { type: 'p', text: 'الـ reference (العلامة `&` بعد النوع) بيخلي المعامل اسم تاني لنفس المتغير الأصلي: مفيش نسخة، أي تعديل بيروح للأصل على طول. في الشغل اليومي هتستخدم references كتير أوي زي دي، ونادراً هتحتاج pointers خام. المشروع الختامي فيه references في كل function.' },
    { type: 'h', text: 'تطبيق كلاسيكي: swap' },
    { type: 'code', code: `void swapNums(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 3, y = 8;
    swapNums(x, y);
    cout << x << " " << y << endl;   // 8 3
    return 0;
}` },
    { type: 'note', warn: true, text: 'قواعد أمان للمبتدئ: متفتحش عنوان فاضي (`*p` على pointer قيمته `nullptr` بتبوظ البرنامج)، ومتستخدمش pointer لمتغير اتمسح. لو لزوم pointer فاضي، خليه `nullptr` وافحصه قبل الاستخدام.' }
  ],
  quiz: [
    { q: 'إيه وظيفة العلامة `&` في السطر `int* p = &x;`؟', options: [
      { text: 'بتجيب عنوان المتغير x في الذاكرة' },
      { text: 'بتجيب قيمة x نفسها وتحطها في المؤشر p بدل العنوان' },
      { text: 'بتعمل نسخة جديدة من x في الذاكرة وتحط عنوانها في p' }
    ], answer: 0, explain: '&x معناها "عنوان x". الـ pointer p بيخزن العنوان ده، و*p بعدها بيفتحه.' },
    { q: 'لو `int x = 5; int* p = &x; *p = 10;` إيه قيمة x دلوقتي؟', options: [
      { text: '5' },
      { text: '10' },
      { text: 'عنوان في الذاكرة' }
    ], answer: 1, explain: '*p = 10 بتغير محتوى العنوان اللي p شاور عليه، والعنوان ده هو بيت x نفسه. فـ x بقت 10.' },
    { q: 'إيه فايدة الـ reference (`int&`) في معاملات الـ function؟', options: [
      { text: 'بيخلي الـ function تعدل المتغير الأصلي بدل نسخة منه' },
      { text: 'بيخلي الكود أسرع في الترجمة بس ومبيغيرش سلوك البرنامج' },
      { text: 'بيمسح المتغير بعد الاستخدام عشان يوفر الذاكرة تلقائياً' }
    ], answer: 0, explain: 'بدون &: pass by value والـ function بتاخد نسخة. مع &: المعامل اسم تاني للأصل نفسه، فالتعديل بيظهر بره. زي swapNums بالظبط.' }
  ],
  exercises: [
    { task: 'من غير ما تشغل الكود، توقع ناتج كل سطر: `int a = 3; int* p = &a; *p = *p + 4; cout << a;` وبعدين شغله في المعمل أو على جهازك وتأكد', code: `#include <iostream>
using namespace std;

int main() {
    int a = 3;
    int* p = &a;
    *p = *p + 4;   // اقرأ a (3)، جمع 4، اكتبها في a
    cout << a << endl;   // 7
    return 0;
}

// الناتج: 7`, why: '*p في اليمين بتقرأ قيمة a الحالية (3)، والجمع يديك 7، و*p في الشمال بتكتبها مكان a. سطر واحد فيه قراءة وكتابة من خلال الـ pointer.' },
    { task: 'اكتب function `swapNums` بتبدل قيمتين باستخدام references وجربها على 3 و 8', code: `#include <iostream>
using namespace std;

void swapNums(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 3, y = 8;
    swapNums(x, y);
    cout << x << " " << y << endl;   // 8 3
    return 0;
}`, why: 'الناتج: 8 3. جرب تشيل & من المعاملات: هتلاقي x و y فضلوا 3 و 8، لأن الـ function بدلت نسختين مش الأصل. دي أقوى تجربة تثبتلك فكرة المرجع.' }
  ]
},
{
  id: 'structs',
  nav: 'الـ Structs',
  title: 'الـ Structs: اصنع نوع بيانات بتاعك',
  subtitle: 'اجمع بيانات مترابطة في كيان واحد: طالب، كتاب، نقطة',
  blocks: [
    { type: 'p', text: 'الطالب عنده اسم وسن ومجموع. تخزنهم في 3 متغيرات منفصلة؟ لو عندك 30 طالب هيبقى عندك 90 متغير ولخبطة كاملة. الـ `struct` بتخلينا نصنع نوع بيانات جديد من عندنا: كيان واحد اسمه Student فيه كل الحقول دي مع بعض.' },
    { type: 'code', code: `#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int age;
    double gpa;
};

int main() {
    Student s1;
    s1.name = "Ahmed";
    s1.age = 20;
    s1.gpa = 3.85;

    cout << s1.name << " عنده " << s1.age << " سنة ومجموعه " << s1.gpa << endl;
    return 0;
}` },
    { type: 'code', code: `# الناتج:
Ahmed عنده 20 سنة ومجموعه 3.85` },
    { type: 'p', text: 'الـ struct بتتعرف بره main (عادة فوق)، وبعدها `Student` بقى نوع زي `int` بالظبط: تعمل منه متغيرات براحتك. الوصول لأي حقل بالنقطة: `s1.name` و `s1.gpa`.' },
    { type: 'h', text: 'قايمة من structs' },
    { type: 'code', code: `Student group[3];
group[0] = {"Ahmed", 20, 3.85};
group[1] = {"Mona", 21, 3.92};
group[2] = {"Omar", 19, 2.70};

for (int i = 0; i < 3; i++) {
    cout << group[i].name << ": " << group[i].gpa << endl;
}` },
    { type: 'p', text: 'لاحظ الاختصار الجميل: `{"Ahmed", 20, 3.85}` بيعبي الحقول بالترتيب في سطر واحد. وarray من structs معناها: قايمة طلاب كاملة في متغير واحد.' },
    { type: 'h', text: 'ابعت الـ struct لـ function' },
    { type: 'code', code: `#include <iostream>
#include <cmath>
using namespace std;

struct Point {
    double x;
    double y;
};

double distance(Point a, Point b) {
    return sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}

int main() {
    Point p1 = {0, 0};
    Point p2 = {3, 4};
    cout << distance(p1, p2) << endl;   // 5
    return 0;
}` },
    { type: 'p', text: 'المثال ده بيحسب المسافة بين نقطتين بقاعدة فيثاغورس (√(فرق السينات² + فرق الصادات²)): من (0,0) لـ (3,4) تطلع 5 بالظبط. لاحظ إن `sqrt` جاية من مكتبة `cmath`. الـ struct خلت الـ function تاخد "نقطة" واحدة بدل 4 متغيرات مبعثرين.' },
    { type: 'note', text: 'struct ولا class؟ في C++ الاتنين توائم: الفرق الوحيد إن struct افتراضياً حقولها public و class افتراضياً private. القاعدة الشائعة: struct لمجموعة بيانات بسيطة زي دي، و class لما يبقى فيه سلوك ومنطق محتاج حماية. ده موضوع الدرس الجاي.' }
  ],
  quiz: [
    { q: 'عندك `Student s1;` وعايز توصل لاسم الطالب. إيه الصح؟', options: [
      { text: 's1->name', mono: true },
      { text: 's1.name', mono: true },
      { text: 'Student.name', mono: true }
    ], answer: 1, explain: 'الوصول للحقول بالنقطة: s1.name. السهم -> بيستخدم مع pointers، و Student.name غلط لأن Student هو النوع مش المتغير.' },
    { q: 'إيه الفرق الأساسي بين array و struct؟', options: [
      { text: 'الـ array بتجمع عناصر من نفس النوع، والـ struct بتجمع حقول من أنواع مختلفة' },
      { text: 'مفيش فرق خالص، الاتنين بيجمعوا بيانات من أي نوع بنفس الطريقة' },
      { text: 'الـ struct أسرع من الـ array دايماً لأنه بيتخزن في مكان خاص بيه' }
    ], answer: 0, explain: 'int a[30] كلها ints زي بعض. Student فيه string و int و double جنب بعض تحت اسم واحد. دي القوة الحقيقية للـ struct.' },
    { q: 'نقطتين: (0,0) و (3,4). المسافة بينهم بقاعدة فيثاغورس؟', options: [
      { text: '7' },
      { text: '25' },
      { text: '5' }
    ], answer: 2, explain: '√(9+16) = √25 = 5. المثلث 3-4-5 أشهر مثلث قائم في الرياضيات.' }
  ],
  exercises: [
    { task: 'اعمل struct باسم `Book` فيها title و author و pages، واعمل منها كتاب واطبع بياناته', code: `#include <iostream>
#include <string>
using namespace std;

struct Book {
    string title;
    string author;
    int pages;
};

int main() {
    Book b = {"Clean Code", "Robert Martin", 464};
    cout << b.title << " - " << b.author << " (" << b.pages << " صفحة)" << endl;
    return 0;
}

// الناتج: Clean Code - Robert Martin (464 صفحة)`, why: 'لاحظ التعبئة المختصرة بقوسين معقوصين بالترتيب. الكتاب هنا كيان واحد فيه 3 معلومات، بدل 3 متغيرات منفصلة.' },
    { task: 'استخدم struct النقطة وfunction المسافة من الدرس عشان تحسب المسافة بين (0,0) و (3,4)', code: `#include <iostream>
#include <cmath>
using namespace std;

struct Point {
    double x;
    double y;
};

double distance(Point a, Point b) {
    return sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}

int main() {
    Point p1 = {0, 0};
    Point p2 = {3, 4};
    cout << distance(p1, p2) << endl;
    return 0;
}

// الناتج: 5`, why: 'الناتج 5 (مثلث 3-4-5 الشهير). غير p2 لـ {6, 8} مثلاً وتوقع الناتج قبل التشغيل: هتطلع 10.' }
  ]
},
{
  id: 'oop',
  nav: 'أساسيات OOP',
  title: 'أساسيات OOP: الـ Classes',
  subtitle: 'struct + functions + حماية = class: حساب بنكي كنموذج',
  blocks: [
    { type: 'p', text: 'الـ struct من الدرس اللي فات بتجمع بيانات بس. الحياة الحقيقية فيها كيانات ليها بيانات **وسلوك**: الحساب البنكي عنده رصيد (بيانات) وبيدعم إيداع وسحب (سلوك). الـ `class` بتجمع الاتنين في مكان واحد، ودي فكرة الـ Object-Oriented Programming (OOP).' },
    { type: 'code', code: `#include <iostream>
using namespace std;

class BankAccount {
private:
    double balance;   // محمي: ممنوع يتعدل بره الكلاس

public:
    BankAccount() {   // constructor: بينفذ لما الكائن يتعمل
        balance = 0;
    }
    void deposit(double amount) {
        balance += amount;
    }
    void withdraw(double amount) {
        if (amount <= balance) {
            balance -= amount;
        } else {
            cout << "رصيد مش كفاية!" << endl;
        }
    }
    double getBalance() {
        return balance;
    }
};` },
    { type: 'code', code: `int main() {
    BankAccount acc;
    acc.deposit(100);
    acc.withdraw(30);
    cout << acc.getBalance() << endl;   // 70
    acc.withdraw(500);                  // رصيد مش كفاية!
    return 0;
}` },
    { type: 'h', text: 'private و public: بوابة الكلاس' },
    { type: 'list', items: [
      'private: متاحة بس جوه الكلاس نفسه. balance هنا محمي: محدش يقدر يكتب acc.balance = -1000000 من بره.',
      'public: متاحة لأي حد. الإيداع والسحب والاستعلام بيحصل من خلالها بس.',
      'الـ constructor: function خاصة اسمها نفس اسم الكلاس، بتتنفذ أوتوماتيك لما الكائن يتعمل. مثالية للقيم الابتدائية.'
    ] },
    { type: 'p', text: 'الفكرة دي اسمها encapsulation (التغليف): البيانات متغلّفة جوه الكلاس، والعالم الخارجي بيتعامل معاها من خلال methods مضبوطة. الرصيد مستحيل يبقى سالب بالغلط، لأن الطريق الوحيد لتغييره بيفحص الأول.' },
    { type: 'h', text: 'constructor بمعاملات' },
    { type: 'code', code: `class Rectangle {
private:
    double width, height;
public:
    Rectangle(double w, double h) {
        width = w;
        height = h;
    }
    double area() {
        return width * height;
    }
};

int main() {
    Rectangle r(5, 3);
    cout << r.area() << endl;   // 15
    return 0;
}` },
    { type: 'h', text: 'struct vs class: الفرق الرسمي' },
    { type: 'p', text: 'في C++ الفرق الوحيد الحقيقي: حقول الـ struct الافتراضية `public`، وحقول الـ class الافتراضية `private`. غير كده الاتنين قادرين على نفس الحاجات. العرف: struct لتجميعة بيانات بسيطة، class لكيان له سلوك وقواعد حماية.' },
    { type: 'note', text: 'OOP أكبر من كده بكتير: فيه وراثة (inheritance) وتعدد أشكال (polymorphism) ومواضيع تقيلة. بس الأساس هو اللي شوفناه: كيان بيجمع بيانات وسلوك ويحمي نفسه. الباقي بناء على الفكرة دي، وهتاخده في الكورسات المتقدمة.' }
  ],
  quiz: [
    { q: 'إيه الوضع الافتراضي لحقول الـ class لو مكتبتش public ولا private؟', options: [
      { text: 'public' },
      { text: 'private' },
      { text: 'protected' }
    ], answer: 1, explain: 'في class كل حاجة private افتراضياً لحد ما تكتب public:. في struct العكس: كل حاجة public افتراضياً.' },
    { q: 'إيه اسم الـ constructor بتاع كلاس اسمه `Rectangle`؟', options: [
      { text: 'constructor', mono: true },
      { text: 'Rectangle', mono: true },
      { text: 'init', mono: true }
    ], answer: 1, explain: 'الـ constructor دايماً نفس اسم الكلاس بالظبط، ومش بيرجع أي نوع حتى void. بينفذ لحظة إنشاء الكائن.' },
    { q: 'ليه خلينا `balance` خاص (private) في حسابنا البنكي؟', options: [
      { text: 'عشان الكود يبقى أقصر وأسهل في القراءة من غير دوال زيادة' },
      { text: 'عشان محدش يقدر يغير الرصيد من بره من غير ما يعدي على قواعد الكلاس (زي منع السالب)' },
      { text: 'لأن double ممنوع تبقى public في أي كلاس بحسب قواعد اللغة' }
    ], answer: 1, explain: 'دي فكرة الـ encapsulation: البيانات محمية، والتعديل بيحصل بس من خلال methods بتفحص صحة العملية.' }
  ],
  exercises: [
    { task: 'اكتب class باسم `Rectangle` فيها constructor بياخد الطول والعرض وmethod `area` بترجع المساحة، واحسب مساحة 5 في 3', code: `#include <iostream>
using namespace std;

class Rectangle {
private:
    double width, height;
public:
    Rectangle(double w, double h) {
        width = w;
        height = h;
    }
    double area() {
        return width * height;
    }
};

int main() {
    Rectangle r(5, 3);
    cout << r.area() << endl;
    return 0;
}

// الناتج: 15`, why: 'الناتج 15. لاحظ إن width و height مخفيين (private): الطريق الوحيد للمساحة هو method area. جرب تعمل Rectangle r(10, 2) وتوقع الناتج قبل التشغيل.' },
    { task: 'مدد class الحساب البنكي: ضيف method `transferTo(BankAccount& other, double amount)` بتحول فلوس من حساب لحساب مع فحص الرصيد', code: `void transferTo(BankAccount& other, double amount) {
    if (amount <= balance) {
        balance -= amount;
        other.deposit(amount);
        cout << "تم التحويل ✅" << endl;
    } else {
        cout << "رصيد مش كفاية للتحويل!" << endl;
    }
}

// تجربة في main:
// BankAccount a, b;
// a.deposit(100);
// a.transferTo(b, 40);
// cout << a.getBalance() << endl;   // 60
// cout << b.getBalance() << endl;   // 40`, why: 'لاحظ إن الـ method بتتعامل مع كائن تاني من نفس الكلاس بسهولة، وإننا استخدمنا deposit بتاع الحساب التاني بدل ما نلمس balance بتاعه مباشرة. المعامل BankAccount& reference عشان نعدل الأصل.' }
  ]
},
{
  id: 'stl',
  nav: 'مقدمة STL',
  title: 'مقدمة STL: vector و map',
  subtitle: 'مكتبة C++ الجاهزة: قوايم بتكبر لوحدها وقواميس بمفاتيح',
  blocks: [
    { type: 'p', text: 'الـ STL (Standard Template Library) هي كنز C++: هياكل بيانات وخوارزميات جاهزة، مكتوبة باحتراف ومتحسنة للأداء. بدل ما تبني كل حاجة بإيدك، تستعمل أدوات جاهزة مضمونة. أهم اثنين هتستخدمهم كل يوم: `vector` و `map`.' },
    { type: 'h', text: 'vector: array بتكبر لوحدها' },
    { type: 'code', code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums;
    nums.push_back(4);
    nums.push_back(8);
    nums.push_back(15);

    cout << nums.size() << endl;   // 3
    for (int n : nums) {
        cout << n << " ";
    }
    cout << endl;                  // 4 8 15

    int sum = 0;
    for (int n : nums) sum += n;
    cout << sum << endl;           // 27
    return 0;
}` },
    { type: 'p', text: '`push_back` بتضيف عنصر في الآخر والـ vector بتكبر لوحدها: مفيش حجم ثابت زي الـ array. `size()` بتديك العدد الحالي. واللوب `for (int n : nums)` (اسمها range-based for) بتلف على كل العناصر من غير index خالص: اقرأها "لكل n في nums".' },
    { type: 'table', head: ['وجه المقارنة', 'int arr[6]', 'vector<int>'], rows: [
      ['الحجم', 'ثابت من لحظة الإنشاء', 'بيكبر ويصغر وقت التشغيل'],
      ['معرفة العدد', 'تحسبه بنفسك', 'size() جاهزة'],
      ['الحماية', 'مفيش مراقبة حدود', 'أأمن، وفيه at() بتراقب'],
      ['الاستخدام', 'أساس نظري مهم', 'الاختيار اليومي الفعلي']
    ] },
    { type: 'h', text: 'map: قاموس بمفاتيح' },
    { type: 'code', code: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    map<string, int> grades;
    grades["Ali"] = 85;
    grades["Mona"] = 92;
    grades["Omar"] = 78;

    cout << grades["Mona"] << endl;     // 92
    cout << grades.count("Mona") << endl;  // 1: موجودة
    cout << grades.count("Sara") << endl;  // 0: مش موجودة

    for (auto& p : grades) {
        cout << p.first << ": " << p.second << endl;
    }
    return 0;
}` },
    { type: 'code', code: `# ناتج اللفة الأخيرة (map مترتبة بالمفتاح تلقائياً):
Ali: 85
Mona: 92
Omar: 78` },
    { type: 'p', text: 'الـ map بتربط مفتاح (key) بقيمة (value): الاسم بالدرجة. `count` بتقولك المفتاح موجود ولا لأ (1 أو 0): افحص بيها قبل ما تقرأ مفتاح مش متأكد منه، لأن قراءة مفتاح مش موجود بـ `[]` بتنشئه بقيمة صفر! ولاحظ إن اللفة طلعت مترتبة أبجدياً: map بتحافظ على مفاتيحها مرتبة.' },
    { type: 'h', text: 'sort: ترتيب في سطر' },
    { type: 'code', code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> nums = {42, 7, 19, 3};
    sort(nums.begin(), nums.end());
    for (int n : nums) {
        cout << n << " ";
    }
    cout << endl;   // 3 7 19 42
    return 0;
}` },
    { type: 'p', text: '`sort` من مكتبة `algorithm` بترتب أي vector في سطر واحد. الوسيطتين `begin()` و `end()` معناهم: من أول عنصر لآخر عنصر.' },
    { type: 'note', text: 'دي بس رشة من STL: فيه كمان set و stack و queue و pair وخوارزميات كتير. لو ناوي تدخل competitive programming، الـ STL هي سلاحك الأساسي: محدش هناك بيكتب sort بإيده.' }
  ],
  quiz: [
    { q: 'إيه أكبر ميزة لـ `vector` على الـ array التقليدية؟', options: [
      { text: 'حجمها بيكبر ويصغر وقت التشغيل حسب الحاجة' },
      { text: 'بتتعرف من غير #include' },
      { text: 'بتخزن أنواع مختلفة في نفس الـ vector' }
    ], answer: 0, explain: 'الـ array حجمها ثابت من لحظة الإنشاء، vector بتكبر مع push_back. وكل عناصر vector من نوع واحد برضه.' },
    { q: 'لو `grades["Sara"]` مش موجودة في الـ map، إيه أأمن طريقة تتأكد بيها قبل القراءة؟', options: [
      { text: 'grades.count("Sara") لو رجعت 1 يبقى موجودة' },
      { text: 'أقرأها عادي، ولو رجعت صفر يبقى مش موجودة في الـ map' },
      { text: 'مفيش طريقة آمنة، لازم تقرا وتستنى لو البرنامج وقع' }
    ], answer: 0, explain: 'count بترجع 1 لو المفتاح موجود و0 لو مش موجود. القراءة المباشرة بـ [] بتنشئ المفتاح بقيمة صفرية لو مش موجود، ودي غلطة شائعة.' },
    { q: 'عايز ترتب `vector<int> v` تصاعدياً. إيه السطر الصح؟', options: [
      { text: 'v.sort(); لأن الـ vector ليها دالة sort جوه الكلاس نفسه', mono: true },
      { text: 'sort(v.begin(), v.end());', mono: true },
      { text: 'sort(v); من غير ما تحدد بداية ونهاية لأن الدالة بتعرفهم', mono: true }
    ], answer: 1, explain: 'sort function حرة من مكتبة algorithm بتاخد بداية ونهاية المدى. vector مش فيها method اسمها sort.' }
  ],
  exercises: [
    { task: 'اعمل `vector<double>` فيها درجات واحسب متوسطها', code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<double> grades = {90, 80, 70};
    double sum = 0;
    for (double g : grades) sum += g;
    cout << sum / grades.size() << endl;
    return 0;
}

// الناتج: 80`, why: 'الناتج 80. لاحظ إن size() بترجع العدد الحالي مهما كبرت القايمة: ضيف درجات زيادة والمتوسط هيتحسب صح من غير ما تعدل حاجة تانية.' },
    { task: 'اكتب عداد كلمات: map بتعد كل كلمة جات كام مرة في قايمة', code: `#include <iostream>
#include <map>
#include <string>
#include <vector>
using namespace std;

int main() {
    vector<string> words = {"cat", "dog", "cat", "bird", "dog", "cat"};
    map<string, int> counts;
    for (string w : words) counts[w]++;
    for (auto& p : counts) {
        cout << p.first << ": " << p.second << endl;
    }
    return 0;
}

// الناتج:
// bird: 1
// cat: 3
// dog: 2`, why: 'counts[w]++ زيادة على القيمة الحالية للمفتاح، ولو أول مرة بتتعمل بصفر وتبقى 1. لاحظ الترتيب الأبجدي في الناتج: دي خاصية map. الفكرة دي هي أساس أي تحليل تكرارات.' }
  ]
},
{
  id: 'capstone',
  nav: 'المشروع الختامي',
  title: 'المشروع الختامي: نظام إدارة درجات الطلاب',
  subtitle: 'كل اللي اتعلمته في برنامج console واحد حقيقي: struct + vector + functions + menu',
  blocks: [
    { type: 'p', text: 'وصلت للمحطة الأخيرة. المشروع ده مش درس فيه حاجة جديدة: هو تجميعة لكل اللي فات في برنامج واحد حقيقي بتشغله وتستخدمه. هنبني نظام إدارة درجات طلاب كامل: إضافة، عرض، بحث، متوسط، وأعلى درجة، كل ده من منيو تفاعلي.' },
    { type: 'h', text: 'المطلوب' },
    { type: 'list', items: [
      'منيو بتتكرر لحد ما المستخدم يختار خروج.',
      'إضافة طالب جديد: اسمه ودرجته.',
      'عرض كل الطلاب المسجلين مرقمين.',
      'البحث عن طالب بالاسم وعرض درجته.',
      'حساب متوسط الدرجات.',
      'إيجاد الطالب صاحب أعلى درجة.'
    ] },
    { type: 'h', text: 'التصميم قبل الكود' },
    { type: 'list', items: [
      'struct Student: يجمع اسم الطالب ودرجته (درس 11).',
      'vector<Student>: يخزن القايمة كلها وتكبر لوحدها (درس 13).',
      'function لكل ميزة: addStudent و showAll و searchStudent و average و topStudent (درس 9).',
      'do..while + switch: منيو تظهر مرة على الأقل وتتكرر لحد الخروج (دروس 6 و 7).',
      'vector<Student>& بالمرجع: عشان كل function تعدل نفس القايمة الأصلية (درس 10).'
    ] },
    { type: 'code', code: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Student {
    string name;
    double grade;
};

void printMenu() {
    cout << "\\n===== نظام إدارة الدرجات =====" << endl;
    cout << "1) أضف طالب" << endl;
    cout << "2) اعرض كل الطلاب" << endl;
    cout << "3) ابحث عن طالب" << endl;
    cout << "4) متوسط الدرجات" << endl;
    cout << "5) أعلى درجة" << endl;
    cout << "0) خروج" << endl;
    cout << "اختيارك: ";
}

void addStudent(vector<Student>& students) {
    Student s;
    cout << "اسم الطالب: ";
    cin >> s.name;
    cout << "درجته: ";
    cin >> s.grade;
    students.push_back(s);
    cout << "تمت الإضافة ✅" << endl;
}

void showAll(const vector<Student>& students) {
    if (students.empty()) {
        cout << "مفيش طلاب لسه." << endl;
        return;
    }
    for (int i = 0; i < (int)students.size(); i++) {
        cout << i + 1 << ". " << students[i].name << " - " << students[i].grade << endl;
    }
}

void searchStudent(const vector<Student>& students) {
    string name;
    cout << "اسم الطالب اللي بتدور عليه: ";
    cin >> name;
    for (auto& s : students) {
        if (s.name == name) {
            cout << "لقيناه! درجته: " << s.grade << endl;
            return;
        }
    }
    cout << "مش موجود." << endl;
}

void average(const vector<Student>& students) {
    if (students.empty()) {
        cout << "مفيش درجات لسه." << endl;
        return;
    }
    double sum = 0;
    for (auto& s : students) sum += s.grade;
    cout << "المتوسط: " << sum / students.size() << endl;
}

void topStudent(const vector<Student>& students) {
    if (students.empty()) {
        cout << "مفيش طلاب لسه." << endl;
        return;
    }
    int top = 0;
    for (int i = 1; i < (int)students.size(); i++) {
        if (students[i].grade > students[top].grade) top = i;
    }
    cout << "الأول على الدفعة: " << students[top].name
         << " بدرجة " << students[top].grade << endl;
}

int main() {
    vector<Student> students;
    int choice;
    do {
        printMenu();
        cin >> choice;
        switch (choice) {
            case 1: addStudent(students); break;
            case 2: showAll(students); break;
            case 3: searchStudent(students); break;
            case 4: average(students); break;
            case 5: topStudent(students); break;
            case 0: cout << "مع السلامة! 👋" << endl; break;
            default: cout << "اختيار مش معروف، جرب تاني." << endl;
        }
    } while (choice != 0);
    return 0;
}` },
    { type: 'h', text: 'تجربة حقيقية للبرنامج' },
    { type: 'code', code: `# ضفنا Ahmed (95) و Mona (88) و Omar (72)، وبعدين:
# اختيار 2:
1. Ahmed - 95
2. Mona - 88
3. Omar - 72

# اختيار 3 وكتبنا Mona:
لقيناه! درجته: 88

# اختيار 4:
المتوسط: 85

# اختيار 5:
الأول على الدفعة: Ahmed بدرجة 95

# اختيار 0:
مع السلامة! 👋` },
    { type: 'p', text: 'الكود كله اتجرب فعلاً: ضفنا 3 طلاب وجربنا كل اختيار، والنتايج اللي فوق دي مأخوذة من تشغيلة حقيقية. انسخه عندك، ترجمه بـ `g++ main.cpp -o grades`، شغله، واطمن عليه بنفسك.' },
    { type: 'h', text: 'نقط تستاهل تاخد بالك منها' },
    { type: 'list', items: [
      '(int)students.size(): size() بترجع نوع unsigned، والتحويل لـ int بيسكت تحذير المقارنة بين أنواع مختلفة.',
      'const vector<Student>& في functions القراءة بس: المرجع بيمنع النسخة (سرعة)، و const بيضمن إننا مش هنعدل بالغلط.',
      'كل function بتفحص القايمة الفاضية قبل ما تشتغل: المتوسط على صفر قايمة كان هيعمل قسمة على صفر.',
      'topStudent بيستخدم نمط "افترض وتحدى" من درس الشروط: افترض إن الأول هو الأعلى، وتحدى الباقي واحد واحد.'
    ] },
    { type: 'h', text: 'مدد المشروع بنفسك' },
    { type: 'list', items: [
      'ضيف خيار مسح طالب بالاسم (تمرين 1 تحت).',
      'ضيف حفظ وتحميل من ملف عشان البيانات متضيعش لما البرنامج يقفل (تمرين 2).',
      'رتب الطلاب بالدرجة قبل العرض بـ sort.',
      'استخدم map<string, double> بدل vector لو عايز بحث أسرع بالاسم.',
      'خليه يقرأ أسماء عربية بمسافات بـ getline.'
    ] },
    { type: 'note', text: 'خلصت الرحلة! 🎉 انت دلوقتي عارف المتغيرات والشروط واللوبات والـ functions والـ pointers والـ structs والـ OOP والـ STL. دي قاعدة C++ كلها. الخطوة الجاية: اتمرن على مسائل (Codeforces أو HackerRank)، وارجع لأي درس لما تحس إن حاجة هربت منك.' }
  ],
  quiz: [
    { q: 'ليه استخدمنا `vector<Student>` بدل `Student students[100]` في المشروع؟', options: [
      { text: 'عشان الـ vector بتكبر حسب عدد الطلاب الفعلي من غير حد ثابت' },
      { text: 'لأن الـ array ممنوعة في C++ الحديثة ومبقاش ينفع تستخدمها' },
      { text: 'عشان الشكل أحلى بس، ومفيش فرق في الأداء أو المرونة' }
    ], answer: 0, explain: 'مش عارفين عدد الطلاب مسبقاً: ممكن 3 وممكن 300. الـ vector بتكبر مع push_back من غير ما نحدد سقف ونخاف نوصله.' },
    { q: 'ليه كل ميزة في function لوحدها بدل ما نحط كل الكود في main؟', options: [
      { text: 'عشان البرنامج يبقى أبطأ وأكتر تعقيداً، وده مفيد في التعلم' },
      { text: 'عشان كل قطعة سهلة القراءة والتجربة والتعديل لوحدها، وmain تفضل خريطة واضحة' },
      { text: 'لأن main فيها حد أقصى للأسطر ومينفعش نكتب فيها أكتر من كده' }
    ], answer: 1, explain: 'main بقت خريطة: منيو وswitch بس. كل تفصيلة في function ليها اسم واضح. لو في غلطة في البحث، تعرف تروح فين فوراً.' },
    { q: 'ليه اخترنا `do..while` للمنيو بدل `while` عادية؟', options: [
      { text: 'عشان المنيو تظهر مرة واحدة على الأقل قبل فحص شرط الخروج' },
      { text: 'لأنها أسرع من while في كل الحالات وبتوفر خطوة في الترجمة' },
      { text: 'لأن while مش بتقبل switch جواها وبتدي error وقت الترجمة' }
    ], answer: 0, explain: 'do..while بتنفذ الجسم الأول وبعدين تفحص الشرط: المنيو تظهر، المستخدم يختار، وبعدين نسأل "كان صفر؟". while العادية كانت هتحتاج طباعة المنيو مرة بره اللوب.' }
  ],
  exercises: [
    { task: 'ضيف ميزة مسح طالب: اكتب function `deleteStudent` بتمسح طالب بالاسم من الـ vector', code: `void deleteStudent(vector<Student>& students) {
    string name;
    cout << "اسم الطالب اللي هتمسحه: ";
    cin >> name;
    for (int i = 0; i < (int)students.size(); i++) {
        if (students[i].name == name) {
            students.erase(students.begin() + i);
            cout << "اتمسح ✅" << endl;
            return;
        }
    }
    cout << "مش موجود." << endl;
}

// ضيف case 6 في الـ switch وسطر "6. مسح طالب" في المنيو
// بعد مسح Mona من قايمة فيها Ahmed و Mona:
// الباقي: 1
// Ahmed`, why: 'vector.erase(begin() + i) بتمسح العنصر رقم i وتزحلق الباقي. جربها: ضيف طالبين، امسح التاني، واطبع العدد والأسماء. الناتج المتحقق منه: الباقي 1 و Ahmed.' },
    { task: 'ضيف حفظ في ملف: عند الخروج اكتب كل طالب ودرجته في `students.txt`، وعند البداية اقراهم تاني', code: `#include <fstream>   // ضيفها فوق

// عند الخروج:
ofstream file("students.txt");
for (auto& s : students) {
    file << s.name << " " << s.grade << endl;
}
file.close();

// عند البداية (تحميل):
ifstream in("students.txt");
string name; double grade;
while (in >> name >> grade) {
    students.push_back({name, grade});
}

// جرب: ضيف Ahmed 95 و Mona 88 واقفل،
// وافتح تاني واطلب عرض الكل:
// 1. Ahmed - 95
// 2. Mona - 88`, why: 'ofstream بيكتب و ifstream بيقرأ، وwhile (in >> ...) بتفضل تلف لحد ما الملف يخلص. كده برنامجك بقى بيفتكر بياناته بين التشغيلات زي البرامج الحقيقية.' }
  ]
}
);
