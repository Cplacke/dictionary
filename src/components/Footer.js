import React, { Component }from "react";

class Footer extends Component {
    render() { 
        return (
            <div className="text-normal text-center bg-gray-100 p-10 lg:px-0">
                <div className="w-full lg:w-3/5 m-auto" > 
                    build by 
                        <a href="mailto:cplacke@gmail.com" className="text-pink-500 mx-2 hover:underline"> 
                            cplacke@gmail.com 
                        </a>
                    <br/>
                    let me know if you love it
                </div>
                <span className="text-sm text-gray-500"> Placketaffy 2023 </span>
                <div className="text-sm text-gray-500"> Built with React, Tailwind, and Deno </div>
            </div>
        );
    }
}

export default Footer;