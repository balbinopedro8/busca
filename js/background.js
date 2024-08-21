// background.js - Gerencia serviços em segundo plano e histórico de buscas
chrome.runtime.onInstalled.addListener(() => {
    console.log('Busca Fácil instalada.');
  });
  
  // Ouvinte de mensagens para salvar buscas no histórico
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'saveSearch') {
      let searches = JSON.parse(localStorage.getItem('searchHistory')) || [];
      searches.push(request.data);
      localStorage.setItem('searchHistory', JSON.stringify(searches));
    }
  });
  