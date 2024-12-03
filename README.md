# Chatbot API con Traducción y Procesamiento de Preguntas

Este proyecto es una **API de chatbot** desarrollada utilizando **Flask**, **Pandas** y **FuzzyWuzzy** para procesar y buscar respuestas a preguntas de los usuarios. La API también incluye **traducción automática de preguntas** mediante **Google Translate**, para que los usuarios puedan interactuar con el chatbot en múltiples idiomas.

El **frontend** (interfaz de usuario) está construido con **HTML**, **CSS** y **JavaScript** para mostrar las respuestas y permitir la interacción con el chatbot de manera visual.

## Requisitos

### Librerías necesarias

Asegúrate de tener las siguientes dependencias instaladas para ejecutar el proyecto:

- `Flask`
- `pandas`
- `fuzzywuzzy`
- `Flask-CORS`
- `googletrans==4.0.0-rc1` (para traducción)
- `streamlit` (para la interfaz)

Puedes instalar las librerías necesarias ejecutando:

pip install Flask pandas fuzzywuzzy flask-cors googletrans==4.0.0-rc1 streamlit.


### Requisitos para ejecución en local
  - Python 3.6 o superior.
  - Instalar las librerías requeridas (como se indicó arriba).
  - Acceso a internet para utilizar la API de Google Translate

### Estructura del Proyecto
```bash

chatbot/
│
├── backend/                    # Carpeta con la API en Flask
│   ├── app.py                  # Código principal de la API Flask
│   ├── preguntas.csv          # Archivo con las respuestas predefinidas del chatbot
│   
│
├── frontend/                   # Carpeta con el frontend en HTML, CSS y JS
    ├── index.html              # Página principal para la interacción del chatbot
    ├── style.css               # Estilos del frontend
    ├── script.js               # Lógica para interactividad

```

## Descripción del Proyecto
### Backend
La API de Flask se encarga de procesar las preguntas que los usuarios hacen al chatbot. El flujo general es el siguiente:

- Recibe la pregunta a través de una solicitud HTTP POST.
- Traduce la pregunta al inglés (o al idioma preferido) usando la librería `googletrans`.
- Busca la respuesta en un archivo `preguntas.csv` utilizando la similitud de cadenas con `fuzzywuzzy`  para encontrar la respuesta más cercana.
- Devuelve la respuesta al cliente.
El archivo `preguntas.csv` tiene un formato simple con preguntas y respuestas predefinidas que el chatbot puede consultar.

### Frontend
El frontend es una simple interfaz de usuario que permite al usuario enviar preguntas y mostrar las respuestas. Se ha utilizado:

- HTML para la estructura de la página.
- CSS para los estilos visuales.
- JavaScript para manejar las interacciones, enviar las preguntas a la API y mostrar las respuestas.
### Comando para ejecutar la aplicación
Para ejecutar el proyecto en local, sigue estos pasos:
- Utilizar Live Server de visual estudio o similar
  
## Backend (API)
La API está disponible en el endpoint /chatbot, que acepta solicitudes POST con una estructura JSON:
```bash
{
  "question": "Tu pregunta aquí"
}
```
El servidor devolverá una respuesta en formato JSON:
```bash

{
  "answer": "Respuesta generada por el chatbot"
}
```


## Funcionalidad Adicional
- Traducción automática: El chatbot puede traducir preguntas al inglés antes de procesarlas para mejorar la precisión de la respuesta.
- Similitud de texto: Se utiliza el algoritmo de similitud `fuzzywuzzy` para encontrar la mejor coincidencia entre la pregunta y las respuestas predefinidas en el archivo `preguntas.csv`.
## Personalización
Puedes personalizar las respuestas del chatbot modificando el archivo `preguntas.csv`. Cada fila del archivo debe contener una pregunta y su respectiva respuesta.

### Formato del archivo `preguntas.csv`:
``` bash
pregunta,respuesta
"¿Cómo estás?", "¡Hola! Estoy bien, ¿y tú?"
"¿Cuál es tu nombre?", "Soy un chatbot creado para ayudarte."
```
## Contribuciones
Las contribuciones son bienvenidas. Si deseas mejorar el proyecto o agregar nuevas funcionalidades, siéntete libre de hacer un fork y abrir un pull request.
##Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.


