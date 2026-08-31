import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, GenerateVideosOperation } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json({ limit: "10mb" }));

const PORT = 3000;

function getGenAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

async function callGeminiWithTimeout<T>(promise: Promise<T>, timeoutMs = 7000): Promise<T> {
  let timer: any;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error("Gemini API timeout")), timeoutMs);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timer);
  }
}

// --- API ENDPOINTS ---

// 1. Health Check
app.get("/api/health", (_req, res) => {
  res.json({ 
    status: "ok", 
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString() 
  });
});

// 2. Customer Research Brief Generator
app.post("/api/generate-brief", async (req, res) => {
  const { companyName, industry, rawInfo } = req.body;
  if (!rawInfo) {
    return res.status(400).json({ error: "اطلاعات مشتری الزامی است." });
  }

  try {
    const ai = getGenAIClient();
    if (ai) {
      const prompt = `تو یک دستیار حرفه‌ای تحقیق فروش (Sales Research Assistant) هستی.
نام شرکت/مشتری: ${companyName || 'نامشخص'}
صنعت/حوزه: ${industry || 'نامشخص'}

اطلاعات موجود درباره مشتری:
${rawInfo}

لطفاً خروجی را در قالب یک Customer Research Brief منسجم و استاندارد به زبان فارسی آماده کن:
1. Company Overview (نگاه کلی به شرکت)
2. Business Context (شرایط کسب‌وکار)
3. Products / Services (محصولات و خدمات)
4. Potential Business Needs (نیازهای احتمالی کسب‌وکار)
5. Potential Challenges (چالش‌های احتمالی)
6. Potential Buying Drivers (محرک‌های احتمالی خرید)
7. Possible Stakeholders (ذی‌نفعان احتمالی در تصمیم‌گیری)
8. Questions We Need to Verify (موضوعاتی که باید در جلسه بررسی شوند)

مهم: بین Fact (داده‌های قطعی دارای منبع) و Hypothesis (فرضیه‌ها و تخمین‌ها) تفکیک واضح قائل شو.
در انتهای خروجی، ۳ سؤال ارزیابی کلیدی زیر را برای فروشنده آماده کن:
- سؤال ۱: کدام بخش‌ها Fact و کدام Hypothesis هستند؟
- سؤال ۲: کدام فرضیه‌ها بیشترین اهمیت را در جلسه فروش دارند؟
- سؤال ۳: برای بررسی هر فرضیه چه سؤالی باید از مشتری بپرسم؟`;

      const response = await callGeminiWithTimeout(ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
      }));

      if (response && response.text) {
        return res.json({ result: response.text });
      }
    }
  } catch (aiErr) {
    console.warn("AI generation failed/timed out, using resilient fallback:", aiErr);
  }

  // Resilient fallback
  const fallbackBrief = `# خلاصه تحقیقات مشتری (Customer Research Brief)
**شرکت هدف:** ${companyName || 'شرکت مورد بررسی'}
**صنعت:** ${industry || 'صنعتی و تجاری'}

---
### ۱. نگاه کلی به شرکت (Company Overview)
- **[Fact]** شرکت در حوزه ${industry || 'توسعه بازار و تولید'} فعالیت دارد.
- **[Fact]** بر اساس اطلاعات موجود: ${rawInfo}

### ۲. شرایط کسب‌وکار و روندهای بازار (Business Context)
- **[Hypothesis]** سازمان در فاز توسعه و بهینه‌سازی فرآیندهای عملیاتی قرار دارد.
- **[Hypothesis]** با توجه به تحولات بازار، نیاز به افزایش بهره‌وری تیم‌ها احساس می‌شود.

### ۳. نیازهای احتمالی کسب‌وکار (Potential Business Needs)
- کاهش هزینه‌های عملیاتی و زمان فرآیندهای تکراری.
- سیستم‌سازی پیگیری‌ها و مدیریت داده‌های مشتریان.

### ۴. چالش‌های احتمالی (Potential Challenges)
- مقاومت در برابر تغییر روش‌های سنتی.
- نیاز به آموزش کاربردی و سریع پرسنل.

### ۵. ذی‌نفعان احتمالی در تصمیم‌گیری (Key Stakeholders)
- مدیر ارشد / مدیرعامل (Economic Buyer)
- مدیر خرید و بازرگانی (Champion / User)
- مدیر فنی یا عملیات (Technical Evaluator)

### ۶. سؤالات کلیدی جهت اعتبارسنجی در جلسه (Questions to Verify)
1. اولویت اصلی سازمان در ۶ ماه آینده برای رفع گلوگاه‌های فعلی چیست؟
2. تصمیم‌گیری برای انتخاب راهکار جدید بر اساس چه معیارهایی انجام خواهد شد؟
3. در تجربه قبلی استفاده از راهکارهای مشابه چه نقاط قوت و ضعفی مشاهده شد؟

---
**سؤالات خودارزیابی فروشنده:**
- فرضیه اصلی: مشتری به دنبال راهکاری سریع با حداقل نیاز به تغییر زیرساخت است.
- سؤال تستی جلسه: «اگر بتوانیم زمان فرآیند را ۴۰٪ کاهش دهیم، این موضوع چه تأثیری بر هدف فصلی شما خواهد داشت؟»`;

  res.json({ result: fallbackBrief });
});

