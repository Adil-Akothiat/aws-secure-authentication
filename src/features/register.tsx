// import type React from "react";
// import { useState } from "react";
// import { useAuth } from "react-oidc-context";

// const RegisterFeature:React.FC = ()=> {
//     const [email, setEmail] = useState("");
//     const [firstname, setFirstname] = useState("");
//     const [lastname, setLastname] = useState("");
//     const auth = useAuth();

//     const registerHandler = (e:React.FormEvent<HTMLFormElement>)=> {
//         e.preventDefault();
//         auth.signup
//     }
//     return (
//         <form onSubmit={registerHandler}>
//             <input
//                 type="email" 
//                 name="email" 
//                 id="user_email" 
//                 onChange={e=> setEmail(e.target.value)} 
//                 value={email}
//                 className="border"
//                 placeholder="email"
//             />
//             <input 
//                 type="text" 
//                 name="given_name" 
//                 id="given_name" 
//                 onChange={e=> setFirstname(e.target.value)} 
//                 value={firstname}
//                 className="border"
//                 placeholder="firstname"
//             />
//             <input 
//                 type="text" 
//                 name="family_name" 
//                 id="family_name" 
//                 onChange={e=> setLastname(e.target.value)} 
//                 value={lastname}
//                 className="border"
//                 placeholder="lastname"
//             />
//             <button>submit</button>
//         </form>
//     );
// }

// export default RegisterFeature;