def LumysClassificador(intencao, conteudo, data_revelacao=None):
    if data_revelacao:
        return "Cápsula Temporal"
    elif any(palavra in conteudo.lower() for palavra in ["senha", "dados pessoais", "minha verdade", "contrato", "memória íntima"]):
        return "Privado"
    elif intencao.lower() in ["coletivo", "educação", "biblioteca", "inspiração"]:
        return "Público"
    else:
        return "Privado"
