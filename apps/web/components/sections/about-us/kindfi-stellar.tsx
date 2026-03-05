'use client'

import { motion } from 'framer-motion'
import { FloatingFeature } from '~/components/shared/floating-feature'
import { SectionContainer } from '~/components/shared/section-container'
import { useTranslation } from '~/hooks/use-translation'
import { mockAboutUs } from '~/lib/mock-data/mock-about-us'

const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
}

const WardFundStellar = () => {
	const { t } = useTranslation()
	return (
		<section
			className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-white"
			aria-labelledby="about-wardfund-stellar-heading"
		>
			<SectionContainer className="text-center">
				<motion.h2
					id="about-wardfund-stellar-heading"
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true, amount: 0.2 }}
					className="text-3xl font-bold tracking-tight gradient-text mb-3 sm:text-4xl"
				>
					{t('about.wardfundStellar.title')}
				</motion.h2>

				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ delay: 0.1, duration: 0.5 }}
					viewport={{ once: true, amount: 0.2 }}
					className="text-muted-foreground text-base max-w-2xl mx-auto mt-4 leading-relaxed sm:text-lg"
				>
					{t('about.wardfundStellar.description')}
				</motion.p>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, amount: 0.2 }}
					className="relative mt-10 sm:mt-14 flex flex-wrap justify-center items-center gap-5 sm:gap-6"
				>
					{mockAboutUs.wardfundStellarFeatures.map((feature) => (
						<FloatingFeature
							key={feature.id}
							icon={feature.icon}
							title={t(`about.wardfundStellar.features.${feature.id}.title`)}
						/>
					))}
				</motion.div>
			</SectionContainer>
		</section>
	)
}

export { WardFundStellar }
