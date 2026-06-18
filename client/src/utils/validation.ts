export const passwordRegex =
	/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

export const validateRegisterForm = (form: {
	name: string
	email: string
	password: string
}) => {
	const errors = { name: '', email: '', password: '' }

	if (!form.name.trim()) {
		errors.name = 'Name is required'
	}

	if (!form.email.trim()) {
		errors.email = 'Email is required'
	} else if (!form.email.includes('@')) {
		errors.email = 'Enter a valid email'
	}

	if (!form.password) {
		errors.password = 'Password is required'
	} else if (!passwordRegex.test(form.password)) {
		errors.password =
			'Min 8 characters, uppercase, lowercase, number or special character'
	}

	return errors
}

export const validateLoginForm = (form: {
	email: string
	password: string
}) => {
	const errors = { email: '', password: '' }

	if (!form.email.trim()) {
		errors.email = 'Email is required'
	} else if (!form.email.includes('@')) {
		errors.email = 'Enter a valid email'
	}

	if (!form.password) {
		errors.password = 'Password is required'
	}

	return errors
}
