import { useState } from 'react';
import styles from './AuthPage.module.scss';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(null);

  return (
    <>
      {
        showLogin === true ?
          <main className={styles.AuthPage}>
            <div className={styles.container}>
              <img
                className="image"
                src="https://images.thdstatic.com/productImages/1d64ea68-9f7f-45d3-ac5e-20b7c8522141/svn/orange-the-home-depot-paint-buckets-05glhd2-64_1000.jpg"
                alt="bucket"
                height="100vmin"
              />
              {/* <h3 onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'SIGN UP' : 'LOG IN'}</h3> */}
              <div className={styles.buttons}>
                <h3 onClick={() => setShowLogin(false)}>SIGN UP</h3>
                <h3 onClick={() => setShowLogin(true)}>LOGIN</h3>
              </div>
            </div>
            <div className={styles.form}>
              <LoginForm setUser={setUser} />
            </div>
          </main>
          : showLogin === false ?
            <main className={styles.AuthPage}>
              <div className={styles.container}>
                <img
                  className="image"
                  src="https://images.thdstatic.com/productImages/1d64ea68-9f7f-45d3-ac5e-20b7c8522141/svn/orange-the-home-depot-paint-buckets-05glhd2-64_1000.jpg"
                  alt="bucket"
                  height="100vmin"
                />
                {/* <h3 onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'SIGN UP' : 'LOG IN'}</h3> */}
                <div className={styles.buttons}>
                  <h3 onClick={() => setShowLogin(false)}>SIGN UP</h3>
                  <h3 onClick={() => setShowLogin(true)}>LOGIN</h3>
                </div>
              </div>
              <div className={styles.form}>
                <SignUpForm setUser={setUser} />
              </div>
            </main>
            :
            <div className={styles.home}>
              <img
                className="image"
                src="https://images.thdstatic.com/productImages/1d64ea68-9f7f-45d3-ac5e-20b7c8522141/svn/orange-the-home-depot-paint-buckets-05glhd2-64_1000.jpg"
                alt="bucket"
                height="100vmin"
              />
              <h1 className={styles.enter} onClick={() => setShowLogin(true)}>ENTER...IF YOU DARE</h1>
            </div>
      }
    </>
  );
}