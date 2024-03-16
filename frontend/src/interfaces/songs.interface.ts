export interface ISong {
	id: number
	name: string
	year: number
	band: {
		bandName: string
		id: number
	}
}

export interface NewISong {
	bandName: string
	songName: string
	year: number
}

export type sortOptions = 'year' | 'band' | 'name' | 'id'
