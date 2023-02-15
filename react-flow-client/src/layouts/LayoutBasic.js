import '../styles/LayoutBasic.css';
import Box from '@mui/material/Box';

function Content({children}) {
    return (
        <div className="InBasic">
            {children}
        </div>
    );
}

function LayoutBasic({children}) {
    return (
        <div className="OutBasic">
            {children}
        </div>
    );
}

export { Content, LayoutBasic }