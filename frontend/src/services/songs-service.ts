import { ISong, NewISong } from '../interfaces/songs.interface'
import apiClient from './api-client'

export const addNewSongService = async (newSong: NewISong) => {
	const res = await apiClient.post<ISong>('/songs', newSong)
	return res
}

export const fetchSongsService = async (endPoint: string) => {
	const res = await apiClient.get<ISong[]>(`/songs${endPoint}`)
	return res
}
