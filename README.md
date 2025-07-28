# Business Plan AI (React + Firebase + Gemini)

Este proyecto es una aplicación web para generar y gestionar planes de negocio usando IA (Gemini), gráficos y autenticación con Google/GitHub vía Firebase.

## Estructura del proyecto

- Código fuente: `scr/`
- Dockerfile y docker-compose: `scr/`
- El build de producción se sirve con Nginx en Docker

## Requisitos previos

- Docker y Docker Compose instalados
- Cuenta y proyecto en Firebase (para autenticación y base de datos)
- Claves de API para Gemini si usas generación de IA

## Variables de entorno

Crea un archivo `.env` en la carpeta `scr/` con el siguiente contenido (ajusta los valores):

```
VITE_FIREBASE_CONFIG='{"apiKey":"...","authDomain":"...","projectId":"...","storageBucket":"...","messagingSenderId":"...","appId":"..."}'
VITE_APP_ID=business-plan-ai
VITE_INITIAL_AUTH_TOKEN=
```

- `VITE_FIREBASE_CONFIG`: Copia la configuración de tu proyecto Firebase (en formato JSON).
- `VITE_APP_ID`: Un identificador para tu app.
- `VITE_INITIAL_AUTH_TOKEN`: (opcional) Token de autenticación inicial si lo usas.

## Cómo dockerizar y levantar la app

1. Ve a la carpeta `scr/`:
   ```sh
   cd scr
   ```
2. Construye y levanta los contenedores:
   ```sh
   docker-compose up --build
   ```
3. Accede a la app en [http://localhost:8080](http://localhost:8080)

## Scripts útiles (si quieres correr localmente)

- Instala dependencias:
  ```sh
  npm install
  ```
- Build de producción:
  ```sh
  npm run build
  ```
- (Necesitas un script de build, por ejemplo, usando Vite o React Scripts)

## Troubleshooting

### Error: `nginx.conf` not found
- Asegúrate de que el archivo `nginx.conf` esté en la carpeta `scr/`.

### Error: `package.json` not found
- Debes correr los comandos dentro de la carpeta `scr/`.

### Variables de entorno no cargadas
- Verifica que el archivo `.env` esté en la carpeta `scr/` y tenga las variables correctas.

### Firebase: Error de autenticación
- Revisa que tu configuración de Firebase sea válida y que el proyecto permita los proveedores de autenticación que usas (Google, GitHub, anónimo).

### No se genera la carpeta `dist/` al hacer build
- Asegúrate de tener un script de build en tu `package.json` (por ejemplo, usando Vite o React Scripts).
- Ejemplo para Vite:
  ```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
  ```

### El contenedor no arranca o no sirve la app
- Revisa los logs del contenedor:
  ```sh
  docker-compose logs
  ```
- Verifica que el puerto 8080 no esté ocupado.

## Personalización

- Modifica el layout en `components/bp-layout.jsx`.
- Cambia la lógica de autenticación en `hooks/useAuth.js`.
- Agrega más secciones o lógica en `App.js`.

---

¿Dudas? Revisa los comentarios en el código o abre un issue. 

---

### **Errores en consola:**

1. **Error initializing Firebase: FirebaseError: "projectId" not provided in firebase.initializeApp.**
2. **Uncaught TypeError: Cannot read properties of undefined (reading 'onAuthStateChanged')**

---

## ¿Por qué ocurre esto?

- En tu archivo `.env` usaste valores de ejemplo/dummy para la variable `VITE_FIREBASE_CONFIG`.
- El objeto de configuración de Firebase debe tener valores reales, especialmente `projectId`, `apiKey`, etc.
- Al ser "dummy", Firebase no puede inicializarse y los hooks de autenticación fallan.

---

## ¿Cómo solucionarlo?

1. **Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).**
2. **Obtén la configuración real de tu proyecto:**
   - Ve a "Project settings" > "General" > "Your apps" > "Firebase SDK snippet" > "Config".
   - Copia el objeto que se ve así:
     ```json
     {
       "apiKey": "TU_API_KEY",
       "authDomain": "TU_AUTH_DOMAIN",
       "projectId": "TU_PROJECT_ID",
       "storageBucket": "TU_STORAGE_BUCKET",
       "messagingSenderId": "TU_MESSAGING_SENDER_ID",
       "appId": "TU_APP_ID"
     }
     ```
3. **Pega ese objeto en tu archivo `scr/.env` así:**
   ```env
   VITE_FIREBASE_CONFIG='{"apiKey":"...","authDomain":"...","projectId":"...","storageBucket":"...","messagingSenderId":"...","appId":"..."}'
   VITE_APP_ID=business-plan-ai
   VITE_INITIAL_AUTH_TOKEN=
   ```

4. **Guarda el archivo y vuelve a levantar el contenedor:**
   ```sh
   docker-compose up --build
   ```

---

**¡Con esto la app debería funcionar y mostrar la interfaz!**

¿Quieres que te guíe paso a paso para crear el proyecto en Firebase o necesitas ayuda con la configuración? 
