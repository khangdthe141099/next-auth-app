import Head from "next/head";
import Link from "next/link";
import Image from 'next/image';
import { useState } from 'react'
import { useSession, signIn, signOut, getSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()

  const handleSignOut = () => {
    signOut()
  }

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      
     {session ? <User handleSignOut={handleSignOut} session={session}/> : <Guest />}
    </>
  );
}

//Guest:
function Guest() {

  return (
    <main>
      <h3>Guest HomePage</h3>

      <button style={{backgroundColor: 'blue', color: 'white', border: 'none', height: '30px', width: '100px', cursor: 'pointer'}}>
        <Link href="/login">Sign in</Link>
      </button>
    </main>
  );
}

//Authorize User:
function User({ session, handleSignOut }) {
  const { name, email, image } = session.user;
  return (
    <main>
      <h3>Authorize User HomePage</h3>

      <div>
        <Image src={image} alt="avatar" width={50} height={50}/>
        <h5>{name}</h5>
        <h5>{email}</h5>
      </div>

      <div>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>

      <div>
        <Link style={{color: 'blue', textDecoration: 'underline'}} href="/profile">Profile</Link>
      </div>
    </main>
  );
}


//Protected routes: You can't access home page if you don't sign in. 
export async function getServerSideProps({ req }) {
  const session = await getSession({ req })

  if(!session){
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}