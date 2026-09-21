export const prerender = false;

import type { APIRoute } from 'astro';
import { contactSchema } from '../../lib/forms/schemas';
import { formSink } from '../../lib/forms/sink';
import type { ApiResponse } from '../../lib/forms/schemas';

export const POST: APIRoute = async ({ request }) => {
  // Block dev sink in production (SPEC §8, checklist §1)
  if (import.meta.env.PROD && import.meta.env.FORM_SINK !== 'cms') {
    return new Response(JSON.stringify({ ok: false, error: 'server_error' } satisfies ApiResponse), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Only accept POST from same origin
  const origin = request.headers.get('origin');
  const siteUrl = import.meta.env.SITE_URL ?? '';
  if (siteUrl && origin && !siteUrl.startsWith(origin)) {
    return new Response(JSON.stringify({ ok: false, error: 'forbidden' } satisfies ApiResponse), {
      status: 403,
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

  const parsed = contactSchema.safeParse(body);

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

  // Honeypot check
  if (parsed.data._hp) {
    // Return 200 to avoid revealing spam detection
    return new Response(JSON.stringify({ ok: true } satisfies ApiResponse), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    await formSink.save('contact', parsed.data, {
      kind: 'contact',
      originPage: request.headers.get('referer') ?? undefined,
      submittedAt: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ ok: true } satisfies ApiResponse), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[api/contact] save error', err);
    return new Response(JSON.stringify({ ok: false, error: 'server_error' } satisfies ApiResponse), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