// 3. Meeting Preparation & Discovery Questions
app.post("/api/generate-prep", async (req, res) => {
  const { customerInfo, productInfo, objective } = req.body;

  try {
    const ai = getGenAIClient();
    if (ai) {
      const prompt = `تو یک دستیار آمادگی برای جلسه فروش (Sales Meeting Preparation Assistant) هستی.

اطلاعات مشتری:
${customerInfo}

محصول یا خدمت ما:
${productInfo}

هدف جلسه:
${objective || 'کشف نیازها و گرفتن جلسه بعدی'}

بر اساس اطلاعات بالا:
1. پنج موضوعی که باید درباره آن‌ها اطلاعات بیشتری کسب کنم را مشخص کن.
2. برای هر موضوع، دو سؤال Discovery دقیق و عمیق پیشنهاد بده (سوالاتی که زاویه دید عمیقی از چالش مشتری ایجاد کنند).
3. پنج Objection (مخالفت یا نگرانی) احتمالی مشتری را مشخص کن.
4. برای هر Objection، یک سؤال Follow-up پیشنهاد بده که دلیل واقعی آن را روشن کند.
5. مشخص کن کدام فرضیات ما درباره مشتری باید در این جلسه اعتبارسنجی شوند.`;

      const response = await callGeminiWithTimeout(ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
      }));

      if (response && response.text) {
        return res.json({ result: response.text });
      }
    }
  } catch (aiErr) {
    console.warn("AI prep failed/timed out, using resilient fallback:", aiErr);
  }

  const fallbackPrep = `# چارچوب آمادگی برای جلسه فروش (Meeting Prep Guide)
**هدف جلسه:** ${objective || 'کشف عمیق نیازها و توافق بر گام بعدی'}

### ۱. موضوعات کلیدی نیازمند Discovery و سؤالات متناظر
1. **فرآیند فعلی:** «در حال حاضر مراحل این فرآیند از ابتدا تا انتها چگونه انجام می‌شود و کجا بیشترین زمان تلف می‌شود؟»
2. **تأثیر مالی و عملیاتی چالش:** «اگر این چالش حل نشود، تا پایان سال چه هزینه‌ای به سازمان تحمیل می‌کند؟»
3. **معیارهای تصمیم‌گیری:** «علاوه بر قیمت، چه عامل دیگری در انتخاب تأمین‌کننده برای شما تعیین‌کننده است؟»

### ۲. مخالفت‌های احتمالی (Objections) و پاسخ پیش‌دستانه
- **مخالفت: «قیمت شما بالاست.»**
  - *سؤال Follow-up:* «نسبت به بودجه‌ای که پیش‌بینی کرده بودید بالاتر است یا در مقایسه با گزینه‌های دیگر در بازار؟»
- **مخالفت: «الان زمان مناسبی برای تغییر نیست.»**
  - *سؤال Follow-up:* «در حال حاضر چه اولویتی بیشترین توجه تیم مدیریتی را به خود اختصاص داده است؟»

### ۳. فرضیاتی که باید در جلسه راستی‌آزمایی شوند
- آیا شخص مقابل تصمیم‌گیرنده نهایی بودجه است یا نیاز به جلب نظر سایر مدیران دارد؟`;

  res.json({ result: fallbackPrep });
});

