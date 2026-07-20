import type { Metadata } from 'next'
import { TutorialsContainer } from '~/components/sections/tutorials/tutorials-container'
import { JsonLd } from '~/components/shared/json-ld'
import { getBreadcrumbSchema } from '~/lib/seo/structured-data'

export const metadata: Metadata = {
	title: 'Tutorials | WardFund',
	description:
		'Step-by-step guides for WardFund — learn how to register, create campaigns, submit milestones, donate, and understand the full milestone-based funding lifecycle.',
	openGraph: {
		title: 'Tutorials & Guides | WardFund',
		description:
			'Practical, concise guides for every WardFund workflow: account setup, campaign creation, milestone submission, donation flow, and more.',
		type: 'website',
		url: '/tutorials',
	},
	twitter: {
		card: 'summary',
		title: 'Tutorials | WardFund',
		description:
			'Step-by-step guides for registering, creating campaigns, submitting milestones, and understanding donations on WardFund.',
	},
	alternates: {
		canonical: '/tutorials',
	},
}

export default function TutorialsPage() {
	return (
		<>
			<JsonLd
				data={getBreadcrumbSchema([
					{ name: 'Home', url: '/' },
					{ name: 'Tutorials', url: '/tutorials' },
				])}
			/>
			<main className="flex w-full flex-col bg-white" aria-label="WardFund Tutorials">
				<TutorialsContainer />
			</main>
		</>
	)
}
