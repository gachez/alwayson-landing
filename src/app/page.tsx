import { BentoCard } from '@/components/bento-card'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient } from '@/components/gradient'
import { LogoCloud } from '@/components/logo-cloud'
import { Navbar } from '@/components/navbar'
import { Screenshot } from '@/components/screenshot'
import { Heading } from '@/components/text'
import type { Metadata } from 'next'
import { NewsLetter } from '@/components/newsletter';

export const metadata: Metadata = {
  description:
    'AlwaysOn - Data-driven AI automation that boosts AOV, traffic, and conversions without you lifting a finger.',
}

function Hero() {
  return (
    <div className="relative">
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
      <Container className="relative">
        <Navbar
        />
        <div className="pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-48">
          <h1 className="font-display text-6xl/[0.9] font-medium tracking-tight text-balance text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            Your AI team that sells while you sleep.
          </h1>
          <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
            Data-driven AI automation that boosts AOV, traffic, and conversions without you lifting a finger.
          </p>
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            <Button href="#">Join waitlist</Button>
          </div>
        </div>
      </Container>
    </div>
  )
}




function FeatureSection() {
  return (
    <div className="overflow-hidden">
      <Container className="pb-24">
        <Heading as="h2" className="max-w-3xl">
          Each AI agent grows your store boosting AOV, traffic, and brand activity 24/7
        </Heading>
        <Screenshot
          width={1216}
          height={768}
          src="/screenshots/kanban.png"
          className="mt-16 h-144 sm:h-auto sm:w-304"
        />
      </Container>
    </div>
  )
}

function BentoSection() {
  return (
    <Container>
      <Heading as="h3" className="mt-2 max-w-3xl">
        Meet your AI team
      </Heading>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        <BentoCard
          eyebrow="Analysis"
          title="Business Agent"
          description="The intelligence hub that monitors your Shopify data and orchestrates every other agent.
          Tracks store performance in real time. Detects trends, anomalies, and growth opportunities automatically. 
          Coordinates the Sales, Marketing, and SEO Agents for unified growth actions"
          graphic={
            <div className="h-80 bg-[url(/screenshots/baa.png)] bg-cover bg-top" />
          }
          fade={['bottom']}
          className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
        />
        <BentoCard
          eyebrow="Merchandising"
          title="Sales Agent"
          description="Increases AOV and conversions through intelligent merchandising and pricing. 
          Creates personalized product recommendations using visitor data. 
          Builds dynamic product bundles based on shopping patterns and seasonality."
          graphic={
            <div className="h-80 bg-[url(/screenshots/sales.png)] bg-cover bg-top" />
          }
          fade={['bottom']}
          className="lg:col-span-3 lg:rounded-tr-4xl"
        />
        <BentoCard
          eyebrow="Marketing"
          title="Marketing Agent"
          description="Generates social media posts around trending or high-converting products. 
          Plans posting schedules and adapts content for each platform. 
          Writes SEO-rich blog posts based on trending keywords, best sellers, or new arrivals. 
          Suggests campaign ideas for sales, product launches, or holidays."
          graphic={
            <div className="h-80 bg-[url(/screenshots/marketing.png)] bg-cover bg-top" />
          }
          fade={['bottom']}
          className="lg:col-span-3 lg:rounded-tr-4xl"
        />
        <BentoCard
          eyebrow="SEO"
          title="SEO Agent"
          description="Improves your organic visibility, search rankings, and on-site content automatically. 
          Creates optimized collection pages using keyword and sales trend data"
          graphic={
            <div className="h-80 bg-[url(/screenshots/seo.png)] bg-cover bg-top" />
          }
          fade={['bottom']}
          className="lg:col-span-3 lg:rounded-tr-4xl"
        />
      </div>
    </Container>
  )
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <main>
        <Container className="mt-10">
          <LogoCloud />
        </Container>
        <div className="bg-linear-to-b from-white from-50% to-gray-100 py-32">
          <FeatureSection />
          <BentoSection />
          <NewsLetter />
        </div>
      </main>
      <Footer />
    </div>
  )
}
