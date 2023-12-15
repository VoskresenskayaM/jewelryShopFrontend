import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";

function Error({show, onHide, name}){
    return (<Modal
    show={show}
    onHide={onHide}
    centered
>
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Ошибка
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <p>Не удалось создать {name}</p>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
    </Modal.Footer>
</Modal>)
}

export default Error