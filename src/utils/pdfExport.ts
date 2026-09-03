import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export interface PdfExportOptions {
  filename?: string;
  onProgress?: (step: string) => void;
}

/**
 * Checks whether the current window is running inside an iframe (like AI Studio preview).
 */
export function isRunningInIframe(): boolean {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

/**
 * Exports a DOM element as a high-resolution, multi-page A4 PDF document.
 * Preserves Persian typography, Vazirmatn font, Tailwind styles, badges, and charts.
 */
export async function exportElementToPdf(
  elementId: string,
  options: PdfExportOptions = {}
): Promise<boolean> {
  const {
    filename = 'گزارش-عارضه-یابی-هوش-مصنوعی-هوشران.pdf',
    onProgress,
  } = options;

  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found for PDF export.`);
    return false;
  }

  try {
    onProgress?.('در حال آماده‌سازی و رندر داده‌های گزارش...');

    // Wait a brief moment to ensure fonts and layout have settled
    await new Promise((resolve) => setTimeout(resolve, 150));

    // Check if the element contains designated discrete .pdf-page elements
    const pageElements = Array.from(element.querySelectorAll<HTMLElement>('.pdf-page'));

    if (pageElements.length > 0) {
      onProgress?.(`در حال پردازش سند ${pageElements.length} صفحه‌ای هوشران...`);

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      for (let i = 0; i < pageElements.length; i++) {
        const pageEl = pageElements[i];
        onProgress?.(`در حال تبدیل و رندر صفحه ${i + 1} از ${pageElements.length}...`);

        const pageCanvas = await html2canvas(pageEl, {
          scale: 2, // High resolution for ultra-sharp typography
          useCORS: true,
          logging: false,
          backgroundColor: i === 0 ? '#0f1c2e' : '#ffffff',
          windowWidth: 1000,
        });

        const imgData = pageCanvas.toDataURL('image/jpeg', 0.95);

        if (i > 0) {
          pdf.addPage();
        }

        // Full bleed A4 (210mm x 297mm) - individual page handles inner padding
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
      }

      onProgress?.('در حال نهایی‌سازی و ذخیره فایل PDF...');
      pdf.save(filename);
      return true;
    }

    onProgress?.('در حال تبدیل صفحات به کیفیت چاپی بالا (۲X)...');

    const canvas = await html2canvas(element, {
      scale: 2, // High resolution for crisp Persian typography & charts
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1200,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          // Optimize cloned element for standardized A4 print width
          clonedElement.style.width = '1140px';
          clonedElement.style.maxWidth = '1140px';
          clonedElement.style.margin = '0 auto';
          clonedElement.style.padding = '20px';
          clonedElement.style.backgroundColor = '#ffffff';
          clonedElement.style.borderRadius = '0px';

          // Hide any print-hidden elements inside cloned document
          const printHiddenElements = clonedDoc.querySelectorAll('.print\\:hidden, .print-hidden');
          printHiddenElements.forEach((el) => {
            (el as HTMLElement).style.display = 'none';
          });
        }
      },
    });

    onProgress?.('در حال صفحه‌بندی هوشمند PDF مطابق استاندارد A4...');

    // A4 dimensions in millimeters
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = 210;
    const pdfHeight = 297;
    const margin = 8; // 8mm margin
    const usableWidth = pdfWidth - margin * 2;
    const usableHeight = pdfHeight - margin * 2;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Number of canvas pixels per 1 mm in PDF
    const pxPerMm = canvasWidth / usableWidth;
    const pageHeightPx = Math.floor(usableHeight * pxPerMm);

    let renderedHeightPx = 0;
    let pageIndex = 0;

    while (renderedHeightPx < canvasHeight) {
      const currentChunkHeightPx = Math.min(pageHeightPx, canvasHeight - renderedHeightPx);

      // Create a sub-canvas for this specific page slice
      const chunkCanvas = document.createElement('canvas');
      chunkCanvas.width = canvasWidth;
      chunkCanvas.height = currentChunkHeightPx;

      const ctx = chunkCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvasWidth, currentChunkHeightPx);
        ctx.drawImage(
          canvas,
          0,
          renderedHeightPx,
          canvasWidth,
          currentChunkHeightPx,
          0,
          0,
          canvasWidth,
          currentChunkHeightPx
        );
      }

      const chunkImgData = chunkCanvas.toDataURL('image/jpeg', 0.95);
      const chunkHeightMm = currentChunkHeightPx / pxPerMm;

      if (pageIndex > 0) {
        pdf.addPage();
      }

      pdf.addImage(
        chunkImgData,
        'JPEG',
        margin,
        margin,
        usableWidth,
        chunkHeightMm,
        undefined,
        'FAST'
      );

      renderedHeightPx += currentChunkHeightPx;
      pageIndex++;
    }

    onProgress?.('در حال ذخیره و دانلود فایل PDF...');
    pdf.save(filename);
    return true;
  } catch (err) {
    console.error('PDF export failed:', err);
    return false;
  }
}
