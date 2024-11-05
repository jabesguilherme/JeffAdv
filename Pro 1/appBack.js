/* -- ChatBot VenomBot -- */

const venom = require("venom-bot");
const axios = require("axios");
const banco = require("./src/banco");
const treinamento = `
Você é um chatbot para um advogado.
Seu nome é Assistente advogado.
O nome da Advocacia é JEFF OFF ADV (Jefferson Office Advocacia).

O que você responde:
Resposta sobre as áreas de atuação como, oque é advogar nas áreas como empresarial, trabalhista, comercial.

Atendimento ao cliente: O assistente deve ser capaz de responder a perguntas comuns dos clientes sobre a advocacia, como horários de funcionamento, localização.

responda conforme for perguntado.
`

venom.create({
    session: "chatGPT_BOT",
})
.then((client) => {start(client);console.log("");})

    .catch((err) => {console.log(err);});
 
const header = {
        "Content-Type": "application/json", 
        /* Chave API */
        "Authorization":
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const start = async (client) => {
    client.onMessage(async(message) => {
        const userCadastro = banco.db.find(numero => numero.num === message.from);
        if(!userCadastro){
            console.log(`Cadastrando novo usuário:`);
            banco.db.push({num: message.from, historico : []})
        }else{
            console.log(`Usuário já está cadastrado.`);
        }

        const historico = banco.db.find(num => num.num === message.from);
                historico.historico.push("user: " + message.body);
            
        await delay(2000);
        try{
            axios.post("https://api.openai.com/v1/chat/completions", {
                "model": "gpt-3.5-turbo",
                "messages": [
                    {"role": "system","content": treinamento},
                    {"role": "system","content": "histórico de conversas: " + historico.historico},
                    {"role": "user","content": message.body}]         
            },{
                headers: header
            })
            .then((response) =>{
                console.log("Resposta da API:", response.data.choices[0].message.content);
                historico.historico.push("assistent: " + response.data.choices[0].message.content);
                client.sendText(message.from, response.data.choices[0].message.content);
            })   
        }catch(err){
            console.log("Erro ao chamar a API:", err);
        }
    });
};

/* app button disable */

class FormSubmit{
    constructor(settings){
        this.settings = settings;
        this.form = document.querySelector(settings.form);
        this.formButton = document.querySelector(settings.button);
        if(this.form){
            this.url = this.form.getAttribute("action");
        }
        this.sendForm = this.sendForm.bind(this);
    }

    displaySuccess(){
        this.form.innerHTML = this.settings.success;
    }

    displayError(){
        this.form.innerHTML = this.settings.error;
    }

    getFormObject(){
        const formObject = {};
        const fields = this.form.querySelectorAll("[name]");
        fields.forEach((field) => {
            formObject[field.getAttribute("name")] = field.value;
        });
        return formObject;
    }

    onSubmission(event){
        event.preventDefault();
        event.target.disable = true;
        event.target.innerText = "Enviando...";
    }

    async sendForm(event){
        try{
            this.onSubmission(event);
            await fetch(this.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(this.getFormObject()),
            });
            this.displaySuccess();
        }catch (error){
            this.displayError();
            throw new Error(error);
        }
        
    }

    init(){
        if (this.form) 
            this.formButton.addEventListener("click", this.sendForm);
        return this;
    }
}

const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<h1 class='success'>Mensagem Enviada!</h1>",
    form: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>",
});
formSubmit.init();