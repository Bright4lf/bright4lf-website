import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "Solution", "How It Works", "Impact", "About", "Contact"];

const STATS = [
  { value: "28M+", label: "Cameroonians Protected" },
  { value: "30%", label: "Medicines Degraded Silently" },
  { value: "5200", label: "Health Facilities" },
  { value: "2800", label: "Pharmacies Nationwide" },
];

const FEATURES = [
  { icon: "🌡️", title: "Temperature Monitoring", desc: "Continuous ±0.5°C accuracy tracking — alerts when safe ranges are exceeded for room-temp, refrigerated, or frozen medicines.", color: "#1A5CA8" },
  { icon: "💧", title: "Humidity Detection", desc: "Real-time relative humidity monitoring prevents tablet dissolution, capsule degradation, and injectable contamination.", color: "#22A84A" },
  { icon: "☀️", title: "Light Exposure Sensor", desc: "UV and visible light protection for photosensitive medicines — the silent destroyer most monitoring systems ignore.", color: "#C8860A" },
  { icon: "📶", title: "100% Offline Capable", desc: "All core features work without internet. 18–24 month battery life. Designed for Cameroon's real-world conditions.", color: "#1A5CA8" },
  { icon: "📱", title: "Instant Mobile Status", desc: "Scan any tag via Bluetooth or NFC. Get a clear SAFE / WARNING / UNSAFE status in under 3 seconds.", color: "#22A84A" },
  { icon: "🔒", title: "Tamper Evidence", desc: "Physical seal detects unauthorised packaging openings — supporting anti-counterfeiting and quality assurance.", color: "#C8860A" },
];

const STEPS = [
  { num: "01", title: "Tag Is Attached", desc: "The Bright4LF sensor tag is fixed to the medicine package at the manufacturer, distributor, or wholesaler level." },
  { num: "02", title: "Continuous Monitoring", desc: "Throughout transport and storage the tag silently logs temperature, humidity, and light — every minute, offline." },
  { num: "03", title: "Healthcare Worker Scans", desc: "A pharmacist or nurse scans the tag with the Bright4LF app. The full environmental history appears instantly." },
  { num: "04", title: "Instant Safety Status", desc: "GREEN = Safe. AMBER = Warning. RED = Unsafe. No interpretation needed. Action taken before the patient is harmed." },
];

const IMPACT = [
  { icon: "❤️", title: "Lives Protected", desc: "Patients receive effective medicine. Treatment works. Recovery happens." },
  { icon: "💊", title: "Drug Resistance Reduced", desc: "No sub-therapeutic doses — a leading driver of antimicrobial resistance in Africa." },
  { icon: "🏥", title: "Health System Trust", desc: "Communities gain confidence in health facilities and the medicines they provide." },
  { icon: "📊", title: "Data for Policy", desc: "Anonymous supply-chain data empowers MINSANTE with evidence for better pharmaceutical policy." },
];

const PRICING = [
  {
    tier: "Single Tag", price: "1,200", unit: "XAF / tag",
    features: ["Temperature sensor", "Humidity sensor", "Light sensor", "LED indicator", "BLE + NFC", "18-month battery"],
    cta: "Order Now", highlight: false,
  },
  {
    tier: "Bulk Pack", price: "840", unit: "XAF / tag (500 units)",
    features: ["All sensor features", "Dashboard access (1 year)", "Setup training session", "Priority WhatsApp support", "Batch tracking", "Audit-ready reports"],
    cta: "Best Value", highlight: true,
  },
  {
    tier: "Institutional", price: "Custom", unit: "CENAME / NGO pricing",
    features: ["Volume discount pricing", "Multi-site dashboard", "API integration", "Dedicated account manager", "Staff training programme", "Regulatory reporting tools"],
    cta: "Contact Us", highlight: false,
  },
];

