 import React, { useMemo } from 'react';

function countWords(text) {
  return (text || '')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean).length;
}

export default function CoverLetter({ coverLetter, onCopy, onDownloadPDF, disabled }) {
  const stats = useMemo(() => {
    const chars = (coverLetter || '').length;
    const words = countWords(coverLetter);
    return { chars, words };
  }, [coverLetter]);

  return (
    <div className="resultCard">
      <div className="resultHeader">
        <div>
          <div className="resultTitle">Your cover letter</div>
          <div className="resultMeta">
            {coverLetter ? (
              <>
                <span>{stats.words} words</span>
                <span>•</span>
                <span>{stats.chars} characters</span>
              </>
            ) : (
              'Generate to see the output.'
            )}
          </div>
        </div>

        <div className="resultActions">
          <button className="btn btnSmall" type="button" onClick={onCopy} disabled={disabled}>
            Copy
          </button>
          <button className="btn btnSmall btnIndigo" type="button" onClick={onDownloadPDF} disabled={disabled}>
            Download PDF
          </button>
        </div>
      </div>

      <div className="resultBody">
        {coverLetter ? (
          <pre className="letterPre">{coverLetter}</pre>
        ) : (
          <div className="emptyState">
            <div className="emptyIcon">Cover Letter</div>

            <div className="emptyText">Your generated cover letter will appear here.</div>
          </div>
        )}
      </div>
    </div>
  );
}

