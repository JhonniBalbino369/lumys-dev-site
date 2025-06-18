function classificarRegistro(intencao, conteudo, dataRevelacao) {
    if (dataRevelacao) {
        return "Cápsula Temporal";
    }
    const privadoPalavras = ["senha", "contrato", "dados pessoais", "memória íntima", "meu segredo"];
    for (let palavra of privadoPalavras) {
        if (conteudo.toLowerCase().includes(palavra)) {
            return "Privado";
        }
    }
    const publicoPalavras = ["educação", "inspiração", "coletivo", "biblioteca", "compartilhar"];
    for (let palavra of publicoPalavras) {
        if (intencao.toLowerCase().includes(palavra)) {
            return "Público";
        }
    }
    return "Privado";
}
