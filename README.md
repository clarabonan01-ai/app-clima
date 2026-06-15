# Descubra o Clima

Uma aplicação web moderna, responsiva e elegante para consulta de previsão do tempo em tempo real, integrada com a API da OpenWeatherMap. O projeto conta com inteligência visual que adapta as cores da interface de acordo com a temperatura da cidade pesquisada.

---

## Funcionalidades

- **Busca em Tempo Real:** Consulta de dados meteorológicos de qualquer cidade do mundo através da API OpenWeatherMap.
- **Persistência de Dados:** Salva a última cidade pesquisada no `localStorage` do navegador para manter o estado ao recarregar.
- **Interface Glassmorphism:** Cards com efeito de vidro fosco (`backdrop-blur`) que aumentam a imersão visual.
- **Fundo Dinâmico em Degradê:** O gradiente de fundo se adapta inteligentemente a três faixas de temperatura:
  - **Frio (≤ 16°C):** Tons profundos e invernais.
  - **Ameno (17°C - 24°C):** Tons suaves de céu limpo e neblina.
  - **Calor (> 24°C):** Tons solares e vibrantes de entardecer.

---

## Tecnologias Utilizadas

- **React** (Biblioteca para construção da interface)
- **Vite** (Build tool rápida para o ambiente de desenvolvimento)
- **Tailwind CSS** (Framework utilitário para estilização e design responsivo)
- **OpenWeatherMap API** (Provedor de dados climáticos globais)
