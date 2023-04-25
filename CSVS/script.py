from datetime import datetime
import pandas as pd
def dia_de_la_semana(fecha):
    dias_semana = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
    dia_semana = datetime.strptime(fecha, '%d/%m/%Y').weekday()
    return dias_semana[dia_semana]


a=pd.read_csv("CSVS/147_vehiculos_mal_estacionados.csv",';')
a["dia"]=a['fecha_ingreso'].apply(dia_de_la_semana)
a.to_csv("CSVS/multas_con_dias.csv", index=False,sep=';')
mask=a['domicilio_barrio']=='PALERMO'
a=a[mask]
counts = a['dia'].value_counts()

# Then, create a new DataFrame with the results
df = pd.DataFrame({
    'dia': counts.index,
    'cantidad': counts.values
})
df.to_csv("CSVS/cant_por_dia.csv", index=False, sep=",")
print(len("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."))