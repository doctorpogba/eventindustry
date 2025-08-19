"use client"

import { useState, useEffect } from "react"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import {
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  Legend,
  LabelList,
  ScatterChart,
  Scatter,
} from "recharts"
import { Bot, Leaf, Building2, Users, DollarSign, Calendar, Smartphone, BarChart3 } from "lucide-react"

const marketEvolutionData = [
  { year: "2019", total: 1100, mice: 770, entertainment: 170, sports: 320, virtual: 0 },
  { year: "2021", total: 640, mice: 450, entertainment: 100, sports: 180, virtual: 150 },
  { year: "2023", total: 1190, mice: 800, entertainment: 150, sports: 380, virtual: 280 },
  { year: "2024", total: 1227, mice: 870, entertainment: 190, sports: 453, virtual: 440 },
  { year: "2025E", total: 1339, mice: 920, entertainment: 203, sports: 520, virtual: 480 },
  { year: "2030F", total: 1950, mice: 1467, entertainment: 270, sports: 688, virtual: 650 },
]

const sectorData = [
  { name: "MICE", value: 870, fill: "#3b82f6", percentage: 70 },
  { name: "Sports Events", value: 453, fill: "#f59e0b", percentage: 18.5 },
  { name: "Live Entertainment", value: 190, fill: "#10b981", percentage: 7.8 },
  { name: "Virtual/Hybrid", value: 440, fill: "#8b5cf6", percentage: 18 },
  { name: "Other", value: 274, fill: "#ef4444", percentage: 11.2 },
]

const miceBreakdownData = [
  { name: "Meetings", value: 38.9, fill: "#3b82f6" },
  { name: "Exhibitions", value: 32, fill: "#f59e0b" },
  { name: "Conferences", value: 18, fill: "#10b981" },
  { name: "Incentives", value: 11.1, fill: "#8b5cf6" },
]

const subSectorData = [
  {
    sector: "B2B Exhibitions",
    revenue2024: 30,
    projected2035: 730.7,
    visitors: 318,
    space: 138,
    impact: 398,
    growth: 8.3,
  },
  {
    sector: "Corporate Events",
    revenue2024: 330.9,
    projected2035: 730.7,
    hybridShare: 57,
    growth: 7,
  },
  {
    sector: "Live Entertainment",
    revenue2024: 190,
    projected2030: 270.29,
    fans: 151,
    revenue: 19,
    growth: 5.9,
  },
  {
    sector: "Sports Events",
    revenue2024: 452.8,
    projected2030: 687.7,
    professionalShare: 68,
    growth: 7.2,
  },
]

const regionalData = [
  { region: "Europe", revenue2024: 437.4, projected2030: 751.5, cagr: 9.4, share: 50.4 },
  { region: "Asia-Pacific", revenue2024: 264.65, projected2030: 504.68, cagr: 10, share: 30.4 },
  { region: "North America", revenue2024: 140.6, projected2030: 223.1, cagr: 8, share: 16.1 },
  { region: "Middle East & India", revenue2024: 58.59, projected2030: 85.9, cagr: 6.9, share: 6.7 },
]

const technologyAdoptionData = [
  { metric: "AI Tool Adoption", value: 60, increase: "+60% in 1 year", color: "#3b82f6" },
  { metric: "Live Streaming Integration", value: 70, increase: "70% of events", color: "#10b981" },
  { metric: "Event App Usage", value: 23, increase: "+23% growth", color: "#f59e0b" },
  { metric: "Data Analytics Usage", value: 70, increase: "70% of organizers", color: "#8b5cf6" },
  { metric: "Hybrid Event Formats", value: 57, increase: "57% of corporate events", color: "#ef4444" },
  { metric: "Tech Spending Increase", value: 30, increase: "+30% in 2024", color: "#06b6d4" },
]

const costInflationData = [
  { category: "Cost per Attendee/Day", increase: 4.3, value: 169, color: "#ef4444" },
  { category: "Venue Prices", increase: 12.5, value: null, color: "#f59e0b" },
  { category: "Hotel Rates", increase: 2.6, value: null, color: "#f97316" },
  { category: "Airfare", increase: 0.6, value: null, color: "#eab308" },
]

const sustainabilityData = [
  { metric: "CO2 per 1000-person event", value: 530, unit: "metric tonnes" },
  { metric: "Travel emissions share", value: 70, unit: "% of total" },
  { metric: "Organizers adopting green practices", value: 45, unit: "% by 2025" },
  { metric: "Oil barrel equivalent", value: 1233, unit: "barrels" },
]

const keyMetrics = [
  { icon: Building2, label: "Exhibitions Worldwide", value: "32,000", color: "text-blue-500", trend: "+5.2%" },
  { icon: Users, label: "Exhibition Visitors", value: "318M", color: "text-green-500", trend: "+12%" },
  { icon: DollarSign, label: "Economic Impact", value: "$398B", color: "text-yellow-500", trend: "+8.7%" },
  { icon: Calendar, label: "Hybrid Events 2024", value: "57%", color: "text-purple-500", trend: "+23%" },
  { icon: Bot, label: "AI Adoption Surge", value: "60%", color: "text-cyan-500", trend: "1 year" },
  { icon: Leaf, label: "Green Practices", value: "45%", color: "text-emerald-500", trend: "by 2025" },
  { icon: Smartphone, label: "Event App Usage", value: "+23%", color: "text-indigo-500", trend: "YoY" },
  { icon: BarChart3, label: "Tech Spending", value: "+30%", color: "text-pink-500", trend: "2024" },
]

const virtualEventsData = [
  { year: "2023", value: 392.1, growth: 0 },
  { year: "2025", value: 580, growth: 48 },
  { year: "2030", value: 950, growth: 142 },
  { year: "2035", value: 1390, growth: 255 },
]

const businessModelData = [
  { category: "Exhibit Space", percentage: 45, value: 7.5, color: "#3b82f6" },
  { category: "Registration/Tickets", percentage: 25, value: 4.2, color: "#f59e0b" },
  { category: "Sponsorship/Advertising", percentage: 20, value: 3.3, color: "#10b981" },
  { category: "Digital/Ancillary", percentage: 10, value: 1.7, color: "#8b5cf6" },
]

const costStructureData = [
  { category: "Venue Rental & F&B", percentage: 32.5, value: 4.0, color: "#ef4444" },
  { category: "AV/Production & Staging", percentage: 15, value: 1.7, color: "#f59e0b" },
  { category: "Labour & Staffing", percentage: 15, value: 1.7, color: "#10b981" },
  { category: "Marketing & Sales", percentage: 10, value: 1.1, color: "#8b5cf6" },
  { category: "Technology & Data", percentage: 10, value: 1.1, color: "#06b6d4" },
  { category: "G&A & Contingency", percentage: 12.5, value: 1.7, color: "#6b7280" },
]

