let produtos = [];

function adicionarItem() {
  let item = document.getElementById('item').value;
  let quantidade = document.getElementById('quantidade').value;
  let preco = document.getElementById('preco').value;

  if (item.trim() === '') {
    alert('Por favor: Insira um item válido.');
    return;
  }

  // Verifica se o item já está na lista \\
  let itemExistente = produtos.find(produto => produto.item === item);
  if (itemExistente) {
    alert('Este item já consta em sua lista.');
    return;
  }

  produtos.push({
    item: item,
    quantidade: quantidade,
    preco: preco,
    total: quantidade * preco
  });

  // Salva os dados na lista \\
  localStorage.setItem('produtos', JSON.stringify(produtos));

  atualizarTabela();
}

window.onload = function () {
  // Carrega os produtos do localStorage \\
  let produtosSalvos = localStorage.getItem('produtos');
  if (produtosSalvos) {
    produtos = JSON.parse(produtosSalvos);
    atualizarTabela();
  }
}

function atualizarItem(index, novoItem) {
  produtos[index].item = novoItem;
  atualizarTabela();
}

function atualizarQuantidade(index, novaQuantidade) {
  produtos[index].quantidade = Number(novaQuantidade);
  produtos[index].total = produtos[index].quantidade * produtos[index].preco;
  atualizarTabela();
}

function atualizarPreco(index, novoPreco) {
  produtos[index].preco = Number(novoPreco);
  produtos[index].total = produtos[index].quantidade * produtos[index].preco;
  atualizarTabela();
}

function removerItem(index) {
  produtos.splice(index, 1);
  atualizarTabela();
}

function limparTudo() {
  produtos = [];
  document.getElementById('item').value = '';
  document.getElementById('quantidade').value = '';
  document.getElementById('preco').value = '';
  atualizarTabela();
}

function limparCampos() {
  document.getElementById('item').value = '';
  document.getElementById('quantidade').value = '';
  document.getElementById('preco').value = '';
}

function atualizarTabela() {
  let tabela = document.getElementById('tabelaProdutos');
  tabela.innerHTML = `
      <tr>
          <th>Item</th>
          <th>Quantidade</th>
          <th>Preço</th>
          <th>Total Item</th>
          <th>Remover</th>
      </tr>
  `;

  let valorTotal = 0;
  produtos.forEach((produto, index) => {
    valorTotal += produto.total;
    tabela.innerHTML += `
          <tr>
              <td><input type="text" value="${produto.item}" onchange="atualizarItem(${index}, this.value)"></td>
              <td><input type="number" value="${produto.quantidade}" onchange="atualizarQuantidade(${index}, this.value)"></td>
              <td><input type="number" value="${produto.preco}" onchange="atualizarPreco(${index}, this.value)"></td>
              <td>${produto.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              <td><button onclick="removerItem(${index})" class="remover">Remover</button></td>
          </tr>
      `;
  });

  document.getElementById('valorTotal').innerText = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