const statusConfig = {
  safe:    { color: "#22A84A", bg: "#EBF9F0", label: "SAFE",    icon: "✓", msg: "All conditions within safe range. Medicine is effective." },
  warning: { color: "#C8860A", bg: "#FFF8E7", label: "WARNING", icon: "⚠", msg: "Conditions approaching limits. Monitor closely." },
  unsafe:  { color: "#DC2626", bg: "#FEF2F2", label: "UNSAFE",  icon: "✕", msg: "Storage conditions exceeded. Do not administer." },
};

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedCounter({ target }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.3);
  const numVal = parseInt(target.replace(/[^0-9]/g, "")) || 0;
  const suffix = target.replace(/[0-9,]/g, "");
  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = Math.ceil(numVal / 55);
    const timer = setInterval(() => {
      cur += step;
      if (cur >= numVal) { setCount(numVal); clearInterval(timer); }
      else setCount(cur);
    }, 25);
    return () => clearInterval(timer);
  }, [inView, numVal]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function FadeUp({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

export default function Bright4LF() {
  const [activeNav, setActiveNav] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [statusDemo, setStatusDemo] = useState("safe");
  const st = statusConfig[statusDemo];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans','Helvetica Neue',sans-serif", background: "#F8FAFB", color: "#1A1A2E", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.35}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .hov-scale{transition:transform .25s cubic-bezier(.22,1,.36,1),box-shadow .25s}
        .hov-scale:hover{transform:translateY(-5px);box-shadow:0 20px 56px rgba(26,92,168,0.14)!important}
        .nav-lnk{background:none;border:none;font-family:inherit;font-size:14px;font-weight:500;color:#666;cursor:pointer;padding:6px 2px;transition:color .2s;position:relative}
        .nav-lnk:hover,.nav-lnk.act{color:#1A5CA8}
        .nav-lnk.act::after{content:'';position:absolute;bottom:-3px;left:0;right:0;height:2px;background:#22A84A;border-radius:2px}
        .btn{display:inline-flex;align-items:center;gap:8px;padding:13px 30px;border-radius:100px;font-family:inherit;font-size:15px;font-weight:600;cursor:pointer;border:none;transition:all .25s cubic-bezier(.22,1,.36,1)}
        .btn:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(26,92,168,0.22)}
        .btn-primary{background:#1A5CA8;color:#fff}
        .btn-outline{background:transparent;color:#1A5CA8;border:2px solid #1A5CA8}
        .btn-outline:hover{background:#1A5CA8;color:#fff}
        .btn-white{background:#fff;color:#1A5CA8}
        .btn-ghost{background:rgba(255,255,255,0.12);color:#fff;border:1px solid rgba(255,255,255,0.25)}
        .btn-ghost:hover{background:rgba(255,255,255,0.22)}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:#F0F4F8}
        ::-webkit-scrollbar-thumb{background:#1A5CA8;border-radius:3px}
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:1000,
        background: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(26,92,168,0.07)" : "none",
        transition:"all .3s", padding:"0 6%",
      }}>
        <div style={{maxWidth:1180,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:70}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{
              width:38,height:38,borderRadius:11,
              background:"linear-gradient(135deg,#1A5CA8,#22A84A)",
              display:"flex",alignItems:"center",justifyContent:"center",
              boxShadow:"0 4px 14px rgba(26,92,168,0.35)",
            }}>
              <span style={{color:"#fff",fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:15,letterSpacing:"-0.02em"}}>B4</span>
            </div>
            <span style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:19,color:"#1A5CA8",letterSpacing:"-0.02em"}}>BRIGHT4LF</span>
          </div>

          <div style={{display:"flex",gap:28}}>
            {NAV_LINKS.map(l => (
              <button key={l} className={`nav-lnk${activeNav===l?" act":""}`} onClick={()=>setActiveNav(l)}>{l}</button>
            ))}
          </div>

          <div style={{display:"flex",gap:10}}>
            <button className="btn btn-outline" style={{padding:"9px 22px",fontSize:13}}>Download App</button>
            <button className="btn btn-primary" style={{padding:"9px 22px",fontSize:13}}>Get Started</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight:"100vh",display:"flex",alignItems:"center",
        background:"linear-gradient(140deg,#0D3B6E 0%,#1A5CA8 55%,#166534 100%)",
        padding:"120px 6% 80px",position:"relative",overflow:"hidden",
      }}>
        <div style={{position:"absolute",top:-240,right:-180,width:620,height:620,borderRadius:"50%",background:"rgba(34,168,74,0.07)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:-180,left:-120,width:480,height:480,borderRadius:"50%",background:"rgba(255,255,255,0.03)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",backgroundSize:"56px 56px",pointerEvents:"none"}}/>

        <div style={{maxWidth:1180,margin:"0 auto",width:"100%",display:"flex",alignItems:"center",gap:60}}>
          {/* LEFT */}
          <div style={{flex:1,color:"#fff"}}>
            <FadeUp>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(34,168,74,0.18)",border:"1px solid rgba(34,168,74,0.35)",borderRadius:100,padding:"6px 14px",marginBottom:28}}>
                <span style={{width:7,height:7,borderRadius:"50%",background:"#22A84A",display:"inline-block",animation:"pulse 2s infinite"}}/>
                <span style={{fontSize:11,fontWeight:700,color:"#86EFAC",letterSpacing:"0.09em"}}>HEALTH TECHNOLOGY — CAMEROON 2026</span>
              </div>
            </FadeUp>

            <FadeUp delay={80}>
              <h1 style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"clamp(2.4rem,5vw,4.2rem)",lineHeight:1.08,letterSpacing:"-0.03em",marginBottom:24}}>
                What if medicines<br/>
                <span style={{color:"#86EFAC"}}>could speak</span><br/>
                for themselves?
              </h1>
            </FadeUp>

            <FadeUp delay={160}>
              <p style={{fontSize:17,lineHeight:1.75,color:"rgba(255,255,255,0.72)",maxWidth:510,marginBottom:40}}>
                Bright4LF's Smart Sensor Tag monitors every medicine's journey — temperature, humidity, and light — alerting healthcare workers the moment safety is compromised. Offline. Affordable. African-built.
              </p>
            </FadeUp>

            <FadeUp delay={220}>
              <div style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:56}}>
                <button className="btn btn-white">See How It Works <span>→</span></button>
                <button className="btn btn-ghost">Download Brochure</button>
              </div>
            </FadeUp>

            <FadeUp delay={300}>
              <div style={{display:"flex",gap:40,paddingTop:36,borderTop:"1px solid rgba(255,255,255,0.1)",flexWrap:"wrap"}}>
                {[["XAF 1,200","per sensor tag"],["24 months","battery life"],["0","internet needed"]].map(([v,l])=>(
                  <div key={l}>
                    <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:22,color:"#86EFAC"}}>{v}</div>
                    <div style={{fontSize:13,color:"rgba(255,255,255,0.5)",marginTop:3}}>{l}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* RIGHT — Interactive Demo */}
          <FadeUp delay={200} style={{flex:"0 0 auto",width:360}}>
            <div style={{
              background:"rgba(255,255,255,0.07)",backdropFilter:"blur(24px)",
              border:"1px solid rgba(255,255,255,0.13)",borderRadius:28,
              padding:32,boxShadow:"0 40px 96px rgba(0,0,0,0.35)",
              animation:"float 6s ease-in-out infinite",
            }}>
              {/* App header */}
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:22}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:28,height:28,borderRadius:8,background:"linear-gradient(135deg,#1A5CA8,#22A84A)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <span style={{color:"#fff",fontSize:11,fontWeight:800,fontFamily:"Syne,sans-serif"}}>B4</span>
                  </div>
                  <span style={{fontSize:13,color:"rgba(255,255,255,0.6)",fontWeight:600}}>Bright4LF</span>
                </div>
                <div style={{display:"flex",gap:5}}>
                  {["#FF5F57","#FEBC2E","#28C840"].map(c=><div key={c} style={{width:9,height:9,borderRadius:"50%",background:c}}/>)}
                </div>
              </div>

              {/* Medicine info */}
              <div style={{background:"rgba(255,255,255,0.05)",borderRadius:16,padding:18,marginBottom:18}}>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.38)",marginBottom:4,fontWeight:700,letterSpacing:"0.08em"}}>AMOXICILLIN 500MG CAPSULES</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginBottom:14}}>Batch: CAM-2026-04-7823 · Exp: 03/2028</div>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  {[["🌡","24.2°C","Temp"],["💧","58% RH","Humidity"],["☀","Blocked","Light"]].map(([ic,v,l])=>(
                    <div key={l} style={{textAlign:"center"}}>
                      <div style={{fontSize:11,marginBottom:4}}>{ic}</div>
                      <div style={{fontSize:15,fontWeight:700,color:"#86EFAC"}}>{v}</div>
                      <div style={{fontSize:10,color:"rgba(255,255,255,0.38)",marginTop:2}}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status display */}
              <div style={{
                background:st.bg,borderRadius:18,padding:"18px 22px",
                border:`2px solid ${st.color}28`,marginBottom:18,
                transition:"all .4s cubic-bezier(.22,1,.36,1)",
              }}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
                  <div style={{
                    width:42,height:42,borderRadius:"50%",background:st.color,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    color:"#fff",fontSize:18,fontWeight:800,
                    boxShadow:`0 6px 20px ${st.color}50`,
                    transition:"background .4s",
                  }}>{st.icon}</div>
                  <div>
                    <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:22,color:st.color,transition:"color .4s"}}>{st.label}</div>
                    <div style={{fontSize:11,color:"#888",fontWeight:500}}>Medicine Status</div>
                  </div>
                </div>
                <p style={{fontSize:13,color:"#555",lineHeight:1.5}}>{st.msg}</p>
              </div>

              {/* Status switcher */}
              <div style={{display:"flex",gap:6,justifyContent:"center"}}>
                {Object.entries(statusConfig).map(([k,v])=>(
                  <button key={k} onClick={()=>setStatusDemo(k)} style={{
                    padding:"8px 16px",borderRadius:100,border:`2px solid ${v.color}`,
                    fontFamily:"inherit",fontSize:12,fontWeight:700,cursor:"pointer",
                    background: statusDemo===k ? v.color : "transparent",
                    color: statusDemo===k ? "#fff" : v.color,
                    transition:"all .2s",
                  }}>{v.label}</button>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* STATS */}
      <section style={{background:"#fff",padding:"56px 6%",borderBottom:"1px solid #EEF2F7"}}>
        <div style={{maxWidth:1180,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24}}>
          {STATS.map(({value,label},i)=>(
            <FadeUp key={label} delay={i*80}>
              <div style={{textAlign:"center"}}>
                <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:38,color:"#1A5CA8",lineHeight:1}}>
                  <AnimatedCounter target={value}/>
                </div>
                <div style={{fontSize:14,color:"#777",marginTop:8,fontWeight:500}}>{label}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* PROBLEM */}
      <section style={{background:"#F8FAFB",padding:"96px 6%"}}>
        <div style={{maxWidth:1180,margin:"0 auto"}}>
          <FadeUp>
            <div style={{textAlign:"center",maxWidth:680,margin:"0 auto 64px"}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"#FEF2F2",color:"#991B1B",padding:"6px 16px",borderRadius:100,fontSize:12,fontWeight:700,letterSpacing:"0.08em",marginBottom:16}}>⚠ THE PROBLEM</div>
              <h2 style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"clamp(2rem,4vw,3rem)",letterSpacing:"-0.03em",lineHeight:1.12,marginBottom:20}}>
                Medicines are failing patients{" "}
                <span style={{color:"#1A5CA8"}}>silently</span>
              </h2>
              <p style={{fontSize:17,lineHeight:1.7,color:"#666"}}>In Cameroon, up to 30% of medicines degrade before reaching patients — due to heat, humidity, and power cuts. Unlike food spoilage, there is no smell, no colour change, no warning.</p>
            </div>
          </FadeUp>

          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24,marginBottom:36}}>
            {[
              {icon:"🌡",title:"Extreme Heat",desc:"Temperatures exceed 35–40°C across the Centre, North, and Littoral regions — far above safe medicine storage ranges.",accent:"#DC2626"},
              {icon:"⚡",title:"Erratic Electricity",desc:"Power outages lasting 4–12 hours daily destroy cold-chain storage in hospitals, pharmacies, and regional depots.",accent:"#C8860A"},
              {icon:"🚛",title:"1,500km Supply Chains",desc:"Medicines travel from Douala's port to remote health posts with zero environmental monitoring across the entire journey.",accent:"#1A5CA8"},
            ].map(({icon,title,desc,accent},i)=>(
              <FadeUp key={title} delay={i*100}>
                <div className="hov-scale" style={{background:"#fff",borderRadius:24,padding:32,border:"1px solid #EEF2F7",boxShadow:"0 4px 20px rgba(26,92,168,0.05)"}}>
                  <div style={{width:52,height:52,borderRadius:16,background:`${accent}12`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,marginBottom:20,border:`1px solid ${accent}22`}}>{icon}</div>
                  <h3 style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:20,marginBottom:12}}>{title}</h3>
                  <p style={{fontSize:15,lineHeight:1.65,color:"#666"}}>{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp>
            <div style={{background:"linear-gradient(135deg,#FEF2F2,#FFF5F5)",border:"1px solid #FECACA",borderRadius:20,padding:"26px 34px",display:"flex",alignItems:"center",gap:18}}>
              <span style={{fontSize:30,flexShrink:0}}>💔</span>
              <p style={{fontSize:16,color:"#7F1D1D",lineHeight:1.65,fontWeight:500}}>
                <strong>The result:</strong> Patients with malaria, tuberculosis, hypertension, and diabetes receive medicines they trust — that have silently failed them. Treatment fails. They return to the clinic. Or they don't return at all.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* SOLUTION */}
      <section style={{background:"linear-gradient(150deg,#0D3B6E,#1A5CA8 60%,#166534)",padding:"96px 6%",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",backgroundSize:"52px 52px",pointerEvents:"none"}}/>
        <div style={{maxWidth:1180,margin:"0 auto",position:"relative"}}>
          <FadeUp>
            <div style={{textAlign:"center",maxWidth:680,margin:"0 auto 64px",color:"#fff"}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(34,168,74,0.18)",border:"1px solid rgba(34,168,74,0.3)",color:"#86EFAC",padding:"6px 16px",borderRadius:100,fontSize:12,fontWeight:700,letterSpacing:"0.08em",marginBottom:16}}>✓ OUR SOLUTION</div>
              <h2 style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"clamp(2rem,4vw,3rem)",letterSpacing:"-0.03em",lineHeight:1.12,marginBottom:20}}>
                Smart medicine safety —{" "}
                <span style={{color:"#86EFAC"}}>in your pocket</span>
              </h2>
              <p style={{fontSize:17,lineHeight:1.7,color:"rgba(255,255,255,0.65)"}}>The Bright4LF Sensor Tag attaches to any medicine package. It monitors, records, and alerts — without internet, without charging, for up to 24 months.</p>
            </div>
          </FadeUp>

          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
            {FEATURES.map(({icon,title,desc,color},i)=>(
              <FadeUp key={title} delay={i*80}>
                <div className="hov-scale" style={{background:"rgba(255,255,255,0.06)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:24,padding:30,boxShadow:"0 4px 24px rgba(0,0,0,0.15)"}}>
                  <div style={{width:50,height:50,borderRadius:15,background:`${color}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,marginBottom:18,border:`1px solid ${color}35`}}>{icon}</div>
                  <h3 style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:17,color:"#fff",marginBottom:10}}>{title}</h3>
                  <p style={{fontSize:14,lineHeight:1.65,color:"rgba(255,255,255,0.52)"}}>{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{background:"#fff",padding:"96px 6%"}}>
        <div style={{maxWidth:1180,margin:"0 auto"}}>
          <FadeUp>
            <div style={{textAlign:"center",maxWidth:580,margin:"0 auto 72px"}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"#EBF3FF",color:"#0D3B6E",padding:"6px 16px",borderRadius:100,fontSize:12,fontWeight:700,letterSpacing:"0.08em",marginBottom:16}}>⚙ HOW IT WORKS</div>
              <h2 style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"clamp(2rem,4vw,3rem)",letterSpacing:"-0.03em",lineHeight:1.12}}>
                Four steps to{" "}<span style={{color:"#22A84A"}}>safe medicine</span>
              </h2>
            </div>
          </FadeUp>

          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:28,position:"relative"}}>
            <div style={{position:"absolute",top:46,left:"12%",right:"12%",height:2,background:"linear-gradient(90deg,#1A5CA8,#22A84A)",zIndex:0,borderRadius:2}}/>
            {STEPS.map(({num,title,desc},i)=>(
              <FadeUp key={num} delay={i*100}>
                <div style={{textAlign:"center",position:"relative",zIndex:1}}>
                  <div style={{
                    width:70,height:70,borderRadius:"50%",
                    background: i%2===0 ? "#1A5CA8" : "#22A84A",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    margin:"0 auto 24px",
                    fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:20,color:"#fff",
                    boxShadow:`0 8px 28px ${i%2===0?"rgba(26,92,168,0.35)":"rgba(34,168,74,0.35)"}`,
                    border:"4px solid #fff",
                  }}>{num}</div>
                  <h3 style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:17,marginBottom:12,color:"#1A1A2E"}}>{title}</h3>
                  <p style={{fontSize:14,lineHeight:1.65,color:"#666"}}>{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section style={{background:"#EBF3FF",padding:"96px 6%"}}>
        <div style={{maxWidth:1180,margin:"0 auto",display:"flex",gap:72,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:280}}>
            <FadeUp>
              <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"#EBF9F0",color:"#166534",padding:"6px 16px",borderRadius:100,fontSize:12,fontWeight:700,letterSpacing:"0.08em",marginBottom:20}}>❤ REAL IMPACT</div>
              <h2 style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"clamp(1.8rem,3.5vw,2.8rem)",letterSpacing:"-0.03em",lineHeight:1.18,marginBottom:22}}>
                Health for<br/><span style={{color:"#1A5CA8"}}>Everyone.</span><br/>Not just the few.
              </h2>
              <p style={{fontSize:16,lineHeight:1.75,color:"#555",marginBottom:32}}>When medicines work, communities thrive. Bright4LF protects the people who depend on them — especially in Cameroon's most underserved regions.</p>
              <button className="btn btn-primary">Read Our Impact Story →</button>
            </FadeUp>
          </div>

          <div style={{flex:1,minWidth:280,display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
            {IMPACT.map(({icon,title,desc},i)=>(
              <FadeUp key={title} delay={i*80}>
                <div className="hov-scale" style={{background:"#fff",borderRadius:20,padding:26,boxShadow:"0 4px 20px rgba(26,92,168,0.07)",border:"1px solid #DDE8F8"}}>
                  <div style={{fontSize:28,marginBottom:12}}>{icon}</div>
                  <h4 style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:16,color:"#1A1A2E",marginBottom:8}}>{title}</h4>
                  <p style={{fontSize:13,lineHeight:1.6,color:"#777"}}>{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{background:"#fff",padding:"96px 6%"}}>
        <div style={{maxWidth:1180,margin:"0 auto"}}>
          <FadeUp>
            <div style={{textAlign:"center",maxWidth:580,margin:"0 auto 64px"}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"#EBF3FF",color:"#0D3B6E",padding:"6px 16px",borderRadius:100,fontSize:12,fontWeight:700,letterSpacing:"0.08em",marginBottom:16}}>💰 PRICING</div>
              <h2 style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"clamp(2rem,4vw,3rem)",letterSpacing:"-0.03em",lineHeight:1.12}}>
                Affordable for{" "}<span style={{color:"#22A84A"}}>every facility</span>
              </h2>
            </div>
          </FadeUp>

          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24,alignItems:"end"}}>
            {PRICING.map(({tier,price,unit,features,cta,highlight},i)=>(
              <FadeUp key={tier} delay={i*100}>
                <div style={{
                  background: highlight ? "linear-gradient(145deg,#1A5CA8,#0D3B6E)" : "#fff",
                  borderRadius:28,padding:36,
                  border: highlight ? "none" : "1px solid #EEF2F7",
                  boxShadow: highlight ? "0 28px 72px rgba(26,92,168,0.3)" : "0 4px 20px rgba(26,92,168,0.05)",
                  transform: highlight ? "translateY(-14px)" : "none",
                  color: highlight ? "#fff" : "#1A1A2E",
                }}>
                  {highlight && (
                    <div style={{display:"inline-block",background:"#22A84A",color:"#fff",fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:100,marginBottom:18,letterSpacing:"0.08em"}}>MOST POPULAR</div>
                  )}
                  <div style={{fontSize:13,fontWeight:600,color:highlight?"rgba(255,255,255,0.55)":"#999",marginBottom:6}}>{tier}</div>
                  <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:price==="Custom"?34:42,lineHeight:1,marginBottom:4}}>
                    {price==="Custom" ? "Custom" : `XAF ${price}`}
                  </div>
                  <div style={{fontSize:13,color:highlight?"rgba(255,255,255,0.45)":"#aaa",marginBottom:30}}>{unit}</div>
                  <div style={{borderTop:`1px solid ${highlight?"rgba(255,255,255,0.1)":"#EEF2F7"}`,paddingTop:22,marginBottom:26}}>
                    {features.map(f=>(
                      <div key={f} style={{display:"flex",alignItems:"center",gap:10,marginBottom:11}}>
                        <div style={{width:19,height:19,borderRadius:"50%",background:highlight?"rgba(134,239,172,0.18)":"#EBF9F0",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                          <span style={{fontSize:10,color:"#22A84A",fontWeight:700}}>✓</span>
                        </div>
                        <span style={{fontSize:13,color:highlight?"rgba(255,255,255,0.75)":"#555"}}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button style={{
                    width:"100%",padding:"13px",borderRadius:100,border:"none",
                    fontFamily:"inherit",fontSize:14,fontWeight:700,cursor:"pointer",
                    background: highlight ? "#22A84A" : "#1A5CA8",
                    color:"#fff",
                    boxShadow: highlight ? "0 8px 28px rgba(34,168,74,0.4)" : "0 8px 28px rgba(26,92,168,0.25)",
                    transition:"all .2s",
                  }}
                  onMouseOver={e=>{e.target.style.transform="translateY(-2px)";e.target.style.boxShadow=highlight?"0 14px 40px rgba(34,168,74,0.5)":"0 14px 40px rgba(26,92,168,0.35)"}}
                  onMouseOut={e=>{e.target.style.transform="none";e.target.style.boxShadow=highlight?"0 8px 28px rgba(34,168,74,0.4)":"0 8px 28px rgba(26,92,168,0.25)"}}
                  >{cta}</button>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section style={{background:"#F8FAFB",padding:"96px 6%"}}>
        <div style={{maxWidth:1180,margin:"0 auto",display:"flex",gap:72,alignItems:"center",flexWrap:"wrap"}}>
          <FadeUp style={{flexShrink:0}}>
            <div style={{
              width:260,height:260,borderRadius:32,
              background:"linear-gradient(145deg,#1A5CA8,#22A84A)",
              display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
              boxShadow:"0 32px 80px rgba(26,92,168,0.25)",color:"#fff",
            }}>
              <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:60,lineHeight:1}}>WM</div>
              <div style={{fontSize:14,color:"rgba(255,255,255,0.75)",marginTop:10,fontWeight:600}}>Wamo Mackbright</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginTop:4}}>Founder & CEO</div>
            </div>
          </FadeUp>

          <div style={{flex:1,minWidth:280}}>
            <FadeUp delay={80}>
              <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"#EBF3FF",color:"#0D3B6E",padding:"6px 16px",borderRadius:100,fontSize:12,fontWeight:700,letterSpacing:"0.08em",marginBottom:20}}>👤 ABOUT</div>
              <h2 style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"clamp(1.8rem,3.5vw,2.8rem)",letterSpacing:"-0.03em",lineHeight:1.18,marginBottom:20}}>
                Built by a Cameroonian,<br/><span style={{color:"#1A5CA8"}}>for Cameroonians</span>
              </h2>
              <p style={{fontSize:16,lineHeight:1.75,color:"#555",marginBottom:18}}>
                Bright4LF was founded by Wamo Mackbright — a Cameroonian health technology entrepreneur who witnessed first-hand how invisible medicine degradation was quietly undermining healthcare delivery across the country.
              </p>
              <p style={{fontSize:16,lineHeight:1.75,color:"#555",marginBottom:32}}>
                We are not adapting a Western solution for Africa. We are building from the ground up — designed for our heat, our supply chains, our language, and our communities.
              </p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                {[["📧","wamomackbright7@gmail.com"],["📞","+237 620 724 655"],["📍","Yaoundé, Cameroon"]].map(([ic,val])=>(
                  <div key={val} style={{display:"flex",alignItems:"center",gap:7,background:"#EBF3FF",padding:"8px 14px",borderRadius:100,fontSize:13,color:"#1A5CA8",fontWeight:500}}>
                    <span>{ic}</span><span>{val}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{background:"linear-gradient(135deg,#22A84A,#166534)",padding:"80px 6%",textAlign:"center",color:"#fff",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 20% 50%,rgba(255,255,255,0.06) 0%,transparent 50%),radial-gradient(circle at 80% 50%,rgba(255,255,255,0.06) 0%,transparent 50%)",pointerEvents:"none"}}/>
        <FadeUp style={{position:"relative",maxWidth:680,margin:"0 auto"}}>
          <h2 style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"clamp(2rem,4vw,3.2rem)",letterSpacing:"-0.03em",lineHeight:1.1,marginBottom:18}}>Ready to protect your patients?</h2>
          <p style={{fontSize:18,color:"rgba(255,255,255,0.72)",lineHeight:1.65,marginBottom:40}}>
            Join pharmacies and health facilities across Cameroon already using Bright4LF to ensure every medicine they dispense is safe and effective.
          </p>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
            <button className="btn btn-white">Order Sensor Tags Now</button>
            <button className="btn btn-ghost">Schedule a Demo</button>
          </div>
        </FadeUp>
      </section>

      {/* FOOTER */}
      <footer style={{background:"#0D3B6E",color:"rgba(255,255,255,0.55)",padding:"64px 6% 32px"}}>
        <div style={{maxWidth:1180,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:48,marginBottom:48}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
                <div style={{width:34,height:34,borderRadius:10,background:"linear-gradient(135deg,#1A5CA8,#22A84A)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <span style={{color:"#fff",fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:13}}>B4</span>
                </div>
                <span style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:17,color:"#fff"}}>BRIGHT4LF</span>
              </div>
              <p style={{fontSize:14,lineHeight:1.75,maxWidth:260,marginBottom:20}}>Health for Everyone. Smart medicine safety sensor technology built for the realities of Cameroon and Africa.</p>
              <div style={{fontSize:13}}>
                <div style={{marginBottom:6}}>📧 wamomackbright7@gmail.com</div>
                <div>📞 +237 620 724 655</div>
              </div>
            </div>
            {[["Product",["Sensor Tag","Mobile App","Dashboard","Pricing","Documentation"]],["Company",["About Us","Our Mission","Impact Report","Careers","Press"]],["Resources",["Download App","Partner Portal","MINSANTE Filing","Support","Contact"]]].map(([title,links])=>(
              <div key={title}>
                <div style={{fontFamily:"Syne,sans-serif",fontWeight:700,color:"#fff",marginBottom:18,fontSize:14}}>{title}</div>
                {links.map(l=>(
                  <div key={l} style={{marginBottom:10,fontSize:13,cursor:"pointer",transition:"color .2s"}}
                    onMouseOver={e=>e.target.style.color="#86EFAC"}
                    onMouseOut={e=>e.target.style.color="rgba(255,255,255,0.55)"}>{l}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,0.08)",paddingTop:28,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:14}}>
            <div style={{fontSize:13}}>© 2026 Bright4LF. All rights reserved. Registered in Yaoundé, Cameroon.</div>
            <div style={{display:"flex",gap:20,fontSize:13}}>
              {["Privacy Policy","Terms of Use","Regulatory Compliance"].map(l=>(
                <span key={l} style={{cursor:"pointer",transition:"color .2s"}}
                  onMouseOver={e=>e.target.style.color="#86EFAC"}
                  onMouseOut={e=>e.target.style.color="rgba(255,255,255,0.55)"}>{l}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
