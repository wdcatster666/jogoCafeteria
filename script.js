const menuP = document.getElementById("menu-principal")
const cafeteria = document.getElementById("cafeteria");
const cliente = document.getElementById("cliente");
const pedido = document.getElementById("pedido");
let ultimaMusica = 0;
let qntClientes = 0;
let numPedido = 0;
let numAcomp = 0;
let numMsg = 0;

// Iniciar jogo
function iniciar() {
    sortearCliente();
    sortearMusica();
    sortearPedido();
    menuP.style.display = "none";
    cafeteria.style.display = "block";
}

// Sortear cliente

function sortearCliente() {
    let numCliente = Math.floor(Math.random() * 15) + 1;
    cliente.src = "clientes/cliente" + numCliente + ".png";
}

// Sortear música

function sortearMusica() {
    let numMusica;
    do {
        numMusica = Math.floor(Math.random() * 5) + 1;
    } while (numMusica === ultimaMusica);
    ultimaMusica = numMusica;
    let musicaAtual = new Audio ('musicas/musica' + numMusica + '.mp3');
    musicaAtual.volume = 0.4;
    musicaAtual.play();
    musicaAtual.addEventListener('ended', sortearMusica);
}

// Sortear pedido

function sortearPedido() {
    numPedido = Math.floor(Math.random() * pedidos.length);
    numAcomp = Math.floor(Math.random() * acompanhamentos.length);
    numMsg = Math.floor(Math.random() * carregarMensagens().length);
    carregarPedido();
}

// Carregar pedido

function carregarPedido() {
    pedido.innerHTML = carregarMensagens()[numMsg];
}

// Lista de pedidos

const pedidos = [
    "Café Expresso",
    "Macchiato",
    "Café com Leite",
    "Cappuccino Caseiro",
    "Café Vienense",
    "Cappuccino Doce de Canela",
    "S'mores Coffee",
    "Supreme Marshmallow Latte"
];

const acompanhamentos = [
    "sem açúcar",
    "com açúcar",
    "com adoçante"
];

// Valores dos pedidos

const valoresPd = [3, 4.5, 5, 6.5, 8, 11, 13.5, 18];
const valoresAc = [0, 0.1, 0.5];

// Mensagens dos pedidos

function carregarMensagens() {
    return [
        `<p>Oi, bom dia! Eu vou querer um ${pedidos[numPedido]}, por favor! Ah, e ${acompanhamentos[numAcomp]}, por gentileza!</p>`,
        `<p>Bom dia! Como estão os negócios hoje? Ouvi dizer que sua cafeteria está fazendo o maior sucesso! Enfim, eu vou querer um ${pedidos[numPedido]} ${acompanhamentos[numAcomp]}, por favor!</p>`,
        `<p>Um ${pedidos[numPedido]} ${acompanhamentos[numAcomp]} por favor.</p>`,
        `<p>Eu quero um ${pedidos[numPedido]} ${acompanhamentos[numAcomp]}. E anda logo que eu tô com pressa.</p>`,
        `<p>Que cafeteria mais adorável! Se o café daqui for tão bom quanto a aparência desse lugar, eu vou vir aqui todo dia! Hmm... eu vou pedir um ${pedidos[numPedido]}. Hmm... e eu vou querer ${acompanhamentos[numAcomp]}, por favor!</p>`,
        `<p>Nossa, quantas opções! Eu vou querer um... ${pedidos[Math.floor(Math.random() * pedidos.length)]}! Não! Hmm... é... um... um ${pedidos[numPedido]}! E... talvez... acho que... ${acompanhamentos[numAcomp]}! É, ${acompanhamentos[numAcomp]}!</p>`,
        `<p>Aff, só tem isso no cardápio? Nenhuma opção parece boa, que cafeteria mais pobre... pode ser um ${pedidos[numPedido]}, e ${acompanhamentos[numAcomp]}, se é que você consegue fazer isso.</p>`,
        `<p>Eu adoro café! Eu quero café! Quantos cafés! Café, café, café... Uau, ${pedidos[numPedido]}! Eu vou querer esse café! Café ${acompanhamentos[numAcomp]}, por favor!</p>`,
        `<p>Então essa é a nova cafeteria que foi aberta aqui no bairro? Ela é muito bonita! Vejamos se o café é tão bom quanto dizem... eu vou querer experimentar um ${pedidos[numPedido]}, ${acompanhamentos[numAcomp]}, se possível!</p>`,
        `<p>Gente, que cafeteria mais brega! Você tem que mudar o estilo desse lugar se não quiser espantar os clientes! Hmm, mas já que eu já estou aqui... me vê um ${pedidos[numPedido]} ${acompanhamentos[numAcomp]}, por favorzinho.</p>`,
        `<p>O amor da minha vida me deixou hoje, agora eu não tenho mais ninguém! Vim aqui para afogar minhas mágoas numa xícara de café... me dê qualquer coisa... pode ser um ${pedidos[numPedido]}... e de preferência ${acompanhamentos[numAcomp]}...</p>`,
        `<p>Estudos indicam que quem toma café antes do trabalho se torna muito mais produtivo. Eu quero muito testar se isso é verdade. Eu vou querer um ${pedidos[numPedido]}, ${acompanhamentos[numAcomp]} para melhores resultados!</p>`
    ];
}