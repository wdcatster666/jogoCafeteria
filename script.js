const menuP = document.getElementById("menu-principal")
const cafeteria = document.getElementById("cafeteria");
const cozinha = document.getElementById("cozinha");
const notinha = document.getElementById("fichaPedido");
const ingrdNota = document.getElementById("ingredientes");
const btnPause = document.getElementById("btnPause");
let cliente = document.getElementById("cliente");
let pedido = document.getElementById("pedido");
let nomePedido = document.getElementById("nomePedido");
let nomeAcomp = document.getElementById("nomeAcomp");

// Elementos da cozinha
const xicaras = document.getElementById("xicaras");
const cafeteira = document.getElementById("cafeteira");
const btnQuarto = document.getElementById("quarto");
const btnMeio = document.getElementById("meio");
const btnInteiro = document.getElementById("inteiro");
const leite = document.getElementById("leite");
const acucar = document.getElementById("acucar");
const canela = document.getElementById("canela");
const adocante = document.getElementById("adocante");
const marshmallows = document.getElementById("marshmallows");
const chantilly = document.getElementById("chantilly");
const pia = document.getElementById("pia");
const xcrPedido = document.getElementById("xcrPedido");

let dinheiroAtual = 0;
let ultimaMusica = 0;
let qntClientes = 0;
let numPedido = 0;
let numAcomp = 0;
let numMsg = 0;
let pegouXicara = false;
let transbordou = false;
let naCafeteira = false;
let adicionandoIngrd = false;
let exibindoNota = false;

// Ingredientes = [Café | Leite | Açúcar | Canela | Adoçante | Marshmallows | Chantilly]

let ingrdPedido = [0, 0, 0, 0, 0, 0, 0];
let ingrdAtuais = [0, 0, 0, 0, 0, 0, 0];

// Iniciar jogo
function iniciar() {
    sortearCliente();
    sortearMusica();
    sortearPedido();
    dinheiroAtual = 30.00;
    menuP.style.display = "none";
    cafeteria.style.display = "block";
    btnPause.style.display = "block";
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
        numMusica = Math.floor(Math.random() * 7) + 1;
    } while (numMusica === ultimaMusica);
    ultimaMusica = numMusica;
    let musicaAtual = new Audio ('musicas/musica' + numMusica + '.mp3');
    musicaAtual.volume = 0.4;
    setTimeout(() => {
        musicaAtual.play();
    }, 5000);
    musicaAtual.addEventListener('ended', sortearMusica);
}

// Sortear pedido

function sortearPedido() {
    numPedido = Math.floor(Math.random() * pedidos.length);
    numAcomp = Math.floor(Math.random() * acompanhamentos.length);
    numMsg = Math.floor(Math.random() * carregarMensagens().length);
    nomePedido.innerHTML = pedidos[numPedido];
    nomeAcomp.innerHTML = acompanhamentos[numAcomp].toUpperCase();
    ingrdPedido = atualizarIngredientes()[numPedido];
    carregarPedido();
}

// Carregar pedido

function carregarPedido() {
    pedido.innerHTML = carregarMensagens()[numMsg];
}

// Exibir mensagens de erro ao usuário

function exibirAviso(msgErro) {
    const aviso = document.getElementById("aviso");
    aviso.style.display = "none";
    aviso.innerHTML = msgErro;
    aviso.style.display = "block";
    setTimeout(() => {
        aviso.style.display = "none";        
    }, 3000)
}

// Exibir e esconder notinha do pedido

function exibirFicha() {
    if (!exibindoNota) {
        notinha.style.marginTop = "10.5%";
        exibindoNota = true;
    } else {
        notinha.style.marginTop = "0";
        exibindoNota = false;
    }
}

// Atualizar a notinha

