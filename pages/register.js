import Head from "next/head";
import Link from "next/link";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useState, useEffect } from "react";
import styles from "@/styles/Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { publicRequest } from "@/axios";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const router = useRouter();
  const [show, setShow] = useState({
    showPass: false,
    showCPass: false,
  });

  const SignUpSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    cpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("No confirmation required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
    onSubmit,
    validationSchema: SignUpSchema,
  });

  async function onSubmit(values) {
    axios
      .post("http://localhost:3000/api/auth/signup", { ...values })
      .then(function (response) {
        toast("Create user successfully...!");
        formik.resetForm();
        router.push("/login");
      })
      .catch(function (error) {
        toast("Error when create new user...!");
      });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Register</title>
      </Head>

      <section className={styles.wrapper}>
        <h1 className={styles.title}>Register form</h1>

        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <div>
            <input
              className={styles.input}
              type="text"
              name="Username"
              placeholder="Username"
              {...formik.getFieldProps("username")}
            />
            {formik.errors.username && formik.touched.username ? (
              <div style={{ color: "red" }}>{formik.errors.username}</div>
            ) : null}
          </div>
          <div>
            <input
              className={styles.input}
              type="email"
              name="email"
              placeholder="Email"
              {...formik.getFieldProps("email")}
            />
            {formik.errors.email && formik.touched.email ? (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <input
              className={styles.input}
              type={`${show?.showPass ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
            {show?.showPass ? (
              <AiOutlineEye
                onClick={() => setShow({ ...show, showPass: !show.showPass })}
              />
            ) : (
              <AiOutlineEyeInvisible
                onClick={() => setShow({ ...show, showPass: !show.showPass })}
              />
            )}
            {formik.errors.password && formik.touched.password ? (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            ) : null}
          </div>
          <div>
            <input
              className={styles.input}
              type={`${show?.showCPass ? "text" : "password"}`}
              name="cpassword"
              placeholder="Confirm Password"
              {...formik.getFieldProps("cpassword")}
            />
            {show?.showCPass ? (
              <AiOutlineEye
                onClick={() => setShow({ ...show, showCPass: !show.showCPass })}
              />
            ) : (
              <AiOutlineEyeInvisible
                onClick={() => setShow({ ...show, showCPass: !show.showCPass })}
              />
            )}
            {formik.errors.cpassword && formik.touched.cpassword ? (
              <div style={{ color: "red" }}>{formik.errors.cpassword}</div>
            ) : null}
          </div>

          <div>
            <button type="submit">Sign up</button>
          </div>

          <div>
            You have already account? <Link href="/login">Login</Link>
          </div>
        </form>
      </section>
      <ToastContainer />
    </div>
  );
}
