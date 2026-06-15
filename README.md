# Angular Landing AI Agent (Figma + Design System)

Este repositorio contiene un agente IA para construir una landing profesional en Angular con enfoque de Design System y flujo guiado por Figma MCP.

## 1) Instalacion

```bash
npm install
```

## 2) Configura variables

Copia `.env.example` a `.env` y completa:

- `CURSOR_API_KEY`
- `FIGMA_FILE_URL` (opcional, recomendado)
- `LANDING_BRAND_NAME`
- `LANDING_PRIMARY_GOAL`

## 3) Ejecuta el agente

```bash
npm run agent:landing
```

## Que hace este agente

- Carga un prompt especializado en Angular + Design System.
- Inyecta contexto de marca y objetivo de negocio.
- Usa referencia de Figma cuando esta disponible.
- Ejecuta un run de Cursor SDK para construir la landing de extremo a extremo.

## Skill del proyecto

Se incluye la skill local:

- `.cursor/skills/angular-landing-figma-system/SKILL.md`

Esta skill define el estandar de trabajo para que los cambios mantengan consistencia visual, tecnica y de arquitectura.
