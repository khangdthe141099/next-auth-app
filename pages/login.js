import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Login.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
      </Head>

      <section className={styles.wrapper}>
        <h1 className={styles.title}>Login form</h1>

        <form className={styles.form}>
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="email"
          />
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="password"
          />

          <div className={styles.btnGroup}>
            <button className={styles.btn} type="submit">
              Login
            </button>
            <button className={styles.btn} type="submit">
              Sign in with Google
            </button>
            <button className={styles.btn} type="submit">
              Sign in with Github
            </button>
          </div>

          <div className={styles.hint}>
            don't have an account yet?{" "}
            <Link className={styles.link} href="/register">
              Sign Up
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}
