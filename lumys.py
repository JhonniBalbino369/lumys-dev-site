# lumys.py
import os
from registrador import registrar_linha
from datetime import datetime

PASTA = os.path.expanduser("~/GrimorioDigital/")

def iniciar():
    if not os.path.exists(PASTA):
        os.makedirs(PASTA + "mapas_temporais/")
        os.makedirs(PASTA + "sementes/")
        with open(PASTA + "grimorio.log", "w") as f:
            f.write("🌸 Grimório iniciado.\n")

    print("🌿 Lumys acordou. O que deseja registrar?")
    mensagem = input("🌀 Sua linha: ")
    registrar_linha(mensagem)

if __name__ == "__main__":
    iniciar()