function atualizarFicha() {
    let listaIngrd = [];

    // CAFÉ

    if (ingrdAtuais[0] > 0) {
        if (ingrdAtuais[0] == 0.25) {
            listaIngrd.push(`- Café (1/4)`);
        } else if (ingrdAtuais[0] == 0.50) {
            listaIngrd.push(`- Café (1/2)`);
        } else if (ingrdAtuais[0] == 0.75) {
            listaIngrd.push(`- Café (3/4)`);
        } else {
            listaIngrd.push(`- Café (1)`);
        }
    }

    // LEITE

    if (ingrdAtuais[1] > 0) {
        if (ingrdAtuais[1] == 0.25) {
            listaIngrd.push(`- Leite (1/4)`);
        } else if (ingrdAtuais[1] == 0.50) {
            listaIngrd.push(`- Leite (1/2)`);
        } else if (ingrdAtuais[1] == 0.75) {
            listaIngrd.push(`- Leite (3/4)`);
        } else {
            listaIngrd.push(`- Leite (1)`);
        }   
    }

    // AÇÚCAR

    if (ingrdAtuais[2] > 0) {
        listaIngrd.push(`- Açúcar (${ingrdAtuais[2]})`);
    }

    // CANELA

    if (ingrdAtuais[3] > 0) {
        listaIngrd.push(`- Canela (${ingrdAtuais[3]})`);
    }

    // ADOÇANTE

    if (ingrdAtuais[4] > 0) {
        listaIngrd.push(`- Adoçante (${ingrdAtuais[4]})`);
    }

    // MARSHMALLOWS

    if (ingrdAtuais[5] > 0) {
        listaIngrd.push(`- Marhsmallows (${ingrdAtuais[5]})`);
    }

    // CHANTILLY

    if (ingrdAtuais[6] > 0) {
        listaIngrd.push(`- Chantilly`);
    }

    ingrdNota.innerHTML = listaIngrd.join("<br>");
}

// Seção de preparo dos pedidos

function prepararPedido() {
    cafeteria.style.display = "none";
    cozinha.style.display = "block";
    notinha.style.display = "block";
    ingrdAtuais = [0, 0, 0, 0, 0, 0, 0];
    atualizarFicha();
}

function pegarXicara() {
    if (!pegouXicara) {
        xcrPedido.style.display = "block";
        pegouXicara = true;
        cafeteira.style.cursor = "pointer";
    } else {
        exibirAviso("Você já pegou uma xícara!");
    }
}

function colocarNaCafeteira() {
    if (!adicionandoIngrd) {
        if (pegouXicara) {
            if (!naCafeteira) {
                xcrPedido.style.marginLeft = "-30%";
                xcrPedido.style.marginTop = "-6.7%";
                naCafeteira = true;
            } else {
                xcrPedido.style.marginLeft = "0";
                xcrPedido.style.marginTop = "0";
                naCafeteira = false;      
            }
        }
    }
}

// ADICIONAR CAFÉ

function pegarCafe(quantidade) {
    if (!adicionandoIngrd) {
        if (quantidade === "quarto") {
            dinheiroAtual -= 0.60;
            if (pegouXicara) {
                if (naCafeteira) {
                    if (ingrdAtuais[1] == 0) {
                        adicionandoIngrd = true;
                        ingrdAtuais[0] += 0.25;
                        setTimeout(() => {
                            adicionandoIngrd = false;
                            atualizarFicha();
                        }, 2000);
                    } else {
                        exibirAviso("A xícara já está cheia de café e de leite!");
                    }
                } else {
                    adicionandoIngrd = true;
                    exibirAviso("Você esqueceu de colocar a xícara na cafeteira! O café foi desperdiçado!");
                    setTimeout(() => {
                        adicionandoIngrd = false;
                    }, 2000);
                    return;
                }
            }
        } else if (quantidade === "meio") {
            dinheiroAtual -= 1.20;
            if (pegouXicara) {
                if (naCafeteira) {
                    if (ingrdAtuais[1] == 0) {
                        adicionandoIngrd = true;
                        ingrdAtuais[0] += 0.50;
                        setTimeout(() => {
                            adicionandoIngrd = false;
                            atualizarFicha();
                        }, 4000);
                    } else {
                        exibirAviso("A xícara já está cheia de café e de leite!");
                    }
                } else {
                    adicionandoIngrd = true;
                    exibirAviso("Você esqueceu de colocar a xícara na cafeteira! O café foi desperdiçado!");
                    setTimeout(() => {
                        adicionandoIngrd = false;
                    }, 4000);
                    return;
                }
            }
        } else {
            dinheiroAtual -= 2.40;
            if (pegouXicara) {
                if (naCafeteira) {
                    if (ingrdAtuais[1] == 0) {
                        adicionandoIngrd = true;
                        ingrdAtuais[0] += 1.00;
                        setTimeout(() => {
                            adicionandoIngrd = false;
                            atualizarFicha();
                        }, 8000);
                    } else {
                        exibirAviso("A xícara já está cheia de café e de leite!");
                    }
                } else {
                    adicionandoIngrd = true;
                    exibirAviso("Você esqueceu de colocar a xícara na cafeteira! O café foi desperdiçado!");
                    setTimeout(() => {
                        adicionandoIngrd = false;
                    }, 8000);
                    return;
                }
            }    
        }
        if (ingrdAtuais[0] > 1) {
            ingrdAtuais[0] = 1.00;
            transbordou = true;
            exibirAviso("A xícara transbordou! Ela ficou toda melada...")
        }
        if (!pegouXicara) {
            adicionandoIngrd = true;
            exibirAviso("Você ainda não pegou uma xícara! O café foi desperdiçado!");
            if (quantidade === "quarto") {
                setTimeout(() => {
                    adicionandoIngrd = false;
                }, 2000);    
            } else if (quantidade === "meio") {
                setTimeout(() => {
                    adicionandoIngrd = false;
                }, 4000); 
            } else {
                setTimeout(() => {
                    adicionandoIngrd = false;
                }, 8000); 
            }
        }
    }
}

