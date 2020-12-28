# ServerTeste
# COTABOX

Desenvolvido por Hernani Amancio de Almeida


## Executar projeto

Para executar o projeto, sera necessario instalar os seguintes programas em seu computador:

- Nodejs 
- Docker
- Postbird
- yarn

## Desenvolvimento

Para iniciar o desenvolvimento e necessario clonar o projeto do Github num diretorio de sua preferencia com os seguintes comandos:


- `cd "diretorio de sua preferencia"`
- `git clone https://github.com/2020nani/serverC.git`
- `cd serverC`


Apos clonar o projeto em seu computador e necessario instalar as dependencias que o projeto utiliza com o seguinte comando:


- `npm install` ou `yarn` caso tenha yarn instalado em sua maquina

Crie um container docker para rodar uma imagem postgres para o banco de dados com o comando

- `docker run --name nomedesuaescolha -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres`

ou crie um banco de dados postgres em sua maquina

- Rode o comando docker start nomeescolhido ao criar imagem para inicializar o container docker


- Acesse seu container com o Postbird que pedira as variaveis username e password
- username = postgres
- password = senha escolhida atraves do comando POSTGRES_PASSWORD
- porta = 5432


Apos acessar o container crie seu database clicando em create database 


Crie um arquivo .env conforme o arquivo .env.example e preencha com as variaveis de ambiente para acessar seu banco de dados

DB_HOST=localhost
DB_USER= nome de usuario do banco de dados, no docker o nome e postgres por default
DB_PASS= senha para acessar banco de dados, no docker a senha escolhida no comando POSTGRES_PASSWORD
DB_NAME= nome do database criado no Postbird
APP_SECRET=66dc49adcfb9aefb042c8d441c3653df

Rode o programa em seu computador na porta 3333 com os seguintes comando


- `yarn sequelize db:migrate` para criar as tabelas no banco de dados postgres
- `npm run dev` ou 
- `yarn dev` caso tenha yarn instalado em sua maquina

## Rodar testes end-to-end com cypress

Rode o seguinte comando 
- `npm run test` ou 
`yarn test` caso tenha yarn instalado em sua maquina

