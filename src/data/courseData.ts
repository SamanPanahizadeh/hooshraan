import { CourseModule } from '../types';

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 1,
    titleFa: 'مبانی کاربردی GenAI در فروش',
    titleEn: 'Generative AI Sales Fundamentals',
    iconName: 'Sparkles',
    descriptionFa: 'فلسفه Human + AI، مدل Co-Pilot، چهار سؤال قبل از Prompt و تفاوت کلیدی Fact و Hypothesis',
    slides: [
      {
        id: 's1',
        pageNum: 1,
        title: 'درباره این کارگاه آموزشی',
        section: 'مقدمه',
        content: [
          'در این کارگاه قرار نیست مجموعه‌ای از قابلیت‌های پراکنده هوش مصنوعی را یاد بگیریم و سپس حدس بزنیم که در فروش چه کاربردی دارند.',
          'ما یک مسیر واقعی فروش را دنبال می‌کنیم: از لحظه‌ای که می‌خواهیم درباره یک مشتری اطلاعات به‌دست آوریم، او را بهتر درک کنیم، برای جلسه آماده شویم، ارتباط برقرار کنیم، پیگیری کنیم و اطلاعات را در CRM ثبت نماییم.'
        ],
        bulletPoints: [
          'هدف: قرار دادن هوش مصنوعی مولد در کنار تخصص و قضاوت فروشنده (پایانی بر کارهای زمان‌بر و اطلاعات‌محور)',
          'نگرش: کتاب مرجع AI Generative را نه فقط ابزاری برای ای‌میل نوشتن، بلکه Co-Pilot و در سطوح مدیریتی Co-Thinker معرفی می‌کند.',
          'خروجی ۹۰ دقیقه: توانایی انجام فعالیت‌های مشخص فروش با AI، نه فقط تئوری AI.'
        ],
        keyConcept: {
          term: 'مفهوم Co-Pilot در فروش',
          explanation: 'AI جای فروشنده را نمی‌گیرد؛ بلکه به فروشنده زمان و ظرفیت بیشتری برای فکر کردن، آماده شدن و تعامل واقعی با مشتری می‌دهد.'
        }
      },
      {
        id: 's2',
        pageNum: 2,
        title: 'اصل طلایی Human + AI',
        section: 'اصل قبل از شروع',
        content: [
          'هوش مصنوعی مولد قرار نیست فروشنده را از فرآیند فروش حذف کند.',
          'ما در کل این کارگاه و در تمام خروجی‌ها از مدل زیر استفاده می‌کنیم:'
        ],
        diagram: {
          type: 'compare',
          items: [
            { label: 'نقش AI', desc: 'سرعت، ساختاربندی، تحلیل اولیه، تولید پیش‌نویس، ایجاد گزینه‌ها' },
            { label: 'نقش انسان (فروشنده)', desc: 'شناخت واقعی مشتری، قضاوت، ایجاد رابطه، درک شرایط (Context)، تصمیم‌گیری و تأیید نهایی', highlight: true }
          ]
        },
        goldenRules: [
          'هر چیزی را که AI تولید می‌کند، بدون بررسی نپذیرید!'
        ]
      },
      {
        id: 's3',
        pageNum: 3,
        title: 'AI را به عنوان Co-Pilot ببینید',
        section: 'چرخه استفاده درست',
        content: [
          'نقش اصلی AI نقش Co-Pilot است. یعنی شما مسئله را تعریف می‌کنید و Context می‌دهید.',
          'AI به شما کمک می‌کند اطلاعات را بررسی کنید، گزینه تولید کنید یا پیش‌نویس اولیه بگذارید. سپس شما بررسی می‌کنید.'
        ],
        diagram: {
          type: 'flow',
          items: [
            { label: 'تعریف مسئله' },
            { label: 'ارائه Prompt' },
            { label: 'تزریق Context' },
            { label: 'دریافت خروجی' },
            { label: 'بررسی انسان' },
            { label: 'اصلاح' },
            { label: 'استفاده نهایی' }
          ]
        },
        goldenRules: [
          'چرخه نادرست: Prompt ➔ جواب ➔ تمام ❌',
          'چرخه درست: مسئله ➔ Prompt ➔ Context ➔ خروجی ➔ بررسی ➔ اصلاح ➔ استفاده ✅'
        ]
      },
      {
        id: 's4',
        pageNum: 4,
        title: 'چرا Prompting به تنهایی کافی نیست؟',
        section: '۴ سوال قبل از هر Prompt',
        content: [
          'استفاده از AI فقط حفظ کردن تعداد زیادی Prompt نیست. Prompting روی مهارت‌های انسانی مانند سؤال پرسیدن مناسب، گفتگو و قضاوت انتقادی بنا می‌شود.'
        ],
        bulletPoints: [
          'سؤال ۱: من دقیقاً چه کاری می‌خواهم انجام دهم؟',
          'سؤال ۲: AI برای انجام این کار به چه اطلاعاتی (Context) نیاز دارد؟',
          'سؤال ۳: خروجی مطلوب من دقیقاً چیست؟',
          'سؤال ۴: چگونه متوجه می‌شوم خروجی AI درست و قابل استفاده است؟'
        ],
        keyConcept: {
          term: 'کیفیت Context',
          explanation: 'یکی از مهم‌ترین تفاوت‌های Prompt ضعیف و خوب، مقدار و کیفیت Context تزریق‌شده است.'
        }
      },
      {
        id: 's5',
        pageNum: 5,
        title: 'تفکیک حقیقت (Fact) از فرضیه (Hypothesis)',
        section: 'قانون طلایی کارگاه',
        content: [
          'در کار با مشتری تفکیک داده‌های واقعی از برداشتهای احتمالی حیاتی است.'
        ],
        bulletPoints: [
          'مثال Fact: شرکت X در سال گذشته ظرفیت تولید خود را افزایش داده است (دارای منبع معتبر).',
          'مثال Hypothesis: بنابراین شرکت X احتمالاً در حال حاضر مشکل تأمین مواد اولیه دارد.',
          'قانون طلایی: AI می‌تواند Hypothesis بسازد؛ اما شما باید Fact را بررسی کنید.'
        ],
        goldenRules: [
          'AI می‌تواند به شما کمک کند فرضیه‌های مختلف بسازید، اما نباید آنها را بدون بررسی به عنوان واقعیت قبول کنید.'
        ]
      }
    ]
  },
  {
    id: 2,
    titleFa: 'تحقیق مشتری (Customer Research)',
    titleEn: 'Customer Research & Briefing',
    iconName: 'Search',
    descriptionFa: 'جمع‌آوری و ساختاربندی اطلاعات اولیه مشتری، ساخت Customer Research Brief و ۳ سؤال کلیدی ارزیابی',
    slides: [
      {
        id: 's6',
        pageNum: 6,
        title: 'قبل از تماس با مشتری چه می‌دانیم؟',
        section: 'تحقیق اوليه',
        content: [
          'قبل از صحبت با یک مشتری جدید، باید بدانیم: شرکت چه کاری انجام می‌دهد؟ در چه بازاری فعالیت دارد؟ چه محصولی دارد؟ چه تغییرات یا چالش‌هایی اخیراً داشته؟'
        ],
        bulletPoints: [
          'جمع‌آوری و ساختاربندی اطلاعات',
          'خلاصه‌سازی و دسته‌بندی',
          'مقایسه و آماده‌سازی برای فرآیند فروش',
          'طراحی سؤالات تحقیق و تحلیل پاسخ‌های کیفی'
        ]
      },
      {
        id: 's7',
        pageNum: 7,
        title: 'ساختار Customer Research Brief',
        section: 'چارچوب اطلاعاتی',
        content: [
          'به جای پرسیدن سوال‌های پراکنده از AI، تحقیق را در ۸ بخش کلیدی ساختاربندی می‌کنیم:'
        ],
        bulletPoints: [
          '1. Company Overview (نگاه کلی به شرکت)',
          '2. Business Context (شرایط کسب‌وکار)',
          '3. Products / Services (محصولات و خدمات)',
          '4. Potential Business Needs (نیازهای احتمالی)',
          '5. Potential Challenges (چالش‌های احتمالی)',
          '6. Potential Buying Drivers (محرک‌های خرید)',
          '7. Possible Stakeholders (ذی‌نفعان احتمالی)',
          '8. Questions We Need to Verify (موضوعات نیازمند اعتبارسنجی)'
        ]
      },
      {
        id: 's8',
        pageNum: 9,
        title: 'الگوی Prompt برای Customer Research Brief',
        section: 'تمرین ۱ - ساخت Brief',
        content: [
          'از این Prompt حرفه‌ای برای تبدیل داده‌های پراکنده مشتری به یک Brief استاندار استفاده کنید:'
        ],
        promptTemplate: {
          role: 'Sales Research Assistant',
          template: `در نقش یک Sales Research Assistant عمل کن.
من قرار است برای یک مشتری جدید آماده شوم.
اطلاعاتی که درباره مشتری دارم:
[اطلاعات مشتری]

اطلاعات را در این ساختار سازماندهی کن:
1. Company Overview
2. Business Context
3. Products / Services
4. Potential Business Needs
5. Potential Challenges
6. Potential Buying Drivers
7. Possible Stakeholders
8. Questions We Need to Verify

بین Fact و Hypothesis تفاوت بگذار. مشخص کن هر چیزی که از اطلاعات ارائه شده قابل اثبات نیست را به عنوان Hypothesis.
اگر اطلاعاتی برای نتیجه‌گیری کافی نیست، مشخص کن چه اطلاعاتی نیاز داریم.`
        },
        exercise: {
          title: 'تمرین ۱: ساخت Brief مشتری',
          instructions: 'یک شرکت واقعی یا فرضی را وارد کرده و از الگو جهت استخراج Brief و تفکیک Fact/Hypothesis استفاده کنید.',
          type: 'brief'
        }
      },
      {
        id: 's9',
        pageNum: 9,
        title: '۳ سؤال ضروری بعد از دریافت پاسخ AI',
        section: 'ارزیابی پاسخ Research Brief',
        content: [
          'هدف فقط گرفتن پاسخ از AI نیست؛ هدف تبدیل پاسخ AI به سؤال بهتر برای مشتری است.'
        ],
        bulletPoints: [
          'سؤال ۱: کدام بخش از تحلیل تو Fact است و کدام بخش Hypothesis؟',
          'سؤال ۲: کدام Hypothesisها بیشترین اهمیت را برای جلسه فروش دارند؟',
          'سؤال ۳: برای بررسی هر Hypothesis چه سؤالی باید از مشتری بپرسم؟'
        ]
      }
    ]
  },
  {
    id: 3,
    titleFa: 'شناخت عمیق مشتری (Customer Understanding)',
    titleEn: 'Customer Understanding Chain',
    iconName: 'UserCheck',
    descriptionFa: 'تبدیل اطلاعات خام به الگوی نیاز و فرضیه، و طراحی سوالات Discovery جهت اعتبارسنجی',
    slides: [
      {
        id: 's10',
        pageNum: 10,
        title: 'تحقیق مشتری با شناخت مشتری یکسان نیست',
        section: 'زنجیره شناخت',
        content: [
          'ممکن است اطلاعات زیادی داشته باشیم، اما هنوز ندانیم: مشتری چه چیزی برایش مهم است؟ چه مشکلی دارد؟ چه چیزی باعث خرید یا انصراف او می‌شود؟'
        ],
        diagram: {
          type: 'flow',
          items: [
            { label: 'Information (اطلاعات)' },
            { label: 'Pattern (الگوها)' },
            { label: 'Possible Need (نیاز احتمالی)' },
            { label: 'Hypothesis (فرضیه)' },
            { label: 'Question (سوال)' },
            { label: 'Customer Validation (تأیید مشتری)' }
          ]
        }
      },
      {
        id: 's11',
        pageNum: 11,
        title: 'نمونه عملی زنجیره شناخت',
        section: 'مثال کاربردی',
        content: [
          'اطلاعات اولیه: یک شرکت تولیدی در حال افزایش ظرفیت تولید است.',
          'AI می‌تواند چند Hypothesis پیشنهاد دهد:'
        ],
        bulletPoints: [
          'ممکن است حجم خرید مواد اولیه افزایش پیدا کند.',
          'ممکن است ظرفیت لجستیک به مسئله تبدیل شود.',
          'ممکن است کنترل هزینه برای شرکت مهم‌تر شود.',
          'ممکن است نیاز به تامین‌کنندگان جدید ایجاد شود.'
        ],
        goldenRules: [
          'هیچ‌کدام از این موارد الزاماً Fact نیستند، اما به ما کمک می‌کنند سوال‌های بهتری برای Discovery طراحی کنیم.'
        ]
      }
    ]
  },
  {
    id: 4,
    titleFa: 'آماده‌سازی برای جلسه فروش (Sales Preparation)',
    titleEn: 'Sales Preparation & Discovery Design',
    iconName: 'Calendar',
    descriptionFa: 'تعیین هدف دقیق جلسه، طراحی سؤالات Discovery عمیق و الگوی Prompt آمادگی',
    slides: [
      {
        id: 's12',
        pageNum: 12,
        title: 'تعیین هدف جلسه (Meeting Objective)',
        section: 'گام‌های آماده‌سازی',
        content: [
          'به جای اینکه بگوییم «برای من جلسه را آماده کن»، مسئله را تقسیم می‌کنیم. قبل از جلسه مشخص کنید:'
        ],
        bulletPoints: [
          'آیا می‌خواهم نیاز مشتری را بفهمم؟ (Discovery)',
          'آیا هدف گرفتن جلسه بعدی است؟',
          'آیا هدف معرفی محصول یا ارائه Proposal است؟',
          'آیا بررسی Objectionهاست یا نزدیک شدن به تصمیم خرید؟'
        ]
      },
      {
        id: 's13',
        pageNum: 12,
        title: 'طراحی Discovery Questions عمیق',
        section: 'ارتقای سوالات',
        content: [
          'یکی از بهترین کاربردهای AI ارتقای کیفیت سؤالات است:'
        ],
        diagram: {
          type: 'compare',
          items: [
            { label: 'سوال سطحی معمولی', desc: 'آیا از محصول فعلی خود راضی هستید؟' },
            { label: 'سوال Discovery دقیق هوشمند', desc: 'مهم‌ترین محدودیت سیستم فعلی شما در زمانی که حجم سفارش افزایش پیدا می‌کند چیست؟', highlight: true }
          ]
        }
      },
      {
        id: 's14',
        pageNum: 13,
        title: 'الگوی Prompt آماده‌سازی جلسه فروش',
        section: 'الگوی جامع',
        content: [
          'الگوی کامل جهت استخراج موضوعات تحقیق، سوالات Discovery، مخالفت‌های احتمالی و پیگیری‌ها:'
        ],
        promptTemplate: {
          role: 'Sales Meeting Preparation Assistant',
          template: `در نقش یک Sales Meeting Preparation Assistant عمل کن.

اطلاعات مشتری:
[CUSTOMER INFORMATION]

محصول یا خدمت ما:
[PRODUCT / SERVICE]

هدف جلسه:
[MEETING OBJECTIVE]

بر اساس اطلاعات بالا:
1. پنج موضوعی که باید درباره آن‌ها اطلاعات بیشتری کسب کنم را مشخص کن.
2. برای هر موضوع، دو سؤال Discovery پیشنهاد بده.
3. پنج Objection احتمالی مشتری را مشخص کن.
4. برای هر Objection، یک سؤال Follow-up پیشنهاد بده که به من کمک کند دلیل واقعی آن را بهتر بفهمم.
5. مشخص کن کدام فرضیات من درباره مشتری باید در جلسه اعتبارسنجی شوند.`
        }
      }
    ]
  },
  {
    id: 5,
    titleFa: 'ارتباطات اختصاصی (Customer Communication)',
    titleEn: 'Personalized Communication',
    iconName: 'Send',
    descriptionFa: 'شخصی‌سازی واقعی پیام‌ها، جلوگیری از Fabrication (ادعاسازی دروغین) و الگوی Prompt پیام B2B',
    slides: [
      {
        id: 's15',
        pageNum: 14,
        title: 'ارتباط بر اساس Context نه پیام‌های عمومی',
        section: 'ارتباط با مشتری',
        content: [
          'هدف ما فقط نوشتن یک Email نیست، بلکه Personalization واقعی است.',
          'پیام عمومی (Generic): "سلام، ما در زمینه ارائه راهکارهای X فعالیت می‌کنیم و خوشحال می‌شویم درباره همکاری صحبت کنیم." (مشکل: برای صدها نفر قابل ارسال است و دلیلی برای توجه ندارد).'
        ],
        bulletPoints: [
          'Personalization یعنی: پیام برای این مشتری به خصوص دلیل واقعی داشته باشد (نه صرفاً نوشتن نام در اول ایمیل).',
          'مبنای شخصی‌سازی: صنعت، شرایط کسب‌وکار، نیاز احتمالی، تعاملات قبلی، نقش مخاطب و هدف ارتباط.'
        ]
      },
      {
        id: 's16',
        pageNum: 15,
        title: 'هشدار مهم: جلوگیری از Fabrication (خیالبافی داده)',
        section: 'خط قرمز شخصی‌سازی',
        content: [
          'AI نباید برای ایجاد Personalization، اطلاعات جعلی درباره مشتری بسازد!'
        ],
        goldenRules: [
          'مثال ساختگی غلط: "با توجه به مشکلات اخیر شما در زنجیره تامین..." (در حالی که هیچ مدرکی نداریم).',
          'این Personalization نیست؛ این Fabrication است.'
        ]
      },
      {
        id: 's17',
        pageNum: 16,
        title: 'الگوی Prompt پیام شخصی‌سازی‌شده B2B',
        section: 'تمرین ۲ - ساخت پیام',
        content: [
          'استفاده از این الگو تضمین می‌کند که پیام کاملاً مبتنی بر داده واقعی نوشته شده است:'
        ],
        promptTemplate: {
          role: 'B2B Sales Communication Assistant',
          template: `در نقش یک B2B Sales Communication Assistant عمل کن.

اطلاعات مشتری:
[CUSTOMER CONTEXT]

اطلاعات محصول یا خدمت ما:
[OUR OFFERING]

هدف پیام:
[OBJECTIVE]

مخاطب پیام:
[ROLE / PERSON]

یک پیام کوتاه و حرفه‌ای ایجاد کن. پیام باید:
1. مستقیماً با Context مشتری مرتبط باشد.
2. از ادعاهای اثبات‌نشده استفاده نکند.
3. بیش از حد تبلیغاتی نباشد.
4. یک دلیل مشخص برای ادامه گفتگو ارائه کند.
5. Call to Action مشخص داشته باشد.

در پایان مشخص کن کدام بخش پیام بر اساس Fact نوشته شده و کدام بخش صرفاً پیشنهاد ارتباطی است.`
        },
        exercise: {
          title: 'تمرین ۲: بازنویسی و ارزیابی پیام',
          instructions: 'یک پیام نمونه فروش را وارد کرده، بدون AI بررسی کنید (آیا دلیل مشخص دارد؟)، سپس با Prompt بالا بازنویسی کنید.',
          type: 'outreach'
        }
      }
    ]
  },
  {
    id: 6,
    titleFa: 'جلسه فروش و نقش‌آفرینی (Sales Meeting & Role Play)',
    titleEn: 'Sales Meeting & AI Role Play',
    iconName: 'MessageSquare',
    descriptionFa: 'اولویت Discovery بر Presentation، شبیه‌ساز زنده AI Role Play و ارزیابی ۶‌عاملی',
    slides: [
      {
        id: 's18',
        pageNum: 17,
        title: 'Discovery مهم‌تر از Presentation است',
        section: 'ارتقای جلسه فروش',
        content: [
          'در جلسه فروش، AI قرار نیست به جای فروشنده صحبت کند. یکی از تغییرات مهم این است که به جای پرسیدن "چگونه محصولم را بفروشم؟" از AI بپرسیم:'
        ],
        keyConcept: {
          term: 'سوال قدرتمند جلسه',
          explanation: '«چه چیزهایی را هنوز درباره مشتری نمی‌دانم؟» چون فروش مؤثر فقط انتقال اطلاعات محصول نیست، بلکه فهمیدن مسئله مشتری است.'
        }
      },
      {
        id: 's19',
        pageNum: 18,
        title: 'تمرین AI Role Play (نقش‌آفرینی تعاملی)',
        section: 'شبیه‌ساز جلسه',
        content: [
          'یکی از مفیدترین تمرین‌ها قرار دادن AI در نقش مشتری است. مثلاً:'
        ],
        bulletPoints: [
          '«در نقش مدیر خرید یک شرکت تولیدی عمل کن. من فروشنده راهکار نرم‌افزاری هستم. در طول مکالمه فقط در صورتی اطلاعات بده که سؤال مناسبی بپرسم.»',
          'سپس فروشنده وارد گفتگو می‌شود و پس از پایان، از AI ارزیابی عملکرد می‌گیرد.'
        ]
      },
      {
        id: 's20',
        pageNum: 18,
        title: 'الگوی Prompt تمرین Sales Role Play',
        section: 'الگوی شبیه‌ساز',
        content: [
          'از این الگوی کامل برای تمرین گفتگو و دریافت بازخورد دقیق استفاده کنید:'
        ],
        promptTemplate: {
          role: 'B2B Prospective Customer',
          template: `عمل کن در نقش یک مشتری بالقوه B2B.

مشخصات مشتری:
[CUSTOMER PROFILE]

محصول یا خدمت من:
[OUR PRODUCT / SERVICE]

سناریوی فروش:
[SCENARIO]

تو مشتری هستی و من فروشنده.
مکالمه را واقعی نگه دار. همه اطلاعات را از ابتدا در اختیار من قرار نده. من باید با سؤال‌های مناسب نیازها، مشکلات و اولویت‌های تو را کشف کنم.
اگر سؤال من ضعیف یا بیش از حد عمومی بود، پاسخ طبیعی بده و اطلاعات اضافی ارائه نکن.

پس از پایان مکالمه (زمانی که نوشتم "پایان مکالمه")، عملکرد من را در این ۶ مورد ارزیابی کن:
1. Quality of Discovery Questions
2. Listening
3. Assumption Making
4. Need Identification
5. Objection Handling
6. Next-Step Definition

سپس سه پیشنهاد مشخص برای بهتر شدن عملکرد من ارائه کن.`
        },
        exercise: {
          title: 'تمرین عملی Role Play',
          instructions: 'وارد بخش شبیه‌ساز نقش‌آفرینی شوید، با خریدار فرضی گفتگو کنید و کارنامه ۶‌عاملی دریافت نمایید.',
          type: 'roleplay'
        }
      }
    ]
  },
  {
    id: 7,
    titleFa: 'پیگیری جلسه فروش (Follow-up)',
    titleEn: 'Meeting Follow-up & Summarization',
    iconName: 'ClipboardCheck',
    descriptionFa: 'استخراج یادداشت‌های خام جلسه، ساختاربندی تعهدات طرفین و الگوی Prompt پیگیری',
    slides: [
      {
        id: 's21',
        pageNum: 19,
        title: 'ثبت و پیگیری پس از جلسه',
        section: 'فرآیند پیگیری',
        content: [
          'جلسه تمام شد، اما فرآیند فروش تمام نشده است. معمولاً فروشنده باید مشخص کند:'
        ],
        bulletPoints: [
          'مشتری چه گفت و چه چیزی برایش مهم بود؟',
          'چه مشکلی و چه Objectionهایی مطرح شد؟',
          'چه چیزی باید پیگیری شود و چه کسی چه کاری باید انجام دهد؟',
          'جلسه بعدی چه زمانی است؟'
        ]
      },
      {
        id: 's22',
        pageNum: 20,
        title: 'الگوی Prompt برای Meeting Follow-up',
        section: 'ساختاربندی یادداشت‌ها',
        content: [
          'تبدیل یادداشت‌های پراکنده به ۱۰ قلم استاندارد پیگیری و ایمیل پیشنهادی:'
        ],
        promptTemplate: {
          role: 'Sales Follow-up Assistant',
          template: `یادداشت‌های جلسه فروش را در اختیار تو قرار می‌دهم:
[MEETING NOTES]

اطلاعات را در ساختار زیر سازماندهی کن:
1. Customer Needs
2. Pain Points
3. Customer Priorities
4. Questions / Concerns
5. Objections
6. Commitments Made by Customer
7. Commitments Made by Salesperson
8. Next Actions
9. Missing Information
10. Suggested Follow-up Message

بین اطلاعاتی که صراحتاً در یادداشت جلسه وجود دارد و برداشتهایی که از آن می‌توان داشت تفاوت بگذار.
اگر چیزی در یادداشت جلسه وجود ندارد، آن را حدس نزن.`
        }
      }
    ]
  },
  {
    id: 8,
    titleFa: 'حافظه مشتری و CRM (Customer Memory & S.C.O.O.V)',
    titleEn: 'CRM Customer Memory & S.C.O.O.V Framework',
    iconName: 'Database',
    descriptionFa: 'حافظه مستمر مشتری در CRM، سفر ۸ مرحله‌ای مشتری، چارچوب S.C.O.O.V و کارت جیبی فروش',
    slides: [
      {
        id: 's23',
        pageNum: 21,
        title: 'CRM فقط محل ذخیره اطلاعات نیست؛ ساخت Customer Memory',
        section: 'مفهوم اصلی CRM',
        content: [
          'هدف ما فهمیدن مفهوم Customer Memory است. در یک فرآیند فروش خوب، اطلاعات مشتری در طول زمان جمع می‌شود.',
          'اگر این اطلاعات ساختاریافته نباشد، در هر تعامل فروشنده مجبور است دوباره همه چیز را از ابتدا بفهمد.'
        ],
        bulletPoints: [
          'Customer Profile (اطلاعات پایه)',
          'Business Context (شرایط کسب‌وکار)',
          'Needs & Pain Points (نیازها و دغدغه‌ها)',
          'Buying Priorities & Stakeholders (اولویت‌ها و ذی‌نفعان)',
          'Objections & Commitments (مخالفت‌ها و تعهدات)',
          'Next Action & Open Questions (اقدام بعدی و سوالات باز)'
        ]
      },
      {
        id: 's24',
        pageNum: 25,
        title: 'سفر کامل مشتری (Full Customer Journey)',
        section: '۸ مرحله کلیدی',
        content: [
          'مسیر کامل تعامل با مشتری با هوش مصنوعی مولد:'
        ],
        diagram: {
          type: 'flow',
          items: [
            { label: '01. RESEARCH (شناخت اولیه مشتری)' },
            { label: '02. UNDERSTAND (ساخت Hypothesis نیازها)' },
            { label: '03. PREPARE (آماده‌سازی جلسه)' },
            { label: '04. ENGAGE (ارتباط شخصی‌سازی‌شده)' },
            { label: '05. MEET (گفتگو و Discovery)' },
            { label: '06. FOLLOW-UP (ثبت و پیگیری)' },
            { label: '07. CRM (ساخت Customer Memory)' },
            { label: '08. NEXT INTERACTION (تعامل بعدی)' }
          ]
        }
      },
      {
        id: 's25',
        pageNum: 26,
        title: 'چارچوب عملی S.C.O.O.V در نوشتن Prompt',
        section: 'چارچوب ۵ مرحله‌ای',
        content: [
          'این پنج مرحله را می‌توانید برای تقریباً هر Use Case فروش استفاده کنید:'
        ],
        bulletPoints: [
          '1. Situation (شرایط چیست؟)',
          '2. Context (AI چه اطلاعاتی باید بداند؟)',
          '3. Objective (می‌خواهیم چه کاری انجام شود؟)',
          '4. Output (چه نوع خروجی می‌خواهیم؟)',
          '5. Verification (چگونه خروجی را بررسی و اعتبارسنجی می‌کنیم؟)'
        ],
        exercise: {
          title: 'تمرین ۳: آماده‌سازی کامل CRM & S.C.O.O.V',
          instructions: 'یادداشت‌های یک تعامل واقعی را وارد کرده و رکورد آماده برای CRM همراه با خلاصه مدیریتی دریافت کنید.',
          type: 'crm'
        }
      },
      {
        id: 's26',
        pageNum: 28,
        title: 'سه نوع Prompt در فروش و کارت جیبی AI Sales',
        section: 'کارت جیبی و چک‌لیست',
        content: [
          'سه نوع Prompt کاربردی:'
        ],
        bulletPoints: [
          '1. Generate (تولید خروجی مانند ایمیل یا متن)',
          '2. Analyze (تحلیل مصاحبه‌ها، متن‌ها و استخراج تم‌ها)',
          '3. Challenge (به چالش کشیدن تفکر خودمان: «فرضیات من چیست و کدام ممکن است اشتباه باشد؟»)'
        ],
        goldenRules: [
          'کارت جیبی AI Sales (۵ سوال روزمره): ۱. مسئله من چیست؟ ۲. AI چه Contextی لازم دارد؟ ۳. دقیقاً چه خروجی می‌خواهم؟ ۴. آیا AI چیزی را فرض یا اختراع کرده است؟ ۵. قبل از استفاده چگونه خروجی را Verify کنم؟'
        ]
      }
    ]
  }
];

