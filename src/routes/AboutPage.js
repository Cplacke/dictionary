import { Navigation } from "../components/functional/Navigation";
import { useEffect, useState } from "react"
import { getVersion } from "../services/backend-service";

export const AboutPage = () => {

    const [ version, setVersion ] = useState('');
    const [ buildDate, setBuildDate ] = useState(new Date().toISOString());

    useEffect(() => {
        const versionApiCall = async() => {
            const version = await getVersion()
            setVersion(version)
        }
        versionApiCall();
    }, [])

    return (
        <div className="">
            <Navigation/>
            <div className="text-3xl h-full my-24 text-pink-700 font-mono text-center">
                <div> { version || '?' } </div>
                <div> { buildDate } </div>
            </div>
        </div>
    )
}