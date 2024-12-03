import os
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"
os.environ["TF_ENABLE_MKL"] = "0"
import pandas as pd
from fuzzywuzzy import fuzz  # Para comparar las preguntas de forma flexible
import streamlit as st

# Configurar las variables de entorno
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"
os.environ["TF_ENABLE_MKL"] = "0"

# Cargar el archivo CSV con las preguntas y respuestas
csv_file = 'preguntas.csv'  # Asegúrate de tener el archivo CSV en la misma carpeta
df = pd.read_csv(csv_file)

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

# Título y descripción de la aplicación
st.title('Chatbot With My Own Questions')
st.write('Ask me a question about myself or my experience In English')
st.write('For example, you can ask: "What is your favorite food?"')
st.write('More languages ​​coming soon')
# Entrada de usuario: Pregunta
pregunta_usuario = st.text_input("Write Your Question:")

if pregunta_usuario:
    # Buscar la respuesta para la pregunta proporcionada
    respuesta = buscar_respuesta(pregunta_usuario)
    
    # Mostrar la respuesta en la aplicación
    st.write(f"Answere: {respuesta}")
