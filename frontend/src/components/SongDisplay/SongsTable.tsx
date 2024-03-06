import { Box, Button, Center, Icon, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { songListProvider } from '../../context/songsListProvider'
import { MdDelete } from 'react-icons/md'
import apiClient from '../../services/api-client'
import useToastMessage from '../../hooks/useToast'

const SongsTable = () => {
	const { fetchingSongs, songList, deleteSong } = useContext(songListProvider)
	const { showToast, errorToast } = useToastMessage()

	if (fetchingSongs) return <>Loadding...</>

	if (!songList.length) return <>No songs where found</>

	const handleDelete = async (id: number) => {
		try {
			await deleteSong(id)
			showToast('Success', 'Song removed from list', 'success')
		} catch (error) {
			errorToast('Failed to delete song')
		}
	}

	return (
		<Center w={'100%'} p={3}>
			<Box h={'300px'} overflow={'scroll'} w={'100%'}>
				<Center>
					<TableContainer maxWidth={'70%'} width={'100%'}>
						<Table variant="striped" colorScheme="blackAlpha">
							<Thead>
								<Tr>
									<Th>Song</Th>
									<Th>Band Name</Th>
									<Th isNumeric>Year</Th>
									<Th>Edit</Th>
								</Tr>
							</Thead>
							<Tbody>
								{songList?.map((song) => {
									return (
										<React.Fragment key={song.id}>
											<Tr>
												<Td>{song.name}</Td>
												<Td>{song.band.bandName}</Td>
												<Td isNumeric>{song.year}</Td>
												<Td>
													<Button
														size={'xs'}
														colorScheme="red"
														onClick={() => {
															handleDelete(song.id)
														}}
													>
														<MdDelete />
													</Button>
												</Td>
											</Tr>
										</React.Fragment>
									)
								})}
							</Tbody>
						</Table>
					</TableContainer>
				</Center>
			</Box>
		</Center>
	)
}

export default SongsTable
