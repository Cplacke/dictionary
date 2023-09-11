export const ImageCard = ({ url, className, caption }) => {
    
    return (
        <div className={"flex "+className}>
            <div className={"card bg-stripped mx-auto"}>
                <img
                    className="w-full rounded-sm"
                    src={url}
                />
            </div>
        </div>
    )
};
