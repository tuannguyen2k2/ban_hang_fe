import { useEffect } from 'react';
import RenderContext from '../../components/common/RenderContext';
import apiConfig from '../../constants/apiConfig';
import useFetch from '../../hooks/useFetch';
import ProductComponent from '../../layouts/common/desktop/product';
import ProductMobile from '../../layouts/common/mobile/product';
import { DEFAULT_PAGE_SIZE } from '../../constants';
const ProductPage = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const categoryId = searchParams.get('categoryId');
    const kindId = searchParams.get('kindId');
    const page = searchParams.get('page');
    const paramDefault = { pageSize: DEFAULT_PAGE_SIZE };
    const {
        data: products,
        execute: executeGetProducts,
        loading,
    } = useFetch(apiConfig.product.getList, {
        immediate: false,
        params: paramDefault,
        mappingData: (res) => {
            const listProduct = res.data.content;
            if (listProduct?.length > 0) {
                const isEven = Math.ceil(listProduct.length % 2) != 1;
                if (!isEven) {
                    listProduct.push({
                        _id: null,
                        image: [null],
                    });
                }
            }
            return {
                listProduct,
                totalElements: res.data.totalElements,
                totalPages: res.data.totalPages,
            };
        },
    });
    useEffect(() => {
        if (categoryId) {
            executeGetProducts({
                params: {
                    ...paramDefault,
                    categoryId,
                    page,
                },
            });
        } else if (kindId) {
            executeGetProducts({
                params: {
                    ...paramDefault,
                    kindId,
                    page,
                },
            });
        } else {
            executeGetProducts({
                params: {
                    ...paramDefault,
                    page,
                },
            });
        }
    }, [categoryId, kindId, page]);
    return (
        <RenderContext
            components={{ desktop: { defaultTheme: ProductComponent }, mobile: { defaultTheme: ProductMobile } }}
            loading={loading}
            listProduct={products?.listProduct}
            totalElements={products?.totalElements}
            totalPages={products?.totalPages}
            currentPage={page}
        />
    );
};

export default ProductPage;
