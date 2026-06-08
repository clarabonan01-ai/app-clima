import { useState } from "react";

function App() {
  // guarda o nome digitado
  const [cidade, setCidade] = useState("");
  const lidarComBusca = (e) => {
    e.preventDefault();
    if (cidade.trim() === "") {
      alert("Por favor, digite o nome de uma cidade.");
    } else {
      alert(`Você buscou por: ${cidade}`);
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
    </div>
  );
}

export default App;
