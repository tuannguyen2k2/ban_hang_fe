/* eslint-disable react/prop-types */
import { Menu } from 'antd';
import locales from '../../locales';
import SubMenu from 'antd/es/menu/SubMenu';
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import apiConfig from '../../constants/apiConfig';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes/index';
import styles from './NavSider.module.scss';
const NavSider = ({ mode = 'vertical', className, setOpenMenu }) => {
    const searchParams = new URLSearchParams(window.location.search);
    const categoryId = searchParams.get('categoryId');
    const kindId = searchParams.get('kindId');
    const { data: listCategory } = useFetch(apiConfig.category.getList, {
        immediate: true,
        mappingData: (res) => res.data.content,
    });
    const [selectedKey, setSelectedKey] = useState(locales.allProduct);
    const [openKeys, setOpenKeys] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (categoryId) {
            setSelectedKey(categoryId);
        } else if (kindId) {
            setSelectedKey(kindId);
        } else {
            setSelectedKey(locales.allProduct);
        }
    }, [categoryId, kindId]);

    const handleOpenChange = (keys) => {
        // Đảm bảo chỉ mở một submenu duy nhất
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestOpenKey) {
            setOpenKeys([latestOpenKey]);
        } else {
            setOpenKeys(keys);
        }
    };
    const handleClickAllProduct = (e) => {
        navigate(routes.productPage.path);
        if (mode != 'vertical') setOpenMenu(false);
    };
    const handleClickCategory = (categoryId) => {
        navigate(routes.productPage.path + `?categoryId=${categoryId}`);
    };
    const handleClickKind = (kindId) => {
        navigate(routes.productPage.path + `?kindId=${kindId}`);
        if (mode != 'vertical') setOpenMenu(false);
    };
    const renderSubMenu = (menuItems) => {
        return menuItems?.map((menuItem) => {
            if (menuItem?.kinds && menuItem?.kinds?.length > 0) {
                return (
                    <SubMenu
                        key={menuItem?._id}
                        title={menuItem?.name.toUpperCase()}
                        onTitleClick={() => mode == 'vertical' && handleClickCategory(menuItem?._id)}
                    >
                        {renderSubMenu(menuItem?.kinds)}
                    </SubMenu>
                );
            } else {
                return (
                    <Menu.Item key={menuItem?._id} onClick={() => handleClickKind(menuItem?._id)}>
                        {menuItem?.name.toUpperCase()}
                    </Menu.Item>
                );
            }
        });
    };
    return (
        <Menu
            mode={mode}
            className={className}
            openKeys={openKeys}
            onOpenChange={handleOpenChange}
            selectedKeys={mode == 'vertical' && [selectedKey]}
        >
            <Menu.Item key={locales.allProduct} onClick={handleClickAllProduct}>
                {locales.allProduct.toUpperCase()}
            </Menu.Item>
            {renderSubMenu(listCategory)}
        </Menu>
    );
};

export default NavSider;
