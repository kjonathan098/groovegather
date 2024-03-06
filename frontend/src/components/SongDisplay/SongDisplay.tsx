import React from 'react'
import Hero from './Hero'
import SongsTable from './SongsTable'
import SearchBar from './SearchBar'
import { Box, Grid, GridItem, Stack } from '@chakra-ui/react'

const SongDisplay = () => {
	return (
		<Grid templateRows="20% 30% 1fr" gap={2} bg={'red'} h={'100vh'} alignContent="stretch">
			<GridItem>
				<Hero />
			</GridItem>
			<GridItem bg={'purple'}>Hello</GridItem>
			<GridItem bg={'blue'}>
				<Stack direction="row">
					<Stack bg={'blue'} w={'50%'}>
						<SearchBar />
						<SongsTable />
					</Stack>
					<Box w={'1fr'}>aside</Box>
				</Stack>
			</GridItem>
		</Grid>
	)
}

export default SongDisplay
