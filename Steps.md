# Quotations - Generación y gestión de cotizaciones.

Calcular prima y cobertura = cotizacion inicial

## Urls

- https://www.zurich.com.ar/comercios-y-profesionales/cotiza-comercio

## <mark>Get - Cotizaciones base

- Consulta la cotización básica
- Sin tomar en cuenta el historial negativo o positivo de los datos/cliente

## <mark>Post - createProposal(data) POST /proposals

- Crear cotizacion personalizada aproximada
- Crea la propuesta basada en una cotización inicial, incorporando historial, validaciones y coberturas finales.
- Fetch api externa
- Response send email to Cliente

### Tablas involucladas

1. Principal

- - Solicitudes: Estado aceptado/rechazado

2. Complementarias

- - Curstomers: Datos e historial positivo y negativo
- - Tipo de cobertura
- -
- - Prima

---

updateProposal(id, data) PATCH /proposals/:id Ajusta la propuesta antes de que el cliente acepte.

//
// Actualizar propuesta (opcional)
// PATCH /quotations/:id → updateProposal(id, data)
// Permite cambios solicitados por el cliente antes de aceptar.
//

acceptProposal(id) POST /proposals/:id/accept Cliente acepta la propuesta → dispara la emisión de póliza o underwriting final.
rejectProposal(id) POST /proposals/:id/reject Cliente rechaza la propuesta.
getProposal(id) GET /proposals/:id Consulta detalles de la propuesta formal.
listProposals(userId) GET /proposals Lista todas las propuestas generadas para un cliente.
//
// Consultar historial / listados (opcional)
// GET / quotations → getAllQuotations()
// GET / quotations /: id → getQuotation(id)

---

## Underwriting

## Policies
