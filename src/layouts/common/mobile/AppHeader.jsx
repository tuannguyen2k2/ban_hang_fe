/* eslint-disable react/prop-types */
import { Badge, Drawer, Flex, Image } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useState } from 'react';
import { IoBagHandleOutline, IoPersonOutline, IoSearchOutline } from 'react-icons/io5';
import { LuMenu } from 'react-icons/lu';
import navMenuConfig from '../../../constants/menuConfig';
import styles from './AppHeader.module.scss';
import Search from './search/Search';
import logo from '/public/logo.ico';
import { Link } from 'react-router-dom';
import { storageKeys } from '../../../constants';
import NavSider from '../NavSider';

const AppHeader = () => {
    const [openSearch, setOpenSearch] = useState(false);

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
                    <LuMenu size={28} />
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
                        {navMenuConfig.map((item) => {
                            return (
                                <Link to={item?.path} key={item.key} className={styles.labelDrawer}>
                                    {item.label}
                                </Link>
                            );
                        })}
                    </Flex>
                </Drawer>
                <img src={logo} alt='logo' className={styles.logo} />
            </Flex>
            <Flex>
                <button className={styles.itemMenuRight} onClick={() => setOpenSearch(true)}>
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
            {openSearch && <Search setOpenSearch={setOpenSearch} />}
        </Header>
    );
};

export default AppHeader;
