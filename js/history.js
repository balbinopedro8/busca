// history.js - Gerencia a lógica da página de histórico

document.addEventListener('DOMContentLoaded', () => {
    const historyList = document.getElementById('history-list');
    const clearHistoryButton = document.getElementById('clear-history');
  
    // Carrega o histórico de buscas e adiciona à lista
    const searches = JSON.parse(localStorage.getItem('searchHistory')) || [];
    searches.forEach(search => {
      const li = document.createElement('li');
      li.textContent = `${search.query} - ${search.timestamp}`;
      const redoButton = document.createElement('button');
      redoButton.textContent = 'Refazer';
      redoButton.addEventListener('click', () => {
        const url = buildSearchUrl(search.query, search.type, search.fileType, search.minPrice, search.maxPrice, search.startDate, search.endDate);
        chrome.tabs.create({ url: url });
      });
      li.appendChild(redoButton);
      historyList.appendChild(li);
    });
  
    // Adiciona evento ao botão de limpar histórico
    clearHistoryButton.addEventListener('click', () => {
      localStorage.removeItem('searchHistory');
      historyList.innerHTML = '';
    });
  });
  
  // Constrói a URL de busca com base nos parâmetros fornecidos
  function buildSearchUrl(query, type, fileType, minPrice, maxPrice, startDate, endDate) {
    let baseUrl = 'https://www.google.com/search?q=' + encodeURIComponent(query);
    baseUrl += type ? `&tbm=${type}` : '';
    baseUrl += fileType ? `&filetype=${fileType}` : '';
    baseUrl += minPrice ? `&tbs=p_ord:pd` : ''; // Substitua por parâmetros de faixa de preço se disponíveis
    baseUrl += maxPrice ? `&tbs=p_ord:pd` : ''; // Substitua por parâmetros de faixa de preço se disponíveis
    baseUrl += startDate ? `&tbs=qdr:d` : ''; // Substitua por parâmetros de intervalo de data se disponíveis
    baseUrl += endDate ? `&tbs=qdr:d` : ''; // Substitua por parâmetros de intervalo de data se disponíveis
    return baseUrl;
  }
  