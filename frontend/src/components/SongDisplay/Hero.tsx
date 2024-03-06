import { Box, Center, Image } from '@chakra-ui/react'
import heroBanner from '../../media/banner_image.jpeg'

const Hero = () => {
	return (
		<Center>
			<Image src={heroBanner} h={'200px'} w={'100%'} objectFit={'cover'} />
		</Center>
	)
}

export default Hero
