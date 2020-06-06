import React, {useState, useEffect} from 'react'
import API from '../services/Api'

const Home = () => {
    // From
    const [originData, setOriginData] = useState([])
    const [origin, setOrigin] = useState(0)
    const [destinationData, setDestinationData] = useState([])
    const [destination, setDestination] = useState(0)
    const [weight, setWeight] = useState(0)
    const [courier, setCourier] = useState(0)
    const courierData = [
        {id : 1, code : "jne" , name : "Jalur Nugraha Ekakurir (JNE)"},
        {id : 2, code : "jnt" , name : "J&T Express (J&T)"},
        {id : 3, code : "tiki" , name : "Citra Van Titipan Kilat (TIKI)"},
        {id : 4, code : "lion" , name : "Lion Parcel (LION)"},
        {id : 5, code : "sicepat" , name : "Sicepat Ekspres (SICEPAT)"},
        {id : 6, code : "alfatrex" , name : "Alfatrex"},
        {id : 7, code : "pcp" , name : "PCP Express"},
        {id : 8, code : "sap" , name : "SAP Express"},
    ]

    // Destination
    const [originDataTo, setOriginDataTo] = useState([])
    const [originTo, setOriginTo] = useState(0)
    const [destinationDataTo, setDestinationDataTo] = useState([])
    const [destinationTo, setDestinationTo] = useState(0)
    const [districtDataTo, setDistrictDataTo] = useState([])
    const [districtTo, setDistrictTo] = useState(0)

    // Results
    const [results, setResult] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        new API().fetchProvince().then(response => {
            if(response.statusCode === 200){
                setOriginData(response.data.results)
                setOriginDataTo(response.data.results)
            }
        })
    }, [])

    // From
    const fetchCity = (event) => {
        new API().fetchCity(event).then(response => {
            if(response.statusCode === 200){
                setDestinationData(response.data.results)
            }
        })
    }

    const onSelectOrigin = (event) => {
        setOrigin(event.target.value)
        fetchCity(event.target.value)
    }

    // To 
    const fetchCityTo = (event) => {
        new API().fetchCity(event).then(response => {
            if(response.statusCode === 200){
                setDestinationDataTo(response.data.results)
            }
        })
    }

    const fetchDistrictTo = (event) => {
        new API().fetchDistrict(event).then(response => {
            if(response.statusCode === 200){
                setDistrictDataTo(response.data.results)
            }
        })
    }

    const onSelectOriginTo = (event) => {
        setOriginTo(event.target.value)
        fetchCityTo(event.target.value)
    }
    
    const onSelectCityTo = (event) => {
        setDestinationTo(event.target.value)
        fetchDistrictTo(event.target.value)
    }
    

    const checkResults = () => {
        setIsLoading(true)
        const data =  {
            origin : destination,
            destination : districtTo,
            weight : weight,
            courier : courier
        }

        new API().shipping(data).then(response => {
            console.log("Request", data)
            console.log("Respoonse", response)
            if(response.statusCode === 200){
                setIsLoading(false)
                setResult(response.data.results)
                console.log("Result", response.data.results)
            }else{
                setIsLoading(true)
            }
        })
    }


    const formatter = new Intl.NumberFormat('en-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2
    })

    const validation = destination === 0 || districtTo === 0 || weight === 0 || courier === 0

    return (
        <div className="cekOngkir">
            <h2>Cek Ongkir</h2>
            <div className="cekOngkir__form">
                {/* FRO SHIIPIING */}
                <p>From :</p>
                <div className="cekOngkir__form__input">
                    <select onChange={(event) => onSelectOrigin(event)}>
                        <option value={0}>--Pilih Asal Provinsi--</option>
                        {
                            originData.map(item => {
                            return <option key={item.id} value={item.id}>{item.name}</option>
                            })
                        }
                    </select>
                </div>
                <div className="cekOngkir__form__input">
                    <select onChange={(event) => setDestination(event.target.value)}>
                        <option value={0}>--Pilih Asal Kota--</option>
                        {
                            destinationData.map(item => {
                            return <option key={item.id} value={item.id}>{item.name}</option>
                            })
                        }

                    </select>
                </div>

                {/* DESTINATION SHIPPING */}
                <p>To :</p>
                <div className="cekOngkir__form__input">
                    <select onChange={(event) => onSelectOriginTo(event)}>
                        <option value={0}>--Pilih Tujuan Provinsi--</option>
                        {
                            originDataTo.map(item => {
                            return <option key={item.id} value={item.id}>{item.name}</option>
                            })
                        }
                    </select>
                </div>
                <div className="cekOngkir__form__input">
                    <select onChange={(event) => onSelectCityTo(event)}>
                        <option value={0}>--Pilih Tujuan Kota/Kabupaten--</option>
                        {
                            destinationDataTo.map(item => {
                            return <option key={item.id} value={item.id}>{item.name}</option>
                            })
                        }

                    </select>
                </div>

                <div className="cekOngkir__form__input">
                    <select onChange={(event) => setDistrictTo(event.target.value)}>
                        <option value={0}>--Pilih Tujuan Kecamatan--</option>
                        {
                            districtDataTo.map(item => {
                            return <option key={item.id} value={item.id}>{item.name}</option>
                            })
                        }
                    </select>
                </div>


                <div className="cekOngkir__form__input">
                    <input type="text" placeholder="Berat Barang ( Kg )" onChange={(event) => setWeight(event.target.value)}/>
                </div>
                <div className="cekOngkir__form__input">
                    <select onChange={(event) => setCourier(event.target.value)}>
                        <option value={0}>--Pilih Kurir--</option>
                        {courierData.map(item => {
                            return <option key={item.id}  value={item.code}>{item.name}</option>
                        })}
                    </select>
                </div>
                <div className={`cekOngkir__form__button  ${isLoading || validation ? "cekOngkir__form__disable" : ""}`} onClick={() => isLoading ? console.log("Loading...") : validation ? alert("All Field Is Required!") : checkResults()}>
                    <h3>{isLoading ? "CHEKING...." : "CHECK"}</h3>
                </div>
            </div>
            
            <div className="cekOngkir__divider" />

            <div className="cekOngkir__results">
                {
                    isLoading ? <div className="cekOngkir__results__emptyState">
                        <h3>Loading...</h3>
                    </div> :
                    results.length > 0 ?
                    results.map((result, index) => {
                        return <div className="cekOngkir__results__item" key={index}>
                            <div className="cekOngkir__results__item__info">
                                <p><b>{result.courier} ( {result.service} )</b></p>
                                <p>{result.description}</p>
                            </div>
                            <p className="cekOngkir__results__item__price">{formatter.format(result.cost)}</p>
                        </div>
                    })
                    :
                    <div className="cekOngkir__results__emptyState">
                        <h3>Not Results</h3>
                    </div>
                }                
            </div>
        </div>
    )
}

export default Home