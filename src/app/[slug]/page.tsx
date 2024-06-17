import { NotFound } from '@/components/NotFound'
import { SubPageComponents } from '@/components/SubPageComponents'
import { API } from '@/tools/api'
import { Metadata } from 'next'

async function getData(slug: string) {
	try {
		const { data } = await API.get(`/pages/${slug}`)
		let relatedPages = []
		const { projectId, category, _id } = data
		if (category && category !== '') {
			const projectData = await getPagesWithCategory(projectId, category)
			const filteredData = projectData.pages.filter((page: any) => page._id !== _id)
			relatedPages = filteredData
		}
		return { page: data, relatedPages }
	} catch (ex) {
		return null
	}
}

async function getPagesWithCategory(projectId: string, category: string) {
	const getCategory = `?category=${category}`

	if (!projectId) return null

	try {
		const { data } = await API.get(`/projects/${projectId}${getCategory}`)
		return data
	} catch (_) {
		return null
	}
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
	const id = params.slug
	const { data } = await API.get(`/pages/${id}`)

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

	for (const item of data.metadata?.elements) {
		const { tagName, innerText, attributes } = item

		if (tagName === 'title') {
			metadata.title = innerText
			metadata.ogTitle = innerText
			metadata.twitterTitle = innerText
		} else if (tagName === 'link') {
			const { rel, href } = attributes
			metadata.icon = href
		} else if (tagName === 'meta') {
			const { name, property, content, rel, href } = attributes

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

export default async function Subpage({ params }: { params: { slug: string } }) {
	const data = await getData(params.slug)
	const { page } = data || {}

	if (!page) return <NotFound />

	return <SubPageComponents data={data} />
}
