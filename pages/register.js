import Head from "next/head";
import Link from "next/link";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import styles from "@/styles/Login.module.css";

export default function Register() {
  const [show, setShow] = useState({
    showPass: false,
    showCPass: false,
  });


  return (
    <div className={styles.container}>
      <Head>
        <title>Register</title>
      </Head>

      <section className={styles.wrapper}>
        <h1 className={styles.title}>Register form</h1>

        <form className={styles.form}>
          <input className={styles.input} type="text" name="Username" placeholder="Username" />
          <input className={styles.input} type="email" name="email" placeholder="Email" />
          <div>
          <input
          className={styles.input}
            type={`${show?.showPass ? "text" : "password"}`}
            name="password"
            placeholder="Password"
          />
          {show?.showPass ? (
            <AiOutlineEye
              onClick={(prev) => setShow({ ...prev, showPass: !show.showPass })}
            />
          ) : (
            <AiOutlineEyeInvisible
              onClick={(prev) => setShow({ ...prev, showPass: !show.showPass })}
            />
          )}
          </div>
          <div>
          <input
          className={styles.input}
            type={`${show?.showCPass ? "text" : "password"}`}
            name="cpassword"
            placeholder="Confirm Password"
          />
          {show?.showCPass ? (
            <AiOutlineEye
              onClick={(prev) =>
                setShow({ ...prev, showCPass: !show.showCPass })
              }
            />
          ) : (
            <AiOutlineEyeInvisible
              onClick={(prev) =>
                setShow({ ...prev, showCPass: !show.showCPass })
              }
            />
          )}
          </div>

          <div>
            <button type="submit">Sign up</button>
          </div>

          <div>
            You have already account? <Link href="/login">Login</Link>
          </div>
        </form>
      </section>
    </div>
  );
}
