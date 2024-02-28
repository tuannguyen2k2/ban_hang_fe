import { useEffect } from 'react';
import RenderContext from '../../components/common/RenderContext';
import apiConfig from '../../constants/apiConfig';
import useFetch from '../../hooks/useFetch';
import ProductComponent from '../../layouts/common/desktop/product';
import ProductMobile from '../../layouts/common/mobile/product';
const ProductPage = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const categoryId = searchParams.get('categoryId');
    const kindId = searchParams.get('kindId');
    const {
        data: listProduct,
        execute: executeGetListProduct,
        loading,
    } = useFetch(apiConfig.product.getList, {
        immediate: false,
        mappingData: (res) => res.data.content,
    });
    useEffect(() => {
        if (categoryId) {
            executeGetListProduct({
                params: {
                    categoryId,
                },
            });
        } else if (kindId) {
            executeGetListProduct({
                params: {
                    kindId,
                },
            });
        } else {
            executeGetListProduct();
        }
    }, [categoryId, kindId]);
    return (
        <RenderContext
            components={{ desktop: { defaultTheme: ProductComponent }, mobile: { defaultTheme: ProductMobile } }}
            loading={loading}
            listProduct={listProduct}
        />
    );
};

export default ProductPage;
