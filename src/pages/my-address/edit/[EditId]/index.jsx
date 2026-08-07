import { useState, useEffect } from "react";
import Sidebar from "@/Layouts/Sidebar";
import AccountTitle from "@/utils/AccountTitle";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { UserDataHandler } from "@/redux/actions/AuthApi";
import { useRouter } from "next/router";
import { LocalKeys } from "@/helpers/Config";
import AccountLoader from "@/utils/AccountLoader";
import { CitiesDataHandler, StatesDataHandler } from "@/redux/actions/CountriesApi";
import { EditAddressDataHandler } from "@/redux/actions/AddressApi";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next';
import Head from "next/head";

const EditAddress = () => {

    const router = useRouter();

    const { t } = useTranslation('address');

    const { EditId } = router.query;

    const dispatch = useDispatch();

    const [ loader, setLoader ] = useState(true);

    const [ showLoader, setShowLoader ] = useState(false);

    const { UserAddresses } = useSelector(state => state.userProfile);

    const { CitiesData, StatesData } = useSelector(state => state.countries);

    const [ regions, setRegions ] = useState([]);

    const [ state, setState ] = useState({
        address_id: parseInt(EditId),
        country_id : "1",
        state_id : "",
        city_id : "",
        street : "",
        building_number : "",
        floor : "",
        apartment : "",
        landmark : "",
        address_name : ""
    })

    const [ errors, setErrors ] = useState({
        state_id : "",
        city_id : "",
        street : "",
        building_number : "",
        floor : "",
        apartment : "",
        landmark : "",
        address_name : ""
    })

    useEffect(() => {
        if(!localStorage.getItem(LocalKeys.TOKEN)) {
            router.push('/login');
        }else {
            dispatch(UserDataHandler(() => {
                setLoader(false);
            }));
        }
    },[])

    useEffect(() => {
        dispatch(CitiesDataHandler());
        dispatch(StatesDataHandler());
    },[])

    useEffect(() => {
        const GetStates = StatesData.filter(item => item.state.id === parseInt(state.state_id));
        setRegions(GetStates);
    },[state.state_id])

    const SingleAddress = UserAddresses.find(item => item.id === parseInt(EditId));

    useEffect(() => {
        setState({
            address_id: parseInt(EditId),
            country_id :"1",
            state_id : SingleAddress?.state_id,
            city_id : SingleAddress?.city_id,
            street : SingleAddress?.street,
            building_number : SingleAddress?.building_number,
            floor : SingleAddress?.floor,
            apartment : SingleAddress?.apartment,
            landmark : SingleAddress?.landmark,
            address_name : SingleAddress?.address_name
        })
    },[UserAddresses])

    const HandelValidation = () => {

        let Valid = true;

        if(state.state_id === "") {

            setErrors((old) => ({...old, state_id : t('the_government_field_is_required')}));
            Valid = false;
        }

        if(state.city_id === "") {

            setErrors((old) => ({...old, city_id : t('the_city_field_is_required')}));
            Valid = false;
        }

        if(state.street === "") {

            setErrors((old) => ({...old, street : t('the_street_field_is_required')}));
            Valid = false;
        }

        if(state.building_number === "") {

            setErrors((old) => ({...old, building_number : t('the_building_number_field_is_required')}));
            Valid = false;
        }

        if(state.floor === "") {

            setErrors((old) => ({...old, floor : t('the_floor_number_field_is_required')}));
            Valid = false;
        }

        if(state.apartment === "") {

            setErrors((old) => ({...old, apartment : t('the_apartment_number_field_is_required')}));
            Valid = false;
        }

        if(state.landmark === "") {

            setErrors((old) => ({...old, landmark : t('the_landmark_field_is_required')}));
            Valid = false;
        }

        if(state.address_name === "") {

            setErrors((old) => ({...old, address_name : t('the_address_name_field_is_required')}));
            Valid = false;
        }

        return Valid;
    }

    const HandelSubmit = (e) => {
        e.preventDefault();
        if(HandelValidation()) {
            setShowLoader(true);
            dispatch(EditAddressDataHandler(state, () => {
                router.push('/my-address');
            }, () => {
                setShowLoader(false);
            }))
        }
    }

    return(
        <>
            <Head>
                <title>{`${t('address:edit_address')} - ${t('common:site_name')}`}</title>
                <meta name="description" content="El Fergany Hyper Market" />
                <meta property="og:title" content="" />
                <meta property="og:type" content="" />
                <meta property="og:url" content="" />
                <meta property="og:image" content="" />
                <link rel="icon" href="/fav.png" />
            </Head>
            <section className="overview">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <Sidebar />
                        </div>
                        <div className="col-md-9">
                            <AccountTitle title={t('edit_address')} />
                            {
                                loader ? <AccountLoader /> : 
                                <form className="user-form" onSubmit={HandelSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="Governate">{t('government')}</label>
                                                <select className="form-select form-control" value={state.state_id} onChange={
                                                    (e) => {
                                                        const Text = e.target.value;
                                                        setState((old) => ({...old, state_id : Text}));
                                                        setErrors((old) => ({...old, state_id  : ""}));
                                                    }
                                                }>
                                                    <option value="">{t('government')}</option>
                                                    {
                                                        CitiesData.map(item => (
                                                            <option value={item.id} key={item.id}>{item.name}</option>
                                                        ))
                                                    }
                                                </select>
                                                {
                                                    errors.state_id && <div className="form-text text-danger" style={{marginTop : "20px"}}>{errors.state_id}</div>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="City">{t('city')}</label>
                                                <select className="form-select form-control" value={state.city_id} onChange={
                                                    (e) => {
                                                        const Text = e.target.value;
                                                        setState((old) => ({...old, city_id : Text}));
                                                        setErrors((old) => ({...old, city_id : ""}))
                                                    }
                                                }>
                                                    <option value="">{t('city')}</option>
                                                    {
                                                        regions.map(item => (
                                                            <option value={item.id} key={item.id}>{item.name}</option>
                                                        ))
                                                    }
                                                </select>
                                                {
                                                    errors.city_id && <div className="form-text text-danger" style={{marginTop : "20px"}}>{errors.city_id}</div>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="BuildingNumber">{t('building_number')}</label>
                                                <input type="text" className="form-control" id="BuildingNumber" defaultValue={state.building_number} placeholder={t('building_number')} onChange={
                                                    (e) => {
                                                        const Text = e.target.value;
                                                        setState((old) => ({...old, building_number : Text}));
                                                        setErrors((old) => ({...old, building_number : ""}))
                                                    }
                                                }/>
                                                {
                                                    errors.building_number && <div className="form-text text-danger" style={{marginTop : "20px"}}>{errors.building_number}</div>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="Floor">{t('floor')}</label>
                                                <input type="text" className="form-control" id="Floor" defaultValue={state.floor} placeholder={t('floor')} onChange={
                                                    (e) => {
                                                        const Text = e.target.value;
                                                        setState((old) => ({...old, floor : Text}));
                                                        setErrors((old) => ({...old, floor : ""}))
                                                    }
                                                }/>
                                                {
                                                    errors.floor && <div className="form-text text-danger" style={{marginTop : "20px"}}>{errors.floor}</div>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="Apartment">{t('apartment')}</label>
                                                <input type="text" className="form-control" id="Apartment" defaultValue={state.apartment} placeholder={t('apartment')} onChange={
                                                    (e) => {
                                                        const Text = e.target.value;
                                                        setState((old) => ({...old, apartment : Text}));
                                                        setErrors((old) => ({...old, apartment : ""}))
                                                    }
                                                }/>
                                                {
                                                    errors.apartment && <div className="form-text text-danger" style={{marginTop : "20px"}}>{errors.apartment}</div>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="Street">{t('street')}</label>
                                                <input type="text" className="form-control" id="Street" defaultValue={state.street} placeholder={t('street')} onChange={
                                                    (e) => {
                                                        const Text = e.target.value;
                                                        setState((old) => ({...old, street : Text}));
                                                        setErrors((old) => ({...old, street : ""}))
                                                    }
                                                }/>
                                                {
                                                    errors.street && <div className="form-text text-danger" style={{marginTop : "20px"}}>{errors.street}</div>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="Landmark">{t('landmark')}</label>
                                                <input type="text" className="form-control" id="Landmark" defaultValue={state.landmark} placeholder={t('landmark')} onChange={
                                                    (e) => {
                                                        const Text = e.target.value;
                                                        setState((old) => ({...old, landmark : Text}));
                                                        setErrors((old) => ({...old, landmark : ""}))
                                                    }
                                                }/>
                                                {
                                                    errors.landmark && <div className="form-text text-danger" style={{marginTop : "20px"}}>{errors.landmark}</div>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="AddressName">{t('address_name')}</label>
                                                <input type="text" className="form-control" id="AddressName" defaultValue={state.address_name} placeholder={t('address_name')} onChange={
                                                    (e) => {
                                                        const Text = e.target.value;
                                                        setState((old) => ({...old, address_name : Text}));
                                                        setErrors((old) => ({...old, address_name : ""}))
                                                    }
                                                }/>
                                                {
                                                    errors.address_name && <div className="form-text text-danger" style={{marginTop : "20px"}}>{errors.address_name}</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        {
                                            showLoader ? <button className="submit-loader mt-3" type="submit">{t('update_address')} <span className="loader"></span></button>
                                            :
                                            <>
                                                <button className="form-btn" type="submit">{t('update_address')}</button>
                                                <Link href="/my-address" className="cancel">{t('cancel')}</Link>
                                            </>
                                        }
                                    </div>
                                </form>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default EditAddress;

export async function getServerSideProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["auth", "menu", "common", "header", "sidbar", "address"])),
      },
    };
}