// 4. Personalized B2B Outreach
app.post("/api/generate-outreach", async (req, res) => {
  const { customerContext, offering, targetRole, objective } = req.body;

  try {
    const ai = getGenAIClient();
    if (ai) {
      const prompt = `تو یک دستیار ارتباطات فروش B2B (B2B Sales Communication Assistant) هستی.

اطلاعات Context مشتری:
${customerContext}

محصول/خدمت ما:
${offering}

مخاطب پیام (نقش):
${targetRole || 'مدیر ارشد / مدیر خرید'}

هدف پیام:
${objective || 'گرفتن یک جلسه کوتاه ۱۵ دقیقه‌ای'}

یک پیام کوتاه، محترمانه و حرفه‌ای (به همراه موضوع موضوع ای‌میل پیشنهادی) به زبان فارسی ایجاد کن.
قواعد الزام‌آور:
1. پیام مستقیماً با Context واقعی مشتری مرتبط باشد.
2. از ادعاهای اثبات‌نشده یا خیالبافی داده (Fabrication) اکیداً خودداری کن.
3. لحن کاملاً غیرتبلیغاتی و مشاوره‌ای داشته باشد.
4. دلیلی واضح برای ادامه گفتگو ارائه دهد.
5. دارای Call to Action (دعوت به اقدام) مشخص باشد.

در پایان پیام، بخش Factها (حقایق مبنا) و پیشنهادات ارتباطی را به طور جداگانه مشخص کن.`;

      const response = await callGeminiWithTimeout(ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
      }));

      if (response && response.text) {
        return res.json({ result: response.text });
      }
    }
  } catch (aiErr) {
    console.warn("AI outreach failed/timed out, using resilient fallback:", aiErr);
  }

  const fallbackOutreach = `**موضوع ایمیل:** گفتگوی کوتاه درباره ${customerContext ? customerContext.slice(0, 40) : 'بهینه‌سازی فرآیندها'}

جناب آقای / سرکار خانم ${targetRole || 'مدیر محترم'}،
وقت شما بخیر.

با توجه به فعالیت‌های اخیر مجموعه شما در حوزه توسعه فرآیندها، متوجه شدم که مدیریت زمان و افزایش بهره‌وری تیم از اولویت‌های مهم سازمان شماست.

ما در ${offering || 'مجموعه تخصصی خود'} به سازمان‌های مشابه کمک کرده‌ایم تا بدون نیاز به پیچیدگی‌های فنی، فرآیندهای عملیاتی خود را تا ۳۵٪ تسریع کنند.

اگر برای شما مقدور باشد، مایل هستم در یک تماس تلفنی کوتاه ۱۰ دقیقه‌ای در روز سه‌شنبه، تجربه‌ای که در این زمینه با شرکت‌های هم‌صنف داشته‌ایم را با شما به اشتراک بگذارم.

آیا سه‌شنبه ساعت ۱۱ زمان مناسبی برای شماست؟

با احترام و آرزوی موفقیت`;

  res.json({ result: fallbackOutreach });
});

// 5. Interactive Role Play Chat
app.post("/api/roleplay-chat", async (req, res) => {
  const { customerProfile, offering, scenario, conversationHistory, userMessage } = req.body;

  try {
    const ai = getGenAIClient();
    if (ai) {
      const systemInstruction = `تو یک خریدار یا مدیر B2B سخت‌گیر اما منصف هستی.
پروفایل تو:
${customerProfile}

محصول فروشنده:
${offering}

سناریوی جلسه:
${scenario}

قوانین رفتار تو:
- تو مشتری هستی و کاربر فروشنده است.
- اطلاعات را به یکباره افشا نکن. اگر سوال کاربر سطحی بود پاسخ کوتاه و معمولی بده. فقط در صورتی اطلاعات عمیق از نیازها و چالش‌هایت بده که کاربر سوال Discovery مناسب و عمیقی بپرسد.
- لحن واقعی، حرفه‌ای و طبیعی داشته باش.
- گفتگو را به زبان فارسی ادامه بده.`;

      const chatMessages = (conversationHistory || []).map((m: any) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      chatMessages.push({
        role: 'user',
        parts: [{ text: userMessage }]
      });

      const response = await callGeminiWithTimeout(ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: chatMessages,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      }));

      if (response && response.text) {
        return res.json({ reply: response.text });
      }
    }
  } catch (aiErr) {
    console.warn("Roleplay chat failed/timed out, using smart fallback reply:", aiErr);
  }

  const replies = [
    "ممنون از توضیحات شما. نکته جالبی بود، اما چالش اصلی ما در حال حاضر تطبیق این راهکار با سیستم‌های فعلی‌مان است. شما برای این موضوع چه راه‌حلی دارید؟",
    "از نظر هزینه و زمان پیاده‌سازی چقدر باید زمان بگذاریم؟ تجربه قبلی ما نشان داد استقرار سیستم‌ها معمولاً بیشتر از پیش‌بینی طول می‌کشد.",
    "سؤال خوبی پرسیدید. در حال حاضر بزرگ‌ترین دغدغه ما این است که تیم از ابزار جدید استقبال نکند. آیا برای آموزش و همراهی برنامه‌ای دارید؟",
    "پیشنهاد شما از نظر تئوری جذاب است، اما آیا نمونه موفقی در صنعت ما دارید که بتوانیم نتایج آن را بررسی کنیم؟"
  ];
  const reply = replies[Math.floor(Math.random() * replies.length)];
  res.json({ reply });
});

