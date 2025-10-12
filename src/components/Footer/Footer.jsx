import { Link } from 'react-router-dom'
import styles from './styles.module.css'

export default function Footer() {
    return (
        <>
            <footer>
                <section>
                    <img src="" alt="" />
                </section>
                
                <section>
                    <section>
                        <h2>Quem somos?</h2>
                        
                        <p></p>
                    </section>

                    <section>
                        <h2>Institucional</h2>

                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/sobre">Sobre nós</Link></li>
                            <li><Link to="/visita">Visita</Link></li>
                        </ul>
                    </section>

                    <section>
                        <h2>Suporte</h2>

                        <ul>
                            <li><Link to="/contato">Fale conosco</Link></li>
                            <li><Link to="/contato">Dúvidas Frequentes(FAQ)</Link></li>
                        </ul>
                    </section>

                    <section>
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </section>
                </section>

                <section>
                    <p>&#169 2025 VerSonhos - Todos os direitos reservados.</p>
                </section>
            </footer>
        </>
    )
}