**RF** -> Requisitos funcionais

Funcionalidades que a aplicação vai ter.

**RNF** -> Requisitos não funcionais

Requisitos que não estão ligados diretamente com as funcionalidades da aplicação. Ex: banco de dados PostgreSQL.

**RN** -> Regra de negócio

Regras das funcionalidades, limitações. Ex: não deve cadastrar uma categoria com nome já usado.

---

## Cadastro de carro

**RF**

- [X] Deve ser possível cadastrar novo um carro.

**RN**

- [X] Não deve ser possível cadastrar um carro com uma placa já existente;
- [X] Por padrão, o carro deve ser cadastrado com disponibilidade;
- [X] Apenas usuários administradores tem esta permissão.

## Listage de carros

**RF**

- [X] Deve ser possível listar todos os carros disponíveis;
- [X] Deve ser possível listar todos os carros disponíveis pelo nome do carro;
- [X] Deve ser possível listar todos os carros disponíveis pelo nome da marca;
- [X] Deve ser possível listar todos os carros disponíveis pelo nome da categoria.

**RN**

- [X] Não é necessário o usuário estar autenticado no sistema.

## Cadastro de especificação do carro

**RF**

- [X] Deve ser possível cadastrar uma nova especificação para um carro;

**RN**

- [X] Não deve ser possível cadastrar uma especificação para um carro não cadastrado;
- [X] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro;
- [X] Apenas usuários administradores tem esta permissão.

## Cadastro de imagem do carro

**RF**

- [X] Deve ser possível cadastrar uma nova imagem para um carro;

**RNF**

- [X] Utilizar o multer para upload dos arquivos.

**RN**

- [X] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro;
- [X] Apenas usuários administradores tem esta permissão.

## Aluguel de carro

**RF**

- [X] Deve ser possível cadastrar um aluguel.

**RN**

- [X] O aluguel deve ter duração mínima de 24 hora;
- [X] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário;
- [X] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
- [X] O usuário deve estar logado na aplicação;
- [X] Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.

## Devolução de carro

**RF**

- [X] Deve ser possível realizar a devolução de um carro.

**RN**

- [X] Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa;
- [X] Ao realizar a devolução, o carro deverá ser liberado para outro aluguel;
- [X] Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel;
- [X] Ao realizar a devolução, deverá ser calculado o total do aluguel;
- [X] Caso a data de devolução seja superior à data prevista de entrega, deverá ser cobrado multa
      proporcional aos dias de atraso;
- [X] Caso haja multa, deverá ser somado ao total do aluguel;
- [X] O usuário deve estar logado na aplicação.

## Listagem de alugueis para usuário

**RF**

- [ ] Deve ser possível realizar a busca de todos os alugueis para o usuário.

**RN**

- [ ] O usuário deve estar logado na aplicação.