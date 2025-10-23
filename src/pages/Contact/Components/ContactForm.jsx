export default function ContactForm() {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-6 text-center">Envie uma mensagem:</h3>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nome"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-sky-500"
        />
        <input
          type="tel"
          placeholder="Telefone"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-sky-500"
        />
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-sky-500"
        />
        <textarea
          placeholder="Escreva aqui"
          rows="4"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-sky-500"
        ></textarea>
        <button
          type="submit"
          className="bg-sky-500 text-white font-medium py-2 rounded-lg hover:bg-sky-600 transition"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
