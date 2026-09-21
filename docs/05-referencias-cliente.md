# Referencias del cliente (fuente de verdad ante dudas)

Si `docs/` y este archivo se contradicen, **gana este archivo** y se registra la discrepancia en `08-decisiones-pendientes.md`.

- Documento fuente: Google Doc "Diseño de la página 2026" (id `1gCprRrREIkEaBZWzj5mV5WbgVbUkGIb3`), copiado abajo tal cual se leyó el 21/09/2026. Incluye **comentarios del redactor** mezclados con el contenido (ej.: "Evitaría prometer…", "No duplicaría la ficha…"). Se tratan como criterio de diseño/editorial, no como texto publicable (T-12).
- Sitio actual: https://www.wmargentina.com.ar/empresa/ (leído el 21/09/2026).

---

## A. Datos del sitio actual (`/empresa/`)

- Cita: "Nacimos hace 21 años…" (el documento nuevo dice "+30 años", que es el que rige, T-13).
- **Misión (actual):** Acercar a los profesionales de la salud la más alta tecnología para el diagnóstico y tratamiento, impulsando la transparencia y la honestidad en la concreción de los negocios.
- **Visión (actual):** Ser una empresa argentina referente en el sector de la salud, reconocida por su gestión eficiente y transparente.
- **Valores (actuales):** Dinamismo, Cercanía, Compromiso hacia adentro y hacia afuera de la compañía. *(El documento nuevo los reemplaza por seis: Calidad, Cliente, Servicio, Conocimiento, Confianza, Compromiso.)*
- **Casa Central:** Angel Peluffo 3944 - C1202ABB, CABA, Argentina. **Sedes:** Mendoza, Tandil.
- **Horarios:** lunes a viernes, de 8 a 17 hs. **Tel.:** (54 11) 4982.8500 / (54 11) 4982.1455.
- **Marcas exhibidas (7):** Alifax, Horiba, Instrumentation Laboratory, Liaison, Biokit, Medical System, Ortho.
- **Menú actual:** Empresa · Productos (Diagnóstico con 12 categorías, Banco de sangre, Marcas) · Atención al cliente · Contacto. Además, enlace "Blog de Hemostasia" a un dominio anterior.
- La papelería del manual de marca muestra otra dirección: Serrano 1769, B7000 Tandil (ejemplo de aplicación). **Datos oficiales: P-06.**
- Metadatos: `robots: noindex, nofollow` y `og:url` apuntando a otro dominio: **no replicar**.

---

## B. Documento de estructura aprobado (texto íntegro)

> Notas iniciales del documento:
> - Se podría poner una [CTA] en cada sección para que sea rápido ir al formulario de contacto o sección de soluciones.
> - **CTA (Call To Action):** uno o dos botones que indican qué hacer después, por ejemplo "Conocer nuestras soluciones" o "Contactar un especialista".

### HOME – INICIO
2 o 3 banners con info relevante, editables.

### NOSOTROS
Explicar el modelo de WM.

Más de 30 años de trayectoria, presencia en todo el país y un equipo de profesionales especializados respaldan nuestro compromiso con la calidad, bajo certificaciones y habilitaciones vigentes.

**Misión:** Acercamos tecnología y conocimiento al diagnóstico argentino, construyendo relaciones de largo plazo con clientes y compañías internacionales y acompañando cada solución con un servicio posventa especializado, para contribuir a mejores decisiones para los pacientes y al desarrollo de nuestro país.

**Visión:** Ser el socio estratégico de referencia para clientes y compañías internacionales en el mercado argentino de diagnóstico, reconocidos por nuestra trayectoria, especialización, servicio y capacidad para transformar tecnología en valor para la salud.

**Valores**
- **Calidad:** Hacemos las cosas bien porque nuestro trabajo forma parte de decisiones que importan.
- **Cliente:** Escuchamos, comprendemos y construimos relaciones de largo plazo.
- **Servicio:** Acompañamos la tecnología durante todo su ciclo de vida.
- **Conocimiento:** La especialización y el aprendizaje continuo guían nuestro trabajo.
- **Confianza:** Construimos alianzas transparentes y sostenibles.
- **Compromiso:** Crecemos contribuyendo a nuestros clientes, los pacientes y la sociedad de la que formamos parte.

**Titular:** Detrás de cada diagnóstico, hay una decisión que importa.

Acercamos tecnología y conocimiento para contribuir a diagnósticos confiables y decisiones clínicas más seguras.

Soluciones integrales para laboratorios de análisis clínicos y bancos de sangre, con tecnología internacional y soporte especializado.

**Nuestro propósito:** Contribuir a que la comunidad médica y bioquímica disponga de tecnología confiable que permita obtener información diagnóstica de calidad y tomar mejores decisiones para los pacientes.

*(Nota del redactor: evitaría prometer "el diagnóstico más exacto" porque, desde comunicación sanitaria, es una afirmación absoluta difícil de sostener.)*

### SOLUCIONES
*(Nota del redactor: la mejor organización sería Líneas → Instrumentos → Reactivos / Consumibles → Sistemas de Gestión, distinguiendo claramente dos universos.)*

**1. Dentro de cada Solución** — ejemplo HEMOSTASIA:

A. Sistemas / Plataformas
- Instrumento A: descripción y aplicaciones · reactivos compatibles · controles y calibradores · consumibles · software asociado · documentación técnica
- Instrumento B: misma estructura

`INSTRUMENTO → Aplicaciones → Reactivos compatibles → Consumibles y controles → Software / conectividad → Documentación`

*No separaría los reactivos del instrumento que los utiliza. El usuario que está evaluando una plataforma necesita comprender el sistema completo.*

