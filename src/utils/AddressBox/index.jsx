import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { CountriesDataHandler, CitiesDataHandler, StatesDataHandler } from "../../redux/actions/CountriesApi";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { DeleteAddressDataHandler } from "@/redux/actions/AddressApi";
import { useTranslation } from 'next-i18next';

const AddressBox = ({data}) => {

    const { t } = useTranslation('address');

    const dispatch = useDispatch();

    const { CountriesData, CitiesData, StatesData } = useSelector(state => state.countries);

    useEffect(() => {
        dispatch(CountriesDataHandler());
        dispatch(CitiesDataHandler());
        dispatch(StatesDataHandler());
    },[])

    const CountryName = CountriesData.find(item => item.id === data.country_id);

    const CityName = CitiesData.find(item => item.id === data.state_id);

    const StateName = StatesData.find(item => item.id === data.city_id);

    const [modal, setModal] = useState(false);

    const toggleModel = () => setModal(!modal);

    const [ addressId, setAddressId ] = useState('');

    const [ showLoader, setShowLoader ] = useState(false);

    return(
        <div className="address-box">
            <div className="adress-title">
                <h4>{data.address_name}</h4>
            </div>
            <div className="addres-body">
                <ul className="adress-list">
                    <li>
                        <span className="label">{t('country')}</span>
                        <span className="text">{CountryName?.name}</span>
                    </li>
                    <li>
                        <span className="label">{t('government')}</span>
                        <span className="text">{CityName?.name}</span>
                    </li>
                    <li>
                        <span className="label">{t('city')}</span>
                        <span className="text">{StateName?.name}</span>
                    </li>
                    <li>
                        <span className="label">{t('street')}</span>
                        <span className="text">{data.street}</span>
                    </li>
                </ul>
            </div>
            <div className="address-footer">
                <ul className='btns-list'>
                    <li>
                        <Link href={`/my-address/edit/${data.id}`}><i className="fi fi-rr-edit"></i> {t('edit')}</Link>
                    </li>
                    <li>
                        <Link href="#" onClick={
                            (e) => {
                                e.preventDefault();
                                setModal(true);
                                setAddressId(data.id);
                            }
                        }><i className="fi fi-rr-trash"></i> {t('delete')}</Link>
                    </li>
                </ul>
            </div>
            <Modal isOpen={modal} toggle={toggleModel} className="modal-dialog-centered delete-address">
                <ModalHeader toggle={toggleModel}></ModalHeader>
                <ModalBody>
                    <h3 className="delete-title">{t('are_you_sure_to_remove_this_address')}</h3>
                    <div className="delet-btns">
                        {
                            showLoader ? <span className="submit-loader mt-3">{t('yes_delete')} <span className="loader"></span></span>
                            :
                            <Link href="#" onClick={
                                (e) => {
                                    e.preventDefault();
                                    setShowLoader(true);
                                    dispatch(DeleteAddressDataHandler(addressId), () => {
                                        setShowLoader(false);
                                    });
                                }
                            }>{t('yes_delete')}</Link>
                        }
                        <Link href="#" className="cancel" onClick={
                            (e) => {
                                e.preventDefault();
                                setModal(false);
                            }
                        }>{t('cancel')}</Link>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default AddressBox;