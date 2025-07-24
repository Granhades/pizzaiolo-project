import React from "react";

function PopupModal ({isOpen, title, message, onConfirm, onCancel}) {

    if(!isOpen) return null;
    
    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-menuitem text-chalk p-6 rounded-2xl shadow-xl border-4 border-chalk w-[90%] max-w-md font-fredericka text-center">
        <h2 className="text-2xl mb-4">{title}</h2>
        <p className="mb-6 text-base">{message}</p>
        <div className="flex justify-center gap-6">
          <button
            onClick={onConfirm}
            className="bg-peach hover:bg-[#f7c474] text-black px-6 py-2 rounded-lg shadow font-semibold transition"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="bg-[#941B0C] hover:bg-[#BC3908] text-white px-6 py-2 rounded-lg shadow font-semibold transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}


export default PopupModal;