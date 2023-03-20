import Head from "next/head";
import Link from "next/link"

export default function Register() {
  return (
    <div>
      <Head>
        <title>Register</title>
      </Head>

      <section>
        <h1>Register form</h1>

        <form>

          <div>
            <div>
              <input type="text" name="Username" placeholder="Username" />
            </div>
            <div>
              <input type="email" name="email" placeholder="email" />
            </div>
            <div>
              <input type={`${true ? "text" : "password"}`} name="password" placeholder="password" />
            </div>
          </div>
          
        </form>
      </section>
    </div>
  );
}
