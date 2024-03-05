import axios from 'axios'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import { ISong } from '../interfaces/songs.interface'

export interface ISongContext {
	testing: string
	songList: ISong[]
	fetchingSongs: boolean
	uploadFile: (file: File) => Promise<void>
}

export const songListProvider = createContext<ISongContext>({} as ISongContext)

interface IProps {
	children: React.ReactNode
}

const SongListProvider = ({ children }: IProps) => {
	const [testing, settesting] = useState('hello')
	const [fetchingSongs, setFetchingSongs] = useState(false)
	const [songList, setSongsList] = useState<ISong[]>([])

	const fetchSongs = async () => {
		setFetchingSongs(true)
		const res = await axios.get<ISong[]>('http://localhost:4000/songs')
		setFetchingSongs(false)
		setSongsList(res.data)
	}

	const uploadFile = useCallback(async (file: File) => {
		console.log('hello')
		const formData = new FormData()
		formData.append('file', file)
		try {
			await axios.post('http://localhost:4000/songs', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})

			fetchSongs()
		} catch (error) {
			console.error('Failed to upload file:', error)
		}
	}, [])

	useEffect(() => {
		fetchSongs()
	}, [])

	return <songListProvider.Provider value={{ testing, songList, fetchingSongs, uploadFile }}>{children}</songListProvider.Provider>
}

export default SongListProvider
