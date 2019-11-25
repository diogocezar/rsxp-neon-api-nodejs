# Neon NodeJS API

Fala deeevv, bem vindo ao nosso workshop de NodeJS, uma parceria muito bacana entre a Rocketseat e o Banco Neon.

Hoje, nós vamos focar em algumas coisas que as vezes passam desapercebidas no dia a dia.

Sabe? Aquele problema que aparece do nada? Um método que não funciona? Então... Vamos mostrar algumas coisas por aqui!

A ideia é explorar essas dificudades em um exemplo prático, com muita mão na massa!

## O que vamos fazer?

Vamos criar neste projeto um Back-End simples, para fornecer *Bancos* e seus respectivos *Ratings*.

A idéia é simples: um usuário vê uma lista de bancos, e ele escolher uma nota para cada um ou mais bancos. Com estrelas. de 1 a 5.

Uma boa maneira de começar qualquer projeto é ter em mente mais do que uma ideia, um desenho.

E é assim que é o nosso processo na NEON. Claro, que dentro de um processo bem mais complexo... mas... o começo é um desenho.

Para isso, nossa queria parceira Rebbeca (que é a designer da nossa squad) nos ajudou construindo a imagem que está disponível em /design

Bom, ela usa o AdobeXD, mas você também pode ser seu PNG a seguir:

Vamos estudar essa imagem com mais calma!

Aqui estão os arquivos:

- https://github.com/diogocezar/rsxp-neon-api-nodejs/

## Quais tecnologias nós vamos utilizar?

Temos MUITAS tecnologias para escolher, mas... qual vamos utilizar?

Aqui, vamos escolher uma _stack_ que jah conhecemos e trabalhamos.

E não muito coincidentemente, é bem parecida com o pessoal da _RocketSeat_.

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
- supertest;

E algumas outras já conhecidas ;) nodemon e eslint*.

Para nosso ambiente local, vamos usar também a tecnologia docker, em um container com uma imagem que levanta um banco de dados MySQL e um PhpMyAdmin.

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

Note que... aqui nós definimos já a senha do banco de dados, e também criamos um volume local, para que os dados não se percam a cada vez que o container precisar ser reiniciado.

Ainda temos mais alguns arquivos adicionais de configuração, que podem ser exploradores depois, com mais calma:

- `.editorconfig` - são as definições de estilo para diferentes editores;
- `.eslintrc` - definições de estilo de codificação;
- `.gitignore` - remove os arquivos que não devem ir para o repositório;
- `.sequelizerc` - definições de configuração do sequelize;
- `insomnia.json` - endpoints que podem ser importados no insomnia para testes da API;
- `jest.config.js` - as configurações do jest;

## Como está organizado o projeto?

O projeto está organizado na seguinte estrutura:

- `__tests__` - é a pasta onde os testes devem ser organizados;
  - `factories`- é a pasta para organizar as os fakes da aplicação;
  - `helpers` - são ajudantes para trabalhar com o banco de dados;
  - `integration` - onde estão os testes de integração;
- `database` - é uma pasta que irá conter os arquivos persistidos do banco de dados;
- `design` - é uma pasta com coisas de design; (AdobeXD)
- `src` - é onde está toda a implementação;
  - `config` - é o arquivo no qual configuramos a conexão com o banco de dados;
  - `controllers` - é onde estão as nossas controllers;
  - `database` - possuem nossas migrations e seeders;
  - `models` - são os models da aplicação;
  - `routes` - são as rotas;
  - `app.js` - é a configuração principal do aplicativo;
  - `server.js` - é a configuração do servidor que irá rodar a aplicação principal;

## Exemplos dos Envs

Subir um `.env` nunca é uma coisa muito legal, mas nesse caso, precisamos que todos tenham os 2 ambientes:

### .env

São as variáveis que serão utilizadas em ambientes de desenvolvimento e produção.

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

É um env dedicado aos testes, ele serve apenas para subir um banco de dados temporário para realizar os testes.

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

Precisaremos criar uma rota `/banks` que deverá obter uma estrutura parecida com o a seguinte:

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

- `id` - é o id do banco;
- `name` - é o nome do banco;
- `icon` - é o ícone do banco;
- `code` - é o código do banco;
- `generalRating` - é um campo que deve ser calculado, ou seja, deverá pegar a média de todas as classificações dos bancos e retonar qual é a média daquele banco;
- `myRating` - é a minha classificação para aquele banco, deve-se trazer sempre a última classificação!

