import React from 'react'
import Hero from './Hero'
import SongsTable from './SongsTable'
import SearchBar from './SearchBar'
import { Stack } from '@chakra-ui/react'

const SongDisplay = () => {
	return (
		<Stack gap={3}>
			<Hero />
			<SearchBar />
			<SongsTable />
		</Stack>
	)
}

export default SongDisplay
