// FormSink — abstraction layer for persisting form submissions.
// Fase 1: devSink (logs only, never persists).
// Fase 2: cmsSink (saves to CMS Harvi — requires H-01 documentation).
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

// Fase 2: implement cmsSink using CMS_WRITE_TOKEN + CMS_URL (see docs/07-integracion-cms-y-deploy.md)
// TODO-PENDIENTE(D-09) No inventar la API del CMS hasta tener su documentación.
const cmsSink: FormSink = {
  async save() {
    throw new Error('cmsSink not implemented yet (D-09): waiting for CMS API documentation.');
  },
};

function getSink(): FormSink {
  const sink = import.meta.env.FORM_SINK;
  if (sink === 'cms') return cmsSink;
  return devSink;
}

export const formSink = getSink();
