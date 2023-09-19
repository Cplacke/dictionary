
export const Icon = ({ icon, className, onClick, hidden, children, style }) => (
    <span 
        className={"inline material-symbols-outlined "+className}
        style={style}
        onClick={onClick}
    >
        { icon }
        { children }
    </span>
)