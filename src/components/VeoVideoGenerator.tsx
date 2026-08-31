import React, { useState, useEffect, useRef } from 'react';
import { VEO_VIDEO_PRESETS } from '../data/courseData';
import { Video, Sparkles, RefreshCw, Download, Play, Pause, Monitor, Smartphone, AlertCircle, CheckCircle2, Film } from 'lucide-react';

export const VeoVideoGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>(VEO_VIDEO_PRESETS[0].promptEn);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [resolution, setResolution] = useState<'720p' | '1080p'>('720p');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [operationName, setOperationName] = useState<string | null>(null);
  const [statusText, setStatusText] = useState<string>('');
  const [progressStep, setProgressStep] = useState<number>(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const pollingTimerRef = useRef<any>(null);

  const loadingMessages = [
    'در حال ارسال درخواست تولید ویدیو به مدل Veo 3.1 Fast...',
    'هوش مصنوعی Veo 3 در حال رندر اولیه صحنه، نورپردازی و افکت‌های بصری است...',
    'پردازش لایه‌های گرافیکی و انیمیشن‌های هوشمند ویدیوی آموزشی...',
    'تنظیم نهایی کیفیت و کدک خروجی MP4...',
    'در حال دریافت جریان ویدیو و آماده‌سازی برای پخش...'
  ];

  const handleStartGeneration = async () => {
    if (!prompt.trim()) {
      setErrorMessage('لطفاً یک توصیف (Prompt) برای تولید ویدیو وارد کنید.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setVideoUrl(null);
    setProgressStep(0);
    setStatusText(loadingMessages[0]);

    try {
      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          aspectRatio,
          resolution,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'خطا در شروع عملیات ساخت ویدیو');
      }

      setOperationName(data.operationName);
      console.log('Video operation started:', data.operationName);
      startPolling(data.operationName);
    } catch (err: any) {
      console.error('Video generation error:', err);
      setErrorMessage(err.message || 'خطا در ارتباط با سرور ویدیو Veo 3');
      setIsLoading(false);
    }
  };

  const startPolling = (opName: string) => {
    let attempts = 0;

    const poll = async () => {
      attempts++;
      const messageIndex = Math.min(Math.floor(attempts / 2), loadingMessages.length - 1);
      setProgressStep(messageIndex);
      setStatusText(loadingMessages[messageIndex]);

      try {
        const res = await fetch('/api/video-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ operationName: opName }),
        });

        const statusData = await res.json();

        if (statusData.error) {
          throw new Error(statusData.error);
        }

        if (statusData.done) {
          // Operation completed, fetch video stream
          setStatusText('ویدیو آماده شد! در حال دانلود مستقیم...');
          await downloadAndSetVideo(opName);
        } else {
          // Continue polling every 6 seconds
          pollingTimerRef.current = setTimeout(poll, 6000);
        }
      } catch (err: any) {
        console.error('Polling error:', err);
        setErrorMessage(err.message || 'خطا در پیگیری وضعیت ساخت ویدیو');
        setIsLoading(false);
      }
    };

    poll();
  };

  const downloadAndSetVideo = async (opName: string) => {
    try {
      const res = await fetch('/api/video-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operationName: opName }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || 'خطا در دریافت فایل ویدیو');
      }

      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      setVideoUrl(objectUrl);
      setIsLoading(false);
    } catch (err: any) {
      console.error('Download video error:', err);
      setErrorMessage(err.message || 'خطا در دانلود ویدیو تولید شده');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (pollingTimerRef.current) {
        clearTimeout(pollingTimerRef.current);
      }
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
      
      {/* Banner / Intro */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 border border-purple-500/30 rounded-2xl p-6 sm:p-8 mb-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-start justify-between flex-wrap gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Film className="w-4 h-4 text-purple-400" />
              <span>قابلیت ویژه: تولید ویدیوهای آموزشی با Veo 3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              مولد هوشمند ویدیوی آموزشی با مدل Veo 3
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              از متن‌ها، سناریوهای جلسات فروش و سرفصل‌های کارگاه ویدیوی حرفه‌ای با رزولوشن بالا و نسبت ابعاد دلخواه (۱۶:۹ افقی یا ۹:۱۶ عمودی) تولید کنید.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-purple-500/20 border border-purple-500/40 px-3 py-1.5 rounded-xl text-xs font-semibold text-purple-200">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>مدل: veo-3.1-fast-generate-preview</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Control Panel (Prompting & Config) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Video className="w-5 h-5 text-indigo-400" />
              <span>تنظیمات و الگوی تولید ویدیو</span>
            </h3>

            {/* Presets */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">
                انتخاب سناریوی آماده دوره (Preset):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {VEO_VIDEO_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setPrompt(preset.promptEn)}
                    className={`p-3 rounded-xl border text-right text-xs transition ${
                      prompt === preset.promptEn
                        ? 'bg-purple-950/60 border-purple-500 text-purple-200 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-semibold text-slate-200">{preset.titleFa}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1 mt-1">{preset.promptFa}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Video Prompt Textarea */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                متن توصیف ویدیو (Prompt به انگلیسی یا فارسی):
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition leading-relaxed"
                placeholder="توصیف دقیق صحنه، افکت‌های بصری، کاراکترها و زاویه دوربین..."
              />
            </div>

            {/* Aspect Ratio Selector */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  نسبت ابعاد (Aspect Ratio):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAspectRatio('16:9')}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-bold transition ${
                      aspectRatio === '16:9'
                        ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Monitor className="w-4 h-4" />
                    <span>16:9 (افقی)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAspectRatio('9:16')}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-bold transition ${
                      aspectRatio === '9:16'
                        ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>9:16 (عمودی)</span>
                  </button>
                </div>
              </div>

              {/* Resolution Selector */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  کیفیت ویدیو (Resolution):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setResolution('720p')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition ${
                      resolution === '720p'
                        ? 'bg-slate-800 border-indigo-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    HD 720p
                  </button>
                  <button
                    type="button"
                    onClick={() => setResolution('1080p')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition ${
                      resolution === '1080p'
                        ? 'bg-slate-800 border-indigo-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Full HD 1080p
                  </button>
                </div>
              </div>
            </div>

            {/* Error Display */}
            {errorMessage && (
              <div className="bg-red-950/60 border border-red-500/50 p-4 rounded-xl text-red-200 text-xs flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block mb-0.5">خطا در فرآیند:</span>
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}

            {/* Action Generate Button */}
            <button
              onClick={handleStartGeneration}
              disabled={isLoading}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-bold rounded-xl text-sm transition shadow-xl shadow-purple-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin text-white" />
                  <span>در حال تولید ویدیو با Veo 3...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>تولید ویدیوی هوشمند آموزش فروش</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Preview Panel */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl h-full flex flex-col justify-center items-center relative overflow-hidden min-h-[400px]">
            
            {/* Case 1: Loading State */}
            {isLoading && (
              <div className="text-center p-8 space-y-6 max-w-md">
                <div className="relative w-20 h-20 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-purple-500/20 animate-ping" />
                  <div className="w-full h-full rounded-full border-4 border-t-purple-500 border-r-amber-400 border-b-indigo-500 border-l-cyan-400 animate-spin flex items-center justify-center">
                    <Film className="w-8 h-8 text-amber-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-base font-bold text-white">تولید ویدیو زمان‌بر است</h4>
                  <p className="text-xs text-purple-300 animate-pulse font-medium">{statusText}</p>
                </div>

                {/* Progress bar simulation */}
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-amber-400 transition-all duration-1000"
                    style={{ width: `${Math.min((progressStep + 1) * 20, 95)}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500">مدل veo-3.1-fast-generate-preview در حال پردازش آنلاین</p>
              </div>
            )}

            {/* Case 2: Video Available */}
            {!isLoading && videoUrl && (
              <div className="w-full space-y-4">
                <div className={`relative mx-auto rounded-xl overflow-hidden bg-black shadow-2xl border border-slate-800 ${
                  aspectRatio === '9:16' ? 'max-w-[280px] aspect-[9/16]' : 'w-full aspect-[16/9]'
                }`}>
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    controls
                    autoPlay
                    loop
                    className="w-full h-full object-cover"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                </div>

                <div className="flex items-center justify-between gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-bold text-slate-200">ویدیو با موفقیت ساخته شد</span>
                  </div>
                  <a
                    href={videoUrl}
                    download="veo3-sales-ai-lesson.mp4"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition shadow-lg shadow-emerald-600/20"
                  >
                    <Download className="w-4 h-4" />
                    <span>دانلود ویدیو (MP4)</span>
                  </a>
                </div>
              </div>
            )}

            {/* Case 3: Empty Placeholder */}
            {!isLoading && !videoUrl && (
              <div className="text-center p-8 text-slate-500 space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center mx-auto text-slate-600">
                  <Video className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400">پیش‌نمایش خروجی ویدیو</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">
                    پس از کلیک بر روی دکمه تولید، ویدیو رندر شده و در این کادر پخش می‌شود.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
