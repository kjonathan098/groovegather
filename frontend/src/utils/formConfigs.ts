import * as Yup from 'yup'

export const initialValues = {
	songName: '',
	artistName: '',
	yearReleased: '',
}

export const validationSchema = Yup.object({
	songName: Yup.string().required('Required'),
	artistName: Yup.string().required('Required'),
	yearReleased: Yup.number().required('Required').positive('Invalid year').integer('Invalid year').max(new Date().getFullYear(), `Year must be current or earlier`),
})