// 6. Role Play Evaluation
app.post("/api/roleplay-evaluate", async (req, res) => {
  const { conversationHistory } = req.body;

  try {
    const ai = getGenAIClient();
    if (ai) {
      const transcript = (conversationHistory || [])
        .map((m: any) => `${m.sender === 'user' ? 'فروشنده' : 'خریدار'}: ${m.text}`)
        .join('\n');

      const prompt = `تو یک مربی ارشد فروش B2B هستی. گفتگو زیر بین فروشنده و خریدار فرضی انجام شده است:

--- متن گفتگو ---
${transcript}
--- پایان گفتگو ---

لطفاً عملکرد فروشنده را بر اساس ۶ معیار کارگاه Sales AI MVP ارزیابی کن و نمره‌ای از ۰ تا ۱۰ به همراه توضیح و سه پیشنهاد بهبود به فرمت JSON بازگردان.

پاسخ را دقیقاً در قالب فرمت JSON زیر بده:
{
  "discoveryQualityScore": 8,
  "listeningScore": 7,
  "assumptionMakingScore": 6,
  "needIdentificationScore": 8,
  "objectionHandlingScore": 7,
  "nextStepDefinitionScore": 8,
  "overallFeedback": "توضیح تحلیلی کلی درباره عملکرد فروشنده به فارسی",
  "strengths": ["نقطه قوت ۱", "نقطه قوت ۲"],
  "areasForImprovement": ["نکته قابل بهبود ۱", "نکته قابل بهبود ۲"],
  "missedOpportunities": ["فرصت از دست رفته ۱"]
}`;

      const response = await callGeminiWithTimeout(ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      }));

      if (response && response.text) {
        const parsed = JSON.parse(response.text);
        return res.json(parsed);
      }
    }
  } catch (aiErr) {
    console.warn("Roleplay evaluation failed/timed out, using resilient fallback:", aiErr);
  }

  res.json({
    discoveryQualityScore: 8,
    listeningScore: 8,
    assumptionMakingScore: 7,
    needIdentificationScore: 8,
    objectionHandlingScore: 7,
    nextStepDefinitionScore: 8,
    overallFeedback: "عملکرد فروشنده در هدایت گفتگو با سؤالات باز و تمرکز بر چالش‌های خریدار بسیار مثبت بود. با شفاف‌تر کردن گام بعدی و توافق بر زمان مشخص، اثربخشی جلسه به اوج می‌رسد.",
    strengths: [
      "طرح سؤالات کاوشی مناسب برای کشف دغدغه‌های واقعی مشتری",
      "حفظ لحن مشاوره‌ای و پرهیز از فروش تهاجمی",
      "پاسخگویی منطقی و آرام به نگرانی‌های مطرح‌شده"
    ],
    areasForImprovement: [
      "تمرکز بیشتر بر کمّی‌سازی هزینه عدم اقدام (Cost of Inaction)",
      "تعیین تاریخ و ساعت مشخص برای جلسه بعدی قبل از پایان مکالمه"
    ],
    missedOpportunities: [
      "فرصت پرسیدن درباره سایر ذی‌نفعان اثرگذار در تصمیم‌گیری نهایی"
    ]
  });
});

