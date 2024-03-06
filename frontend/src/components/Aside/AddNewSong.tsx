import { Box, Button, Input, Stack, Text } from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { NewISong } from '../../interfaces/songs.interface'
import { songListProvider } from '../../context/songsListProvider'
import useToastMessage from '../../hooks/useToast'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from '../../utils/formConfigs'

const AddNewSong = () => {
	const [songName, setSongName] = useState('')
	const [artistName, setArtistName] = useState('')
	const [yearReleased, setYearReleased] = useState<number | null>(null)
	const { addNewSong } = useContext(songListProvider)
	const { showToast, errorToast } = useToastMessage()

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values) => {
			try {
				await addNewSong({
					songName: values.songName,
					bandName: values.artistName,
					year: Number(values.yearReleased),
				})
				formik.resetForm()
				showToast('Success', 'Song Added to List', 'success')
			} catch (error) {
				errorToast('Error Adding Song to List')
			}
		},
	})

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
		<Box w={'100%'}>
			<Text mb={2} fontWeight={'bold'} fontSize={'large'}>
				Add a song to the playlist
			</Text>
			<form onSubmit={formik.handleSubmit}>
				<Stack spacing={2}>
					<Stack>
						<Text>Song Name</Text>
						<Input placeholder="Song Name" size="sm" {...formik.getFieldProps('songName')} />
						{formik.touched.songName && formik.errors.songName ? <Text color="red.500">{formik.errors.songName}</Text> : null}
					</Stack>
					<Stack>
						<Text>Artist</Text>
						<Input placeholder="Artist" size="sm" {...formik.getFieldProps('artistName')} />
					</Stack>
					{formik.touched.artistName && formik.errors.artistName ? <Text color="red.500">{formik.errors.artistName}</Text> : null}
					<Stack>
						<Text>Year Released</Text>
						<Input placeholder="Year Released" size="sm" type="number" {...formik.getFieldProps('yearReleased')} />
						{formik.touched.yearReleased && formik.errors.yearReleased ? <Text color="red.500">{formik.errors.yearReleased}</Text> : null}
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
