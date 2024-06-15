'use client'

import { Box } from '@chakra-ui/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Articles } from './Articles'
import { Hero } from './Hero'

interface Props {
	data: any
}

export const HomeComponents = ({ data }: Props) => {
	const hasHero = data?.project?.subtitle || data?.project?.description

	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()

	const setSearchParams = (s: string) => {
		const params = new URLSearchParams(searchParams)
		params.set('category', s)
		replace(`${pathname}?${params.toString()}`)
	}

	return (
		<Box mx="auto" maxW="1118px" px={{ base: '20px', md: '34px', lg: '52px' }}>
			{hasHero && (
				<Box as="section">
					<Hero project={data?.project} />
				</Box>
			)}
			<Box mt={{ base: hasHero ? '34px' : '40px', lg: hasHero ? '30px' : '16px' }} mb="52px" as="section">
				<Articles pages={data?.pages} accentColor={data?.project?.accentColor} />
			</Box>
		</Box>
	)
}
