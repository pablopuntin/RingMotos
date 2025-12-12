<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

<h1 align="center">
📦 SISTEMA DE FACTURACIÓN — BACKEND & FRONTEND
</h1>

<p align="center">
  <i>Gestión integral de ventas, remitos, clientes, cuentas corrientes, caja y proveedores</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-v10-DD0031?logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Next.js-14-000000?logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeORM-DataMapper-F29111?logo=database&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-v5-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-28A745?logo=open-source-initiative&logoColor=white" />
</p>

------------------------------------------------------------------------

# Sistema de Facturación, Ventas y Gestión Comercial

Plataforma completa para administrar **ventas**, **remitos**,
**clientes**, **fiados**, **proveedores**, **caja**, **cuentas a
pagar**, impresión A4/Media A4 y reportes.\
Desarrollada con **NestJS + TypeORM + PostgreSQL** y **Next.js (App
Router)**.

------------------------------------------------------------------------

## 🚀 Arquitectura General

### **Frontend**

-   Next.js (App Router)
-   Tailwind CSS
-   Headless UI / Radix
-   TanStack Table & Charts
-   React Query / RTK Query
-   Mobile-first
-   Vista previa e impresión HTML A4 / Media A4

### **Backend**

-   NestJS modular
-   TypeORM + PostgreSQL
-   JWT + RBAC (roles)
-   Auditoría, logs y transacciones
-   Swagger para documentación
-   Plantillas HTML/CSS para impresión

------------------------------------------------------------------------

## 🧩 Módulos del Sistema

  -----------------------------------------------------------------------
  Módulo                            Función
  --------------------------------- -------------------------------------
  **Ventas y Remitos**              Registro de ventas, confirmación,
                                    pagos y emisión de remitos

  **Clientes y Fiados**             Gestión de cuentas corrientes, pagos
                                    parciales y saldos

  **Caja**                          Apertura/cierre, ingresos, egresos y
                                    arqueo

  **Proveedores**                   Deudas, pagos y conciliación de
                                    saldos

  **Usuarios & Seguridad**          Roles, permisos y auditoría

  **Impresión**                     Plantillas A4/Media A4 y cola de
                                    impresión
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 🗄️ Modelo de Datos (Resumen)

Incluye entidades principales como:\
`Sale`, `SaleItem`, `Remito`, `Customer`, `CustomerDebt`, `Payment`,
`CashSession`, `SupplierDebt`, `SupplierPayment`, `User`, `Role`,
`AuditLog`, entre otros.

------------------------------------------------------------------------

## 🔄 Flujos Operativos

### **Ventas**

1.  Crear venta (draft)\
2.  Confirmar → pago total/parcial o deuda\
3.  Opcional: generar remito\
4.  Imprimir A4 / Media A4

### **Caja**

-   Abrir caja\
-   Movimientos (ventas, pagos, egresos, proveedores)\
-   Cierre y conciliación

### **Proveedores**

-   Registrar deuda\
-   Registrar pago\
-   Asignación de montos\
-   Conciliar → saldo cero

------------------------------------------------------------------------

## 📡 API --- Endpoints Principales

### Ventas

    POST /sales
    POST /sales/{id}/confirm
    POST /sales/{id}/remito
    POST /sales/{id}/payments
    GET  /sales/{id}/remito
    POST /remitos/{id}/print

### Clientes

    GET/POST /customers
    GET /customers/{id}/debts
    POST /customers/{id}/payments

### Caja

    POST /cash/sessions/open
    POST /cash/sessions/{id}/close
    GET  /cash/sessions/{id}/movements
    POST /cash/movements

### Proveedores

    GET/POST /suppliers
    GET /suppliers/{id}/debts
    POST /suppliers/{id}/payments

------------------------------------------------------------------------

## 🧠 Reglas de Negocio

-   Validación de límite de crédito en fiados\
-   Pagos parciales sin superar saldo\
-   Caja abierta obligatoria para ventas/pagos\
-   Prevención de cierre doble\
-   Impresión adaptativa según contenido\
-   Roles: ventas, caja y admin

------------------------------------------------------------------------

## 🛠 Consideraciones Técnicas

-   Transacciones atómicas\
-   Optimistic locking\
-   Auditoría detallada\
-   Paginación y performance\
-   Tests E2E\
-   Backups diarios + migraciones versionadas

------------------------------------------------------------------------

