import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Steps } from '@/components/steps'
import { WhyItMatters } from '@/components/why-it-matters'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Steps />
        <WhyItMatters />
      </main>
      <SiteFooter />
    </>
  )
}
