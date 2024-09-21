# DOM_to_PDF

- 介绍
  - 封装和扩展了jsPDF的功能，实现了传入DOM，然后生成PDF的功能，如果你想对你页面的部分地方，比如报表，等等转换为PDF，那么这个项目可能会给你很好的帮助


- 技术
  - jsPDF
  - html2canvas
  - webpack
  
- 目前只支持了a4纸，但如果需要支持其他尺寸的纸，在代码中调整纸张宽度就行

- 如何使用？
  - 本地运行
```js
npm run start
```
  - 使用方式
```js
const targetContent = document.getElementById('content')


const downloadBtn = document.getElementById('download')
downloadBtn.addEventListener('click', () => {
  const pdfCreator = new PDFCreator(targetContent, 'a4');
  pdfCreator.exportPDF();
})

```
