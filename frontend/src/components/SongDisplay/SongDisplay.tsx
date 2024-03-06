import React from 'react'
import Hero from './Hero'
import SongsTable from './SongsTable'
import SearchBar from './SearchBar'
import { Box, Grid, GridItem, Stack } from '@chakra-ui/react'

const SongDisplay = () => {
	return (
		<Box h={'100vh'}>
			<Grid templateRows="30% 30% 1fr" gap={2} alignContent="stretch" h={'100%'}>
				<GridItem h={'100%'}>
					<Hero />
				</GridItem>
				<GridItem h={'100%'}></GridItem>
				<GridItem h={'100%'} maxHeight="calc(100vh - 62vh)">
					<Stack direction={'row'} h={'100%'}>
						<Box h={'100%'} overflow={'scroll'} w={'50%'}>
							<SearchBar />
							<SongsTable />
						</Box>
						<Box>Aside</Box>
					</Stack>
				</GridItem>
			</Grid>
		</Box>
	)
}

export default SongDisplay
