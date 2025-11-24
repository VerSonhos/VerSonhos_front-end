import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function CardLinks({ image, imageTitle, title, desc, link, btnText  }) {
    return (
        <article className={`${styles.card} bg-white shadow rounded-lg border-2 hover:shadow-md transition`} >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-left p-5 h-auto sm:h-40">
                <div className="flex-shrink-0">
                    <img
                        src={image}
                        alt={imageTitle}
                        className="w-12 h-12 sm:w-16 sm:h-16"
                    />
                </div>

                <div className="flex flex-col justify-between text-center sm:text-left w-full">
                    <div>
                        <h3 className="font-semibold text-quintenary text-lg mb-1">
                            {title}
                        </h3>

                        <p className="text-gray-600 text-sm">{desc}</p>
                    </div>

                    <Link
                        to={link}
                        className="bg-quintenary text-white px-4 py-2 rounded-md transition w-full sm:w-fit mt-3 hover:scale-105 cursor-pointer text-center"
                    >
                        {btnText}
                    </Link>
                </div>
            </div>
        </article>
    )
}