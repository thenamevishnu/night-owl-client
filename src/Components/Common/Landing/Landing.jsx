import { trustedBy } from "../../../Constants/api"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"

const Landing = () => {
    return (
        <>
            <Header role={null}/>
            <div className="mt-16 px-2 md:px-10 grid grid-cols-2 bg-main">
                <div className="flex md:justify-start items-center col-span-2 md:col-span-1 justify-center">
                    <div className="text-center">
                        <p className="md:text-4xl text-2xl font-medium text-gray-800 font-primary pt-5 md:pt-0">The Leading Job Board For Developers</p>
                        <button className=" bg-violet-900 mt-6 text-white rounded-full p-1 px-3 ">Get Started</button>
                    </div>
                </div>
                <div className="md:justify-end justify-center col-span-2 md:col-span-1 flex">
                    <img src="./coders.png" alt="right-image" className="flex animate-floating rounded-xl w-96 md:w-auto"/>
                </div>
            </div>

            <div className="p-3 px-2 md:px-10">
                <h1 className="font-primary font-semibold text-center text-gray-800">Trusted By</h1>
                <div className="flex flex-wrap items-center justify-around overflow-x-scroll custom-scroll">
                    {
                        trustedBy && Object.entries(trustedBy).map(([name, url]) => {
                            return(
                                <img key={name} src={url} alt={name} className="w-36 object-cover"/>
                            )
                        })
                    }
                </div>
            </div>

            <div className="px-2 md:px-10 mt-10">
                <h2 className="font-bold font-primary text-center mt-5 text-2xl text-gray-800">Latest Jobs ( <span className=" text-purple-800">Featured</span> )</h2>
                <div className="flex justify-center flex-wrap flex-row gap-5 mt-5">
                    {
                        [1,2,3,4].map(item => {
                            return (
                                <div className="w-72 h-36 bg-gray-300 shadow shadow-gray-500 rounded-2xl"></div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="px-2 md:px-10 mt-10">
                <h1 className=" text-2xl font-primary font-medium text-center text-gray-800">Need something done?</h1>
                <div className="grid gap-5 grid-cols-1 md:grid-cols-2 text-center xl:grid-cols-4 mt-5">
                    <div className="shadow  shadow-gray-600 rounded-2xl p-3">
                        <h3 className="text-xl font-primary font-medium">Post a job</h3>
                        <p className=" font-primary">It’s free and easy to post a job. Simply fill in a title, description and budget and competitive bids come within minutes.</p>
                    </div>
                    <div className="shadow shadow-gray-600 rounded-2xl p-3">
                        <h3 className="text-xl font-primary font-medium">Post a job</h3>
                        <p className=" font-primary">It’s free and easy to post a job. Simply fill in a title, description and budget and competitive bids come within minutes.</p>
                    </div>
                    <div className="shadow shadow-gray-600 rounded-2xl p-3">
                        <h3 className="text-xl font-primary font-medium">Post a job</h3>
                        <p className=" font-primary">It’s free and easy to post a job. Simply fill in a title, description and budget and competitive bids come within minutes.</p>
                    </div>
                    <div className="shadow shadow-gray-600 rounded-2xl p-3">
                        <h3 className="text-xl font-primary font-medium">Post a job</h3>
                        <p className=" font-primary">It’s free and easy to post a job. Simply fill in a title, description and budget and competitive bids come within minutes.</p>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    )
}

export default Landing
