import { Center, Tag, VStack } from '@chakra-ui/react'
import { FaCat } from 'react-icons/fa'

const NoSongsOnList = () => {
	return (
		<Center h={'100%'}>
			<VStack fontSize={'200px'}>
				<FaCat />
				<Tag colorScheme="teal">Be a cool cat and get this party started</Tag>
				<Tag colorScheme="red">No songs on the list</Tag>
			</VStack>
		</Center>
	)
}

export default NoSongsOnList
