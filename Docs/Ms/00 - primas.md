
https://api-sandbox.fedpat.com.ar/documentacion-cotizador.html#tag/Cotizacion-auto/operation/cotizarPorApi

Te ayudo con los parámetros conceptuales para calcular primas de seguros de auto en Argentina. Es cierto que es un servicio muy especializado que requiere conocimiento actuarial profundo.Basándome en la información encontrada y mi conocimiento sobre seguros de auto en Argentina, te explico los parámetros conceptuales clave para calcular primas:

## Marco Legal y Regulatorio

En Argentina, todo vehículo tiene que estar asegurado contra terceros para que la empresa aseguradora cubra los daños en caso de accidente de tránsito. La Superintendencia de Seguros de la Nación (SSN) regula el sector y requiere opinión actuarial que avale la suficiencia técnica de primas y que no sean abusivas ni discriminatorias.

## Parámetros Principales para Calcular Primas

### 1. **Datos del Vehículo**
- **Marca y modelo**: Afecta directamente el costo de reparación y probabilidad de robo
- **Año del vehículo**: Determina depreciación y valor de mercado
- **Valor asegurado**: Base para calcular coberturas
- **Tipo de uso**: Particular, comercial, taxi, etc.
- **Cilindrada del motor**: Mayor cilindrada = mayor riesgo
- **Tipo de combustible**: Nafta, diesel, GNC, eléctrico

### 2. **Datos del Conductor/Asegurado**
- **Edad**: Conductores jóvenes (18-25) y mayores (+65) tienen primas más altas
- **Sexo**: Estadísticamente los hombres tienen más siniestros
- **Antigüedad de licencia**: Más experiencia = menor riesgo
- **Historial de siniestros**: Factor crítico - cada siniestro previo aumenta la prima
- **Estado civil**: Casados estadísticamente tienen menos siniestros
- **Ocupación**: Ciertas profesiones consideradas de mayor/menor riesgo

### 3. **Datos Geográficos**
- **Código postal de circulación**: Zona de mayor riesgo de robo/accidentes
- **Lugar de guardado**: Cochera cubierta vs. calle
- **Zona de trabajo**: Si difiere del domicilio

### 4. **Coberturas Elegidas**
- **Responsabilidad Civil**: Obligatorio por ley
- **Daño Parcial**: Cubre reparaciones por choques, granizo, etc.
- **Robo/Hurto Total**: Muy común en Argentina
- **Incendio**: Riesgo específico
- **Cristales**: Cobertura adicional
- **Franquicia elegida**: A menor franquicia, mayor prima

### 5. **Factores de Riesgo Específicos**
- **Kilometraje anual**: Mayor uso = mayor exposición
- **Conductor habitual**: Si hay conductores adicionales
- **Sistemas de seguridad**: Alarmas, GPS, etc. pueden dar descuentos
- **Uso nocturno**: Circulación en horarios de mayor riesgo

## Fórmula Conceptual Básica

```javascript
function calcularPrimaConceptual(parametros) {
    const {
        valorVehiculo,
        edadConductor,
        antiguedadLicencia,
        historialSiniestros,
        zonaRiesgo,
        tipoCobertura,
        franquicia,
        descuentos
    } = parametros;
    
    // Prima base según valor del vehículo y tipo de cobertura
    let primaBase = valorVehiculo * TASA_BASE[tipoCobertura];
    
    // Factores de multiplicación
    const factorEdad = calcularFactorEdad(edadConductor);
    const factorExperiencia = calcularFactorExperiencia(antiguedadLicencia);
    const factorSiniestros = calcularFactorSiniestros(historialSiniestros);
    const factorZona = FACTOR_ZONA[zonaRiesgo];
    const factorFranquicia = calcularFactorFranquicia(franquicia);
    
    // Aplicar factores
    let primaAjustada = primaBase * factorEdad * factorExperiencia * 
                        factorSiniestros * factorZona * factorFranquicia;
    
    // Aplicar descuentos
    primaAjustada = primaAjustada * (1 - descuentos);
    
    // Gastos administrativos y comisiones
    primaAjustada = primaAjustada * (1 + GASTOS_ADMIN + COMISIONES);
    
    return primaAjustada;
}
```

## Consideraciones Técnicas Importantes