B. Luego también los reactivos que no requieren un instrumento: producto con foto de caja, descripción, ordenados por Líneas. Aquí deben aparecer los productos que pueden utilizarse en equipamiento universal o abierto, sin obligar al usuario a entrar primero por un instrumento.

El buscador general del sitio sí debería permitir buscar directamente por producto, ensayo, analito, instrumento o marca.

Un producto (Reactivos y Consumibles) puede aparecer en más de un recorrido. No duplicaría la ficha del producto. Por ejemplo, un reactivo podría encontrarse desde:
- Inmunología → Reactivos → Reactivo X
- Instrumento Y → Reactivos compatibles → Reactivo X

Ambos enlaces llevan a una única ficha del producto.

La arquitectura debería permitir dos formas de comprar/buscar simultáneamente:
- "Necesito una solución completa" → Instrumento → Reactivos → Consumibles → Software.
- "Ya tengo equipamiento y necesito un producto" → Reactivos / Controles / Consumibles → filtro por aplicación y compatibilidad.

Ese doble recorrido representa mucho mejor cómo compra realmente un laboratorio y evita convertir la web en un simple catálogo por marcas.

**Cómo estructuraría la base de productos** — cada producto con atributos estructurados:

| Campo | Ejemplo |
|---|---|
| Línea | Inmunología |
| Categoría | Reactivo |
| Subcategoría | Autoinmunidad |
| Empresa | DiaSorin |
| Plataforma | Instrumento X |
| Compatibilidad | Específica / Sistema abierto |
| Aplicación | Diagnóstico de... |
| Presentación | XXX determinaciones |
| Productos relacionados | Control / calibrador |
| Documentación | Ficha / brochure |
| Estado | Comercializado / discontinuado |

Esto permite que mañana tengan 500 o 1.000 referencias sin tener que rediseñar la web.

**Listado tentativo de Soluciones:** Anatomía Patológica, Hemostasia, Química Seca, Hematología, Inmunología, Biología Molecular, Banco de Sangre, Diagnóstico Veterinario, Cadena de Frío, Sistemas Informáticos.

### PRODUCTOS
Por línea – productos – Brochure comercial en PDF.

### SERVICIOS
Asesoramiento · Aplicaciones · Instalación y puesta en marcha · Capacitación · Servicio Técnico · Integración y conectividad. Cada servicio puede expandirse dentro de la misma página.

### NOVEDADES Y CONOCIMIENTO
Novedades (casos de éxito, eventos, *[texto truncado en el original]*). Debe contribuir al posicionamiento científico y SEO.
Secciones: Novedades · Eventos · Contenido Científico · Empresas Representadas. Cada una con una sección que filtre por palabras clave.
Cada publicación: Categoría + imagen + fecha + título + resumen + Leer más.

### CONTACTO
Debe ser un formulario comercial inteligente.
Campos: Nombre · Institución/empresa · Cargo · Provincia · Email · Teléfono · Solución de interés · Empresa representada · Tipo de consulta · Mensaje.
CTA: Enviar consulta.
Las consultas de fabricantes internacionales no deben entrar por este formulario. Deben dirigirse a Su socio en Argentina.

### SU SOCIO EN ARGENTINA
Esta página tiene un público completamente diferente: fabricantes internacionales que todavía no están presentes en Argentina o buscan un socio local.

**HERO:** Desarrolle su mercado en Argentina.
Experiencia local, especialización técnica y alcance nacional para desarrollar tecnologías internacionales en el mercado argentino.

**Texto:** En WM Argentina construimos relaciones de largo plazo con compañías internacionales. Más de 30 años en el mercado del diagnóstico nos permiten comprender sus actores, particularidades y oportunidades.

**CTA:** Evaluar una alianza con WM Argentina

**¿Por qué WM Argentina?** (formato cards): +30 años de experiencia · Cobertura nacional · Mercado público y privado · Especialización técnica · Soporte local de excelencia · Experiencia con compañías internacionales.

**Cómo acompañamos el desarrollo:** breve descripción sobre cómo trabajamos.
Recorrido visual: Ingreso al mercado → Desarrollo comercial → Lanzamiento → Implementación → Soporte → Crecimiento. Explicar cada etapa incluyendo servicios regulatorios.

**Mercados que conocemos:** Laboratorios · Hospitales y clínicas · Bancos de sangre · Sector público · Diagnóstico veterinario · Industria farmacéutica · Otros mercados relacionados con nuestras nuevas áreas.

**Empresas que confían en WM:** mostrar las 12 empresas representadas (social proof B2B).

**Formulario exclusivo de contacto:** ver `03-formularios.md`. CTA: Evaluar una alianza con WM Argentina.

### TRABAJÁ CON NOSOTROS
**HERO:** Ser parte de WM es ser parte de una cadena de valor que contribuye a mejorar la vida de las personas.

**Texto:** Nuestro trabajo acerca tecnología a bioquímicos, médicos, laboratorios y bancos de sangre. Entendemos que detrás de nuestro trabajo hay un paciente, una familia esperando un resultado; un médico para tomar decisiones. Buscamos personas que quieran aportar conocimiento, compromiso y profesionalismo a una actividad donde la calidad importa pero por sobre todo la empatía con las personas.

**Bloques:** Nuestra cultura · Áreas profesionales · Búsquedas abiertas · Desarrollo · Formulario "Trabajá con nosotros" – WM Argentina · Base de Talentos.

**Texto de apertura:** Sumate a una cadena de valor que contribuye a mejorar la vida de las personas. En WM Argentina trabajamos acercando tecnología y conocimiento a laboratorios, profesionales e instituciones de salud. Buscamos personas que quieran desarrollarse en una compañía donde la especialización, el compromiso y la calidad forman parte de nuestro trabajo cotidiano. Envianos un mail y adjuntanos tu CV.

**CTA:** Quiero ser parte de WM
