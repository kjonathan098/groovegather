import { Button, Input, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { NewISong } from '../../interfaces/songs.interface'
import apiClient from '../../services/api-client'

const AddNewSong = () => {
	const [songName, setSongName] = useState('')
	const [artistName, setArtistName] = useState('')
	const [yearReleased, setYearReleased] = useState<number | null>(null)

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		if (!yearReleased) return
		const newSong: NewISong = { bandName: artistName, songName: songName, year: yearReleased }

		try {
			const res = await apiClient.post('/songs', newSong)
			console.log(res)
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<Stack gap={2}>
			<form action="" onSubmit={handleSubmit}>
				<Stack>
					<Text>Song Name</Text>
					<Input placeholder="Song Name" size="sm" onChange={(e) => setSongName(e.target.value)} />
				</Stack>
				<Stack>
					<Text>Artist</Text>
					<Input placeholder="Artist" size="sm" onChange={(e) => setArtistName(e.target.value)} />
				</Stack>
				<Stack>
					<Text>Year Released</Text>
					<Input placeholder="Year Released" size="sm" onChange={(e) => setYearReleased(Number(e.target.value))} />
				</Stack>
				<Button type="submit">Add New Song</Button>
			</form>
		</Stack>
	)
}

export default AddNewSong
