export interface PromptPackItem {
  id: number;
  code: string; // e.g. "PROMPT 01"
  titleFa: string;
  category: 'research' | 'discovery' | 'communication' | 'meeting' | 'followup' | 'crm';
  categoryFa: string;
  objective: string;
  promptText: string;
  variablesNotice?: string;
  outputStructure?: string[];
  tips?: string[];
}

export interface PromptPackCategory {
  id: 'research' | 'discovery' | 'communication' | 'meeting' | 'followup' | 'crm';
  titleFa: string;
  titleEn: string;
  descriptionFa: string;
  color: string;
}

export const PROMPT_PACK_CATEGORIES: PromptPackCategory[] = [
  {
    id: 'research',
    titleFa: 'بخش اول: شناخت مشتری (Research)',
    titleEn: 'CUSTOMER RESEARCH',
    descriptionFa: 'استخراج Brief، تفکیک Fact از Hypothesis و شناسایی خلاءهای اطلاعاتی',
    color: 'emerald',
  },
  {
    id: 'discovery',
    titleFa: 'بخش دوم: کشف نیاز (Discovery)',
    titleEn: 'DISCOVERY',
    descriptionFa: 'طراحی سوالات عمیق، اولویت‌بندی سوالات و ساخت Meeting Brief',
    color: 'indigo',
  },
  {
    id: 'communication',
    titleFa: 'بخش سوم: ارتباطات شخصی‌سازی‌شده (Communication)',
    titleEn: 'PERSONALIZED COMMUNICATION',
    descriptionFa: 'نگارش پیام‌های اختصاصی B2B، کنترل ادعاهای بدون مدرک و تطبیق با Persona',
    color: 'amber',
  },
  {
    id: 'meeting',
    titleFa: 'بخش چهارم: مدیریت جلسه فروش (Meeting)',
    titleEn: 'MEETING',
    descriptionFa: 'سناریونویسی جلسه Discovery، شبیه‌سازی اعتراضات و آنالیز عملکرد فروشنده',
    color: 'rose',
  },
  {
    id: 'followup',
    titleFa: 'بخش پنجم: پیگیری تعاملات (Follow-up)',
    titleEn: 'FOLLOW-UP',
    descriptionFa: 'تبدیل یادداشت‌ها به Customer Insights، استخراج Pain Pointها و نگارش پیام پیگیری',
    color: 'cyan',
  },
  {
    id: 'crm',
    titleFa: 'بخش ششم: حافظه مشتری در CRM (Customer Memory)',
    titleEn: 'CRM & CUSTOMER MEMORY',
    descriptionFa: 'ساخت رکورد منسجم CRM و ایجاد حافظه یکپارچه مشتری برای تعاملات آتی',
    color: 'purple',
  },
];

