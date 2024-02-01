# Cadastro de Clientes

App para cadastro de clientes com nome, data de nascimento e cpf (com validação). Proporciona busca parametrizada e listagem paginada.

#### Informações técnicas:

Stack: NodeJS e MongoDB (Typescript)

#### Utilização:

Com docker instalado:

> 1 - clone o projeto

> 2 - acesse a pasta

> 3 - rode docker-compose up -d

#### Endpoints:

> POST /cliente {nome: string, cpf: string, nascimento: YYYY-MM-DD}

> GET /cliente

> GET /clientes (lista paginada)

> collections do postman disponível (cadastro.postman_collection.json)

#### Testes:

> npm run test
