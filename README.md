# Pain Calendar - Frontend 🩻

Aplicación Frontend de registro de dolor construida con **React 19**, **Vite 6**, **TypeScript 5.8** y **Tailwind CSS 4**.

Este proyecto no es solo una interfaz bonita, sino un experimento y demostración rigurosa de buenas prácticas de Ingeniería de Software aplicada al Frontend, diseñado desde cero (Mobile-First y preparado para PWA) aplicando **Test-Driven Development (TDD)** y **Arquitectura Hexagonal (Ports & Adapters)**.

---

## 🏗️ Arquitectura: ¿Por qué Hexagonal en el Frontend?

A diferencia de la mayoría de proyectos modernos en React que mezclan llamadas a API (`fetch`/`axios`), lógica de negocio y renderizado UI en los mismos componentes o hooks, aquí hemos optado por la separación extrema de responsabilidades (Clean Architecture).

### Capas de la Aplicación

1. **Domain (Dominio / Reglas de Negocio):**
   - No sabe nada de React, nada de CSS y nada de Internet. 
   - Contiene los tipos (`PainRecord`, `PainIntensity`) y funciones puras para construirlos o validarlos.
   - **Type Branding (Functional Core)**: Utilizamos marcas sintácticas (ej. `readonly __brand: 'PainIntensity'`) para dotar a los tipos primitivos (como `number`) de *Seguridad Semántica*. Esto evita mezclar lógicamente datos (ej. un 8 de "Dolor" con un 8 de "Horas"), obligando al programador a usar las funciones validadoras (`createPainIntensity()`) para "sellar" la variable antes de usarla. En tiempo de ejecución (JS) la marca se borra, pero en tiempo de compilación garantiza solidez extrema.
   - Si la regla de negocio dicta que el dolor debe estar entre 0 y 10, esa regla vive aquí, y se testea aquí de forma aislada.

2. **Application (Casos de Uso):**
   - Orquesta el flujo de la aplicación (ej: `CreatePainRecordService`).
   - Sabe qué hay que hacer, pero no los detalles técnicos de cómo hacerlo.
   - Se comunica con el mundo exterior mediante **Puertos** (Interfaces TypeScript, ej: `PainRecordRepository`).

3. **Infrastructure / UI (Adaptadores):**
   - **UI**: Los componentes de React (como `PainSlider`) que recogen la intención del usuario.
   - **Adaptadores de Persistencia/Red**: Las implementaciones reales que hacen el *fetch* al backend de Spring Boot implementando el puerto definido en la capa de aplicación.

---

## 💉 Inyección de Dependencias Sin Clases

Venimos de ecosistemas como Java (Spring) donde la inyección de dependencias (`@Autowired`) y las Clases son el pan de cada día. Sin embargo, en JavaScript/TypeScript y el paradigma funcional de React, las clases tradicionales traen problemas (manejo oscuro de `this`, mayor bundle, etc.).

**¿Cómo inyectamos entonces un Repositorio en un Servicio?** -> Usando *Factory Functions* (Funciones Puras) y *Closures*.

### Ejemplo: El Patrón Factory Function

En lugar de crear una clase `class CreateService { constructor(repo) { ... } }`, usamos una función que recibe la dependencia por parámetro y devuelve el caso de uso:

```typescript
// El Puerto (Contrato)
export type PainRecordRepository = {
    save: (record: PainRecord) => Promise<void>;
};

// La Factoría (Application Service)
export const createPainRecordService = (repository: PainRecordRepository) => {
    // Retornamos la API pública de nuestro servicio.
    // El closure de JavaScript "recuerda" la variable 'repository' sin necesidad de usar 'this'.
    return {
        execute: async (request: RequestDto) => {
            const record = createPainRecord(request); // Llamada al Dominio puro
            await repository.save(record);            // Delegación al Puerto de infraestructura
            return record;
        }
    };
};
```

Esto hace que nuestro código sea **100% testeable** de forma independiente. Simplemente le pasamos un *Mock* del repositorio en nuestro archivo `.test.ts` y verificamos que hizo lo correcto de forma síncrona, rápida y sin depender de React.

---

## 🔴🟢 TDD (Test-Driven Development)

Todas las funciones de dominio, servicios de aplicación y componentes de UI visualmente lógicos (como el `PainSlider`) han estado guiados por pruebas usando **Vitest** y **React Testing Library**.

### Flujo seguido:
1. **Red**: Escribimos `archivo.test.ts` definiendo la intención de uso (qué debe aparecer en pantalla, cómo debe fallar un valor de dominio inválido, o cómo el servicio interactúa con el puerto).
2. **Green**: Escribimos el código mínimo en TypeScript/React para hacer pasar la prueba.
3. **Refactor**: Aplicamos mejoras, sacamos lógicas comunes o refinamos el CSS (Tailwind) sin miedo a romper nada, porque los tests nos respaldan en verde.

### Co-Location
Los archivos de test no están escondidos en una carpeta `/tests` global. Se ubican justo al lado del archivo al que protegen (ej. `PainSlider.tsx` convive con `PainSlider.test.tsx`). 

## 🚀 Cómo ejecutar los tests
```bash
npm run test
```
