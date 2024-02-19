/* eslint-disable react/prop-types */
import { Badge, Menu } from 'antd';
import Search from 'antd/es/input/Search';
import { Header } from 'antd/es/layout/layout';
import { IoPersonOutline, IoBagHandleOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { removeCacheAccessToken } from '../../services/userService';
import { logout } from '../../store/slice/accountSlice';
import styles from './AppHeader.module.scss';
import logo from '/public/logo.ico';

const AppHeader = ({ collapsed, onCollapse }) => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        removeCacheAccessToken();
        dispatch(logout());
    };
    const items = [
        {
            label: <span className={styles.label}>Trang chủ</span>,
        },
        {
            label: <span className={styles.label}>Sản phẩm</span>,
        },
        {
            label: <span className={styles.label}>Cửa hàng</span>,
        },
        {
            label: <span className={styles.label}>Giới thiệu</span>,
        },
    ];
    return (
        <Header className={styles.appHeader} style={{ background: 'white' }}>
            <img src={logo} alt='logo' className={styles.logo} />
            <Menu mode='horizontal' defaultSelectedKeys={['2']} items={items} style={{ width: '450px' }} />
            <Search
                placeholder='Tìm kiếm sản phẩm...'
                style={{
                    width: 200,
                }}
                enterButton={false}
            />
            <div style={{ display: 'flex' }}>
                <button className={styles.menuRight}>
                    <Badge count={1} size='small'>
                        <IoBagHandleOutline size={20} />
                    </Badge>
                </button>
                <button className={styles.menuRight}>
                    <IoPersonOutline size={20} />
                </button>
            </div>
        </Header>
    );
};

export default AppHeader;
