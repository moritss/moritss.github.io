import pandas as pd

def convertir_hora_a_entero(hora):
    hora = hora.split(':')[0] # Extraer la parte de la hora
    hora_entero = int(hora) # Convertir la parte de la hora en entero
    return hora_entero

rango_hs = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]

df=pd.read_csv("CSVS/multas_con_dias.csv",';')
dic={}
# Aplicar la función personalizada a la columna hora_ingreso
df['hora_ingreso'] = df['hora_ingreso'].apply(convertir_hora_a_entero)
for i in rango_hs:
    dic[i]=0
    for z in range(len(df)):
        if df['domicilio_barrio'].iloc[z]=="PALERMO" and df['hora_ingreso'].iloc[z]==i and df['prestacion'].iloc[z]=='VEHÍCULO MAL ESTACIONADO':
            dic[i]+=1

df_resultado = pd.DataFrame(dic.items(), columns=['hora', 'cantidad'])
# Escribir el DataFrame en un archivo CSV
df_resultado.to_csv(r'CSVS/multas_por_hstotal.csv', index=False, sep=',')

