// FormSink — abstraction layer for persisting form submissions.
// Fase 1: devSink (logs only, never persists).
// Fase 2: cmsSink (saves to CMS Harvi via public API).
//
// The build MUST fail if FORM_SINK=dev in production (checked in each API endpoint).

export interface SubmissionMeta {
  kind: 'contact' | 'partner' | 'careers';
  locale?: string;
  originPage?: string;
  submittedAt: string;
}

export interface FormSink {
  save(kind: SubmissionMeta['kind'], payload: unknown, meta: SubmissionMeta): Promise<void>;
}

const devSink: FormSink = {
  async save(kind, payload, meta) {
    console.log(`[FormSink:dev] ${kind}`, JSON.stringify({ payload, meta }, null, 2));
  },
};

const CMS_FORM_SLUGS: Record<SubmissionMeta['kind'], string> = {
  contact: 'contacto',
  partner: 'partner-inquiry',
  careers: 'careers',
};

const cmsSink: FormSink = {
  async save(kind, payload, meta) {
    const api = import.meta.env.CMS_API;
    const clientSlug = import.meta.env.CMS_CLIENT_SLUG;
    if (!api || !clientSlug) {
      throw new Error('cmsSink: CMS_API and CMS_CLIENT_SLUG must be set when FORM_SINK=cms');
    }
    const formSlug = CMS_FORM_SLUGS[kind];
    const url = `${api}/forms/${formSlug}/submit?clientSlug=${clientSlug}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload as object, _meta: meta }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`cmsSink: CMS returned ${res.status} — ${text}`);
    }
  },
};

function getSink(): FormSink {
  const sink = import.meta.env.FORM_SINK;
  if (sink === 'cms') return cmsSink;
  return devSink;
}

export const formSink = getSink();
