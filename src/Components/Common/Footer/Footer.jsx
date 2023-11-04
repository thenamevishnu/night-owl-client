
const Footer = () => {
    return (
        <div className="bg-black mt-10 pt-10 text-white text-center">
            <div className="justify-center flex items-center gap-5">
                Follow US: 
                <i className="fab fa-instagram text-4xl"></i>
                <i className="fab fa-twitter text-4xl"></i>
                <i className="fab fa-github text-4xl"></i>
                <i className="fab fa-linkedin text-4xl"></i>
            </div>
            <div className="mt-5 grid grid-cols-2 md:grid-cols-4">
                <p>About US</p>
                <p>Privacy & Policy</p>
                <p>Terms & Conditions</p>
                <p>Contact US</p>
            </div>
            <div className="mx-2 md:mx-10 mt-5 border-b-2 border-b-gray-300"></div>
            <div className="mt-5"><i className="fa fa-copyright"></i> Copyright 2022-2023 | Designed by vishnu</div>
        </div>
    )
}

export default Footer
