import Image from 'next/image';
import LoaderImage from '../../../public/images/general/logo.png';

const PageLoader = () => {

    return(
        <div className="page-loader">
            <div className="page-loader-content">
                <Image src={LoaderImage} alt="Loader" width={120} height={120} style={{ width: 'auto', height: 'auto' }} />
                <span className="page-loader-spinner"></span>
            </div>
        </div>
    )
}

export default PageLoader;