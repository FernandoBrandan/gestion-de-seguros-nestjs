
# Billing Service


   - Facturación recurrente
   - Procesamiento de pagos
   - Manejo de mora

Desafíos técnicos:
 
- Billing Masivo:
   - Batch processing para millones de pólizas
   - Queue-based para retry de pagos fallidos
   - Distributed locks para evitar doble facturación

## FACTURACIÓN MENSUAL
Billing Engine:
- Cálculo de prima mensual/anual
- Generación automática de facturas
- Procesamiento de pagos
- Manejo de mora y suspensiones
- Comisiones a brokers/agentes

Flujo típico:
1. Sistema calcula prima del mes
2. Genera factura automáticamente
3. Envía por email/correo
4. Procesa pago (tarjeta/débito/banco)
5. Si no paga → suspende póliza