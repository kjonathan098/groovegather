import { ISong, sortOptions } from '../interfaces/songs.interface'

export function sortByBand(a: ISong, b: ISong, order: string) {
	console.log(a.band.bandName)
	if (order === 'asc') {
		if (a.band.bandName < b.band.bandName) return -1
		if (a.band.bandName > b.band.bandName) return 1
	} else {
		// Assuming 'desc' order
		if (a.band.bandName > b.band.bandName) return -1
		if (a.band.bandName < b.band.bandName) return 1
	}

	return 0
}

export function sort(a: ISong, b: ISong, order: string, sortBy: sortOptions) {
	if (order === 'asc') {
		if (a[sortBy] < b[sortBy]) return -1
		if (a[sortBy] > b[sortBy]) return 1
	} else {
		// Assuming 'desc' order
		if (a[sortBy] > b[sortBy]) return -1
		if (a[sortBy] < b[sortBy]) return 1
	}

	return 0
}
