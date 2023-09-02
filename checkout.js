import { apagarDoLocalStorage, desenharProdutoCarrinhoSimples, lerLocalStorage, salvarLocalStorage } from "./src/utilidades";

function desenharProdutosCheckout() {
    const idsProdutoCarrinhosQuantidade = lerLocalStorage("carrinho") ?? {};
    for (const idProduto in idsProdutoCarrinhosQuantidade) {
        desenharProdutoCarrinhoSimples(idProduto, "conteiner-produto-checkout" 
        , idsProdutoCarrinhosQuantidade[idProduto]);
    }
}

function finalizarCompra(evento) {
    evento.preventDefault();
    const idsProdutoCarrinhosQuantidade = lerLocalStorage("carrinho") ?? {};
    if(Object.keys(idsProdutoCarrinhosQuantidade).length === 0) {
        return;
    }
    const dataAtual = new Date();
    const pedidoFeito = {
        dataPedido: dataAtual,
        pedido: idsProdutoCarrinhosQuantidade,
    };

    const historicoDePedidos = lerLocalStorage("historico") ?? [];
    const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];

    salvarLocalStorage("historico", historicoDePedidosAtualizado);
    apagarDoLocalStorage("carrinho");

    window.location.href = "/pedidos.html";
}

desenharProdutosCheckout();

document.addEventListener("submit", (evt) => finalizarCompra(evt));
