
export const Icon = ({ icon, className, onClick, hidden }) => (
    <span 
        className={"inline material-symbols-outlined "+className}
        onClick={onClick}
    >
        { icon }
    </span>
)