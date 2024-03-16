import { Button, Center, Spinner, Table, TableContainer, Tag, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { songListProvider } from '../../context/songsListProvider'
import { MdDelete } from 'react-icons/md'
import useToastMessage from '../../hooks/useToast'
import { IoWarningOutline } from 'react-icons/io5'
import NoSongsOnList from './NoSongsOnList'
import { BsSortNumericDown } from 'react-icons/bs'

const SongsTable = () => {
	const { fetchingSongs, songList, deleteSong, errorResponse, sortSongs, sortByBands } = useContext(songListProvider)
	const { showToast, errorToast } = useToastMessage()

	// useEffect(() => {
	// 	console.log(songList, 'songlist changed!')
	// }, [songList])

	const handleDelete = async (id: number) => {
		try {
			await deleteSong(id)
			showToast('Success', 'Song removed from list', 'success')
		} catch (error) {
			errorToast('Failed to delete song')
		}
	}

	if (fetchingSongs) return <Spinner />

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

	return (
		<TableContainer>
			<Table variant="striped" colorScheme="blackAlpha">
				<Thead>
					<Tr>
						<Th>
							<Button
								onClick={() => {
									sortSongs('name')
								}}
							>
								Song
							</Button>
						</Th>
						<Th>
							<Button
								onClick={() => {
									sortByBands('band')
								}}
							>
								Band Name
							</Button>
						</Th>
						<Th isNumeric>
							<Button
								onClick={() => {
									sortSongs('year')
								}}
							>
								<BsSortNumericDown />
							</Button>
						</Th>
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
