import axios, { AxiosResponse } from 'axios'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import { ISong, NewISong } from '../interfaces/songs.interface'
import apiClient from '../services/api-client'

export interface ISongContext {
	testing: string
	songList: ISong[]
	fetchingSongs: boolean
	uploadFile: (file: File) => Promise<void>
	fetchSongs: (query?: string) => Promise<void>
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>
	addNewSong: (newSong: NewISong) => Promise<void>
}

export const songListProvider = createContext<ISongContext>({} as ISongContext)

interface IProps {
	children: React.ReactNode
}

const SongListProvider = ({ children }: IProps) => {
	const [testing, settesting] = useState('hello')
	const [fetchingSongs, setFetchingSongs] = useState(false)
	const [songList, setSongsList] = useState<ISong[]>([])
	const [searchQuery, setSearchQuery] = useState('')
	const [errorResponse, setErrorResponse] = useState('')

	const fetchSongs = async () => {
		setFetchingSongs(true)
		const endPoint = searchQuery ? `/?search=${searchQuery}` : ''
		try {
			const res = await apiClient.get<ISong[]>(`/songs${endPoint}`)
			setFetchingSongs(false)
			setSongsList(res.data)
		} catch (error: any) {
			setErrorResponse(error.message)
		} finally {
			setFetchingSongs(false)
		}
	}

	const uploadFile = useCallback(async (file: File) => {
		const formData = new FormData()
		formData.append('songsCsv', file)
		try {
			await apiClient.post('/songs/file', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			fetchSongs()
		} catch (error) {
			console.error('Failed to upload file:', error)
		}
	}, [])

	const addNewSong = async (newSong: NewISong) => {
		try {
			const addedSong: AxiosResponse<ISong> = await apiClient.post('/songs', newSong)
			fetchSongs()
		} catch (error: any) {
			console.log(error.data.message)
		}
	}

	useEffect(() => {
		fetchSongs()
	}, [searchQuery])

	useEffect(() => {
		fetchSongs()
	}, [])

	return <songListProvider.Provider value={{ testing, songList, fetchingSongs, uploadFile, fetchSongs, setSearchQuery, addNewSong }}>{children}</songListProvider.Provider>
}

export default SongListProvider
