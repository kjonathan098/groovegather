import axios from 'axios'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import { ISong } from '../interfaces/songs.interface'
import apiClient from '../services/api-client'

export interface ISongContext {
	testing: string
	songList: ISong[]
	fetchingSongs: boolean
	uploadFile: (file: File) => Promise<void>
	fetchSongs: (query?: string) => Promise<void>
}

export const songListProvider = createContext<ISongContext>({} as ISongContext)

interface IProps {
	children: React.ReactNode
}

const SongListProvider = ({ children }: IProps) => {
	const [testing, settesting] = useState('hello')
	const [fetchingSongs, setFetchingSongs] = useState(false)
	const [songList, setSongsList] = useState<ISong[]>([])

	const fetchSongs = async (query?: string) => {
		console.log('hello')
		const endPoint = query ? `/?search=${query}` : ''
		console.log(endPoint)
		setFetchingSongs(true)
		const res = await apiClient.get<ISong[]>(`/songs${endPoint}`)
		setFetchingSongs(false)
		setSongsList(res.data)
	}

	const uploadFile = useCallback(async (file: File) => {
		const formData = new FormData()
		formData.append('file', file)
		try {
			await apiClient.post('/songs', formData, {
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

	return <songListProvider.Provider value={{ testing, songList, fetchingSongs, uploadFile, fetchSongs }}>{children}</songListProvider.Provider>
}

export default SongListProvider
