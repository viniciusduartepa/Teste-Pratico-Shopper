# Teste-pratico-shopper
**Instruções para rodar a aplicação em sua máquina local**

---

# Running Locally

Rodando a aplicação localmente.

## API

Tenha certeza que possui o [Node.js](http://nodejs.org/) e o [MySql](https://www.mysql.com/) instalados.
Para verificar se estão instalados, rode os seguintes comandos no seu terminal:

```
npm --version
mysql --version
```

Caso não seja exibida nenhuma mensagem de erro, você esta pronto para continuar.

No MySql voce deve criar um Database e rodar o script de criação de tabelas que está na pasta ./Backend/sql/database.sql
Agora você precisa criar um arquivo .env baseado no arquivo .env.example e suas devidas configurações de ambiente e as configurações de porta e host do Mysql.

Após esses passos basta ir na pasta raiz do Backend(./Backend) e executar os seguintes comandos no terminal:


```
npm install
npm run start:dev
```

Se todas as configurações estiverem corretas você deve ver a seguinte mensagem em seu terminal:
```
Server is running in port:  3333
```

## Client

Agora com estes passos finalizados basta rodar o servidor de desenvolvimento do Client acessando a pasta raiz do Frontend(./Frontend) e executar os seguintes comandos:

```
npm install
npm run start
```

Se todas as configurações estiverem corretas você deve receber uma mensagem no terminal e ser direcionado para página inicial usando o seu navegador padrão.
