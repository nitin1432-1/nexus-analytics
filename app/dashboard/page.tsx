'use client'

import { logoutAction } from '../actions'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Activity, CreditCard, DollarSign, Users, LogOut } from 'lucide-react'

// Mock Data for the Chart
const data = [
  { name: 'Mon', revenue: 4000, visitors: 2400 },
  { name: 'Tue', revenue: 3000, visitors: 1398 },
  { name: 'Wed', revenue: 2000, visitors: 9800 },
  { name: 'Thu', revenue: 2780, visitors: 3908 },
  { name: 'Fri', revenue: 1890, visitors: 4800 },
  { name: 'Sat', revenue: 2390, visitors: 3800 },
  { name: 'Sun', revenue: 3490, visitors: 4300 },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 p-6 hidden md:flex flex-col">
        <div className="text-xl font-bold mb-10 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg" />
          Nexus
        </div>
        
        <nav className="flex-1 space-y-2">
          {['Overview', 'Analytics', 'Customers', 'Settings'].map((item) => (
            <div key={item} className={`p-3 rounded-lg cursor-pointer ${item === 'Overview' ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:text-white'}`}>
              {item}
            </div>
          ))}
        </nav>

        <form action={logoutAction}>
          <button className="flex items-center gap-2 text-zinc-400 hover:text-red-400 transition-colors w-full p-2">
            <LogOut size={18} />
            Sign Out
          </button>
        </form>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700" />
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Revenue", value: "$45,231.89", icon: DollarSign, color: "text-green-500" },
            { title: "Subscriptions", value: "+2350", icon: Users, color: "text-blue-500" },
            { title: "Sales", value: "+12,234", icon: CreditCard, color: "text-orange-500" },
            { title: "Active Now", value: "+573", icon: Activity, color: "text-purple-500" },
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-zinc-400 text-sm">{stat.title}</span>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="h-[400px] w-full p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30">
           <h3 className="text-lg font-bold mb-6">Revenue Trajectory</h3>
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={data}>
               <defs>
                 <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                   <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                 </linearGradient>
               </defs>
               <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
               <XAxis dataKey="name" stroke="#71717a" tickLine={false} axisLine={false} />
               <YAxis stroke="#71717a" tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
               <Tooltip 
                 contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                 itemStyle={{ color: '#fff' }}
               />
               <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
             </AreaChart>
           </ResponsiveContainer>
        </div>
      </main>
    </div>
  )
}