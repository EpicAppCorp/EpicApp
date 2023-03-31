import { useState } from 'react';

//components
import Navbar from '@epicapp/components/Navbar';
import Modal from '@epicapp/components/Modal';
import Auth from '@epicapp/components/Auth';

export default function HomeLayout({ children, route, author }) {
  //opens the login modal
  const [modal, setModal] = useState({ show: false, form: 'LOGIN' });

  return (
    <>
      <div>
        <Navbar
          author={author}
          route={route}
          openModal={(type) => setModal({ show: true, form: type })}
        />
        <div className="px-8 py-4">{children}</div>
      </div>

      <Modal show={modal.show}>
        <Auth option={modal.form} close={() => setModal(false)} />
      </Modal>
    </>
  );
}
