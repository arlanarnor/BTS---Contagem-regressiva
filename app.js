// Dados dos membros do BTS com as datas atualizadas
const btsMembers = [
    {
        name: "Jin",
        dischargeDateStr: "2024-06-12",
        imageUrl: "assets/jin.jpeg"
    },
    {
        name: "J-Hope",
        dischargeDateStr: "2024-10-17",
        imageUrl: "assets/jhope.jpg"
    },
    {
        name: "Suga",
        dischargeDateStr: "2025-06-21",
        imageUrl: "assets/suga.jpg"
    },
    {
        name: "RM",
        dischargeDateStr: "2025-06-10",
        imageUrl: "assets/rm.webp"
    },
    {
        name: "V",
        dischargeDateStr: "2025-06-10",
        imageUrl: "assets/v.jpg"
    },
    {
        name: "Jimin",
        dischargeDateStr: "2025-06-11",
        imageUrl: "assets/jimin.jpg"
    },
    {
        name: "Jungkook",
        dischargeDateStr: "2025-06-11",
        imageUrl: "assets/jungkook.jpg"
    }
];

// Função para formatar a data em português
function formatDatePtBR(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    
    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", 
        "Maio", "Junho", "Julho", "Agosto", 
        "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    
    return `${day} de ${months[month-1]} de ${year}`;
}

// ============ FUNÇÕES PARA LIDAR COM O HORÁRIO DA COREIA DO SUL ============

// Função para obter o horário atual na Coreia do Sul (KST)
function getCurrentKoreaTime() {
    // Criamos uma nova data para representar o momento atual
    const now = new Date();
    
    // Horário local em milissegundos desde a época (01/01/1970)
    const localTime = now.getTime();
    
    // Offset local em relação ao UTC em milissegundos
    const localOffset = now.getTimezoneOffset() * 60 * 1000;
    
    // Horário atual em UTC (em milissegundos)
    const utcTime = localTime + localOffset;
    
    // Offset da Coreia do Sul em relação ao UTC (KST = UTC+9)
    const koreaOffset = 9 * 60 * 60 * 1000;
    
    // Horário atual na Coreia do Sul
    const koreaTime = new Date(utcTime + koreaOffset);
    
    return koreaTime;
}

