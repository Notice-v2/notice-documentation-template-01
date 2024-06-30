'use client'

import { NarrowArrowRightIcon } from '@/icons'
import { Link } from '@chakra-ui/next-js'
import { Box, Flex, Heading, HStack, Text } from '@chakra-ui/react'
import { useIsHovered } from '@notice-org/renderer-helper'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useRef } from 'react'
dayjs.extend(relativeTime)

interface Props {
	page: any
	accentColor?: string
	hasShadow?: boolean
}

export const DocumentCard = ({ page, hasShadow }: Props) => {
	const postDate = dayjs(page?.createdAt)
	const sinceDate = postDate.fromNow()

	const ref = useRef<HTMLAnchorElement>(null)
	const isHovered = useIsHovered([ref]).some(Boolean)

	return (
		<Link
			ref={ref}
			variant="unstyled"
			href={page?.slug || page?._id}
			transition={'all 0.3s ease'}
			_hover={{ textDecoration: 'none' }}
		>
			<Flex
				bg={'white'}
				direction="column"
				gap="20px"
				h="100%"
				justify="center"
				align="flex-start"
				p={{ base: '24px', md: '28px', lg: '30px' }}
				boxShadow={hasShadow ? 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;' : 'none'}
			>
				<Heading
					as="h2"
					fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
					color="gray.700"
					fontWeight="400"
					lineHeight="1.2"
				>
					{page?.title}
				</Heading>
				<Text noOfLines={3} fontSize={{ base: 'md', md: 'lg', lg: 'xl' }} color="gray.600" mb="4">
					{page?.description ?? ''}
				</Text>

				<HStack justify="center" align="center">
					<Text fontSize={{ base: 'sm', md: 'md', lg: 'lg' }} color="gray.700">
						{' '}
						Read More
					</Text>
					<Box
						w="fit-content"
						h="fit-content"
						transform={isHovered ? 'translateX(0.3125rem)' : 'none'}
						transition="all 0.3s ease"
					>
						<NarrowArrowRightIcon size={20} color="#718096" />
					</Box>
				</HStack>
			</Flex>
		</Link>
	)
}
