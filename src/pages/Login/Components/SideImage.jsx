import styles from '../styles.module.css'
import ImageBg from '../../../assets/images/ImagemLogin.png'

export default function SideImage() {
    return (
        <>
            <section 
                className="w-[50%] hidden lg:flex justify-center items-end bg-cover bg-no-repeat bg-center h-[100vh] shadow-inner-contrast" 
                style={{ backgroundImage: `url(${ImageBg})` }}
            >
                <div className='w-full text-white-custom mb-20 text-shadow-lg'>
                    <h2 className='font-fredoka text-3xl font-semibold text-center w-[50%] mx-auto mb-4'>Onde a imaginação encontra a tecnologia.</h2>
                    <p className='font-inter text-2xl text-center'>Aprendizado imersivo com tecnologia</p>
                </div>
            </section>
        </>
    )
}