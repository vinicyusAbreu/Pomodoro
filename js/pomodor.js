(function() {
    let tempo = document.querySelector('.time');
    let clockPonto = document.querySelectorAll('.clock-Ponto')
    let textoTime = document.querySelector('.textoTime');
    const btnPP = document.querySelector('.btnPP');
    let interval;
    let pausa = false;
    const pomodoro = JSON.parse(localStorage.getItem('pomodoro'));
    const btn = document.querySelector('.btn');

    const click = new Audio('./music/switch.mp3');
    const trabalho = new Audio('./music/ragnarok.mp3');
    const pause = new Audio('./music/sonic.mp3')


    let valor = parseInt(pomodoro.sessoes);


    btn.addEventListener('click', function() {
        location.href = "index.html"
    })

    btnPP.addEventListener('click', function() {
        if (pausa === false) {
            click.play();
            start();

        } else {
            click.play();
            stop();
        }
    })


    function start() {
        let { total } = pomodoro.tempoRestante;
        const fimTempo = Date.parse(new Date()) + total * 1000;
        btnPP.children[0].classList.remove('fa-play');
        btnPP.children[0].classList.add('fa-pause')

        if (pomodoro.modo === "tempo") {

            pomodoro.sessoes = valor--;

        }
        pausa = true;
        if (pomodoro.sessoes > 0) {

            interval = setInterval(function() {
                pomodoro.tempoRestante = obterOTempoRestante(fimTempo);
                updateCronometro();

                total = pomodoro.tempoRestante.total;
                if (total <= 0) {
                    clearInterval(interval);
                    switch (pomodoro.modo) {
                        case 'tempo':
                            if (pomodoro.sessoes > 0) {
                                mudarModo('pausa')
                                colorAmarelo();
                                pause.play();
                            }
                            break;
                        default:
                            mudarModo('tempo');
                            colorVerde();
                            trabalho.play();
                    }

                    start();
                }
            }, 1000);
        } else {

            document.location.reload(true);
        }

    }

    function stop() {
        pausa = false;
        if (pomodoro.modo === "tempo") {

            pomodoro.sessoes = valor++;

        }
        btnPP.children[0].classList.remove('fa-pause');
        btnPP.children[0].classList.add('fa-play')

        clearInterval(interval);


    }

    function updateCronometro() {
        const { tempoRestante } = pomodoro;
        const minutos = `${tempoRestante.minutos}`.padStart(2, '0');
        const segundos = `${tempoRestante.segundos}`.padStart(2, '0');

        const min = document.getElementById('minutos');
        const sec = document.getElementById('segundos');
        min.textContent = minutos;
        sec.textContent = segundos;
    }

    function mudarModo(modo) {
        pomodoro.modo = modo;
        pomodoro.tempoRestante = {
            total: pomodoro[modo] * 60,
            minutos: pomodoro[modo],
            segundos: 0,
        };
        updateCronometro();
    }


    function obterOTempoRestante(fimTempo) {
        const TempoCorrido = Date.parse(new Date());
        const diferenca = fimTempo - TempoCorrido;

        const total = Number.parseInt(diferenca / 1000, 10);
        const minutos = Number.parseInt((total / 60) % 60, 10);
        const segundos = Number.parseInt(total % 60, 10);

        return {
            total,
            minutos,
            segundos,
        };
    }

    function colorVerde() {
        clockPonto[0].classList.add('verdeBG');
        clockPonto[1].classList.add('verdeBG');
        clockPonto[0].classList.remove('amareloBG');
        tempo.classList.remove('timeBG')
        textoTime.classList.remove('amarelo');
        textoTime.textContent = "Trabalho";
    }

    function colorAmarelo() {
        clockPonto[0].classList.remove('verdeBG');
        clockPonto[1].classList.remove('verdeBG');
        clockPonto[0].classList.add('amareloBG');
        tempo.classList.add('timeBG')
        textoTime.classList.add('amarelo');
        pausa = false;
        textoTime.textContent = "Pausa";
    }


    mudarModo('tempo')


})()