export const PROMPT_PACK_ITEMS: PromptPackItem[] = [
  {
    id: 1,
    code: 'PROMPT 01',
    titleFa: 'ساخت Customer Research Brief',
    category: 'research',
    categoryFa: 'شناخت مشتری',
    objective: 'قبل از اینکه بخواهید به مشتری بفروشید، باید بدانید با چه سازمانی طرف هستید. این Prompt به شما کمک می‌کند اطلاعات اولیه مشتری را به یک Research Brief ساختاریافته تبدیل کنید.',
    promptText: `من یک فروشنده B2B هستم و می‌خواهم برای یک مشتری بالقوه تحقیق اولیه انجام دهم.

اطلاعاتی که در اختیار دارم:
- نام شرکت: [نام شرکت مشتری]
- حوزه فعالیت: [حوزه فعالیت]
- اندازه تقریبی: [تعداد کارمندان یا حجم]
- مخاطب اولیه: [نقش مخاطب]
- وضعیت کلی: [اطلاعات اولیه یا اخبار اخیر]

می‌خواهم یک Customer Research Brief برای آماده‌شدن قبل از اولین جلسه فروش ایجاد کنی.

خروجی را در این بخش‌ها سازمان‌دهی کن:
1. Company Overview
2. Business Model احتمالی
3. محصولات یا خدمات اصلی
4. مشتریان احتمالی شرکت
5. نشانه‌های رشد یا توسعه
6. چالش‌های احتمالی مرتبط با رشد
7. موضوعاتی که برای یک فروشنده B2B مهم هستند
8. اطلاعاتی که هنوز نداریم
9. فرضیه‌هایی که باید در جلسه اعتبارسنجی شوند
10. سؤالاتی که برای تکمیل شناخت مشتری باید مطرح شوند.

هرجا اطلاعات قطعی نداریم، آن را به‌عنوان واقعیت بیان نکن. واقعیت‌ها، فرضیه‌ها و اطلاعات ناشناخته را از یکدیگر جدا کن.`,
    variablesNotice: 'بخش‌های داخل [ ] را با اطلاعات واقعی مشتری جایگزین کنید.',
    outputStructure: [
      'یک Brief اولیه درباره مشتری که بتواند مبنای Research و Preparation قرار گیرد.',
      'تفکیک مشخص بین اطلاعات قطعی (Fact) و حدس‌ها (Hypothesis).',
    ],
    tips: [
      'اگر اطلاعات کافی ندارید، از AI نخواهید که جای خالی اطلاعات را با حدس پر کند. هدف این مرحله ایجاد نقشه اولیه شناخت مشتری است، نه تولید یک گزارش ظاهراً کامل اما غیرقابل اتکا.',
    ],
  },
  {
    id: 2,
    code: 'PROMPT 02',
    titleFa: 'تفکیک Fact ،Hypothesis و Unknown',
    category: 'research',
    categoryFa: 'شناخت مشتری',
    objective: 'یکی از مهم‌ترین خطرها، پذیرش فرضیات AI به عنوان واقعیت است. این پرامپت اطلاعات را تفکیک می‌کند تا دچار خطا نشوید.',
    promptText: `متن Research Brief زیر را بررسی کن.

اطلاعات را در سه دسته قرار بده:

1. FACT
اطلاعاتی که مستقیماً در داده‌های ارائه‌شده وجود دارند یا به‌طور قابل اتکا تأیید شده‌اند.

2. HYPOTHESIS
فرضیه‌هایی که ممکن است درست باشند اما هنوز باید با مشتری یا منبع معتبر اعتبارسنجی شوند.

3. UNKNOWN
اطلاعاتی که برای تصمیم‌گیری درباره مشتری به آن‌ها نیاز داریم اما هنوز در اختیار نداریم.

برای هر Hypothesis توضیح بده:
- این فرضیه بر چه نشانه‌ای بنا شده است؟
- چرا هنوز نمی‌توانیم آن را Fact بدانیم؟
- چه سؤال یا بن‌مایه‌ای می‌تواند آن را اعتبارسنجی کند؟

هیچ فرضیه‌ای را به Fact تبدیل نکن.

Research Brief:
[متن Research Brief را اینجا قرار بده]`,
    variablesNotice: 'خروجی Prompt 01 را در بخش پایانی وارد کنید.',
    outputStructure: [
      'یک جدول یا ساختار سه‌گانه شامل Fact ،Hypothesis و Unknown.',
    ],
    tips: [
      'این Prompt را جدی بگیرید. یکی از خطرات استفاده از AI در فروش این است که فرضیه‌های تولیدشده توسط AI به تدریج در ذهن فروشنده به «واقعیت درباره مشتری» تبدیل شوند.',
    ],
  },
  {
    id: 3,
    code: 'PROMPT 03',
    titleFa: 'پیدا کردن اطلاعات ناقص',
    category: 'research',
    categoryFa: 'شناخت مشتری',
    objective: 'قبل از تماس یا جلسه با مشتری، بدانید چه چیزهایی را هنوز نمی‌دانید تا در جلسه پرسشگری دقیقی داشته باشید.',
    promptText: `بر اساس Customer Research و تفکیک Fact / Hypothesis / Unknown که در اختیار تو قرار می‌دهم، مشخص کن برای اینکه بتوانم یک Discovery Meeting با این مشتری داشته باشم، چه اطلاعات مهمی هنوز ندارم.

اطلاعات ناقص را در این دسته‌ها بررسی کن:
- Business
- Operations
- People
- Decision Makers
- Current Process
- Potential Pain Points
- Existing Solutions
- Buying Process
- Budget
- Timeline
- Success Criteria

برای هر مورد مشخص کن:
1. چه چیزی را نمی‌دانیم؟
2. چرا دانستن آن برای فروش مهم است؟
3. آیا بهتر است قبل از جلسه آن را تحقیق کنیم یا در جلسه از مشتری بپرسیم؟
4. اگر باید در جلسه پرسیده شود، یک سؤال مناسب پیشنهاد بده.

از حدس‌زدن اطلاعات مشتری خودداری کن.`,
    outputStructure: [
      'فهرستی از اطلاعاتی که باید قبل یا در طول Discovery Meeting به دست آورید.',
    ],
  },
  {
    id: 4,
    code: 'PROMPT 04',
    titleFa: 'های فروش Hypothesis',
    category: 'research',
    categoryFa: 'شناخت مشتری',
    objective: 'فروشنده نباید با ذهن خالی یا با فرضیات قطعی وارد جلسه شود؛ بلکه باید با فرضیات قابل بررسی آماده شود.',
    promptText: `بر اساس اطلاعات موجود درباره شرکت مشتری، حداکثر 5 Hypothesis درباره مشکلات یا فرصت‌های احتمالی این مشتری ایجاد کن.

برای هر Hypothesis این موارد را ارائه بده:
1. Hypothesis
2. نشانه‌هایی که باعث شده این فرضیه مطرح شود
3. چرا هنوز قطعی نیست
4. چه اطلاعاتی می‌تواند آن را تأیید یا رد کند
5. چه سؤال Discovery برای اعتبارسنجی آن مناسب است
6. اگر Hypothesis درست باشد، چه نوع پیامد کسب‌وکاری ممکن است ایجاد کند

از بیان فرضیه به‌عنوان واقعیت خودداری کن.`,
    outputStructure: [
      'حداکثر پنج Hypothesis قابل بررسی.',
    ],
    tips: [
      'هدف این تمرین فروش مستقیم نیست؛ هدف آماده‌شدن برای Discovery است.',
    ],
  },
  {
    id: 5,
    code: 'PROMPT 05',
    titleFa: 'تبدیل Hypothesis به Discovery Questions',
    category: 'discovery',
    categoryFa: 'کشف نیاز',
    objective: 'فقط زمانی فرضیه ارزشمند است که بتوانیم آن را با مشتری بررسی کنیم.',
    promptText: `این Hypothesisها را در اختیار داری:

[Hypothesisها را وارد کن]

برای هر Hypothesis سه سؤال Discovery طراحی کن.

سؤال‌ها باید:
- باز باشند.
- مشتری را به توضیح درباره وضعیت واقعی خود تشویق کنند.
- نباید Leading Question باشند.
- پاسخ بله/خیر ساده نداشته باشند.
- به فهم فرآیند فعلی مشتری کمک کنند.
- در صورت امکان، Pain Point ،Impact یا Desired Outcome را آشکار کنند.

برای هر سؤال توضیح بده که پاسخ آن چه چیزی را برای فروشنده روشن خواهد کرد.`,
    outputStructure: [
      'مجموعه‌ای از سؤال‌های Discovery که واقعاً برای کشف نیاز طراحی شده‌اند.',
    ],
  },
  {
    id: 6,
    code: 'PROMPT 06',
    titleFa: 'اولویت‌بندی سؤال‌های Discovery',
    category: 'discovery',
    categoryFa: 'کشف نیاز',
    objective: 'در جلسه فروش قرار نیست تمام سؤال‌ها را پشت سر هم از مشتری بپرسید، باید بر اساس اهمیت اولویت‌بندی شوند.',
    promptText: `این فهرست سؤالات Discovery را بررسی کن:

[سؤالات را وارد کن]

آن‌ها را در سه سطح اولویت‌بندی کن:

Priority 1:
سؤالاتی که اگر پاسخ آن‌ها را ندانیم، شناخت ما از مسئله مشتری ناقص می‌ماند.

Priority 2:
سؤالاتی که برای عمیق‌تر کردن شناخت مشتری مفید هستند.

Priority 3:
سؤالاتی که فقط در صورت وجود زمان یا نیاز به اطلاعات بیشتر مطرح می‌شوند.

برای هر سؤال دلیل اولویت آن را توضیح بده.
در پایان یک ترتیب پیشنهادی برای پرسیدن سؤالات در جلسه ارائه کن تا مکالمه طبیعی باشد و شبیه یک پرسشنامه خشک نشود.`,
    outputStructure: [
      'ترتیب پیشنهادی و سطح‌بندی‌شده سوالات Discovery.',
    ],
  },
  {
    id: 7,
    code: 'PROMPT 07',
    titleFa: 'ساخت Meeting Brief',
    category: 'discovery',
    categoryFa: 'کشف نیاز',
    objective: 'تمام اطلاعات مرحله Research و Discovery را به یک Brief عملی برای جلسه تبدیل می‌کند.',
    promptText: `من فردا با شرکت مشتری یک Discovery Meeting دارم.

اطلاعات زیر را در اختیار دارم:
- Customer Research: [وارد کن]
- Fact / Hypothesis / Unknown: [وارد کن]
- Discovery Questions: [وارد کن]

یک Meeting Brief عملی برای من آماده کن.

ساختار:
1. هدف جلسه
2. آنچه درباره مشتری می‌دانیم
3. مهم‌ترین Hypothesisها
4. مهم‌ترین چیزهایی که هنوز نمی‌دانیم
5. سؤالات کلیدی
6. موضوعاتی که نباید بدون تأیید مشتری درباره آن‌ها فرض قطعی داشته باشیم
7. نشانه‌هایی که باید هنگام صحبت مشتری به آن‌ها توجه کنم
8. اطلاعاتی که باید در پایان جلسه حتماً به دست آورم
9. های احتمالی Next Step

این Brief را برای استفاده سریع فروشنده قبل از جلسه بنویس، نه به شکل یک گزارش طولانی.`,
    outputStructure: [
      'یک برگ خلاصه اجرایی و کاربردی آماده برای روی میز جلسه فروشنده.',
    ],
  },
  {
    id: 8,
    code: 'PROMPT 08',
    titleFa: 'Role Play با مشتری',
    category: 'discovery',
    categoryFa: 'کشف نیاز',
    objective: 'قبل از جلسه واقعی، با AI جلسه را شبیه‌سازی کنید.',
    promptText: `می‌خواهم یک Discovery Meeting را تمرین کنم.

تو در نقش مدیر عملیات شرکت مشتری هستی و من در نقش فروشنده B2B هستم.

اطلاعاتی که درباره شرکت در اختیار من است:
[اطلاعات مشتری]

من جلسه را شروع می‌کنم و از تو سؤال می‌پرسم.

قوانین Role Play:
1. مانند یک مدیر واقعی پاسخ بده، نه مانند یک مدرس.
2. همه اطلاعات را از ابتدا در اختیار من قرار نده.
3. اگر سؤال من ضعیف یا کلی بود، پاسخ کوتاه‌تر و غیرشفاف‌تری بده.
4. اگر سؤال خوبی پرسیدم، اطلاعات بیشتری ارائه کن.
5. گاهی Objection مطرح کن.
6. گاهی اطلاعات ناقص یا مبهم ارائه کن تا من سؤال تکمیلی بپرسم.
7. تا زمانی که من سؤال نکرده‌ام، اطلاعات غیرضروری ارائه نکن.
8. بعد از پایان Role Play عملکرد من را بررسی کن.

پس از پایان جلسه، عملکرد من را در این موارد ارزیابی کن:
- Problem Discovery
- Question Quality
- Active Listening
- Follow-up Questions
- Assumption Handling
- Objection Handling
- Next Step`,
    outputStructure: [
      'یک سناریوی چت تعاملی زنده و در پایان کارنامه ارزیابی.',
    ],
  },
  {
    id: 9,
    code: 'PROMPT 09',
    titleFa: 'ساخت پیام اولیه Personalized',
    category: 'communication',
    categoryFa: 'ارتباطات',
    objective: 'پیام فروش نباید فقط درباره محصول شما باشد، بلکه باید به Context مشتری گره خورده باشد.',
    promptText: `می‌خواهم برای مدیر عملیات شرکت یک پیام اولیه بنویسم.

اطلاعاتی که درباره مشتری داریم:
[اطلاعات تأییدشده مشتری]

هدف پیام:
گرفتن یک Discovery Meeting کوتاه.

لحن:
حرفه‌ای، انسانی و غیرکلیشه‌ای.

پیام نباید:
- بیش از حد تبلیغاتی باشد.
- ادعای تأییدنشده درباره مشتری داشته باشد.
- وانمود کند که مشکل مشتری را قطعی می‌دانیم.
- با توضیح طولانی درباره محصول شروع شود.

پیام باید:
- نشان دهد که درباره مشتری Context داریم.
- دلیل منطقی برای ارتباط ایجاد کند.
- یک ارزش احتمالی را مطرح کند بدون اینکه آن را قطعی فرض کند.
- درخواست جلسه کوتاه و مشخص داشته باشد.

سه نسخه متفاوت ایجاد کن و در پایان توضیح بده تفاوت رویکرد هر نسخه چیست.`,
    outputStructure: [
      'سه متن پیام کوتاه B2B با زاویه دیدهای متنوع و بدون ادعاهای کاذب.',
    ],
  },
  {
    id: 10,
    code: 'PROMPT 10',
    titleFa: 'بیشتر Personalization',
    category: 'communication',
    categoryFa: 'ارتباطات',
    objective: 'مجبور کنید پیام بر اساس اطلاعات واقعی مشتری شخصی‌سازی شود نه جملات عمومی SaaS.',
    promptText: `پیام زیر را بررسی کن:

[پیام]

اطلاعات واقعی و تأییدشده درباره مشتری:
[اطلاعات]

پیام را طوری بازنویسی کن که Personalization آن افزایش پیدا کند.

اما فقط از اطلاعاتی استفاده کن که در داده‌های من وجود دارد.
هیچ اطلاعاتی درباره شرکت، مشکلات، اهداف یا تصمیم‌های مشتری را اختراع نکن.

در نسخه نهایی:
- جمله‌های کلی و قابل استفاده برای هر شرکتی را کاهش بده.
- ارتباط پیام با Context مشتری را افزایش بده.
- پیام را کوتاه نگه دار.
- لحن فروشنده‌ای که می‌خواهد مسئله مشتری را بفهمد حفظ کن، نه فروشنده‌ای که از قبل راه‌حل را قطعی می‌داند.

در پایان مشخص کن کدام قسمت‌های پیام بر اساس اطلاعات واقعی مشتری شخصی‌سازی شده‌اند.`,
    outputStructure: [
      'متن بازنویسی‌شده و هایلایت‌کننده ارکان Personalization واقعی.',
    ],
  },
  {
    id: 11,
    code: 'PROMPT 11',
    titleFa: 'بررسی ریسک ادعاهای پیام',
    category: 'communication',
    categoryFa: 'ارتباطات',
    objective: 'قبل از ارسال پیام، بررسی کنید آیا چیزی را بدون پشتوانه درباره مشتری بیان کرده‌اید یا خیر.',
    promptText: `این پیام فروش را بررسی کن:

[پیام]

آن را از نظر ادعاهای تأییدنشده درباره مشتری بررسی کن.

هر جمله را در یکی از این دسته‌ها قرار بده:

FACT: اطلاعاتی که در داده‌های من وجود دارد.
INFERENCE: برداشتی که ممکن است منطقی باشد اما مستقیماً تأیید نشده است.
UNSUPPORTED CLAIM: ادعایی که اطلاعات کافی برای بیان آن نداریم.

برای هر INFERENCE یا UNSUPPORTED CLAIM توضیح بده چرا ریسک دارد.

سپس یک نسخه اصلاح‌شده ارائه کن که در آن هیچ ادعای تأییدنشده‌ای به‌عنوان واقعیت بیان نشده باشد.`,
    outputStructure: [
      'تفکیک جملات پیام و ارایه نسخه ایمن و اصلاح‌شده.',
    ],
  },
  {
    id: 12,
    code: 'PROMPT 12',
    titleFa: 'ساخت Persona برای Personaهای مختلف',
    category: 'communication',
    categoryFa: 'ارتباطات',
    objective: 'یک پیام واحد ممکن است برای همه Stakeholderها مناسب نباشد.',
    promptText: `بر اساس اطلاعات واقعی مشتری، یک پیام اولیه برای سه Persona مختلف ایجاد کن:
1. مدیر عملیات
2. مدیر منابع انسانی
3. مدیرعامل

هدف همه پیام‌ها:
گرفتن یک Discovery Conversation.

اطلاعات مشتری:
[اطلاعات]

برای هر Persona مشخص کن:
- دغدغه احتمالی او چیست؟
- چه چیزی نباید بدون تأیید درباره او فرض کنیم؟
- پیام چگونه باید تغییر کند؟
- چه Value Proposition احتمالی می‌تواند برای او مرتبط باشد؟

پیام‌ها را کوتاه و حرفه‌ای نگه دار و از ادعاهای تأییدنشده خودداری کن.`,
    outputStructure: [
      'سه نسخه متناسب با دغدغه ۳ مدیر و تصمیم‌گیرنده متفاوت.',
    ],
  },
  {
    id: 13,
    code: 'PROMPT 13',
    titleFa: 'ساخت سناریوی Discovery Meeting',
    category: 'meeting',
    categoryFa: 'جلسه فروش',
    objective: 'برای جلسه یک مسیر ذهنی داشته باشید، بدون اینکه مکالمه را به یک Script خشک تبدیل کنید.',
    promptText: `بر اساس Customer Research ،Hypothesisها و Discovery Questions زیر، یک سناریوی پیشنهادی برای Discovery Meeting ایجاد کن:

اطلاعات:
[اطلاعات]

سناریو باید شامل این مراحل باشد:
1. Opening
2. Establishing Context
3. Understanding Current Situation
4. Exploring Problems
5. Exploring Impact
6. Understanding Desired Outcome
7. Validating Hypothesis
8. Identifying Decision Process
9. Agreeing on Next Step

برای هر مرحله:
- هدف فروشنده را مشخص کن.
- یک یا دو سؤال نمونه ارائه بده.
- بگو فروشنده به چه نشانه‌هایی باید گوش کند.

این سناریو باید Guide باشد، نه Scriptی که فروشنده مجبور باشد کلمه به کلمه اجرا کند.`,
    outputStructure: [
      'راهنمای ۹ گانه نقشه راه جلسه Discovery.',
    ],
  },
  {
    id: 14,
    code: 'PROMPT 14',
    titleFa: 'شبیه‌سازی Objection',
    category: 'meeting',
    categoryFa: 'جلسه فروش',
    objective: 'فروشنده را برای مقاومت‌های احتمالی آماده کنید.',
    promptText: `تو در نقش یک مشتری بالقوه B2B قرار داری.

من فروشنده هستم.

بر اساس این Context مشتری:
[اطلاعات]

در طول Role Play حداقل پنج Objection متفاوت مطرح کن.
Objectionها را واقع‌گرایانه و متناسب با موقعیت مشتری ایجاد کن.

مثلاً ممکن است درباره:
- قیمت
- زمان
- اولویت
- راهکار فعلی
- ریسک تغییر
- اعتماد
- پیچیدگی اجرا
باشد.

همه Objectionها را پشت سر هم مطرح نکن؛ آن‌ها را در جریان مکالمه مطرح کن.

بعد از پایان Role Play، برای هر پاسخ من بررسی کن:
1. آیا به Objection واقعی پاسخ دادم؟
2. آیا خیلی سریع وارد دفاع از محصول شدم؟
3. آیا سؤال مناسبی پرسیدم؟
4. آیا نیاز واقعی پشت Objection را کشف کردم؟
5. آیا Next Step مناسبی پیشنهاد کردم؟`,
    outputStructure: [
      'محیط شبیه‌ساز چالش اعتراضات و نقد پاسخ‌های فروشنده.',
    ],
  },
  {
    id: 15,
    code: 'PROMPT 15',
    titleFa: 'تحلیل عملکرد فروشنده در Role Play',
    category: 'meeting',
    categoryFa: 'جلسه فروش',
    objective: 'AI می‌تواند نقش Coach را نیز داشته باشد، نه فقط تمرین مکالمه.',
    promptText: `متن مکالمه زیر مربوط به یک Discovery Meeting است:

[Transcript]

به‌عنوان Sales Coach آن را تحلیل کن.

تحلیل را در این بخش‌ها ارائه بده:
1. نقاط قوت فروشنده
2. سؤال‌های خوب
3. سؤال‌های ضعیف
4. جاهایی که فروشنده فرض‌گذاری کرده است
5. جاهایی که فروشنده بیش از حد درباره محصول صحبت کرده است
6. فرصت‌هایی که برای کشف نیاز از دست رفته‌اند
7. هایی که به درستی مدیریت نشده‌اند
8. اطلاعات مهمی که هنوز درباره مشتری نداریم
9. سؤال‌هایی که فروشنده باید در ادامه مطرح کند
10. پیشنهادی Next Step

در پایان سه اقدام مشخص برای بهتر شدن جلسه بعدی ارائه کن.`,
    outputStructure: [
      'کارنامه و بازخورد ۱۰ بخشی حرفه‌ای مربی فروش.',
    ],
  },
  {
    id: 16,
    code: 'PROMPT 16',
    titleFa: 'تبدیل Meeting Notes به Customer Insights',
    category: 'followup',
    categoryFa: 'پیگیری',
    objective: 'اطلاعات جلسه نباید در یک متن طولانی باقی بماند.',
    promptText: `یادداشت‌های جلسه زیر را به Customer Insights ساختاریافته تبدیل کن:

[Meeting Notes]

اطلاعات را در این بخش‌ها سازمان‌دهی کن:
- Customer Situation
- Current Process
- Pain Points
- Business Impact
- Needs
- Desired Outcomes
- Stakeholders
- Objections
- Decision Process
- Timeline
- Open Questions
- Commitments
- Next Steps

اگر اطلاعاتی در یادداشت‌ها وجود ندارد، آن را خالی بگذار یا با عبارت "اطلاعات موجود نیست" مشخص کن.
اطلاعات جدید اختراع نکن.`,
    outputStructure: [
      'دسته‌بندی ۱۳‌گانه نکات کلیدی جلسات برای تصمیم‌گیری بعدی.',
    ],
  },
  {
    id: 17,
    code: 'PROMPT 17',
    titleFa: 'استخراج نیاز، Pain Point و Objection',
    category: 'followup',
    categoryFa: 'پیگیری',
    objective: 'در بسیاری از جلسات، مشتری یک موضوع را بیان می‌کند اما فروشنده باید بفهمد این موضوع دقیقاً به چه معناست.',
    promptText: `این Meeting Transcript را بررسی کن:

[Transcript]

تمام موارد مرتبط با Customer Need ،Pain Point ،Business Impact و Objection را استخراج کن.

برای هر مورد مشخص کن:
1. Customer Statement
2. Need
3. Pain Point
4. Business Impact
5. Evidence موجود در مکالمه
6. آیا این مورد Fact است یا Interpretation؟
7. چه چیزی هنوز باید با مشتری اعتبارسنجی شود؟

هیچ Interpretation را به‌عنوان نقل‌قول مشتری ارائه نکن.`,
    outputStructure: [
      'جدول ۷ ستونه تحلیل ریز صحبت‌های خریدار در جلسه.',
    ],
  },
  {
    id: 18,
    code: 'PROMPT 18',
    titleFa: 'ساخت Follow-up Message',
    category: 'followup',
    categoryFa: 'پیگیری',
    objective: 'بعد از جلسه، Follow-up باید نشان دهد که فروشنده واقعاً به صحبت‌های مشتری توجه کرده است.',
    promptText: `بر اساس اطلاعات جلسه زیر یک Follow-up Message برای مشتری بنویس:

[Customer Insights]

پیام باید شامل این موارد باشد:
1. تشکر کوتاه
2. اشاره به نکات اصلی مطرح‌شده توسط مشتری
3. تأیید مواردی که به‌عنوان نیاز یا مسئله مطرح شده‌اند
4. مشخص کردن مواردی که هنوز نیاز به بررسی دارند
5. توافق‌های جلسه
6. Next Step
7. زمان یا اقدام بعدی در صورت مشخص بودن

از اضافه کردن اطلاعاتی که در جلسه مطرح نشده خودداری کن.

لحن: حرفه‌ای، کوتاه، انسانی و مشتری‌محور.`,
    outputStructure: [
      'یک ایمیل یا پیام پیگیری بسیار دقیق، حرفه‌ای و مرتبط با جلسه.',
    ],
  },
  {
    id: 19,
    code: 'PROMPT 19',
    titleFa: 'ساخت CRM Record',
    category: 'crm',
    categoryFa: 'حافظه CRM',
    objective: 'اطلاعات جلسه باید به شکلی ثبت شود که فروشنده یا همکار دیگری بتواند در آینده آن را بفهمد و استفاده کند.',
    promptText: `بر اساس تمام اطلاعاتی که درباره شرکت مشتری در اختیار داری، یک CRM Record ساختاریافته ایجاد کن.

اطلاعات را در این بخش‌ها ارائه بده:
- Account Overview
- Key Contacts
- Business Context
- Current Situation
- Customer Needs
- Pain Points
- Potential Business Impact
- Current Solution
- Stakeholders
- Decision Maker
- Decision Process
- Budget
- Timeline
- Objections
- Competitive Context
- Commitments
- Next Action
- Open Questions
- Last Interaction Summary

فقط اطلاعاتی را ثبت کن که در داده‌های ارائه‌شده وجود دارند.
مواردی که مشخص نیستند را به‌عنوان Unknown مشخص کن.
Fact را با Interpretation ترکیب نکن.`,
    outputStructure: [
      'رکورد کامل ۱۹ بخشی آمادگی انتقال مستقیم به سیستم CRM.',
    ],
  },
  {
    id: 20,
    code: 'PROMPT 20',
    titleFa: 'ساخت Customer Memory',
    category: 'crm',
    categoryFa: 'حافظه CRM',
    objective: 'آخرین Prompt مجموعه برای این است که یک حافظه ساختاریافته از مشتری ایجاد کنیم که بتواند مبنای تعاملات بعدی قرار گیرد.',
    promptText: `می‌خواهم برای مشتری یک Customer Memory ایجاد کنم.

تمام اطلاعات زیر را در اختیار تو قرار می‌دهم:
- Customer Research: [Research]
- Fact / Hypothesis / Unknown: [Analysis]
- Discovery Questions: [Questions]
- Meeting Brief: [Meeting Brief]
- Meeting Transcript / Notes: [Transcript]
- Customer Insights: [Insights]
- Follow-up: [Follow-up]
- CRM Record: [CRM]

این اطلاعات را به یک Customer Memory ساختاریافته تبدیل کن.

ساختار:
1. Customer Profile
2. Business Context
3. Organization Situation
4. Key Stakeholders
5. Confirmed Needs
6. Pain Points
7. Business Impact
8. Current Process / Solution
9. Customer Goals
10. Decision Process
11. Objections
12. Confirmed Facts
13. Active Hypotheses
14. Unknowns
15. Previous Interactions
16. Commitments
17. Open Questions
18. Next Actions
19. Important Context for Future Conversations

قوانین:
- جدا نگه دار Hypothesis را از Fact
- اطلاعات تأییدنه‌شده را به‌عنوان واقعیت ثبت نکن.
- اطلاعاتی که وجود ندارد اختراع نکن.
- اگر دو اطلاعات با هم تناقض دارند، تناقض را مشخص کن.
- اطلاعات حساس مشتری را فقط در صورت مجاز بودن طبق Policy سازمان استفاده و ذخیره کن.

هدف این Customer Memory این است که فروشنده در تعامل بعدی مجبور نباشد همه چیز را از ابتدا بررسی کند.`,
    outputStructure: [
      'شناسنامه جامع و مستمر ۱۹ بخشی حافظه سازمانی مشتری.',
    ],
  },
];

