const $stepText = $('#step-text');
const $stepDescription = $('#step-description');
const $stepOne = $('.step.one');
const $stepTwo = $('.step.two');
const $stepThree = $('.step.three');
const $title = $('#title');
const $containerBtnFormOne = $('#containerBtnFormOne');
const $btnFormOne = $('#btnFormOne');
const $containerBtnFormTwo = $('#containerBtnFormTwo');
const $btnFormTwo = $('#btnFormTwo');
const $containerBtnFormThree = $('#containerBtnFormThree');
const $btnFormThree = $('#btnFormThree');
const $inputNome = $('#nome');
const $inputSobrenome = $('#sobrenome');
const $inputDataNascimento = $('#dataNascimento');
const $inputEmail = $('#email');
const $inputMinibio = $('#minibio');
const $inputEndereco = $('#endereco');
const $inputComplemento = $('#complemento');
const $inputCidade = $('#cidade');
const $inputCep = $('#cep');
const $inputHabilidades = $('#habilidades');
const $inputPontosForte = $('#pontosForte');

let nomeValido = false;
let sobrenomeValido = false;
let dataNascimentoValido = false;
let emailValido = false;
let enderecoValido = false;
let cidadeValida = false;
let cepValido = false;
let habilidadesValida = false;
let pontosFortesValido = false;


const minLengthText = 2;
const minLengthTextArea = 10;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const cepRegex = /^([\d]{2})([\d]{3})([\d]{3})|^[\d]{2}.[\d]{3}-[\d]{3}/

function validarInput(element, minLength, maxLength, regex) {
    const closest = $(element).closest('.input-data');
    if (!element.value
        || (minLength && element.value.trim().length < minLength)
        || (maxLength && element.value.trim().length > maxLength)
        || (regex && !element.value.toLowerCase().match(regex))
    ) {
        closest.addClass('error');
        return false;
    }
    closest.removeClass('error');
    return true;
}

function validaEmail(element) {
    const closest = $(element).closest('.input-data');
    if (!element.value || !element.value.toLowerCase().match(emailRegex)) {
        closest.addClass('error');
        return false;
    }
    closest.removeClass('error');
    return true;
};

function validaFormularioUm() {
    if (nomeValido && sobrenomeValido && emailValido && dataNascimentoValido) {
        $containerBtnFormOne.removeClass('disabled');
        $btnFormOne.removeClass('disabled');
        $btnFormOne.off('click').on('click', iniciarFormulario2);
    } else {
        $containerBtnFormOne.addClass('disabled');
        $btnFormOne.addClass('disabled');
        $btnFormOne.off('click');
    }
}

function iniciarFormulario2(){
    $stepText.text('Passo 2 de 3 - Dados de correspondência');
    $stepDescription.text('Precisamos destes dados para que possamos entrar em contaro se necessário.');
    $stepOne.hide();
    $stepTwo.show();

    $inputEndereco.keyup(function(){
        enderecoValido = validarInput(this, minLengthTextArea);
        validaFormularioDois();
    });

    $inputCidade.keyup(function(){
        cidadeValida = validarInput(this, minLengthText);
        validaFormularioDois();
    });

    $inputCep.keyup(function(){
        this.value = this.value.replace(/\D/g,'');
        cepValido = validarInput(this, null, null, cepRegex)
        if(cepValido){
            this.value = this.value.replace(cepRegex,"$1.$2-$3")
        }
        validaFormularioDois();
    });

    $inputComplemento.keyup(function(){
        validaFormularioDois();
    });
}

function validaFormularioDois(){
    if(enderecoValido && cidadeValida && cepValido){
        $containerBtnFormTwo.removeClass('disabled');
        $btnFormTwo.removeClass('disabled');
        $btnFormTwo.off('click').on('click', iniciarFormularioTres);
    }else{
        $containerBtnFormTwo.addClass('disabled');
        $btnFormTwo.addClass('disabled'); 
        $btnFormTwo.off('click'); 
    }
}

function iniciarFormularioTres(){
    $stepText.text('Passo 3 de 3 - Conte-nos sobre você:');
    $stepDescription.text('Não economize nas palavras, aqui é onde você pode se destacar.'); 
    $stepThree.show();
    $stepTwo.hide();
    
    $inputHabilidades.keyup(function(){
        habilidadesValida = validarInput(this, minLengthTextArea);
        validaFormularioTres();
    });

    $inputPontosForte.keyup(function(){
        pontosFortesValido = validarInput(this, minLengthTextArea);
        validaFormularioTres();
    });
}

function validaFormularioTres(){
    if(habilidadesValida && pontosFortesValido){
        $containerBtnFormThree.removeClass('disabled');
        $btnFormThree.removeClass('disabled');
        $btnFormThree.off('click').on('click', finalizarFormulario);
    } else{
        $containerBtnFormThree.addClass('disabled');
        $btnFormThree.addClass('disabled');
        $btnFormThree.off('click');
    }
}

function finalizarFormulario(){
    $stepThree.hide();
    $stepDescription.hide();
    $title.text('Muito Obrigado pela sua incrição!');
    $stepText.text('Entraremos em contato assim que possivél, nosso prazo médio é de 5 dias. Fique atento na sua caixa de email');
}

function init() {
    $stepText.text('Passo 1 de 3 - Dados pessoais');
    $stepDescription.text('Descreva seus dados para te conhecermos melhor:');
    $stepTwo.hide();
    $stepThree.hide();

    $inputNome.keyup(function () {
        nomeValido = validarInput(this, minLengthText);
        validaFormularioUm();
    });

    $inputSobrenome.keyup(function () {
        sobrenomeValido = validarInput(this, minLengthText);
        validaFormularioUm();
    });

    $inputDataNascimento.keyup(function () {
        dataNascimentoValido = validarInput(this, minLengthText);
        validaFormularioUm();
    });

    $inputDataNascimento.change(function () {
        dataNascimentoValido = validarInput(this, minLengthText);
        validaFormularioUm();
    });

    $inputEmail.keyup(function () {
        emailValido = validarInput(this, null, null, emailRegex);
        validaFormularioUm();
    });

    $inputMinibio.keyup(function () {
        validaFormularioUm();
    })

    $inputDataNascimento.on('focus', function () {
        this.type = 'date';
    });

    $inputDataNascimento.on('blur', function () {
        if (!this.value) {
            this.type = 'text';
        }
    });
}

init();