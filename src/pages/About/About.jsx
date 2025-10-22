import MainLayout from '../../layouts/MainLayout'
import HeroSection from './Components/HeroSection'
import MissionSection from './Components/MissionSection'
import OdsSection from './Components/OdsSection'
import TeamSection from './Components/TeamSection'
import styles from './styles.module.css'

export default function About() {
    return (
        <>
            <MainLayout>
                <HeroSection/>
                <MissionSection/>
                <OdsSection/>
                <TeamSection/>
            </MainLayout>
        </>
    )
}