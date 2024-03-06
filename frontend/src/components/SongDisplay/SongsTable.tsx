import { Box, Button, Center, Icon, Table, TableContainer, Tag, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { songListProvider } from '../../context/songsListProvider'
import { MdDelete } from 'react-icons/md'
import apiClient from '../../services/api-client'
import useToastMessage from '../../hooks/useToast'
import { IoWarningOutline } from 'react-icons/io5'
import NoSongsOnList from './NoSongsOnList'

const SongsTable = () => {
	const { fetchingSongs, songList, deleteSong, errorResponse } = useContext(songListProvider)
	const { showToast, errorToast } = useToastMessage()

	if (fetchingSongs) return <>Loadding...</>

	if (errorResponse)
		return (
			<Center h={'100%'}>
				<Tag colorScheme="red">
					<IoWarningOutline />
					{errorResponse}
				</Tag>
			</Center>
		)

	if (!songList.length) return <NoSongsOnList />

	const handleDelete = async (id: number) => {
		try {
			await deleteSong(id)
			showToast('Success', 'Song removed from list', 'success')
		} catch (error) {
			errorToast('Failed to delete song')
		}
	}

	return (
		<TableContainer>
			<Table variant="striped" colorScheme="blackAlpha">
				<Thead>
					<Tr>
						<Th>Song</Th>
						<Th>Band Name</Th>
						<Th isNumeric>Year</Th>
						<Th>Edit</Th>
					</Tr>
				</Thead>
				<Tbody overflow="hidden">
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
	)
}

export default SongsTable
