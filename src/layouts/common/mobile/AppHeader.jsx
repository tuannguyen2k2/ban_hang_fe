/* eslint-disable react/prop-types */
import { Badge, Flex } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { IoBagHandleOutline, IoPersonOutline, IoSearchOutline } from 'react-icons/io5';
import { LuMenu } from 'react-icons/lu';
import styles from './AppHeader.module.scss';
import logo from '/public/logo.ico';

const AppHeader = () => {
    return (
        <Header className={styles.appHeader} style={{ background: 'white' }}>
            <Flex align='center'>
                <button className={styles.menuButton}>
                    <LuMenu size={28} />
                </button>
                <img src={logo} alt='logo' className={styles.logo} />
            </Flex>
            <Flex>
                <button className={styles.itemMenuRight}>
                    <IoSearchOutline size={24} />
                </button>
                <button className={styles.itemMenuRight}>
                    <Badge count={1} size='small'>
                        <IoBagHandleOutline size={24} />
                    </Badge>
                </button>
                <button className={styles.itemMenuRight}>
                    <IoPersonOutline size={24} />
                </button>
            </Flex>
        </Header>
    );
};

export default AppHeader;
