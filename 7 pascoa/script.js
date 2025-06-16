// Variáveis do quiz
let currentQuestion = 0;
let sharedCount = 0;
const maxShares = 5;
const questions = [
    {
        text: "Você conheçe a Cacau Show?",
        options: ["Sim", "Não",]
    },
    {
        text: "Quantos anos você tem?",
        options: ["18-29", "29-39", "40-49", "Mais de 50",]
    },
    {
        text: "Você já comprou na Cacau Show?",
        options: ["Sim", "Não",]
    },

    {
        text: "O que você acha da Cacau Show?",
        options: ["Muito boa", "Excelente", "Ruim", "Péssimo"]
    }
];

// Elementos do DOM
const questionScreen = document.getElementById('questionScreen');
const shareScreen = document.getElementById('shareScreen');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const nextBtn = document.getElementById('nextBtn');
const redeemBtn = document.getElementById('redeemBtn');

// Inicia o quiz automaticamente
document.addEventListener('DOMContentLoaded', showQuestion);

// Mostra a pergunta atual
function showQuestion() {
    const question = questions[currentQuestion];
    questionText.textContent = question.text;
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionElement);
    });
}

// Seleciona uma opção
function selectOption(index) {
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.style.backgroundColor = '#f0f0f0');
    options[index].style.backgroundColor = '#90ee90';
    nextBtn.disabled = false;
}

// ... (código anterior mantido)

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
        nextBtn.disabled = true;
    } else {
        // Mostra tela de loading ao invés de shareScreen direto
        questionScreen.style.display = 'none';
        startLoadingSequence();
    }
}

function startLoadingSequence() {
    const loadingScreen = document.getElementById('loadingScreen');
    const messages = [
        "Analisando suas respostas...",
        "Confirmando elegibilidade...",
        "Tudo certo!",
        "Preparando seu link exclusivo..."
    ];
    
    loadingScreen.style.display = 'flex';
    let counter = 0;
    
    // Rotação de mensagens
    const interval = setInterval(() => {
        document.getElementById('loadingMessage').textContent = messages[counter % messages.length];
        counter++;
    }, 800);
    
    // Finaliza após 3 segundos
    setTimeout(() => {
        clearInterval(interval);
        loadingScreen.style.display = 'none';
        showResultModal();
    }, 4000);
}

function showResultModal() {
    document.getElementById('resultModal').style.display = 'flex';
}

function showShareScreen() {
    document.getElementById('resultModal').style.display = 'none';
    document.getElementById('shareScreen').style.display = 'block';
}

// ... (restante do código mantido)

// Compartilha no WhatsApp
function shareToWhatsApp() {
    const text = "Páscoa Solidaria, Ganhei ovos de Páscoa pra família toda! A Cacau Show tá presentando quem responder esse quiz super rápido:" ;
    const url = window.location.href;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + url)}`, '_blank');

    // Efeito animado (completa em 1 segundo)
    let progress = 0;
    const animation = setInterval(() => {
        progress += 10;
        document.getElementById('progressBar').style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(animation);
            sharedCount = maxShares;
            redeemBtn.disabled = false;
        }
    }, 50);
}

// Atualiza a barra de progresso
function updateProgressBar() {
    const progress = (sharedCount / maxShares) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}

function redeemPrize() {
    // Mostra mensagem de carregamento
    const redeemBtn = document.getElementById('redeemBtn');
    redeemBtn.innerHTML = 'Redirecionando... <span class="spinner"></span>';
    
    // Redireciona após 1.5 segundos
    setTimeout(() => {
        window.location.href = "https://j3dq7t-50.myshopify.com/?_ab=0&_fd=0&_sc=1";
    }, 1500);
}