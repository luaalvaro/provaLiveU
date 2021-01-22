let models = ''
let newLead = {}
let leadWithModel = {}

$(document).ready(() => {
    $("form").submit((e) => {

        e.preventDefault() // Cancelo o envio do formulário

        newLead = {
            nome: $("#nome").val(),
            sobrenome: $("#sobrenome").val(),
            email: $("#email").val()
        }

        $.post("http://138.68.29.250:8082/", newLead)
            .done((res) => {
                models = res.match(/\d+/g)

                leadWithModel = {
                    nome: {
                        str: newLead.nome,
                        cod: models[0]
                    },
                    sobrenome: {
                        str: newLead.sobrenome,
                        cod: models[1]
                    },
                    email: {
                        str: newLead.email,
                        cod: models[2]
                    }
                }

                console.log(leadWithModel)

                $.ajax({
                    method: "POST",
                    url: "/",
                    data: { newLead: leadWithModel }
                  })
                    .done((msg) => alert(msg));

            })

    })
})