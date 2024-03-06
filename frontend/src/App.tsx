import { Box, Center, ChakraProvider, Grid, GridItem, Show } from '@chakra-ui/react'
import theme from './theme'
import SongListProvider from './context/songsListProvider'
import CsvUploader from './components/Aside/CsvUploader'
import SongDisplay from './components/SongDisplay/SongDisplay'
import Aside from './components/Aside/Aside'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function App() {
	return (
		<ChakraProvider theme={theme}>
			<SongListProvider>
				<Center bg={'green'}>
					<Box maxW={'1600px'} minW={'100%'} h={'100%'} bg={'red'}>
						<Grid templateAreas={{ base: `"main"`, lg: ` "aside main"` }} templateColumns={{ base: '1fr', lg: '300px 1fr' }} h={'100%'}>
							<Show above="lg">
								<GridItem area="aside" h={'100vh'} bg={'secondary'}>
									<Aside />
								</GridItem>
							</Show>

							<GridItem area="main" bg={'primary'}>
								<SongDisplay />
							</GridItem>
						</Grid>
					</Box>
				</Center>
			</SongListProvider>
		</ChakraProvider>
	)
}

export default App
