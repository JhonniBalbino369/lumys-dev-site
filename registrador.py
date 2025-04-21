# registrador.py
import yaml
import os
from datetime import datetime

PASTA = os.path.expanduser("~/GrimorioDigital/mapas_temporais/")

def gerar_nome():
    agora = datetime.now()
    timestamp = agora.strftime("%Y%m%d_%H%M%S")
    return f"LQP_13.800.000.025_{timestamp}.yaml"

def registrar_linha(conteudo):
    nome_arquivo = gerar_nome()
    caminho = os.path.join(PASTA, nome_arquivo)

    dado = {
        "guardiao": "JBS",
        "cosmo": "13.800.000.025",
        "mensagem": conteudo,
        "timestamp": datetime.now().isoformat()
    }

    with open(caminho, "w") as f:
        yaml.dump(dado, f, allow_unicode=True)

    print(f"🔗 Link gerado:")
    print(f"#LUMYS:13.800.000.025|Guardião:JBS|SEQ:{nome_arquivo[-17:-5]}")
