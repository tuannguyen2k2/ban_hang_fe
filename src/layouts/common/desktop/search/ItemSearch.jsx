/* eslint-disable react/prop-types */
import { Avatar, Flex } from 'antd';
import styles from './Search.module.scss';
import { formatMoney } from '../../../../utils/formatMoney';
import { CURRENCY_UNIT } from '../../../../constants';
const ItemSearch = ({ data }) => {
    console.log(data);
    return (
        <Flex className={styles.itemSearch} justify='space-between' align='center'>
            <Flex vertical className={styles.itemLeft}>
                <span className={styles.nameItem}>{data?.name}</span>
                <span>
                    {formatMoney(data?.price, {
                        currency: CURRENCY_UNIT,
                        currentDecimal: '0',
                        groupSeparator: ',',
                    })}
                </span>
            </Flex>
            <Avatar shape='square' src={data?.image[0]?.url} size={50} />
        </Flex>
    );
};

export default ItemSearch;
