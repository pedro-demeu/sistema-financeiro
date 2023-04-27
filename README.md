# Sistema Financeiro

O nosso sistema financeiro é a solução perfeita para gerenciar suas finanças pessoais de maneira simples e eficiente. Com ele, você pode facilmente inserir suas entradas e saídas, categorizá-las e visualizar gráficos intuitivos que mostram o seu fluxo de caixa.

Você também pode marcar suas despesas como pagas, o que permite uma melhor organização e controle de suas finanças. Além disso, oferecemos a possibilidade de exportar suas informações para um arquivo PDF, para que você possa ter uma visão geral das suas finanças e acompanhar o seu progresso a qualquer momento.

Com o nosso sistema financeiro, você terá uma experiência completa e fácil de usar para gerenciar suas finanças pessoais de forma eficiente e segura. Mantenha o controle das suas finanças e tenha uma vida financeira mais saudável e organizada.


## Instalação
1. Clone este repositório em sua máquina local utilizando o comando: 
- ```git clone https://github.com/pedro-demeu/sistema-financeiro.git```

2. Entre na pasta do projeto utilizando o comando:
- ```cd sistema-financeiro```

3. Instale as dependências utilizando o comando:
- ```npm install``` | ``yarn install``

4. Inicie o servidor local utilizando o comando:
- ```npm run dev``` | ``yarn start``

5. Acesse o projeto em http://localhost:3000



## Contribuição
Se você deseja contribuir com este projeto, siga os passos abaixo:

1. Faça um fork deste repositório
2. Crie uma branch com a sua feature utilizando o comando git checkout -b minha-feature
3. Faça commit das suas alterações utilizando o comando git commit -m 'Minha feature: Descrição das alterações'
4. Envie as suas alterações para o seu fork utilizando o comando git push origin minha-feature
5. Crie um novo Pull Request

## Licença
Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para obter mais informações.


## Contato
- Pedro Demeu
- pdemeu@outlook.com
- https://www.linkedin.com/in/pdemeu/


# Gestão

## Backlog

- [ ] Permitir que o usuário Busque pelas finanças
- [ ] Adicionar uma paginação a tabela
- [ ] Buscar 100% de coverage do cypress
- [ ] Permitir que o usuário possa filtrar por (valor maior/menor, data, tipo e filtros múltiplos)
- [ ] Permitir Download da tabela em seu estado atual (jsPDF)
- [ ] Melhorar o Readme com fotos, vídeos, documentação de qualidade
- [ ] Implementar um ErrorBoundary
- [ ] Quando melhorar o README, adicionar um tutorial para criar componentes
- [ ] Desenvolver edição de usuário e página de contato e opção de compartilhar
- [ ] Desenvolver um comando que abre um modal onde você digita expressões matemáticas e elas retornam a resposta
- [ ] Desenvolver um mecanismo de importação de arquivos JSON
- [ ] Disponibilizar funcionalidade para importar um json simples de exemplo para novos usuários
- [ ] Construção de uma pipeline e criar uma imagem para subir via docker

## Desenvolvendo

- [ ... ] Adicionar responsividade

## Funcionalidades Concluídas

- [x] Desenvolver projeto em React e Typescript
- [x] Login Simples para acessar Página Home (Não persistir no back)
- [x] Tabela com listagem de finanças
- [x] Modal para adição de uma nova transação
- [x] Opção de excluir transação
- [x] Opção de editar transação
- [x] Mostrar um EmptyState da listagem
- [x] Testes básicos com Cypress
- [x] Validações com Formik e Yup
- [x] Tradução do Projeto para EN-US e PT-BR com (i18n)
- [x] Configuração do Eslint
- [x] Criar um contador e total das despesas
- [x] Construir um CRUD bem feito para as ações em localstorage, como um useLogin useFinances
- [x] Adicionar status sobre total disponível, se negativo mostrar msg como "saldo negativo este mês..."
- [x] Configurar para que as importações comecem com "@" ao invés de ficar buscando com ".."
- [x] Padronizar cores no theme.ts
- [x] Trocar cores
- [x] Refatorar footer e ajustar posições
- [x] Adicionar opções avançadas