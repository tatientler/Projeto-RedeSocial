const registrarBotao = document.getElementById('registrar');
const entrarBotao = document.getElementById('entrar');
const container = document.getElementById('container');

registrarBotao.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

entrarBotao.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});