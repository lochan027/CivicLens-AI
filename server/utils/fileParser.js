import { promises as fs } from 'fs';

async function extractTextFromFile(filePath, mimeType) {
  try {
    if (mimeType === 'text/plain') {
      // Handle plain text files
      const content = await fs.readFile(filePath, 'utf8');
      return content;
    } else if (mimeType === 'application/pdf') {
      // Handle PDF files with dynamic import
      try {
        const pdfParse = (await import('pdf-parse')).default;
        const dataBuffer = await fs.readFile(filePath);
        const pdfData = await pdfParse(dataBuffer);
        return pdfData.text;
      } catch (pdfError) {
        console.error('PDF parsing error:', pdfError);
        throw new Error('Failed to parse PDF file. Please try a .txt file instead.');
      }
    } else {
      throw new Error('Unsupported file type');
    }
  } catch (error) {
    console.error('File parsing error:', error);
    throw new Error('Failed to extract text from file: ' + error.message);
  }
}

export {
  extractTextFromFile
};