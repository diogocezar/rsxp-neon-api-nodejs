# Neon NodeJS API

Fala deeevv, bem vindo ao nosso workshop de NodeJS, uma parceria muito bacana entre a Rocketseat e o Banco Neon.

Hoje, nós vamos focar em algumas coisas que as vezes passam desapercebidas no dia a dia.

Sabe? Aquele problema que aparece do nada? Um método que não funciona? Então... Vamos mostrar algumas coisas por aqui!

A ideia é explorar essas dificudades em um exemplo prático e com muita mão na massa!

## O que vamos fazer?

Vamos criar neste projeto um Back-End simples, para fornecer *Bancos* e seus respectivos *Ratings*.

Uma boa maneira de começar qualquer projeto é ter em mente mais do que uma ideia, um desenho.

E é assim que é o nosso processo na NEON. Claro, que dentro de um processo bem mais complexo... mas... o começo é um desenho.

Para isso, nossa queria parceira Rebbeca (que é a designer da nossa squad) nos ajudou construindo a imagem que está disponível em /design

Bom, ela usa o AdobeXD, mas você também pode ser seu PNG a seguir:

Vamos estudar essa imagem com mais calma!

## Quais tecnologias nós vamos utilizar?

E e temos ai MUITAS tecnologias para escolher, qual vamos utilizar?

Aqui, vamos escolher uma stack que jah conhecemos e trabalhamos.

E não muito coincidentemente, é bem parecida com o pessoal da RocketSeat.

Vamos lah!

```
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^7.0.0",
    "express": "^4.16.4",
    "mysql2": "^1.6.5",
    "sequelize": "^5.7.1",
    "sequelize-auto": "^0.4.29",
    "sequelize-cli": "^5.5.1"
  }
```

- vamos usar o cors para permitir os requests de fora da máquina que estiver rodando o projeto;
- o dotenv nos ajuda a obter as variáveis de ambiente;
- express é o nosso framework para desenvolvimento web;
- mysql2 é utilizado pelo sequelize para conexão ao banco;
- o sequelize será o nosso orm;

E é claro, como já vimos em MUITOS vídeos, também vamos seguir todo um guia de estilos com o ESLint e bla bla bla...


```
  "devDependencies": {
    "eslint": "^5.16.0",
    "eslint-config-airbnb": "^17.1.0",
    "eslint-plugin-import": "^2.18.2",
    "eslint-plugin-jsx-a11y": "^6.2.1",
    "eslint-plugin-react": "^7.12.4",
    "factory-girl": "^5.0.4",
    "faker": "^4.1.0",
    "jest": "24.9",
    "nodemon": "1.19.2",
    "supertest": "^4.0.2"
  },
```

Aqui estamos incluindo algumas bibliotecas que servirão para executar os testes:

- faker;
- factory-girl;
= supertest;

Para nosso ambiente local, vamos usar também a tecnologia docker, em um container com uma imagem que levanta um banco de dados MySQL.

O código do docker-compose:

```
version: "3.3"
services:
  db:
    image: mysql:5.6
    ports:
      - "3306:3306"
    volumes:
      - ./database:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=rsxp2019@@
      - MYSQL_DATABASE=rsxp-neon-api-nodejs
  app:
    image: phpmyadmin/phpmyadmin:latest
    links:
      - db
    ports:
      - 8888:80
    environment:
      - PMA_ARBITRARY=1
```

Note que... aqui nós definimos já a senha do banco de dados, subimos também um phpmyadmin, E também criamos um volume local, para que os dados não se percam a cada vez que o container precisar ser reiniciado.

Ainda temos mais alguns arquivos adicionais de configuração, que podem ser exploradores depois, com mais calma:

- .editorconfig - são as definições de estilo para diferentes editores;
- .eslintrc - definições de estilo de codificação;
- .gitignore - remove os arquivos que não devem ir para o repositório;
- .sequelizerc - definições de configuração do sequelize;
- insomnia.json - endpoints que podem ser importados no insomnia para testes da API;
- jest.config.js - as configurações do jest;

## Como está organizado o projeto?

O projeto está organizado na seguinte estrutura:

- tests - é a pasta onde os testes devem ser organizados;
- database - é uma pasta que irá conter os arquivos persistidos do banco de dados;
- design - é uma pasta com coisas de design;
- src - é onde está toda a implementação;
  - config - é o arquivo no qual configuramos a conexão com o banco de dados!
  - controllers - é onde estão as nossas controllers
  - database - possuem nossas migrations e seeders;
  - models - são os models da aplicação;
  - routes - são as rotas
  - app.js - é a configuração principal do aplicativo;
  - server.js - é a configuração do servidor que irá rodar a aplicação principal;

## Exemplos dos Envs

Subir um .env nunca é uma coisa muito legal, mas nesse caso, precisamos que todos tenham os 2 ambientes:

### .env

```
# DATABASE
DB_USER=root
DB_PASSWORD=rsxp2019@@
DB_DATABASE=rsxp-neon-api-nodejs
DB_HOST=localhost
DB_DIALECT=mysql
# PORT
PORT=3333
```

