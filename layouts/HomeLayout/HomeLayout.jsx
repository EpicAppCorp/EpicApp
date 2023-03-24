import { useState } from 'react';

//components
import Navbar from '@epicapp/components/Navbar';
import Modal from '@epicapp/components/Modal';
import SignIn from '@epicapp/components/SignIn';
import Signup from '@epicapp/components/Signup';

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
        <div className="py-24 px-8">{children}</div>
      </div>

      <Modal show={modal.show}>
        {modal.form === 'LOGIN' ? (
          <SignIn
            switchHandler={() => setModal({ ...modal, form: 'SIGNUP' })}
            close={() => setModal({ ...modal, show: false })}
          />
        ) : (
          <Signup
            switchHandler={() => setModal({ ...modal, form: 'LOGIN' })}
            close={() => setModal({ ...modal, show: false })}
          />
        )}
      </Modal>
    </>
  );
}
