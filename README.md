
# Tree Generate Project

Este é um projeto em TypeScript que gera árvores fractais a partir de uma semente (seed) aleatória. O projeto foi desenvolvido como uma prática para aprimorar a lógica de programação e conceitos matemáticos.

## Como usar

1. Clone o repositório do GitHub:

    ```bash
    git clone https://github.com/AldenorNeto/Tree-generate.git
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd Tree-generate
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```

4. Inicie o projeto:

    ```bash
    npm start
    ```

Isso abrirá a aplicação no navegador.

## Exemplo Gerado

A semente (seed) `0.6253610151660418` gerou a seguinte árvore:

![Exemplo de Árvore](https://github.com/AldenorNeto/Tree-generate/assets/74365018/b04db1c6-0895-439a-8a40-b7678fa5943e)

## Entendendo o Código

O código consiste em três principais classes: `SeedGenerate`, `Circle`, e `Branch`. Aqui está uma breve explicação de cada uma:

### `SeedGenerate`

- Gera uma semente aleatória durante a inicialização.
- Exibe a semente na tela para referência.
- Fornece a capacidade de acessar a semente gerada.

### `Circle`

- Representa a estrutura de um círculo na tela.
- Cria e posiciona elementos HTML para representar círculos.

### `Branch`

- Representa os ramos da árvore.
- Calcula as coordenadas finais com base no comprimento, ângulo e profundidade.
- Cria elementos HTML para representar os ramos.

### `Floor`

- Cria o chão para exibir a árvore.
- Configura o elemento HTML correspondente ao chão.

### Configurações da Tela

- Largura da tela: 60% da largura da janela.
- Altura da tela: 80% da altura da janela.

### Profundidade da Árvore

- A profundidade da árvore é configurada para renderizar um número quadrado de ramos.

### Geração da Árvore

- Utiliza a semente gerada para criar o tronco principal da árvore.
- Cada ramo subsequente é gerado com base na semente e em regras matemáticas específicas.

## Conclusão

O projeto é uma excelente prática para desenvolvedores que desejam aprimorar suas habilidades em TypeScript, lógica de programação e manipulação de elementos HTML. Experimente ajustar os parâmetros e explore como as árvores fractais se desenvolvem com diferentes sementes.
