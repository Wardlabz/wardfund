import type { Metadata } from 'next'
import { CallToAction } from '~/components/sections/about-us/call-to-action'
import { Hero } from '~/components/sections/about-us/hero'
import { HowItWorks } from '~/components/sections/about-us/how-it-works'
import { WardFundStellar } from '~/components/sections/about-us/wardfund-stellar'
import { MissionVision } from '~/components/sections/about-us/mission-vision'
import { Problems } from '~/components/sections/about-us/problems'
import { Roadmap } from '~/components/sections/about-us/roadmap'
import { WhyWardFundIsDifferent } from '~/components/sections/about-us/why-is-different'

export const metadata: Metadata = {
	title: 'About Us | WardFund',
	description:
		'Mission, how WardFund works, and why milestone-based funding on Stellar is built for transparent social impact.',
	openGraph: {
		title: 'About Us | WardFund',
		description:
			'Milestone-based crowdfunding on Stellar: mission, product story, and roadmap.',
	},
}

export default function AboutPage() {
	return (
		<main className="w-full flex flex-col" aria-label="About WardFund">
			<Hero />
			<MissionVision />
			<Problems />
			<WardFundStellar />
			<HowItWorks />
			<WhyWardFundIsDifferent />
			<Roadmap />
			<CallToAction />
		</main>
	)
}
