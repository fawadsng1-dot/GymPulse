 "use client";
import { useState } from "react";
import {
  Activity, BarChart3, Bell, CalendarDays, ChevronDown, ChevronLeft, ChevronRight,
  CircleHelp, ClipboardList, Dumbbell, LayoutDashboard, LogOut, Menu, Search,
  Settings, ShieldCheck, Users, UserRound, Trophy, TrendingUp, Clock3, Plus,
  ArrowUpRight, ArrowDownRight, MoreHorizontal, Filter, Download, CheckCircle2,
  AlertCircle, Flame, Target, Weight, X
} from "lucide-react";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
  BarChart, Bar
} from "recharts";

const attendanceData = [
  {day:"Mon",visits:42},{day:"Tue",visits:56},{day:"Wed",visits:48},
  {day:"Thu",visits:67},{day:"Fri",visits:61},{day:"Sat",visits:82},{day:"Sun",visits:35}
];
const members = [
  {name:"Aarav Mehta",email:"aarav.m@example.com",plan:"Premium",status:"Active",expiry:"Nov 28, 2026",initials:"AM",color:"blue"},
  {name:"Priya Sharma",email:"priya.s@example.com",plan:"Standard",status:"Active",expiry:"Nov 12, 2026",initials:"PS",color:"pink"},
  {name:"Kabir Patel",email:"kabir.p@example.com",plan:"Premium",status:"Expiring",expiry:"Nov 05, 2026",initials:"KP",color:"orange"},
  {name:"Ananya Rao",email:"ananya.r@example.com",plan:"Standard",status:"Active",expiry:"Dec 16, 2026",initials:"AR",color:"purple"},
  {name:"Rohan Desai",email:"rohan.d@example.com",plan:"Basic",status:"Expired",expiry:"Oct 29, 2026",initials:"RD",color:"green"}
];
const nav = [
  {label:"Overview",icon:LayoutDashboard},
  {label:"Members",icon:Users},
  {label:"Attendance",icon:CalendarDays},
  {label:"Memberships",icon:ClipboardList},
  {label:"Workouts",icon:Dumbbell},
  {label:"Leaderboard",icon:Trophy},
  {label:"Reports",icon:BarChart3}
];
function Avatar({initials,color="blue"}:{initials:string;color?:string}) { return <div className={`avatar ${color}`}>{initials}</div>; }
function Metric({title,value,change,icon:Icon,positive=true}:{title:string;value:string;change:string;icon:any;positive?:boolean}) {
 return <div className="metric"><div className="metric-top"><span>{title}</span><div className="metric-icon"><Icon size={18}/></div></div><div className="metric-value">{value}</div><div className={`metric-change ${positive?"up":"down"}`}>{positive?<ArrowUpRight size={14}/>:<ArrowDownRight size={14}/>} {change}<span className="muted"> vs last month</span></div></div>
}
export default function Home() {
 const [active,setActive]=useState("Overview");
 const [search,setSearch]=useState("");
 const [role,setRole]=useState("Admin");
 const [showAdd,setShowAdd]=useState(false);
 const [checkin,setCheckin]=useState(false);
 const filtered=members.filter(m=>m.name.toLowerCase().includes(search.toLowerCase()));
 return <main className="shell">
  <aside className="sidebar">
   <div className="brand"><div className="brand-mark"><Activity size={21}/></div><span>gym<span className="brand-accent">pulse</span></span></div>
   <div className="gym-switch"><div className="gym-logo">AF</div><div><strong>Atlas Fitness</strong><small>Baner, Pune</small></div><ChevronDown size={15}/></div>
   <div className="nav-label">WORKSPACE</div>
   {nav.map(n=><button key={n.label} onClick={()=>setActive(n.label)} className={`nav-item ${active===n.label?"selected":""}`}><n.icon size={18}/><span>{n.label}</span>{n.label==="Members"&&<span className="nav-count">248</span>}</button>)}
   <div className="nav-label lower">PREFERENCES</div>
   <button className="nav-item" onClick={()=>setActive("Settings")}><Settings size={18}/><span>Settings</span></button>
   <button className="nav-item"><CircleHelp size={18}/><span>Help & support</span></button>
   <div className="sidebar-bottom"><div className="upgrade"><div className="upgrade-icon"><ShieldCheck size={18}/></div><strong>You're on Pro</strong><p>All tools unlocked for your gym.</p><button onClick={()=>setActive("Settings")}>Manage plan <ArrowUpRight size={14}/></button></div><div className="profile"><Avatar initials="FS" color="purple"/><div><strong>Fawad S.</strong><small>Gym administrator</small></div><MoreHorizontal size={18}/></div></div>
  </aside>
  <section className="main">
   <header className="topbar"><div className="breadcrumb">Atlas Fitness <ChevronRight size={14}/><strong>{active}</strong></div><div className="top-actions"><div className="role-toggle"><button className={role==="Admin"?"on":""} onClick={()=>setRole("Admin")}>Admin</button><button className={role==="Member"?"on":""} onClick={()=>{setRole("Member");setActive("Overview")}}>Member view</button></div><button className="icon-btn"><Search size={18}/></button><button className="icon-btn notification"><Bell size={18}/><i/></button><Avatar initials="FS" color="purple"/></div></header>
   <div className="content">
    <div className="page-heading"><div><div className="eyebrow">{role==="Admin"?"GYM OVERVIEW":"MEMBER SPACE"}</div><h1>{role==="Admin"?"Good evening, Fawad":"Welcome back, Aarav"} <span className="wave">✦</span></h1><p>{role==="Admin"?"Here's what's happening at your gym today.":"Your fitness journey is looking strong. Keep it going!"}</p></div><div className="heading-actions"><button className="btn secondary"><Download size={16}/> Export</button><button className="btn primary" onClick={()=>setShowAdd(true)}><Plus size={17}/> {role==="Admin"?"Add member":"Log workout"}</button></div></div>
    {role==="Admin"?<>
    <div className="metrics"><Metric title="Total members" value="248" change="+12.8%" icon={Users}/><Metric title="Today's check-ins" value="86" change="+8.4%" icon={CalendarDays}/><Metric title="Active memberships" value="219" change="+5.2%" icon={ShieldCheck}/><Metric title="Renewals due" value="18" change="-3.1%" icon={Clock3} positive={false}/></div>
    <div className="grid-main">
     <div className="panel attendance-panel"><div className="panel-head"><div><h3>Attendance overview</h3><p>Daily gym check-ins this week</p></div><button className="select-btn">This week <ChevronDown size={14}/></button></div><div className="chart-summary"><strong>391 <span className="positive">↑ 12.5%</span></strong><small>Total check-ins</small></div><div className="chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={attendanceData} margin={{top:8,right:8,left:-20,bottom:0}}><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3a9d94" stopOpacity={0.22}/><stop offset="100%" stopColor="#3a9d94" stopOpacity={0.01}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edf0f4"/><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill:"#9299a8",fontSize:12}}/><YAxis axisLine={false} tickLine={false} tick={{fill:"#9299a8",fontSize:12}}/><Tooltip/><Area type="monotone" dataKey="visits" stroke="#32978d" strokeWidth={2.5} fill="url(#fill)" /></AreaChart></ResponsiveContainer></div></div>
     <div className="panel plan-panel"><div className="panel-head"><div><h3>Membership mix</h3><p>Active plan distribution</p></div><button className="dots"><MoreHorizontal size={18}/></button></div><div className="plan-total"><strong>219</strong><span>active members</span></div><div className="plan-bars"><div><span><i className="dot teal"/> Premium <b>92</b></span><div className="bar-bg"><div style={{width:"42%",background:"#32978d"}}/></div></div><div><span><i className="dot blue"/> Standard <b>86</b></span><div className="bar-bg"><div style={{width:"39%",background:"#6589d7"}}/></div></div><div><span><i className="dot orange"/> Basic <b>41</b></span><div className="bar-bg"><div style={{width:"19%",background:"#e9a75e"}}/></div></div></div><button className="text-link" onClick={()=>setActive("Memberships")}>View memberships <ArrowUpRight size={14}/></button></div>
    </div>
    <div className="panel members-panel"><div className="panel-head"><div><h3>Recent members</h3><p>Latest member activity</p></div><button className="text-link" onClick={()=>setActive("Members")}>View all <ArrowUpRight size={14}/></button></div><div className="table-tools"><div className="searchbox"><Search size={15}/><input placeholder="Search members..." value={search} onChange={e=>setSearch(e.target.value)}/></div><button className="filter-btn"><Filter size={15}/> Filter</button></div><div className="table-wrap"><table><thead><tr><th>MEMBER</th><th>PLAN</th><th>STATUS</th><th>EXPIRY DATE</th><th></th></tr></thead><tbody>{filtered.slice(0,5).map(m=><tr key={m.email}><td><div className="member-cell"><Avatar initials={m.initials} color={m.color}/><div><strong>{m.name}</strong><small>{m.email}</small></div></div></td><td>{m.plan}</td><td><span className={`status ${m.status.toLowerCase()}`}><i/> {m.status}</span></td><td>{m.expiry}</td><td><button className="dots"><MoreHorizontal size={17}/></button></td></tr>)}</tbody></table></div></div>
    <div className="panel right-bottom"><div className="panel-head"><div><h3>Member consistency</h3><p>Attendance goal completion</p></div><button className="dots"><MoreHorizontal size={18}/></button></div><div className="consistency"><div className="consistency-ring"><strong>78%</strong><small>avg.</small></div><div className="consistency-info"><strong>Great momentum!</strong><p>Members are showing up consistently this month.</p><div className="mini-stat"><span>On track</span><b>172 members</b></div><div className="mini-stat"><span>Need a nudge</span><b>47 members</b></div></div></div></div>
    </>:<div className="member-view"><div className="metrics"><Metric title="Attendance this month" value="18 days" change="+3 days" icon={CalendarDays}/><Metric title="Current streak" value="6 days" change="Personal best: 9" icon={Flame}/><Metric title="Workouts logged" value="21" change="+4 this month" icon={Dumbbell}/><Metric title="Weight progress" value="−2.4 kg" change="Since starting" icon={Weight}/></div><div className="grid-main"><div className="panel attendance-panel"><div className="panel-head"><div><h3>Your weekly activity</h3><p>Keep building your consistency</p></div></div><div className="chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={attendanceData}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="day"/><YAxis/><Tooltip/><Bar dataKey="visits" fill="#32978d" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer></div></div><div className="panel"><h3>Today's workout</h3><p className="muted">Push day · 45 min</p><button className="btn primary full" onClick={()=>setShowAdd(true)}><Plus size={16}/> Log workout</button><div className="goal-card"><Target size={20}/><div><b>Weight goal</b><p>72 kg → 68 kg</p><small>60% of the way there</small></div></div></div></div><div className="panel"><div className="panel-head"><h3>Your next milestone</h3><span className="status active"><i/> On track</span></div><p>You're 2 visits away from your 20-day attendance goal. Keep it up!</p></div></div>}
    <footer className="footer"><span>© 2026 GymPulse</span><span><i className="live-dot"/> All systems operational <span className="footer-sep">•</span> Prototype demo data</span></footer>
   </div>
  </section>
  {showAdd&&<div className="modal-backdrop" onClick={()=>setShowAdd(false)}><div className="modal" onClick={e=>e.stopPropagation()}><div className="modal-head"><div><h2>{role==="Admin"?"Add a member":"Log a workout"}</h2><p>{role==="Admin"?"Create a demo member profile":"Record today's training"}</p></div><button className="icon-btn" onClick={()=>setShowAdd(false)}><X size={18}/></button></div><label>{role==="Admin"?"Full name":"Workout name"}<input placeholder={role==="Admin"?"e.g. Neha Kulkarni":"e.g. Push day"}/></label><label>{role==="Admin"?"Email address":"Duration (minutes)"}<input placeholder={role==="Admin"?"name@example.com":"45"}/></label><label>{role==="Admin"?"Membership plan":"Notes"}<select><option>{role==="Admin"?"Standard":"Chest, shoulders, triceps"}</option><option>{role==="Admin"?"Premium":"Legs"}</option><option>{role==="Admin"?"Basic":"Pull day"}</option></select></label><button className="btn primary full" onClick={()=>{setShowAdd(false);setCheckin(true)}}><CheckCircle2 size={16}/> {role==="Admin"?"Create demo member":"Save workout"}</button>{checkin&&<p className="success-note"><CheckCircle2 size={15}/> Demo action completed (sample only).</p>}</div></div>}
 </main>
}
