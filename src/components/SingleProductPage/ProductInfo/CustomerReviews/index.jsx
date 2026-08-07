import Image from "next/image";
import UserImage from '../../../../../public/images/general/products/user-review.avif';
import { Rating } from 'react-simple-star-rating';
import FullStarRating from "@/utils/ProductBoxTwo/FullStarRating";

const CustomerReviews = ({ UserReviews }) => {

    return (
        <div className="customer-reviews">
            {
                UserReviews.map((item, index) => (
                    <div className="review-box" key={index}>
                        <div className="user-img">
                            <Image src={item.avatar ? item.avatar : UserImage} alt="User Name" width={50} height={50} />
                        </div>
                        <div className="user-review">
                            <h6 className="user-name">{item.user_name}</h6>
                            {/* <Rating readonly={true} initialValue={item.rating} size={15} allowFraction={true}/> */}
                            <FullStarRating
                                rate={item.rating}
                                size={15}
                            />
                            <p className="review-text">{item.comment}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default CustomerReviews;