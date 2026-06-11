import { useState } from "react";

function App() {
  const [cidade, setCidade] = useState("");
  const [clima, setClima] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const lidarComBusca = async (e) => {
    e.preventDefault();
    if (cidade.trim() === "") return;

    setCarregando(true);
    setErro("");
    setClima(null);

    const apiKey = "66f123515e2cb4ac359ce3ba0cb53cc0";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
      const resposta = await fetch(url);
      const dados = await resposta.json();

      if (resposta.ok) {
        setClima(dados);
      } else if (resposta.status === 404) {
        setErro("Cidade não encontrada. Verifique a ortografia!");
      } else {
        setErro("Ops! Ocorreu um erro ao buscar os dados.");
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
      setErro("Não foi possível conectar ao serviço de clima.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6 font-sans">
      <h1 className="text-4xl font-extrabold text-slate-800 mb-6 tracking-tight">
        Descubra o Clima
      </h1>

      <form
        onSubmit={lidarComBusca}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md flex gap-3 mb-6"
      >
        <input
          type="text"
          placeholder="Digite o nome da cidade..."
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          className="flex-1 px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-base text-slate-800"
        />
        <button
          type="submit"
          disabled={carregando}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-xl transition-colors shadow-sm disabled:bg-blue-400 cursor-pointer disabled:cursor-not-allowed"
        >
          {carregando ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {carregando && (
        <div className="text-slate-600 font-medium text-lg animate-pulse">
          Buscando informações do clima...
        </div>
      )}

      {erro && (
        <div className="w-full max-w-md bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-center font-medium shadow-sm animate-bounce">
          {erro}
        </div>
      )}

      {clima && (
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-slate-800">
            {clima.name}, {clima.sys?.country}
          </h2>
          <p className="text-5xl font-black text-blue-600 my-4">
            {Math.round(clima.main?.temp)}°C
          </p>
          <p className="text-slate-600 capitalize font-medium">
            {clima.weather?.[0]?.description}
          </p>
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
