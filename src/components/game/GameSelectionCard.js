import { Icon } from '../index'

export const GameSelectionCard = ({
    title,
    term,
    icon,
    description,
    play
}) => {

    return (
        <div className="card mb-8 mr-2 bg-stripped w-full flex md:w-5/12 md:mx-auto ">
            <div className="bg-primary-100 bg-contain" 
                // style={{ 
                //     backgroundImage: `url("${src}")` || '',
                //     backgroundPositionX: '50%'
                // }}
            >
                <div className="text-primary-700 p-2 md:p-4 text-2xl flex items-center"> 
                    { title } 
                    <Icon icon={icon} className="ml-auto text-gray-900 text-4xl opacity-70"/>
                </div>
                <div className="text-black p-2 pt-0"> { description } </div>
                <div className="flex align-end ml-2"> 
                        {/* <img src={src} className="mx-auto" /> */}
                    <div className="card card-sm block ml-auto mr-4 my-2"
                        onClick={play}
                    > 
                        <div className="text-white bg-primary-500 hover:bg-primary-600 px-20 py-2 text-center cursor-pointer">
                            PLAY
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}