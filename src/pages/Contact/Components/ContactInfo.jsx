import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactInfo() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Fale <span className="text-sky-500">Conosco!</span>
      </h2>
      <p className="text-gray-600 mb-8">
        Levar alegria e esperança é a nossa missão. Se você tem dúvidas ou sugestões,
        entre em contato! Juntos, transformaremos realidades.
      </p>

      <div className="flex flex-col gap-3 mb-8">
        <div className="flex items-center gap-3">
          <Phone className="text-sky-500" />
          <span>(11) 99999-9999</span>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="text-sky-500" />
          <span>contato@versonhos.com</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="text-sky-500" />
          <span>São Paulo, SP</span>
        </div>
      </div>
    </div>
  );
}