// ADICIONAR LEITE

function pegarLeite() {
    if (!adicionandoIngrd) {
        if (pegouXicara) {
            if (!naCafeteira) {
                if (ingrdAtuais[0] + ingrdAtuais[1] < 1) {
                    adicionandoIngrd = true;
                    ingrdAtuais[1] = 1 - ingrdAtuais[0];
                    dinheiroAtual -= 2.60 * ingrdAtuais[1];
                    if (ingrdAtuais[1] <= 0.25) {
                        setTimeout(() => {
                            adicionandoIngrd = false;
                            atualizarFicha();
                        }, 2000);
                    }
                    else if (ingrdAtuais[1] <= 0.50) {
                        setTimeout(() => {
                            adicionandoIngrd = false;
                            atualizarFicha();
                        }, 4000);
                    } else if (ingrdAtuais[1] <= 0.75) {
                        setTimeout(() => {
                            adicionandoIngrd = false;
                            atualizarFicha();
                        }, 6000);
                    } else {
                        setTimeout(() => {
                            adicionandoIngrd = false;
                            atualizarFicha();
                        }, 8000);
                    }
                } else {
                    exibirAviso("A xícara já está cheia!");
                }
            } else {
                exibirAviso("Retire a xícara da cafeteira antes de adicionar leite!");
            }
        } else {
            exibirAviso("Você ainda não pegou uma xícara!");
        }
    }
}

// ADICIONAR AÇÚCAR

function pegarAcucar() {
    if (!adicionandoIngrd) {
        if (pegouXicara) {
            if (!naCafeteira) {
                if (ingrdAtuais[6] == 0) {
                    if (ingrdAtuais[0] > 0 || ingrdAtuais[1] > 0) {
                        dinheiroAtual -= 0.05;
                        ingrdAtuais[2]++;
                        atualizarFicha();
                    } else {
                        exibirAviso("Adicione café ou leite antes de adicionar açúcar!");
                    }
                } else {
                    exibirAviso("Você não pode adicionar açúcar após adicionar chantilly!");
                }
            } else {
                exibirAviso("Retire a xícara da cafeteira antes de adicionar açúcar!");
            }
        } else {
            exibirAviso("Você ainda não pegou uma xícara!");
        }
    }
}

// ADICIONAR CANELA

function pegarCanela() {
    if (!adicionandoIngrd) {
        if (pegouXicara) {
            if (!naCafeteira) {
                if (ingrdAtuais[0] > 0 || ingrdAtuais[1] > 0) {
                    dinheiroAtual -= 0.50;
                    ingrdAtuais[3]++;
                    atualizarFicha();
                } else {
                    exibirAviso("Adicione café ou leite antes de adicionar canela!");
                }
            } else {
                exibirAviso("Retire a xícara da cafeteira antes de adicionar açúcar!");
            }
        } else {
            exibirAviso("Você ainda não pegou uma xícara!");
        }
    }
}

// ADICIONAR ADOÇANTE

