import { Stack } from '@chakra-ui/react'
import React from 'react'
import CsvUploader from './CsvUploader'

const Aside = () => {
	return (
		<Stack p={2}>
			<CsvUploader />
		</Stack>
	)
}

export default Aside
