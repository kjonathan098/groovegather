import { Box, Center, ChakraProvider, Grid, GridItem, Show } from '@chakra-ui/react'

function App() {
	return (
		<ChakraProvider>
			<Center bg={'green'}>
				<Box maxW={'1600px'} minW={'100%'} h={'100%'} bg={'red'}>
					<Grid templateAreas={{ base: `"main"`, lg: ` "aside main"` }} templateColumns={{ base: '1fr', lg: '200px 1fr' }} h={'100%'}>
						<Show above="lg">
							<GridItem area="aside" h={'100vh'} overflow={'scroll'} bg={'yellow'}>
								Side Bar
							</GridItem>
						</Show>

						<GridItem area="main" bg={'green'}>
							Main
						</GridItem>
					</Grid>
				</Box>
			</Center>
		</ChakraProvider>
	)
}

export default App
