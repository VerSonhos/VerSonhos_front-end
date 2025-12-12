export default function CardInformations({ number, text, color }) {
  return (
    <article
      className={`
        w-[90%] sm:w-[80%] lg:w-[24%]
        h-[200px]
        font-fredoka transition hover:scale-102
        cursor-default text-white font-semibold
        flex flex-col justify-center items-center
        gap-4 shadow-custom-sm py-6 sm:py-8
        rounded-xl border-2 border-quintenary
        ${color}
      `}
    >
      <div className="text-2xl sm:text-3xl">
        {number}
      </div>

      <p
        className="
          text-base xs:text-lg sm:text-xl md:text-2xl
          text-center px-2 sm:px-4
          leading-snug break-words
        "
      >
        {text}
      </p>
    </article>
  );
}