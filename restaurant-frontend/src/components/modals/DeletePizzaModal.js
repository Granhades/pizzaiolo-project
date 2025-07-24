import React from "react";
import PopupModal from "./PopupModal";


export default function DeletePizzaModal({isOpen, item, onConfirm, onCancel})
{
    return (
        <PopupModal
        isOpen={isOpen}
        title = "Delete item"
        message={`Would you like to remove ${item?.name} from your order?`}
        onConfirm={onConfirm}
        onCancel={onCancel}
        >

        </PopupModal>
    );
}


