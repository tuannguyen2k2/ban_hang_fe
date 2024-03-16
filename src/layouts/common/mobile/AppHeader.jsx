/* eslint-disable react/prop-types */
import { Badge, Drawer, Flex, Image, Tooltip } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import { IoBagHandleOutline, IoPersonOutline, IoSearchOutline } from 'react-icons/io5';
import { LuMenu } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import navMenuConfig from '../../../constants/menuConfig';
import { cartSelector } from '../../../selector';
import { setCart } from '../../../store/slice/appSlice';
import NavSider from '../NavSider';
import styles from './AppHeader.module.scss';
import Search from './search/Search';
import logo from '/public/logo.ico';
import locales from '../../../locales';

const AppHeader = () => {
    const [openSearch, setOpenSearch] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const cartInfo = useSelector(cartSelector);
    const dispatch = useDispatch();
    useEffect(() => {
        const timeOutOpenToolTipCart = setTimeout(() => {
            dispatch(setCart({ ...cartInfo, notiAddCartSuccess: false }));
        }, [3000]);
        return () => clearTimeout(timeOutOpenToolTipCart);
    }, [cartInfo]);
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
                    title={<Image preview={false} src={logo} width={45} />}
                    placement='left'
                    onClose={onClose}
                    open={openMenu}
                    width={300}
                    className={styles.drawer}
                >
                    <Flex vertical className={styles.wrapperContentDrawer}>
                        <NavSider mode='inline' className={styles.navSider} setOpenMenu={setOpenMenu} />
                        <Flex vertical className={styles.menu}>
                            {navMenuConfig.map((item) => {
                                return (
                                    <Link to={item?.path} key={item.key} className={styles.labelDrawer}>
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </Flex>
                    </Flex>
                </Drawer>
                <img src={logo} alt='logo' className={styles.logo} />
            </Flex>
            <Flex>
                <button className={styles.itemMenuRight} onClick={() => setOpenSearch(true)}>
                    <IoSearchOutline size={24} />
                </button>
                <Tooltip open={cartInfo.notiAddCartSuccess} title={locales.addCartSuccess} placement={'bottom'}>
                    <button className={styles.itemMenuRight}>
                        <Badge count={cartInfo?.content?.data?.totalQuantity || 0} size='small' showZero>
                            <IoBagHandleOutline size={24} />
                        </Badge>
                    </button>
                </Tooltip>
                <button className={styles.itemMenuRight}>
                    <IoPersonOutline size={24} />
                </button>
            </Flex>
            {openSearch && <Search setOpenSearch={setOpenSearch} />}
        </Header>
    );
};

export default AppHeader;
