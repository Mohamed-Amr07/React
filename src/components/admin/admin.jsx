import React, { useState } from "react";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import BooksAdmin from "./booksAdmin";
import CategoriesAdmin from "./categoriesAdmin";
import AuthorsAdmin from "./authorsAdmin";
// import Button from 'react-bootstrap/Button';
// import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";

export default function Admin() {
  const [basicActive, setBasicActive] = useState('tab1');

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);

  };
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <>
      <div>
        <div className="container">
          <MDBTabs className='mb-3'>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
                Categories
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
                Books
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}>
                Authors
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>

          <MDBTabsContent>
           




            <MDBTabsPane show={basicActive === 'tab1'}><CategoriesAdmin /></MDBTabsPane>
            <MDBTabsPane show={basicActive === 'tab2'}><BooksAdmin /></MDBTabsPane>
            <MDBTabsPane show={basicActive === 'tab3'}><AuthorsAdmin /></MDBTabsPane>
          </MDBTabsContent>
        </div>
      </div>
    </>

  );
}
