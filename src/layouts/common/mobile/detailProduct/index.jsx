/* eslint-disable react/prop-types */
import { animated, useSpring } from '@react-spring/web';
import { Alert, Flex, Image, InputNumber, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Button, ToggleButton } from 'react-bootstrap';
import { PiShoppingCartLight } from 'react-icons/pi';
import { useDispatch } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { CART_EXPIRATION_DATE, CURRENCY_UNIT } from '../../../../constants';
import locales from '../../../../locales';
import { setCart } from '../../../../store/slice/appSlice';
import { formatMoney } from '../../../../utils/formatMoney';
import { getData, setData } from '../../../../utils/localStorage';
import styles from './DetailProduct.module.scss';
const DetailProductMobile = ({ detailProduct }) => {
    const [sizeSelected, setSizeSelected] = useState(null);
    const [colorSelected, setColorSelected] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [visibleAlert, setVisibleAlert] = useState({ visible: false, alertMessage: '' });
    const dispatch = useDispatch();

    const fadeProps = useSpring({
        opacity: visibleAlert.visible ? 1 : 0,
        config: { duration: 300 },
    });
    useEffect(() => {
        const timeOutAlert = setTimeout(() => {
            setVisibleAlert({ visible: false, alertMessage: visibleAlert.alertMessage });
        }, 2000);
        return () => clearTimeout(timeOutAlert);
    }, [visibleAlert]);
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

    const handleAddCart = () => {
        if (!colorSelected) {
            setVisibleAlert({ visible: true, alertMessage: locales.alertColorSelect });
            return;
        }
        if (!sizeSelected) {
            setVisibleAlert({ visible: true, alertMessage: locales.alertSizeSelect });
            return;
        }
        const cartInfo = getData('cart');
        if (!cartInfo) {
            const dataCart = {
                data: {
                    totalQuantity: quantity,
                    productList: [
                        {
                            id: detailProduct?._id,
                            name: detailProduct?.name,
                            image: detailProduct?.image[0]?.url,
                            price: detailProduct?.price,
                            quantity: quantity,
                            color: colorSelected,
                            size: sizeSelected,
                        },
                    ],
                    expires: CART_EXPIRATION_DATE,
                },
            };
            setData('cart', dataCart);
            dispatch(setCart({ notiAddCartSuccess: true, content: dataCart }));
        } else {
            cartInfo.data.totalQuantity = cartInfo?.data?.totalQuantity + quantity;
            cartInfo.data.expires = CART_EXPIRATION_DATE;
            let isDuplicate = false;
            cartInfo?.data?.productList?.map((product) => {
                if (product.id == detailProduct._id && product.color == colorSelected && product.size == sizeSelected) {
                    product.quantity += quantity;
                    isDuplicate = true;
                }
            });
            if (!isDuplicate) {
                cartInfo.data.productList = [
                    {
                        id: detailProduct?._id,
                        name: detailProduct?.name,
                        image: detailProduct?.image[0]?.url,
                        price: detailProduct?.price,
                        quantity: quantity,
                        color: colorSelected,
                        size: sizeSelected,
                    },
                    ...cartInfo.data.productList,
                ];
            }
            setData('cart', cartInfo);
            dispatch(setCart({ notiAddCartSuccess: true, content: cartInfo }));
        }
    };

    return (
        <div className={styles.detailProductWrapper}>
            <div className={styles.topDetailProductWrapper}>
                <Slider
                    dots
                    infinite
                    speed={200}
                    slidesToShow={1}
                    slidesToScroll={1}
                    arrows={false}
                    className={styles.slider}
                >
                    {detailProduct?.image?.map((image) => (
                        <Image preview={false} key={image?.url} src={image?.url} />
                    ))}
                </Slider>

                <Flex vertical className={styles.bottomDetailProductWrapper}>
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
                    <Button className={styles.addCartButton} onClick={handleAddCart}>
                        <PiShoppingCartLight size={20} /> <span style={{ marginLeft: '5px' }}>{locales.addCart}</span>
                    </Button>
                    <Button className={styles.buyNowButton}>{locales.buyNow}</Button>
                    <div className={styles.descriptionLabel}>{locales.descriptionProduct}</div>
                    <div
                        className={styles.description}
                        dangerouslySetInnerHTML={{ __html: detailProduct?.description }}
                    ></div>
                </Flex>
            </div>
            <animated.div style={fadeProps} className={styles.alert}>
                <Alert message={visibleAlert.alertMessage} type='error' />
            </animated.div>
        </div>
    );
};

export default DetailProductMobile;
