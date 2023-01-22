import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import './styles/tailwind.css'
import {motion} from 'framer-motion'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <motion.div
      initial="hidden"
      whileInView="show"
      animate="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15
          }
        }
      }}
    >
      <App />
    </motion.div>
  </React.StrictMode>
);
