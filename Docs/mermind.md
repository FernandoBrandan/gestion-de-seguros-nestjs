stateDiagram-v2
[*] --> Cotizacion : Cliente solicita seguro

    state "Proceso de Cotización" as Cotizacion {
        [*] --> Calculando_Prima
        Calculando_Prima --> Cotizacion_Generada
        Cotizacion_Generada --> Cotizacion_Aprobada : Cliente acepta
        Cotizacion_Generada --> Cotizacion_Rechazada : Cliente rechaza
        Cotizacion_Aprobada --> [*]
        Cotizacion_Rechazada --> [*]
    }

    Cotizacion --> Underwriting : Cotización aprobada

    state "Evaluación de Riesgo" as Underwriting {
        [*] --> Evaluando_Riesgo
        Evaluando_Riesgo --> Riesgo_Aprobado : Riesgo aceptable
        Evaluando_Riesgo --> Riesgo_Rechazado : Riesgo muy alto
        Riesgo_Aprobado --> [*]
        Riesgo_Rechazado --> [*]
    }

    Underwriting --> Emision : Riesgo aprobado
    Underwriting --> [*] : Riesgo rechazado

    state "Póliza Activa" as Emision {
        [*] --> Poliza_Emitida
        Poliza_Emitida --> Poliza_Vigente : Primer pago realizado

        state "Estados de Facturación" as Billing {
            [*] --> Factura_Generada
            Factura_Generada --> Factura_Pagada : Pago recibido
            Factura_Generada --> Factura_Vencida : No pago a tiempo
            Factura_Vencida --> Poliza_Suspendida : Mora prolongada
            Factura_Vencida --> Factura_Pagada : Pago tardío
            Factura_Pagada --> [*]
        }

        Poliza_Vigente --> Billing : Ciclo mensual
        Billing --> Poliza_Vigente : Factura pagada
        Billing --> Poliza_Suspendida : Mora prolongada

        state "Proceso de Claims" as Claims {
            [*] --> Siniestro_Reportado
            Siniestro_Reportado --> En_Evaluacion : Ajustador asignado
            En_Evaluacion --> Claim_Aprobado : Cobertura confirmada
            En_Evaluacion --> Claim_Rechazado : No cubierto
            Claim_Aprobado --> Indemnizacion_Calculada
            Indemnizacion_Calculada --> Claim_Pagado : Pago procesado
            Claim_Pagado --> [*]
            Claim_Rechazado --> [*]
        }

        Poliza_Vigente --> Claims : Siniestro ocurre
        Claims --> Poliza_Vigente : Claim procesado

        Poliza_Vigente --> Renovacion_Pendiente : Próximo a vencer
        Renovacion_Pendiente --> Poliza_Renovada : Cliente acepta renovación
        Renovacion_Pendiente --> Poliza_Cancelada : Cliente no renueva
        Poliza_Renovada --> Poliza_Vigente

        Poliza_Vigente --> Modificacion_Solicitada : Cliente solicita cambio
        Modificacion_Solicitada --> Poliza_Modificada : Cambio aprobado
        Modificacion_Solicitada --> Poliza_Vigente : Cambio rechazado
        Poliza_Modificada --> Poliza_Vigente

        Poliza_Suspendida --> Poliza_Vigente : Pago de mora
        Poliza_Suspendida --> Poliza_Cancelada : Suspensión prolongada
    }

    Emision --> [*] : Póliza cancelada/vencida

    note right of Cotizacion
        - Cálculo de prima según riesgo
        - Evaluación de cobertura
        - Generación de propuesta
    end note

    note right of Underwriting
        - Análisis de historial
        - Evaluación de riesgo
        - Determinación de precio
    end note

    note right of Claims
        - Reporte: Auto, Hogar, Vida, Salud
        - Investigación y ajuste
        - Cálculo: Daños - Deducible
    end note

    note right of Billing
        - Facturación automática mensual
        - Procesamiento de pagos
        - Gestión de mora y suspensiones
    end note
