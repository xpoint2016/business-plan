# --- Etapa 1: Build ---
# Usa una imagen de Node para construir la aplicación React
FROM node:20-alpine as builder

# Establece el directorio de trabajo en la imagen
WORKDIR /app

# Copia los archivos de definición de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone las variables de entorno de Firebase/Canvas al proceso de build
# Esto es necesario para que Vite las reemplace en el código
ARG VITE_FIREBASE_CONFIG
ARG VITE_APP_ID
ARG VITE_INITIAL_AUTH_TOKEN

ENV VITE_FIREBASE_CONFIG=${VITE_FIREBASE_CONFIG}
ENV VITE_APP_ID=${VITE_APP_ID}
ENV VITE_INITIAL_AUTH_TOKEN=${VITE_INITIAL_AUTH_TOKEN}

# Construye la aplicación para producción
RUN npm run build

# --- Etapa 2: Production ---
# Usa una imagen de servidor web ligera (nginx) para servir los archivos estáticos
FROM nginx:1.27-alpine

# Establece el directorio de trabajo
WORKDIR /usr/share/nginx/html

# Elimina el contenido por defecto de nginx
RUN rm -rf ./*

# Copia los archivos construidos desde la etapa 'builder'
COPY --from=builder /app/dist .

# Copia la configuración personalizada de Nginx
# Esto es crucial para que el enrutamiento de React funcione correctamente
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80 para acceder al servidor Nginx
EXPOSE 80

# Comando para iniciar Nginx en primer plano
ENTRYPOINT ["nginx", "-g", "daemon off;"]
