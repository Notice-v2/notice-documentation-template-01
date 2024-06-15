'use client'

import { Box, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { PageContent } from './blocks/render-blocks'
import { SocialShare } from './SocialShare'

interface Props {
	data: any
}

export const SubPageComponents = ({ data }: Props) => {
	const formattedDate = useMemo(() => dayjs(data?.createdAt).format('MMM D, YYYY'), [data?.createdAt])

	function removeFirstElement(arr: any[]) {
		const newArr = arr.slice()
		newArr.shift()
		return newArr
	}

	const filteredContent = useMemo(() => removeFirstElement(data?.content ?? []), [data])

	return (
		<Box>
			<Flex
				direction="column"
				justify="center"
				px={{ base: '20px', md: '34px', lg: '52px' }}
				align="flex-start"
				mx={'auto'}
				maxW="1118px"
			>
				<VStack py={{ base: '4', lg: 6 }} justify="center" align="flex-start" w="100%">
					<Flex maxW="700px" justify="center" align="flex-start" direction="column" w="100%" h="fit-content">
						<Heading
							as="h1"
							color="gray.600"
							fontSize={{ base: '2xl', md: '4xl', lg: '6xl' }}
							fontWeight="400"
							lineHeight="1.2"
							mb="20px"
						>
							{data?.title}
						</Heading>
						<Text fontSize={{ base: 'md', md: 'lg', lg: 'xl' }} color="gray.500" mb="4">
							{data?.description}
						</Text>
						<HStack my="8px" justify="flex-start" align="center" gap="18px" w="100%">
							<Text flexShrink={0} w="fit-content" fontSize={{ base: 'sm', md: 'md', lg: 'lg' }} color="fg.muted">
								{formattedDate}
							</Text>
							<SocialShare />
						</HStack>
					</Flex>
				</VStack>
			</Flex>
			<Box as="section" py={{ base: '30px', lg: '68px' }} w="100%" h="100%" bg="white">
				<Box
					px={{ base: '20px', md: '34px', lg: '52px' }}
					maxW="1118px"
					mx="auto"
					fontSize={{ base: '16px', md: '18px' }}
				>
					<PageContent blocks={filteredContent} />
				</Box>
			</Box>
		</Box>
	)
}