function pegarAdocante() {
    if (!adicionandoIngrd) {
        if (pegouXicara) {
            if (!naCafeteira) {
                if (ingrdAtuais[6] == 0) {
                    if (ingrdAtuais[0] > 0 || ingrdAtuais[1] > 0) {
                        dinheiroAtual -= 0.10;
                        ingrdAtuais[4]++;
                        atualizarFicha();
                    } else {
                        exibirAviso("Adicione café ou leite antes de adicionar adoçante!");
                    }
                } else {
                    exibirAviso("Você não pode adicionar adoçante após adicionar chantilly!");
                }
            } else {
                exibirAviso("Retire a xícara da cafeteira antes de adicionar adoçante!");
            }
        } else {
            exibirAviso("Você ainda não pegou uma xícara!");
        }
    }
}

// ADICIONAR MARSHMALLOWS

function pegarMarshmallow() {
    if (!adicionandoIngrd) {
        if (pegouXicara) {
            if (!naCafeteira) {
                if (ingrdAtuais[6] == 0) {
                    if (ingrdAtuais[0] > 0 || ingrdAtuais[1] > 0) {
                        dinheiroAtual -= 1.00;
                        ingrdAtuais[5]++;
                        atualizarFicha();
                    } else {
                        exibirAviso("Adicione café ou leite antes de adicionar marshmallows!");
                    }
                } else {
                    exibirAviso("Você não pode adicionar marshmallows após adicionar chantilly!");
                }
            } else {
                exibirAviso("Retire a xícara da cafeteira antes de adicionar marshmallows!");
            }
        } else {
            exibirAviso("Você ainda não pegou uma xícara!");
        }
    }
}

// ADICIONAR CHANTILLY

function pegarChantilly() {
    if (!adicionandoIngrd) {
        if (pegouXicara) {
            if (!naCafeteira) {
                if (ingrdAtuais[0] > 0 || ingrdAtuais[1] > 0) {
                    adicionandoIngrd = true;
                    dinheiroAtual -= 3.00;
                    ingrdAtuais[6]++;
                    if (ingrdAtuais[6] == 2) {
                        transbordou = true;
                        exibirAviso("Já havia chantilly na xícara! O chantilly transbordou e a xícara ficou toda melada...");
                    } else if (ingrdAtuais[6] > 2) {
                        exibirAviso("Já havia muito chantily na xícara! O chantilly foi desperdiçado!");
                    }
                    setTimeout(() => {
                        adicionandoIngrd = false;
                        atualizarFicha();
                    }, 3000);
                } else {
                    exibirAviso("Adicione café ou leite antes de adicionar chantilly!");
                }
            } else {
                exibirAviso("Retire a xícara da cafeteira antes de adicionar chantilly!");
            }
        } else {
            exibirAviso("Você ainda não pegou uma xícara!");
        }
    }
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

const valoresPd = [3.00, 4.50, 5.00, 6.50, 8.00, 11.00, 13.50, 18.00];
const valoresAc = [0, 0.20, 0.50];

// Ingredientes dos pedidos

function atualizarIngredientes() {
    if (numAcomp == 0) {
        return [
            [1, 0, 0, 0, 0, 0, 0],
            [0.75, 0.25, 0, 0, 0, 0, 0],
            [0.5, 0.5, 0, 0, 0, 0, 0],
            [0.5, 0.5, 0, 2, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 1],
            [0.25, 0.75, 0, 2, 0, 0, 1],
            [0.25, 0.75, 0, 0, 0, 4, 0],
            [0.5, 0.5, 0, 2, 0, 4, 1]
        ];
    } else if (numAcomp == 1) {
        return [
            [1, 0, 2, 0, 0, 0, 0],
            [0.75, 0.25, 2, 0, 0, 0, 0],
            [0.5, 0.5, 2, 0, 0, 0, 0],
            [0.5, 0.5, 2, 2, 0, 0, 0],
            [1, 0, 2, 0, 0, 0, 1],
            [0.25, 0.75, 2, 2, 0, 0, 1],
            [0.25, 0.75, 2, 0, 0, 4, 0],
            [0.5, 0.5, 2, 2, 0, 4, 1]
        ];
    } else {
        return [
            [1, 0, 0, 0, 3, 0, 0],
            [0.75, 0.25, 0, 0, 3, 0, 0],
            [0.5, 0.5, 0, 0, 3, 0, 0],
            [0.5, 0.5, 0, 2, 3, 0, 0],
            [1, 0, 0, 0, 3, 0, 1],
            [0.25, 0.75, 0, 2, 3, 0, 1],
            [0.25, 0.75, 0, 0, 3, 4, 0],
            [0.5, 0.5, 0, 2, 3, 4, 1]
        ];
    }
}

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