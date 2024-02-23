/* eslint-disable react/prop-types */
import locales from '../../../locales';
import { Badge, Drawer, Flex, Image, Menu } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { IoBagHandleOutline, IoPersonOutline } from 'react-icons/io5';
import { LuMenu } from 'react-icons/lu';
import styles from './AppHeader.module.scss';
import Search from './search/Search';
import logo from '/public/logo.ico';
import { useState } from 'react';
const AppHeader = () => {
    const items = [
        {
            label: locales.home,
            key: locales.home,
        },
        {
            label: locales.product,
            key: locales.product,
        },
        {
            label: locales.store,
            key: locales.store,
        },
        {
            label: locales.introduction,
            key: locales.introduction,
        },
    ];

    const [openMenu, setOpenMenu] = useState(false);
    const showMenu = () => {
        setOpenMenu(true);
    };
    const onClose = () => {
        setOpenMenu(false);
    };
    return (
        <Header className={styles.appHeader} style={{ background: 'white' }}>
            <Flex align='center'>
                <button className={styles.menuButton} onClick={showMenu}>
                    <LuMenu size={50} />
                </button>
                <Drawer
                    title={<Image src={logo} width={45} />}
                    placement='left'
                    onClose={onClose}
                    open={openMenu}
                    width={300}
                    className={styles.drawer}
                >
                    <Flex vertical className={styles.wrapperContentDrawer}>
                        {items.map((item) => {
                            return (
                                <span key={item.key} className={styles.labelDrawer}>
                                    {item.label}
                                </span>
                            );
                        })}
                    </Flex>
                </Drawer>
                <img src={logo} alt='logo' className={styles.logo} />
            </Flex>
            <Menu
                className={styles.navMenu}
                mode='horizontal'
                defaultSelectedKeys={[locales.home]}
                items={items.map((item) => ({
                    ...item,
                    label: <span className={styles.labelNavMenu}>{item.label}</span>,
                }))}
            />
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
