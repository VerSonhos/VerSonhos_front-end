import styles from '../styles.module.css'
import ImageBg from '../../../assets/images/ImagemLoginAdmin.png'

export default function SideImage() {
    return (
        <>
            <section 
                className="w-[50%] hidden lg:flex justify-center items-end bg-cover bg-no-repeat bg-center min-h-screen shadow-inner-contrast" 
                style={{ backgroundImage: `url(${ImageBg})` }}
            >
                <div className='w-full text-white-custom mb-20 text-shadow-lg'>
                    <h2 className='font-fredoka text-3xl font-semibold text-center w-[70%] mx-auto mb-4'>Uma nova forma de aprender, sonhar e crescer.</h2>
                    <p className='font-inter text-2xl text-center'>Ver além do possível, viver novas experiências.</p>
                </div>
            </section>
        </>
    )
}