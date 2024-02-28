import { Col, Flex, Row } from 'antd';
import styles from './Product.module.scss';
import { Skeleton } from '@mui/material';
const SkeletonMobile = () => {
    return (
        <Flex vertical justify='center' className={styles.wrapperProduct}>
            {Array(8)
                .fill()
                .map((_, rowIndex) => (
                    <Row key={rowIndex} gutter={2} className={styles.row}>
                        {Array(2)
                            .fill()
                            .map((_, colIndex) => (
                                <Col key={colIndex} span={20}>
                                    <Flex className={styles.item} vertical>
                                        {/* <Skeleton className={styles.itemImage} /> */}
                                        <Flex vertical style={{ padding: '0 10px' }}>
                                            <span>
                                                <Skeleton variant='rectangular' className={styles.skeletonImage} />
                                                <Skeleton width='90%' className={styles.itemName} />
                                                <Skeleton width='40%' />
                                            </span>
                                            {/* <span className={styles.itemPrice}>
                                                <Skeleton active />
                                            </span> */}
                                        </Flex>
                                    </Flex>
                                </Col>
                            ))}
                    </Row>
                ))}
        </Flex>
    );
};

export default SkeletonMobile;
