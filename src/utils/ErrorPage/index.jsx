import Image from 'next/image';
import Link from 'next/link';
import ErrorIcon from '../../../public/images/general/error.svg';

const ErrorPage = () => {

    return(
        <section className="error-page">
            <div className="container">
                <Image src={ErrorIcon} alt="Error Result" width={500} height={400} />
                <p className='error-text'>Something went wrong while displaying this page, please try again later</p>
                <Link href="/" className='error-btn'>Back to Homepage</Link>
            </div>
        </section>
    )
}

export default ErrorPage;