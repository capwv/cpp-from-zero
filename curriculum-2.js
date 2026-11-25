/* Curriculum part 2: arrays & strings, functions, pointers, structs, OOP, STL, capstone */
var CURRICULUM = window.CURRICULUM || [];
CURRICULUM.push(
{
 "id": "arrays",
 "nav": "Arrays و Strings",
 "title": "الـ Arrays والـ Strings",
 "subtitle": "خزن قوايم في متغير واحد، وافهم ليه العد بيبدأ من صفر",
 "blocks": [
  {
   "type": "p",
   "text": "تخيل عندك درجات 30 طالب. هتعمل `grade1` و `grade2` لحد `grade30`؟ أكيد لأ. الـ array بتخزن قايمة قيم من نفس النوع في متغير واحد، وتوصل لأي عنصر فيها برقمه (الـ index)."
  },
  {
   "type": "code",
   "code": "int nums[6] = {4, 8, 15, 16, 23, 42};\n\ncout << nums[0] << endl;   // 4: أول عنصر\ncout << nums[5] << endl;   // 42: آخر عنصر\nnums[2] = 100;             // تعديل العنصر التالت"
  },
  {
   "type": "note",
   "warn": true,
   "text": "العد بيبدأ من صفر مش واحد: أول عنصر هو `nums[0]`، وآخر عنصر في array حجمها 6 هو `nums[5]`. لو كتبت `nums[6]` انت خارج حدود الـ array: C++ مش هتمنعك، بس القيمة اللي هتقراها زبالة، ودي من أخطر أغلاط C++ الصامتة (undefined behavior)."
  },
  {
   "type": "h",
   "text": "المرور على array بلوب"
  },
  {
   "type": "code",
   "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int nums[6] = {4, 8, 15, 16, 23, 42};\n    int sum = 0;\n    for (int i = 0; i < 6; i++) {\n        sum += nums[i];\n    }\n    cout << \"المجموع: \" << sum << endl;\n    cout << \"المتوسط: \" << sum / 6 << endl;\n    return 0;\n}"
  },
  {
   "type": "code",
   "code": "# الناتج:\nالمجموع: 108\nالمتوسط: 18"
  },
  {
   "type": "p",
   "text": "اللوب بتلف بالـ index من 0 لحد الحجم ناقص واحد، وكل لفة بتقرأ عنصر. شفت نمط التراكم تاني؟ هو هو بتاع الدرس اللي فات، بس المرات دي فوق array."
  },
  {
   "type": "h",
   "text": "string: array من الحروف بس أذكى"
  },
  {
   "type": "p",
   "text": "الـ `string` جواها حروف متترتبة زي الـ array، بس عليها وظايف جاهزة كتير. توصل لأي حرف بقوسين مربعين، وتجمع نصوص بعلامة +، وتعرف طولها بـ size():"
  },
  {
   "type": "code",
   "code": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string first = \"Ahmed\";\n    string last = \"Wael\";\n    string full = first + \" \" + last;\n    cout << full << endl;      // Ahmed Wael\n    cout << full.size() << endl;  // 10\n    cout << full[0] << endl;      // A\n    return 0;\n}"
  },
  {
   "type": "p",
   "text": "`full.size()` رجعت 10: خمسة حروف Ahmed + مسافة + أربعة حروف Wael. و`full[0]` جابت أول حرف: A. زي الـ array بالظبط، العد من صفر."
  },
  {
   "type": "note",
   "text": "ليه العد من صفر أصلاً؟ لأن الـ index بيمثل البعد عن بداية الـ array في الذاكرة: العنصر الأول بعيد صفر خطوة عن البداية. السبب ده هيبان أوضح لما نوصل للـ pointers في درس قريب."
  },
  {
   "type": "h",
   "text": "حدود الـ array التقليدية"
  },
  {
   "type": "list",
   "items": [
    "حجمها ثابت: int nums[6] ماتكبرش بعد ما اتعملت. عايز قايمة بتكبر؟ دي vector في درس الـ STL.",
    "مش بتراقب الحدود: مفيش تحذير لو عديت الآخر.",
    "عشان كده في الشغل الحقيقي، أغلب الناس بتستخدم vector بدل الـ array الخام. بس لازم تفهم الـ array الأول لأنها الأساس اللي vector مبنية عليه."
   ]
  }
 ],
 "quiz": [
  {
   "q": "في `int nums[6]`، إيه الـ index بتاع أول عنصر؟",
   "options": [
    {
     "text": "1"
    },
    {
     "text": "0"
    },
    {
     "text": "6"
    }
   ],
   "answer": 1,
   "explain": "العد في C++ بيبدأ من صفر: nums[0] هو الأول، وnums[5] هو الأخير."
  },
  {
   "q": "كتبت `cout << nums[6]` على array حجمها 6. إيه اللي هيحصل؟",
   "options": [
    {
     "text": "خطأ ترجمة واضح هيمنع البرنامج من إنه يتشغل أصلاً ويعرض الخطأ"
    },
    {
     "text": "البرنامج هيقرا قيمة من خارج الـ array (سلوك غير معرف) من غير تحذير"
    },
    {
     "text": "هيطبع آخر عنصر عادي في الـ array لأن C++ بتحمي الحدود تلقائياً"
    }
   ],
   "answer": 1,
   "explain": "C++ مش بتراقب حدود الـ array: بتقرا من ذاكرة مش بتاعتك والنتيجة زبالة أو crash. آخر index صحيح هو الحجم ناقص واحد."
  },
  {
   "q": "لو `string s = \"C++\";` وبعدين `s += \"17\";`، إيه ناتج `cout << s << endl << s.size();`؟",
   "options": [
    {
     "text": "C++17 وبعدين 5"
    },
    {
     "text": "C++17 وبعدين 3"
    },
    {
     "text": "خطأ: ممنوع تجمع string"
    }
   ],
   "answer": 0,
   "explain": "علامة + بتجمع النصوص: C++ مع 17 تديك C++17، وطولها 5 حروف. متعودش على دي من لغات تانية: الجمع هنا نصي فعلاً."
  }
 ],
 "exercises": [
  {
   "task": "اعمل array فيها 6 أرقام واحسب مجموعهم ومتوسطهم",
   "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int nums[6] = {4, 8, 15, 16, 23, 42};\n    int sum = 0;\n    for (int i = 0; i < 6; i++) {\n        sum += nums[i];\n    }\n    cout << \"المجموع: \" << sum << endl;\n    cout << \"المتوسط: \" << sum / 6 << endl;\n    return 0;\n}",
   "why": "الناتج: المجموع 108 والمتوسط 18. نمط التراكم فوق array: اللوب بيجيب العناصر واحد واحد والمتغير بيجمع."
  },
  {
   "task": "اكتب برنامج يعكس كلمة: يقرأ string ويطبعها بالمقلوب",
   "code": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string word = \"hello\";\n    string rev = \"\";\n    for (int i = word.size() - 1; i >= 0; i--) {\n        rev += word[i];\n    }\n    cout << rev << endl;\n    return 0;\n}\n\n// الناتج: olleh",
   "why": "اللوب ماشية بالظهر: من آخر index (size ناقص واحد) لحد صفر. جربها في المعمل: string و for و cout كلهم مدعومين."
  }
 ]
},
{
 "id": "functions",
 "nav": "الـ Functions",
 "title": "الـ Functions: قسّم الكود لقطع ليها اسم",
 "subtitle": "التصريح والتعريف، المعاملات والقيمة الراجعة، ونطاق المتغيرات",
 "blocks": [
  {
   "type": "p",
   "text": "لحد دلوقتي كل كودنا جوه `main`. تخيل برنامج فيه 5000 سطر كده: مستحيل تقرا فيه أو تلاقي غلطة. الـ function بتاخد قطعة كود ليها مهمة واحدة وتديلها اسم، وبعدها تندهها من أي حتة مليون مرة."
  },
  {
   "type": "code",
   "code": "#include <iostream>\nusing namespace std;\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint biggest(int a, int b) {\n    if (a > b) return a;\n    return b;\n}\n\nint main() {\n    cout << add(3, 4) << endl;      // 7\n    cout << biggest(9, 4) << endl;  // 9\n    return 0;\n}"
  },
  {
   "type": "h",
   "text": "تشريح الـ function"
  },
  {
   "type": "list",
   "items": [
    "نوع الراجع (return type): int في add يعني الـ function بترجع عدد صحيح. لو مش بترجع حاجة نكتب void.",
    "الاسم: add, بنده الـ function بيه.",
    "المعاملات (parameters): (int a, int b), المتغيرات اللي بتستقبل القيم اللي تبعتها.",
    "الجسم: الكود بين القوسين المعقوصين.",
    "return: بترجع النتيجة وتقفل الـ function فوراً. أي كود بعد return مش بيتنفذ."
   ]
  },
  {
   "type": "h",
   "text": "ليه فوق main؟"
  },
  {
   "type": "p",
   "text": "الـ compiler بيقرأ الملف من فوق لتحت، فلازم يعرف الـ function قبل ما تتنده. الحل الشائع: عرّف الـ functions فوق `main` زي المثال. في المشاريع الكبيرة بنكتب declaration (الترويسة بس) فوق والتعريف الكامل تحت أو في ملف تاني."
  },
  {
   "type": "h",
   "text": "void: function مش بترجع حاجة"
  },
  {
   "type": "code",
   "code": "void greet(string name) {\n    cout << \"أهلاً يا \" << name << \"!\" << endl;\n}\n\n// في main:\ngreet(\"Ahmed\");   // الناتج: أهلاً يا Ahmed!"
  },
  {
   "type": "h",
   "text": "نطاق المتغيرات (Scope)"
  },
  {
   "type": "code",
   "code": "int main() {\n    int x = 5;\n    if (true) {\n        int x = 10;   // متغير جديد مختلف، بيغطي على اللي بره\n        cout << x << endl;   // 10\n    }\n    cout << x << endl;       // 5\n    return 0;\n}"
  },
  {
   "type": "p",
   "text": "أي متغير بيعيش جوه القوسين المعقوصين اللي اتعرف فيهم بس. متغير جوه function مش شايفاه بره، والعكس. لو عرفت متغير بنفس الاسم جوه بلوك أصغر، الجديد بيغطي على القديم لحد ما البلوك تخلص."
  },
  {
   "type": "h",
   "text": "القيم بتتبعت نسخة (Pass by Value)"
  },
  {
   "type": "code",
   "code": "void tryChange(int x) {\n    x = 99;\n}\n\nint main() {\n    int n = 5;\n    tryChange(n);\n    cout << n << endl;   // 5 مش 99!\n    return 0;\n}"
  },
  {
   "type": "p",
   "text": "لما تبعت متغير لـ function، C++ بتبعت **نسخة** منه. الـ function غيرت النسخة، والأصل `n` فضل 5. ده السلوك الافتراضي واسمه pass by value. عايز الـ function تعدل الأصل بجد؟ دي حكاية الـ references والـ pointers، وده درسنا الجاي بالظبط."
  }
 ],
 "quiz": [
  {
   "q": "function مش بترجع أي قيمة. إيه نوع الراجع الصح؟",
   "options": [
    {
     "text": "int",
     "mono": true
    },
    {
     "text": "void",
     "mono": true
    },
    {
     "text": "return",
     "mono": true
    }
   ],
   "answer": 1,
   "explain": "void معناها \"فاضي\": الـ function بتنفذ شغل (زي الطباعة) من غير ما ترجع نتيجة."
  },
  {
   "q": "إيه ناتج `cout << add(3, 4);` لو add بتجمع رقمين؟",
   "options": [
    {
     "text": "add(3, 4)",
     "mono": true
    },
    {
     "text": "34"
    },
    {
     "text": "7"
    }
   ],
   "answer": 2,
   "explain": "الـ function بتتنفذ الأول ونتيجتها (3+4=7) هي اللي بتتطبع. النداء بيتستبدل بالقيمة الراجعة."
  },
  {
   "q": "بعت متغير لـ function والـ function غيرت قيمته. ليه الأصل ماتغيرش؟",
   "options": [
    {
     "text": "لأن C++ بتبعت نسخة من القيمة مش المتغير نفسه"
    },
    {
     "text": "لأن الـ compiler فيه bug بيمنع تعديل القيمة الأصلية وقت التنفيذ"
    },
    {
     "text": "لأن المتغير لازم يتعرف const عشان الـ function تقدر تقرأه بس"
    }
   ],
   "answer": 0,
   "explain": "pass by value: الـ function بتاخد نسخة وتلعب فيها براحتها. عشان تعدل الأصل محتاج reference (&) أو pointer، وده موضوع الدرس الجاي."
  }
 ],
 "exercises": [
  {
   "task": "اكتب function اسمها `isPrime` بتاخد int وترجع bool: هل الرقم أولي؟ وجربها على 7 و 8",
   "code": "#include <iostream>\nusing namespace std;\n\nbool isPrime(int n) {\n    if (n < 2) return false;\n    for (int i = 2; i < n; i++) {\n        if (n % i == 0) return false;\n    }\n    return true;\n}\n\nint main() {\n    cout << isPrime(7) << endl;   // 1 (يعني true)\n    cout << isPrime(8) << endl;   // 0 (يعني false)\n    return 0;\n}",
   "why": "الناتج 1 و 0 لأن bool بتتطبع أرقام. الفكرة: لو لقيت أي قاسم بين 2 و n-1 اطلع false فوراً، لو اللوب خلصت من غير ولا قاسم يبقى أولي."
  },
  {
   "task": "حوّل كود المضروب من تمرين اللوبات لـ function اسمها `factorial` بتاخد n وترجع الناتج",
   "code": "#include <iostream>\nusing namespace std;\n\nint factorial(int n) {\n    int result = 1;\n    for (int i = 1; i <= n; i++) {\n        result *= i;\n    }\n    return result;\n}\n\nint main() {\n    cout << factorial(5) << endl;   // 120\n    return 0;\n}",
   "why": "نفس لوجيك التمرين القديم، بس دلوقتي متغلف في function تقدم تندهها بأي رقم: factorial(5) تديك 120، factorial(3) تديك 6."
  }
 ]
},
{
 "id": "pointers",
 "nav": "الـ Pointers بالحدس",
 "title": "الـ Pointers بالحدس: عناوين الذاكرة",
 "subtitle": "& بتجيب العنوان و * بتفتحه: من غير وجع دماغ",
 "blocks": [
  {
   "type": "p",
   "text": "الـ pointers أشهر حاجة بتخوف الطلبة من C++. الحقيقة إن الفكرة بسيطة جداً لو اتفهمت بالحدس: الذاكرة زي شارع طويل مليان بيوت مرقمة. كل متغير بيتخزن في \"بيت\" له عنوان. الـ pointer هو متغير بيخزن **عنوان** بيت تاني، مش قيمة عادية."
  },
  {
   "type": "code",
   "code": "int x = 5;\nint* p = &x;   // p بيخزن عنوان x في الذاكرة\n\ncout << x << endl;    // 5: القيمة\ncout << p << endl;    // عنوان زي 0x7ffc1a2b3c4d (بيختلف كل تشغيلة)\ncout << *p << endl;   // 5: القيمة اللي في العنوان ده"
  },
  {
   "type": "p",
   "text": "علامتين بس هما اللي محتاجين تثبتوا في دماغك: `&` قبل المتغير بتجيب **عنوانه**، و`*` قبل الـ pointer بتفتح العنوان وتجيب **المحتوى** (أو تغيره). لما نقول `int* p` معناها: p مؤشر على متغير من نوع int."
  },
  {
   "type": "h",
   "text": "التعديل من خلال الـ pointer"
  },
  {
   "type": "code",
   "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int x = 5;\n    int* p = &x;\n    cout << x << endl;   // 5\n    *p = 10;             // عدل محتوى العنوان\n    cout << x << endl;   // 10: x نفسها اتغيرت!\n    return 0;\n}"
  },
  {
   "type": "p",
   "text": "لما كتبنا `*p = 10` احنا مش غيرنا الـ pointer، احنا رحنا للعنوان اللي هو شاور عليه وغيرنا اللي جواه. وعشان العنوان ده هو بيت `x` نفسه، قيمة `x` اتغيرت. دي أقوى فكرة في الدرس: الـ pointer بيديك وصول مباشر لبيت تاني في الذاكرة."
  },
  {
   "type": "h",
   "text": "ليه كل ده مهم؟"
  },
  {
   "type": "list",
   "items": [
    "الـ arrays جوه الجوه pointers: اسم الـ array بيمثل عنوان أول عنصر، وده سر العد من صفر.",
    "تعديل المتغيرات جوه functions: بدل pass by value اللي بتبعت نسخة.",
    "الذاكرة الديناميكية: متغيرات بتتعمل وقت التشغيل بـ new ومكانها مش ثابت.",
    "هياكل البيانات المتقدمة: linked lists و trees مبنية كلها على pointers.",
    "الأداء: بدل ما تنسخ بيانات ضخمة، تبعت عنوانها بس."
   ]
  },
  {
   "type": "h",
   "text": "references: الأخ الألطف"
  },
  {
   "type": "code",
   "code": "void addOne(int& x) {   // & بعد النوع: x مرجع للأصل مش نسخة\n    x++;\n}\n\nint main() {\n    int n = 5;\n    addOne(n);\n    cout << n << endl;   // 6: الأصل اتغير فعلاً\n    return 0;\n}"
  },
  {
   "type": "p",
   "text": "الـ reference (العلامة `&` بعد النوع) بيخلي المعامل اسم تاني لنفس المتغير الأصلي: مفيش نسخة، أي تعديل بيروح للأصل على طول. في الشغل اليومي هتستخدم references كتير أوي زي دي، ونادراً هتحتاج pointers خام. المشروع الختامي فيه references في كل function."
  },
  {
   "type": "h",
   "text": "تطبيق كلاسيكي: swap"
  },
  {
   "type": "code",
   "code": "void swapNums(int& a, int& b) {\n    int temp = a;\n    a = b;\n    b = temp;\n}\n\nint main() {\n    int x = 3, y = 8;\n    swapNums(x, y);\n    cout << x << \" \" << y << endl;   // 8 3\n    return 0;\n}"
  },
  {
   "type": "note",
   "warn": true,
   "text": "قواعد أمان للمبتدئ: متفتحش عنوان فاضي (`*p` على pointer قيمته `nullptr` بتبوظ البرنامج)، ومتستخدمش pointer لمتغير اتمسح. لو لزوم pointer فاضي، خليه `nullptr` وافحصه قبل الاستخدام."
  }
 ],
 "quiz": [
  {
   "q": "إيه وظيفة العلامة `&` في السطر `int* p = &x;`؟",
   "options": [
    {
     "text": "بتجيب عنوان المتغير x في الذاكرة"
    },
    {
     "text": "بتجيب قيمة x نفسها وتحطها في المؤشر p بدل العنوان"
    },
    {
     "text": "بتعمل نسخة جديدة من x في الذاكرة وتحط عنوانها في p"
    }
   ],
   "answer": 0,
   "explain": "&x معناها \"عنوان x\". الـ pointer p بيخزن العنوان ده، و*p بعدها بيفتحه."
  },
  {
   "q": "لو `int x = 5; int* p = &x; *p = 10;` إيه قيمة x دلوقتي؟",
   "options": [
    {
     "text": "5"
    },
    {
     "text": "10"
    },
    {
     "text": "عنوان في الذاكرة"
    }
   ],
   "answer": 1,
   "explain": "*p = 10 بتغير محتوى العنوان اللي p شاور عليه، والعنوان ده هو بيت x نفسه. فـ x بقت 10."
  },
  {
   "q": "إيه فايدة الـ reference (`int&`) في معاملات الـ function؟",
   "options": [
    {
     "text": "بيخلي الـ function تعدل المتغير الأصلي بدل نسخة منه"
    },
    {
     "text": "بيخلي الكود أسرع في الترجمة بس ومبيغيرش سلوك البرنامج"
    },
    {
     "text": "بيمسح المتغير بعد الاستخدام عشان يوفر الذاكرة تلقائياً"
    }
   ],
   "answer": 0,
   "explain": "بدون &: pass by value والـ function بتاخد نسخة. مع &: المعامل اسم تاني للأصل نفسه، فالتعديل بيظهر بره. زي swapNums بالظبط."
  }
 ],
 "exercises": [
  {
   "task": "من غير ما تشغل الكود، توقع ناتج كل سطر: `int a = 3; int* p = &a; *p = *p + 4; cout << a;` وبعدين شغله في المعمل أو على جهازك وتأكد",
   "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 3;\n    int* p = &a;\n    *p = *p + 4;   // اقرأ a (3)، جمع 4، اكتبها في a\n    cout << a << endl;   // 7\n    return 0;\n}\n\n// الناتج: 7",
   "why": "*p في اليمين بتقرأ قيمة a الحالية (3)، والجمع يديك 7، و*p في الشمال بتكتبها مكان a. سطر واحد فيه قراءة وكتابة من خلال الـ pointer."
  },
  {
   "task": "اكتب function `swapNums` بتبدل قيمتين باستخدام references وجربها على 3 و 8",
   "code": "#include <iostream>\nusing namespace std;\n\nvoid swapNums(int& a, int& b) {\n    int temp = a;\n    a = b;\n    b = temp;\n}\n\nint main() {\n    int x = 3, y = 8;\n    swapNums(x, y);\n    cout << x << \" \" << y << endl;   // 8 3\n    return 0;\n}",
   "why": "الناتج: 8 3. جرب تشيل & من المعاملات: هتلاقي x و y فضلوا 3 و 8، لأن الـ function بدلت نسختين مش الأصل. دي أقوى تجربة تثبتلك فكرة المرجع."
  }
 ]
},
{
 "id": "structs",
 "nav": "الـ Structs",
 "title": "الـ Structs: اصنع نوع بيانات بتاعك",
 "subtitle": "اجمع بيانات مترابطة في كيان واحد: طالب، كتاب، نقطة",
 "blocks": [
  {
   "type": "p",
   "text": "الطالب عنده اسم وسن ومجموع. تخزنهم في 3 متغيرات منفصلة؟ لو عندك 30 طالب هيبقى عندك 90 متغير ولخبطة كاملة. الـ `struct` بتخلينا نصنع نوع بيانات جديد من عندنا: كيان واحد اسمه Student فيه كل الحقول دي مع بعض."
  },
  {
   "type": "code",
   "code": "#include <iostream>\n#include <string>\nusing namespace std;\n\nstruct Student {\n    string name;\n    int age;\n    double gpa;\n};\n\nint main() {\n    Student s1;\n    s1.name = \"Ahmed\";\n    s1.age = 20;\n    s1.gpa = 3.85;\n\n    cout << s1.name << \" عنده \" << s1.age << \" سنة ومجموعه \" << s1.gpa << endl;\n    return 0;\n}"
  },
  {
   "type": "code",
   "code": "# الناتج:\nAhmed عنده 20 سنة ومجموعه 3.85"
  },
  {
   "type": "p",
   "text": "الـ struct بتتعرف بره main (عادة فوق)، وبعدها `Student` بقى نوع زي `int` بالظبط: تعمل منه متغيرات براحتك. الوصول لأي حقل بالنقطة: `s1.name` و `s1.gpa`."
  },
  {
   "type": "h",
   "text": "قايمة من structs"
  },
  {
   "type": "code",
   "code": "Student group[3];\ngroup[0] = {\"Ahmed\", 20, 3.85};\ngroup[1] = {\"Mona\", 21, 3.92};\ngroup[2] = {\"Omar\", 19, 2.70};\n\nfor (int i = 0; i < 3; i++) {\n    cout << group[i].name << \": \" << group[i].gpa << endl;\n}"
  },
  {
   "type": "p",
   "text": "لاحظ الاختصار الجميل: `{\"Ahmed\", 20, 3.85}` بيعبي الحقول بالترتيب في سطر واحد. وarray من structs معناها: قايمة طلاب كاملة في متغير واحد."
  },
  {
   "type": "h",
   "text": "ابعت الـ struct لـ function"
  },
  {
   "type": "code",
   "code": "#include <iostream>\n#include <cmath>\nusing namespace std;\n\nstruct Point {\n    double x;\n    double y;\n};\n\ndouble distance(Point a, Point b) {\n    return sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));\n}\n\nint main() {\n    Point p1 = {0, 0};\n    Point p2 = {3, 4};\n    cout << distance(p1, p2) << endl;   // 5\n    return 0;\n}"
  },
  {
   "type": "p",
   "text": "المثال ده بيحسب المسافة بين نقطتين بقاعدة فيثاغورس (√(فرق السينات² + فرق الصادات²)): من (0,0) لـ (3,4) تطلع 5 بالظبط. لاحظ إن `sqrt` جاية من مكتبة `cmath`. الـ struct خلت الـ function تاخد \"نقطة\" واحدة بدل 4 متغيرات مبعثرين."
  },
  {
   "type": "note",
   "text": "struct ولا class؟ في C++ الاتنين توائم: الفرق الوحيد إن struct افتراضياً حقولها public و class افتراضياً private. القاعدة الشائعة: struct لمجموعة بيانات بسيطة زي دي، و class لما يبقى فيه سلوك ومنطق محتاج حماية. ده موضوع الدرس الجاي."
  }
 ],
 "quiz": [
  {
   "q": "عندك `Student s1;` وعايز توصل لاسم الطالب. إيه الصح؟",
   "options": [
    {
     "text": "s1->name",
     "mono": true
    },
    {
     "text": "s1.name",
     "mono": true
    },
    {
     "text": "Student.name",
     "mono": true
    }
   ],
   "answer": 1,
   "explain": "الوصول للحقول بالنقطة: s1.name. السهم -> بيستخدم مع pointers، و Student.name غلط لأن Student هو النوع مش المتغير."
  },
  {
   "q": "إيه الفرق الأساسي بين array و struct؟",
   "options": [
    {
     "text": "الـ array بتجمع عناصر من نفس النوع، والـ struct بتجمع حقول من أنواع مختلفة"
    },
    {
     "text": "مفيش فرق خالص، الاتنين بيجمعوا بيانات من أي نوع بنفس الطريقة والاستخدام"
    },
    {
     "text": "الـ struct أسرع من الـ array دايماً لأنه بيتخزن في مكان خاص بيه في الذاكرة"
    }
   ],
   "answer": 0,
   "explain": "int a[30] كلها ints زي بعض. Student فيه string و int و double جنب بعض تحت اسم واحد. دي القوة الحقيقية للـ struct."
  },
  {
   "q": "نقطتين: (0,0) و (3,4). المسافة بينهم بقاعدة فيثاغورس؟",
   "options": [
    {
     "text": "7"
    },
    {
     "text": "25"
    },
    {
     "text": "5"
    }
   ],
   "answer": 2,
   "explain": "√(9+16) = √25 = 5. المثلث 3-4-5 أشهر مثلث قائم في الرياضيات."
  }
 ],
 "exercises": [
  {
   "task": "اعمل struct باسم `Book` فيها title و author و pages، واعمل منها كتاب واطبع بياناته",
   "code": "#include <iostream>\n#include <string>\nusing namespace std;\n\nstruct Book {\n    string title;\n    string author;\n    int pages;\n};\n\nint main() {\n    Book b = {\"Clean Code\", \"Robert Martin\", 464};\n    cout << b.title << \" - \" << b.author << \" (\" << b.pages << \" صفحة)\" << endl;\n    return 0;\n}\n\n// الناتج: Clean Code - Robert Martin (464 صفحة)",
   "why": "لاحظ التعبئة المختصرة بقوسين معقوصين بالترتيب. الكتاب هنا كيان واحد فيه 3 معلومات، بدل 3 متغيرات منفصلة."
  },
  {
   "task": "استخدم struct النقطة وfunction المسافة من الدرس عشان تحسب المسافة بين (0,0) و (3,4)",
   "code": "#include <iostream>\n#include <cmath>\nusing namespace std;\n\nstruct Point {\n    double x;\n    double y;\n};\n\ndouble distance(Point a, Point b) {\n    return sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));\n}\n\nint main() {\n    Point p1 = {0, 0};\n    Point p2 = {3, 4};\n    cout << distance(p1, p2) << endl;\n    return 0;\n}\n\n// الناتج: 5",
   "why": "الناتج 5 (مثلث 3-4-5 الشهير). غير p2 لـ {6, 8} مثلاً وتوقع الناتج قبل التشغيل: هتطلع 10."
  }
 ]
},
{
 "id": "oop",
 "nav": "أساسيات OOP",
 "title": "أساسيات OOP: الـ Classes",
 "subtitle": "struct + functions + حماية = class: حساب بنكي كنموذج",
 "blocks": [
  {
   "type": "p",
   "text": "الـ struct من الدرس اللي فات بتجمع بيانات بس. الحياة الحقيقية فيها كيانات ليها بيانات **وسلوك**: الحساب البنكي عنده رصيد (بيانات) وبيدعم إيداع وسحب (سلوك). الـ `class` بتجمع الاتنين في مكان واحد، ودي فكرة الـ Object-Oriented Programming (OOP)."
  },
  {
   "type": "code",
   "code": "#include <iostream>\nusing namespace std;\n\nclass BankAccount {\nprivate:\n    double balance;   // محمي: ممنوع يتعدل بره الكلاس\n\npublic:\n    BankAccount() {   // constructor: بينفذ لما الكائن يتعمل\n        balance = 0;\n    }\n    void deposit(double amount) {\n        balance += amount;\n    }\n    void withdraw(double amount) {\n        if (amount <= balance) {\n            balance -= amount;\n        } else {\n            cout << \"رصيد مش كفاية!\" << endl;\n        }\n    }\n    double getBalance() {\n        return balance;\n    }\n};"
  },
  {
   "type": "code",
   "code": "int main() {\n    BankAccount acc;\n    acc.deposit(100);\n    acc.withdraw(30);\n    cout << acc.getBalance() << endl;   // 70\n    acc.withdraw(500);                  // رصيد مش كفاية!\n    return 0;\n}"
  },
  {
   "type": "h",
   "text": "private و public: بوابة الكلاس"
  },
  {
   "type": "list",
   "items": [
    "private: متاحة بس جوه الكلاس نفسه. balance هنا محمي: محدش يقدر يكتب acc.balance = -1000000 من بره.",
    "public: متاحة لأي حد. الإيداع والسحب والاستعلام بيحصل من خلالها بس.",
    "الـ constructor: function خاصة اسمها نفس اسم الكلاس، بتتنفذ أوتوماتيك لما الكائن يتعمل. مثالية للقيم الابتدائية."
   ]
  },
  {
   "type": "p",
   "text": "الفكرة دي اسمها encapsulation (التغليف): البيانات متغلّفة جوه الكلاس، والعالم الخارجي بيتعامل معاها من خلال methods مضبوطة. الرصيد مستحيل يبقى سالب بالغلط، لأن الطريق الوحيد لتغييره بيفحص الأول."
  },
  {
   "type": "h",
   "text": "constructor بمعاملات"
  },
  {
   "type": "code",
   "code": "class Rectangle {\nprivate:\n    double width, height;\npublic:\n    Rectangle(double w, double h) {\n        width = w;\n        height = h;\n    }\n    double area() {\n        return width * height;\n    }\n};\n\nint main() {\n    Rectangle r(5, 3);\n    cout << r.area() << endl;   // 15\n    return 0;\n}"
  },
  {
   "type": "h",
   "text": "struct vs class: الفرق الرسمي"
  },
  {
   "type": "p",
   "text": "في C++ الفرق الوحيد الحقيقي: حقول الـ struct الافتراضية `public`، وحقول الـ class الافتراضية `private`. غير كده الاتنين قادرين على نفس الحاجات. العرف: struct لتجميعة بيانات بسيطة، class لكيان له سلوك وقواعد حماية."
  },
  {
   "type": "note",
   "text": "OOP أكبر من كده بكتير: فيه وراثة (inheritance) وتعدد أشكال (polymorphism) ومواضيع تقيلة. بس الأساس هو اللي شوفناه: كيان بيجمع بيانات وسلوك ويحمي نفسه. الباقي بناء على الفكرة دي، وهتاخده في الكورسات المتقدمة."
  }
 ],
 "quiz": [
  {
   "q": "إيه الوضع الافتراضي لحقول الـ class لو مكتبتش public ولا private؟",
   "options": [
    {
     "text": "public"
    },
    {
     "text": "private"
    },
    {
     "text": "protected"
    }
   ],
   "answer": 1,
   "explain": "في class كل حاجة private افتراضياً لحد ما تكتب public:. في struct العكس: كل حاجة public افتراضياً."
  },
  {
   "q": "إيه اسم الـ constructor بتاع كلاس اسمه `Rectangle`؟",
   "options": [
    {
     "text": "constructor",
     "mono": true
    },
    {
     "text": "Rectangle",
     "mono": true
    },
    {
     "text": "init",
     "mono": true
    }
   ],
   "answer": 1,
   "explain": "الـ constructor دايماً نفس اسم الكلاس بالظبط، ومش بيرجع أي نوع حتى void. بينفذ لحظة إنشاء الكائن."
  },
  {
   "q": "ليه خلينا `balance` خاص (private) في حسابنا البنكي؟",
   "options": [
    {
     "text": "عشان الكود يبقى أقصر وأسهل في القراءة من غير دوال زيادة، ومحدش هيحتاج يعدله بعد كده"
    },
    {
     "text": "عشان محدش يقدر يغير الرصيد من بره من غير ما يعدي على قواعد الكلاس (زي منع السالب)"
    },
    {
     "text": "لأن double ممنوع تبقى public في أي كلاس بحسب قواعد اللغة، وهيطلع error لو عملناها"
    }
   ],
   "answer": 1,
   "explain": "دي فكرة الـ encapsulation: البيانات محمية، والتعديل بيحصل بس من خلال methods بتفحص صحة العملية."
  }
 ],
 "exercises": [
  {
   "task": "اكتب class باسم `Rectangle` فيها constructor بياخد الطول والعرض وmethod `area` بترجع المساحة، واحسب مساحة 5 في 3",
   "code": "#include <iostream>\nusing namespace std;\n\nclass Rectangle {\nprivate:\n    double width, height;\npublic:\n    Rectangle(double w, double h) {\n        width = w;\n        height = h;\n    }\n    double area() {\n        return width * height;\n    }\n};\n\nint main() {\n    Rectangle r(5, 3);\n    cout << r.area() << endl;\n    return 0;\n}\n\n// الناتج: 15",
   "why": "الناتج 15. لاحظ إن width و height مخفيين (private): الطريق الوحيد للمساحة هو method area. جرب تعمل Rectangle r(10, 2) وتوقع الناتج قبل التشغيل."
  },
  {
   "task": "مدد class الحساب البنكي: ضيف method `transferTo(BankAccount& other, double amount)` بتحول فلوس من حساب لحساب مع فحص الرصيد",
   "code": "void transferTo(BankAccount& other, double amount) {\n    if (amount <= balance) {\n        balance -= amount;\n        other.deposit(amount);\n        cout << \"تم التحويل ✅\" << endl;\n    } else {\n        cout << \"رصيد مش كفاية للتحويل!\" << endl;\n    }\n}\n\n// تجربة في main:\n// BankAccount a, b;\n// a.deposit(100);\n// a.transferTo(b, 40);\n// cout << a.getBalance() << endl;   // 60\n// cout << b.getBalance() << endl;   // 40",
   "why": "لاحظ إن الـ method بتتعامل مع كائن تاني من نفس الكلاس بسهولة، وإننا استخدمنا deposit بتاع الحساب التاني بدل ما نلمس balance بتاعه مباشرة. المعامل BankAccount& reference عشان نعدل الأصل."
  }
 ]
},
{
 "id": "stl",
 "nav": "مقدمة STL",
 "title": "مقدمة STL: vector و map",
 "subtitle": "مكتبة C++ الجاهزة: قوايم بتكبر لوحدها وقواميس بمفاتيح",
 "blocks": [
  {
   "type": "p",
   "text": "الـ STL (Standard Template Library) هي كنز C++: هياكل بيانات وخوارزميات جاهزة، مكتوبة باحتراف ومتحسنة للأداء. بدل ما تبني كل حاجة بإيدك، تستعمل أدوات جاهزة مضمونة. أهم اثنين هتستخدمهم كل يوم: `vector` و `map`."
  },
  {
   "type": "h",
   "text": "vector: array بتكبر لوحدها"
  },
  {
   "type": "code",
   "code": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> nums;\n    nums.push_back(4);\n    nums.push_back(8);\n    nums.push_back(15);\n\n    cout << nums.size() << endl;   // 3\n    for (int n : nums) {\n        cout << n << \" \";\n    }\n    cout << endl;                  // 4 8 15\n\n    int sum = 0;\n    for (int n : nums) sum += n;\n    cout << sum << endl;           // 27\n    return 0;\n}"
  },
  {
   "type": "p",
   "text": "`push_back` بتضيف عنصر في الآخر والـ vector بتكبر لوحدها: مفيش حجم ثابت زي الـ array. `size()` بتديك العدد الحالي. واللوب `for (int n : nums)` (اسمها range-based for) بتلف على كل العناصر من غير index خالص: اقرأها \"لكل n في nums\"."
  },
  {
   "type": "table",
   "head": [
    "وجه المقارنة",
    "int arr[6]",
    "vector<int>"
   ],
   "rows": [
    [
     "الحجم",
     "ثابت من لحظة الإنشاء",
     "بيكبر ويصغر وقت التشغيل"
    ],
    [
     "معرفة العدد",
     "تحسبه بنفسك",
     "size() جاهزة"
    ],
    [
     "الحماية",
     "مفيش مراقبة حدود",
     "أأمن، وفيه at() بتراقب"
    ],
    [
     "الاستخدام",
     "أساس نظري مهم",
     "الاختيار اليومي الفعلي"
    ]
   ]
  },
  {
   "type": "h",
   "text": "map: قاموس بمفاتيح"
  },
  {
   "type": "code",
   "code": "#include <iostream>\n#include <map>\n#include <string>\nusing namespace std;\n\nint main() {\n    map<string, int> grades;\n    grades[\"Ali\"] = 85;\n    grades[\"Mona\"] = 92;\n    grades[\"Omar\"] = 78;\n\n    cout << grades[\"Mona\"] << endl;     // 92\n    cout << grades.count(\"Mona\") << endl;  // 1: موجودة\n    cout << grades.count(\"Sara\") << endl;  // 0: مش موجودة\n\n    for (auto& p : grades) {\n        cout << p.first << \": \" << p.second << endl;\n    }\n    return 0;\n}"
  },
  {
   "type": "code",
   "code": "# ناتج اللفة الأخيرة (map مترتبة بالمفتاح تلقائياً):\nAli: 85\nMona: 92\nOmar: 78"
  },
  {
   "type": "p",
   "text": "الـ map بتربط مفتاح (key) بقيمة (value): الاسم بالدرجة. `count` بتقولك المفتاح موجود ولا لأ (1 أو 0): افحص بيها قبل ما تقرأ مفتاح مش متأكد منه، لأن قراءة مفتاح مش موجود بـ `[]` بتنشئه بقيمة صفر! ولاحظ إن اللفة طلعت مترتبة أبجدياً: map بتحافظ على مفاتيحها مرتبة."
  },
  {
   "type": "h",
   "text": "sort: ترتيب في سطر"
  },
  {
   "type": "code",
   "code": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {42, 7, 19, 3};\n    sort(nums.begin(), nums.end());\n    for (int n : nums) {\n        cout << n << \" \";\n    }\n    cout << endl;   // 3 7 19 42\n    return 0;\n}"
  },
  {
   "type": "p",
   "text": "`sort` من مكتبة `algorithm` بترتب أي vector في سطر واحد. الوسيطتين `begin()` و `end()` معناهم: من أول عنصر لآخر عنصر."
  },
  {
   "type": "note",
   "text": "دي بس رشة من STL: فيه كمان set و stack و queue و pair وخوارزميات كتير. لو ناوي تدخل competitive programming، الـ STL هي سلاحك الأساسي: محدش هناك بيكتب sort بإيده."
  }
 ],
 "quiz": [
  {
   "q": "إيه أكبر ميزة لـ `vector` على الـ array التقليدية؟",
   "options": [
    {
     "text": "حجمها بيكبر ويصغر وقت التشغيل حسب الحاجة"
    },
    {
     "text": "بتتعرف من غير #include لأنها جزء من اللغة الأساسية"
    },
    {
     "text": "بتخزن أنواع مختلفة في نفس الـ vector بدون أي قيود"
    }
   ],
   "answer": 0,
   "explain": "الـ array حجمها ثابت من لحظة الإنشاء، vector بتكبر مع push_back. وكل عناصر vector من نوع واحد برضه."
  },
  {
   "q": "لو `grades[\"Sara\"]` مش موجودة في الـ map، إيه أأمن طريقة تتأكد بيها قبل القراءة؟",
   "options": [
    {
     "text": "grades.count(\"Sara\") لو رجعت 1 يبقى موجودة"
    },
    {
     "text": "أقرأها عادي، ولو رجعت صفر يبقى مش موجودة في الـ map"
    },
    {
     "text": "مفيش طريقة آمنة، لازم تقرا وتستنى لو البرنامج وقع"
    }
   ],
   "answer": 0,
   "explain": "count بترجع 1 لو المفتاح موجود و0 لو مش موجود. القراءة المباشرة بـ [] بتنشئ المفتاح بقيمة صفرية لو مش موجود، ودي غلطة شائعة."
  },
  {
   "q": "عايز ترتب `vector<int> v` تصاعدياً. إيه السطر الصح؟",
   "options": [
    {
     "text": "v.sort(); لأن الـ vector ليها دالة sort جوه الكلاس نفسه",
     "mono": true
    },
    {
     "text": "sort(v.begin(), v.end());",
     "mono": true
    },
    {
     "text": "sort(v); من غير ما تحدد بداية ونهاية لأن الدالة بتعرفهم",
     "mono": true
    }
   ],
   "answer": 1,
   "explain": "sort function حرة من مكتبة algorithm بتاخد بداية ونهاية المدى. vector مش فيها method اسمها sort."
  }
 ],
 "exercises": [
  {
   "task": "اعمل `vector<double>` فيها درجات واحسب متوسطها",
   "code": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<double> grades = {90, 80, 70};\n    double sum = 0;\n    for (double g : grades) sum += g;\n    cout << sum / grades.size() << endl;\n    return 0;\n}\n\n// الناتج: 80",
   "why": "الناتج 80. لاحظ إن size() بترجع العدد الحالي مهما كبرت القايمة: ضيف درجات زيادة والمتوسط هيتحسب صح من غير ما تعدل حاجة تانية."
  },
  {
   "task": "اكتب عداد كلمات: map بتعد كل كلمة جات كام مرة في قايمة",
   "code": "#include <iostream>\n#include <map>\n#include <string>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<string> words = {\"cat\", \"dog\", \"cat\", \"bird\", \"dog\", \"cat\"};\n    map<string, int> counts;\n    for (string w : words) counts[w]++;\n    for (auto& p : counts) {\n        cout << p.first << \": \" << p.second << endl;\n    }\n    return 0;\n}\n\n// الناتج:\n// bird: 1\n// cat: 3\n// dog: 2",
   "why": "counts[w]++ زيادة على القيمة الحالية للمفتاح، ولو أول مرة بتتعمل بصفر وتبقى 1. لاحظ الترتيب الأبجدي في الناتج: دي خاصية map. الفكرة دي هي أساس أي تحليل تكرارات."
  }
 ]
},
{
 "id": "capstone",
 "nav": "المشروع الختامي",
 "title": "المشروع الختامي: نظام إدارة درجات الطلاب",
 "subtitle": "كل اللي اتعلمته في برنامج console واحد حقيقي: struct + vector + functions + menu",
 "blocks": [
  {
   "type": "p",
   "text": "وصلت للمحطة الأخيرة. المشروع ده مش درس فيه حاجة جديدة: هو تجميعة لكل اللي فات في برنامج واحد حقيقي بتشغله وتستخدمه. هنبني نظام إدارة درجات طلاب كامل: إضافة، عرض، بحث، متوسط، وأعلى درجة، كل ده من منيو تفاعلي."
  },
  {
   "type": "h",
   "text": "المطلوب"
  },
  {
   "type": "list",
   "items": [
    "منيو بتتكرر لحد ما المستخدم يختار خروج.",
    "إضافة طالب جديد: اسمه ودرجته.",
    "عرض كل الطلاب المسجلين مرقمين.",
    "البحث عن طالب بالاسم وعرض درجته.",
    "حساب متوسط الدرجات.",
    "إيجاد الطالب صاحب أعلى درجة."
   ]
  },
  {
   "type": "h",
   "text": "التصميم قبل الكود"
  },
  {
   "type": "list",
   "items": [
    "struct Student: يجمع اسم الطالب ودرجته (درس 11).",
    "vector<Student>: يخزن القايمة كلها وتكبر لوحدها (درس 13).",
    "function لكل ميزة: addStudent و showAll و searchStudent و average و topStudent (درس 9).",
    "do..while + switch: منيو تظهر مرة على الأقل وتتكرر لحد الخروج (دروس 6 و 7).",
    "vector<Student>& بالمرجع: عشان كل function تعدل نفس القايمة الأصلية (درس 10)."
   ]
  },
  {
   "type": "code",
   "code": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nstruct Student {\n    string name;\n    double grade;\n};\n\nvoid printMenu() {\n    cout << \"\\n===== نظام إدارة الدرجات =====\" << endl;\n    cout << \"1) أضف طالب\" << endl;\n    cout << \"2) اعرض كل الطلاب\" << endl;\n    cout << \"3) ابحث عن طالب\" << endl;\n    cout << \"4) متوسط الدرجات\" << endl;\n    cout << \"5) أعلى درجة\" << endl;\n    cout << \"0) خروج\" << endl;\n    cout << \"اختيارك: \";\n}\n\nvoid addStudent(vector<Student>& students) {\n    Student s;\n    cout << \"اسم الطالب: \";\n    cin >> s.name;\n    cout << \"درجته: \";\n    cin >> s.grade;\n    students.push_back(s);\n    cout << \"تمت الإضافة ✅\" << endl;\n}\n\nvoid showAll(const vector<Student>& students) {\n    if (students.empty()) {\n        cout << \"مفيش طلاب لسه.\" << endl;\n        return;\n    }\n    for (int i = 0; i < (int)students.size(); i++) {\n        cout << i + 1 << \". \" << students[i].name << \" - \" << students[i].grade << endl;\n    }\n}\n\nvoid searchStudent(const vector<Student>& students) {\n    string name;\n    cout << \"اسم الطالب اللي بتدور عليه: \";\n    cin >> name;\n    for (auto& s : students) {\n        if (s.name == name) {\n            cout << \"لقيناه! درجته: \" << s.grade << endl;\n            return;\n        }\n    }\n    cout << \"مش موجود.\" << endl;\n}\n\nvoid average(const vector<Student>& students) {\n    if (students.empty()) {\n        cout << \"مفيش درجات لسه.\" << endl;\n        return;\n    }\n    double sum = 0;\n    for (auto& s : students) sum += s.grade;\n    cout << \"المتوسط: \" << sum / students.size() << endl;\n}\n\nvoid topStudent(const vector<Student>& students) {\n    if (students.empty()) {\n        cout << \"مفيش طلاب لسه.\" << endl;\n        return;\n    }\n    int top = 0;\n    for (int i = 1; i < (int)students.size(); i++) {\n        if (students[i].grade > students[top].grade) top = i;\n    }\n    cout << \"الأول على الدفعة: \" << students[top].name\n         << \" بدرجة \" << students[top].grade << endl;\n}\n\nint main() {\n    vector<Student> students;\n    int choice;\n    do {\n        printMenu();\n        cin >> choice;\n        switch (choice) {\n            case 1: addStudent(students); break;\n            case 2: showAll(students); break;\n            case 3: searchStudent(students); break;\n            case 4: average(students); break;\n            case 5: topStudent(students); break;\n            case 0: cout << \"مع السلامة! 👋\" << endl; break;\n            default: cout << \"اختيار مش معروف، جرب تاني.\" << endl;\n        }\n    } while (choice != 0);\n    return 0;\n}"
  },
  {
   "type": "h",
   "text": "تجربة حقيقية للبرنامج"
  },
  {
   "type": "code",
   "code": "# ضفنا Ahmed (95) و Mona (88) و Omar (72)، وبعدين:\n# اختيار 2:\n1. Ahmed - 95\n2. Mona - 88\n3. Omar - 72\n\n# اختيار 3 وكتبنا Mona:\nلقيناه! درجته: 88\n\n# اختيار 4:\nالمتوسط: 85\n\n# اختيار 5:\nالأول على الدفعة: Ahmed بدرجة 95\n\n# اختيار 0:\nمع السلامة! 👋"
  },
  {
   "type": "p",
   "text": "الكود كله اتجرب فعلاً: ضفنا 3 طلاب وجربنا كل اختيار، والنتايج اللي فوق دي مأخوذة من تشغيلة حقيقية. انسخه عندك، ترجمه بـ `g++ main.cpp -o grades`، شغله، واطمن عليه بنفسك."
  },
  {
   "type": "h",
   "text": "نقط تستاهل تاخد بالك منها"
  },
  {
   "type": "list",
   "items": [
    "(int)students.size(): size() بترجع نوع unsigned، والتحويل لـ int بيسكت تحذير المقارنة بين أنواع مختلفة.",
    "const vector<Student>& في functions القراءة بس: المرجع بيمنع النسخة (سرعة)، و const بيضمن إننا مش هنعدل بالغلط.",
    "كل function بتفحص القايمة الفاضية قبل ما تشتغل: المتوسط على صفر قايمة كان هيعمل قسمة على صفر.",
    "topStudent بيستخدم نمط \"افترض وتحدى\" من درس الشروط: افترض إن الأول هو الأعلى، وتحدى الباقي واحد واحد."
   ]
  },
  {
   "type": "h",
   "text": "مدد المشروع بنفسك"
  },
  {
   "type": "list",
   "items": [
    "ضيف خيار مسح طالب بالاسم (تمرين 1 تحت).",
    "ضيف حفظ وتحميل من ملف عشان البيانات متضيعش لما البرنامج يقفل (تمرين 2).",
    "رتب الطلاب بالدرجة قبل العرض بـ sort.",
    "استخدم map<string, double> بدل vector لو عايز بحث أسرع بالاسم.",
    "خليه يقرأ أسماء عربية بمسافات بـ getline."
   ]
  },
  {
   "type": "note",
   "text": "خلصت الرحلة! 🎉 انت دلوقتي عارف المتغيرات والشروط واللوبات والـ functions والـ pointers والـ structs والـ OOP والـ STL. دي قاعدة C++ كلها. الخطوة الجاية: اتمرن على مسائل (Codeforces أو HackerRank)، وارجع لأي درس لما تحس إن حاجة هربت منك."
  }
 ],
 "quiz": [
  {
   "q": "ليه استخدمنا `vector<Student>` بدل `Student students[100]` في المشروع؟",
   "options": [
    {
     "text": "عشان الـ vector بتكبر حسب عدد الطلاب الفعلي من غير حد ثابت"
    },
    {
     "text": "لأن الـ array ممنوعة في C++ الحديثة ومبقاش ينفع تستخدمها"
    },
    {
     "text": "عشان الشكل أحلى بس، ومفيش فرق في الأداء أو المرونة"
    }
   ],
   "answer": 0,
   "explain": "مش عارفين عدد الطلاب مسبقاً: ممكن 3 وممكن 300. الـ vector بتكبر مع push_back من غير ما نحدد سقف ونخاف نوصله."
  },
  {
   "q": "ليه كل ميزة في function لوحدها بدل ما نحط كل الكود في main؟",
   "options": [
    {
     "text": "عشان البرنامج يبقى أبطأ وأكتر تعقيداً، وده مفيد في التعلم لأن الأخطاء بتبان أسرع"
    },
    {
     "text": "عشان كل قطعة سهلة القراءة والتجربة والتعديل لوحدها، وmain تفضل خريطة واضحة"
    },
    {
     "text": "لأن main فيها حد أقصى للأسطر ومينفعش نكتب فيها أكتر من كده في أي compiler"
    }
   ],
   "answer": 1,
   "explain": "main بقت خريطة: منيو وswitch بس. كل تفصيلة في function ليها اسم واضح. لو في غلطة في البحث، تعرف تروح فين فوراً."
  },
  {
   "q": "ليه اخترنا `do..while` للمنيو بدل `while` عادية؟",
   "options": [
    {
     "text": "عشان المنيو تظهر مرة واحدة على الأقل قبل فحص شرط الخروج"
    },
    {
     "text": "لأنها أسرع من while في كل الحالات وبتوفر خطوة في الترجمة"
    },
    {
     "text": "لأن while مش بتقبل switch جواها وبتدي error وقت الترجمة"
    }
   ],
   "answer": 0,
   "explain": "do..while بتنفذ الجسم الأول وبعدين تفحص الشرط: المنيو تظهر، المستخدم يختار، وبعدين نسأل \"كان صفر؟\". while العادية كانت هتحتاج طباعة المنيو مرة بره اللوب."
  }
 ],
 "exercises": [
  {
   "task": "ضيف ميزة مسح طالب: اكتب function `deleteStudent` بتمسح طالب بالاسم من الـ vector",
   "code": "void deleteStudent(vector<Student>& students) {\n    string name;\n    cout << \"اسم الطالب اللي هتمسحه: \";\n    cin >> name;\n    for (int i = 0; i < (int)students.size(); i++) {\n        if (students[i].name == name) {\n            students.erase(students.begin() + i);\n            cout << \"اتمسح ✅\" << endl;\n            return;\n        }\n    }\n    cout << \"مش موجود.\" << endl;\n}\n\n// ضيف case 6 في الـ switch وسطر \"6. مسح طالب\" في المنيو\n// بعد مسح Mona من قايمة فيها Ahmed و Mona:\n// الباقي: 1\n// Ahmed",
   "why": "vector.erase(begin() + i) بتمسح العنصر رقم i وتزحلق الباقي. جربها: ضيف طالبين، امسح التاني، واطبع العدد والأسماء. الناتج المتحقق منه: الباقي 1 و Ahmed."
  },
  {
   "task": "ضيف حفظ في ملف: عند الخروج اكتب كل طالب ودرجته في `students.txt`، وعند البداية اقراهم تاني",
   "code": "#include <fstream>   // ضيفها فوق\n\n// عند الخروج:\nofstream file(\"students.txt\");\nfor (auto& s : students) {\n    file << s.name << \" \" << s.grade << endl;\n}\nfile.close();\n\n// عند البداية (تحميل):\nifstream in(\"students.txt\");\nstring name; double grade;\nwhile (in >> name >> grade) {\n    students.push_back({name, grade});\n}\n\n// جرب: ضيف Ahmed 95 و Mona 88 واقفل،\n// وافتح تاني واطلب عرض الكل:\n// 1. Ahmed - 95\n// 2. Mona - 88",
   "why": "ofstream بيكتب و ifstream بيقرأ، وwhile (in >> ...) بتفضل تلف لحد ما الملف يخلص. كده برنامجك بقى بيفتكر بياناته بين التشغيلات زي البرامج الحقيقية."
  }
 ]
}
);
