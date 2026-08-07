import { useState, useEffect } from "react";
import Link from "next/link";
import BackToCart from "../BackToCart";
import { useDispatch, useSelector } from "react-redux";
import { GetUserAddressDataHandler } from "@/redux/actions/AddressApi";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { CitiesDataHandler, StatesDataHandler } from "@/redux/actions/CountriesApi";
import { AddAddressDataHandler, SetAddressDefaultHandler } from "@/redux/actions/AddressApi";
import { useTranslation } from "next-i18next";

const ShippingAddress = ({paymentStep, setSteps}) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { UserAddressData } = useSelector(state => state.addressData);

    const [ loader, setLoader ] = useState(false);

    const [ showLoader, setShowLoader ] = useState(true);

    const [modal, setModal] = useState(false);

    const toggleModel = () => setModal(!modal);

    const [ ckeckDefault, setCkeckDefault ] = useState(0);

    useEffect(() => {
        dispatch(GetUserAddressDataHandler(() => {
            setShowLoader(false);
        }));
    },[modal]);

    const HandelCheckDefault = UserAddressData.find(item => item.set_default);

    useEffect(() => {
        setCkeckDefault(HandelCheckDefault?.id)
    },[HandelCheckDefault])

    const { CitiesData, StatesData } = useSelector(state => state.countries);

    const [ regions, setRegions ] = useState([]);

    const [ state, setState ] = useState({
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
        dispatch(CitiesDataHandler());
        dispatch(StatesDataHandler());
    },[])

    useEffect(() => {
        const GetStates = StatesData.filter(item => item.state.id === parseInt(state.state_id));
        setRegions(GetStates);
    },[state.state_id])

    const HandelValidation = () => {

        let Valid = true;

        if(state.state_id === "") {

            setErrors((old) => ({...old, state_id : t('address:the_government_field_is_required')}));
            Valid = false;
        }

        if(state.city_id === "") {

            setErrors((old) => ({...old, city_id : t('address:the_city_field_is_required')}));
            Valid = false;
        }

        if(state.street === "") {

            setErrors((old) => ({...old, street : t('address:the_street_field_is_required')}));
            Valid = false;
        }

        if(state.building_number === "") {

            setErrors((old) => ({...old, building_number : t('address:the_building_number_field_is_required')}));
            Valid = false;
        }

        if(state.floor === "") {

            setErrors((old) => ({...old, floor : t('address:the_floor_number_field_is_required')}));
            Valid = false;
        }

        if(state.apartment === "") {

            setErrors((old) => ({...old, apartment : t('address:the_apartment_number_field_is_required')}));
            Valid = false;
        }

        if(state.landmark === "") {

            setErrors((old) => ({...old, landmark : t('address:the_landmark_field_is_required')}));
            Valid = false;
        }

        if(state.address_name === "") {

            setErrors((old) => ({...old, address_name : t('address:the_address_name_field_is_required')}));
            Valid = false;
        }

        return Valid;
    }

    const HandelSubmit = (e) => {
        e.preventDefault();
        if(HandelValidation()) {
            setLoader(true);
            setShowLoader(true);
            dispatch(AddAddressDataHandler(state, () => {
                setModal(false);
                setLoader(false);
            }))
        }
    }

    const [ addressDefault, SetAddressDefault ] = useState({
        address_id : "",
        set_default : 0
    })

    useEffect(() => {
        if(addressDefault.address_id) {
            dispatch(SetAddressDefaultHandler(addressDefault));
        }
    },[addressDefault])

    return(
        <div className="checkout-info-wrapper">
            <div className="form-header">
                <h4 className="title">{t('checkout:shipping')}</h4>
            </div>
            <div className="chekout-shipping-list">
                { showLoader &&  <div className="update-cart-loader"><span className="loader"></span></div> } 
                {
                   UserAddressData.map(item => (
                    <div className="form-check" key={item.id}>
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id={item.id} defaultChecked={item.set_default === true} onChange={
                            (e) => {
                                SetAddressDefault((old) => ({...old, address_id : item.id, set_default : 1}));
                                setCkeckDefault(item.id)
                            }
                        }/>
                        <label className="form-check-label" htmlFor={item.id}>
                            <h5 className="label-title">{t('checkout:deliver_to')} : {item.address_name}</h5>
                            <p className="label-text">{item.state.name},{item.city.name},{item.street},{item.building_number},{item.floor}</p>
                        </label>
                    </div>
                   )) 
                }
            </div>
            <div className="add-new-shipping" onClick={
                    (e) => {
                        e.preventDefault();
                        setModal(true);
                    }
                }>
                <i className="fi fi-br-plus-small"></i> {t('checkout:add_new_address')}
            </div>
            <div className="form-btns">
                <BackToCart />
                <Link href="#" className="checkout-submit" onClick={
                    (e) => {
                        e.preventDefault();
                        if(ckeckDefault) {
                            paymentStep(1);
                            setSteps(1);
                        }
                    }
                }>{t('checkout:continue_to_payment')}</Link>
            </div>
            <Modal isOpen={modal} toggle={toggleModel} className="modal-dialog-centered add-address">
                <ModalHeader toggle={toggleModel}></ModalHeader>
                <ModalBody>
                    <h3 className="add-title">{t('add_new_address')}</h3>
                    <form className="user-form" onSubmit={HandelSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Governate">{t('address:government')}</label>
                                    <select className="form-select form-control" onChange={
                                        (e) => {
                                            const Text = e.target.value;
                                            setState((old) => ({...old, state_id : Text}));
                                            setErrors((old) => ({...old, state_id : ""}));
                                        }
                                    }>
                                        <option>{t('address:government')}</option>
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
                                    <label htmlFor="City">{t('address:city')}</label>
                                    <select className="form-select form-control" onChange={
                                        (e) => {
                                            const Text = e.target.value;
                                            setState((old) => ({...old, city_id : Text}));
                                            setErrors((old) => ({...old, city_id : ""}));
                                        }
                                    }>
                                        <option>{t('address:city')}</option>
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
                                    <label htmlFor="BuildingNumber">{t('address:building_number')}</label>
                                    <input type="text" className="form-control" id="BuildingNumber" placeholder={t('address:building_number')} onChange={
                                        (e) => {
                                            const Text = e.target.value;
                                            setState((old) => ({...old, building_number : Text}));
                                            setErrors((old) => ({...old, building_number : ""}));
                                        }
                                    }/>
                                    {
                                        errors.building_number && <div className="form-text text-danger" style={{marginTop : "20px"}}>{errors.building_number}</div>
                                    }
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="Floor">{t('address:floor')}</label>
                                    <input type="text" className="form-control" id="Floor" placeholder={t('address:floor')} onChange={
                                        (e) => {
                                            const Text = e.target.value;
                                            setState((old) => ({...old, floor : Text}));
                                            setErrors((old) => ({...old, floor : ""}));
                                        }
                                    }/>
                                    {
                                        errors.floor && <div className="form-text text-danger" style={{marginTop : "20px"}}>{errors.floor}</div>
                                    }
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="Apartment">{t('address:apartment')}</label>
                                    <input type="text" className="form-control" id="Apartment" placeholder={t('address:apartment')} onChange={
                                        (e) => {
                                            const Text = e.target.value;
                                            setState((old) => ({...old, apartment : Text}));
                                            setErrors((old) => ({...old, apartment : ""}));
                                        }
                                    }/>
                                    {
                                        errors.apartment && <div className="form-text text-danger" style={{marginTop : "20px"}}>{errors.apartment}</div>
                                    }
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Street">{t('address:street')}</label>
                                    <input type="text" className="form-control" id="Street" placeholder={t('address:street')} onChange={
                                        (e) => {
                                            const Text = e.target.value;
                                            setState((old) => ({...old, street : Text}));
                                            setErrors((old) => ({...old, street : ""}));
                                        }
                                    }/>
                                    {
                                        errors.street && <div className="form-text text-danger" style={{marginTop : "20px"}}>{errors.street}</div>
                                    }
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="Landmark">{t('address:landmark')}</label>
                                    <input type="text" className="form-control" id="Landmark" placeholder={t('address:landmark')} onChange={
                                        (e) => {
                                            const Text = e.target.value;
                                            setState((old) => ({...old, landmark : Text}));
                                            setErrors((old) => ({...old, landmark : ""}));
                                        }
                                    }/>
                                    {
                                        errors.landmark && <div className="form-text text-danger" style={{marginTop : "20px"}}>{errors.landmark}</div>
                                    }
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="AddressName">{t('address:address_name')}</label>
                                    <input type="text" className="form-control" id="AddressName" placeholder={t('address:address_name')} onChange={
                                        (e) => {
                                            const Text = e.target.value;
                                            setState((old) => ({...old, address_name : Text}));
                                            setErrors((old) => ({...old, address_name : ""}));
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
                                loader ? <button className="submit-loader mt-3" type="submit">{t('address:create_new_address')} <span className="loader"></span></button>
                                :
                                <>
                                    <button className="form-btn" type="submit">{t('address:create_new_address')}</button>
                                    <Link href="#" className="cancel" onClick={
                                        (e) => {
                                            e.preventDefault();
                                            setModal(false);
                                        }
                                    }>{t('address:cancel')}</Link>
                                </>
                            }
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default ShippingAddress;