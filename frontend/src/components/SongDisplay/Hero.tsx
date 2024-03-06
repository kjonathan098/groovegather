import { Box, Center, Image } from '@chakra-ui/react'
import heroBanner from '../../media/banner_image.jpeg'
import grooveGatherTittle from '../../media/groovegather_title.png'

const Hero = () => {
	return (
		<Box
			height={'100%'} // Example height, adjust as needed
			width="100%"
			backgroundPosition="center"
			backgroundRepeat="no-repeat"
			backgroundSize="cover"
			backgroundImage={`url(${heroBanner})`}
		>
			<Center h={'100%'}>
				<Image src={grooveGatherTittle} objectFit={'cover'} w={'50%'} />
			</Center>
		</Box>
	)
}

export default Hero