### Tablas Actuariales
Necesitarás acceso a:
- Tablas de mortalidad vehicular por zona
- Estadísticas de siniestralidad por perfil de conductor
- Valores de mercado actualizados de vehículos
- Tasas de criminalidad por código postal

### Reservas Técnicas
Las aseguradoras deben mantener reservas para siniestros no reportados (IBNR) como establece la SSN.

### Validaciones Regulatorias
Las primas deben tener respaldo actuarial y no ser abusivas ni discriminatorias, especialmente para seguros de personas.

## Recomendación para tu Desarrollo

Para un MVP o prototipo, podrías:

1. **Usar APIs externas** especializadas en cálculo de primas (varias aseguradoras tienen APIs)
2. **Implementar un motor simplificado** con los parámetros básicos
3. **Consultar con un actuario** para validar tu modelo
4. **Usar machine learning** entrenado con datos históricos de siniestros

El cálculo real involucra modelos estadísticos complejos, análisis de riesgo geográfico y consideraciones macroeconómicas (inflación, devaluación) específicas de Argentina.

¿Te interesa que profundice en algún aspecto específico o que te ayude con la implementación de alguna parte en particular?











```js 
/**
 * Motor simplificado de cálculo de primas de seguros de auto para Argentina
 * Basado en factores actuariales básicos y regulaciones locales
 */

class SeguroAutoCalculator {
    constructor() {
        // Tasas base por tipo de cobertura (% del valor del vehículo)
        this.TASAS_BASE = {
            'responsabilidad_civil': 0.008,     // 0.8% - Mínimo legal
            'terceros_completo': 0.015,         // 1.5% - RC + Incendio + Robo
            'todo_riesgo': 0.035,               // 3.5% - Cobertura total
            'todo_riesgo_premium': 0.045        // 4.5% - Con servicios adicionales
        };

        // Factores por edad del conductor
        this.FACTOR_EDAD = {
            '18-21': 1.8,    // Muy alto riesgo
            '22-25': 1.5,    // Alto riesgo
            '26-30': 1.2,    // Riesgo moderado
            '31-45': 1.0,    // Riesgo base
            '46-60': 0.9,    // Riesgo bajo
            '61-70': 1.1,    // Riesgo moderado por edad
            '71+': 1.4       // Alto riesgo por edad
        };

        // Factores por zona de riesgo (basado en códigos postales CABA/GBA)
        this.FACTOR_ZONA = {
            'muy_bajo': 0.8,    // Zonas residenciales premium
            'bajo': 0.9,        // Zonas residenciales
            'medio': 1.0,       // Zona base
            'alto': 1.3,        // Zonas comerciales/centro
            'muy_alto': 1.8     // Zonas de alto riesgo
        };

        // Factor por antigüedad de licencia
        this.FACTOR_EXPERIENCIA = {
            '0-1': 1.4,         // Conductor novel
            '2-3': 1.2,         // Poca experiencia
            '4-10': 1.0,        // Experiencia normal
            '11+': 0.9          // Conductor experimentado
        };

        // Multiplicador por cantidad de siniestros previos
        this.FACTOR_SINIESTROS = {
            0: 0.9,             // Buen conductor (descuento)
            1: 1.0,             // Base
            2: 1.3,             // Penalización moderada
            3: 1.6,             // Alta penalización
            '4+': 2.0           // Muy alta penalización
        };

        // Ajustes por características del vehículo
        this.FACTOR_VEHICULO = {
            'cilindrada': {
                'hasta_1400': 0.9,
                '1401_2000': 1.0,
                '2001_3000': 1.2,
                'mas_3000': 1.4
            },
            'antiguedad': {
                '0_3': 1.0,         // 0-3 años
                '4_7': 0.9,         // 4-7 años
                '8_15': 0.8,        // 8-15 años
                'mas_15': 0.7       // Más de 15 años
            },
            'uso': {
                'particular': 1.0,
                'comercial': 1.3,
                'taxi_remis': 1.8,
                'carga': 1.5
            }
        };

        // Gastos operativos (obligatorios por ley)
        this.GASTOS_ADMIN = 0.12;       // 12% gastos administrativos
        this.COMISION_BROKER = 0.15;    // 15% comisión corredor
        this.IVA = 0.21;               // 21% IVA
        this.IMPUESTO_SELLOS = 0.012;   // 1.2% impuesto a los sellos (varía por provincia)
    }

    /**
     * Calcula la prima de seguro de auto
     * @param {Object} datos - Datos del vehículo, conductor y cobertura
     * @returns {Object} - Detalle completo del cálculo
     */
    calcularPrima(datos) {
        try {
            // Validar datos obligatorios
            this.validarDatos(datos);

            // 1. Prima base
            const primaBase = datos.valorVehiculo * this.TASAS_BASE[datos.tipoCobertura];

            // 2. Aplicar factores de riesgo
            const factorEdad = this.obtenerFactorEdad(datos.edadConductor);
            const factorZona = this.FACTOR_ZONA[datos.zonaRiesgo];
            const factorExperiencia = this.obtenerFactorExperiencia(datos.antiguedadLicencia);
            const factorSiniestros = this.obtenerFactorSiniestros(datos.cantidadSiniestros || 0);
            const factorVehiculo = this.calcularFactorVehiculo(datos.vehiculo);

            // 3. Prima ajustada por riesgo
            const primaAjustada = primaBase * factorEdad * factorZona * 
                                factorExperiencia * factorSiniestros * factorVehiculo;

            // 4. Aplicar descuentos
            const descuentos = this.calcularDescuentos(datos.descuentos || {});
            const primaConDescuentos = primaAjustada * (1 - descuentos);

            // 5. Agregar gastos operativos
            const gastosAdmin = primaConDescuentos * this.GASTOS_ADMIN;
            const comisionBroker = primaConDescuentos * this.COMISION_BROKER;
            const subtotal = primaConDescuentos + gastosAdmin + comisionBroker;

            // 6. Impuestos
            const impuestoSellos = subtotal * this.IMPUESTO_SELLOS;
            const subtotalConSellos = subtotal + impuestoSellos;
            const iva = subtotalConSellos * this.IVA;
            const primaFinal = subtotalConSellos + iva;

            // 7. Calcular cuotas si es necesario
            const cuotas = this.calcularCuotas(primaFinal, datos.formaPago || 'anual');

            return {
                success: true,
                calculo: {
                    primaBase,
                    factores: {
                        edad: factorEdad,
                        zona: factorZona,
                        experiencia: factorExperiencia,
                        siniestros: factorSiniestros,
                        vehiculo: factorVehiculo
                    },
                    primaAjustada,
                    descuentos: {
                        porcentaje: descuentos,
                        monto: primaAjustada * descuentos
                    },
                    gastos: {
                        administrativos: gastosAdmin,
                        comisionBroker: comisionBroker
                    },
                    impuestos: {
                        sellos: impuestoSellos,
                        iva: iva
                    },
                    primaFinal,
                    cuotas
                },
                metadata: {
                    fechaCalculo: new Date().toISOString(),
                    validez: '30 días',
                    moneda: 'ARS'
                }
            };

        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Métodos auxiliares
    validarDatos(datos) {
        const camposRequeridos = ['valorVehiculo', 'tipoCobertura', 'edadConductor', 'zonaRiesgo'];
        for (const campo of camposRequeridos) {
            if (!datos[campo]) {
                throw new Error(`Campo requerido faltante: ${campo}`);
            }
        }

        if (datos.valorVehiculo <= 0) {
            throw new Error('El valor del vehículo debe ser mayor a 0');
        }

        if (!this.TASAS_BASE[datos.tipoCobertura]) {
            throw new Error(`Tipo de cobertura inválido: ${datos.tipoCobertura}`);
        }
    }

    obtenerFactorEdad(edad) {
        if (edad >= 18 && edad <= 21) return this.FACTOR_EDAD['18-21'];
        if (edad >= 22 && edad <= 25) return this.FACTOR_EDAD['22-25'];
        if (edad >= 26 && edad <= 30) return this.FACTOR_EDAD['26-30'];
        if (edad >= 31 && edad <= 45) return this.FACTOR_EDAD['31-45'];
        if (edad >= 46 && edad <= 60) return this.FACTOR_EDAD['46-60'];
        if (edad >= 61 && edad <= 70) return this.FACTOR_EDAD['61-70'];
        return this.FACTOR_EDAD['71+'];
    }

    obtenerFactorExperiencia(anios) {
        if (anios <= 1) return this.FACTOR_EXPERIENCIA['0-1'];
        if (anios <= 3) return this.FACTOR_EXPERIENCIA['2-3'];
        if (anios <= 10) return this.FACTOR_EXPERIENCIA['4-10'];
        return this.FACTOR_EXPERIENCIA['11+'];
    }

    obtenerFactorSiniestros(cantidad) {
        if (cantidad >= 4) return this.FACTOR_SINIESTROS['4+'];
        return this.FACTOR_SINIESTROS[cantidad] || this.FACTOR_SINIESTROS[0];
    }

    calcularFactorVehiculo(vehiculo) {
        let factor = 1.0;
        
        if (vehiculo?.cilindrada) {
            factor *= this.FACTOR_VEHICULO.cilindrada[vehiculo.cilindrada] || 1.0;
        }
        
        if (vehiculo?.antiguedad) {
            factor *= this.FACTOR_VEHICULO.antiguedad[vehiculo.antiguedad] || 1.0;
        }
        
        if (vehiculo?.uso) {
            factor *= this.FACTOR_VEHICULO.uso[vehiculo.uso] || 1.0;
        }
        
        return factor;
    }

    calcularDescuentos(descuentos) {
        let totalDescuento = 0;
        
        // Descuentos comunes en Argentina
        if (descuentos.alarma) totalDescuento += 0.05;           // 5% por alarma
        if (descuentos.gps) totalDescuento += 0.03;              // 3% por GPS
        if (descuentos.cochera) totalDescuento += 0.08;          // 8% por cochera
        if (descuentos.antiguedadCliente > 3) totalDescuento += 0.10; // 10% cliente antiguo
        if (descuentos.debito) totalDescuento += 0.02;           // 2% débito automático
        
        return Math.min(totalDescuento, 0.25); // Máximo 25% descuento
    }

    calcularCuotas(primaAnual, formaPago) {
        const recargos = {
            'anual': 0,
            'semestral': 0.05,      // 5% recargo
            'trimestral': 0.08,     // 8% recargo
            'mensual': 0.12         // 12% recargo
        };

        const divisores = {
            'anual': 1,
            'semestral': 2,
            'trimestral': 4,
            'mensual': 12
        };

        const recargo = recargos[formaPago] || 0;
        const primaConRecargo = primaAnual * (1 + recargo);
        const cantidadCuotas = divisores[formaPago] || 1;
        const valorCuota = primaConRecargo / cantidadCuotas;

        return {
            formaPago,
            cantidadCuotas,
            recargo,
            primaTotal: primaConRecargo,
            valorCuota: Math.round(valorCuota * 100) / 100
        };
    }
}

// Ejemplo de uso
const calculadora = new SeguroAutoCalculator();

// Datos de ejemplo para una Corolla 2020 en CABA
const datosEjemplo = {
    valorVehiculo: 5500000,           // $5.5M ARS
    tipoCobertura: 'todo_riesgo',
    edadConductor: 35,
    antiguedadLicencia: 10,
    zonaRiesgo: 'medio',              // CABA zona centro
    cantidadSiniestros: 0,
    vehiculo: {
        cilindrada: '1401_2000',      // 1.8L
        antiguedad: '4_7',            // 5 años
        uso: 'particular'
    },
    descuentos: {
        alarma: true,
        cochera: true,
        debito: true,
        antiguedadCliente: 5
    },
    formaPago: 'mensual'
};

// Calcular prima
const resultado = calculadora.calcularPrima(datosEjemplo);

if (resultado.success) {
    console.log('=== COTIZACIÓN DE SEGURO AUTO ===');
    console.log(`Prima Base: $${resultado.calculo.primaBase.toLocaleString()}`);
    console.log(`Prima Ajustada: $${resultado.calculo.primaAjustada.toLocaleString()}`);
    console.log(`Prima Final: $${resultado.calculo.primaFinal.toLocaleString()}`);
    console.log(`Forma de Pago: ${resultado.calculo.cuotas.cantidadCuotas} cuotas de $${resultado.calculo.cuotas.valorCuota.toLocaleString()}`);
} else {
    console.error('Error en el cálculo:', resultado.error);
}

// Exportar para uso como módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SeguroAutoCalculator;
}
```