### .env.test

```
# DATABASE
DB_USER=root
DB_PASSWORD=rsxp2019@@
DB_DATABASE=rsxp-neon-api-nodejs-test
DB_HOST=localhost
DB_DIALECT=mysql
# PORT
PORT=3333
```

Notamos que estamos trabalhando com 2 ambientes diferentes, isso para que seja possível subir um banco de dados "estragável" apenas para testar as funcionalidades com o Jest.

## Tá... mas o que vamos vamos fazer?

A idéia é criar a uma funcionalidade simples, para que seja possível listar os bancos e classificá-los.

### Listando os bancos

Precisaremos criar uma rota /banks que deverá obter uma estrutura parecida com o a seguinte:

```
[
  {
    "id": 1,
    "name": "Neon",
    "icon": "neon.png",
    "code": 655,
    "generalRating": 3,
    "myRating": 5
  },
  {
    "id": 2,
    "name": "Banco Vestido",
    "icon": "banco-vestido.png",
    "code": 213,
    "generalRating": 0,
    "myRating": 0
  },
  {
    "id": 3,
    "name": "D7",
    "icon": "d7.png",
    "code": 122,
    "generalRating": 0,
    "myRating": 0
  },
  {
    "id": 4,
    "name": "Banco Grêmio",
    "icon": "banco-gremio.png",
    "code": 123,
    "generalRating": 3,
    "myRating": 3
  },
  {
    "id": 5,
    "name": "Box Bank",
    "icon": "box-bank.png",
    "code": 425,
    "generalRating": 0,
    "myRating": 0
  },
  {
    "id": 6,
    "name": "Lento Bank",
    "icon": "lento-bank.png",
    "code": 345,
    "generalRating": 0,
    "myRating": 0
  },
  {
    "id": 7,
    "name": "Lento Bank",
    "icon": "lento-bank.png",
    "code": 345,
    "generalRating": 0,
    "myRating": 0
  }
]
```

- id - é o id do banco;
- name - é o nome do banco;
- icon - é o ícone do banco;
- code - é o código do banco;
- generalRating - é um campo que deve ser calculado, ou seja, deverá pegar a média de todas as classificações dos bancos e retonar qual é a média daquele banco;
- myRating - é a minha classificação para aquele banco, deve-se trazer sempre a última classificação!

É importante neste caso, enviar pelo HEADER uma variável id_user para que seja possível saber a sua própria classificação para a consulta.

### Salvando o ranking

Este é um processo mais simples, e para isso vamos apenas receber um corpo de um POST com:

```
{
	"idUser" : 1,
	"idBank" : 4,
	"rating" : 3
}
```

E retornar

```
{
  "success": true
}
```

ou

```
{
  "error": true
}
```

## E os testes?

Sempre que possível, pode ser interessante aplicar a técnica de TDD, ou seja, criar os testes primeiro, antes mesmo da sua aplicação existir.

O nosso cérebro está preparado para criar coisas complexas a partir de coisas mais simples.

E isso pode ser um ótimo caminho para ser trilhado também no desenvolvimento.

Inicie criando os testes da sua aplicação.

E faça com que a sua aplicação, apenas resolva o que for necessário para passar nos testes!

Em seguida, começe e implementar cada uma das funcionalidades. Até que todo o sistema esteja pronto.

Vamos criar os testes!

## Agora é a hora de por a mão na massa!

Com os testes definidos e os mocks passando, precisamos realizar as implementações!

Notem que o objetivo aqui não é ser o mais performático ou elegante, e sim mostrar os conceitos reais das implementações do nosso dia a dia.

Vamos nessa!

## Tá... mas e quais são as sacadas?

1) Onde ficam as regras de negócios?
  - Model?
  - Controller?

2) Assumindo que ela fique no controller, como fazer para acessar um método interno?
  - this.??? não funciona, pq?
  - solução? usar métodos státicos...

3) Quais problemas tivemos com a regra de negócios na controller?
  - Reaproveitamento de código muito ineficiente;
  - Solução: Camadas adicionais Service e Repository;

4) Como executar um map que possui awaits?
  Promise.all é o seu grande aliado;

5) try... e catch... salvam o seu projeto;

6) Padronizações das formas de retorno (erro, sucesso, etc...)
  - Defina um padrão, e o siga até a morte!

7) Não ignore o poder dos códigos HTTP;

8) Existem várias formas de testar, o importante é que ela exista!
  - Neste caso, usamos um banco fake para estragar.
  - Nem sempre isso é possível.
    - Testes unitários devem estar preparados para testar de forma mocada;
    - Testes de integração, devem testar toda a integração do sistema;

9) Não reinvente a roda na hora de testar!
  - Existem várias boas libs no mercado, utilize-as!
  - Algumas que já utilizados:
    - supertest;
    - nock;
    - sequelize-mock;
    - faker;
    - factory-girl;
