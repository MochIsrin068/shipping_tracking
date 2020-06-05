import React, {useState, Fragment} from 'react'
import API from '../services/Api'

const Tracking = () => {
    const [noResi, setNoResi] = useState("")
    const [courier, setCourier] = useState("")
    const [waybills, setWaybills] = useState(null)
    const [isLoading, setIsloading] = useState(false)
    const courierData = [
        {id : 1, code : "jne" , name : "Jalur Nugraha Ekakurir (JNE)"},
        {id : 2, code : "jnt" , name : "J&T Express (J&T)"},
        {id : 3, code : "tiki" , name : "Citra Van Titipan Kilat (TIKI)"},
        {id : 4, code : "lion" , name : "Lion Parcel (LION)"},
        {id : 5, code : "sicepat" , name : "Sicepat Ekspres (SICEPAT)"}
    ]


    const checkResults = () => {
        setIsloading(true)
        new API().waybill({
            waybill : noResi,
            courier : courier
        }).then(response => {
            if(response.statusCode === 200){
                setWaybills(response.data)
                setIsloading(false)
            }else{
                setIsloading(false)
                alert("Something Went Wrong!!")
            }
        })
    }

    return (
        <div className="cekResi">
            <h2>Cek Resi</h2>
            <div className="cekResi__form">
                <div className="cekResi__form__input">
                    <input type="text" placeholder="Nomor Resi" onChange={(event) => setNoResi(event.target.value)}/>
                </div>
                <div className="cekResi__form__input">
                    <select onChange={(event) => setCourier(event.target.value)}>
                        <option value={0}>--Pilih Kurir--</option>
                        {courierData.map(item => {
                            return <option key={item.id}  value={item.code}>{item.name}</option>
                        })}
                    </select>
                </div>
                <div className={`cekResi__form__button  ${isLoading ? "cekResi__form__disable" : ""}`} onClick={() => isLoading ?  console.log("Data Not Found") : checkResults()}>
                    <h3>{isLoading ? "CHEKING...." : "CHECK"}</h3>
                </div>
            </div>
            <div className="cekResi__divider" />
            <div className="cekResi__results">
                {
                    isLoading ? <div className="cekResi__results__emptyState">
                        <h3>Loading...</h3>
                    </div> : 
                    waybills && waybills.details.length > 0 ?
                    <Fragment>
                        <div className="cekResi__results__item">
                            <div>
                                <p><b>{noResi}</b></p>
                                <p>{waybills.waybill.waybill_date.split("-")[2]} - {waybills.waybill.waybill_date.split("-")[1]} - {waybills.waybill.waybill_date.split("-")[0]}</p>
                                <p>{waybills.waybill.waybill_time}</p>
                            </div>
                            <div className="cekResi__results__item__delimiter" />
                            <div>
                                <p className="cekResi__results__item__status"><b>{waybills.delivery_status.status}</b></p>
                                <p>{waybills.delivery_status.pod_name}</p>
                                <p>{waybills.courier.name}</p>
                            </div>
                        </div>
                        <div className="cekResi__results__item cekResi__results__title">
                            <div/>
                            <p>History</p>
                            <div/>
                        </div>
                        {
                            waybills.details.map((waybill) => {
                                return <div className="cekResi__results__item" key={waybill.shipping_code}>
                                        <div className="cekResi__results__item__info">
                                            <p><b>{waybill.shipping_description}</b></p>
                                            <p>{waybill.city_name}</p>
                                        </div>
                                        <div className="cekResi__results__item__day">
                                            <p>{waybill.shipping_date.split("-")[2]} - {waybill.shipping_date.split("-")[1]} - {waybill.shipping_date.split("-")[0]}</p>
                                            <p>{waybill.shipping_time}</p>
                                        </div>
                                    </div>
                            })
                        }
                    </Fragment>
                    :
                    <div className="cekResi__results__emptyState">
                        <h3>Not Results</h3>
                    </div>
                }                
            </div>
        </div>
    )
}

export default Tracking