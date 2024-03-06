import { Box, Center, Image } from '@chakra-ui/react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { imageSlider } from '../../utils/imageLoader'
const Aside = () => {
	const settings = {
		infinite: true,
		slidesToShow: 6,
		slidesToScroll: 1,
		vertical: true,
		verticalSwiping: true,
		autoplay: true,
		speed: 10000,
		autoplaySpeed: 2000,
		cssEase: 'linear',
		arrows: false,
	}
	return (
		<Box w={'300px'} h={'100vh'} overflow={'hidden'}>
			<Center h={'100%'}>
				<div className="slider-container">
					<Slider {...settings}>
						{imageSlider.map((image, i) => {
							return (
								<div key={i}>
									<Image src={image} objectFit={'cover'} maxW={'300px'} />
								</div>
							)
						})}
					</Slider>
				</div>
			</Center>
		</Box>
	)
}

export default Aside
