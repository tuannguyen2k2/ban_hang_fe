/* eslint-disable react/prop-types */
import { Col, Flex, Image, Row } from 'antd';
import { CURRENCY_UNIT } from '../../../../constants';
import { formatMoney } from '../../../../utils/formatMoney';
import NavSider from '../../NavSider';
import styles from './Product.module.scss';
import SkeletonMobile from './Skeleton';
import { useEffect, useState } from 'react';
const ProductMobile = ({ loading, listProduct }) => {
    const [products, setProducts] = useState();
    useEffect(() => {
        if (listProduct?.length > 0) {
            const isEven = Math.ceil(listProduct.length % 2) != 1;
            if (!isEven) {
                listProduct.push({
                    _id: null,
                    image: [null],
                });
            }
            setProducts(listProduct);
        }
    }, [listProduct]);
    return (
        <Flex justify='flex-end' className={styles.wrapper}>
            {loading ? (
                <SkeletonMobile />
            ) : (
                <Flex vertical justify='center' className={styles.wrapperProduct}>
                    {products &&
                        Array(8)
                            .fill()
                            .map((_, rowIndex) => (
                                <Row key={rowIndex} gutter={2} className={styles.row}>
                                    {products.slice(rowIndex * 2, rowIndex * 2 + 2)?.map((item) => (
                                        <Col key={item?._id} span={20}>
                                            <Flex className={styles.item} vertical>
                                                <Image
                                                    className={styles.itemImage}
                                                    src={item?.image[0]?.url}
                                                    preview={false}
                                                    loading='lazy'
                                                />
                                                <Flex vertical style={{ padding: '0 10px' }}>
                                                    <span className={styles.itemName}>{item?.name}</span>
                                                    <span className={styles.itemPrice}>
                                                        {formatMoney(item?.price, {
                                                            currency: CURRENCY_UNIT,
                                                            currentDecimal: '0',
                                                            groupSeparator: ',',
                                                        })}
                                                    </span>
                                                </Flex>
                                            </Flex>
                                        </Col>
                                    ))}
                                </Row>
                            ))}
                </Flex>
            )}
        </Flex>
    );
};

export default ProductMobile;
