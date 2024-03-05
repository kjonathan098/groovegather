import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const customColors = {
	primary: '#1c2033',
	secondary: '#0d0d19',
	accent: '#7c4253',
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
})

export default theme
