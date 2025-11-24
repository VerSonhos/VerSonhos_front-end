export default function CardInformations({number, text, color}) {
    return (
        <article className={`w-[80%] lg:w-[24%] font-fredoka transition hover:scale-102 cursor-default text-white font-semibold flex flex-col justify-center items-center gap-4 shadow-custom-sm py-8 rounded-xl border-2 border-quintenary ${color}`}>
            <div className="text-3xl">
                {number}
            </div>

            <p className="text-2xl text-center px-4">
                {text}
            </p>
        </article>
    )
}