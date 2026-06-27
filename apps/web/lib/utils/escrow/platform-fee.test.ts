import { describe, expect, test } from 'bun:test'
import {
	formatHumanPlatformFee,
	fromTrustlessWorkPlatformFee,
	getWardFundTrustlessWorkPlatformFee,
	WARDFUND_PLATFORM_FEE_PERCENT,
	WARDFUND_TRUSTLESS_WORK_PLATFORM_FEE,
	toTrustlessWorkPlatformFee,
} from './platform-fee'

describe('platform-fee', () => {
	test('WardFund platform fee is fixed at 1%', () => {
		expect(WARDFUND_PLATFORM_FEE_PERCENT).toBe(1)
		expect(WARDFUND_TRUSTLESS_WORK_PLATFORM_FEE).toBe(100)
		expect(getWardFundTrustlessWorkPlatformFee()).toBe(100)
	})

	test('converts human percent to Trustless Work centi-percent', () => {
		expect(toTrustlessWorkPlatformFee(0.6)).toBe(60)
		expect(toTrustlessWorkPlatformFee(1)).toBe(100)
	})

	test('converts Trustless Work centi-percent to human percent', () => {
		expect(fromTrustlessWorkPlatformFee(60)).toBe(0.6)
		expect(fromTrustlessWorkPlatformFee(100)).toBe(1)
	})

	test('formats human percent for display', () => {
		expect(formatHumanPlatformFee(0.6)).toBe('0.6%')
		expect(formatHumanPlatformFee(1)).toBe('1%')
		expect(formatHumanPlatformFee(2.5)).toBe('2.5%')
	})
})
