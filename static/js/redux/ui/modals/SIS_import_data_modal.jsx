/*
Copyright (C) 2017 Semester.ly Technologies, LLC

Semester.ly is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Semester.ly is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
*/

import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'boron/WaveModal';

class SISImportDataModal extends React.Component {
    componentDidMount() {
        if (this.props.isVisible) {
            this.modal.show();
        }
    }

    componentDidUpdate() {
        if (this.props.isVisible) {
            this.modal.show();
        }
    }

    render () {
        const modalHeader =
            (<div className="modal-content">
                <div className="modal-header">
                    <h1>Import Data from SIS</h1>
                    <div className="modal-close" onClick={() => this.modal.hide()}>
                        <i className="fa fa-times" />
                    </div>
                </div>
            </div>);
        const modalBody =
            (<div className="modal-body">
                <h3>In order to share and connect to your
                    official courses from SIS to Advisors,
                    you must agree to import data from SIS
                    (or something like this). Click the
                    button below to be taken to the Consent
                    Page on SIS.</h3>
            </div>);
        const modalStyle = {
            width: '100%',
        };
        return (
            <Modal
                ref={(c) => { this.modal = c; }}
                className="SIS-import-data-modal abnb-modal max-modal"
                modalStyle={modalStyle}
                onHide={() => {
                    this.props.toggleSISImportDataModal();
                    history.replaceState({}, 'Semester.ly', '/');
                }}
            >
                {modalHeader}
                {modalBody}
            </Modal>
        );
    }
}

SISImportDataModal.propTypes = {
    toggleSISImportDataModal: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
};

export default SISImportDataModal;

