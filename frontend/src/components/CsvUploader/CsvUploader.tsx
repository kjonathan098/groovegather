import { ChangeEvent, useCallback, useContext } from 'react'
import { songListProvider } from '../../context/songsListProvider'
import Papa, { ParseResult } from 'papaparse'

const CsvUploader = () => {
	const { uploadFile } = useContext(songListProvider)

	// const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
	// 	if (!event.target.files) return
	// 	const file = event.target.files[0]
	// 	await uploadFile(file)
	// }

	const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return

		const file = event.target.files[0]
		if (file) {
			Papa.parse(file, {
				header: true,
				complete: async (result: ParseResult<any>) => {
					// try {
					// 	await fetch('http://localhost:4000/songs/bulk-add', {
					// 		method: 'POST',
					// 		headers: {
					// 			'Content-Type': 'application/json',
					// 		},
					// 		body: JSON.stringify(result.data),
					// 	})
					// 	// Handle success
					// 	alert('Songs uploaded successfully')
					// } catch (error) {
					// 	// Handle error
					// 	console.error('Error uploading songs:', error)
					// }
				},
			})
		}
	}, [])

	return (
		<div>
			<div>
				<input type="file" accept=".csv" onChange={handleFileChange} />
			</div>
		</div>
	)
}

export default CsvUploader