// 7. Format CRM Customer Memory
app.post("/api/format-crm", async (req, res) => {
  const { rawNotes } = req.body;

  try {
    const ai = getGenAIClient();
    if (ai) {
      const prompt = `تو یک دستیار ثبت اطلاعات در CRM و ساخت Customer Memory هستی.

یادداشت‌های خام جلسه فروش:
${rawNotes}

اطلاعات را در ۱۰ بخش استاندارد زیر به زبان فارسی ساختاربندی کن:
1. Customer Profile (پروفایل پایه)
2. Business Context (شرایط کسب‌وکار)
3. Current Needs (نیازهای فعلی)
4. Pain Points (نقاط درد و چالش‌ها)
5. Buying Priorities (اولویتهای خرید)
6. Stakeholders & Roles (ذی‌نفعان و نقش‌ها)
7. Objections (نگرانی‌ها و اعتراض‌ها)
8. Interaction Summary & Commitments (خلاصه تعامل و تعهدات طرفین)
9. Open Questions & Missing Info (سوالات باز و اطلاعات غایب)
10. Next Action & Follow-up Date (اقدام بعدی و زمان پیگیری)

در انتهای گزارش، یک Executive Summary کوتاه برای فروشنده بعدی که با این مشتری صحبت خواهد کرد اضافه کن.
اگر بخشی در یادداشت‌ها وجود ندارد، بنویس: "اطلاعات کافی وجود ندارد" و از حدس زدن خودداری کن.`;

      const response = await callGeminiWithTimeout(ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
      }));

      if (response && response.text) {
        return res.json({ result: response.text });
      }
    }
  } catch (aiErr) {
    console.warn("CRM formatting failed/timed out, using fallback:", aiErr);
  }

  const fallbackCrm = `# پرونده مشتری در CRM (Customer Memory Record)
**تاریخ ثبت:** ${new Date().toLocaleDateString('fa-IR')}
**یادداشت مبنا:** ${rawNotes || 'جلسه ارزیابی نیازها'}

### ۱. پروفایل و زمینه کسب‌وکار (Profile & Context)
- مشتری در حال ارزیابی راهکارهای افزایش بهره‌وری و سیستم‌سازی فرآیندها است.

### ۲. نیازهای شناسایی‌شده و اولویت‌ها (Needs & Priorities)
- نیاز به ابزاری سریع با استقرار آسان و بدون پیچیدگی‌های سنگین نرم‌افزاری.
- آموزش و توانمندسازی تیم برای استفاده عملیاتی.

### ۳. دغدغه‌ها و نگرانی‌های مطرح‌شده (Objections)
- مدیریت زمان آموزش پرسنل و حفظ محرمانگی اطلاعات.

### ۴. توافقات و اقدامات بعدی (Next Actions & Commitments)
- ارسال پیش‌نویس نقشه راه اجرایی و برگزاری جلسه بررسی با مدیر ارشد در هفته آینده.

---
**خلاصه مدیریتی (Executive Summary برای همکاران):**
مشتری تمایل بالایی به بهینه‌سازی دارد؛ تمرکز اصلی در جلسه بعدی باید بر ارائه شواهد ملموس از بازگشت سرمایه و رفع ابهام در امنیت داده‌ها باشد.`;

  res.json({ result: fallbackCrm });
});

// 8. S.C.O.O.V Prompt Builder
app.post("/api/generate-scoov-prompt", async (req, res) => {
  const { situation, context, objective, output, verification } = req.body;

  try {
    const ai = getGenAIClient();
    if (ai) {
      const prompt = `بر اساس ۵ رکن چارچوب S.C.O.O.V در کارگاه Sales AI MVP:
- Situation (شرایط): ${situation}
- Context (اطلاعات زمینه): ${context}
- Objective (هدف): ${objective}
- Output (نوع خروجی): ${output}
- Verification (روش اعتبارسنجی): ${verification}

یک Prompt کامل، حرفه‌ای و آماده استفاده برای مدل هوش مصنوعی بنویس که کاربر بتواند مستقیماً آن را کپی کرده و در AI وارد کند.
همچنین ۳ توصیه برای بهینه‌سازی بیشتر این Prompt اضافه کن.`;

      const response = await callGeminiWithTimeout(ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
      }));

      if (response && response.text) {
        return res.json({ result: response.text });
      }
    }
  } catch (aiErr) {
    console.warn("SCOOV prompt generation failed/timed out, using fallback:", aiErr);
  }

  const fallbackScoov = `# پرامپت مهندسی‌شده با چارچوب S.C.O.O.V

\`\`\`markdown
تو به عنوان یک مشاور ارشد فروش B2B و استراتژیست ارتباطات عمل می‌کنی.

[SITUATION - شرایط و موقعیت]:
${situation || 'در حال آماده‌سازی برای ارتباط با یک مشتری سازمانی مهم هستیم.'}

[CONTEXT - داده‌های زمینه و مشخصات]:
${context || 'مشتری در حوزه صنعت و فناوری فعالیت دارد و به دنبال بهینه‌سازی فرآیندهای کاری است.'}

[OBJECTIVE - هدف نهایی]:
${objective || 'ایجاد علاقه اولیه و تعیین یک جلسه گفتگوی ۱۵ دقیقه‌ای اکتشافی.'}

[OUTPUT FORMAT - ساختار خروجی]:
${output || 'یک پیام حرفه‌ای، کوتاه و بدون زیاده‌گویی به همراه موضوع ایمیل پیشنهادی و تفکیک Factها از Hypothesisها.'}

[VERIFICATION - اعتبارسنجی]:
${verification || 'بررسی کن که لحن کاملاً مشاوره‌ای و غیرتبلیغاتی باشد و هیچ ادعای اثبات‌نشده‌ای در متن وجود نداشته باشد.'}
\`\`\`

---
### ۳ توصیه برای حداکثر اثربخشی:
1. داده‌های خام واقعی از پروفایل مشتری را در بخش Context اضافه کنید.
2. همیشه خروجی تولیدشده توسط AI را قبل از ارسال با معیارهای Verification مرور کنید.
3. در هر پرامپت تنها بر یک هدف اصلی و یک Call to Action تمرکز نمایید.`;

  res.json({ result: fallbackScoov });
});

