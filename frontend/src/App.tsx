import React, { useState } from 'react';
import axios from 'axios';

interface User {
  username: string;
  email: string;
  password: string;
}

function App(): JSX.Element {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [logUsername, setLogUsername] = useState<string>('');
  const [logEmail, setLogEmail] = useState<string>('');
  const [logPassword, setLogPassword] = useState<string>('');
  const [loggedin, setLoggedin] = useState(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/newuser", {
      data: {
        username: username,
        email: email,
        password: password
      }
    })
    .then(response => {
      console.log(response.status);
      setLoggedin(true)
    });
  };
  setInterval(() => {

  }, 18)
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    axios.get<User[]>('http://localhost:8080/api/users')
    .then((response) => {
      const users: User[] = response.data;
      const foundUser = users.find(user =>
        user.username === logUsername && user.password === logPassword && user.email === logEmail
      );
      if (foundUser) {
        console.log("Hi");
        setLoggedin(true)
      } else {
        console.log("GET OUT OF HERE!!");
      }
    })
    .catch(error => {
      console.error("Error fetching users:", error);
    });
  };
if(loggedin == false) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={username} placeholder='username' onChange={(e) => setUsername(e.target.value)} />
        <input value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)} />
        <input value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <form onSubmit={handleLogin}>
        <input value={logUsername} placeholder='username' onChange={(e) => setLogUsername(e.target.value)} />
        <input value={logEmail} placeholder='email' onChange={(e) => setLogEmail(e.target.value)} />
        <input value={logPassword} placeholder='password' onChange={(e) => setLogPassword(e.target.value)} />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
} if(loggedin == true) {
  return(
    <h1>Hii</h1>
  )
} else {
  return(
    <h1>Error, please contact me and i will try t of ic it</h1>
  )
}
}

export default App;
