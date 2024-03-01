import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useRef } from "react";

export default function SignupForm() {
  const userRef = useRef();
  const emailRef = useRef();
  const pwdRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const user = {
      username: userRef.current.value,
      email: emailRef.current.value,
      password: pwdRef.current.value,
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/signup/`,
        user,
        {
          headers: { "Content-Type": "application/json" },
        },
        {
          withCredentials: true,
        }
      );

      const loginData = {
        username: user.username,
        password: user.password,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/token/`,
        loginData,
        {
          headers: { "Content-Type": "application/json" },
        },
        {
          withCredentials: true,
        }
      );

      if (response && response.data && response.data.access) {
        localStorage.setItem("access_token", response.data.access);
        console.log('Login successful. Access token:', response.data.access);
        window.location.href = "/"; 
      } else {
        console.error('Login failed. Response:', response);
      }
    } catch (error) {
      console.error('Error signing up or logging in:', error);
    }
  }

  return (
    <Form onSubmit={handleSubmit} className="Auth-form">
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" ref={userRef} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" ref={emailRef} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" ref={pwdRef} required />
      </Form.Group>
      <div className="d-grid gap-2 mt-3">
        <Button type="submit" variant="primary">
          Sign Up
        </Button>
      </div>
    </Form>
  );
}

// import { Form, Button } from "react-bootstrap";
// import axios from "axios";
// import { useRef } from "react";

// export default function SignupForm() {
//   const userRef = useRef();
//   const emailRef = useRef();
//   const pwdRef = useRef();

//   async function handleSubmit(e) {
//     e.preventDefault();
//     const user = {
//       username: userRef.current.value,
//       email: emailRef.current.value,
//       password: pwdRef.current.value,
//     };

//     try {
//       await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/signup/`,
//         user,
//         {
//           headers: { "Content-Type": "application/json" },
//         },
//         {
//           withCredentials: true,
//         }
//       );

//       const loginData = {
//         username: user.username,
//         password: user.password,
//       };

//       const response = await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/token/`,
//         loginData,
//         {
//           headers: { "Content-Type": "application/json" },
//         },
//         {
//           withCredentials: true,
//         }
//       );

//       if (response && response.data && response.data.access) {
//         localStorage.setItem("access_token", response.data.access);
//         window.location.href = "/"; 
//       } else {
//         console.error('Login failed. Response:', response);
//       }
//     } catch (error) {
//       console.error('Error signing up or logging in:', error);
//     }
//   }

//   return (
//     <Form onSubmit={handleSubmit} className="Auth-form">
//       <Form.Group className="mb-3">
//         <Form.Label>Username</Form.Label>
//         <Form.Control type="text" ref={userRef} required />
//       </Form.Group>
//       <Form.Group className="mb-3">
//         <Form.Label>Email</Form.Label>
//         <Form.Control type="email" ref={emailRef} required />
//       </Form.Group>
//       <Form.Group className="mb-3">
//         <Form.Label>Password</Form.Label>
//         <Form.Control type="password" ref={pwdRef} required />
//       </Form.Group>
//       <div className="d-grid gap-2 mt-3">
//         <Button type="submit" variant="primary">
//           Sign Up
//         </Button>
//       </div>
//     </Form>
//   );
// }
