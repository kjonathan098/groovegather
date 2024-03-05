import { Box, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

const SongsTable = () => {
	return (
		<Box w={'80%'}>
			<TableContainer>
				<Table variant="striped" colorScheme="teal">
					<Thead>
						<Tr>
							<Th>Band Name</Th>
							<Th>Song</Th>
							<Th isNumeric>Year</Th>
						</Tr>
					</Thead>
					<Tbody>
						<Tr>
							<Td>John Mayer</Td>
							<Td>Neon</Td>
							<Td isNumeric>1992</Td>
						</Tr>
						<Tr>
							<Td>Mana</Td>
							<Td>Rayando El Sol </Td>
							<Td isNumeric>2000</Td>
						</Tr>
						<Tr>
							<Td>Bob Marley</Td>
							<Td>Dont Worry</Td>
							<Td isNumeric>1970</Td>
						</Tr>
					</Tbody>
				</Table>
			</TableContainer>
		</Box>
	)
}

export default SongsTable
