import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';
import Image from "next/image";
import SearchIcon from '../../../../../public/images/icons/search.svg';

const SearchHeader = () => {

    const router = useRouter();

    const { t } = useTranslation('header');

    const urlParams = new URLSearchParams(typeof window !== 'undefined' && window.location.search);
    const myParam5 = urlParams.get('keyword');

    const dispatch = useDispatch();


    const [ state, setState ] = useState({
        keyword: myParam5 ? myParam5 : "",
        brand: "",
        cat: "",
        minPrice: "",
        maxPrice: ""
    })

    const [ data, setData ] = useState([]);

    const [ showSearchBox, setShowSearchBox ] = useState(false);

    const [ showLoader, setShowLoader ] = useState(false);

    useEffect(() => {
        setState((old) => ({...old, keyword: myParam5 ? myParam5 : ""}))
    },[router])

    const HandelSubmit = (e) => {

        e.preventDefault();

        if(state.keyword) {
            if(router.pathname !== "/search") {
                router.push(`/search?keyword=${state.keyword}`);
            }else {
                delete router.query.CatId
                delete router.query.BrandId
                delete router.query.minPrice
                delete router.query.maxPrice
                delete router.query.page
                router.query.keyword = state.keyword;
                router.push(router);
            }
            setShowSearchBox(false);
            setData([]);
        }
    }

    return(
        <div className="search-header">
            <form className="search-header-form" id="SerachForm" onSubmit={HandelSubmit}>
                <div className="form-group">
                    <input type="text" id="Search" className="form-control" value={state.keyword} autoComplete="off" placeholder={t('search_for_items')} 
                        onChange={
                            (e) => {
                                setState({keyword : e.target.value});
                        }
                    }/>
                    <button type='submit' className='search-icon' htmlFor='Search'>
                        <Image src={SearchIcon} alt="Search" width={20} height={20} />
                    </button>
                </div>
            </form>
        </div>
       
    )
}

export default SearchHeader;