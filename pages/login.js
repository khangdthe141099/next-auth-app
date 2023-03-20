import Head from "next/head";
import Link from "next/link"

export default function Login() {
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>

      <section>
        <h1>Login form</h1>

        <form>
          <div>
            <div>
              <input type="email" name="email" placeholder="email" />
            </div>
            <div>
              <input type="password" name="password" placeholder="password" />
            </div>
          </div>

          <div>
            <div>
                <button type="submit">Logins</button>
            </div>
            <div>
                <button type="submit">Sign in with Google</button>
            </div>
            <div>
                <button type="submit">Sign in with Github</button>
            </div>
          </div>

          <div>
            don't have an account yet? <Link href="/register">Sign Up</Link>
          </div>
        </form>
      </section>
    </div>
  );
}
