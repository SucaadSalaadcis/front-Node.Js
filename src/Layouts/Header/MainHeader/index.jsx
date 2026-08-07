import Image from "next/image";
import Link from "next/link";
import Logo from '../../../../public/images/general/logo.png'
import AuthHeader from "./AuthHeader";
import SearchHeader from "./SearchHeader";

const MainHeader = () => {

    return(
        // <div className="main-header">
        //     <div className="container">
        //         <div className="row align-items-center">
        //             <div className="col-md-2">
        //                 <div className="brand">
        //                     <Link href="/">
        //                         <Image src={Logo} alt="Elfergany" width={103} height={102} priority style={{ width: 'auto', height: 'auto' }} />
        //                     </Link>
        //                 </div>
        //             </div>
        //             <div className="col-md-6">
        //                 <SearchHeader />
        //             </div>
        //             <div className="col-md-4">
        //                 <AuthHeader />
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div>Hello from main Header </div>
    )
}

export default MainHeader;