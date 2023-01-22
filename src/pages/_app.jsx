import { useEffect, useRef } from 'react';
import { Layout } from '@/components/Layout';
import '@/styles/tailwind.css';
import 'focus-visible';
import { motion } from 'framer-motion';
function usePrevious(value) {
  let ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default function App({ Component, pageProps, router }) {
  let previousPathname = usePrevious(router.pathname);

  return (
    <>
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
        <div className="relative">
          <main>
            <Layout {...pageProps}>
              <Component previousPathname={previousPathname} {...pageProps} />
            </Layout>
          </main>
        </div>
      </motion.div>
    </>
  );
}
