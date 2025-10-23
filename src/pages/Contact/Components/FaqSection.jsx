import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  { q: "Quem pode participar?", a: "O projeto é voltado para crianças em tratamento hospitalar." },
  { q: "Como funciona a experiência de realidade virtual?", a: "Levamos os óculos até os hospitais e realizamos visitas virtuais guiadas." },
  { q: "Como os hospitais podem participar?", a: "Hospitais podem se inscrever através do nosso formulário de parceria." },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="w-full max-w-7xl px-6 py-12">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">FAQ</h3>
      <div className="flex flex-col gap-3">
        {faqs.map((item, index) => (
          <div key={index} className="border-b border-gray-200 pb-2">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex justify-between items-center w-full text-left font-medium text-gray-700"
            >
              {item.q}
              {openIndex === index ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-600 text-sm">{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
