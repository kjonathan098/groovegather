import { Box, Button, Input, Stack, Text } from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { NewISong } from '../../interfaces/songs.interface'
import { songListProvider } from '../../context/songsListProvider'
import useToastMessage from '../../hooks/useToast'

const AddNewSong = () => {
	const [songName, setSongName] = useState('')
	const [artistName, setArtistName] = useState('')
	const [yearReleased, setYearReleased] = useState<number | null>(null)
	const { addNewSong } = useContext(songListProvider)
	const { showToast, errorToast } = useToastMessage()

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		if (!yearReleased) return
		const newSong: NewISong = { songName, bandName: artistName, year: yearReleased }
		try {
			await addNewSong(newSong)
			setSongName('')
			setArtistName('')
			setYearReleased(null)
			showToast('Success', 'Song Added to List', 'success')
		} catch (error) {
			errorToast('Error Adding Song to List')
		}
	}
	return (
		<Box bg={'primary'} p={2} borderRadius={'sm'}>
			<Text mb={2} fontWeight={'bold'} fontSize={'large'}>
				Add a song to the playlist
			</Text>
			<form action="" onSubmit={handleSubmit}>
				<Stack spacing={2}>
					<Stack>
						<Text>Song Name</Text>
						<Input placeholder="Song Name" size="sm" value={songName} onChange={(e) => setSongName(e.target.value)} />
					</Stack>
					<Stack>
						<Text>Artist</Text>
						<Input placeholder="Artist" size="sm" value={artistName} onChange={(e) => setArtistName(e.target.value)} />
					</Stack>
					<Stack>
						<Text>Year Released</Text>
						<Input placeholder="Year Released" size="sm" value={yearReleased || ''} onChange={(e) => setYearReleased(Number(e.target.value))} />
					</Stack>
					<Button type="submit" bg={'accent'}>
						Add New Song
					</Button>
				</Stack>
			</form>
		</Box>
	)
}

export default AddNewSong
