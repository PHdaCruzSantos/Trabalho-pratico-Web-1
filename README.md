# **CSI606-2025-01 - Proposta de Trabalho Final**

## _Discente: Pedro Henrique da Cruz Santos (21.1.8148)_

### Resumo

Este projeto consiste em uma plataforma web, chamada "Catálogo de Serviços", projetada para conectar clientes (Contratantes) a profissionais autônomos (Trabalhadores) para a prestação de serviços locais. A aplicação permite que trabalhadores criem perfis detalhados, incluindo uma biografia, localização e um portfólio de trabalhos anteriores. Os contratantes podem buscar por profissionais utilizando filtros de nome, categoria de serviço ou localização, visualizar seus perfis completos com portfólios e avaliações, e também deixar suas próprias avaliações após a contratação, fomentando um ecossistema de confiança e qualidade.

### 1. Tema

O trabalho final tem como tema o desenvolvimento de uma aplicação web de duas-faces (two-sided marketplace) para a busca e oferta de serviços locais.

### 2. Escopo

Este projeto terá as seguintes funcionalidades:

- **Autenticação e Perfis de Usuário:**

  - Dois tipos de papéis: `CONTRATANTE` e `TRABALHADOR`.
  - Sistema de registro e login com autenticação baseada em token (JWT).

- **Para Trabalhadores:**

  - Dashboard pessoal para gerenciamento do perfil.
  - Criação e edição de perfil profissional, incluindo bio, localização e categorias de serviço.
  - Gerenciamento de um portfólio, permitindo adicionar e remover projetos com título, descrição e URL de imagem.
  - Visualização do próprio perfil público.

- **Para Contratantes:**

  - Busca avançada de trabalhadores por nome, categoria ou localização.
  - Visualização de perfis de trabalhadores, incluindo portfólio e avaliações de outros clientes.
  - Possibilidade de submeter avaliações (nota e comentário) para os perfis dos trabalhadores.

- **Funcionalidades Gerais:**
  - Página inicial com barra de busca e listagem de categorias principais.
  - Página de resultados de busca.
  - Interface responsiva e temática que se adapta ao tipo de usuário logado (Contratante ou Trabalhador).

### 3. Restrições

Neste trabalho não serão considerados:

- Sistema de chat ou comunicação em tempo real entre os usuários.
- Processamento de pagamentos ou gerenciamento de transações financeiras.
- Um sistema de verificação para confirmar se um serviço foi de fato prestado antes de permitir uma avaliação.
- Upload direto de arquivos de imagem; o portfólio utiliza URLs de imagens externas.
- Algoritmos complexos de recomendação; a seção de "recomendados" é uma amostragem simples.

### 4. Protótipo

O protótipo funcional da aplicação já está implementado neste repositório. As principais telas desenvolvidas incluem:

- **Página Inicial:** Apresentação da plataforma e ferramenta de busca.
- **Página de Resultados da Busca:** Exibe a lista de trabalhadores encontrados.
- **Página de Perfil do Trabalhador:** Detalhes completos do profissional, portfólio e avaliações.
- **Dashboard do Trabalhador:** Área para edição de perfil e gerenciamento de portfólio.
- **Modal de Autenticação:** Formulários de Login e Cadastro.

O frontend foi desenvolvido com Angular e o backend com Node.js/Express, e a interação entre eles simula o funcionamento completo da aplicação final.

### 5. Referências

Não foram utilizadas referências externas diretas para a concepção do modelo de negócio, baseando-se em plataformas de serviço de conhecimento geral.
