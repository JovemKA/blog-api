// Função para obter parâmetros da URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Função para formatar data
// function formatDate(dateString) {
//     const data = new Date(dateString).toLocaleDateString();
//     const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
//     const dataFormatada = data.split('/');

//     return `${dataFormatada[0]} de ${meses[dataFormatada[1] - 1]} de ${dataFormatada[2]}`;
// }