// Função para formatar o horário da Coreia em texto
function formatKoreaTime(koreaTime = getCurrentKoreaTime()) {
    const monthNames = [
        "janeiro", "fevereiro", "março", "abril",
        "maio", "junho", "julho", "agosto",
        "setembro", "outubro", "novembro", "dezembro"
    ];
    
    const day = koreaTime.getDate();
    const month = koreaTime.getMonth();
    const year = koreaTime.getFullYear();
    const hours = koreaTime.getHours();
    const minutes = koreaTime.getMinutes();
    const seconds = koreaTime.getSeconds();
    
    // Formatação com zeros à esquerda
    const formattedDay = String(day).padStart(2, '0');
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    
    return `${formattedDay} de ${monthNames[month]} de ${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// ============ FUNÇÕES PARA CALCULAR A CONTAGEM REGRESSIVA ============

// Função para criar a data de saída (meia-noite na Coreia do Sul)
function getDischargeDate(dateStr) {
    const [year, month, day] = dateStr.split('-').map(Number);
    
    // Criar um objeto de data para representar meia-noite do dia especificado na Coreia
    const koreaDate = new Date(year, month - 1, day);
    koreaDate.setHours(0, 0, 0, 0); // Definir para meia-noite
    
    return koreaDate;
}

// Função para calcular o tempo restante entre o horário atual na Coreia e a data alvo
function calculateTimeRemaining(targetDate) {
    // Obter o horário atual na Coreia
    const koreaTime = getCurrentKoreaTime();
    
    // Diferença em milissegundos
    const diffMs = targetDate - koreaTime;
    
    // Verificar se a data já passou
    if (diffMs <= 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            completed: true
        };
    }
    
    // Calcular dias, horas, minutos e segundos
    const days = Math.floor(diffMs / (24 * 60 * 60 * 1000));
    const remainingMs = diffMs % (24 * 60 * 60 * 1000);
    
    const hours = Math.floor(remainingMs / (60 * 60 * 1000));
    const remainingMinutesMs = remainingMs % (60 * 60 * 1000);
    
    const minutes = Math.floor(remainingMinutesMs / (60 * 1000));
    const seconds = Math.floor((remainingMinutesMs % (60 * 1000)) / 1000);
    
    return {
        days,
        hours,
        minutes,
        seconds,
        completed: false
    };
}

// Função principal para obter o tempo restante para uma data de saída
function getTimeRemaining(dischargeDateStr) {
    // Obter a data de saída (meia-noite KST do dia especificado)
    const dischargeDate = getDischargeDate(dischargeDateStr);
    
    // Calcular o tempo restante
    return calculateTimeRemaining(dischargeDate);
}

// Função para verificar se estamos calculando corretamente (teste com o exemplo da imagem)
function testTimeCalculation() {
    // Criar uma data fixa para simular 04/04/2025 10:10 na Coreia
    const testKoreaTime = new Date(2025, 3, 4, 10, 10, 0); // Mês em JS é 0-indexado
    
    // Criar a data alvo (00:00 do dia 21/06/2025 na Coreia)
    const targetDate = new Date(2025, 5, 21, 0, 0, 0);
    
    // Calcular a diferença como fazemos na função calculateTimeRemaining
    const diffMs = targetDate - testKoreaTime;
    
    const days = Math.floor(diffMs / (24 * 60 * 60 * 1000));
    const remainingMs = diffMs % (24 * 60 * 60 * 1000);
    
    const hours = Math.floor(remainingMs / (60 * 60 * 1000));
    const remainingMinutesMs = remainingMs % (60 * 60 * 1000);
    
    const minutes = Math.floor(remainingMinutesMs / (60 * 1000));
    
    console.log(`TESTE: De 04/04/2025 10:10 até 21/06/2025 00:00 na Coreia faltam:`);
    console.log(`${days} dias, ${hours} horas, ${minutes} minutos`);
    console.log(`Esperado: 77 dias, 13 horas, 50 minutos`);
}

// ============ FUNÇÕES DE INTERFACE DO USUÁRIO ============

// Criar os cartões dos membros do BTS
function createMemberCards() {
    const membersGrid = document.getElementById('members-grid');
    membersGrid.innerHTML = '';
    
    btsMembers.forEach(member => {
        const remaining = getTimeRemaining(member.dischargeDateStr);
        
        const memberCard = document.createElement('div');
        memberCard.className = 'member-card';
        
        // Verificar se o membro já completou o serviço
        const isCompleted = remaining.completed;
        
        memberCard.innerHTML = `
            <div class="member-image">
                <img src="${member.imageUrl}" alt="${member.name}">
            </div>
            <div class="member-info">
                <h3 class="member-name">${member.name}</h3>
                <p class="discharge-date">Data de saída: ${formatDatePtBR(member.dischargeDateStr)}</p>
                ${isCompleted ? 
                    `<p class="completed-note">Serviço militar concluído!</p>` : 
                    `<div class="countdown-box" id="countdown-${member.name.toLowerCase()}">
                        <div class="countdown-unit">
                            <div class="countdown-value" id="${member.name.toLowerCase()}-days">${remaining.days}</div>
                            <div class="countdown-label">Dias</div>
                        </div>
                        <div class="countdown-unit">
                            <div class="countdown-value" id="${member.name.toLowerCase()}-hours">${remaining.hours}</div>
                            <div class="countdown-label">Horas</div>
                        </div>
                        <div class="countdown-unit">
                            <div class="countdown-value" id="${member.name.toLowerCase()}-minutes">${remaining.minutes}</div>
                            <div class="countdown-label">Min</div>
                        </div>
                        <div class="countdown-unit">
                            <div class="countdown-value" id="${member.name.toLowerCase()}-seconds">${remaining.seconds}</div>
                            <div class="countdown-label">Seg</div>
                        </div>
                    </div>`
                }
            </div>
        `;
        
        membersGrid.appendChild(memberCard);
    });
}

// Criar a contagem regressiva final
function createFinalCountdown() {
    const finalCountdownBox = document.getElementById('final-countdown');
    const remaining = getTimeRemaining("2025-06-21"); // Data final - Suga
    
    finalCountdownBox.innerHTML = `
        <div class="final-countdown-unit">
            <div class="final-countdown-value" id="final-days">${remaining.days}</div>
            <div class="final-countdown-label">Dias</div>
        </div>
        <div class="final-countdown-unit">
            <div class="final-countdown-value" id="final-hours">${remaining.hours}</div>
            <div class="final-countdown-label">Horas</div>
        </div>
        <div class="final-countdown-unit">
            <div class="final-countdown-value" id="final-minutes">${remaining.minutes}</div>
            <div class="final-countdown-label">Minutos</div>
        </div>
        <div class="final-countdown-unit">
            <div class="final-countdown-value" id="final-seconds">${remaining.seconds}</div>
            <div class="final-countdown-label">Segundos</div>
        </div>
    `;
    
    // Adicionar informação sobre o horário atual na Coreia
    const koreaTimeDiv = document.createElement('div');
    koreaTimeDiv.id = 'korea-time-info';
    koreaTimeDiv.className = 'korea-time-info';
    koreaTimeDiv.style.fontSize = '14px';
    koreaTimeDiv.style.marginTop = '20px';
    koreaTimeDiv.style.color = 'rgba(255, 255, 255, 0.7)';
    koreaTimeDiv.textContent = `Horário atual na Coréia do Sul: ${formatKoreaTime()} (KST)`;
    
    finalCountdownBox.parentNode.appendChild(koreaTimeDiv);
}

// Verificar se a contagem final terminou e alterar o visual
function checkCountdownComplete() {
    const remaining = getTimeRemaining("2025-06-21");
    
    if (remaining.completed) {
        // Adicionar classe ao body para mudar o estilo
        document.body.classList.add('countdown-complete');
        
        // Alterar títulos
        document.getElementById('final-title').textContent = 'Eles estão de volta';
        document.getElementById('main-subtitle').textContent = 'Esse site foi feito para a ARMY mais linda do mundo. Eles voltaram, meu amor, e ver você feliz deixa o meu coração quentinho.';
        
        // Atualizar o elemento que mostra o horário coreano
        const koreaTimeInfo = document.getElementById('korea-time-info');
        if (koreaTimeInfo) {
            koreaTimeInfo.style.color = 'rgba(0, 0, 0, 0.7)';
        }
    } else {
        // Remover classe se por algum motivo a contagem voltar a funcionar
        document.body.classList.remove('countdown-complete');
    }
}

// Função para atualizar todas as contagens regressivas
function updateCountdowns() {
    // Verificar e atualizar status da contagem final
    checkCountdownComplete();
    
    // Atualizar contagem para cada membro
    btsMembers.forEach(member => {
        const remaining = getTimeRemaining(member.dischargeDateStr);
        
        if (!remaining.completed) {
            const daysElement = document.getElementById(`${member.name.toLowerCase()}-days`);
            const hoursElement = document.getElementById(`${member.name.toLowerCase()}-hours`);
            const minutesElement = document.getElementById(`${member.name.toLowerCase()}-minutes`);
            const secondsElement = document.getElementById(`${member.name.toLowerCase()}-seconds`);
            
            if (daysElement && hoursElement && minutesElement && secondsElement) {
                daysElement.textContent = remaining.days;
                hoursElement.textContent = remaining.hours;
                minutesElement.textContent = remaining.minutes;
                secondsElement.textContent = remaining.seconds;
            }
        }
    });
    
    // Atualizar contagem final
    const finalRemaining = getTimeRemaining("2025-06-21");
    const finalDaysElement = document.getElementById('final-days');
    const finalHoursElement = document.getElementById('final-hours');
    const finalMinutesElement = document.getElementById('final-minutes');
    const finalSecondsElement = document.getElementById('final-seconds');
    
    if (finalDaysElement && finalHoursElement && finalMinutesElement && finalSecondsElement) {
        finalDaysElement.textContent = finalRemaining.days;
        finalHoursElement.textContent = finalRemaining.hours;
        finalMinutesElement.textContent = finalRemaining.minutes;
        finalSecondsElement.textContent = finalRemaining.seconds;
    }
    
    // Atualizar o horário coreano exibido
    const koreaTimeInfo = document.getElementById('korea-time-info');
    if (koreaTimeInfo) {
        koreaTimeInfo.textContent = `Horário atual na Coréia do Sul: ${formatKoreaTime()} (KST)`;
    }
}

// ============ INICIALIZAÇÃO ============

document.addEventListener('DOMContentLoaded', function() {
    // Executar teste para verificar se a lógica está correta
    testTimeCalculation();
    
    // Exibir o horário atual na Coreia
    console.log("Horário atual na Coreia do Sul:", formatKoreaTime());
    
    // Criar os elementos da interface
    createMemberCards();
    createFinalCountdown();
    checkCountdownComplete();
    
    // Atualizar as contagens a cada segundo
    setInterval(updateCountdowns, 1000);
});
