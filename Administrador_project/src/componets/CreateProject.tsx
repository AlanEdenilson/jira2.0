import { createPortal } from "react-dom"

interface estado {
    isOpen: boolean
    onClose():void 
}

const CreateProject = ({ isOpen, onClose, }:estado) => {
    if (!isOpen) return null;
    return createPortal(
        <div>

        </div>,
        document.body
    )
}

export default CreateProject