É importante neste caso, enviar pelo `HEADER` uma variável `id_user` para que seja possível saber a sua própria classificação para a consulta.

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

E faça com que a sua aplicação, resolva apenas o que for necessário para passar nos testes!

Em seguida, começe e implementar cada uma das funcionalidades. Até que todo o sistema esteja pronto.

Prontos?

Então...

Vamos criar um teste, e estudar o que já temos pronto.

## Precisamos fazer os testes passarem

Rodando os testes, é fácil perceber que eles não vão passar.

Mas podemos burlar estes sistema.

Para isso, podemos implementar as funcionalidades específicas para que os testes passem!

E é isso que vamos fazer.

Criar mocks para os testes passarem!

## Agora é a hora de por a mão na massa!

Com os testes definidos e os mocks passando, precisamos realizar as implementações!

Notem que o objetivo aqui não é ser o mais performático ou elegante, e sim mostrar os conceitos reais das implementações do nosso dia a dia.

Vamos nessa!

## Tá... mas e quais são as sacadas?

Tah kras! Até ai tudo bem! E o que tem de diferentes?

Pode parecer um exemplo simples, mas... nós já passamos por MUITA coisa.

Vamos discutir alguns dos pontos que nós tivemos que aprender na raça!

### Onde ficam as regras de negócios?

Essa é uma confusão clássica da comunidade, a regra fica nas models ou nas controllers?

Neste caso, não poderíamos trabalhar com alguns campos virtuais calculados?

Mas afinal? Onde deixar a regra de negócios?

Model?

Controller?

Pois então, na nossa solução. Isso também foi difícil de entender. E acabamos chegando em um modelo um pouco mais complexo, que trabalha com mais algumas camadas: Service e Repository.

Dessa forma desacoplamos a controller da regra de negócios, e a regra de negócios do banco de dados.

#### Assumindo que ela fique no controller, como fazer para acessar um método interno?

Quando trabalhamos com o `express`, em uma versão com POO, (classes) quando expomos uma função temos um problema: não é possível assumir o contexto this!

Então como separar possíveis funções?

Para nós, uma solução foi usar métodos estáticos!

#### Quais problemas tivemos com a regra de negócios na controller?

Mas por que deixar as regras de negócio na própria controller não foi uma opção interessante?

O reaproveitamento de código se tornea muito ineficiente.

#### Como executar um map que possui awaits?

Em nossa solução implementada temos um trecho de código interessante:

```js
const banks = await Bank.findAll()
const promises = banks.map(async item => ({
  id: item.id,
  name: item.name,
  icon: item.icon,
  code: item.code,
  generalRating: await BanksController.extractRating(item.id),
  myRating: await BanksController.extractMyRating(idUser, item.id),
}
))
const jsonReturn = await Promise.all(promises)
return res.status(200).json(jsonReturn)
```

Notemos que promises retorna uma coleção. E como fazer para retornar só quando todos estiverem prontos? Utilizando o `Promise.all`

#### Sempre previsa-se dos erros

Use e abude do `try` e `catch``

Mas isso foi uma jornada!

Achar um padrão para retornar os erros, e a forma de como tratar isso no código foi difícil.

Na nossa solução:

- Criamos um middleware que trata os erros;
- Criamos dois tipos de erros: Erros de Domínio e Erros Internos;
- Com isso conseguimos separar e direcionar ações e mensagens para o front-end;

#### Padronizações das formas de retorno (erro, sucesso, etc...)

A sua API deve seguir um padrão. Mas nem tente fazer isso a cada método!

A dica é: Crie uma camada que irá cuidar de tratar os erros, mensagens e API's.

#### Não ignore o poder dos códigos HTTP

Utilize corretamente um set de códigos de erros HTTP, eles ajudam não só o seu Front-End, mas também sistemas de monitoramento.

#### Existem várias formas de testar, o importante é que ela exista!

No caso deste exemplo, usamos um banco `fake` para estragar. Mas... nem sempre isso é possível.

Os testes unitários devem estar mocados, para que suas funcionalidades sejam testadas independentes do do banco de dados;

Os testes de integração, devem testar o máximo possível do sistema, de preferência realizando operações em banco, caches, recursos e etc;

#### Não reinvente a roda!

Existem várias libs prontas! Boas, e testadas.

Utilize com sabedoria, entenda a necessidade do projeto e procure por um set de libs que atendam as funcionalidades.

## Conclusão

É isso pessoal, muito obrigado de coração pela oportunidade e pelo espaço!

Estamos contratando ;)
