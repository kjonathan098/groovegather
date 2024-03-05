import { Box, Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { songListProvider } from '../../context/songsListProvider'

const SongsTable = () => {
	const [loading, setLoading] = useState(true)

	const { testing, fetchingSongs, songList } = useContext(songListProvider)

	useEffect(() => {
		console.log(songList)
	}, [songList])

	if (fetchingSongs) return <>Loadding...</>

	if (!songList.length) return <>No songs where found</>

	return (
		<Box w={'80%'}>
			<TableContainer>
				<Table variant="striped" colorScheme="primary">
					<Thead>
						<Tr>
							<Th>Band Name</Th>
							<Th>Song</Th>
							<Th isNumeric>Year</Th>
						</Tr>
					</Thead>
					<Tbody>
						{songList?.map((song) => {
							return (
								<React.Fragment>
									<Tr>
										<Td>{song.band.bandName}</Td>
										<Td>{song.name}</Td>
										<Td isNumeric>{song.year}</Td>
									</Tr>
								</React.Fragment>
							)
						})}
					</Tbody>
				</Table>
			</TableContainer>
		</Box>
	)
}

export default SongsTable
