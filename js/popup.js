// popup.js - Gerencia a lógica da interface principal da extensão

// Adiciona evento ao botão de busca
document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    const type = document.getElementById('search-type').value;
    const fileType = document.getElementById('file-type').value;
    const minPrice = document.getElementById('min-price').value;
    const maxPrice = document.getElementById('max-price').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
  
    // Constrói a URL de busca
    const url = buildSearchUrl(query, type, fileType, minPrice, maxPrice, startDate, endDate);
    chrome.tabs.create({ url: url });
  
    // Salva a busca no histórico
    chrome.runtime.sendMessage({
      action: 'saveSearch',
      data: {
        query: query,
        type: type,
        fileType: fileType,
        minPrice: minPrice,
        maxPrice: maxPrice,
        startDate: startDate,
        endDate: endDate,
        timestamp: new Date().toISOString()
      }
    });
  });
  
  // Adiciona evento ao botão de histórico
  document.getElementById('history-button').addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('history.html') });
  });
  
  // Adiciona evento para limpar campos de preço
  document.getElementById('clear-min-price').addEventListener('click', () => {
    document.getElementById('min-price').value = '';
  });
  
  document.getElementById('clear-max-price').addEventListener('click', () => {
    document.getElementById('max-price').value = '';
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
  