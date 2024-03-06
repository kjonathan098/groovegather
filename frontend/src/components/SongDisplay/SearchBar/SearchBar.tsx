import { Input, InputGroup, InputLeftElement, Spinner } from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs'

import React, { useCallback, useContext, useRef, useState } from 'react'
import { songListProvider } from '../../../context/songsListProvider'

const SearchBar = () => {
	const { fetchSongs } = useContext(songListProvider)
	const [inputValue, setInputValue] = useState('')
	const [loading, setLoading] = useState(false)
	const ref = useRef<HTMLInputElement>(null)

	return (
		<>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					if (!ref.current?.value) return
					fetchSongs(inputValue)
				}}
				style={{ width: '100%' }}
			>
				<InputGroup borderRadius={3} variant={'filled'}>
					<InputLeftElement pointerEvents="none" children={loading ? <Spinner /> : <BsSearch />} />
					<Input
						placeholder="Search Song"
						borderRadius={20}
						variant={'filled'}
						ref={ref}
						value={inputValue}
						onChange={() => {
							setInputValue(ref?.current?.value || '')
						}}
					/>
				</InputGroup>
			</form>
		</>
	)
}

export default SearchBar
