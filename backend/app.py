

import os
import pandas as pd
from fuzzywuzzy import fuzz
from flask import Flask, request, jsonify
from flask_cors import CORS  # Importa CORS
from googletrans import Translator  # Importa Googletrans para traducción

# Configurar las variables de entorno
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"
os.environ["TF_ENABLE_MKL"] = "0"

# Cargar el archivo CSV con las preguntas y respuestas
csv_file = './backend/preguntas.csv'  # Asegúrate de tener el archivo CSV en la misma carpeta
df = pd.read_csv(csv_file)

# Crear la app de Flask
app = Flask(__name__)

# Habilitar CORS para todas las rutas
CORS(app)

# Inicializamos el traductor
translator = Translator()

# Función para buscar la respuesta basada en la pregunta
def buscar_respuesta(pregunta_usuario):
    puntuaciones = []
    
    # Comparar la pregunta del usuario con cada pregunta en el archivo CSV
    for index, row in df.iterrows():
        puntuacion = fuzz.ratio(pregunta_usuario.lower(), row['question'].lower())
        puntuaciones.append((puntuacion, row['answer']))
    
    # Ordenar por la puntuación más alta y devolver la respuesta correspondiente
    puntuaciones.sort(reverse=True, key=lambda x: x[0])
    respuesta = puntuaciones[0][1]
    
    return respuesta

# Ruta para manejar las solicitudes de la API
@app.route('/ask', methods=['POST'])
def ask():
    try:
        # Obtener la pregunta del usuario y el idioma desde el cuerpo de la solicitud
        data = request.get_json()
        pregunta_usuario = data.get('question')
        idioma_usuario = data.get('language', 'en')  # Idioma por defecto es inglés
        
        if not pregunta_usuario:
            return jsonify({"error": "Pregunta no proporcionada"}), 400
        
        # Traducir la pregunta del usuario a inglés, si no está ya en inglés
        if idioma_usuario != 'en':
            translated_question = translator.translate(pregunta_usuario, src=idioma_usuario, dest='en').text
        else:
            translated_question = pregunta_usuario
        
        # Buscar la respuesta para la pregunta proporcionada
        respuesta = buscar_respuesta(translated_question)
        
        # Si el idioma del usuario no es inglés, traducir la respuesta al idioma solicitado
        if idioma_usuario != 'en':
            translated_response = translator.translate(respuesta, src='en', dest=idioma_usuario).text
        else:
            translated_response = respuesta

        # Devolver la respuesta como JSON
        return jsonify({"answer": translated_response})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Iniciar la aplicación Flask
if __name__ == '__main__':
    app.run(debug=True)
