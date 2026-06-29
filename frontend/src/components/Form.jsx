import React, { useMemo, useState } from 'react';

function Field({ label, hint, children }) {
  return (
    <label className="field">
      <div className="fieldHeader">
        <div className="fieldLabel">{label}</div>
        {hint ? <div className="fieldHint">{hint}</div> : null}
      </div>
      {children}
    </label>
  );
}

export default function Form({ form, setForm, onGenerate, onReset, disabled }) {
  const [touched, setTouched] = useState(false);

  const errors = useMemo(() => {
    const e = {};
    if (!form.name.trim()) e.name = 'Candidate name is required.';
    if (!form.role.trim()) e.role = 'Job role is required.';
    if (!form.company.trim()) e.company = 'Target company is required.';
    if (!form.skills.trim()) e.skills = 'Skills are required.';
    if (!form.experience.trim()) e.experience = 'Experience is required.';
    if (!form.education.trim()) e.education = 'Education is required.';
    return e;
  }, [form]);

  const hasErrors = Object.keys(errors).length > 0;

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (!touched) setTouched(true);
  }

  return (
    <div className="form">
      <Field label="Candidate Name">
        <input
          className="input"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          placeholder="e.g., Jordan Smith"
          type="text"
        />
        {touched && errors.name ? <div className="fieldError">{errors.name}</div> : null}
      </Field>

      <Field label="Email (Optional)">
        <input
          className="input"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder="e.g., jordan@example.com"
          type="email"
        />
      </Field>

      <div className="row2">
        <Field label="Job Role">
          <input
            className="input"
            value={form.role}
            onChange={(e) => update('role', e.target.value)}
            placeholder="e.g., Software Engineer"
            type="text"
          />
          {touched && errors.role ? <div className="fieldError">{errors.role}</div> : null}
        </Field>

        <Field label="Target Company">
          <input
            className="input"
            value={form.company}
            onChange={(e) => update('company', e.target.value)}
            placeholder="e.g., Acme Corp"
            type="text"
          />
          {touched && errors.company ? <div className="fieldError">{errors.company}</div> : null}
        </Field>
      </div>

      <Field label="Skills" hint="Comma-separated">
        <textarea
          className="textarea"
          value={form.skills}
          onChange={(e) => update('skills', e.target.value)}
          placeholder="e.g., React, Node.js, SQL, AWS"
          rows={3}
        />
        {touched && errors.skills ? <div className="fieldError">{errors.skills}</div> : null}
      </Field>

      <div className="row2">
        <Field label="Experience">
          <textarea
            className="textarea"
            value={form.experience}
            onChange={(e) => update('experience', e.target.value)}
            placeholder="Summarize relevant experience..."
            rows={5}
          />
          {touched && errors.experience ? <div className="fieldError">{errors.experience}</div> : null}
        </Field>

        <Field label="Education">
          <textarea
            className="textarea"
            value={form.education}
            onChange={(e) => update('education', e.target.value)}
            placeholder="Degrees, certifications, etc..."
            rows={5}
          />
          {touched && errors.education ? <div className="fieldError">{errors.education}</div> : null}
        </Field>
      </div>

      <div className="actions">
        <button
          className="btn btnPrimary"
          type="button"
          onClick={onGenerate}
          disabled={disabled || hasErrors}
        >
          Generate Cover Letter
        </button>
        <button className="btn btnGhost" type="button" onClick={onReset} disabled={disabled}>
          Reset Form
        </button>
      </div>

      <div className="formHelp">
        {hasErrors ? <span className="helpWarn">Fill required fields to generate.</span> : <span className="helpOk">Ready.</span>}
      </div>
    </div>
  );
}

