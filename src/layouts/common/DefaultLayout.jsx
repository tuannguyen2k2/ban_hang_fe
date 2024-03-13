/* eslint-disable react/prop-types */
import { Fragment, useEffect } from 'react';
import useDevices from '../../hooks/useDevices';
import AppHeaderMobile from './mobile/AppHeader';
import styles from './DefaultLayout.module.scss';
import AppBody from './AppBody';
import AppHeaderDesktop from './desktop/AppHeader';
import useFetch from '../../hooks/useFetch';
import apiConfig from '../../constants/apiConfig';
import { useDispatch } from 'react-redux';
import { setCategory } from '../../store/slice/appSlice';

const DefaultLayout = ({ children }) => {
    const { isMobile } = useDevices();
    const dispatch = useDispatch();
    const { data: listCategory, loading: loadingCategory } = useFetch(apiConfig.category.getList, {
        immediate: true,
        mappingData: (res) => res.data.content,
    });
    useEffect(() => {
        dispatch(setCategory({ listCategory: listCategory, loadingCategory: loadingCategory }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listCategory, loadingCategory]);
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
