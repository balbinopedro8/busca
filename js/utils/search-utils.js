// search-utils.js - Contém funções auxiliares para construção de URLs

// Constrói a URL de busca com base nos parâmetros fornecidos
function buildSearchUrl(query, type, fileType, priceRange, dateRange) {
    let baseUrl = 'https://www.google.com/search?q=' + encodeURIComponent(query);
    baseUrl += type ? `&tbm=${type}` : '';
    baseUrl += fileType ? `&filetype=${fileType}` : '';
    baseUrl += priceRange ? `&price=${priceRange}` : '';
    baseUrl += dateRange ? `&tbs=qdr:${dateRange}` : '';
    return baseUrl;
  }
  