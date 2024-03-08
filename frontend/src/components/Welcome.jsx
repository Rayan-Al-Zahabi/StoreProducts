// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../css/Welcome.css';

// function Welcome() {
//   return (
//     <div className="welcome-background d-flex justify-content-center align-items-center">
//       <div className="text-center text-white">
//         <h1>Welcome to Product Shop</h1>
//         <p>This is a simple product management application.</p>
//         <p>To get started, you can:</p>
//         <ul className="list-unstyled">
//           <li>Create a new product <Link to="/create" className="text-white">here</Link>.</li>
//           <li>View existing products <Link to="/product" className="text-white">here</Link>.</li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Welcome;
import "../css/Welcome.css";
import { motion } from "framer-motion";

function Welcome() {
  const text = "Discover a world of possibilities at our Product Shop".split(" ");

  return (
    <div className="motion">
      {text.map((el, i) => (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 3,
            delay: i / 2,
          }}
          key={i}
        >
          {el}{" "}
        </motion.span>
      ))}
      
    </div>
  );
}

export default Welcome;