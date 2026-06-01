import type { Metadata } from 'next'
import { GovernanceSection } from '~/components/sections/governance'
import { JsonLd } from '~/components/shared/json-ld'
import { getBreadcrumbSchema } from '~/lib/seo/structured-data'

export const metadata: Metadata = {
	title: 'Community Governance | WardFund',
	description:
		'Participate in WardFund community governance. Vote on how the community fund is redistributed to high-impact campaigns and help shape the future of decentralized social impact funding.',
	openGraph: {
		title: 'Community Governance | WardFund',
		description:
			'Vote on how the WardFund community fund is redistributed to impactful campaigns. Decentralized governance powered by the Stellar blockchain.',
		type: 'website',
		url: '/governance',
	},
	twitter: {
		card: 'summary',
		title: 'Community Governance | WardFund',
		description:
			'Vote on fund redistribution to impactful campaigns. Decentralized community governance on WardFund.',
	},
	alternates: {
		canonical: '/governance',
	},
}

export default function GovernancePage() {
	return (
		<>
			<JsonLd
				data={getBreadcrumbSchema([
					{ name: 'Home', url: '/' },
					{ name: 'Governance', url: '/governance' },
				])}
			/>
			<GovernanceSection />
		</>
	)
}
