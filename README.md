# Repositorio Trabajo De Interfaces
Proyecto de Interfaces de Usuario 2022/2023

PASOS PARA EJECUTAR EL PROYECTO
1. Clonar el repositorio
2. Abrir el proyecto desde un editor de código
3. Instalar las dependencias de tanto el frontend como el backend:
```bash
cd silkbay && npm install
```
y luego
```bash
cd ../silkbay_backend
npm install
```
4. Lanzar el backend con el comando:
```bash
npm start
```
Este comando ejecuta nuestro backend, sin embargo, no tenemos datos, así que también es necesario ejecutar el siguiente comando en **otra terminal**:
```bash
npm run seed
```
Este comando llenará la base de datos con información falsa para testing.

5. Ahora solo resta activar el frontend, con el comando:
```bash
npm run dev
```

Ahora el proyecto debería de estar disponible en la URL http://localhost:3000
