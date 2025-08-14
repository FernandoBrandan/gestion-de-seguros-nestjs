
# ¿Qué hacen en el mundo real?

Las aseguradoras no giran TODAS alrededor de una única lógica de pólizas. 
Usan sistemas modulares donde cada módulo tiene lógica de negocio independiente y especializada:

Policy Management (emisión, renovación, cancelación)
Claims Processing (reclamos, ajustes, pagos)
Billing & Payments
Underwriting (evaluación de riesgo)
CRM / Atención al Cliente
Quoting
Comisiones, Documentación, Workflow, Reporting, etc.

Cada uno de estos es un bounded context con su propio lenguaje y modelos. 
Esa modularidad es la realidad, y DDD permite manejarla con gracia. (learn.microsoft.com–– especialmente párrafos sobre “policy workflow”, “auditing”, “billing”, etc.) 


https://learn.microsoft.com/en-us/archive/msdn-magazine/2009/february/best-practice-an-introduction-to-domain-driven-design

https://medium.com/%40curiousraj/introduction-to-domain-driven-design-ddd-in-insurance-5826bc8e3112

https://devcookies.medium.com/domain-driven-design-a-practical-guide-to-building-better-software-1793f37f6850



# RELACIONES ENTRE MÓDULOS:

User → Puede crear/gestionar pólizas y customers
Customer → Puede tener múltiples pólizas
Poliza → Referencia a Customer (como tomador/asegurado) y User (quien la gestiona)

# Entidades principales (core del dominio)

## Usuario (User)

## Póliza (Policy)

- Representa un contrato de seguro.
- Atributos típicos: tipo, número de póliza, fecha de inicio/vencimiento, cobertura, estado, prima.

## Producto de seguro (InsuranceProduct)

- Por ejemplo: seguro de auto, vida, hogar, salud.
- Define las reglas y coberturas base, usadas para generar pólizas.

## Vehículo / Propiedad / Persona asegurada (InsuredAsset) -> enum InsuranceType

- Lo que se está asegurando.
- Puede variar según el producto.

## Siniestro (Claim)

- Evento reportado que puede generar una compensación.
- Estado: reportado, en evaluación, aprobado, rechazado, pagado.

## Cliente (Customer)

- Persona o empresa que contrata la póliza.
- Puede tener múltiples pólizas.

## Pago (Payment)

- Registro de pagos de primas.
- Métodos: tarjeta, débito automático, transferencia.

## Cobertura (Coverage)

- Subentidad de una póliza o producto.
- Por ejemplo: cobertura de robo, accidente, incendio.

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
