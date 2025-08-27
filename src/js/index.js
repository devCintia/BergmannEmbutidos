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


let carrinho = [];

document.getElementById("cart-icon").addEventListener("click", () => {
  document.getElementById("cart-panel").classList.add("active");
});
document.getElementById("close-cart").addEventListener("click", () => {
  document.getElementById("cart-panel").classList.remove("active");
});

document.querySelectorAll(".add-to-cart").forEach(botao => {
  botao.addEventListener("click", () => {
    let produto = botao.dataset.produto;
    let qtd = parseInt(prompt(`Quantas unidades de ${produto}?`));

    if (!isNaN(qtd) && qtd > 0) {
      carrinho.push({ produto, qtd });
      atualizarCarrinho();
    }
  });
});

function atualizarCarrinho() {
  let lista = document.getElementById("cart-items");
  lista.innerHTML = "";

  carrinho.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      ${item.qtd}x ${item.produto}
      <button onclick="removerItem(${index})">❌</button>
    `;
    lista.appendChild(li);
  });

  atualizarBadge();
}

function removerItem(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function atualizarBadge() {
  let count = carrinho.reduce((soma, item) => soma + item.qtd, 0);
  let badge = document.getElementById("cart-count");

  if (count > 0) {
    badge.textContent = count;
    badge.style.display = "inline-block";
  } else {
    badge.style.display = "none";
  }
}

document.getElementById("checkout").addEventListener("click", () => {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let mensagem = "Olá! Quero finalizar minha compra:%0A";

  carrinho.forEach(item => {
    mensagem += `- ${item.qtd}x ${item.produto}%0A`;
  });

  window.open(`https://wa.me/5553984061888?text=${mensagem}`, "_blank");
});







// let carrinho = [];

// // Abrir/fechar carrinho
// document.getElementById("cart-icon").addEventListener("click", () => {
//   document.getElementById("cart-panel").classList.add("active");
// });
// document.getElementById("close-cart").addEventListener("click", () => {
//   document.getElementById("cart-panel").classList.remove("active");
// });

// // Adicionar produtos
// document.querySelectorAll(".add-to-cart").forEach(botao => {
//   botao.addEventListener("click", () => {
//     let produto = botao.dataset.produto;
//     let preco = parseFloat(botao.dataset.preco);
//     let qtd = parseInt(prompt(`Quantas unidades de ${produto}?`));

//     if (!isNaN(qtd) && qtd > 0) {
//       carrinho.push({ produto, preco, qtd });
//       atualizarCarrinho();
//     }
//   });
// });

// function atualizarCarrinho() {
//   let lista = document.getElementById("cart-items");
//   let total = 0;
//   lista.innerHTML = "";

//   carrinho.forEach((item, index) => {
//     total += item.preco * item.qtd;

//     let li = document.createElement("li");
//     li.innerHTML = `
//       ${item.qtd}x ${item.produto} - R$ ${(item.preco * item.qtd).toFixed(2)}
//       <button onclick="removerItem(${index})">❌</button>
//     `;
//     lista.appendChild(li);
//   });

//   document.getElementById("cart-total").textContent = "Total: R$ " + total.toFixed(2);
// }

// function removerItem(index) {
//   carrinho.splice(index, 1);
//   atualizarCarrinho();
// }

// // Finalizar no WhatsApp
// document.getElementById("checkout").addEventListener("click", () => {
//   if (carrinho.length === 0) {
//     alert("Seu carrinho está vazio!");
//     return;
//   }

//   let mensagem = "Olá! Quero finalizar minha compra:%0A";
//   let total = 0;

//   carrinho.forEach(item => {
//     mensagem += `- ${item.qtd}x ${item.produto} (R$ ${item.preco.toFixed(2)})%0A`;
//     total += item.preco * item.qtd;
//   });

//   mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;

//   window.open(`https://wa.me/5553984061888?text=${mensagem}`, "_blank");
// });
