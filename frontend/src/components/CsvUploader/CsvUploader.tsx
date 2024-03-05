import { ChangeEvent, useContext } from 'react'
import { songListProvider } from '../../context/songsListProvider'

const CsvUploader = () => {
	const { uploadFile } = useContext(songListProvider)

	const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return
		const file = event.target.files[0]
		await uploadFile(file)
	}

	return (
		<div>
			<div>
				<input type="file" accept=".csv" onChange={handleFileChange} />
			</div>
		</div>
	)
}

export default CsvUploader
