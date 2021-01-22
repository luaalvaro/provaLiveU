# BUG ENCONTRADO, INCONSISTÊNCIA DE USUABILIDADE DO BANCO DE DADOS

[] - Por falta de controle dos banco de dados, alguns dados de algumas tabelas foram deletados, então na inserção dos valores
[] - os ids dos registros diferem










---






[x] - Pegar os dados do formulário e fazer um request na API para receber os códigos.
[x] - Separar os códigos por categoria e atrelar a um objeto, criando um objeto final com todos os valores
[x] - Enviar dados para o servidor
[x] - Adicionar registros nas respectivas tabelas (tbs_nome, tbs_sobrenome, tbs_email) com os respectivos valores ("Lua", "Alvaro", "luan.alc@hotmail.com")
[x] - Ajustar o Sql command para que os valores inseridos no banco de dados seja os que estao chegando do front END.
[x] - Selecionar nas tabelas (tbs_cod_nome, tbs_cod_sobrenome, tbs_cod_email) a soma dos valores de COD + SOMA para criar uma chave para o campo.
[x] - somar todos os valores de COD + SOMA de TODOS os campos (nome, sobrenome, email), para criar uma espécie de "chave" do registro.
[] - Selecionar dentro de novas tabelas de "consulta" pelo ID encontrado, para achar a resposta de (tbs_animais, (tbs_cores - tbs_cores_excluidas), tbs_paises)
[] - front end para exibir as informações encontradas (Animal, Cor e País)