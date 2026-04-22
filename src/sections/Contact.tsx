"use client";
import { ArrowUpRight, Mail, Github, Linkedin, Terminal, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Magnetic } from "@/components/Magnetic";
import { SplitText } from "@/components/SplitText";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { sendEmail } from "@/app/actions/contact";

// --- High-Fidelity Infrastructure ---

const GLITCH_CHARS = "01$#!?/[]{}&%*+-_";

const HackerText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let iteration = 0;
    const interval = 50;

    const timeout = setTimeout(() => {
        timer = setInterval(() => {
            setDisplayedText(
              text
                .split("")
                .map((char, index) => {
                  if (index < iteration) return text[index];
                  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
                })
                .join("")
            );
            
            if (iteration >= text.length) clearInterval(timer);
            iteration += 1 / 3;
          }, interval);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (timer) clearInterval(timer);
    };
  }, [text, delay]);

  return <span className="font-mono">{displayedText}</span>;
};

const BinaryRain = () => {
  const [bits, setBits] = useState<string[]>([]);

  useEffect(() => {
    const generateBits = () => {
      const newBits = Array.from({ length: 40 }, () => 
        Math.random() > 0.5 ? "1" : "0"
      );
      setBits(newBits);
    };
    const interval = setInterval(generateBits, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.03] pointer-events-none select-none font-mono text-[8px] leading-none break-all flex flex-wrap gap-1 content-start">
      {bits.map((bit, i) => (
        <span key={i} className="text-white">{bit}</span>
      ))}
      {bits.map((bit, i) => (
        <span key={i+100} className="text-white">{bit}</span>
      ))}
    </div>
  );
};

type Status = "IDLE" | "SENDING" | "SUCCESS" | "ERROR";

export const ContactSection = () => {
  const [status, setStatus] = useState<Status>("IDLE");
  const [logs, setLogs] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const addLog = (log: string) => {
    setLogs((prev) => [...prev, log].slice(-5));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "SENDING") return;

    setStatus("SENDING");
    setLogs([]);
    addLog("INITIALIZING_SECURE_CHANNEL");
    
    const formData = new FormData(e.currentTarget);
    
    await new Promise((r) => setTimeout(r, 800));
    addLog("ENCRYPTING_DATA_PACKETS");
    
    await new Promise((r) => setTimeout(r, 600));
    addLog("TRANSMITTING_TO_CORE_RELAY");

    const result = await sendEmail(formData);

    if (result.success) {
      addLog("TRANSMISSION_SUCCESSFUL");
      await new Promise((r) => setTimeout(r, 600));
      addLog("PACKET_ACKNOWLEDGED");
      await new Promise((r) => setTimeout(r, 400));
      addLog("SESSION_TERMINATED");
      setStatus("SUCCESS");
      
      setTimeout(() => {
        formRef.current?.reset();
        setStatus("IDLE");
        setLogs([]);
      }, 20000);
    } else {
      addLog(`CRITICAL_ERROR: ${result.error || "SYS_FAILURE"}`);
      setStatus("ERROR");
      setTimeout(() => setStatus("IDLE"), 5000);
    }
  };

  return (
    <section className="py-24 border-t-4 border-black swiss-dots relative overflow-hidden" id="contact">
      <div className="container relative z-10">
        <SectionHeader
          number="05"
          eyebrow="Communication"
          title="System Access"
          description="Initialize a secure connection to discuss architectural implementations or potential system integrations."
        />

        <div className="mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Terminal Console */}
          <div className="lg:col-span-8 border-4 border-black bg-[#0A0A0A] text-white p-0 overflow-hidden shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] relative">
            
            {/* CRT Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%]" />
            
            {/* Header */}
            <div className="bg-white/5 p-3 border-b-2 border-white/10 flex items-center justify-between relative z-20">
                <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-red-500/50" />
                    <div className="size-2 rounded-full bg-yellow-500/50" />
                    <div className="size-2 rounded-full bg-green-500/50" />
                    <span className="ml-4 text-[9px] font-mono text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Terminal className="size-3" />
                        SYS_TERM_v4.2.0
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <div className={`size-1.5 rounded-full ${status === 'SENDING' ? 'bg-swiss-accent animate-pulse' : 'bg-green-500/20'}`} />
                        <span className="text-[8px] font-mono text-white/30 lowercase">uplink_status: {status.toLowerCase()}</span>
                    </div>
                </div>
            </div>
            
            <div className="relative min-h-[500px]">
                <BinaryRain />
                
                {/* Transmission Overlay */}
                <AnimatePresence>
                    {status === "SENDING" && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-30 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-12 text-center"
                        >
                            <div className="relative size-32 mb-8">
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 border-2 border-dashed border-swiss-accent/30 rounded-full"
                                />
                                <motion.div 
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-4 border border-dotted border-white/20 rounded-full"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Loader2 className="size-8 text-swiss-accent animate-spin" />
                                </div>
                            </div>
                            <div className="space-y-2 max-w-xs w-full">
                                {logs.map((log, i) => (
                                    <div key={i} className="text-[10px] font-mono text-swiss-accent tracking-widest uppercase">
                                        <HackerText text={log} />
                                    </div>
                                ))}
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    className="h-[1px] bg-swiss-accent/50 mt-4 mx-auto"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Success/Error Overlay */}
                <AnimatePresence>
                    {(status === "SUCCESS" || status === "ERROR") && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="absolute inset-0 z-40 bg-black flex flex-col items-center justify-center p-12"
                        >
                            <div className={`size-20 rounded-full border-2 flex items-center justify-center mb-6 ${status === 'SUCCESS' ? 'border-green-500/50 text-green-500' : 'border-red-500/50 text-red-500'}`}>
                                {status === 'SUCCESS' ? <CheckCircle2 className="size-10" /> : <AlertCircle className="size-10" />}
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">
                                {status === 'SUCCESS' ? "SIGNAL_LOCKED" : "TRANS_FAILURE"}
                            </h3>
                            <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest text-center max-w-[200px]">
                                {status === 'SUCCESS' ? "Data packet delivered into the core architecture." : "Uplink severed due to transmission protocols."}
                            </p>
                            <div className="mt-8 text-[8px] font-mono opacity-20 uppercase">Auto_Reset in 20.0s</div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <form ref={formRef} onSubmit={handleSubmit} className="p-8 md:p-12 space-y-12 relative z-10 transition-opacity duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Input Line 01 */}
                        <div className="group/input">
                            <div className="flex items-center gap-4 text-swiss-accent font-mono text-xs mb-4">
                                <span>user:~$</span>
                                <span className="text-white/40 group-focus-within/input:text-swiss-accent transition-colors">set_id</span>
                            </div>
                            <input 
                                required
                                name="name"
                                type="text" 
                                placeholder="NAME_"
                                className="w-full bg-transparent border-b border-white/10 focus:border-swiss-accent outline-none py-4 font-mono text-xl uppercase tracking-tighter transition-all placeholder:text-white/5"
                            />
                        </div>

                        {/* Input Line 02 */}
                        <div className="group/input">
                            <div className="flex items-center gap-4 text-swiss-accent font-mono text-xs mb-4">
                                <span>user:~$</span>
                                <span className="text-white/40 group-focus-within/input:text-swiss-accent transition-colors">set_ch</span>
                            </div>
                            <input 
                                required
                                name="email"
                                type="email" 
                                placeholder="EMAIL_"
                                className="w-full bg-transparent border-b border-white/10 focus:border-swiss-accent outline-none py-4 font-mono text-xl uppercase tracking-tighter transition-all placeholder:text-white/5"
                            />
                        </div>
                    </div>

                    {/* Input Line 03 */}
                    <div className="group/input">
                        <div className="flex items-center gap-4 text-swiss-accent font-mono text-xs mb-4">
                            <span>user:~$</span>
                            <span className="text-white/40 group-focus-within/input:text-swiss-accent transition-colors">push_msg</span>
                        </div>
                        <textarea 
                            required
                            name="message"
                            placeholder="MESSAGE_CONTENT_..."
                            rows={4}
                            className="w-full bg-transparent border-b border-white/10 focus:border-swiss-accent outline-none py-4 font-mono text-xl uppercase tracking-tighter transition-all placeholder:text-white/5 resize-none"
                        />
                    </div>

                    <div className="pt-8 flex items-center justify-end">
                        <Magnetic strength={0.2}>
                            <button 
                                type="submit"
                                data-cursor="EXECUTE"
                                className="bg-swiss-accent text-black px-12 py-6 font-black uppercase tracking-widest text-sm hover:invert transition-all flex items-center gap-3 group"
                            >
                                <span>Execute_Send</span>
                                <ArrowUpRight className="size-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </Magnetic>
                    </div>
                </form>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-8">
             <div className="border-4 border-black p-8 bg-white shadow-[10px_10px_0px_0px_rgba(255,48,0,0.1)]">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-swiss-accent mb-6 border-b-2 border-black pb-2 inline-block">Direct_Channels</h4>
                <div className="space-y-6">
                   <a href="mailto:ahadg446@gmail.com" className="flex items-center gap-4 group cursor-none">
                      <div className="size-10 border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all transform group-hover:rotate-3">
                         <Mail className="size-5" />
                      </div>
                      <span className="font-bold text-xs uppercase underline decoration-swiss-accent/30 group-hover:decoration-swiss-accent transition-all">ahadg446@gmail.com</span>
                   </a>
                   <a href="https://www.linkedin.com/in/abdul-ahad-a08263273" target="_blank" className="flex items-center gap-4 group cursor-none">
                      <div className="size-10 border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all transform group-hover:-rotate-3">
                         <Linkedin className="size-5" />
                      </div>
                      <span className="font-bold text-xs uppercase underline decoration-swiss-accent/30 group-hover:decoration-swiss-accent transition-all">linkedin.com/in/ahad</span>
                   </a>
                   <a href="https://github.com/ahad324" target="_blank" className="flex items-center gap-4 group cursor-none">
                      <div className="size-10 border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all transform group-hover:rotate-3">
                         <Github className="size-5" />
                      </div>
                      <span className="font-bold text-xs uppercase underline decoration-swiss-accent/30 group-hover:decoration-swiss-accent transition-all">github.com/ahad324</span>
                   </a>
                </div>
             </div>

             <div className="border-4 border-black p-8 bg-[#0A0A0A] text-white relative overflow-hidden group">
                <div className="absolute inset-0 bg-swiss-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h4 className="text-[9px] font-mono text-swiss-accent uppercase mb-4 tracking-[0.3em]">System_Diagnostics</h4>
                <div className="text-[10px] font-mono opacity-40 leading-relaxed uppercase space-y-1">
                   <div>Availability: <span className={status === 'SENDING' ? 'text-swiss-accent animate-pulse' : 'text-green-500'}>100%_ACTIVE</span></div>
                   <div>Response_Lat: &lt; 24h</div>
                   <div>Loc: Lahore, PK</div>
                   <div>Status: {status === 'SENDING' ? 'TRANSMITTING...' : 'IDLE_STANDBY'}</div>
                </div>
                
                {/* Visual Accent */}
                <div className="mt-8 flex gap-1">
                    {[...Array(20)].map((_, i) => (
                        <div 
                            key={i} 
                            className={`h-4 w-1 transition-colors duration-500 ${i < (logs.length * 4) ? 'bg-swiss-accent' : 'bg-white/5'}`} 
                        />
                    ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};