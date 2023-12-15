import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import apiAdmim from '../../../http/ApiAdmin';


const CreateMaterial = ({ show, onHide, heandleOpenError }) => {
    const [value, setValue] = useState('')

    const addMaterial = () => {
        apiAdmim.createMaterial(value).then(res => {
            setValue('')
            onHide()
        })
        .catch(err=>{
            setValue('')
            onHide()
            heandleOpenError('материал')
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
                    Добавить материал
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название материала"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addMaterial}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateMaterial;