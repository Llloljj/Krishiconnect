import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle2, MessageCircle, Bot, Leaf } from 'lucide-react';
import { fadeUp } from '../../utils/motionVariants';
import { trustIndicators } from '../../constants/landing';
import Button from '../ui/Button';
import newImage from '../../images/newImage.webp';
import AIAssistantModal from './AIAssistantModal';

export default function HeroSection() {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  return (
    <section className="relative min-h-[100vh] overflow-hidden gradient-hero grid-bg organic-pattern">
      <motion.div
        className="pointer-events-none absolute -top-32 left-1/4 h-[32rem] w-[32rem] rounded-full gradient-glow blur-lg"
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary/5 blur-[80px]"
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(129,199,132,0.08) 0%, transparent 40%),
            radial-gradient(circle at 80% 20%, rgba(46,125,50,0.05) 0%, transparent 35%)`,
        }}
      />

      {/* Main Content */}
      <motion.div className="relative mx-auto flex min-h-[100vh] max-w-7xl flex-col justify-center px-4 pt-28 pb-20 sm:px-6 lg:px-8 lg:pt-32">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          
          {/* LEFT SIDE */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 rounded-full border border-primary-light/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-primary-light backdrop-blur-md"
            >
              <motion.span 
                className="h-2 w-2 rounded-full bg-primary-light"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              AI Agriculture Infrastructure
            </motion.span>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mt-8 font-heading text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              AI-Powered{' '}
              <span className="text-gradient-nature">Contract Farming</span>{' '}
              Platform
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
            >
              Intelligently connecting farmers, companies, and FPOs through AI
              matching, demand visibility, smart contracts, and voice assistance.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button to="/signup" variant="nature" size="lg">
                Start Platform
                <ArrowRight className="h-4 w-4" />
              </Button>

              <Button href="#dashboards" variant="secondary" size="lg">
                <Play className="h-4 w-4 text-primary-light" />
                Watch Demo
              </Button>
            </motion.div>

            {/* <motion.ul
              variants={fadeUp}
              custom={4}
              className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-8"
            >
              {trustIndicators.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary-light" />
                  {item}
                </li>
              ))}
            </motion.ul> */}
          </motion.div>

          {/* RIGHT SIDE IMAGE SECTION */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col items-center lg:items-end"
          >
            {/* Main Image */}
            <div className="relative w-full max-w-[620px] overflow-hidden rounded-[32px] border nature-border bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-xl shadow-2xl organic-shadow hover-lift">
              <img
                  src={newImage}
                  alt="Contract Farming"
                  className="h-[520px] w-full object-cover rounded-[30px]"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              
              {/* Leaf decoration */}
              <motion.div
                className="absolute top-4 right-4 text-primary-light/40"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Leaf className="h-8 w-8" />
              </motion.div>
            </div>

            {/* Bottom Action Buttons */}
            <motion.div 
              variants={fadeUp}
              custom={4}
              className="mt-6 flex w-full max-w-[620px] flex-col gap-4 sm:flex-row"
            >
              
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noreferrer"
                className="group flex flex-1 items-center gap-3 rounded-2xl border border-green-500/25 bg-gradient-to-br from-green-500/10 to-transparent px-5 py-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/15 nature-card"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 group-hover:bg-green-500/30 transition-all">
                  <MessageCircle className="h-6 w-6 text-green-400" />
                </div>

                <div>
                  <p className="text-xs text-muted">Chat on</p>
                  <h4 className="font-semibold text-white">WhatsApp Support</h4>
                </div>
              </a>

              {/* AI Chatbot */}
              <button
                onClick={() => setIsAIModalOpen(true)}
                className="group flex flex-1 items-center gap-3 rounded-2xl border border-primary-light/30 bg-gradient-to-br from-primary/15 to-transparent px-5 py-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary-light/50 hover:shadow-lg hover:shadow-primary/20 cursor-pointer nature-card"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light/20 group-hover:bg-primary-light/30 transition-all">
                  <Bot className="h-6 w-6 text-primary-light" />
                </div>

                <div className="text-left">
                  <p className="text-xs text-muted">Talk with</p>
                  <h4 className="font-semibold text-white">AI Assistant</h4>
                </div>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      <AIAssistantModal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} />
    </section>
  );
}




// import { motion } from 'framer-motion';
// import { ArrowRight, Play, MessageCircle, Bot } from 'lucide-react';
// import { fadeUp } from '../../utils/motionVariants';
// import Button from '../ui/Button';
// import newImage from '../../images/newImage.webp';

// export default function HeroSection() {
//   return (
//     <section className="relative min-h-[100vh] overflow-hidden gradient-hero grid-bg">
      
//       {/* Background Effects */}
//       <motion.div
//         className="pointer-events-none absolute -top-32 left-1/4 h-[32rem] w-[32rem] rounded-full gradient-glow blur-3xl"
//         animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
//         transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
//       />

//       <motion.div
//         className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary/10 blur-[100px]"
//         animate={{ opacity: [0.2, 0.4, 0.2] }}
//         transition={{ duration: 10, repeat: Infinity }}
//       />

//       <motion.div
//         className="pointer-events-none absolute inset-0 opacity-30"
//         style={{
//           backgroundImage: `radial-gradient(circle at 20% 80%, rgba(129,199,132,0.15) 0%, transparent 40%),
//             radial-gradient(circle at 80% 20%, rgba(46,125,50,0.1) 0%, transparent 35%)`,
//         }}
//       />

//       {/* Main Content */}
//       <motion.div className="relative mx-auto flex min-h-[100vh] max-w-7xl flex-col justify-center px-4 pt-28 pb-20 sm:px-6 lg:px-8 lg:pt-24">
        
//         <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">

//           {/* LEFT SIDE */}
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
//           >
//             {/* Badge */}
//             <motion.span
//               variants={fadeUp}
//               custom={0}
//               className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-primary-light backdrop-blur-md"
//             >
//               <span className="h-2 w-2 rounded-full bg-primary-light animate-pulse" />
//               AI Agriculture Infrastructure
//             </motion.span>

//             {/* Heading */}
//             <motion.h1
//               variants={fadeUp}
//               custom={1}
//               className="mt-8 font-heading text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
//             >
//               AI-Powered{' '}
//               <span className="text-gradient">
//                 Contract Farming
//               </span>{' '}
//               Platform
//             </motion.h1>

//             {/* Description */}
//             <motion.p
//               variants={fadeUp}
//               custom={2}
//               className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
//             >
//               Intelligently connecting farmers, companies, and FPOs through AI
//               matching, demand visibility, smart contracts, and voice assistance.
//             </motion.p>

//             {/* BUTTONS IN ONE LINE */}
//             <motion.div
//               variants={fadeUp}
//               custom={3}
//               className="mt-10 flex flex-wrap items-center gap-3"
//             >
//               {/* Start Platform */}
//               <Button to="/signup" variant="primary" size="lg">
//                 Start Platform
//                 <ArrowRight className="h-4 w-4" />
//               </Button>

//               {/* Watch Demo */}
//               <Button href="#dashboards" variant="secondary" size="lg">
//                 <Play className="h-4 w-4 text-primary-light" />
//                 Watch Demo
//               </Button>

//               {/* WhatsApp */}
//               <a
//                 href="https://wa.me/919999999999"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="group flex items-center gap-2 rounded-2xl border border-green-500/20 bg-[#111]/80 px-4 py-3 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-green-400 hover:shadow-[0_0_25px_rgba(34,197,94,0.25)]"
//               >
//                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
//                   <MessageCircle className="h-5 w-5 text-green-400" />
//                 </div>

//                 <h4 className="text-sm font-semibold text-white">
//                   WhatsApp
//                 </h4>
//               </a>

//               {/* AI Assistant */}
//               <button
//                 className="group flex items-center gap-2 rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_0_25px_rgba(34,197,94,0.25)]"
//               >
//                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
//                   <Bot className="h-5 w-5 text-primary-light" />
//                 </div>

//                 <h4 className="text-sm font-semibold text-white">
//                   AI Assistant
//                 </h4>
//               </button>
//             </motion.div>
//           </motion.div>

//           {/* RIGHT SIDE IMAGE */}
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="relative -mt-16 flex justify-center lg:justify-end"
//           >
//             <div className="relative w-full max-w-[540px] overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
              
//               <img
//                 src={newImage}
//                 alt="Contract Farming"
//                 className="h-[480px] w-full object-cover rounded-[32px]"
//               />

//               {/* Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
//             </div>
//           </motion.div>

//         </div>
//       </motion.div>
//     </section>
//   );
// }

