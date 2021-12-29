const celulas = document.querySelectorAll(".celula");
const um_jogador = document.querySelectorAll(".um_jogador");
const dois_jogadores = document.querySelectorAll(".dois_jogadores");

let checar_turno = true;
const JOGADOR_X = "X";
const JOGADOR_O = "O"; 

var ja_clicado = [];
var modo_jogo = 0;

const COMBINACOES = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

for(let i=0; i < 9; i++){
    ja_clicado[i] = false;
}

document.addEventListener("click", (event) =>{
    if(event.target.matches(".um_jogador") && modo_jogo === 0){
        modo_jogo = 1;
        console.log("Um jogador");
    }
    else if(event.target.matches(".dois_jogadores") && modo_jogo === 0){
        modo_jogo = 2;
        console.log("Dois jogadores");
    }

    else if(event.target.matches(".celula") && ja_clicado[event.target.id] === false && modo_jogo === 1){
        jogar(event.target.id, JOGADOR_X);
        jogar_bot(JOGADOR_O);
    }
    else if(event.target.matches(".celula") && ja_clicado[event.target.id] === false && modo_jogo === 2){
        jogar(event.target.id, JOGADOR_X);
    }
});

function jogar_bot(turno){
    let posicao_aleatoria;
    const posicoes_disponiveis = [];
    let j=0;
    for(let i=0; i < 9; i++){
        if(ja_clicado[i] === false){
            posicoes_disponiveis[j++] = i;
        }
    }

    let min = Math.ceil(0);
    let max = Math.floor(posicoes_disponiveis.length);
    
    posicao_aleatoria =  Math.floor(Math.random() * (max - min)) + min; 
    id = posicoes_disponiveis[posicao_aleatoria];
    const celula = document.getElementById(id);
    celula.textContent = turno;
    celula.classList.add(turno);
    ja_clicado[id] = true;
    checaVitoria(turno);
}

function jogar(id, turno){
    const celula = document.getElementById(id);
    if(modo_jogo === 2) turno = checar_turno ? JOGADOR_X : JOGADOR_O;
    celula.textContent = turno;
    celula.classList.add(turno);
    ja_clicado[id] = true;
    checaVitoria(turno);
}

function checaVitoria(turno){
    const vencedor = COMBINACOES.some((comb) => {
        return comb.every((index) => {
            return celulas[index].classList.contains(turno);
        })
    });

    if(vencedor){
        encerra_jogo(turno);
    } 
    else if(checar_empate()){
        encerra_jogo();
    }
    else{
        checar_turno = !checar_turno;
    }
}


function checar_empate(){
    let x = 0;
    let o = 0;

    for(index in celulas){
        if(!isNaN(index)){
            if(celulas[index].classList.contains(JOGADOR_X)){
                x++;
            }
            else if(celulas[index].classList.contains(JOGADOR_O)){
                o++;
            }
        }
    }

    return x + o === 9 ? true : false;
}

function encerra_jogo(vencedor = null){
    const tela_final = document.getElementById("tela-final");
    const h3 = document.createElement("h3");
    const h4 = document.createElement("h4");

    tela_final.style.display = "block";
    tela_final.appendChild(h3);
    tela_final.appendChild(h4);
    
    for(let i=0; i < 9; i++){
        ja_clicado[i] = true;
    }

    if(vencedor){
        h3.innerHTML = `O player "<span>${vencedor}</span>" venceu!`;
    }
    else{
        h3.innerHTML = "Deu velha!";
    }

    let contador = 3;
    setInterval(() => {
        h4.innerHTML = `Reiniciando em ${contador--}`;
    }, 1000);

    setTimeout(() => location.reload(), 4000);
}