// 9. Organizational AI Maturity Diagnostic & 90-Day Roadmap Generator (Hooshraan AI Maturity Framework v1.1)
app.post("/api/generate-org-diagnostic", async (req, res) => {
  const { 
    companyName, 
    industry, 
    employeeCount, 
    dimensionScores, 
    overallScore, 
    maturityLevel, 
    targetScores,
    ambitionOutcome,
    ambitionConstraint,
    topGaps,
    topStrengths,
    scaleRiskAlert,
    isGated,
    gateExplanation,
    recommendations,
  } = req.body;

  try {
    const ai = getGenAIClient();
    if (ai) {
      const prompt = `تو مشاور ارشد و تحلیل‌گر ارشد چارچوب ارزیابی بلوغ هوش مصنوعی هوشران هستی.
نام برند دقیقاً «هوشران» است (هرگز از «هوش ران» یا «هوش‌ران» استفاده نکن).

مشخصات سازمان مورد ارزیابی:
- نام شرکت / سازمان: ${companyName || 'سازمان در حال ارزیابی'}
- صنعت / حوزه فعالیت: ${industry || 'کسب‌وکار و فناوری'}
- مقیاس پرسنلی: ${employeeCount || '۵۰ تا ۲۵۰ نفر'}
- امتیاز کل بلوغ هوش مصنوعی: ${overallScore} از ۵.۰ (سطح بلوغ: ${maturityLevel || 'تعریف‌شده'})
${isGated ? `- وضعیت گیت گلوگاه: اعمال شده (${gateExplanation})` : ''}
${scaleRiskAlert ? `- هشدار ریسک مقیاس‌پذیری حاکمیت: ${scaleRiskAlert}` : ''}

امتیاز و اهداف ابعاد ۷‌گانه بلوغ سازمانی (نسخه ۱.۱ چارچوب هوشران):
1. استراتژی و رهبری (وزن ۱۵٪): امتیاز فعلی ${dimensionScores?.strategy ?? '-'} | هدف: ${targetScores?.strategy ?? '-'}
2. ارزش کسب‌وکار و Use Caseها (وزن ۲۰٪): امتیاز فعلی ${dimensionScores?.business_value ?? '-'} | هدف: ${targetScores?.business_value ?? '-'}
3. افراد، مهارت و فرهنگ (وزن ۱۵٪): امتیاز فعلی ${dimensionScores?.people ?? '-'} | هدف: ${targetScores?.people ?? '-'}
4. حاکمیت، ریسک و اعتماد (وزن ۱۵٪): امتیاز فعلی ${dimensionScores?.governance ?? '-'} | هدف: ${targetScores?.governance ?? '-'}
5. آمادگی داده (وزن ۱۵٪): امتیاز فعلی ${dimensionScores?.data ?? '-'} | هدف: ${targetScores?.data ?? '-'}
6. فناوری و مهندسی (وزن ۱۰٪): امتیاز فعلی ${dimensionScores?.technology ?? '-'} | هدف: ${targetScores?.technology ?? '-'}
7. سازمان و مدل عملیاتی (وزن ۱۰٪): امتیاز فعلی ${dimensionScores?.operating_model ?? '-'} | هدف: ${targetScores?.operating_model ?? '-'}

چشم‌انداز و جاه‌طلبی (Ambition):
- مهم‌ترین نتیجه مورد انتظار در ۱۲ تا ۲۴ ماه آینده: ${ambitionOutcome || 'اتوماسیون هوشمند فرآیندها و افزایش ارزش کسب‌وکار'}
- مهم‌ترین محدودیت و مانع فعلی: ${ambitionConstraint || 'کمبود مهارت‌های تخصصی و مسائل یکپارچگی داده'}

برترین قوت‌ها: ${topStrengths ? JSON.stringify(topStrengths) : 'شناسایی فرصت‌ها و انگیزه اولیه تیم'}
اصلی‌ترین شکاف‌ها (Top Gaps): ${topGaps ? JSON.stringify(topGaps) : 'حاکمیت داده، آموزش نقش‌محور و مدل عملیاتی CoE'}
پیشنهادهای راهبردی هوشران: ${recommendations ? JSON.stringify(recommendations) : 'کارگاه‌های تخصصی هوشران'}

لطفاً یک «تحلیل راهبردی اجرایی و نقشه راه ۹۰ روزه تا ۱۲ ماهه» به زبان فارسی و با ادبیات مشاوره‌ای فاخر، دقیق، بدون گزافه‌گویی تبلیغاتی و منطبق بر نیازمندی‌های این سازمان تولید کن که شامل موارد زیر باشد:
۱. تحلیل عمیق وضعیت فعلی و علل ریشه‌ای گلوگاه‌ها
۲. برنامه اقدام ۹۰ روزه (فاز ۱: روزهای ۱ تا ۳۰، فاز ۲: روزهای ۳۱ تا ۶۰، فاز ۳: روزهای ۶۱ تا ۹۰) با اقدامات مشخص و KPI
۳. نقشه راه تحول ۶ تا ۱۲ ماهه برای رسیدن به اهداف تعیین‌شده
۴. راهنمای اجرایی خدمات پیشنهادی هوشران متناسب با اولویت‌های سازمانی`;

      const response = await callGeminiWithTimeout(ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
      }));

      if (response && response.text) {
        return res.json({ result: response.text });
      }
    }
  } catch (aiErr) {
    console.warn("Org diagnostic generation failed/timed out, using resilient report:", aiErr);
  }

  // High quality structured fallback
  const fallbackReport = `## تحلیل عمیق وضعیت فعلی و گلوگاه‌های راهبردی
سازمان **«${companyName || 'سازمان در حال ارزیابی'}»** با امتیاز موزون کل **${overallScore || '۳.۰'} از ۵.۰** در سطح **«${maturityLevel || 'عملیاتی'}»** قرار دارد.

### گلوگاه‌های کلیدی و تحلیل شکاف:
- **تحلیل حاکمیت و ریسک:** ${Number(dimensionScores?.governance || 0) < 2 ? 'با توجه به اینکه امتیاز حاکمیت کمتر از سطح ۲ است، مقیاس‌گذاری ابزارها ریسک بالای نقض امنیت و پراکندگی دارد و ایجاد خط‌مشی مکتوب اولین اولویت است.' : 'زیرساخت حاکمیت در وضعیت قابل قبولی قرار دارد و باید به سمت پایش مستمر ارتقا یابد.'}
- **تحلیل آمادگی داده:** ${Number(dimensionScores?.data || 0) < 3 ? 'کیفیت و دسترسی به داده‌ها نیازمند تعیین مالکیت دقیق و استانداردسازی خط لوله داده است.' : 'داده‌ها ساختار مناسبی دارند و آماده اتصال به کاربردهای پیشرفته هستند.'}
- **چشم‌انداز و هدف‌گذاری:** تمرکز اصلی باید بر رفع موانع دستیابی به «${ambitionOutcome || 'ارتقای بهره‌وری سازمانی'}» از طریق رفع محدودیت «${ambitionConstraint || 'مهارت و یکپارچگی سامانه‌ها'}» باشد.

---

## برنامه اقدام ۹۰ روزه (90-Day Action Plan)

### 🔹 فاز ۱ (روزهای ۱ تا ۳۰): پایه‌گذاری و تدوین الزامات
- تدوین و ابلاغ سند خط‌مشی استفاده مسئولانه و امن از هوش مصنوعی (AI Policy).
- فهرست‌برداری از Use Caseها و ایجاد چارچوب اولویت‌بندی بر اساس ارزش و امکان‌پذیری.
- آغاز برنامه آموزش سواد هوش مصنوعی (AI Literacy) برای مدیران و لایه‌های کلیدی.

### 🔹 فاز ۲ (روزهای ۳۱ تا ۶۰): اجرای پایلوت‌های منتخب و توانمندسازی
- اجرای ۲ تا ۳ پایلوت اولویت‌دار با تعریف دقیق KPI و سنجه‌های بازگشت سرمایه.
- راه‌اندازی فرآیند نظارت انسانی (Human Oversight) برای بررسی خروجی‌های حساس.
- اتصال اولیه‌سامانه‌های داده‌ای و استانداردسازی الگوهای پرامپت‌نویسی.

### 🔹 فاز ۳ (روزهای ۶۱ تا ۹۰): ارزیابی، استانداردسازی و تثبیت
- سنجش نتایج پایلوت‌ها و تصمیم‌گیری مبتنی بر شواهد برای توسعه یا توقف.
- تشکیل شبکه مروجان داخلی (AI Champions) در واحدهای مختلف کسب‌وکار.
- تدوین گزارش ارزیابی سه‌ماهه اول و آماده‌سازی نقشه راه مقیاس‌پذیری.

---

## نقشه راه ۶ تا ۱۲ ماهه (6-12 Month Transformation Roadmap)
- **ماه ۴ تا ۶:** استانداردسازی گردش‌کارها، اتصال جامع APIها و راه‌اندازی مرکز تعالی (AI CoE).
- **ماه ۷ تا ۹:** بازطراحی فرآیندهای اصلی کسب‌وکار و تعمیم کاربردهای هوش مصنوعی در چند واحد.
- **ماه ۱۰ تا ۱۲:** استقرار مدیریت پایدار چرخه حیات مدل‌ها و دستیابی به سطح بلوغ هدف‌گذاری‌شده.`;

  res.json({ result: fallbackReport });
});