const stakeholderData = [
  {
    stakeholder: "Organisers",
    jobs: "Drive growth & profitability; secure exhibitors/sponsors; deliver high-quality experiences",
    painPoints: "Rising costs (venues, labour); uncertain demand; fragmented data; sustainability compliance",
    kpis: "Net revenue, occupancy/floor space sold, attendee growth, NPS, profit margin, emissions per attendee",
  },
  {
    stakeholder: "Exhibitors & Sponsors",
    jobs: "Generate pipeline; convert MQL→SQL; maximise ROI; showcase products",
    painPoints: "Lead quality uncertainty; difficulty measuring ROI; limited dwell time; high participation cost",
    kpis: "Cost per qualified lead, qualified meetings, engagement rates, lead-to-opportunity conversion, sponsorship ROI",
  },
  {
    stakeholder: "Attendees",
    jobs: "Learn, network, discover new products; justify time & money; safety; seamless journey",
    painPoints: "Overwhelming content; poor matchmaking; travel cost/time; digital fatigue",
    kpis: "Time-to-value, networking density, session attendance vs. plan, app adoption, satisfaction (NPS/CSAT)",
  },
]

const advancedTechData = [
  {
    technology: "AR/VR & Metaverse",
    adoption: 18,
    trend: "surge in 2024",
    use: "Virtual showrooms, immersive product demos, remote participation",
  },
  {
    technology: "AI Content Generation",
    adoption: 46,
    trend: "60% increase",
    use: "Copywriting, speaker coaching, translation, summarisation, itinerary planning",
  },
  {
    technology: "Data Analytics Dashboards",
    adoption: 70,
    trend: "centralised",
    use: "Audience segmentation, ROI tracking, heatmaps, sponsor reporting, price optimisation",
  },
  {
    technology: "Mobile Integration",
    adoption: 23,
    trend: "usage increase",
    use: "Event apps, networking, lead retrieval, real-time engagement",
  },
]

