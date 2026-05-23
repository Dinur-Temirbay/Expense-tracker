import { createContext, useState } from 'react'
import type { User } from '@types/index.ts'

interface AuthContextType {
	user: User | null
	isAuth: boolean
	login: (user: User, token: string) => void
	logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(() => {
		const saved = localStorage.getItem('user')
		return saved ? JSON.parse(saved) : null
	})

	const [token, setToken] = useState<string | null>(() => {
		return localStorage.getItem('token')
	})

	const login = (user: User, token: string) => {
		setUser(user)
		setToken(token)
		localStorage.setItem('user', JSON.stringify(user))
		localStorage.setItem('token', token)
	}

	const logout = () => {
		setUser(null)
		setToken(null)
		localStorage.removeItem('user')
		localStorage.removeItem('token')
	}

	return (
		<AuthContext.Provider value={{ user, isAuth: !!token, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}
