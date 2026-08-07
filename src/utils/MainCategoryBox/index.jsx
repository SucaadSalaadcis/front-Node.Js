import Image from "next/image";
import Link from "next/link";

const MainCategoryBox = ({name, slug, image}) => {

    return(
        <Link href={{ pathname: "/search", query: { CatId: slug  } }} className="main-cat-box">
            <Image src={image} alt={name} className="img-fluid" width={200} height={200} />
            <h4 className="sub-title">{name}</h4>
        </Link>
    )
}

export default MainCategoryBox;