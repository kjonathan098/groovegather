import { ChangeEvent, useCallback, useContext } from 'react'
import { songListProvider } from '../../context/songsListProvider'
import Papa, { ParseResult } from 'papaparse'

const CsvUploader = () => {
	const { uploadFile } = useContext(songListProvider)

	const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return
		const file = event.target.files[0]
		await uploadFile(file)
	}

	// const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
	// 	if (!event.target.files) return

	// 	const file = event.target.files[0]
	// }, [])

	return (
		<div>
			<div>
				<input type="file" accept=".csv" onChange={handleFileChange} />
			</div>
		</div>
	)
}

export default CsvUploader
