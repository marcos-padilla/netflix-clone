'use client'

import axios from 'axios'
import { useCallback, useState, useEffect } from 'react'
import { getSession, signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'
import Input from '@/components/form/Input'

export default function AuthPage() {
	const session = useSession()
	const router = useRouter()

	useEffect(() => {
		if (session?.status === 'authenticated') {
			router.push('/')
		}
	}, [session?.status, router])
	return <div>AuthPage</div>
}
