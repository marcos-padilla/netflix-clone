import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'
import bcrypt from 'bcrypt'
export async function POST(request: Request) {
	try {
		const body = await request.json()
		const {
			name,
			email,
			password,
		}: {
			name?: string
			email?: string
			password?: string
		} = body
		if (!name || !email || !password) {
			return new NextResponse('Missing Info', { status: 400 })
		}

		if (password.length < 8) {
			return new NextResponse(
				'Password must have at least 8 characteres',
				{ status: 400 }
			)
		}
		const chechUser = await prisma.user.findUnique({
			where: {
				email,
			},
		})
		if (chechUser) {
			return new NextResponse('User already exist', { status: 422 })
		}
		const newUser = await prisma.user.create({
			data: {
				name,
				email,
				hashedPassword: await bcrypt.hash(password, 12),
				image: '',
				emailVerified: new Date(),
			},
		})
		return NextResponse.json(newUser)
	} catch (error) {
		console.log('🚀 ~ file: route.ts:5 ~ POST ~ error:', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}
