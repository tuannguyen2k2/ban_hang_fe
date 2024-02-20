/* eslint-disable react/prop-types */
import styles from './AppBody.module.scss';
const AppBody = ({ children, width }) => {
    return (
        <main style={{ minWidth: width }} className={styles.main}>
            {children}
        </main>
    );
};

export default AppBody;
