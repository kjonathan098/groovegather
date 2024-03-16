import { useEffect, useState } from 'react'
import { ISong } from '../interfaces/songs.interface'
import { AxiosResponse } from 'axios'
import apiClient from '../services/api-client'

export const useFetch = () => {
	const [hello, setHello] = useState('hello')
	const [fetchingSongs, setFetchingSongs] = useState(false)
	const [songList, setSongsList] = useState<ISong[]>([])
	const [searchQuery, setSearchQuery] = useState('')
	const [errorResponse, setErrorResponse] = useState('')

	const fetchSongs = async () => {
		setFetchingSongs(true)
		const endPoint = searchQuery ? `/?search=${searchQuery}` : ''
		try {
			const res = await apiClient.get<AxiosResponse<ISong[]>>(`/songs${endPoint}`)
			setFetchingSongs(false)
			setSongsList(res.data as unknown as ISong[])
			console.log('res.data.data', res)
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

	useEffect(() => {
		fetchSongs()
	}, [hello])
	return [hello, setHello]
}
