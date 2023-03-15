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
      <div className="h-full w-full px-8 py-4 font-sans">
        <Navbar author={author} route={route} />
        <div className="py-8">{children}</div>
      </div>

      <Modal show={true}>
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
