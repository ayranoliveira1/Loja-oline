import { catalogo, lerLocalStorage, salvarLocalStorage } from "./utilidades";


const idsProdutoCarrinhosQuantidade = lerLocalStorage("carrinho") ?? {};

function abrirCarinho() {
    document.getElementById("carrinho").classList.add("right-[0px]");
    document.getElementById("carrinho").classList.remove("right-[-360px]");
}

function fecharCarrinho() {
    document.getElementById("carrinho").classList.remove("right-[0px]");
    document.getElementById("carrinho").classList.add("right-[-360px]");
}

function irParaCheckout() {
    if(Object.keys(idsProdutoCarrinhosQuantidade).length === 0) {
        return;
    }
    window.location.href = "./checkout.html";
}

export function inicializarCarrinho() {
    const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
    const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");
    const botaoIraParaCheckout = document.getElementById("finalizar-compra");

    botaoFecharCarrinho.addEventListener("click", fecharCarrinho);
    botaoAbrirCarrinho.addEventListener("click", abrirCarinho);
    botaoIraParaCheckout.addEventListener("click", irParaCheckout);
}

function removerDoCarrinho(idProduto) {
    delete idsProdutoCarrinhosQuantidade[idProduto];
    salvarLocalStorage("carrinho", idsProdutoCarrinhosQuantidade);
    atualizarPrecoCarrinho();
    renderizarProdutosCarrinho();
}

function addQuantidadeProduto(idProduto) {
    idsProdutoCarrinhosQuantidade[idProduto]++;
    salvarLocalStorage("carrinho", idsProdutoCarrinhosQuantidade);
    atualizarPrecoCarrinho();
    attInfoQuant(idProduto);
}

function dimQuantidadeProduto(idProduto) {
    if (idsProdutoCarrinhosQuantidade[idProduto] === 1) {
        removerDoCarrinho(idProduto);
        return;
    }
    idsProdutoCarrinhosQuantidade[idProduto]--;
    salvarLocalStorage("carrinho", idsProdutoCarrinhosQuantidade);
    atualizarPrecoCarrinho();
    attInfoQuant(idProduto);
}

function attInfoQuant(idProduto) {
    document.getElementById(`quantidade-${idProduto}`).innerText =idsProdutoCarrinhosQuantidade[idProduto];
}

function desenharProdutoNoCarrinho(idProduto) {
    const produto = catalogo.find((p) => p.id === idProduto);

    const conteinerProdutosCarrinhos = document.getElementById("produtos-carrinhos");

    const elemetoArticle = document.createElement("article");
    const articleClasses = [
        "flex",
        "bg-slate-100",
        "border",
        "rounded-lg",
        "p-1",
        "relative"
    ];

    for (const articleClass of articleClasses) {
        elemetoArticle.classList.add(articleClass);
    }

    const cartaoProdutoCarrinho = `<button id="remover-item-${produto.id}" class="absolute top-0 right-2">
      <i class="fa-solid fa-trash-can text-slate-500 hover:text-slate-800"></i>
    </button>

    <img src="assets/img/${produto.imagem}" alt="Carrinho: ${produto.nome}" class="h-24">

    <div class="p-2 flex flex-col justify-between">
      <p class="text-slate-900 text-sm">${produto.nome}</p>
      <p class="text-slate-400 text-xs">Tamanho M</p>
      <p class="text-green-700 text-lg">$${produto.preco}</p>
    </div>
    <div class="flex text-slate-950 items-end relative bottom-0 right-2 text-lg">
       <button id="diminuir-produto-${produto.id}">-</button>
       <p id="quantidade-${produto.id}" class="ml-2">${idsProdutoCarrinhosQuantidade[produto.id]}</P>
       <button id="adicionar-produto-${produto.id}" class="ml-2">+</button>
    </div>`

  elemetoArticle.innerHTML = cartaoProdutoCarrinho;
  conteinerProdutosCarrinhos.appendChild(elemetoArticle);


  document.getElementById(`diminuir-produto-${produto.id}`).addEventListener("click", () => dimQuantidadeProduto(produto.id));

  document.getElementById(`adicionar-produto-${produto.id}`).addEventListener("click", () => addQuantidadeProduto(produto.id));

  document.getElementById(`remover-item-${produto.id}`).addEventListener("click", () => removerDoCarrinho(produto.id));
}

 export function renderizarProdutosCarrinho() {
    const conteinerProdutosCarrinhos = document.getElementById("produtos-carrinhos");
    conteinerProdutosCarrinhos.innerHTML = "";

    for (const idProduto in idsProdutoCarrinhosQuantidade) {
        desenharProdutoNoCarrinho(idProduto);
    }
}

export function adicionarAoCarrinho(idProduto) {
    if(idProduto in idsProdutoCarrinhosQuantidade) {
        addQuantidadeProduto(idProduto);
        return;
    }
    idsProdutoCarrinhosQuantidade[idProduto] = 1;
    salvarLocalStorage("carrinho", idsProdutoCarrinhosQuantidade);
    desenharProdutoNoCarrinho(idProduto);
    atualizarPrecoCarrinho();
}

export function atualizarPrecoCarrinho() {
    const precoCarrinho = document.getElementById("preco-total");
    let precoTotalCarrinho = 0;
    for (const idsProdutoNoCarrinho in idsProdutoCarrinhosQuantidade) {
        precoTotalCarrinho += catalogo.find((p) => p.id === idsProdutoNoCarrinho).preco * idsProdutoCarrinhosQuantidade[idsProdutoNoCarrinho];
    }
    precoCarrinho.innerHTML = `Total: $${precoTotalCarrinho}`;
}