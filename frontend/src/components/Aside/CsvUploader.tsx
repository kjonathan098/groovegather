import { ChangeEvent, useContext, useRef } from 'react'
import { songListProvider } from '../../context/songsListProvider'
import { FaPlus } from 'react-icons/fa'
import { Button, Center, HStack, Input, Text } from '@chakra-ui/react'

const CsvUploader = () => {
	const { uploadFile } = useContext(songListProvider)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return
		const file = event.target.files[0]
		await uploadFile(file)
	}

	return (
		<Center>
			<HStack>
				<Button bg={'accent'} w={'50px'} h={'50px'} rounded={'full'} onClick={() => fileInputRef.current?.click()}>
					<FaPlus color="white" fontSize={''} />
					<Input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileChange} hidden />
				</Button>
				<Text>Upload Files</Text>
			</HStack>
		</Center>
	)
}

export default CsvUploader
