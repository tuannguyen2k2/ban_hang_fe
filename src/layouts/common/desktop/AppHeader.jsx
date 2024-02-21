/* eslint-disable react/prop-types */
import { Badge, Flex, Input, Menu } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { IoBagHandleOutline, IoPersonOutline, IoSearchOutline } from 'react-icons/io5';
import { LuMenu } from 'react-icons/lu';
import locales from '../../../locales';
import styles from './AppHeader.module.scss';
import logo from '/public/logo.ico';
import Search from './Search';

const AppHeader = () => {
    const items = [
        {
            label: <span className={styles.label}>{locales.home}</span>,
            key: locales.home,
        },
        {
            label: <span className={styles.label}>{locales.product}</span>,
            key: locales.product,
        },
        {
            label: <span className={styles.label}>{locales.store}</span>,
            key: locales.store,
        },
        {
            label: <span className={styles.label}>{locales.introduction}</span>,
            key: locales.introduction,
        },
    ];
    return (
        <Header className={styles.appHeader} style={{ background: 'white' }}>
            <Flex align='center'>
                <button className={styles.menuButton}>
                    <LuMenu size={50} />
                </button>
                <img src={logo} alt='logo' className={styles.logo} />
            </Flex>
            <Menu className={styles.navMenu} mode='horizontal' defaultSelectedKeys={[locales.home]} items={items} />
            <Search />
            <Flex justify='center' className={styles.menuRight}>
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
