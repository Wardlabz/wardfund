'use client'

import { getWardFundPollarClient } from './pollar-client-singleton'

/** Clears the in-browser Pollar SDK session (local storage + server revoke). */
export const clearPollarSession = async (): Promise<void> => {
	const client = getWardFundPollarClient()
	if (!client) {
		return
	}

	await client.ready()
	const authState = client.getAuthState()

	if (authState.step === 'authenticated') {
		await client.logout()
		return
	}

	if (authState.step !== 'idle') {
		client.cancelLogin()
	}
}