export const PROMPT_PACK_WORKFLOW_STEPS = [
  { step: '01', title: 'Research اولیه', promptCode: 'PROMPT 01', arrow: '→' },
  { step: '02', title: 'تفکیک Fact / Hypothesis', promptCode: 'PROMPT 02', arrow: '→' },
  { step: '03', title: 'شناسایی خلاءها', promptCode: 'PROMPT 03', arrow: '→' },
  { step: '04', title: 'ساخت Hypothesisها', promptCode: 'PROMPT 04', arrow: '→' },
  { step: '05', title: 'طراحی Discovery Qs', promptCode: 'PROMPT 05', arrow: '→' },
  { step: '06', title: 'اولویت‌بندی سوالات', promptCode: 'PROMPT 06', arrow: '→' },
  { step: '07', title: 'ساخت Meeting Brief', promptCode: 'PROMPT 07', arrow: '→' },
  { step: '08', title: 'تمرین Role Play', promptCode: 'PROMPT 08', arrow: '→' },
  { step: '09', title: 'پیام اولیه Outreach', promptCode: 'PROMPT 09-12', arrow: '→' },
  { step: '10', title: 'سناریو و شبیه‌سازی جلسه', promptCode: 'PROMPT 13-15', arrow: '→' },
  { step: '11', title: 'پیگیری و استخراج Insights', promptCode: 'PROMPT 16-18', arrow: '→' },
  { step: '12', title: 'ثبت در CRM & Memory', promptCode: 'PROMPT 19-20', arrow: '✓' },
];

