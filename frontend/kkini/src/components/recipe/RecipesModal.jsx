import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import RecipesDetail from './RecipesDetail';

function RecipesModal({ recipeId, handleClose, show }) {
    console.log('ㅂㅂ', recipeId)
  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      {/* <Modal.Header>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <RecipesDetail recipeId={recipeId}></RecipesDetail>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RecipesModal;