export const VEO_VIDEO_PRESETS = [
  {
    id: 'intro-lesson',
    titleFa: 'ویدیوی معرفی دوره Sales AI MVP',
    promptEn: 'A cinematic high-tech presentation video showing a modern B2B sales professional collaborating with a holographic AI co-pilot, analyzing customer research, sleek futuristic interface, 4k broadcast quality',
    promptFa: 'ویدیوی سینمایی معرفی ابزار هوش مصنوعی در فروش B2B همراه با رابط کاربری مدرن و تحلیل دیتای مشتری'
  },
  {
    id: 'research-brief',
    titleFa: 'استراتژی تحقیق مشتری با AI',
    promptEn: 'Dynamic motion graphics video explaining B2B customer research brief, separating Facts from Hypotheses, glowing data graphs, executive office setting, professional presentation style',
    promptFa: 'مووی‌گرافیک دینامیک توضیح استراتژی تحقیق مشتری و تفکیک حقیقت از فرضیه'
  },
  {
    id: 'discovery-meeting',
    titleFa: 'جلسه فروش و Discovery عمیق',
    promptEn: 'A close-up split screen scene of a sales meeting between a consultant and a B2B decision maker, real-time Discovery questions floating as clean subtle captions, high resolution',
    promptFa: 'صحنه دو نفره جلسه فروش و کشف نیازهای عمیق خریدار B2B'
  },
  {
    id: 'crm-memory',
    titleFa: 'حافظه مشتری و CRM هوشمند',
    promptEn: 'Modern CRM workflow visualization showing customer notes transforming into structured memory timeline with AI assistance, clean minimalist UI design',
    promptFa: 'تجسم سه‌بعدی تبدیل یادداشت‌های جلسه به حافظه یکپارچه مشتری در CRM'
  }
];
