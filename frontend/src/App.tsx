import { Box, Center, ChakraProvider, Grid, GridItem, Show } from '@chakra-ui/react'
import theme from './theme'
import SongsTable from './components/SongsTable'
import SongListProvider from './context/songsListProvider'

function App() {
	return (
		<ChakraProvider theme={theme}>
			<SongListProvider>
				<Center bg={'green'}>
					<Box maxW={'1600px'} minW={'100%'} h={'100%'} bg={'red'}>
						<Grid templateAreas={{ base: `"main"`, lg: ` "aside main"` }} templateColumns={{ base: '1fr', lg: '300px 1fr' }} h={'100%'}>
							<Show above="lg">
								<GridItem area="aside" h={'100vh'} bg={'secondary'}>
									Side Bar
								</GridItem>
							</Show>
							<GridItem area="main" bg={'primary'}>
								<SongsTable />
							</GridItem>
						</Grid>
					</Box>
				</Center>
			</SongListProvider>
		</ChakraProvider>
	)
}

export default App
