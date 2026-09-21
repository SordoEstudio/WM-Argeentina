// Texts for the ES/EN bilingual "Su Socio en Argentina" / "Your Partner in Argentina" page.
// Long copy lives in src/data/pages.json; this file covers UI labels, form fields and errors.

export type Locale = 'es' | 'en';

const ui = {
  es: {
    nav: {
      partnerPage: 'Su Socio en Argentina',
      langSwitch: 'English',
    },
    partner: {
      formTitle: 'Evaluar una alianza con WM Argentina',
      submitCta: 'Evaluar una alianza con WM Argentina',
      successHeading: 'Gracias por su consulta',
      successBody: 'Nuestro equipo se va a poner en contacto con usted a la brevedad.',
      errorGeneric: 'Ocurrió un error al enviar el formulario. Por favor intentá de nuevo.',
      fields: {
        companyName: 'Nombre de la empresa',
        country: 'País',
        website: 'Sitio web',
        currentMarkets: 'Mercados actuales',
        contactName: 'Nombre',
        contactRole: 'Cargo',
        contactEmail: 'Correo electrónico',
        contactPhone: 'Teléfono',
        area: 'Área',
        description: 'Descripción de la tecnología',
        presenceInArgentina: 'Presencia actual en Argentina',
        certifications: 'Certificaciones o aprobaciones',
        commercialMarkets: 'Mercados donde se comercializa',
      },
      errors: {
        required: 'Este campo es obligatorio.',
        invalidEmail: 'Ingrese un correo electrónico válido.',
        invalidUrl: 'Ingrese una URL válida.',
      },
    },
  },
  en: {
    nav: {
      partnerPage: 'Your Partner in Argentina',
      langSwitch: 'Español',
    },
    partner: {
      formTitle: 'Explore a partnership with WM Argentina',
      submitCta: 'Explore a partnership with WM Argentina',
      successHeading: 'Thank you for your inquiry',
      successBody: 'Our team will reach out to you shortly.',
      errorGeneric: 'An error occurred while submitting the form. Please try again.',
      fields: {
        companyName: 'Company name',
        country: 'Country',
        website: 'Website',
        currentMarkets: 'Current markets',
        contactName: 'Name',
        contactRole: 'Title',
        contactEmail: 'Email',
        contactPhone: 'Phone',
        area: 'Area',
        description: 'Technology description',
        presenceInArgentina: 'Current presence in Argentina',
        certifications: 'Certifications or approvals',
        commercialMarkets: 'Markets where the product is sold',
      },
      errors: {
        required: 'This field is required.',
        invalidEmail: 'Please enter a valid email address.',
        invalidUrl: 'Please enter a valid URL.',
      },
    },
  },
} as const;

export function t(locale: Locale): (typeof ui)['es'] {
  return ui[locale] as (typeof ui)['es'];
}
