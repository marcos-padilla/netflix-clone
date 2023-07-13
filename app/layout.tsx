import AuthProvider from '@/context/AuthProvider'
import './globals.css'
import type { Metadata } from 'next'
import ToastProvider from '@/context/ToastProvider'

export const metadata: Metadata = {
	title: 'Netflix Clone',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body>
				<AuthProvider>
					<ToastProvider />
					{children}
				</AuthProvider>
			</body>
		</html>
	)
}
