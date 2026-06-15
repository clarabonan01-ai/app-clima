import { useState, useEffect } from "react";

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
        localStorage.setItem("ultimaCidade", dados.name);
      } else if (resposta.status === 404) {
        setErro("Cidade não encontrada. Verifique a ortografia!");
      } else {
        setErro("Ops! Ocorreu um erro ao buscar os dados.");
      }
    } catch (erro) {
      console.error("Erro na requisição:", erro);
      setErro("Não foi possível conectar ao serviço de clima.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    const cidadeSalva = localStorage.getItem("ultimaCidade");

    if (cidadeSalva) {
      const buscarCidadeAutomatica = async () => {
        setCarregando(true);
        const apiKey = "66f123515e2cb4ac359ce3ba0cb53cc0";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidadeSalva}&appid=${apiKey}&units=metric&lang=pt_br`;

        try {
          const resposta = await fetch(url);
          const dados = await resposta.json();
          if (resposta.ok) {
            setClima(dados);
            setCidade(cidadeSalva);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setCarregando(false);
        }
      };

      buscarCidadeAutomatica();
    }
  }, []);

  let fundoDinamico = "bg-gradient-to-b from-slate-200 to-blue-100";
  let corDoTitulo = "text-slate-800";

  if (clima) {
    const temp = clima.main?.temp;

    if (temp <= 16) {
      fundoDinamico =
        "bg-gradient-to-b from-slate-800 via-indigo-950 to-slate-900";
      corDoTitulo = "text-white";
    } else if (temp > 16 && temp <= 24) {
      fundoDinamico = "bg-gradient-to-b from-sky-200 via-slate-100 to-blue-200";
      corDoTitulo = "text-slate-800";
    } else {
      fundoDinamico =
        "bg-gradient-to-b from-orange-200 via-amber-100 to-yellow-100";
      corDoTitulo = "text-slate-800";
    }
  }

  return (
    <div
      className={`min-h-screen ${fundoDinamico} flex flex-col items-center justify-center p-6 font-sans transition-all duration-500`}
    >
      <h1
        className={`text-4xl font-extrabold ${corDoTitulo} mb-6 tracking-tight transition-colors duration-500`}
      >
        Descubra o Clima
      </h1>

      <form
        onSubmit={lidarComBusca}
        className="w-full max-w-md bg-white/40 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg flex gap-3 mb-6"
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
        <div className="w-full max-w-md bg-white/30 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-xl text-center transition-all">
          <h2 className="text-2xl font-bold text-slate-800">
            {clima.name}, {clima.sys?.country}
          </h2>

          {clima.weather?.[0]?.icon && (
            <img
              src={`https://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`}
              alt={clima.weather[0].description}
              className="mx-auto w-24 h-24 drop-shadow-md" // drop-shadow dá relevo ao ícone
            />
          )}

          <p className="text-5xl font-black text-blue-600 my-4 dropdown-shadow-sm">
            {Math.round(clima.main?.temp)}°C
          </p>
          <p className="text-slate-700 capitalize font-semibold mb-2">
            {clima.weather?.[0]?.description}
          </p>

          {/* Mudamos a borda divisória para combinar com o vidro */}
          <div className="flex justify-around mt-6 pt-4 border-t border-white/30 text-sm text-slate-600">
            <div>
              <p className="font-bold text-slate-800">
                {clima.main?.humidity}%
              </p>
              <p className="font-medium">Umidade</p>
            </div>
            <div>
              <p className="font-bold text-slate-700">
                {clima.wind?.speed} km/h
              </p>
              <p className="font-medium">Vento</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
