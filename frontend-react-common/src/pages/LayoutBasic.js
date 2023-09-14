import '../styles/LayoutBasic.css';

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