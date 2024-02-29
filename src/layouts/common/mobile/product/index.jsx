/* eslint-disable react/prop-types */
import { Col, Flex, Image, Pagination, Row } from 'antd';
import { CURRENCY_UNIT, DEFAULT_PAGE_SIZE } from '../../../../constants';
import { formatMoney } from '../../../../utils/formatMoney';
import NavSider from '../../NavSider';
import styles from './Product.module.scss';
import SkeletonMobile from './Skeleton';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
const ProductMobile = ({ loading, listProduct, totalElements, totalPages, currentPage }) => {
    let [searchParams, setSearchParams] = useSearchParams();
    const handleChangePage = (current) => {
        const params = {};
        for (const [key, value] of searchParams.entries()) {
            params[key] = value;
        }
        setSearchParams({ ...params, page: current });
    };
    return (
        <Flex justify='flex-end' className={styles.wrapper}>
            {loading ? (
                <SkeletonMobile />
            ) : (
                <Flex vertical justify='center' className={styles.wrapperProduct}>
                    {listProduct &&
                        Array(8)
                            .fill()
                            .map((_, rowIndex) => (
                                <Row key={rowIndex} gutter={2} className={styles.row}>
                                    {listProduct.slice(rowIndex * 2, rowIndex * 2 + 2)?.map((item) => (
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
                    {totalPages > 1 && (
                        <Pagination
                            className={styles.pagination}
                            total={totalElements}
                            pageSize={DEFAULT_PAGE_SIZE}
                            current={currentPage}
                            onChange={handleChangePage}
                        />
                    )}
                </Flex>
            )}
        </Flex>
    );
};

export default ProductMobile;
