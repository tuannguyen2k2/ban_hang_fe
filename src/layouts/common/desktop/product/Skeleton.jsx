import { Col, Flex, Row } from 'antd';
import styles from './Product.module.scss';
import { Skeleton } from '@mui/material';
const SkeletonComponent = () => {
    return (
        <Flex vertical justify='center' className={styles.wrapperProduct}>
            {Array(4)
                .fill()
                .map((_, rowIndex) => (
                    <Row key={rowIndex} gutter={30}>
                        {Array(4)
                            .fill()
                            .map((_, colIndex) => (
                                <Col key={colIndex} span={6}>
                                    <Flex className={styles.item} vertical>
                                        {/* <Skeleton className={styles.itemImage} /> */}
                                        <Flex vertical style={{ padding: '0 10px' }}>
                                            <span>
                                                <Skeleton
                                                    variant='rectangular'
                                                    height={268}
                                                    width={179}
                                                    className={styles.skeletonImage}
                                                />
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

export default SkeletonComponent;
