import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

class PDFCreator {
  pageSize
  pdf
  
  constructor (targetContent) {
    this.pageSize = 'a4'
    this.pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: this.pageSize,
    })
    this.targetContent = targetContent
  }
  
  exportPDF () {
    html2canvas(this.targetContent, {
      allowTaint: false,
      useCORS: true,
      scale: 2
    }).then((canvas) => {
      let contentWidth = canvas.width;
      let contentHeight = canvas.height;
      //一页pdf显示html页面生成的canvas高度;
      let pageHeight = contentWidth / 592.28 * 841.89;
      //未生成pdf的html页面高度
      let leftHeight = contentHeight;
      //页面偏移
      let position = 0;
      //a4纸的尺寸[595.28,841.89]
      let imgWidth = 595.28;
      let imgHeight = 592.28 / contentWidth * contentHeight;
      let pageData = canvas.toDataURL('image/jpeg', 1.0);
      //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      //当内容未超过pdf一页显示的范围，无需分页
      if (leftHeight < pageHeight) {
        this.pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
      } else {    // 分页
        while (leftHeight > 0) {
          this.pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
          leftHeight -= pageHeight;
          position -= 841.89;
          //避免添加空白页
          if (leftHeight > 0) {
            this.pdf.addPage();
          }
        }
      }
      this.pdf.save('download.pdf');
    })
  }
}

const targetContent = document.getElementById('content')


const downloadBtn = document.getElementById('download')
downloadBtn.addEventListener('click', () => {
  const pdfCreator = new PDFCreator(targetContent);
  pdfCreator.exportPDF();
})


