import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form, Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import apiAdmim from '../../../http/ApiAdmin';


const CreateProduct = ({ show, onHide, heandleOpenError }) => {
    const [value, setValue] = useState('')

    const brands = useSelector(state => state.brand.brands)
    const types = useSelector(state => state.type.types)
    const materials = useSelector(state => state.material.materials)
    console.log(materials)
  

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [brand, setBrand] = useState({ name: '' });
    const [type, setType] = useState({ name: '' });
    const [material, setMaterial] = useState({ name: '' });

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addProduct = () => {

        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', brand.id)
        formData.append('typeId', type.id)
        formData.append('materialId', material.id)
        formData.append('description', description)
        apiAdmim.createProduct(formData).then(data => {
            onHide()
            setName('')
            setPrice(0)
            setDescription('')
            setFile(null)
            setBrand({ name: '' })
            setType({ name: '' })
            setMaterial({ name: '' })
        }).catch(ere => {
            onHide()
            heandleOpenError('продукт')
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить продукт
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{brand.name || 'Выберите бренд'}</Dropdown.Toggle>
                        <Dropdown.Menu>{brands.map(brand => <Dropdown.Item key={brand.id} onClick={() => setBrand(brands.find(el => el.id === brand.id))}>{brand.name}</Dropdown.Item>)
                        }</Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{type.name || 'Выберите тип'}</Dropdown.Toggle>
                        <Dropdown.Menu>{types.map(type => <Dropdown.Item key={type.id} onClick={() => setType(types.find(el => el.id === type.id))}>{type.name}</Dropdown.Item>)
                        }</Dropdown.Menu>
                    </Dropdown>
                 <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{material.name || 'Выберите материал'}</Dropdown.Toggle>
                        <Dropdown.Menu>{materials.map(mat => <Dropdown.Item key={mat.id} onClick={() => setMaterial(materials.find(el => el.id === mat.id))}>{mat.name}</Dropdown.Item>)
                        }</Dropdown.Menu>
                    </Dropdown>
                    <Form.Control className='mt-3'
                        placeholder='Название продукта'
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    <Form.Control className='mt-3'
                        placeholder='Описание продукта'
                        value={description}
                        onChange={e => setDescription(e.target.value)} />
                    <Form.Control className='mt-3'
                        placeholder='Цена продукта'
                        type='number'
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))} />
                    <Form.Control className='mt-3'
                        placeholder='Фото продукта'
                        type='file'
                        onChange={selectFile} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addProduct}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateProduct;