var Connection = require('tedious').Connection
var Request = require('tedious').Request

// Configuração de conexão com o banco de dados

var config = {
    server: 'virtual2.febracorp.org.br',
    authentication: {
        type: 'default',
        options: {
            userName: 'user_trial',
            password: '7412LIVE!@#$%¨&*()'
        }
    },
    options: {
        encrypt: false,
        database: 'CONTOSO',
        validateBulkLoadParameters: true,
    }
}

var connection = new Connection(config)
connection.connect((err) => (err) ? console.log(err) : console.log("Successfully connected to the database :D"))

// Configuração de conexão com o banco de dados

const getIndex = (req, res) => {
    res.render('index')
}

const postIndex = (req, res) => {
    const newLead = req.body.newLead
    var somaTotal = 0
    var dataSend = []
    var dataSendUnique = []

    function insertLead(newLead) {
        var Sql = "BEGIN TRANSACTION"
        Sql += " INSERT INTO tbs_nome (nome, cod) VALUES ('" + newLead.nome.str + "', '" + newLead.nome.cod + "');"
        Sql += " INSERT INTO tbs_sobrenome (sobrenome, cod) VALUES ('" + newLead.sobrenome.str + "', '" + newLead.sobrenome.cod + "');"
        Sql += " INSERT INTO tbs_email (email, cod) VALUES ('" + newLead.email.str + "', '" + newLead.email.cod + "');"
        Sql += " SELECT cod + soma FROM tbs_cod_nome WHERE cod = '" + newLead.nome.cod + "';"
        Sql += " SELECT cod + soma FROM tbs_cod_sobrenome WHERE cod = '" + newLead.sobrenome.cod + "';"
        Sql += " SELECT cod + soma FROM tbs_cod_email WHERE cod = '" + newLead.email.cod + "';"
        Sql += " COMMIT"

        request = new Request(Sql, (err, rowCount) => {
            (err) ? console.log(err) : console.log('')
        });

        request.on('row', (columns) => {
            // console.log(parseInt(columns[0].value))
            somaTotal += parseInt(columns[0].value)
        })

        request.on('requestCompleted', () => {
            console.log("A soma de todas as células de COD e SOMA é: " + somaTotal)
            // Agora precisa ser feita a consulta da soma nas tabelas com inner join
            getResultSum(somaTotal)
        });

        connection.execSql(request);
    }

    function getResultSum(somaTotal) {

        // Sql = "SELECT * FROM tbs_animais INNER JOIN tbs_paises ON tbs_animais.total = tbs_paises.total INNER JOIN tbs_cores ON tbs_animais.total = tbs_cores.total WHERE tbs_animais.total = '" + somaTotal + "'"
        Sql = "SELECT tbs_animais.animal, tbs_paises.pais, tbs_cores.cor, tbs_cores_excluidas.cor FROM tbs_animais INNER JOIN tbs_paises ON tbs_animais.total = tbs_paises.total INNER JOIN tbs_cores ON tbs_paises.total = tbs_cores.total INNER JOIN tbs_cores_excluidas ON tbs_cores.total = tbs_cores_excluidas.total WHERE tbs_animais.total = '" + somaTotal + "'"


        request = new Request(Sql, (err, rowCount) => {
            (err) ? console.log(err) : console.log('')
            
        });

        request.on('row', (columns) => {
            columns.forEach(function(column) {
                if (column.value === null) {
                  console.log('NULL');
                } else {
                  dataSend.push({
                    colName: column.metadata.colName,
                      value: column.value
                  })
                }
              });
        })

        request.on('requestCompleted', () => {
            //Fim da consulta, agora mandar os valores para o front end através do render para poder exibir com o EJS
            
            dataSendUnique = dataSend.filter((a) => {
                return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
            }, Object.create(null))

            getCoresExcluidas(somaTotal)

        });

        connection.execSql(request);

    }

    function getCoresExcluidas(somaTotal) {
        // Sql = "SELECT * FROM tbs_animais INNER JOIN tbs_paises ON tbs_animais.total = tbs_paises.total INNER JOIN tbs_cores ON tbs_animais.total = tbs_cores.total WHERE tbs_animais.total = '" + somaTotal + "'"
        Sql = "SELECT tbs_cores_excluidas.cor FROM tbs_cores_excluidas WHERE tbs_cores_excluidas.total = '" + somaTotal + "'"


        request = new Request(Sql, (err, rowCount) => {
            (err) ? console.log(err) : 
            connection.close()
        });

        request.on('row', (columns) => {
            columns.forEach(function(column) {
                if (column.value === null) {
                  console.log('NULL');
                } else {
                    dataSendUnique.push({
                    colName: column.metadata.colName,
                      value: column.value
                  })
                }
              });
        })

        request.on('requestCompleted', () => {
            //Fim da consulta, agora mandar os valores para o front end através do render para poder exibir com o EJS

            console.log(dataSendUnique)

        });

        connection.execSql(request);
    }

    insertLead(newLead)
}

module.exports = { getIndex, postIndex }