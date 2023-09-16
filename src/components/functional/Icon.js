
export const Icon = ({ icon, className, onClick, hidden, children }) => (
    <span 
        className={"inline material-symbols-outlined "+className}
        onClick={onClick}
    >
        { icon }
        { children }
    </span>
)