export default function EventsIndustryDashboard() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  const renderBarLabel = (props) => {
    const { x, y, width, height, value } = props
    return (
      <text x={x + width / 2} y={y - 5} fill="white" textAnchor="middle" fontSize="12" fontWeight="bold">
        {`$${value}B`}
      </text>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative py-32 px-6 text-center overflow-hidden">
        <div className="absolute top-8 right-8 flex items-center space-x-3">
          <div className="bg-blue-600 text-white px-3 py-1 text-xs font-bold tracking-wider rounded">EP</div>
          <div className="text-blue-400 text-xs font-semibold tracking-wider">EXPOPLATFORM</div>
        </div>

        <div className="absolute top-8 left-8">
          <div className="bg-red-600 text-white px-4 py-2 text-sm font-bold tracking-wider">EVENTS</div>
        </div>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="text-sm text-gray-400 uppercase tracking-widest mb-4">EXECUTIVE INTELLIGENCE</div>
            <div className="grid grid-cols-3 gap-8 text-xs text-gray-500 uppercase tracking-wider mb-16">
              <div>
                <div className="text-red-500">• RECOVERY</div>
                <div>• GROWTH</div>
                <div>• STRATEGY</div>
              </div>
              <div>
                <div className="text-red-500">• TECHNOLOGY</div>
                <div>• INNOVATION</div>
                <div>• TRANSFORMATION</div>
              </div>
              <div>
                <div className="text-red-500">• SUSTAINABILITY</div>
                <div>• FUTURE</div>
                <div>• OPPORTUNITY</div>
              </div>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-12 leading-none tracking-tight">
            I ANALYZE;
            <br />
            THEREFORE
            <br />
            <span className="text-red-500">I PREDICT</span>
          </h1>

          <div className="text-sm text-gray-400 uppercase tracking-widest mb-8">
            GLOBAL EVENTS INDUSTRY DEEP DIVE • 2019-2030
          </div>

          <div className="text-xs text-blue-400 uppercase tracking-widest mb-8 opacity-80">
            POWERED BY EXPOPLATFORM • AI-POWERED SMART EVENT INTELLIGENCE
          </div>

          <div className="max-w-2xl mx-auto text-left">
            <p className="text-gray-300 leading-relaxed mb-8">
              I'm the architect of strategic intelligence for the global events industry. My analysis reveals the path
              from $1.1T collapse to $2.1T opportunity, dissecting recovery patterns, technological transformation, and
              the future of human connection in a digital-first world.
            </p>

            <div className="text-sm text-gray-500">
              Currently analyzing <span className="text-red-500">market dynamics</span> for strategic decision-making.
              I've also been the co-founder of <span className="text-red-500">data-driven insights</span> and
              <span className="text-red-500">predictive analytics</span>, which have been serving the executive
              community for more than five years.
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-500/20 to-transparent border border-red-500/30" />
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            <div className="text-center">
              <div className="text-6xl font-bold text-white mb-4">$1.23T</div>
              <div className="text-red-500 font-semibold text-lg mb-2">2024 RECOVERY</div>
              <div className="text-gray-400 text-sm">95% of pre-pandemic volume restored</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-white mb-4">$2.1T</div>
              <div className="text-red-500 font-semibold text-lg mb-2">2030 POTENTIAL</div>
              <div className="text-gray-400 text-sm">7-9% CAGR growth trajectory</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-white mb-4">70%</div>
              <div className="text-red-500 font-semibold text-lg mb-2">MICE DOMINANCE</div>
              <div className="text-gray-400 text-sm">$870B market leadership</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">MARKET INTELLIGENCE</h2>
            <p className="text-gray-400 max-w-2xl">
              Comprehensive analysis revealing the transformation from pandemic disruption to unprecedented growth
              opportunity across global markets.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Market Evolution Visualization */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">RECOVERY TRAJECTORY</h3>
                <div className="bg-black p-8 rounded-lg">
                  <ChartContainer
                    config={{
                      total: { label: "Total Market", color: "#ef4444" },
                      mice: { label: "MICE Market", color: "#ffffff" },
                    }}
                    className="h-64"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={marketEvolutionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="year" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" tickFormatter={(value) => `$${value}B`} />
                        <Legend wrapperStyle={{ color: "#ffffff" }} iconType="line" />
                        <ChartTooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-black border border-gray-600 p-3 rounded-lg">
                                  <p className="text-white font-semibold">{label}</p>
                                  {payload.map((entry, index) => (
                                    <p key={index} style={{ color: entry.color }}>
                                      {entry.dataKey}: ${entry.value}B
                                    </p>
                                  ))}
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="total"
                          stroke="#ef4444"
                          fill="#ef4444"
                          fillOpacity={0.2}
                          strokeWidth={3}
                          name="Total Market"
                        />
                        <Area
                          type="monotone"
                          dataKey="mice"
                          stroke="#ffffff"
                          fill="#ffffff"
                          fillOpacity={0.1}
                          strokeWidth={2}
                          name="MICE Market"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">SECTOR BREAKDOWN</h3>
                <div className="bg-black p-8 rounded-lg">
                  <ChartContainer
                    config={{
                      value: { label: "Value", color: "#ef4444" },
                    }}
                    className="h-64"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sectorData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderCustomizedLabel}
                          innerRadius={40}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {sectorData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Legend
                          wrapperStyle={{ color: "#ffffff" }}
                          formatter={(value, entry) => `${value} ($${entry.payload.value}B)`}
                        />
                        <ChartTooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload
                              return (
                                <div className="bg-black border border-gray-600 p-3 rounded-lg">
                                  <p className="text-white font-semibold">{data.name}</p>
                                  <p style={{ color: data.fill }}>
                                    ${data.value}B ({data.percentage}%)
                                  </p>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>
            </div>

            {/* Strategic Insights */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">STRATEGIC INSIGHTS</h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-red-500 pl-6">
                    <h4 className="text-lg font-bold text-white mb-2">UNPRECEDENTED RECOVERY</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      From pandemic collapse to $1.23T in 2024, approaching $1.34T in 2025. Exhibitions and corporate
                      meetings nearly regained pre-pandemic volumes with 95.6 recovery index.
                    </p>
                  </div>

                  <div className="border-l-4 border-white pl-6">
                    <h4 className="text-lg font-bold text-white mb-2">ASIA-PACIFIC SURGE</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Asia-Pacific leads with 10% CAGR, China at 9.5%, Europe 9.4%, North America 8%. Geographic
                      expansion targeting high-growth regions presents massive opportunity.
                    </p>
                  </div>

                  <div className="border-l-4 border-gray-500 pl-6">
                    <h4 className="text-lg font-bold text-white mb-2">AI REVOLUTION</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      AI adoption surged 60% in 2024, with 46% using ChatGPT/Gemini. Event tech spending rose 30%.
                      Software market growing 13.2% CAGR to $17.33B by 2030.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 p-8 rounded-lg border border-red-500/20">
                <h4 className="text-xl font-bold text-white mb-4">THE OPPORTUNITY</h4>
                <p className="text-gray-300 leading-relaxed">
                  Despite technological advances, the human desire for in-person connection remains strong. The most
                  successful strategies will balance digital innovation with meaningful face-to-face experiences,
                  creating hybrid models that maximize the{" "}
                  <span className="text-red-500 font-semibold">$1.9-2.1 trillion opportunity by 2030</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">MICE MARKET DOMINANCE</h2>
            <p className="text-gray-400 max-w-2xl">
              $870.46 billion MICE market breakdown revealing strategic opportunities across meetings, incentives,
              conferences, and exhibitions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-black p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-6">MICE SEGMENT BREAKDOWN</h3>
              <ChartContainer
                config={{
                  value: { label: "Percentage", color: "#ef4444" },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={miceBreakdownData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {miceBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Legend
                      wrapperStyle={{ color: "#ffffff" }}
                      formatter={(value, entry) => `${value} (${entry.payload.value}%)`}
                    />
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-black border border-gray-600 p-3 rounded-lg">
                              <p className="text-white font-semibold">{data.name}</p>
                              <p style={{ color: data.fill }}>{data.value}%</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="space-y-6">
              <div className="bg-red-500/10 p-6 rounded-lg border border-red-500/20">
                <div className="text-3xl font-bold text-white mb-2">38.9%</div>
                <div className="text-red-500 font-semibold mb-2">MEETINGS</div>
                <div className="text-gray-400 text-sm">
                  Largest MICE segment driving business travel and corporate engagement
                </div>
              </div>

              <div className="bg-white/10 p-6 rounded-lg border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">32,000</div>
                <div className="text-white font-semibold mb-2">EXHIBITIONS</div>
                <div className="text-gray-400 text-sm">
                  Global exhibitions with 318M visitors and $398B economic impact
                </div>
              </div>

              <div className="bg-gray-500/10 p-6 rounded-lg border border-gray-500/20">
                <div className="text-3xl font-bold text-white mb-2">18%</div>
                <div className="text-gray-400 font-semibold mb-2">CONFERENCES</div>
                <div className="text-gray-400 text-sm">Major driver of business travel and knowledge sharing</div>
              </div>

              <div className="bg-gray-400/10 p-6 rounded-lg border border-gray-400/20">
                <div className="text-3xl font-bold text-white mb-2">11.1%</div>
                <div className="text-gray-400 font-semibold mb-2">INCENTIVES</div>
                <div className="text-gray-400 text-sm">Growing segment as companies reward employees</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">SUB-SECTOR PERFORMANCE</h2>
            <p className="text-gray-400 max-w-2xl">
              Detailed analysis of key event industry segments showing growth trajectories and market opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {subSectorData.map((sector, index) => (
              <div key={index} className="bg-gray-900 p-8 rounded-lg border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-6">{sector.sector.toUpperCase()}</h3>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-2xl font-bold text-red-500 mb-1">${sector.revenue2024}B</div>
                    <div className="text-gray-400 text-xs">2024 Revenue</div>
                  </div>

                  <div>
                    <div className="text-2xl font-bold text-white mb-1">{sector.growth}%</div>
                    <div className="text-gray-400 text-xs">CAGR Growth</div>
                  </div>
                </div>

                {sector.visitors && (
                  <div className="mb-4">
                    <div className="text-lg font-bold text-white mb-1">{sector.visitors}M</div>
                    <div className="text-gray-400 text-xs">Annual Visitors</div>
                  </div>
                )}

                {sector.hybridShare && (
                  <div className="mb-4">
                    <div className="text-lg font-bold text-white mb-1">{sector.hybridShare}%</div>
                    <div className="text-gray-400 text-xs">Hybrid Format Adoption</div>
                  </div>
                )}

                {sector.professionalShare && (
                  <div className="mb-4">
                    <div className="text-lg font-bold text-white mb-1">{sector.professionalShare}%</div>
                    <div className="text-gray-400 text-xs">Professional Sports Share</div>
                  </div>
                )}

                <div className="mt-4 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(sector.growth * 10, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">REGIONAL MARKET DYNAMICS</h2>
            <p className="text-gray-400 max-w-2xl">
              Geographic analysis revealing growth opportunities across global markets with specific revenue projections
              and CAGR rates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-black p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-6">REGIONAL MARKET SIZE & GROWTH</h3>
              <ChartContainer
                config={{
                  revenue2024: { label: "2024 Revenue ($B)", color: "#ef4444" },
                  cagr: { label: "Growth Rate (%)", color: "#fbbf24" },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={regionalData} margin={{ left: 60, right: 60, top: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      type="number"
                      dataKey="revenue2024"
                      stroke="#9ca3af"
                      tickFormatter={(value) => `$${value}B`}
                      label={{
                        value: "2024 Revenue ($B)",
                        position: "insideBottom",
                        offset: -10,
                        style: { textAnchor: "middle", fill: "#9ca3af" },
                      }}
                    />
                    <YAxis
                      type="number"
                      dataKey="cagr"
                      stroke="#9ca3af"
                      tickFormatter={(value) => `${value}%`}
                      label={{
                        value: "Growth Rate (CAGR %)",
                        angle: -90,
                        position: "insideLeft",
                        style: { textAnchor: "middle", fill: "#9ca3af" },
                      }}
                    />
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-black border border-gray-600 p-4 rounded-lg">
                              <p className="text-white font-semibold text-lg">{data.region}</p>
                              <p className="text-red-400">2024 Revenue: ${data.revenue2024}B</p>
                              <p className="text-yellow-400">2030 Projected: ${data.projected2030}B</p>
                              <p className="text-green-400">Market Share: {data.share}%</p>
                              <p className="text-blue-400">CAGR: {data.cagr}%</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Scatter dataKey="cagr" fill="#ef4444">
                      {regionalData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.region === "Europe"
                              ? "#ef4444"
                              : entry.region === "Asia-Pacific"
                                ? "#10b981"
                                : entry.region === "North America"
                                  ? "#3b82f6"
                                  : "#f59e0b"
                          }
                        />
                      ))}
                      <LabelList dataKey="region" position="top" fill="white" fontSize={12} offset={10} />
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="mt-4 text-sm text-gray-400">
                <p>Bubble position shows revenue size (X) vs growth rate (Y)</p>
              </div>
            </div>

            <div className="bg-black p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-6">REVENUE PROJECTIONS 2024-2030</h3>
              <ChartContainer
                config={{
                  revenue2024: { label: "2024 Revenue", color: "#ef4444" },
                  projected2030: { label: "2030 Projected", color: "#10b981" },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regionalData} margin={{ left: 20, right: 20, top: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="region" stroke="#9ca3af" angle={-45} textAnchor="end" height={80} fontSize={12} />
                    <YAxis stroke="#9ca3af" tickFormatter={(value) => `$${value}B`} />
                    <ChartTooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = regionalData.find((d) => d.region === label)
                          return (
                            <div className="bg-black border border-gray-600 p-3 rounded-lg">
                              <p className="text-white font-semibold">{label}</p>
                              <p className="text-red-400">2024: ${payload[0]?.value}B</p>
                              <p className="text-green-400">2030: ${payload[1]?.value}B</p>
                              <p className="text-yellow-400">
                                Growth: +${(payload[1]?.value - payload[0]?.value).toFixed(1)}B
                              </p>
                              <p className="text-blue-400">CAGR: {data?.cagr}%</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Legend
                      wrapperStyle={{ paddingTop: "20px" }}
                      formatter={(value) => <span style={{ color: "#fff" }}>{value}</span>}
                    />
                    <Bar dataKey="revenue2024" fill="#ef4444" name="2024 Revenue ($B)" radius={[4, 4, 0, 0]}>
                      <LabelList
                        dataKey="revenue2024"
                        position="top"
                        fill="white"
                        fontSize={10}
                        formatter={(value) => `$${value}B`}
                      />
                    </Bar>
                    <Bar dataKey="projected2030" fill="#10b981" name="2030 Projected ($B)" radius={[4, 4, 0, 0]}>
                      <LabelList
                        dataKey="projected2030"
                        position="top"
                        fill="white"
                        fontSize={10}
                        formatter={(value) => `$${value}B`}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">COST INFLATION ANALYSIS</h2>
            <p className="text-gray-400 max-w-2xl">
              Rising costs across venue, accommodation, and travel presenting strategic challenges for event organizers
              and attendees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {costInflationData.map((cost, index) => (
              <div key={index} className="bg-gray-900 p-8 rounded-lg border border-gray-800">
                <div className="text-4xl font-bold text-red-500 mb-4">+{cost.increase}%</div>
                <div className="text-white font-semibold text-sm mb-2 uppercase tracking-wider">{cost.category}</div>
                {cost.value && <div className="text-gray-400 text-xs mb-4">${cost.value} per attendee/day</div>}
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(cost.increase * 8, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">VIRTUAL EVENTS EXPLOSION</h2>
            <p className="text-gray-400 max-w-2xl">
              Virtual events market projected to reach $1.39 trillion by 2035, representing a 255% growth from 2023
              baseline.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-black p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-6">VIRTUAL MARKET TRAJECTORY</h3>
              <ChartContainer
                config={{
                  value: { label: "Market Value", color: "#ef4444" },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={virtualEventsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="year" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" tickFormatter={(value) => `$${value}B`} />
                    <Legend wrapperStyle={{ color: "#ffffff" }} />
                    <ChartTooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-black border border-gray-600 p-3 rounded-lg">
                              <p className="text-white font-semibold">{label}</p>
                              <p className="text-red-500">${payload[0].value}B Market Value</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#ef4444"
                      strokeWidth={3}
                      dot={{ fill: "#ef4444", strokeWidth: 2, r: 6 }}
                      name="Virtual Events Market"
                    >
                      <LabelList
                        dataKey="value"
                        position="top"
                        fill="white"
                        fontSize={12}
                        formatter={(value) => `$${value}B`}
                      />
                    </Line>
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="space-y-8">
              <div className="bg-red-500/10 p-8 rounded-lg border border-red-500/20">
                <div className="text-5xl font-bold text-white mb-4">$1.39T</div>
                <div className="text-red-500 font-semibold text-lg mb-2">2035 PROJECTION</div>
                <div className="text-gray-400">255% growth from 2023 baseline of $392.1B</div>
              </div>

              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-6">
                  <h4 className="text-lg font-bold text-white mb-2">HYBRID DOMINANCE</h4>
                  <p className="text-gray-400 text-sm">
                    57% of corporate events adopted hybrid formats in 2024, with 80% reporting increased participation
                  </p>
                </div>

                <div className="border-l-4 border-white pl-6">
                  <h4 className="text-lg font-bold text-white mb-2">TECHNOLOGY INTEGRATION</h4>
                  <p className="text-gray-400 text-sm">
                    70% of events now incorporate live streaming, AI chatbots, and automated registrations
                  </p>
                </div>

                <div className="border-l-4 border-gray-500 pl-6">
                  <h4 className="text-lg font-bold text-white mb-2">HUMAN CONNECTION</h4>
                  <p className="text-gray-400 text-sm">
                    Despite digital transformation, 82% of attendees still prefer in-person events
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">SUSTAINABILITY IMPERATIVES</h2>
            <p className="text-gray-400 max-w-2xl">
              Carbon footprint analysis and industry response to environmental challenges driving regulatory compliance
              and attendee expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sustainabilityData.map((metric, index) => (
              <div key={index} className="bg-gray-900 p-8 rounded-lg border border-gray-800">
                <div className="flex items-center mb-4">
                  <Leaf className="w-8 h-8 text-green-500 mr-3" />
                  <div className="text-4xl font-bold text-white">{metric.value}</div>
                </div>
                <div className="text-green-500 font-semibold text-sm mb-2 uppercase tracking-wider">{metric.unit}</div>
                <div className="text-gray-400 text-xs">{metric.metric}</div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-green-500/10 p-8 rounded-lg border border-green-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">INDUSTRY RESPONSE</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-green-500 mb-2">45%</div>
                <div className="text-white font-semibold mb-2">Green Practices Adoption</div>
                <div className="text-gray-400 text-sm">Event organizers planning sustainable practices by 2025</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-500 mb-2">50-90%</div>
                <div className="text-white font-semibold mb-2">Travel Emissions</div>
                <div className="text-gray-400 text-sm">Share of total event carbon footprint from travel</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-500 mb-2">530</div>
                <div className="text-white font-semibold mb-2">Metric Tonnes CO₂</div>
                <div className="text-gray-400 text-sm">1000-person, 3-day conference footprint</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">BUSINESS MODEL INTELLIGENCE</h2>
            <p className="text-gray-400 max-w-2xl">
              Revenue and cost structure analysis for 10,000-attendee events revealing strategic optimization
              opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-black p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-6">REVENUE BREAKDOWN</h3>
              <ChartContainer
                config={{
                  value: { label: "Revenue", color: "#ef4444" },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={businessModelData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {businessModelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend
                      wrapperStyle={{ color: "#ffffff" }}
                      formatter={(value, entry) => `${value} ($${entry.payload.value}M)`}
                    />
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-black border border-gray-600 p-3 rounded-lg">
                              <p className="text-white font-semibold">{data.category}</p>
                              <p style={{ color: data.color }}>
                                ${data.value}M ({data.percentage}%)
                              </p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="bg-black p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-6">COST STRUCTURE</h3>
              <ChartContainer
                config={{
                  value: { label: "Cost", color: "#ef4444" },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={costStructureData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {costStructureData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend
                      wrapperStyle={{ color: "#ffffff" }}
                      formatter={(value, entry) => `${value} ($${entry.payload.value}M)`}
                    />
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-black border border-gray-600 p-3 rounded-lg">
                              <p className="text-white font-semibold">{data.category}</p>
                              <p style={{ color: data.color }}>
                                ${data.value}M ({data.percentage}%)
                              </p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-white mb-4">REVENUE STREAMS</h4>
              {businessModelData.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-black rounded-lg">
                  <div>
                    <div className="text-white font-semibold">{item.category}</div>
                    <div className="text-gray-400 text-sm">{item.percentage}% of total</div>
                  </div>
                  <div className="text-xl font-bold text-red-500">${item.value}M</div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-bold text-white mb-4">COST CATEGORIES</h4>
              {costStructureData.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-black rounded-lg">
                  <div>
                    <div className="text-white font-semibold">{item.category}</div>
                    <div className="text-gray-400 text-sm">{item.percentage}% of total</div>
                  </div>
                  <div className="text-xl font-bold text-white">${item.value}M</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">PESTLE FORCES & STRUCTURAL SHIFTS</h2>
            <p className="text-gray-400 max-w-2xl">
              Macro-environmental analysis revealing high, medium, and low impact drivers shaping the events industry
              landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Political */}
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                <h3 className="text-xl font-bold text-white">POLITICAL</h3>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <div className="text-red-500 font-semibold text-sm">HIGH IMPACT</div>
                  <div className="text-gray-300 text-sm">EU sustainability reporting requirements</div>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <div className="text-yellow-500 font-semibold text-sm">MEDIUM IMPACT</div>
                  <div className="text-gray-300 text-sm">Travel restrictions & visa policies</div>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <div className="text-green-500 font-semibold text-sm">LOW IMPACT</div>
                  <div className="text-gray-300 text-sm">Local event regulations</div>
                </div>
              </div>
            </div>

            {/* Economic */}
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                <h3 className="text-xl font-bold text-white">ECONOMIC</h3>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <div className="text-red-500 font-semibold text-sm">HIGH IMPACT</div>
                  <div className="text-gray-300 text-sm">Rising venue & labor costs (10-15%)</div>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <div className="text-red-500 font-semibold text-sm">HIGH IMPACT</div>
                  <div className="text-gray-300 text-sm">Asia-Pacific 10% CAGR growth</div>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <div className="text-yellow-500 font-semibold text-sm">MEDIUM IMPACT</div>
                  <div className="text-gray-300 text-sm">Currency fluctuations</div>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                <h3 className="text-xl font-bold text-white">SOCIAL</h3>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <div className="text-red-500 font-semibold text-sm">HIGH IMPACT</div>
                  <div className="text-gray-300 text-sm">82% prefer in-person connection</div>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <div className="text-yellow-500 font-semibold text-sm">MEDIUM IMPACT</div>
                  <div className="text-gray-300 text-sm">Hybrid format acceptance (57%)</div>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <div className="text-yellow-500 font-semibold text-sm">MEDIUM IMPACT</div>
                  <div className="text-gray-300 text-sm">Sustainability expectations</div>
                </div>
              </div>
            </div>

            {/* Technology */}
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                <h3 className="text-xl font-bold text-white">TECHNOLOGY</h3>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <div className="text-red-500 font-semibold text-sm">HIGH IMPACT</div>
                  <div className="text-gray-300 text-sm">AI adoption surge (60% increase)</div>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <div className="text-red-500 font-semibold text-sm">HIGH IMPACT</div>
                  <div className="text-gray-300 text-sm">Event tech spending +30%</div>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <div className="text-yellow-500 font-semibold text-sm">MEDIUM IMPACT</div>
                  <div className="text-gray-300 text-sm">AR/VR integration (18% surge)</div>
                </div>
              </div>
            </div>

            {/* Legal */}
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                <h3 className="text-xl font-bold text-white">LEGAL</h3>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <div className="text-red-500 font-semibold text-sm">HIGH IMPACT</div>
                  <div className="text-gray-300 text-sm">Data privacy regulations (GDPR)</div>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <div className="text-yellow-500 font-semibold text-sm">MEDIUM IMPACT</div>
                  <div className="text-gray-300 text-sm">Carbon reporting mandates</div>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <div className="text-green-500 font-semibold text-sm">LOW IMPACT</div>
                  <div className="text-gray-300 text-sm">Venue liability standards</div>
                </div>
              </div>
            </div>

            {/* Environmental */}
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                <h3 className="text-xl font-bold text-white">ENVIRONMENTAL</h3>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <div className="text-red-500 font-semibold text-sm">HIGH IMPACT</div>
                  <div className="text-gray-300 text-sm">530 tonnes CO₂ per 1K conference</div>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <div className="text-red-500 font-semibold text-sm">HIGH IMPACT</div>
                  <div className="text-gray-300 text-sm">Travel emissions (50-90% of footprint)</div>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <div className="text-yellow-500 font-semibold text-sm">MEDIUM IMPACT</div>
                  <div className="text-gray-300 text-sm">Circular design adoption</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">COMPETITIVE LANDSCAPE</h2>
            <p className="text-gray-400 max-w-2xl">
              Porter's Five Forces analysis and value chain mapping revealing competitive dynamics and strategic
              positioning opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Porter's Five Forces */}
            <div className="bg-black p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">PORTER'S FIVE FORCES</h3>
              <div className="relative">
                <div className="grid grid-cols-3 gap-4 h-80">
                  {/* Supplier Power */}
                  <div className="flex items-start justify-center">
                    <div className="bg-red-500/20 p-4 rounded-lg border border-red-500/30 text-center">
                      <div className="text-red-500 font-bold text-sm mb-2">SUPPLIER POWER</div>
                      <div className="text-white font-bold text-lg mb-1">HIGH</div>
                      <div className="text-gray-400 text-xs">Venue scarcity, specialized AV</div>
                    </div>
                  </div>

                  {/* Competitive Rivalry */}
                  <div className="flex items-center justify-center">
                    <div className="bg-red-500/20 p-4 rounded-lg border border-red-500/30 text-center">
                      <div className="text-red-500 font-bold text-sm mb-2">RIVALRY</div>
                      <div className="text-white font-bold text-lg mb-1">INTENSE</div>
                      <div className="text-gray-400 text-xs">Fragmented market, low switching costs</div>
                    </div>
                  </div>

                  {/* Buyer Power */}
                  <div className="flex items-start justify-center">
                    <div className="bg-yellow-500/20 p-4 rounded-lg border border-yellow-500/30 text-center">
                      <div className="text-yellow-500 font-bold text-sm mb-2">BUYER POWER</div>
                      <div className="text-white font-bold text-lg mb-1">MEDIUM</div>
                      <div className="text-gray-400 text-xs">Price sensitivity, multiple options</div>
                    </div>
                  </div>

                  {/* New Entrants */}
                  <div className="flex items-end justify-center">
                    <div className="bg-yellow-500/20 p-4 rounded-lg border border-yellow-500/30 text-center">
                      <div className="text-yellow-500 font-bold text-sm mb-2">NEW ENTRANTS</div>
                      <div className="text-white font-bold text-lg mb-1">MEDIUM</div>
                      <div className="text-gray-400 text-xs">Digital platforms, low barriers</div>
                    </div>
                  </div>

                  <div></div>

                  {/* Substitutes */}
                  <div className="flex items-end justify-center">
                    <div className="bg-red-500/20 p-4 rounded-lg border border-red-500/30 text-center">
                      <div className="text-red-500 font-bold text-sm mb-2">SUBSTITUTES</div>
                      <div className="text-white font-bold text-lg mb-1">HIGH</div>
                      <div className="text-gray-400 text-xs">Virtual events, hybrid formats</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Players & M&A */}
            <div className="space-y-8">
              <div className="bg-black p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-6">TOP MARKET PLAYERS</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-900 rounded-lg">
                    <div>
                      <div className="text-white font-semibold">Live Nation Entertainment</div>
                      <div className="text-gray-400 text-sm">151M fans, $19B revenue (2024)</div>
                    </div>
                    <div className="text-red-500 font-bold">#1</div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-900 rounded-lg">
                    <div>
                      <div className="text-white font-semibold">Informa Markets</div>
                      <div className="text-gray-400 text-sm">Global B2B exhibitions leader</div>
                    </div>
                    <div className="text-red-500 font-bold">#2</div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-900 rounded-lg">
                    <div>
                      <div className="text-white font-semibold">Reed Exhibitions</div>
                      <div className="text-gray-400 text-sm">500+ events, 43 countries</div>
                    </div>
                    <div className="text-red-500 font-bold">#3</div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-900 rounded-lg">
                    <div>
                      <div className="text-white font-semibold">Messe Frankfurt</div>
                      <div className="text-gray-400 text-sm">European trade fair leader</div>
                    </div>
                    <div className="text-red-500 font-bold">#4</div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 p-8 rounded-lg border border-red-500/20">
                <h4 className="text-xl font-bold text-white mb-4">NOTABLE M&A ACTIVITY</h4>
                <div className="space-y-3">
                  <div className="text-gray-300 text-sm">• Event tech consolidation accelerating</div>
                  <div className="text-gray-300 text-sm">• Virtual platform acquisitions surge</div>
                  <div className="text-gray-300 text-sm">• Regional expansion through partnerships</div>
                  <div className="text-gray-300 text-sm">• AI/data analytics company acquisitions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">CUSTOMER INSIGHTS</h2>
            <p className="text-gray-400 max-w-2xl">
              Journey mapping and pain point analysis across organizers, exhibitors, and attendees revealing
              optimization opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Organizers */}
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-6">EVENT ORGANIZERS</h3>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-red-500 mb-3">Key Pain Points</h4>
                <div className="space-y-2">
                  <div className="text-gray-300 text-sm">• Rising venue costs (10-15% increase)</div>
                  <div className="text-gray-300 text-sm">• Technology integration complexity</div>
                  <div className="text-gray-300 text-sm">• Sustainability compliance pressure</div>
                  <div className="text-gray-300 text-sm">• ROI measurement challenges</div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Success KPIs</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Attendance Rate</span>
                    <span className="text-white text-sm">85%+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Exhibitor Satisfaction</span>
                    <span className="text-white text-sm">4.2/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Cost per Attendee</span>
                    <span className="text-white text-sm">$169</span>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                <div className="text-red-500 font-semibold text-sm mb-2">PRIORITY FOCUS</div>
                <div className="text-gray-300 text-sm">Hybrid format optimization & AI-powered analytics</div>
              </div>
            </div>

            {/* Exhibitors */}
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-6">EXHIBITORS</h3>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-red-500 mb-3">Key Pain Points</h4>
                <div className="space-y-2">
                  <div className="text-gray-300 text-sm">• Lead quality inconsistency</div>
                  <div className="text-gray-300 text-sm">• High booth & logistics costs</div>
                  <div className="text-gray-300 text-sm">• Limited post-event engagement</div>
                  <div className="text-gray-300 text-sm">• ROI attribution difficulty</div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Success KPIs</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Lead Generation</span>
                    <span className="text-white text-sm">250+ leads</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Conversion Rate</span>
                    <span className="text-white text-sm">12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Cost per Lead</span>
                    <span className="text-white text-sm">$45</span>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                <div className="text-red-500 font-semibold text-sm mb-2">PRIORITY FOCUS</div>
                <div className="text-gray-300 text-sm">Digital lead capture & year-round engagement</div>
              </div>
            </div>

            {/* Attendees */}
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-6">ATTENDEES</h3>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-red-500 mb-3">Key Pain Points</h4>
                <div className="space-y-2">
                  <div className="text-gray-300 text-sm">• Information overload</div>
                  <div className="text-gray-300 text-sm">• Networking inefficiency</div>
                  <div className="text-gray-300 text-sm">• Travel & accommodation costs</div>
                  <div className="text-gray-300 text-sm">• Limited personalization</div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Success KPIs</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Satisfaction Score</span>
                    <span className="text-white text-sm">4.1/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Networking Connections</span>
                    <span className="text-white text-sm">15+ contacts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Content Relevance</span>
                    <span className="text-white text-sm">78%</span>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                <div className="text-red-500 font-semibold text-sm mb-2">PRIORITY FOCUS</div>
                <div className="text-gray-300 text-sm">AI-powered personalization & smart networking</div>
              </div>
            </div>
          </div>

          {/* Networking Density Visualization */}
          <div className="mt-16 bg-black p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">NETWORKING DENSITY & LEAD FUNNELS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-red-500 mb-4">23%</div>
                <div className="text-white font-semibold mb-2">Event App Usage Increase</div>
                <div className="text-gray-400 text-sm">Enhanced networking features driving engagement</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-red-500 mb-4">80%</div>
                <div className="text-white font-semibold mb-2">Increased Participation</div>
                <div className="text-gray-400 text-sm">Interactive features boosting attendee engagement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">SCENARIO PLANNING & RISKS</h2>
            <p className="text-gray-400 max-w-2xl">
              Probability-weighted scenarios with revenue projections and strategic trigger points for adaptive
              decision-making.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Bear Case */}
            <div className="bg-red-900/20 p-8 rounded-lg border border-red-500/30">
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                <h3 className="text-xl font-bold text-white">BEAR CASE (20%)</h3>
              </div>
              <div className="mb-6">
                <div className="text-3xl font-bold text-red-500 mb-2">$1.6T</div>
                <div className="text-gray-300 text-sm">2030 Market Size</div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="text-gray-300 text-sm">• Economic recession impact</div>
                <div className="text-gray-300 text-sm">• Sustained high inflation</div>
                <div className="text-gray-300 text-sm">• Virtual preference shift</div>
                <div className="text-gray-300 text-sm">• Regulatory constraints</div>
              </div>
              <div className="bg-red-500/20 p-4 rounded-lg">
                <div className="text-red-500 font-semibold text-sm mb-2">KEY TRIGGERS</div>
                <div className="text-gray-300 text-xs">GDP growth &lt; 2%, venue costs &gt; 20% increase</div>
              </div>
              \
            </div>

            {/* Base Case */}
            <div className="bg-white/10 p-8 rounded-lg border border-white/20">
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 bg-white rounded-full mr-3"></div>
                <h3 className="text-xl font-bold text-white">BASE CASE (60%)</h3>
              </div>

              <div className="mb-6">
                <div className="text-3xl font-bold text-white mb-2">$2.0T</div>
                <div className="text-gray-300 text-sm">2030 Market Size</div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="text-gray-300 text-sm">• Steady economic growth</div>
                <div className="text-gray-300 text-sm">• Hybrid format adoption</div>
                <div className="text-gray-300 text-sm">• Technology integration</div>
                <div className="text-gray-300 text-sm">• Moderate cost inflation</div>
              </div>

              <div className="bg-white/20 p-4 rounded-lg">
                <div className="text-white font-semibold text-sm mb-2">KEY TRIGGERS</div>
                <div className="text-gray-300 text-xs">GDP growth 2-4%, AI adoption &gt; 70%</div>
              </div>
            </div>

            {/* Bull Case */}
            <div className="bg-green-900/20 p-8 rounded-lg border border-green-500/30">
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                <h3 className="text-xl font-bold text-white">BULL CASE (20%)</h3>
              </div>

              <div className="mb-6">
                <div className="text-3xl font-bold text-green-500 mb-2">$2.4T</div>
                <div className="text-gray-300 text-sm">2030 Market Size</div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="text-gray-300 text-sm">• Accelerated Asia growth</div>
                <div className="text-gray-300 text-sm">• AI revolution impact</div>
                <div className="text-gray-300 text-sm">• Premium experience demand</div>
                <div className="text-gray-300 text-sm">• Sustainability advantage</div>
              </div>

              <div className="bg-green-500/20 p-4 rounded-lg">
                <div className="text-green-500 font-semibold text-sm mb-2">KEY TRIGGERS</div>
                <div className="text-gray-300 text-xs">Asia CAGR &gt; 12%, virtual market $1.5T+</div>
              </div>
            </div>
          </div>

          {/* Risk Dashboard */}
          <div className="mt-16 bg-black p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">RISK DASHBOARD & RECOMMENDED MOVES</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-bold text-red-500 mb-4">HIGH PRIORITY RISKS</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-red-900/20 rounded-lg">
                    <span className="text-gray-300 text-sm">Cost Inflation</span>
                    <span className="text-red-500 font-bold">HIGH</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-900/20 rounded-lg">
                    <span className="text-gray-300 text-sm">Technology Disruption</span>
                    <span className="text-red-500 font-bold">HIGH</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-900/20 rounded-lg">
                    <span className="text-gray-300 text-sm">Regulatory Changes</span>
                    <span className="text-yellow-500 font-bold">MEDIUM</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-green-500 mb-4">STRATEGIC MOVES</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-green-900/20 rounded-lg">
                    <div className="text-green-500 font-semibold text-sm">DIVERSIFY GEOGRAPHICALLY</div>
                    <div className="text-gray-300 text-xs">Focus on Asia-Pacific growth markets</div>
                  </div>
                  <div className="p-3 bg-green-900/20 rounded-lg">
                    <div className="text-green-500 font-semibold text-sm">INVEST IN TECHNOLOGY</div>
                    <div className="text-gray-300 text-xs">AI, data analytics, hybrid platforms</div>
                  </div>
                  <div className="p-3 bg-green-900/20 rounded-lg">
                    <div className="text-green-500 font-semibold text-sm">BUILD FLEXIBILITY</div>
                    <div className="text-gray-300 text-xs">Modular contracts, scalable solutions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Implications & Playbooks */}
      <section className="mb-32">
        <div className="text-center mb-16">
          <div className="text-sm text-red-500 uppercase tracking-widest mb-4">STRATEGIC INTELLIGENCE</div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">STRATEGIC PLAYBOOKS</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Actionable recommendations and OKRs for stakeholders across the events ecosystem
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Strategic Playbooks */}
            <div className="space-y-8">
              <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
                <h3 className="text-xl font-bold text-red-500 mb-6">EVENT ORGANIZERS PLAYBOOK</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <div className="text-white font-semibold text-sm mb-1">DIGITAL-FIRST TRANSFORMATION</div>
                    <div className="text-gray-400 text-xs">
                      Implement AI-powered analytics, hybrid event platforms, and data-driven personalization
                    </div>
                  </div>
                  <div className="border-l-4 border-white pl-4">
                    <div className="text-white font-semibold text-sm mb-1">COST OPTIMIZATION</div>
                    <div className="text-gray-400 text-xs">
                      Negotiate multi-year venue contracts, implement circular design, optimize logistics
                    </div>
                  </div>
                  <div className="border-l-4 border-gray-500 pl-4">
                    <div className="text-white font-semibold text-sm mb-1">SUSTAINABILITY LEADERSHIP</div>
                    <div className="text-gray-400 text-xs">
                      Carbon reporting, renewable energy, offset programs, circular booth design
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
                <h3 className="text-xl font-bold text-red-500 mb-6">EXHIBITORS PLAYBOOK</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <div className="text-white font-semibold text-sm mb-1">YEAR-ROUND ENGAGEMENT</div>
                    <div className="text-gray-400 text-xs">
                      Build digital communities, content marketing, virtual showrooms
                    </div>
                  </div>
                  <div className="border-l-4 border-white pl-4">
                    <div className="text-white font-semibold text-sm mb-1">DATA-DRIVEN TARGETING</div>
                    <div className="text-gray-400 text-xs">
                      AI-powered lead scoring, behavioral analytics, personalized experiences
                    </div>
                  </div>
                  <div className="border-l-4 border-gray-500 pl-4">
                    <div className="text-white font-semibold text-sm mb-1">HYBRID OPTIMIZATION</div>
                    <div className="text-gray-400 text-xs">
                      Seamless online-offline integration, virtual booth experiences
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* OKRs & Measurement */}
            <div className="space-y-8">
              <div className="bg-black p-8 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-6">KEY OKRs & METRICS</h3>
                <div className="space-y-6">
                  <div>
                    <div className="text-red-500 font-semibold text-sm mb-3">GROWTH OBJECTIVES</div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Market Share Growth</span>
                        <span className="text-white text-sm">+15% annually</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Revenue CAGR</span>
                        <span className="text-white text-sm">7-9%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Geographic Expansion</span>
                        <span className="text-white text-sm">3 new markets</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-red-500 font-semibold text-sm mb-3">OPERATIONAL EXCELLENCE</div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">AI Adoption Rate</span>
                        <span className="text-white text-sm">80%+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Hybrid Event Share</span>
                        <span className="text-white text-sm">60%+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Cost Efficiency</span>
                        <span className="text-white text-sm">-10% per attendee</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-red-500 font-semibold text-sm mb-3">SUSTAINABILITY GOALS</div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Carbon Reduction</span>
                        <span className="text-white text-sm">-30% by 2030</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Green Practices</span>
                        <span className="text-white text-sm">100% compliance</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Circular Design</span>
                        <span className="text-white text-sm">75% adoption</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 p-8 rounded-lg border border-red-500/20">
                <h4 className="text-xl font-bold text-white mb-4">CLOSING THOUGHTS</h4>
                <p className="text-gray-300 leading-relaxed text-sm">
                  The events industry stands at an inflection point. The convergence of digital transformation,
                  sustainability imperatives, and evolving human connection needs creates unprecedented opportunities
                  for those who act strategically. Success will belong to organizations that embrace hybrid models,
                  leverage AI-powered insights, and build year-round communities while maintaining the irreplaceable
                  value of in-person experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Timeline - Strategic Roadmap */}
      <section className="mb-32">
        <div className="text-center mb-16">
          <div className="text-sm text-red-500 uppercase tracking-widest mb-4">STRATEGIC ROADMAP • 2025-2030</div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">FOCUS TIMELINE</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Strategic priorities and market opportunities mapped across the next five years of industry transformation
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="space-y-12">
            {/* 2025 */}
            <div className="flex flex-col lg:flex-row items-start gap-8 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <div className="flex-shrink-0">
                <div className="text-4xl font-bold text-red-500 mb-2">2025</div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">RECOVERY COMPLETION</div>
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-lg font-bold text-white mb-3">Market Stabilization</h4>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Reach $1.34T market size</li>
                    <li>• 95%+ pre-pandemic recovery</li>
                    <li>• Hybrid format optimization</li>
                  </ul>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-lg font-bold text-white mb-3">Cost Management</h4>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Navigate 4.3% cost increases</li>
                    <li>• Venue price negotiations</li>
                    <li>• Strategic supplier partnerships</li>
                  </ul>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-lg font-bold text-white mb-3">Sustainability Launch</h4>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• 45% adopt green practices</li>
                    <li>• Carbon reporting systems</li>
                    <li>• Circular design principles</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2026-2027 */}
            <div className="flex flex-col lg:flex-row items-start gap-8 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <div className="flex-shrink-0">
                <div className="text-4xl font-bold text-red-500 mb-2">2026-27</div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">TECHNOLOGY INTEGRATION</div>
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-lg font-bold text-white mb-3">AI & Analytics</h4>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Scale AI adoption to 80%+</li>
                    <li>• Predictive event analytics</li>
                    <li>• Personalization engines</li>
                  </ul>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-lg font-bold text-white mb-3">Geographic Expansion</h4>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Target Asia-Pacific growth</li>
                    <li>• China market penetration</li>
                    <li>• Southeast Asia partnerships</li>
                  </ul>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-lg font-bold text-white mb-3">Virtual Integration</h4>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Virtual market to $800B+</li>
                    <li>• AR/VR mainstream adoption</li>
                    <li>• Hybrid experience mastery</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2028-2029 */}
            <div className="flex flex-col lg:flex-row items-start gap-8 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <div className="flex-shrink-0">
                <div className="text-4xl font-bold text-red-500 mb-2">2028-29</div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">REVENUE DIVERSIFICATION</div>
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-lg font-bold text-white mb-3">Year-Round Communities</h4>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Build continuous engagement</li>
                    <li>• Digital content monetization</li>
                    <li>• Subscription-based models</li>
                  </ul>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-lg font-bold text-white mb-3">Market Leadership</h4>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• $1.7T+ market size</li>
                    <li>• Premium positioning</li>
                    <li>• Industry standard setting</li>
                  </ul>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-lg font-bold text-white mb-3">Sustainability Mastery</h4>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Net-zero event standards</li>
                    <li>• Regulatory compliance</li>
                    <li>• Green competitive advantage</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2030 */}
            <div className="flex flex-col lg:flex-row items-start gap-8 p-8 bg-gradient-to-r from-red-900/20 to-red-800/10 backdrop-blur-sm border border-red-500/30 rounded-2xl">
              <div className="flex-shrink-0">
                <div className="text-4xl font-bold text-red-500 mb-2">2030</div>
                <div className="text-sm text-red-400 uppercase tracking-wide">MARKET DOMINANCE</div>
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-lg font-bold text-white mb-3">$2.1T Market Achievement</h4>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Virtual events: $1.39T market</li>
                    <li>• Sports events: $687.7B</li>
                    <li>• Live entertainment: $270.3B</li>
                    <li>• Event tech: $17.33B</li>
                  </ul>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-lg font-bold text-white mb-3">Strategic Positioning</h4>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Digital-first market leaders</li>
                    <li>• Sustainable event pioneers</li>
                    <li>• Global community builders</li>
                    <li>• Technology innovation drivers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Key Success Metrics */}
          <div className="mt-16 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">KEY SUCCESS METRICS TO TRACK</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">7-9%</div>
                <div className="text-sm text-gray-400">Annual CAGR Target</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">80%+</div>
                <div className="text-sm text-gray-400">AI Adoption Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">60%+</div>
                <div className="text-sm text-gray-400">Hybrid Event Share</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">100%</div>
                <div className="text-sm text-gray-400">Sustainability Compliance</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-sm border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">EP</span>
            </div>
            <div>
              <div className="text-blue-400 font-bold text-xl">EXPOPLATFORM</div>
              <div className="text-xs text-gray-500">The Most Complete AI-Powered Smart Event Platform</div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-400 max-w-2xl mx-auto">
              This analysis represents comprehensive market intelligence for strategic decision-making in the global
              events industry transformation, powered by ExpoPlatform's AI-driven insights.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
