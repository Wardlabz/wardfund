'use client'

import type { PollarClient, WalletInfo } from '@pollar/core'
import { useCallback, useEffect, useState } from 'react'
import { isPollarConfigured } from './config'
import { getWardFundPollarClient } from './pollar-client-singleton'
import { useIsClient } from './use-is-client'

/**
 * Pollar auth/wallet state from the WardFund singleton client.
 * Use this instead of `usePollar()` in hooks that may run outside `<PollarProvider>`
 * (e.g. escrow signing on pages where the provider is still initializing).
 */
export const useWardFundPollarClientState = () => {
	const isClient = useIsClient()
	const configured = isPollarConfigured()
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [verified, setVerified] = useState(false)
	const [wallet, setWallet] = useState<WalletInfo | null>(null)

	const getClient = useCallback((): PollarClient => {
		const client = getWardFundPollarClient()
		if (!client) {
			throw new Error('Pollar is not configured')
		}
		return client
	}, [])

	useEffect(() => {
		if (!isClient || !configured) {
			return
		}

		const client = getWardFundPollarClient()
		if (!client) {
			return
		}

		const syncFromClient = () => {
			const authState = client.getAuthState()
			if (authState.step === 'authenticated') {
				setIsAuthenticated(true)
				setVerified(authState.verified)
			} else {
				setIsAuthenticated(false)
				setVerified(false)
			}
			setWallet(client.getWallet())
		}

		const unsubscribe = client.onAuthStateChange(() => {
			syncFromClient()
		})

		void client.ready().then(syncFromClient)

		return () => {
			unsubscribe()
		}
	}, [configured, isClient])

	return {
		isConfigured: configured && isClient,
		isAuthenticated,
		verified,
		wallet,
		getClient,
	}
}
