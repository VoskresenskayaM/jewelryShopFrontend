import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import apiAdmim from '../../../http/ApiAdmin';


const CreateType = ({show, onHide, heandleOpenError}) => {
    const [value, setValue] = useState('')
   
    const addType = () => {console.log('добавить тип')
    apiAdmim.createType(value).then(res => {
            setValue('')
            onHide()
        }).catch(ere=>{
            setValue('')
            onHide()
            heandleOpenError('тип')
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
                    Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название типа"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addType}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;