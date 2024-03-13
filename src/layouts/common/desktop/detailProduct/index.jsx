/* eslint-disable react/prop-types */
import { Carousel, Flex, Image } from 'antd';

const DetailProductComponent = ({ detailProduct }) => {
    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };
    return (
        <div>
            <Carousel afterChange={onChange} style={{ width: '200px' }}>
                {detailProduct?.image?.map((image) => (
                    <Image preview={false} key={image?.url} src={image?.url} />
                ))}
            </Carousel>
        </div>
    );
};

export default DetailProductComponent;
