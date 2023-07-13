'use client'

import axios from 'axios'
import { useCallback, useState, useEffect } from 'react'
import { getSession, signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'
import Input from '@/components/form/Input'
import { toast } from 'react-hot-toast'

type VARIANT = 'LOGIN' | 'REGISTER'

export default function AuthPage() {
	const session = useSession()
	const router = useRouter()
	const [variant, setVariant] = useState<VARIANT>('LOGIN')

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const toggleVariant = useCallback(() => {
		setVariant((prev) => (prev === 'LOGIN' ? 'REGISTER' : 'LOGIN'))
	}, [])

	useEffect(() => {
		if (session?.status === 'authenticated') {
			router.push('/')
		}
	}, [session?.status, router])

	const handleSignIn = useCallback(async () => {
		try {
			await signIn('credentials', {
				email,
				password,
				redirect: false,
				callbackUrl: '/',
			})
		} catch (e) {
			console.log('🚀 ~ file: page.tsx:36 ~ login ~ e:', e)
			toast.error('Something went wrong!!!')
		}
	}, [email, password, router])

	const handleRegister = useCallback(async () => {
		try {
			await axios.post('/api/register', { email, name, password })
			handleSignIn()
		} catch (e) {
			console.log('🚀 ~ file: page.tsx:50 ~ handleRegister ~ e:', e)
			toast.error('Something went wrong!!!')
		}
	}, [email, name, password, handleSignIn])

	return (
		<div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
			<div className='bg-black w-full h-full lg:bg-opacity-50'>
				<nav className='px-12 py-5'>
					<img
						src='/images/logo.png'
						className='h-12'
						alt='Logo'
					/>
				</nav>
				<div className='flex justify-center'>
					<div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
						<h2 className='text-white text-4xl mb-8 font-semibold'>
							{variant === 'LOGIN'
								? 'Sign in'
								: 'Register'}
						</h2>
						<div className='flex flex-col gap-4'>
							{variant === 'REGISTER' && (
								<Input
									id='name'
									type='text'
									label='Username'
									value={name}
									onChange={(e: any) =>
										setName(e.target.value)
									}
								/>
							)}
							<Input
								id='email'
								type='email'
								label='Email address or phone number'
								value={email}
								onChange={(e: any) =>
									setEmail(e.target.value)
								}
							/>
							<Input
								type='password'
								id='password'
								label='Password'
								value={password}
								onChange={(e: any) =>
									setPassword(e.target.value)
								}
							/>
						</div>
						<button
							onClick={
								variant === 'LOGIN'
									? handleSignIn
									: handleRegister
							}
							className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'
						>
							{variant === 'LOGIN' ? 'Sign In' : 'Sign up'}
						</button>
						<div className='flex flex-row items-center gap-4 mt-8 justify-center'>
							<button
								onClick={() =>
									signIn('google', {
										callbackUrl: '/',
									})
								}
								className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
							>
								<FcGoogle size={32} />
							</button>
						</div>
						<p className='text-neutral-500 mt-12'>
							{variant === 'LOGIN'
								? 'First time using Netflix?'
								: 'Already have an account?'}
							<span
								onClick={toggleVariant}
								className='text-white ml-1 hover:underline cursor-pointer'
							>
								{variant === 'LOGIN'
									? 'Create an account'
									: 'Login'}
							</span>
							.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
