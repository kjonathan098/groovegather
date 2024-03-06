import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const customColors = {
	primary: '#14141f',
	secondary: '#2f3450',
	accent: '#fd82d1',
}

const theme = extendTheme({
	colors: customColors,
	styles: {
		global: (props: { theme: { colors: { primary: any } } }) => ({
			'*': {
				'&::-webkit-scrollbar': {
					display: 'none',
				},
				msOverflowStyle: 'none', // IE and Edge
				scrollbarWidth: 'none', // Firefox
			},
			body: {
				bg: props.theme.colors.primary,
				color: 'white',
			},
		}),
	},
	fonts: {
		body: '"Nunito", serif',
	},
})

export default theme
