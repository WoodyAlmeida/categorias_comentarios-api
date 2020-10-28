API para categorias e comentários do teste proposto.

Ao rodar yarn e yarn watch os arquivos da dist serão criados, então a API rodará uma função para instanciar comentários, categorias e usuários baseados no modelo. As seeds podem ser conferidas na função preloadSeeds() no arquivo src/app.ts.

Como não há um banco de dados, as tabelas foram instanciadas como classes de dicionários de dados baseados em interfaces. Os dados manipulados persistem enquanto a API estiver rodando.

Para conferir as interfaces: src/interfaces/index.ts
Para conferir a interação com os dicionários de dados nos repositórios de cada classe: src/repositories

As rotas estão no arquivo src/routes/routes.ts

A porta padrão da API é a 3000, mas é possível criar um arquivo .env (basear-se no .env_example) e setar a variável HTTP_PORT para outra.

Como não há login no modelo, não foram feitas verificações de autenticação ou permissões.

As rotas, (src/routes/routes.ts) controllers (src/controllers) e repositórios (src/repositories) estão com comentários básicos explicando o funcionamento de algumas funções.