export interface ISong {
	id: number
	name: string
	year: number
	band: {
		bandName: string
		id: number
	}
}
