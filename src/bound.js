import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

class PDFCreator {
  pageSize
  pdf
  
  constructor (targetContent, pageSize) {
    this.pageSize = pageSize
    this.pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: this.pageSize,
    })
    this.targetContent = targetContent
  }
  
  /**
   * 转换单位px->mm
   */
  
  convertUnit (num) {
    num = (num / 3.78).toFixed(3)
    return Number(num)
  }
  
  exportPDF () {
    html2canvas(this.targetContent).then(canvas => {
      const imageData = canvas.toDataURL('image/png', 0.5);
      // 获取图片宽高比来适应PDF页面
      const imgWidth = this.convertUnit(this.targetContent.offsetWidth);
      const imgHeight = this.convertUnit((canvas.height * this.targetContent.offsetWidth) / canvas.width);
      const pageHeight = this.pdf.internal.pageSize.getHeight()
      let remainHeight = imgHeight
      let position = 0
      while (remainHeight > 0) {
        const currentHeight = Math.min(imgHeight, remainHeight)
        this.pdf.addImage(imageData, 'JPG', 0, -position, imgWidth, imgHeight)
        remainHeight -= currentHeight
        position += currentHeight
        if (currentHeight > 0) {
          this.pdf.addPage()
        }
      }
      this.pdf.save("download.pdf");
    });
  }
}

const targetContent = document.getElementById('content')


const downloadBtn = document.getElementById('download')
downloadBtn.addEventListener('click', () => {
  console.log(111)
  const pdfCreator = new PDFCreator(targetContent, 'a4');
  pdfCreator.exportPDF();
})


