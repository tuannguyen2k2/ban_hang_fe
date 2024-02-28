/* eslint-disable react/prop-types */
import styles from './AppBody.module.scss';
const AppBody = ({ children, width }) => {
    return <main className={styles.main}>{children}</main>;
};

export default AppBody;
