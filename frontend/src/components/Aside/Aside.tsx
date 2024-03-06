import { Image, Stack } from '@chakra-ui/react'
import React from 'react'
import CsvUploader from './CsvUploader'
import AddNewSong from './AddNewSong'
import asideImage from '../../media/aside_promo.jpeg'

const Aside = () => {
	return (
		<Stack p={2} h={'100%'}>
			<Image src={asideImage} objectFit={'cover'} h={'150px'} />
			<Stack h={'100%'} justifyContent={'space-around'}>
				<AddNewSong />
				<CsvUploader />
			</Stack>
		</Stack>
	)
}

export default Aside
