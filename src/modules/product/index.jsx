import RenderContext from '../../components/common/RenderContext';
import ProductComponent from '../../layouts/common/desktop/product';
const ProductPage = () => {
    return <RenderContext components={{ desktop: { defaultTheme: ProductComponent } }} />;
};

export default ProductPage;
