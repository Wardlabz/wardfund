import { appEnvConfig } from '@packages/lib/config'
import type { AppEnvInterface } from '@packages/lib/types'
import { getServerSession } from 'next-auth'
import { LayoutContainer } from '~/components/layout-container'
import { GoogleAnalytics } from '~/components/shared/google-analytics'
import { JsonLd } from '~/components/shared/json-ld'
import { nextAuthOption } from '~/lib/auth/auth-options'
import { getOrganizationSchema, getWebSiteSchema, SITE_URL } from '~/lib/seo/structured-data'

const appConfig: AppEnvInterface = appEnvConfig('web')

export const metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: 'WardFund — Web3 Crowdfunding for Social Impact',
		template: '%s | WardFund',
	},
	description:
		'WardFund is the first Web3 crowdfunding platform connecting supporters to impactful social and environmental causes. Milestone-based funding on Stellar ensures transparency, accountability, and real-world impact.',
	keywords: [
		'blockchain crowdfunding',
		'social impact',
		'Web3 donations',
		'Stellar blockchain',
		'crypto philanthropy',
		'NGO funding',
		'decentralized fundraising',
	],
	authors: [{ name: 'WardFund', url: SITE_URL }],
	creator: 'WardFund',
	publisher: 'WardFund',
	openGraph: {
		siteName: 'WardFund',
		type: 'website',
		locale: 'en_US',
		url: SITE_URL,
	},
	twitter: {
		card: 'summary_large_image',
		site: '@wardfund_org',
		creator: '@wardfund_org',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large' as const,
			'max-snippet': -1,
		},
	},
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(nextAuthOption)
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<JsonLd data={[getOrganizationSchema(), getWebSiteSchema()]} />
			</head>
			<body suppressHydrationWarning>
				<LayoutContainer session={session}>{children}</LayoutContainer>
				<GoogleAnalytics GA_MEASUREMENT_ID={appConfig.analytics.gaId} />
			</body>
		</html>
	)
}
