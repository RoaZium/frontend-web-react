import '../styles/LayoutPage.css';
import Box from '@mui/material/Box';

function SideMenu({children}) {
    return (
        <Box className='leftMenu' sx={{bgcolor: 'warning.light'}}>
            {children}
        </Box>
    );
}

function PageContent({children}) {
    return (
        <Box className='pageContent' sx={{bgcolor: 'background.default'}}>
            {children}
        </Box>
    );
}

function ValueContent({children}) {

    return (
        <Box className='valueContent' sx={{bgcolor: 'warning.light'}}>
            {children}
        </Box>
    );
}


function LayoutPage({children}) {
    return (
        <Box className='layOutPage'>
            {children}
        </Box>
    );
}

export { SideMenu, PageContent, ValueContent, LayoutPage }