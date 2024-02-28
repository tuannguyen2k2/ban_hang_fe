/* eslint-disable react/prop-types */
import { Col, Flex, Image, Menu, Row } from 'antd';
import styles from './Product.module.scss';
import { formatMoney } from '../../../../utils/formatMoney';
import { CURRENCY_UNIT } from '../../../../constants';
import SubMenu from 'antd/es/menu/SubMenu';
import { useState } from 'react';
import SkeletonComponent from './Skeleton';
import locales from '../../../../locales';
import NavSider from '../../NavSider';
const ProductComponent = ({ loading, listProduct }) => {
    return (
        <Flex justify='flex-end' className={styles.wrapper}>
            <NavSider className={styles.navSider} />
            {loading ? (
                <SkeletonComponent />
            ) : (
                <Flex vertical justify='center' className={styles.wrapperProduct}>
                    {listProduct &&
                        Array(4)
                            .fill()
                            .map((_, rowIndex) => (
                                <Row key={rowIndex} gutter={30} className={styles.row}>
                                    {listProduct.slice(rowIndex * 4, rowIndex * 4 + 4)?.map((item) => (
                                        <Col key={item?._id} span={6}>
                                            <Flex className={styles.item} vertical>
                                                <Image
                                                    className={styles.itemImage}
                                                    src={item.image[0]?.url}
                                                    preview={false}
                                                    loading='lazy'
                                                />
                                                <Flex vertical style={{ padding: '0 10px' }}>
                                                    <span className={styles.itemName}>{item.name}</span>
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

export default ProductComponent;