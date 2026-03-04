# DevMarket

Aplicação web moderna para gerenciamento de listas de compras desenvolvida com Angular 17 e Tailwind CSS.

## Descrição

DevMarket é uma aplicação completa de lista de compras que permite aos usuários:

- Adicionar produtos manualmente ou através de escaneamento de código de barras
- Organizar produtos por categorias
- Filtrar e buscar produtos
- Editar produtos diretamente na tabela
- Salvar e restaurar listas no histórico
- Exportar listas em PDF e CSV
- Compartilhar listas via WhatsApp
- Alternar entre temas claro e escuro
- Suporte a múltiplos idiomas (Português e Inglês)
- Visualizar estatísticas de compras

## Tecnologias Utilizadas

- **Angular 17** - Framework principal
- **TypeScript** - Linguagem de programação
- **Tailwind CSS** - Framework CSS utilitário
- **RxJS** - Programação reativa
- **Bootstrap Icons** - Biblioteca de ícones
- **ZXing Library** - Decodificação de códigos de barras/QR
- **OpenFoodFacts API** - Busca de informações de produtos

## Instalação

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Passos

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd angular-devmarket
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

4. Acesse a aplicação:
```
http://localhost:4200
```

## Build para Produção

Para gerar uma build de produção:

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## Estrutura do Projeto

```
angular-devmarket/
├── src/
│   ├── app/
│   │   ├── components/          # Componentes da aplicação
│   │   │   ├── header/          # Cabeçalho com controles de tema e idioma
│   │   │   ├── product-form/    # Formulário de adição de produtos
│   │   │   ├── product-list/    # Lista e tabela de produtos
│   │   │   ├── scanner-modal/   # Modal de escaneamento
│   │   │   └── history-modal/   # Modal de histórico
│   │   ├── models/              # Interfaces e tipos TypeScript
│   │   ├── pipes/               # Pipes customizados
│   │   ├── services/            # Serviços Angular
│   │   │   ├── product.service.ts      # Gerenciamento de produtos
│   │   │   ├── history.service.ts      # Gerenciamento de histórico
│   │   │   ├── storage.service.ts      # Armazenamento local
│   │   │   ├── export.service.ts       # Exportação (PDF, CSV, WhatsApp)
│   │   │   ├── scanner.service.ts      # Escaneamento de códigos
│   │   │   ├── theme.service.ts        # Gerenciamento de temas
│   │   │   └── language.service.ts      # Gerenciamento de idiomas
│   │   ├── app.component.ts    # Componente raiz
│   │   └── app.module.ts        # Módulo principal
│   ├── assets/                  # Recursos estáticos
│   └── environments/            # Configurações de ambiente
├── angular.json                 # Configuração do Angular CLI
├── package.json                 # Dependências do projeto
├── tailwind.config.js           # Configuração do Tailwind CSS
└── tsconfig.json                # Configuração do TypeScript
```

## Funcionalidades Principais

### Gerenciamento de Produtos

- **Adicionar Produtos**: Manualmente através do formulário ou via escaneamento de código de barras
- **Editar Produtos**: Edição inline diretamente na tabela
- **Remover Produtos**: Exclusão individual de produtos
- **Categorias**: Organização por categorias (Frutas, Verduras, Carnes, etc.)
- **Busca**: Filtro por nome do produto
- **Filtro por Categoria**: Visualização de produtos por categoria específica

### Histórico

- **Salvar Listas**: Salva a lista atual no histórico
- **Restaurar Listas**: Carrega listas salvas anteriormente
- **Estatísticas**: Visualização de estatísticas de compras
- **Impressão**: Impressão de listas selecionadas do histórico

### Exportação

- **PDF**: Exportação para PDF com formatação profissional
- **CSV**: Exportação para CSV para uso em planilhas
- **WhatsApp**: Compartilhar lista via WhatsApp

### Personalização

- **Temas**: Alternância entre tema claro e escuro
- **Idiomas**: Suporte a Português e Inglês
- **Persistência**: Preferências salvas no localStorage

## Temas e Estilização

A aplicação utiliza Tailwind CSS para estilização e suporta dois temas:

- **Tema Claro**: Interface com cores claras
- **Tema Escuro**: Interface com cores escuras

O tema selecionado é persistido no localStorage e aplicado automaticamente em visitas futuras.

## Internacionalização

A aplicação suporta dois idiomas:

- **Português (pt)**: Idioma padrão
- **Inglês (en)**: Tradução completa disponível

O idioma selecionado é persistido no localStorage e todas as strings da interface são traduzidas automaticamente.

## Responsividade

A aplicação é totalmente responsiva e funciona bem em:

- Desktop
- Tablet
- Smartphone

A sidebar de ações se adapta automaticamente ao tamanho da tela.

## Armazenamento

Os dados são armazenados localmente no navegador usando localStorage:

- **produtos**: Lista atual de produtos
- **historico**: Histórico de listas salvas
- **theme**: Tema selecionado (light/dark)
- **language**: Idioma selecionado (pt/en)

## Documentação do Código

Todo o código está documentado com JSDoc, incluindo:

- Descrição de classes e interfaces
- Documentação de métodos e parâmetros
- Tipos de retorno
- Exemplos de uso (quando aplicável)

## Testes

Para executar os testes:

```bash
npm test
```

## Licença

Este projeto é de código aberto e está disponível para uso e modificação.

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## Suporte

Para questões, sugestões ou problemas, abra uma issue no repositório.

---

# Desenvolvido usando Angular e Tailwind CSS
