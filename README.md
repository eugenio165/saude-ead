# Saúde Infantil a Distância
Sistema de ensino a distância de educação física para crianças por meio da gameificação.

## Requerimentos
*Obrigatórios

- *[docker](https://www.docker.com/get-started)
- *[docker-compose](https://docs.docker.com/compose/install/)
- wget
- um visualizador de dados do MongoDB, como ex: [MongoDB Compass](https://www.mongodb.com/products/compass)


## Instalação

```sh
git clone https://github.com/eugenio165/saude-ead.git

cd saude-ead

# Copiar o arquivo template pro .env
cp .env.template .env

# !Importante!
# Dependendo do seu OS (se não for linux)
# Terá que trocar o valor da variável `DATA_SAVE_PATH` no .env
# Essa variável diz onde serão salvos os arquivos de BD do MongoDB

# Subir os containers do docker
docker-compose up --build

# Após isso, o projeto já está no ar e acessível atraves do localhost.

# Ao acessar a api (http://localhost/api), o NginX roteia as requisições para o SailJS, onde ele está na escuta.

```

# Ferramentas utilizadas

## [Docker](https://www.docker.com/get-started)
É uma ferramenta muito útil para facilitar e principalmente homologar os ambientes entre os participantes de qualquer projeto. Com ele conseguimos separar a infraestrutura da aplicação de uma forma organizada e prática. Utilizando o Docker é possível executar o projeto em ambientes isolados chamados `containers`, que são basicamente um SO virtualizado que contém tudo necessário para executar o projeto, basta apenas baixar e subir os containers.

Assim, conseguimos usar o Docker para fornecer fácil e rápido uso da aplicação, bastando apenas um comando para subir a aplicação inteira.

Hoje, no projeto temos 3 serviços dockerizados, através do `docker-compose`, uma ferramenta para definir e executar um ambiente com vários containers, como é o caso aqui.
os 3 serviços dockerizados são:

 - SailsJS (API)
 - MongoDB (BD)
 - NginX (Web Server, Reverse Proxy)

## [SailsJS](https://sailsjs.com/)
SailsJS é um dos vários frameworks de desenvolvimento de API existentes atualmente para o NodeJS, ele é escrito em JS puro, e almeja facilitar o desenvolvimento fornecendo uma organização e arquitetura pre-definida.
Algumas de seus benefícios são:

- 100% JS
- Conexão a qualquer banco de dados
- Permite conexões múltiplas a vários BD diferentes, caso tiver necessidade (aplicação distribuída)
- Suporta qualquer front-end (não há dependência)
- websockets facilmente integradas

Na atualidade, existe frameworks mais robustos e escalavéis, mas o Sails é muito eficiente para projetos menores.

No contexto atual da aplicação, aqui será feito o intermediário entre a aplicação Web e o banco de dados (MongoDB). Aqui será feita qualquer processamento, alteração, validação e manipulação necessária a qualquer ponta (seja Web ou BD).

Sua execução é feita através do `run.sh` na pasta `docker/nodejs`. O container do node criado para executar a aplicação executa aquele script que baixa as dependências necessárias e executa o sails.

## [MongoDB](https://www.mongodb.com/)
Um poderoso banco de dados NoSQL, onde não há schema pre-definido. Basicamente qualquer estrutura fornecida pode ser armazenada, se obedecer regras básicas. O dado armazendo, chamado de documento é indexado, assim como num banco SQL, e escala muito bem apesar de não ter um schema de dados bem definida. Alguns benefícios do MongoDB são:

- facilidade de uso
- escalabilidade
- flexibilidade (NoSQL)
- indexação
- distibuição de BDs
- free to use


No contexto da aplicação, sua definição está no `docker-compose.yml`, no serviço `mongo`. É utilizado a imagem do dockerhub `mongo:5.0.1` para subir o container, e sua porta do mongo é exposta para o host, através da porta `27017`, permitindo que podemos conectar no MongoDB através do link: `mongodb://admin:admin@localhost:27017/admin`.
## [NginX](https://www.nginx.com/)
É um servidor web que também foi construído para funcionar como load balancer, proxy reversa, cacheador, streamador de mídias, e etc. Similar ao Apache HTTP Server, é bem potente e facilita bastante a conexão de diversos serviços, aplicaçãoes e afins.

No contexto do projeto, está sendo usado como reverse proxy. Hoje, está servindo um HTML básico no index (http://localhost) que no futuro, será a aplicação Web compilada.

Na endpoint http://localhost/api é fornecido a comunicação com a API em SailsJS. Ao abrir essa URL, é feito a requisição para o SailsJS e retornado um hello world também.

Suas definições estão disponíveis na pasta `docker/nginx`, onde contém os templates de server definidos para local e prod (um temporário, por enquanto).

Observando o `default.conf.template` da pasta `docker/nginx/templates/local` podemos observar uma definição básica de servidor, onde é servido um index.html na endpoint `/` e as requisições no `/api` passadas para a API em SailsJS.

## [Pivotal Tracker](https://www.pivotaltracker.com)
Essa ferramenta permite uma melhor organização de tarefas em um projeto, permitindo a criação, descrição, organização, ordenação e agrupamento de tarefas relacionados ao projeto. Se torna essencial em equipes maiores, mas ainda auxilia bastante em desenvolvimento com times menores ou independentes, uma vez que permite a documentação do que (e quando) foi desenvolvido, frequentemente chamado de backlog. No desenvolvimento de Software é um ponto importante, uma vez que a organização fornece uma base segura para o desenvolvimento.

No contexto da aplicação, utilizo para dividir escopos de desenvolvimento de uma forma que consigo facilmente olhar pra trás e ver o que desenvolvi, e entender facilmente, caso tiver qualquer problema que precisa ser revisto/rastreado.
