# Policy Management Service

   - CRUD de pólizas
   - Cálculo de primas
   - Renovaciones automáticas

Desafíos técnicos:

1. Cálculo de Primas:
   - Parallel processing por tipo de seguro
   - Cache distribuido para tablas actuariales
   - Async validation de datos del cliente

## CONTRATOS (Policy)

- Atributos: 
  - tipo.
  - número de póliza.
  - fecha de inicio/vencimiento.
  - cobertura. (Subentidad de una póliza o producto: robo, accidente, incendio)
  - estado.
  - prima.

Gestión de Pólizas:
- Cotización: Cálculo de prima según riesgo
- Emisión: Generación del contrato
- Renovación: Proceso automático/manual
- Modificaciones: Cambios en cobertura
- Cancelación: Terminación del contrato

Datos clave:
- Asegurado (persona/empresa)
- Bien asegurado: InsuranceType: seguro de auto, vida, hogar, salud.Vehículo / Propiedad / Persona asegurada
- Coberturas incluidas
- Deducibles y límites
- Vigencia (inicio/fin)
- Prima (costo del seguro)
__________________________

## **🎯 NÚCLEO CENTRAL: Policy (Póliza)**

La póliza es el **corazón** del sistema. Todo gira alrededor de ella:

```
PÓLIZA = Contrato entre Aseguradora y Cliente
├── Estado (activa, suspendida, cancelada)
├── Vigencia (desde/hasta)
├── Prima (costo mensual/anual)
├── Coberturas (qué está protegido)
└── Deducibles (cuánto paga el cliente)
```

## **🔄 LÓGICA DE ESTADOS PRINCIPALES**

 - Crear usuario
 - Crear objeto asegurado
 - Validar historial 

- Solicitudes. Aceptacion / rechazo / motivo

- Cotizacion provisional basada en tarifas estándar
- - Cobertura
- - Limite de suma asegurada 


3️⃣ Evaluación de riesgo

Para calcular la prima, la aseguradora analiza el riesgo individual del cliente y del bien asegurado.

Factores comunes en Argentina:

Características del asegurado:

Edad, sexo, profesión, historial de siniestros.

Características del bien:

Valor asegurado.

Antigüedad del bien (ej: autos más antiguos pagan menos o más según riesgo).

Ubicación geográfica (zonas de mayor siniestralidad o robo aumentan la prima).

Historial de siniestralidad:

Reclamos previos del asegurado.

Datos estadísticos del mercado para bienes similares.

Cobertura y deducible:

Coberturas más amplias implican mayor prima.

Franquicia más alta reduce la prima.

Regulación local:

Superintendencia de Seguros de la Nación (SSN) establece límites y tablas que las aseguradoras deben respetar.

4️⃣ Cálculo de la prima

La prima es la cantidad que el asegurado paga por su cobertura. Se calcula generalmente así:
Prima = Valor Base × Factor de Riesgo × Ajustes de Cobertura y Franquicia

Valor Base: porcentaje del valor asegurado según tipo de seguro.
Factor de Riesgo: multiplicador según edad, historial, ubicación, etc.
Ajustes: descuentos por buen historial, promociones, aumento por coberturas adicionales.

Ejemplo simplificado:
Valor asegurado auto: $2.000.000 ARS
Tarifa base: 3% anual → $60.000 ARS
Ajuste riesgo joven conductor +20% → $72.000 ARS
Franquicia alta -10% → $64.800 ARS
Prima final: $64.800 ARS/año


5️⃣ Emisión de cotización final

Una vez calculada la prima, se envía al cliente como cotización oficial.

Puede incluir opciones de pago (mensual, anual) y beneficios adicionales.

6️⃣ Aprobación y emisión de póliza

Si el cliente acepta la cotización, se emite la póliza y se registra la prima como obligación de pago.

Desde ese momento, la aseguradora asume el riesgo cubierto por la póliza.

### **1. Creación de Póliza**
```
Cliente solicita → Cotización → Evaluación Riesgo → Emisión → Activación
```

**Reglas de Negocio:**
- Solo se puede activar si el primer pago está confirmado
- La vigencia comienza en la fecha especificada
- Las coberturas quedan "congeladas" al momento de emisión
