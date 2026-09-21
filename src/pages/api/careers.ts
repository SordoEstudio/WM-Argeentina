export const prerender = false;

import type { APIRoute } from 'astro';
import { careersSchema } from '../../lib/forms/schemas';
import { formSink } from '../../lib/forms/sink';
import type { ApiResponse } from '../../lib/forms/schemas';

export const POST: APIRoute = async ({ request }) => {
  if (import.meta.env.PROD && import.meta.env.FORM_SINK !== 'cms') {
    return new Response(JSON.stringify({ ok: false, error: 'server_error' } satisfies ApiResponse), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: Record<string, unknown>;
  const contentType = request.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    body = await request.json();
  } else {
    const fd = await request.formData();
    body = Object.fromEntries(fd.entries());
  }

  const parsed = careersSchema.safeParse(body);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form');
      errors[key] = issue.message;
    }
    return new Response(JSON.stringify({ ok: false, errors } satisfies ApiResponse), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (parsed.data._hp) {
    return new Response(JSON.stringify({ ok: true } satisfies ApiResponse), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    await formSink.save('careers', parsed.data, {
      kind: 'careers',
      originPage: request.headers.get('referer') ?? undefined,
      submittedAt: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ ok: true } satisfies ApiResponse), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[api/careers] save error', err);
    return new Response(JSON.stringify({ ok: false, error: 'server_error' } satisfies ApiResponse), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
