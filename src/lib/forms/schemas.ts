// Shared client/server form validation schemas.
// Same schemas used in browser (progressive enhancement) and in API endpoints.

import { z } from 'astro/zod';

// --- Shared fields ---

const emailField = z.string().email('Correo electrónico inválido').max(320);
const textField = (max = 500) => z.string().min(1, 'Campo obligatorio').max(max);
const optionalText = (max = 500) => z.string().max(max).optional();

// --- Contacto (POST /api/contact) ---

export const contactSchema = z.object({
  nombre: textField(200),
  institucion: textField(200),
  cargo: optionalText(200),
  provincia: optionalText(100),
  email: emailField,
  telefono: optionalText(50),
  solucion: optionalText(100),
  empresa: optionalText(200),
  tipoConsulta: optionalText(100), // D-17: opciones pendientes
  mensaje: textField(2000),
  // honeypot — debe estar vacío; llenado = bot
  _hp: z.string().max(0, 'Bot detected').optional(),
});

export type ContactPayload = z.infer<typeof contactSchema>;

// --- Su Socio en Argentina (POST /api/partner) ---

export const partnerSchema = z.object({
  // Empresa
  companyName: textField(300),
  country: textField(100),
  website: z.string().url('URL inválida').max(500).optional().or(z.literal('')),
  currentMarkets: optionalText(500),
  // Contacto
  contactName: textField(200),
  contactRole: optionalText(200),
  contactEmail: emailField,
  contactPhone: optionalText(50),
  // Tecnología
  area: optionalText(200),
  description: textField(2000),
  presenceInArgentina: optionalText(500),
  certifications: optionalText(500),
  commercialMarkets: optionalText(500),
  // meta
  locale: z.enum(['es', 'en']),
  _hp: z.string().max(0, 'Bot detected').optional(),
});

export type PartnerPayload = z.infer<typeof partnerSchema>;

// --- Trabajá con Nosotros (POST /api/careers) ---
// D-16: campos pendientes de confirmar. Esquema mínimo por ahora.

export const careersSchema = z.object({
  nombre: textField(200),
  email: emailField,
  area: optionalText(200),
  mensaje: textField(2000),
  _hp: z.string().max(0, 'Bot detected').optional(),
});

export type CareersPayload = z.infer<typeof careersSchema>;

// --- API response shapes ---

export interface ApiOk {
  ok: true;
}

export interface ApiError {
  ok: false;
  errors?: Record<string, string>;
  error?: string;
}

export type ApiResponse = ApiOk | ApiError;
