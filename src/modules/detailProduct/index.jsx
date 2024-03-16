import { useParams } from 'react-router-dom';
import RenderContext from '../../components/common/RenderContext';
import apiConfig from '../../constants/apiConfig';
import useFetch from '../../hooks/useFetch';
import DetailProductComponent from '../../layouts/common/desktop/detailProduct';
import DetailProductMobile from '../../layouts/common/mobile/detailProduct';

const DetailProductPage = () => {
    const { id } = useParams();
    const { data: detail } = useFetch(apiConfig.product.getById, {
        immediate: true,
        mappingData: (res) => res.data,
        pathParams: { id },
    });
    return (
        <RenderContext
            components={{
                desktop: { defaultTheme: DetailProductComponent },
                mobile: { defaultTheme: DetailProductMobile },
            }}
            detailProduct={detail}
        />
    );
};

export default DetailProductPage;
