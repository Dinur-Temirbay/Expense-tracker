import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth.ts'
import { LoginPage } from '@pages/LoginPage.tsx'
import { RegisterPage } from '@pages/RegisterPage.tsx'
import { DashboardPage } from '@pages/DashBoardPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { isAuth } = useAuth()

	if (!isAuth) {
		return <Navigate to='/login' />
	}

	return <>{children}</>
}

function PublicRoute({ children }: { children: React.ReactNode }) {
	const { isAuth } = useAuth()

	if (isAuth) {
		return <Navigate to='/dashboard' />
	}
	return <>{children}</>
}

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Navigate to='/dashboard' />} />
				<Route
					path='/login'
					element={
						<PublicRoute>
							<LoginPage />
						</PublicRoute>
					}
				/>
				<Route
					path='/register'
					element={
						<PublicRoute>
							<RegisterPage />
						</PublicRoute>
					}
				/>
				<Route
					path='/dashboard'
					element={
						<ProtectedRoute>
							<DashboardPage />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	)
}
