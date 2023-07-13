import React from "react";

function ModalPopUp(props) {
    const { firstName, lastName } = props.userDetails
    return (
        <div class="modal d-block" role="dialog">
            <div class="modal-dialog d-block" role="document">
                <div class="modal-content d-block">
                    <div class="modal-header">
                        <h5 class="modal-title text-danger">   <i class="bi bi-trash-fill"></i> Delete User</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={() => props.handleClose()}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete <span className="text-primary text-bold">{firstName + " " + lastName}</span>
                        user ?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" onClick={() => props.handleConfirm()}>Yes</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => props.handleClose()}>No</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalPopUp;