/* eslint-disable react/prop-types */
import { Badge, Menu } from 'antd';
import Search from 'antd/es/input/Search';
import { Header } from 'antd/es/layout/layout';
import { IoBagHandleOutline, IoPersonOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import styles from './AppHeader.module.scss';
import logo from '/public/logo.ico';
import locales from '../../../locales';

const AppHeader = ({ collapsed, onCollapse }) => {
    const dispatch = useDispatch();
    const items = [
        {
            label: <span className={styles.label}>{locales.home}</span>,
        },
        {
            label: <span className={styles.label}>{locales.product}</span>,
        },
        {
            label: <span className={styles.label}>{locales.store}</span>,
        },
        {
            label: <span className={styles.label}>{locales.introduction}</span>,
        },
    ];
    return (
        <Header className={styles.appHeader} style={{ background: 'white' }}>
            <img src={logo} alt='logo' className={styles.logo} />
            <Menu
                className={styles.navMenu}
                mode='horizontal'
                defaultSelectedKeys={['2']}
                items={items}
                style={{ width: '450px' }}
            />
            <Search className={styles.search} placeholder={locales.searchProductPlaceHolder} />
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
