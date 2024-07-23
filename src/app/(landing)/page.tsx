import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import { Action } from './components/action'
import { Feedback } from './components/feedback'
import { Footer } from './components/footer'
import { Hero } from './components/hero'
import { Reason } from './components/reason'
import { Recommendation } from './components/recommendation'
import { ScrollUpButton } from './components/scroll-up-button'
import { Steps } from './components/steps'

gsap.registerPlugin(ScrollTrigger)
const Page = () => {
  return (
    <main>
      <Hero />
      <Recommendation />
      <Steps />
      <Reason />
      <Action />
      <Feedback />
      <Footer />
      <ScrollUpButton className="fixed bottom-[60px] right-20" />
    </main>
  )
}

export default Page
