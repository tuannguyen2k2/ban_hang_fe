import { ConfigProvider } from 'antd';
import AppRoutes from './routes/routes';
import { ThemeProvider } from 'react-bootstrap';

function App() {
    return (
        <ThemeProvider>
            <ConfigProvider
                theme={{
                    token: {
                        fontFamily: 'Mulish',
                    },
                }}
            >
                <AppRoutes />
            </ConfigProvider>
        </ThemeProvider>
    );
}

export default App;
