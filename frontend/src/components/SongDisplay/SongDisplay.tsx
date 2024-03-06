import React from 'react'
import Hero from './Hero'
import SongsTable from './SongsTable'
import SearchBar from './SearchBar'
import { Box, Center, Grid, GridItem, HStack, Stack, VStack } from '@chakra-ui/react'
import AlbumSlider from './AlbumSlider'
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
						<Box h={'100%'} overflow={'scroll'} w={'50%'}>
							<SearchBar />
							<SongsTable />
						</Box>
						<VStack w={'100%'} p={2}>
							<AddNewSong />
							<CsvUploader />
						</VStack>
					</Stack>
				</GridItem>
			</Grid>
		</Box>
	)
}

export default SongDisplay
