/* eslint-disable react/prop-types */
import { Badge, Drawer, Dropdown, Flex, Image, Menu, Tooltip } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useEffect, useMemo, useState } from 'react';
import { IoBagHandleOutline, IoPersonOutline } from 'react-icons/io5';
import { LuMenu } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
import navMenuConfig from '../../../constants/menuConfig';
import useAuth from '../../../hooks/useAuth';
import useNotification from '../../../hooks/useNotification';
import locales from '../../../locales';
import { cartSelector } from '../../../selector';
import { removeCacheToken } from '../../../services/userService';
import { getData } from '../../../utils/localStorage';
import NavSider from '../NavSider';
import styles from './AppHeader.module.scss';
import Search from './search/Search';
import logo from '/public/logo.ico';
import { setCart } from '../../../store/slice/appSlice';
const AppHeader = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const notification = useNotification();
    const { isAuthenticated } = useAuth();
    const cartInfo = useSelector(cartSelector);
    const dispatch = useDispatch();
    useEffect(() => {
        const timeOutOpenToolTipCart = setTimeout(() => {
            dispatch(setCart({ ...cartInfo, notiAddCartSuccess: false }));
        }, [3000]);
        return () => clearTimeout(timeOutOpenToolTipCart);
    }, [cartInfo]);

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

    const showMenu = () => {
        setOpenMenu(true);
    };
    const onClose = () => {
        setOpenMenu(false);
    };

    const handleLogout = () => {
        removeCacheToken();
        window.location.reload();
        notification({
            type: 'success',
            title: locales.information,
            message: locales.logoutSuccess,
        });
    };

    const itemAuthDropDown = [
        {
            key: isAuthenticated ? locales.profile : locales.signIn,
            label: isAuthenticated ? (
                <Link to='/profile'>{locales.profile}</Link>
            ) : (
                <Link to='/sign-in'>{locales.signIn}</Link>
            ),
        },
        {
            key: isAuthenticated ? locales.logout : locales.signUp,
            label: isAuthenticated ? (
                <div onClick={handleLogout}>{locales.logout}</div>
            ) : (
                <Link to='/sign-up'>{locales.signUp}</Link>
            ),
        },
    ];
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
                        <NavSider mode='inline' className={styles.navSider} setOpenMenu={setOpenMenu} />
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
                    <Tooltip open={cartInfo.notiAddCartSuccess} title={locales.addCartSuccess} placement={'bottom'}>
                        <button className={styles.itemMenuRight}>
                            <Badge count={cartInfo?.content?.data?.totalQuantity || 0} size='small' showZero>
                                <IoBagHandleOutline size={24} />
                            </Badge>
                        </button>
                    </Tooltip>
                    <Dropdown trigger={['click']} overlay={<Menu items={itemAuthDropDown} />} placement='bottom'>
                        <button className={styles.itemMenuRight}>
                            <IoPersonOutline size={24} />
                        </button>
                    </Dropdown>
                </Flex>
            </div>
        </Header>
    );
};

export default AppHeader;
