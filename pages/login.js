import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Login.module.css";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { AiFillFacebook } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Login() {
  const typeLogin = {
    GOOGLE: "google",
    GITHUB: "github",
    FACEBOOK: "facebook",
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema: LoginSchema,
  });

  async function onSubmit(values) {
    console.log(values);
  }

  const handleLogin = (e, type) => {
    e.preventDefault();
    signIn(type, { callbackUrl: process.env.NEXT_PUBLIC_URL });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
      </Head>

      <section className={styles.wrapper}>
        <h1 className={styles.title}>Login form</h1>

        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <div className={styles.groupInput}>
            <input
              className={
                formik.errors.email && formik.touched.email
                  ? `${styles.input} ${styles.inputRequired}`
                  : styles.input
              }
              type="email"
              {...formik.getFieldProps("email")}
            />
          </div>
          <div className={styles.groupInput}>
            <input
              className={
                formik.errors.password && formik.touched.password
                  ? `${styles.input} ${styles.inputRequired}`
                  : styles.input
              }
              type="password"
              {...formik.getFieldProps("password")}
            />
          </div>

          <div className={styles.btnGroup}>
            <button className={styles.btn} type="submit">
              Login
            </button>
            <button
              onClick={(e) => handleLogin(e, typeLogin.GOOGLE)}
              className={styles.btn}
              type="submit"
            >
              <span>
                Sign in with Google <FcGoogle style={{ marginLeft: "5px" }} />
              </span>
            </button>
            <button
              onClick={(e) => handleLogin(e, typeLogin.GITHUB)}
              className={styles.btn}
              type="submit"
            >
              <span>
                Sign in with Github <BsGithub style={{ marginLeft: "5px" }} />
              </span>
            </button>
            <button
              onClick={(e) => handleLogin(e, typeLogin.FACEBOOK)}
              className={styles.btn}
              type="submit"
            >
              <span>
                Facebook <AiFillFacebook style={{ marginLeft: "5px" }} />
              </span>
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

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: { session } };
}
