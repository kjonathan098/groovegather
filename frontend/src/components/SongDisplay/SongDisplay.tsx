import React from 'react'
import Hero from './Hero/Hero'
import SongsTable from './SongsTable/SongsTable'
import SearchBar from './SearchBar/SearchBar'
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
