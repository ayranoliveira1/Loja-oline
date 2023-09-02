import { desenharProdutoCarrinhoSimples, lerLocalStorage } from "./src/utilidades";

function criarPedidoHistorico(pedidoComData) {
    const elementoPedido = `<p class="text-xl text-bold my-4 ">${new Date(pedidoComData.dataPedido).toLocaleDateString("pt-br", {hour: "2-digit", minute: "2-digit"})}</p>
    <section id="conteiner-pedidos-${pedidoComData.dataPedido}" class="bg-slate-300 p-3 rounded-md"></section>`;
    const main = document.getElementsByTagName("main")[0];
    main.innerHTML += elementoPedido;

    for(const idProduto in pedidoComData.pedido) {
        desenharProdutoCarrinhoSimples(idProduto, `conteiner-pedidos-${pedidoComData.dataPedido}`, pedidoComData.pedido[idProduto]);
    }
}

function renderizarHistoricoPedidos() {
    const historico = lerLocalStorage("historico");
    for(const pedidoComData of historico) {
        criarPedidoHistorico(pedidoComData);
    }
}

renderizarHistoricoPedidos();