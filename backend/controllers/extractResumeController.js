const pdfParse = require('pdf-parse');

async function extractResumeText(req, res) {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ error: 'No PDF resume provided.' });
    }

    const data = await pdfParse(req.file.buffer);
    const text = (data?.text || '').trim();

    if (!text) {
      return res.status(422).json({ error: 'Could not extract text from the resume.' });
    }

    return res.json({ resumeText: text });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to extract resume text.' });
  }
}

module.exports = { extractResumeText };

