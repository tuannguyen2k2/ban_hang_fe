/* eslint-disable react/prop-types */
import { Carousel, Flex, Image, InputNumber, Space } from 'antd';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './DetailProduct.module.scss';
import { useEffect, useRef, useState } from 'react';
import { CURRENCY_UNIT } from '../../../../constants';
import { formatMoney } from '../../../../utils/formatMoney';
import locales from '../../../../locales';
import { Button, ButtonGroup, Form, ToggleButton } from 'react-bootstrap';
const DetailProductComponent = ({ detailProduct }) => {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [sizeSelected, setSizeSelected] = useState('');
    const [colorSelected, setColorSelected] = useState('');
    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => {
        if (quantity < 99) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    let sliderRef1 = useRef(null);
    let sliderRef2 = useRef(null);

    useEffect(() => {
        setNav1(sliderRef1);
        setNav2(sliderRef2);
    }, []);

    return (
        <div className={styles.detailProductWrapper}>
            <div className={styles.topDetailProductWrapper}>
                <div className={styles.leftWrapper}>
                    <Slider
                        asNavFor={nav1}
                        ref={(slider) => (sliderRef2 = slider)}
                        slidesToShow={3}
                        swipeToSlide={true}
                        focusOnSelect={true}
                        slidesToScroll={1}
                        className={styles.sliderVertical}
                        vertical
                        verticalSwiping
                        arrows={false}
                    >
                        {detailProduct?.image?.map((image) => (
                            <Image preview={false} key={image?.url} src={image?.url} />
                        ))}
                    </Slider>
                    <Slider
                        dots={false}
                        infinite
                        speed={500}
                        slidesToShow={1}
                        slidesToScroll={1}
                        arrows={false}
                        className={styles.slider}
                        asNavFor={nav2}
                        ref={(slider) => (sliderRef1 = slider)}
                    >
                        {detailProduct?.image?.map((image) => (
                            <Image preview={false} key={image?.url} src={image?.url} />
                        ))}
                    </Slider>
                </div>
                <Flex vertical className={styles.rightWrapper}>
                    <span className={styles.nameProduct}>{detailProduct?.name}</span>
                    <span className={styles.priceProduct}>
                        {formatMoney(detailProduct?.price, {
                            currency: CURRENCY_UNIT,
                            currentDecimal: '0',
                            groupSeparator: ',',
                        })}
                    </span>
                    <Space direction='vertical' size={30} style={{ margin: '20px 0' }}>
                        <Flex vertical>
                            <span style={{ fontSize: '13px' }}>
                                {locales.color}: <span style={{ fontWeight: 700 }}>{colorSelected}</span>
                            </span>
                            <Flex>
                                {detailProduct?.color?.map((value) => {
                                    return (
                                        <ToggleButton
                                            className={
                                                colorSelected === value
                                                    ? styles.colorButtonSelected
                                                    : styles.colorButton
                                            }
                                            key={value}
                                            type='radio'
                                            variant='secondary'
                                            value={value}
                                            checked={colorSelected === value}
                                            onClick={() => setColorSelected(value)}
                                        >
                                            {value}
                                        </ToggleButton>
                                    );
                                })}
                            </Flex>
                        </Flex>
                        <Flex vertical>
                            <span style={{ fontSize: '13px' }}>
                                {locales.size}: <span style={{ fontWeight: 700 }}>{sizeSelected}</span>
                            </span>
                            <Flex>
                                {detailProduct?.size?.map((value) => {
                                    return (
                                        <ToggleButton
                                            className={
                                                sizeSelected === value ? styles.sizeButtonSelected : styles.sizeButton
                                            }
                                            key={value}
                                            type='radio'
                                            variant='secondary'
                                            value={value}
                                            checked={sizeSelected === value}
                                            onClick={() => setSizeSelected(value)}
                                        >
                                            {value}
                                        </ToggleButton>
                                    );
                                })}
                            </Flex>
                        </Flex>
                        <Flex>
                            <Button className={styles.quantityButton} onClick={handleDecrease} disabled={quantity == 1}>
                                -
                            </Button>
                            <InputNumber
                                className={styles.quantityInput}
                                max={99}
                                controls={false}
                                min={1}
                                value={quantity}
                                maxLength={2}
                                onChange={(value) => setQuantity(value)}
                                onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
                            />
                            <Button
                                className={styles.quantityButton}
                                onClick={handleIncrease}
                                disabled={quantity >= 99}
                            >
                                +
                            </Button>
                        </Flex>
                    </Space>
                    <Button className={styles.addCartButton}>{locales.addCart}</Button>
                    <Button className={styles.buyNowButton}>{locales.buyNow}</Button>
                </Flex>
            </div>
            <div className={styles.bottomDetailProductWrapper}>
                <div className={styles.descriptionLabel}>{locales.descriptionProduct}</div>
                <div>{detailProduct?.description}</div>
            </div>
        </div>
    );
};

export default DetailProductComponent;
