import { cookies } from 'next/headers'

const getServerTheme = async (defaultTheme = 'dark') => {
	const cookieStore = await cookies()
	return cookieStore.get('theme')?.value ?? defaultTheme
}

export default getServerTheme