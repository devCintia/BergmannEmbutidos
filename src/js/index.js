/*
  O que precisamos fazer? - Quando o usuário clicar no botão "Aplicar filtros", vamos filtrar as bolsas baseado na categoria e no preço máximo selecionados
    OBJETIVO 1 - Criar a funcionalidade de filtrar as bolsas
        passo 1 - pegar o botao de aplicar filtros  do HTML e mandar pro JS
        passo 2 - escutar o clique no botão de aplicar filtros
        passo 3 - pegar os valores dos campos de categoria e preço
        passo 4 - para cada bolsa, verificar se ela deve ser mostrada ou escondida 
*/

const botaoFiltrar = document.querySelector('.btn-filtrar');

botaoFiltrar.addEventListener('click', () => {
    const categoriaSelecionada = document.querySelector("#categoria").value;
    console.log(categoriaSelecionada);
    // const precoMaximoSelecionado = document.querySelector('#preco').value;
    // console.log(precoMaximoSelecionado);
    const bolsas = document.querySelectorAll('.produtoBergmann');
    bolsas.forEach((bolsa) => {
        const categoriaBolsa = bolsa.dataset.categoria;
        // const precoBolsa = bolsa.dataset.preco;

        let mostrarBolsa = true;

        const temFiltroDeCategoria = categoriaSelecionada !== '';
        const bolsaNaoBateComFiltroDeCategoria = categoriaSelecionada.toLowerCase() !== categoriaBolsa.toLowerCase();

        if (temFiltroDeCategoria && bolsaNaoBateComFiltroDeCategoria) {
            mostrarBolsa = false;
        }

        // const temFiltroDePreco = precoMaximoSelecionado !== '';
        // const bolsaNaoBateComFiltroDePrecoMaximo = parseFloat(precoBolsa) > parseFloat(precoMaximoSelecionado);

        // if (temFiltroDePreco && bolsaNaoBateComFiltroDePrecoMaximo) {
        //     mostrarBolsa = false;
        // }

        if (mostrarBolsa) {
            bolsa.classList.add('mostrar');
            bolsa.classList.remove('esconder');
        } else {
            bolsa.classList.remove('mostrar');
            bolsa.classList.add('esconder');
        }
    });
});
