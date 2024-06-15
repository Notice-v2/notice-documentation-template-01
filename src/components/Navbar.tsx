'use client'

import { Flex, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import { useMemo } from 'react'
import { Logo } from './Logo'

interface Props {
	meta: any
}

export const Navbar = ({ meta }: Props) => {
	const title = useMemo(
		() =>
			meta?.find((m: any) => m.tagName === 'meta' && m.attributes?.property === 'og:site_name')?.attributes?.content,
		[meta]
	)
	const icon = useMemo(
		() => meta?.find((m: any) => m.tagName === 'link' && m.attributes?.rel === 'icon')?.attributes?.href,
		[meta]
	)

	return (
		<Flex
			as="nav"
			align="center"
			w="100%"
			py={{ base: 4, lg: 8 }}
			minH="64px"
			bg={'transparent'}
			color="white"
			maxW="1118px"
			mx="auto"
			px={{ base: '20px', md: '34px', lg: '52px' }}
		>
			<Flex as={Link} href="/" gap={4} align="center" justify="start">
				{icon && <Logo src={icon} />}
				<Heading
					fontWeight="700"
					noOfLines={1}
					lineHeight={{ base: '3.5rem', md: '3.6rem' }}
					color="blackAlpha.800"
					as="h1"
					fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
				>
					{title}
				</Heading>
			</Flex>
		</Flex>
	)
}
