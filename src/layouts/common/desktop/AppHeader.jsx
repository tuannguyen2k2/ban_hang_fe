/* eslint-disable react/prop-types */
import locales from '../../../locales';
import { Badge, Drawer, Flex, Image, Menu } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { IoBagHandleOutline, IoPersonOutline } from 'react-icons/io5';
import { LuMenu } from 'react-icons/lu';
import styles from './AppHeader.module.scss';
import Search from './search/Search';
import logo from '/public/logo.ico';
import { useMemo, useState } from 'react';
import navMenuConfig from '../../../constants/menuConfig';
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
import { storageKeys } from '../../../constants';
import NavSider from '../NavSider';
const AppHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const activeNav = useMemo(() => {
        const activeNav = findActiveNav(navMenuConfig);

        if (activeNav) {
            return activeNav;
        }

        return {
            selectedKeys: [],
            openKeys: [],
        };
    }, [location.pathname]);

    function handleMenuItemClick(item) {
        let selectedNav;
        navMenuConfig.map((navItem) => {
            if (navItem.key === item.key) selectedNav = navItem;
            else if (navItem.children) {
                navItem.children.map((navChild) => {
                    if (navChild.key === item.key) selectedNav = navChild;
                });
            }
        });

        navigate(selectedNav?.path);
    }

    function findActiveNav(navs) {
        for (const nav of navs) {
            if (nav.children) {
                const activeItem = findActiveNav(nav.children);
                if (activeItem) {
                    return {
                        selectedKeys: activeItem.selectedKeys,
                        openKeys: [nav.key, ...activeItem.openKeys],
                    };
                }
            } else if (matchPath(nav.path + '/*', location.pathname)) {
                return {
                    selectedKeys: [nav.key],
                    openKeys: [],
                };
            }
        }

        // return defaultOpenNav;
    }

    const [openMenu, setOpenMenu] = useState(false);
    const showMenu = () => {
        setOpenMenu(true);
    };
    const onClose = () => {
        setOpenMenu(false);
    };

    return (
        <Header className={styles.appHeader} style={{ background: 'white' }}>
            <div className={styles.wrapperHeader}>
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
                        <NavSider mode='inline' className={styles.navSider} />
                        <Flex vertical className={styles.wrapperContentDrawer}>
                            {navMenuConfig.map((item) => {
                                return (
                                    <Link
                                        to={item?.path}
                                        key={item.key}
                                        className={styles.labelDrawer}
                                        onClick={() => handleMenuItemClick(item)}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </Flex>
                    </Drawer>
                    <img src={logo} alt='logo' className={styles.logo} />
                </Flex>
                <Menu
                    className={styles.navMenu}
                    mode='horizontal'
                    defaultSelectedKeys={activeNav.selectedKeys}
                    defaultOpenKeys={activeNav.openKeys}
                    selectedKeys={activeNav.selectedKeys}
                    items={navMenuConfig.map((item) => ({
                        ...item,
                        label: (
                            <Link
                                to={item?.path}
                                className={styles.labelNavMenu}
                                onClick={() => handleMenuItemClick(item)}
                            >
                                {item.label}
                            </Link>
                        ),
                    }))}
                />
                <Search />
                <Flex justify='flex-end' className={styles.menuRight}>
                    <button className={styles.itemMenuRight}>
                        <Badge count={1} size='small'>
                            <IoBagHandleOutline size={24} />
                        </Badge>
                    </button>
                    <button className={styles.itemMenuRight}>
                        <IoPersonOutline size={24} />
                    </button>
                </Flex>
            </div>
        </Header>
    );
};

export default AppHeader;
