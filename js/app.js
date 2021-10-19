(function() {
    const setaAcima = document.querySelectorAll(".setaAcima");
    const setaAbaixo = document.querySelectorAll(".setaBaixo");
    const btn = document.querySelector(".btn");
    const trabalho = document.querySelector('.Trabalho')
    const pausa = document.querySelector('.Pausa')
    const sessoes = document.querySelector('.sessoes')



    let setasAcima = [...setaAcima].map(seta => {
        seta.addEventListener('click', aumentarValores);
    });

    let setasAbaixo = [...setaAbaixo].map(seta => {
        seta.addEventListener('click', abaixarValores);
    })

    function aumentarValores(e) {
        let valor = e.target.parentElement.nextElementSibling.children

        let somando = parseInt(valor[0].textContent);

        valor[0].textContent = ++somando;
    }

    function abaixarValores(e) {
        let valor = e.target.parentElement.nextElementSibling.children

        let dimunindo = parseInt(valor[0].textContent);
        dimunindo > 0 ? valor[0].textContent = --dimunindo : valor[0].textContent = dimunindo;

    }

    btn.addEventListener('click', () => {
        let pomodoro = { "tempo": trabalho.textContent, "pausa": pausa.textContent, "sessoes": sessoes.textContent }
        localStorage.setItem('pomodoro', JSON.stringify(pomodoro));
        location.href = "pomodoro.html"

    })

})()