/* eslint-disable react/prop-types */
import { Fragment } from 'react';
import useDevices from '../../hooks/useDevices';
import AppHeaderMobile from './mobile/AppHeader';
import styles from './DefaultLayout.module.scss';
import AppBody from './AppBody';
import AppHeaderDesktop from './desktop/AppHeader';

const DefaultLayout = ({ children }) => {
    const { isMobile } = useDevices();
    return (
        <Fragment>
            {isMobile ? (
                <div className={styles.masterLayout} id='layout'>
                    <AppHeaderMobile />
                    <AppBody width='100%'>{children}</AppBody>
                </div>
            ) : (
                <div className={styles.masterLayout} id='layout'>
                    <AppHeaderDesktop />
                    <AppBody width='100%'>{children}</AppBody>
                </div>
            )}
        </Fragment>
    );
};

export default DefaultLayout;
