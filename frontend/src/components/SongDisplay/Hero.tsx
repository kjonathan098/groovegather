import { Box, Center, Image } from '@chakra-ui/react'
import heroBanner from '../../media/banner_image.jpeg'

const Hero = () => {
	return <Image src={heroBanner} maxH={{ base: '100%' }} w={'100%'} objectFit={'cover'} />
}

export default Hero
