import { Stack } from '@chakra-ui/react'
import React from 'react'
import CsvUploader from './CsvUploader'
import AddNewSong from './AddNewSong'

const Aside = () => {
	return (
		<Stack p={2}>
			<CsvUploader />
			<AddNewSong />
		</Stack>
	)
}

export default Aside
