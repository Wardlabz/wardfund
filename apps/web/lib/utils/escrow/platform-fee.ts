/** Trustless Work max platform fee (human-readable percent). */
export const MAX_PLATFORM_FEE_PERCENT = 99

/** WardFund platform fee on all escrows (human-readable percent). */
export const WARDFUND_PLATFORM_FEE_PERCENT = 1

/** Trustless Work wire value for {@link WARDFUND_PLATFORM_FEE_PERCENT}. */
export const WARDFUND_TRUSTLESS_WORK_PLATFORM_FEE = WARDFUND_PLATFORM_FEE_PERCENT * 100

/**
 * Trustless Work uses centi-percent on the wire and in indexer responses
 * (e.g. 100 = 1%, 60 = 0.6%). WardFund stores human percent (1 = 1%).
 */
export const toTrustlessWorkPlatformFee = (humanPercent: number): number => humanPercent * 100

export const fromTrustlessWorkPlatformFee = (twFee: number): number => twFee / 100

export const getWardFundTrustlessWorkPlatformFee = (): number =>
	toTrustlessWorkPlatformFee(WARDFUND_PLATFORM_FEE_PERCENT)

export const formatHumanPlatformFee = (humanPercent: number): string => {
	const normalized = Number(humanPercent.toFixed(4))
	const text = Number.isInteger(normalized)
		? String(normalized)
		: String(normalized)
				.replace(/(\.\d*?)0+$/, '$1')
				.replace(/\.$/, '')

	return `${text}%`
}