export const PROMPT_PACK_GOLDEN_RULES = [
  {
    num: '۱',
    title: 'اصل اول — Context بدهید',
    description: 'هرچه درباره مسئله، مشتری، نقش شما و هدف کار اطلاعات مناسب‌تری داشته باشد، احتمال تولید خروجی مرتبط بیشتر می‌شود.',
  },
  {
    num: '۲',
    title: 'اصل دوم — Fact را از Hypothesis جدا کنید',
    description: 'هر چیزی که AI می‌گوید واقعیت نیست. اگر اطلاعاتی تأیید نشده است، آن را به‌عنوان Hypothesis نگه دارید.',
  },
  {
    num: '۳',
    title: 'اصل سوم — خروجی اول را خروجی نهایی فرض نکنید',
    description: 'خروجی مناسب نیست؟ Prompt را اصلاح کنید، Context بیشتری بدهید یا از AI بخواهید خروجی خود را بازنگری کند.',
  },
  {
    num: '۴',
    title: 'اصل چهارم — AI را در Workflow قرار دهید',
    description: 'به‌جای اینکه برای هر کار یک Prompt جدا و بی‌ارتباط داشته باشید، خروجی یک مرحله را وارد مرحله بعد کنید.',
  },
  {
    num: '۵',
    title: 'اصل پنجم — انسان همچنان مسئول تصمیم است',
    description: 'AI می‌تواند تحقیق را سریع‌تر کند، اطلاعات را ساختاربندی کند، Hypothesis ایجاد کند، سؤال پیشنهاد دهد، Role Play انجام دهد، پیام تولید کند، جلسه را تحلیل کند و اطلاعات CRM را مرتب کند. اما فروشنده همچنان باید قضاوت کند، اطلاعات را بررسی کند، با مشتری اعتبارسنجی کند، تصمیم بگیرد و مسئولیت ارتباط با مشتری را بر عهده داشته باشد.',
  },
];
