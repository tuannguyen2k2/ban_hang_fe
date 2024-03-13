/* eslint-disable react/prop-types */
import { Flex, Image } from 'antd';
import styles from './Home.module.scss';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
const HomeComponent = ({ listBanner }) => {
    const AutoplaySlider = withAutoplay(AwesomeSlider);
    return (
        <AutoplaySlider animation='foldOutAnimation' play={true} interval={2000} className={styles.wrapper}>
            {listBanner?.map((banner) => {
                return (
                    <div key={banner?.url}>
                        <Image
                            src={banner?.url}
                            preview={false}
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        />
                    </div>
                );
            })}
        </AutoplaySlider>
    );
};

export default HomeComponent;