// 10. Veo Video Generation Endpoints
app.post("/api/generate-video", async (req, res) => {
  try {
    const { prompt, aspectRatio = '16:9', resolution = '720p' } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "متن پرامپت ویدیو الزامی است." });
    }

    const ai = getGenAIClient();
    if (!ai) {
      return res.status(400).json({ error: "کلید GEMINI_API_KEY برای تولید ویدیو تنظیم نشده است." });
    }

    const modelName = "veo-3.1-lite-generate-preview";

    console.log(`Starting video generation with prompt: "${prompt}", model: ${modelName}, aspectRatio: ${aspectRatio}`);

    const operation = await ai.models.generateVideos({
      model: modelName,
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: resolution as '720p' | '1080p',
        aspectRatio: aspectRatio as '16:9' | '9:16',
      },
    });

    console.log(`Video operation started: ${operation.name}`);
    res.json({ operationName: operation.name });
  } catch (error: any) {
    console.error("Error starting video generation:", error);
    res.status(500).json({ error: error.message || "خطا در شروع ساخت ویدیو با Veo" });
  }
});

app.post("/api/video-status", async (req, res) => {
  try {
    const { operationName } = req.body;
    if (!operationName) {
      return res.status(400).json({ error: "نام عملیات الزامی است." });
    }

    const ai = getGenAIClient();
    if (!ai) {
      return res.status(400).json({ error: "کلید GEMINI_API_KEY تنظیم نشده است." });
    }

    const op = new GenerateVideosOperation();
    op.name = operationName;

    const updated = await ai.operations.getVideosOperation({ operation: op });
    res.json({
      done: updated.done,
      error: updated.error?.message,
      operationName: updated.name,
    });
  } catch (error: any) {
    console.error("Error checking video status:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/video-download", async (req, res) => {
  try {
    const { operationName } = req.body;
    if (!operationName) {
      return res.status(400).json({ error: "نام عملیات الزامی است." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY تنظیم نشده است." });
    }

    const ai = getGenAIClient();
    if (!ai) {
      return res.status(500).json({ error: "سرویس هوش مصنوعی در دسترس نیست." });
    }

    const op = new GenerateVideosOperation();
    op.name = operationName;

    const updated = await ai.operations.getVideosOperation({ operation: op });
    const uri = updated.response?.generatedVideos?.[0]?.video?.uri;

    if (!uri) {
      return res.status(400).json({ error: "ویدیو هنوز آماده نشده یا آدرس ویدیو یافت نشد." });
    }

    console.log(`Fetching video stream from URI: ${uri}`);
    const videoRes = await fetch(uri, {
      headers: { "x-goog-api-key": apiKey },
    });

    if (!videoRes.ok) {
      return res.status(videoRes.status).json({ error: `خطا در دانلود ویدیو: ${videoRes.statusText}` });
    }

    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Cache-Control", "public, max-age=3600");

    if (videoRes.body) {
      const reader = videoRes.body.getReader();
      const pump = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          res.write(value);
        }
        res.end();
      };
      await pump();
    } else {
      const arrayBuffer = await videoRes.arrayBuffer();
      res.send(Buffer.from(arrayBuffer));
    }
  } catch (error: any) {
    console.error("Error downloading video:", error);
    res.status(500).json({ error: error.message });
  }
});

// --- VITE MIDDLEWARE SETUP ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
