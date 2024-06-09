import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Cards from './Cards';

const CarouselComponent = ({data, property}) => {
  console.log(data);
  return (
    
         <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={true}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024
                },
                items: 4,
                partialVisibilityGutter: 40
              },
              mobile: {
                breakpoint: {
                  max: 510,
                  min: 0
                },
                items: 1,
                partialVisibilityGutter: 30
              },
              mobilexs: {
                breakpoint: {
                  max: 800,
                  min: 510
                },
                items: 2,
                partialVisibilityGutter: 30
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 800
                },
                items: 3,
                partialVisibilityGutter: 30
              }
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {data.map((data,index) => (
              <div key={index} className='flex justify-center'><Cards  data={data} property={property} /></div>
            ))}

          </Carousel>
    
  )
}

export default CarouselComponent