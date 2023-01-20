# Teste ESTOA para back-end

## Crie uma aplicação web, com entrega de dados via JSON.

# Rodar o projeto:

  -  Criar um arquivo .env seguindo as intruções de .env.example


  ```bash
  yarn 
  ```
  ou
  ```bash
  npm install
  ```

  Para instalar as  dependências

  Uma vez configurado:
  ```bash
  yarn dev
  ```
  ou
  ```bash
  npm run dev
  ```


### Métodos de usuário

| Método | Endpoint       | Responsabilidade                                                                                        |
| ------ | -------------- | ------------------------------------------------------------------------------------------------------- |
| POST   | /user          | Registro de Usuário                                                                                     |
| POST   | /login         | Gera um token JWT recebendo email e password no corpo da requisição como JSON.                          |
| GET    | /user          | /**id** Busca usuário por id. Em caso de ausência do id, buscará por todos                              |
| PATCH  | /user          | /**id** Atualiza os dados de um usuário                                                                 |
| DELETE | /user          | /**id** Deleta usuários do banco                                                                        |


### Métodos de Relatório

| Método | Endpoint       | Responsabilidade                                                                                        |
| ------ | -------------- | ------------------------------------------------------------------------------------------------------- |
| POST   | /report          | Criação de relatório                                                                                  |
| GET    | /report          | /**id** Busca de relatório por id. Em caso de ausência do id, buscará por todos                       |
| GET    | /report/pdf      | /**id** Visualiza o pdf criado                                                                        |
| PATCH  | /report          | /**id** Atualiza um relatório e o pdf                                                                 |
| DELETE | /report          | /**id** Deleta um relatório e o pdf                                                                   |

