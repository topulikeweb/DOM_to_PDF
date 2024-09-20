import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

class PDFCreator {
  
  constructor (targetContent) {
    this.targetContent = targetContent
  }
  
  /**
   * 转换单位px->mm
   */
  
  convertUnit (num) {
    num = (num / 3.78).toFixed(3)
    return Number(num)
  }
  
  /**
   * 翻页
   */
  pageTurning () {
  
  }
  
  exportPDF () {
    html2canvas(this.targetContent).then(canvas => {
      const imageData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })
      
      // 获取图片宽高比来适应PDF页面
      const imgWidth = this.convertUnit(this.targetContent.offsetWidth); // A4 尺寸的宽度为 210mm
      const pageHeight = 297; // A4 尺寸的高度为 297mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imageData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("download.pdf");
    });
  }
}

const targetContent = document.getElementById('content')
const downloadBtn = document.getElementById('download')
downloadBtn.addEventListener('click', () => {
  const pdfCreator = new PDFCreator(targetContent);
  pdfCreator.exportPDF();
})


