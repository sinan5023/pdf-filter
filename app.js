const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const { PDFExtract } = require("pdf.js-extract");

// extract the data from the pdf pages
async function getAllPageTexts(pdfPath) {
  const pdfExtract = new PDFExtract();
  const data = await pdfExtract.extract(pdfPath, {});

  const pageTexts = data.pages.map((page) => {
    const text = page.content.map((item) => item.str).join(" ");
    return text.toLowerCase();
  });

  return pageTexts;
}

// filter the pdf by names
async function filterPdfByNames(pdfPath, allowedNamesData, outputPath) {
  try {
    const allowedNames = new Set();
    for (const person of allowedNamesData) {
      if (person.Name && typeof person.Name === "string") {
        allowedNames.add(person.Name.trim().toLowerCase());
      }
    }

    console.log(`📋 Loaded ${allowedNames.size} names`);
    console.log(`   Names: ${Array.from(allowedNames).join(", ")}\n`);

    console.log(`📄 Loading PDF: ${pdfPath}`);
    const pdfBuffer = fs.readFileSync(pdfPath);
    const srcDoc = await PDFDocument.load(pdfBuffer);
    const totalPages = srcDoc.getPageCount();
    console.log(`✅ PDF has ${totalPages} pages\n`);

    console.log(`📝 Extracting text from all pages...`);
    const pageTexts = await getAllPageTexts(pdfPath);
    console.log(`✅ Text extraction complete\n`);

    const dstDoc = await PDFDocument.create();
    let includedCount = 0;
    let skippedCount = 0;

    console.log(`🔍 Filtering pages...`);

    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
      const text = pageTexts[pageIndex] || "";
      let match = false;
      let matchedName = "";

      for (const name of allowedNames) {
        if (text.includes(name)) {
          match = true;
          matchedName = name;
          break;
        }
      }

      if (match) {
        const [copiedPage] = await dstDoc.copyPages(srcDoc, [pageIndex]);
        dstDoc.addPage(copiedPage);
        console.log(
          `  ✅ Page ${pageIndex + 1} - INCLUDED (matched: ${matchedName})`
        );
        includedCount++;
      } else {
        console.log(`  ❌ Page ${pageIndex + 1} - SKIPPED`);
        skippedCount++;
      }
    }
    if (includedCount > 0) {
      const pdfBytes = await dstDoc.save();
      fs.writeFileSync(outputPath, pdfBytes);
      console.log(`\n✨ Filtering complete!`);
      console.log(`   Pages included: ${includedCount}`);
      console.log(`   Pages skipped: ${skippedCount}`);
      console.log(`   📁 Filtered PDF saved to: ${outputPath}`);
    } else {
      console.log(`\n⚠️  No matching pages found. No PDF created.`);
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// enter youre data as a json object
const allowedNames = [];

// Run the filter
// provide the path to youre input pdf and also the output of the pdf
const pdfInput = "/Users/sinan/Developer/pdf-filter /pdfs/09.pdf";
const pdfOutput =
  "/Users/sinan/Developer/pdf-filter /pdfout/filtered-output.pdf";

filterPdfByNames(pdfInput, allowedNames, pdfOutput);
