import './Admin.css'
import { useState } from 'react';
import { Button, Container } from "react-bootstrap";
import CreateBrand from '../modals/CreateBrand/CreateBrand';
import CreateProduct from '../modals/CreateProduct/CreateProduct';
import CreateType from '../modals/CreateType/CreateType';
import CreateMaterial from '../modals/CreateMaterial/CreateMatereal'
import Error from '../modals/Error/Error';
import { useSelector, useDispatch } from 'react-redux';
import apiAdmin from '../../http/ApiAdmin';
import { getBrands } from '../../store/redusers/brandReduser';
import { getTypes } from '../../store/redusers/typeReduser';
import { getMaterials } from '../../store/redusers/materialReduser';

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [materialVisible, setMaterialVisible] = useState(false)
    const [deviceProduct, setProductVisible] = useState(false)
    const [error, setError] = useState(false)
    const [name, setName] = useState('')
    const dispatch = useDispatch()

    const heandleOpenError = (name) => {
        setError(true)
        setName(name)
    }

    const headerAddProduct = () => {
        console.log('addProduct')
        setProductVisible(true)
        apiAdmin.getAllBrands().then(res => dispatch(getBrands(res)))
        apiAdmin.getAllTypes().then(res => dispatch(getTypes(res)))
        apiAdmin.getAllMaterials().then(res =>dispatch(getMaterials(res)))
    }

    return (
        <section className="admin__container">
            <Container className="d-lg-flex flex-row justify-content-between">
                <Button
                    variant={"outline-dark"}
                    className="mt-4 p-2"
                    onClick={() => setTypeVisible(true)}
                >
                    Добавить тип
                </Button>
                <Button
                    variant={"outline-dark"}
                    className="mt-4 p-2"
                    onClick={() => setBrandVisible(true)}
                >
                    Добавить бренд
                </Button>
                <Button
                    variant={"outline-dark"}
                    className="mt-4 p-2"
                    onClick={() => setMaterialVisible(true)}
                >
                    Добавить материал
                </Button>
                <Button
                    variant={"outline-dark"}
                    className="mt-4 p-2"
                    onClick={headerAddProduct}
                >
                    Добавить продукт
                </Button>
                <CreateBrand
                    show={brandVisible}
                    onHide={() => { setBrandVisible(false) }}
                    heandleOpenError={heandleOpenError} />
                <CreateProduct
                    show={deviceProduct}
                    onHide={() => { setProductVisible(false) }}
                    heandleOpenError={heandleOpenError} />
                <CreateType
                    show={typeVisible}
                    onHide={() => { setTypeVisible(false) }}
                    heandleOpenError={heandleOpenError} />
                <CreateMaterial
                    show={materialVisible}
                    onHide={() => { setMaterialVisible(false) }}
                    heandleOpenError={heandleOpenError} />
                <Error show={error}
                    onHide={() => { setError(false) }}
                    name={name} />
            </Container>
        </section>
    );
};

export default Admin;