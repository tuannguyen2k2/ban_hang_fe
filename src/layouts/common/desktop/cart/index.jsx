/* eslint-disable react/prop-types */
import HeadlessTippy from '@tippyjs/react/headless';
import { Flex } from 'antd';
import { useState } from 'react';
import styles from './Cart.module.scss';
import { cartSelector } from '../../../../selector';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';
const CartComponent = ({ children }) => {
    const [showResult, setShowResult] = useState(true);
    const handleHideResult = () => {
        setShowResult(false);
    };
    const cartInfo = useSelector(cartSelector);
    console.log(cartInfo);
    return (
        <HeadlessTippy
            onClickOutside={handleHideResult}
            interactive
            visible={true}
            offset={[0, 10]}
            render={(attrs) => (
                <Flex vertical className={styles.cartWrapper}>
                    <Flex vertical>
                        {cartInfo?.content?.data?.productList?.map((product) => {
                            return <CartItem key={product.id} item={product} />;
                        })}
                    </Flex>
                    <Flex></Flex>
                </Flex>
            )}
        >
            {children}
        </HeadlessTippy>
    );
};

export default CartComponent;
