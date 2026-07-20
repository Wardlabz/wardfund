import { afterEach, describe, expect, test } from 'bun:test'
import type { AppEnvInterface } from '@packages/lib/types'
import { getRpId, getRpName } from '../lib/smart-account/kit/smart-account-kit-config.utils'

// Minimal appConfig shape used by the helpers
const makeConfig = (): AppEnvInterface =>
	({
		passkey: {
			expectedOrigin: ['https://app.wardfund.org'],
			rpId: ['wardfund.org'],
			rpName: ['WardFund'],
		},
	}) as unknown as AppEnvInterface

const originalWindow = (globalThis as { window?: unknown }).window

afterEach(() => {
	if (originalWindow === undefined) {
		delete (globalThis as { window?: unknown }).window
	} else {
		;(globalThis as { window?: unknown }).window = originalWindow
	}
})

const setWindow = (origin: string, hostname: string) => {
	;(globalThis as { window?: unknown }).window = {
		location: { origin, hostname },
	}
}

describe('getRpId', () => {
	test('returns the explicitly provided rpId', () => {
		expect(getRpId(makeConfig(), 'explicit.example')).toBe('explicit.example')
	})

	test('server-side falls back to first configured rpId', () => {
		expect(getRpId(makeConfig())).toBe('wardfund.org')
	})

	test('server-side falls back to localhost when none configured', () => {
		const config = makeConfig()
		config.passkey.rpId = []
		expect(getRpId(config)).toBe('localhost')
	})

	test('browser matches origin to configured rpId', () => {
		setWindow('https://app.wardfund.org', 'app.wardfund.org')
		expect(getRpId(makeConfig())).toBe('wardfund.org')
	})

	test('browser falls back to hostname when origin not configured', () => {
		setWindow('https://staging.wardfund.org', 'staging.wardfund.org')
		expect(getRpId(makeConfig())).toBe('staging.wardfund.org')
	})
})

describe('getRpName', () => {
	test('returns the explicitly provided rpName', () => {
		expect(getRpName(makeConfig(), 'Explicit')).toBe('Explicit')
	})

	test('server-side falls back to first configured rpName', () => {
		expect(getRpName(makeConfig())).toBe('WardFund')
	})

	test('server-side falls back to default when none configured', () => {
		const config = makeConfig()
		config.passkey.rpName = []
		expect(getRpName(config)).toBe('App')
	})

	test('browser matches origin to configured rpName', () => {
		setWindow('https://app.wardfund.org', 'app.wardfund.org')
		expect(getRpName(makeConfig())).toBe('WardFund')
	})
})
