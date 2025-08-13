RELACIONES ENTRE MÓDULOS:

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
