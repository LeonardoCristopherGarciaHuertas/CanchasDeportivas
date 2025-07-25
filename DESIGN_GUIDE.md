# Frontend SGCD - Sistema de Gestión de Canchas Deportivas

## 🎨 Guía de Estilo Visual Aplicada

Este proyecto ha sido actualizado para implementar una guía de estilo visual moderna y consistente.

### Paleta de Colores

- **Primario**: `#2E7D32` (Verde deportivo) - Usado para elementos principales y botones primarios
- **Secundario**: `#1976D2` (Azul confianza) - Navegación y elementos secundarios
- **Acento**: `#FF9800` (Naranja energía) - Elementos de énfasis y advertencias
- **Neutros**: 
  - Fondo: `#FAFAFA`
  - Texto: `#424242`
  - Bordes: `#E0E0E0`
- **Estados**:
  - Éxito: `#4CAF50`
  - Error: `#F44336`
  - Advertencia: `#FF9800`

### Tipografía

- **Encabezados**: Roboto (peso 500-700)
- **Cuerpo**: Open Sans (peso 400-600)
- **Monoespaciada**: Source Code Pro (para códigos y números)

### Sistema de Espaciado

- Sistema basado en múltiplos de 8px
- Espaciado base: 8px, 16px, 24px, 32px, 48px
- Bordes redondeados: 4px (botones), 8px (tarjetas), 12px (modales)

### Elevación

Sistema de sombras con 4 niveles de profundidad:
- Nivel 1: Elementos básicos
- Nivel 2: Tarjetas y botones
- Nivel 3: Elementos flotantes
- Nivel 4: Modales y overlays

## 🚀 Características Implementadas

### Componentes Actualizados

1. **Navbar**
   - Diseño moderno con sticky positioning
   - Efectos hover suaves
   - Responsive design

2. **Página Home**
   - Hero section atractivo
   - Tarjetas de características con animaciones
   - Diseño responsive con grid system

3. **Login**
   - Formulario centrado con efectos de focus
   - Indicadores de estado visual
   - Validación mejorada con mensajes de error

4. **Gestión de Canchas**
   - Tabla responsive con zebra striping
   - Botones de acción con estados hover
   - Modal mejorado para crear/editar

5. **FieldCard**
   - Diseño de tarjeta moderna
   - Badges de estado
   - Botones de acción integrados

### Sistema CSS

- Variables CSS para consistencia
- Clases de utilidad para layout y espaciado
- Componentes reutilizables (botones, formularios, alertas)
- Sistema de grid responsive
- Animaciones y transiciones suaves

## 📁 Estructura de Archivos

```
src/
├── components/
│   ├── FieldCard.tsx      # Tarjeta de cancha actualizada
│   ├── FieldForm.tsx      # Modal de formulario mejorado
│   ├── FieldList.tsx      # Lista de canchas
│   ├── Navbar.tsx         # Navegación actualizada
│   ├── ReservationForm.tsx
│   └── SedeForm.tsx
├── pages/
│   ├── Fields.tsx         # Página de gestión actualizada
│   ├── Home.tsx           # Página de inicio rediseñada
│   ├── Login.tsx          # Página de login mejorada
│   ├── Reservations.tsx
│   └── Sedes.tsx
├── services/
├── interfaces/
├── App.tsx                # App principal actualizada
├── index.css              # Estilos globales y sistema de diseño
└── index.tsx
```

## 🛠️ Tecnologías

- React 19.1.0
- TypeScript 4.1.2
- React Router DOM 5.3.0
- Axios para API calls
- CSS personalizado con variables

## 📱 Responsive Design

El diseño es completamente responsive con breakpoints:
- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px

## 🎯 Próximas Mejoras

- [ ] Dark mode toggle
- [ ] Implementar loading skeletons
- [ ] Añadir más animaciones micro-interacciones
- [ ] Mejorar accesibilidad (ARIA labels)
- [ ] Tests unitarios para componentes

## 🚀 Instalación y Uso

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start

# Construir para producción
npm run build
```

El proyecto estará disponible en `http://localhost:3000`

## 🎨 Personalización

Las variables CSS están definidas en `src/index.css` y pueden ser fácilmente modificadas para cambiar:
- Colores de la paleta
- Espaciados y tamaños
- Fuentes tipográficas
- Efectos de sombra y bordes

Ejemplo:
```css
:root {
  --color-primary: #2E7D32; /* Cambiar color primario */
  --spacing-base: 8px;       /* Cambiar espaciado base */
  --font-heading: 'Roboto';  /* Cambiar fuente de títulos */
}
```
