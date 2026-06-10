import { useState } from "react";

function App() {
  // guarda o nome digitado
  const [cidade, setCidade] = useState("");
  const [clima, setClima] = useState(null);

  const lidarComBusca = async (e) => {
    e.preventDefault();
    if (cidade.trim() === "") return;

    const apiKey = "66f123515e2cb4ac359ce3ba0cb53cc0";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
      const resposta = await fetch(url);

      const dados = await resposta.json();

      console.log("Dados recebidos da API:", dados);

      if (resposta.ok) {
        setClima(dados);
      } else {
        setClima(null);
      }
    } catch (erro) {
      console.error("Erro na requisição:", erro);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6 font-sans">
      <h1 className="text-4xl font-extrabold text-slate-800 mb-6 tracking-tight">
        Descubra o Clima
      </h1>
      <form
        onSubmit={lidarComBusca}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md flex gap-3"
      >
        <input
          type="text"
          placeholder="Digite o nome da cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          className="flex-1 px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-base text-slate-800"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-xl transition-colors shadow-sm"
        >
          Buscar
        </button>
      </form>

      {clima && (
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md text-center m-8">
          <h2 className="text-2xl font-bold text-slate-800">
            {clima.name}, {clima.sys?.country}
          </h2>

          <p className="text-5xl font-black text-blue-600 my-4">
            {Math.round(clima.main?.temp)}°C
          </p>

          {/* Descrição do tempo (ex: céu limpo) */}
          <p className="text-slate-600 capitalize font-medium">
            {clima.weather?.[0]?.description}
          </p>

          {/* Informações extras: Umidade e Vento */}
          <div className="flex justify-around mt-6 pt-4 border-t border-slate-100 text-sm text-slate-500">
            <div>
              <p className="font-semibold text-slate-700">
                {clima.main?.humidity}%
              </p>
              <p>Umidade</p>
            </div>
            <div>
              <p className="font-semibold text-slate-700">
                {clima.wind?.speed} km/h
              </p>
              <p>Vento</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
