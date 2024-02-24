import { Col, Flex, Row } from 'antd';
import styles from './Product.module.scss';
const ProductComponent = () => {
    const style = {
        background: '#0092ff',
        padding: '8px 0',
    };
    return (
        <Flex vertical justify='center' className={styles.wrapper}>
            <Row gutter={20} className={styles.row}>
                <Col className='gutter-row' span={5}>
                    <div style={style}>col-6</div>
                </Col>
                <Col className='gutter-row' span={5}>
                    <div style={style}>col-6</div>
                </Col>
                <Col className='gutter-row' span={5}>
                    <div style={style}>col-6</div>
                </Col>
                <Col className='gutter-row' span={5}>
                    <div style={style}>col-6</div>
                </Col>
            </Row>
        </Flex>
    );
};

export default ProductComponent;
