# PDF Filter by Names

A Node.js tool to automatically filter PDF pages containing ID cards or documents based on a list of names. Extract only the pages you need from large PDF files by matching names against your data.

## 🚀 Features

- ✅ **Automatic Text Extraction**: Scans PDFs with readable text layers (no OCR required)
- ✅ **Name Matching**: Filters pages containing specific names from your dataset
- ✅ **Case-Insensitive Search**: Matches names regardless of capitalization
- ✅ **Flexible Input**: Accept names from JSON objects or Excel files
- ✅ **Batch Processing**: Process multi-page PDFs with hundreds of ID cards
- ✅ **Detailed Logging**: Shows which pages are included/skipped and matched names
- ✅ **Clean Output**: Creates new PDF with only matching pages

## 📋 Requirements

- Node.js (v14 or higher)
- PDF files with selectable text layer (not scanned images)

## 🛠️ Installation

1. Clone this repository:
bash
2.Install Dependencies
npm install
Dependencies
pdf-lib - PDF manipulation and page copying
pdf.js-extract - Text extraction from PDF pages

📖 Usage
Method 1: Using JSON Array (Hardcoded)
1.Edit the allowedNames array in app.js:
const allowedNames = [
  {
    Name: "John Doe",
    ID: 101,
    Department: "IT",
  },
  {
    Name: "Jane Smith",
    ID: 102,
    Department: "HR",
  },
];
2.Set your input and output paths:

javascript
const pdfInput = "./input/id-cards.pdf";
const pdfOutput = "./output/filtered-output.pdf";

3.Run the Script
node app.js


📊 Output Example
text
📋 Loaded 3 names
   Names: john doe, jane smith, bob wilson

📄 Loading PDF: ./input/id-cards.pdf
✅ PDF has 50 pages

📝 Extracting text from all pages...
✅ Text extraction complete

🔍 Filtering pages...
  ✅ Page 1 - INCLUDED (matched: john doe)
  ❌ Page 2 - SKIPPED
  ✅ Page 3 - INCLUDED (matched: jane smith)
  ❌ Page 4 - SKIPPED
  ...

✨ Filtering complete!
   Pages included: 3
   Pages skipped: 47
   📁 Filtered PDF saved to: ./output/filtered-output.pdf

🔍 How It Works
1.Load Names: Reads names from JSON array or Excel file

2.Extract Text: Uses pdf.js-extract to read text from each PDF page

3.Match Names: Compares page text with your name list (case-insensitive)

4.Copy Pages: Uses pdf-lib to copy matching pages to a new PDF

5.Save Output: Writes the filtered PDF to your specified output path

⚠️ Important Notes
Text Layer Required
✅ PDFs with selectable text (e.g., digitally created PDFs)

❌ Scanned images without OCR (text appears as images)

To check if your PDF has text layer:

1.Open the PDF

2.Try to select/copy text from it

3.If you can copy text, it will work with this tool

Name Matching
Names are matched using substring search

Case-insensitive: "JOHN DOE" matches "john doe"

Partial matches work: "John" will match "John Doe"

Ensure names in Excel/JSON match exactly with names in PDF

🐛 Troubleshooting
No pages matched
Check if names in your data exactly match names in PDF

Verify PDF has text layer (not scanned image)

Try copying text from PDF manually to check format

Module not found
bash
npm install
Permission errors
Ensure you have write permissions for the output directory.

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

📝 License
MIT License - feel free to use this project for personal or commercial purposes.

👨‍💻 Author
Mohammed Sinan - github.com/sinan5023

🙏 Acknowledgments
pdf-lib - PDF manipulation

pdf.js-extract
 - Text extraction

xlsx - Excel file parsing

📧 Support
For issues and questions, please open an issue on GitHub.



