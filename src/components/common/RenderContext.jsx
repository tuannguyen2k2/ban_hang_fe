import useDevices from '../../hooks/useDevices';
import DefaultLayout from '../../layouts/common/DefaultLayout';

/* eslint-disable react/prop-types */
const RenderContext = ({ layout, components, layoutProps, ...props }) => {
    const { isMobile } = useDevices();
    const ComponentLayout = layout?.defaultTheme || DefaultLayout;
    const ComponentRender = isMobile ? components?.mobile?.defaultTheme : components?.desktop?.defaultTheme;
    return (
        <ComponentLayout layoutProps={layoutProps}>
            <ComponentRender {...props} />
        </ComponentLayout>
    );
};

export default RenderContext;
