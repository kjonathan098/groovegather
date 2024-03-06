import Hero from './Hero'
import SongsTable from './SongsTable'
import SearchBar from './SearchBar'
import { Box, Center, Grid, GridItem, Stack, VStack } from '@chakra-ui/react'
import AddNewSong from '../Aside/AddNewSong'
import CsvUploader from '../Aside/CsvUploader'

const SongDisplay = () => {
	return (
		<Box h={'100vh'}>
			<Grid templateRows="40%  1fr" gap={2} alignContent="stretch" h={'100%'}>
				<GridItem h={'100%'}>
					<Hero />
				</GridItem>
				<GridItem h={'100%'} maxHeight="calc(100vh - 40vh)">
					<Stack direction={'row'} h={'100%'}>
						<Box h={'100%'} overflow={'scroll'} w={'70%'}>
							<SearchBar />
							<SongsTable />
						</Box>

						<Center w={'30%'} gap={3}>
							<VStack w={'100%'} h={'fit-content'} bg={'secondary'} p={4} borderRadius={'md'} boxShadow={'md'} gap={10}>
								<AddNewSong />
								<CsvUploader />
							</VStack>
						</Center>
					</Stack>
				</GridItem>
			</Grid>
		</Box>
	)
}

export default SongDisplay
