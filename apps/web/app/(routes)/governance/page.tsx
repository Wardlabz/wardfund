import type { Metadata } from 'next'
import { GovernanceSection } from '~/components/sections/governance'

export const metadata: Metadata = {
	title: 'Community Governance | WardFund',
	description:
		'Vote on how the WardFund community fund is redistributed to impactful campaigns.',
}

export default function GovernancePage() {
	return <GovernanceSection />
}
