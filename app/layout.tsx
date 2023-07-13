import AuthProvider from '@/context/AuthProvider'
import './globals.css'
import type { Metadata } from 'next'

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
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	)
}
