const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * Create ATS-friendly cover letter using Gemini.
 */
async function generateCoverLetter(req, res) {
  try {
    const {
      name,
      role,
      company,
      skills,
      experience,
      education,
      resumeText
    } = req.body || {};

    // Basic validation (friendly + safe)
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Candidate name is required.' });
    }
    if (!role || typeof role !== 'string' || !role.trim()) {
      return res.status(400).json({ error: 'Job role is required.' });
    }
    if (!company || typeof company !== 'string' || !company.trim()) {
      return res.status(400).json({ error: 'Target company is required.' });
    }
    if (!skills || typeof skills !== 'string' || !skills.trim()) {
      return res.status(400).json({ error: 'Skills are required.' });
    }
    if (!experience || typeof experience !== 'string' || !experience.trim()) {
      return res.status(400).json({ error: 'Experience is required.' });
    }
    if (!education || typeof education !== 'string' || !education.trim()) {
      return res.status(400).json({ error: 'Education is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Gemini API key is not configured on the server.' });
    }

    // Prompt engineering (ATS-friendly + strict max words)
    const systemPrompt =
      'You are an expert HR recruiter.\n\n' +
      'Generate a professional ATS-friendly cover letter.\n\n' +
      'Requirements:\n' +
      '* Maximum 350 words (do not exceed)\n' +
      '* Professional tone\n' +
      '* Mention candidate skills naturally\n' +
      '* Mention the company name\n' +
      '* Mention the applied job role\n' +
      '* Write a strong introduction\n' +
      '* Highlight achievements\n' +
      '* End with a confident closing statement.';

    const resumeBlock = resumeText && resumeText.trim()
      ? `\n\nResume details (for personalization):\n${resumeText.trim()}`
      : '';

    const userPrompt =
      `Candidate information:\n` +
      `Name: ${name.trim()}\n` +
      `Applied role: ${role.trim()}\n` +
      `Target company: ${company.trim()}\n` +
      `Skills: ${skills.trim()}\n` +
      `Experience: ${experience.trim()}\n` +
      `Education: ${education.trim()}` +
      resumeBlock +
      `\n\nGenerate the cover letter now.`;

    // Gemini client
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash'
    });

    // Use proper model request shape (contents -> parts[text])
    // Note: Some Gemini responses can be empty if request is malformed.
    const result = await model.generateContent({
      contents: [
        { role: 'user', parts: [{ text: systemPrompt + '\n\n' + userPrompt }] }
      ]
    });

    const text = result?.response?.text?.() ?? '';
    if (!text.trim()) {
      return res.status(502).json({ error: 'Gemini returned an empty response.' });
    }

    return res.json({ coverLetter: text.trim() });
  } catch (err) {
    const message = err?.message || 'Unknown error';

    // Invalid key
    if (message.toLowerCase().includes('invalid') && message.toLowerCase().includes('key')) {
      return res.status(401).json({ error: 'Invalid Gemini API key.' });
    }

    // Likely network / provider errors
    if (
      message.toLowerCase().includes('fetch') ||
      message.toLowerCase().includes('network') ||
      message.toLowerCase().includes('failed to fetch')
    ) {
      return res.status(503).json({
        error: 'Network error while contacting Gemini. Check your internet connection and API key permissions.'
      });
    }

    return res.status(500).json({ error: 'Failed to generate cover letter. Please try again.' });
  }
}

module.exports = { generateCoverLetter };

