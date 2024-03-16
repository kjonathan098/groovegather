import React, { createContext, useCallback, useEffect, useState } from 'react'
import { ISong, NewISong, sortOptions } from '../interfaces/songs.interface'
import apiClient from '../services/api-client'
import useToastMessage from '../hooks/useToast'
import { sortByBand, sort } from '../utils/sortSongs'
import { fetchSongsService, addNewSongService } from '../services/songs-service'

export interface ISongContext {
	songList: ISong[]
	fetchingSongs: boolean
	errorResponse: string
	uploadFile: (file: File) => Promise<void>
	fetchSongs: (query?: string) => Promise<void>
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>
	addNewSong: (newSong: NewISong) => Promise<void>
	deleteSong: (id: number) => Promise<void>
	sortSongs(sortBy: string): void
	sortByBands(sortBy: sortOptions): void
}

export const songListProvider = createContext<ISongContext>({} as ISongContext)

interface IProps {
	children: React.ReactNode
}

const SongListProvider = ({ children }: IProps) => {
	const [fetchingSongs, setFetchingSongs] = useState(false)
	const [songList, setSongsList] = useState<ISong[]>([])
	const [searchQuery, setSearchQuery] = useState('')
	const [errorResponse, setErrorResponse] = useState('')

	const { showToast, errorToast } = useToastMessage()

	const fetchSongs = async () => {
		const endPoint = searchQuery ? `/?search=${searchQuery}` : ''
		try {
			const res = await fetchSongsService(endPoint)
			setFetchingSongs(false)
			setSongsList(res.data)
		} catch (error: any) {
			if (error.message.includes('Network Error') || error.message.includes('connection refused')) {
				setErrorResponse('Failed to connect to the server. Please try again later')
				return
			}
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
			showToast('Success', 'Songs added to list', 'success')
			fetchSongs()
		} catch (error) {
			console.error('Failed to upload file:', error)
			errorToast('Failed to upload file:')
		}
	}, [])

	const addNewSong = async (newSong: NewISong): Promise<void> => {
		try {
			await addNewSongService(newSong)
		} catch (error: any) {
			console.log(error)
			setErrorResponse(error.message)
		}
		fetchSongs()
	}

	const deleteSong = async (id: number) => {
		await apiClient.delete(`/songs/${id}`)
		const newList = songList.filter((song) => song.id !== id)
		console.log(newList)
		setSongsList(newList)
	}

	function sortSongs(sortBy: sortOptions) {
		console.log('hero')
		const sortedList = songList.sort((a, b) => sort(a, b, 'asc', sortBy))
		setSongsList([...sortedList])
	}

	function sortByBands(sortBy: sortOptions) {
		const sortedList = songList.sort((a, b) => sortByBand(a, b, 'asc'))
		setSongsList([...sortedList])
	}

	useEffect(() => {
		fetchSongs()
	}, [searchQuery])

	return <songListProvider.Provider value={{ songList, fetchingSongs, errorResponse, uploadFile, fetchSongs, setSearchQuery, addNewSong, deleteSong, sortSongs, sortByBands }}>{children}</songListProvider.Provider>
}

export default SongListProvider
