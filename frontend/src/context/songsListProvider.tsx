import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { ISong } from '../interfaces/songs.interface'

export interface ISongContext {
	testing: string
	songList: ISong[]
	fetchingSongs: boolean
}

export const songListProvider = createContext<ISongContext>({} as ISongContext)

interface IProps {
	children: React.ReactNode
}

const SongListProvider = ({ children }: IProps) => {
	const [testing, settesting] = useState('hello')
	const [fetchingSongs, setFetchingSongs] = useState(true)
	const [songList, setSongsList] = useState<ISong[]>([])

	const fetchSongs = async () => {
		const res = await axios.get<ISong[]>('http://localhost:4000/songs')
		setFetchingSongs(false)
		setSongsList(res.data)
	}

	useEffect(() => {
		fetchSongs()
	}, [])

	return <songListProvider.Provider value={{ testing, songList, fetchingSongs }}>{children}</songListProvider.Provider>
}

export default SongListProvider
