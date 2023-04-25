import pandas as pd

dias_de_la_semana = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']

df=pd.read_csv("multas_con_dias.csv",';')
dic={}
for i in dias_de_la_semana:
    dic[i]=0
    for z in range(len(df)):
        if df['dia'].iloc[z]==i and df['domicilio_barrio'].iloc[z]=="Palermo":
            dic[i]+=1
df=pd.DataFrame.from_dict(dic, orient="index",columns=['cantidad'])
df = df.rename_axis('dia').reset_index()
df.to_csv("/Users/ezequielkaplan/Documents/GitHub/Parcial/Grafico por dias/CSVS/cant_por_dia.csv",';', index=False)
