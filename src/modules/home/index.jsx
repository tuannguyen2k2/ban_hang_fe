import RenderContext from '../../components/common/RenderContext';
import apiConfig from '../../constants/apiConfig';
import useFetch from '../../hooks/useFetch';
import HomeComponent from '../../layouts/common/desktop/home';
import HomeMobile from '../../layouts/common/mobile/home';

const HomePage = () => {
    const { data: banner } = useFetch(apiConfig.setting.getList, {
        immediate: true,
        mappingData: (res) => res.data.content[0]?.banner,
    });
    return (
        <RenderContext
            components={{ desktop: { defaultTheme: HomeComponent }, mobile: { defaultTheme: HomeMobile } }}
            listBanner={banner}
        />
    );
};

export default HomePage;
