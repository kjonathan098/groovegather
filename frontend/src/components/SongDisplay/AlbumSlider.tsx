import { Image } from '@chakra-ui/react'
import Slider from 'react-slick'
import taylor from '../../media/taylorCover.png'
const AlbumSlider = () => {
	const settings = {
		className: 'center',
		centerMode: true,
		infinite: true,
		centerPadding: '60px',
		slidesToShow: 3,
		speed: 500,
	}
	return (
		<div className="slider-container">
			<Slider {...settings}>
				<div>
					<Image src={taylor} h={'50%'} objectFit={'cover'} />
				</div>
				<div>
					<h3>2</h3>
				</div>
				<div>
					<h3>3</h3>
				</div>
				<div>
					<h3>4</h3>
				</div>
				<div>
					<h3>5</h3>
				</div>
				<div>
					<h3>6</h3>
				</div>
			</Slider>
		</div>
	)
}

export default AlbumSlider
