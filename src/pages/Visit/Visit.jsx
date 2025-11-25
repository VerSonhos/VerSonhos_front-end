import MainLayout from "../../layouts/MainLayout"
import AboutVisit from "./Components/AboutVisit"
import CardsVisit from "./Components/CardsVisit"
import FeedbackVisit from "./Components/FeedbackVisit"
import HeroSectionVisit from "./Components/HeroSectionVisit"
import { Timeline } from "./Components/Timeline"
import { TimelineData } from "./Components/TimelineData"
import styles from './styles.module.css'

export default function Visit() {
    return (
        <>
            <MainLayout>
                <HeroSectionVisit/>
                <Timeline data={TimelineData}/>
                <CardsVisit/>
                <FeedbackVisit/>
            </MainLayout>
        </>
    )
}