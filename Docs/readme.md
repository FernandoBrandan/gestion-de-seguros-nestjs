# ¿Qué hacen en el mundo real?

Las aseguradoras no giran TODAS alrededor de una única lógica de pólizas. 
Usan sistemas modulares donde cada módulo tiene lógica de negocio independiente y especializada:

* **Administración de pólizas** (sobrevivencia, emisión, renovación, cancelación).
* **Gestión de siniestros** (recepción, evaluación, liquidación, fraude).
* **Facturación & pagos** (invoicing, cobros, conciliación).
* **Suscripción / Underwriting** (evaluación de riesgo, primas).
* **CRM / atención al cliente** (gestión de clientes, agentes, comunicaciones).
* **Comisionamiento a agentes**.
* **Cotización / Quotes** (previsiones antes de emitir una póliza).
* **Comisiones**.
* **Documentación y archivo**.
* **Flujos de trabajo / automatización**.
* **Reportes / dashboards**.

Cada uno de estos es un bounded context con su propio lenguaje y modelos. 
Esa modularidad es la realidad, y DDD permite manejarla con gracia. (learn.microsoft.com–– especialmente párrafos sobre “policy workflow”, “auditing”, “billing”, etc.) 

- Destaca módulos como “administración de pólizas”, “claims”, “CRM”, “billing”, “underwriting”, “reporting”, etc. Esto permite escalabilidad, integración isotécnica, y despliegues independientes en cada parte del negocio.
- - [Link](https://www.decerto.com/post/key-components-of-modular-architecture-for-insurance-systems?utm_source=chatgpt.com)
- La industria de seguros es compleja: requiere manejar underwriting, múltiples líneas de producto, costes, fraude, normativas… DDD ayuda a gestionar esa complejidad alineando software con el negocio.
- - [Link](https://medium.com/%40curiousraj/introduction-to-domain-driven-design-ddd-in-insurance-5826bc8e3112?utm_source=chatgpt.com)
- Se modelan agregados como `Policy`, `Claim`, `Payment`, para mantener consistencia y transacciones disciplinadas.
- Se usan eventos de dominio (e.g., `ClaimSubmitted`) para orquestar flujos entre módulos (fraude, notificaciones, pagos).
- - [Link](https://medium.com/%40curiousraj/why-p-c-insurance-needs-domain-driven-design-ddd-d46ef74f7de3?utm_source=chatgpt.com)
- - [Link](https://en.wikipedia.org/wiki/Guidewire_Software?utm_source=chatgpt.com)


- [Link](https://learn.microsoft.com/en-us/archive/msdn-magazine/2009/february/best-practice-an-introduction-to-domain-driven-design)

- [Link](https://medium.com/%40curiousraj/introduction-to-domain-driven-design-ddd-in-insurance-5826bc8e3112)

- [Link](https://devcookies.medium.com/domain-driven-design-a-practical-guide-to-building-better-software-1793f37f6850)


---

### Perspectivas de desarrolladores

Lo que piensan en Reddit, para traerlo más terrenal:

- “La aplicación consistente de DDD hace el desarrollo predecible... la complejidad se maneja bien”
- “Los equipos llegan y en par de semanas ya están arreglando errores de un microservicio sin conocer todo el sistema”
[Link](https://www.reddit.com/r/softwarearchitecture/comments/1i6dru3?utm_source=chatgpt.com)

Pero también aparecen advertencias:

- “DDD no es una bala de plata… puede convertirse en espagueti si hay poco testing o plazos apurados.”
[Link](https://www.reddit.com/r/dotnet/comments/rwqole?utm_source=chatgpt.com)

---


# Sistema de Gestión de Seguros - Desglose Completo

## RELACIONES ENTRE MÓDULOS:

User → Puede crear/gestionar pólizas y customers
Customer → Puede tener múltiples pólizas
Poliza → Referencia a Customer (como tomador/asegurado) y User (quien la gestiona)

## Flujo Completo de Ejemplo


Escenario: Juan tiene seguro de auto y choca

1. PÓLIZA ACTIVA:
   - Juan paga $200/mes por seguro todo riesgo
   - Sistema factura automáticamente cada mes
   - Póliza vigente con deducible $500

2. OCURRE EL SINIESTRO:
   - Juan choca y daña su auto
   - Llama o usa app para reportar claim
   - Sistema asigna número de claim: CLM-2024-001234

3. PROCESAMIENTO:
   - Sistema valida que póliza esté vigente
   - Asigna ajustador automáticamente
   - Ajustador inspecciona daños: $3,000
   - Sistema verifica cobertura: ✓ Cubierto

4. PAGO:
   - Indemnización: $3,000 - $500 (deducible) = $2,500
   - Sistema genera cheque/transferencia
   - Actualiza historial del cliente

# Otros adicionales

## Archivo / Documentación (Document)

- PDF de la póliza, documentación del siniestro, fotos, etc.

## Comisión (Commission)

- Cálculo y liquidación de comisiones para agentes.

## Cotización (Quote) - tabla paralela a policy

- Paso previo a la emisión de una póliza.
- Muestra una simulación con opciones.

# Extra: Entidades transversales (más técnicas)

- Notificación (Notification) – para alertas por correo, SMS, etc.
- Auditoría / Logs (AuditLog) – quién modificó qué.
- Tarea / Workflow (Task) – si manejás flujos automáticos de aprobación o revisión.

## Por ejemplo:

- Un Customer tiene muchas Policies
- Una Policy está asociada a un Product, tiene muchas Coverages, puede tener Claims y Payments
- Un Claim tiene Documents
