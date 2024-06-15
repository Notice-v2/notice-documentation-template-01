import { HomeComponents } from '@/components/HomeComponents'
import { NotFound } from '@/components/NotFound'
import { API, extractProjectID } from '@/tools/api'
import { Metadata } from 'next'
import { headers } from 'next/headers'

async function getData(searchParams?: Record<string, any>) {
	const projectId = extractProjectID(headers(), searchParams)
	const getCategory = searchParams?.category ? `?category=${searchParams?.category}` : ''

	if (!projectId) return null

	try {
		const { data } = await API.get(`/projects/${projectId}${getCategory}`)
		return data
	} catch (_) {
		return null
	}
}

export async function generateMetadata({ searchParams }: { searchParams?: Record<string, any> }): Promise<Metadata> {
	// read route params
	const id = extractProjectID(headers(), searchParams)

	// fetch data
	const { data } = await API.get(`/projects/${id}`)

	const metadata = {
		title: '',
		description: '',
		icon: '',
		ogTitle: '',
		ogDescription: '',
		ogImage: '',
		twitterTitle: '',
		twitterDescription: '',
		twitterImage: '',
	}

	for (const item of data?.metadata) {
		const { tagName, innerText, attributes } = item

		if (tagName === 'title') {
			metadata.title = innerText
			metadata.ogTitle = innerText
			metadata.twitterTitle = innerText
		} else if (tagName === 'link') {
			const { rel, href } = attributes
			metadata.icon = href
		} else if (tagName === 'meta') {
			const { name, property, content } = attributes

			if (name === 'description') {
				metadata.description = content
				metadata.ogDescription = content
				metadata.twitterDescription = content
			} else if (property === 'og:image') {
				metadata.ogImage = content
			} else if (name === 'twitter:image') {
				metadata.twitterImage = content
			}
		}
	}

	return {
		title: metadata.title || 'Template Created with Notice',
		description: metadata.description || 'Notice is an no code editor to craft your content.',
		icons: {
			icon: metadata.icon,
			shortcut: metadata.icon,
			apple: metadata.icon,
			other: {
				rel: 'apple-touch-icon',
				url: metadata.icon,
			},
		},
		openGraph: {
			title: metadata.ogTitle,
			description: metadata.ogDescription,
			images: metadata.ogImage ? [{ url: metadata.ogImage }] : [],
		},
		twitter: {
			title: metadata.twitterTitle,
			description: metadata.twitterDescription,
			images: metadata.twitterImage ? [{ url: metadata.twitterImage }] : [],
		},
	}
}

export default async function Home({ searchParams }: { searchParams?: Record<string, any> }) {
	const data = await getData(searchParams)

	if (!data) return <NotFound />

	return <HomeComponents data={data} />
}
