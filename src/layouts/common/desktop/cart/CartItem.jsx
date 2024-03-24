/* eslint-disable react/prop-types */
import { Flex, Image } from 'antd';
import styles from './Cart.module.scss';
import { formatMoney } from '../../../../utils/formatMoney';
import { CURRENCY_UNIT } from '../../../../constants';
import { PiTrash } from 'react-icons/pi';
const CartItem = ({ item }) => {
    return (
        <Flex className={styles.cartItemWrapper}>
            <div className={styles.image}>
                <Image src={item?.image} preview={false} />
            </div>
            <Flex vertical justify='space-around' className={styles.rightCartItem}>
                <Flex justify='space-between' align='center'>
                    <span style={{ fontWeight: 600 }}>{item?.name}</span>
                    <div style={{ cursor: 'pointer', padding: '2px' }}>
                        <PiTrash size={20} style={{ marginBottom: '2px' }} />
                    </div>
                </Flex>
                <span className={styles.price}>
                    {formatMoney(item?.price, {
                        currency: CURRENCY_UNIT,
                        currentDecimal: '0',
                        groupSeparator: ',',
                    })}
                </span>
                <span className={styles.colorAndSize}>
                    {item?.color} / {item?.size}
                </span>
            </Flex>
        </Flex>
    );
};

export default CartItem;
