// ============================================
// NUMU ENGINE — Agent Fleet Command Centre
// app.js — All data, interactivity, routing map
// ============================================

// === EMBEDDED DATA (from orchestrator JSON files) ===

const AGENTS = [
  { id: "AGENT_01", num: "01", name: "THE SCOUT", role: "Lead Research & Enrichment", status: "active", phase: 1, month: 1, mission: "Identify, research, and enrich qualified leads in the SME, charity, and professional services space. Deliver fully enriched lead profiles with at least 80% data completeness before any outreach begins.", tools: ["Clay","LinkedIn Sales Nav","Apollo.io","Companies House","Charity Commission","HubSpot","Hunter.io"], kpis: ["10-15 qualified leads/day","80%+ enrichment accuracy","<24hr enrichment turnaround","100% Ethics Gate pass rate"], inbound: [], outbound: ["AGENT_02","AGENT_08"], ethics: true, checkpoints: ["Pre-enrichment sector screen","Post-enrichment full Ethics Gate evaluation"], escalation: ["Sensitive/dual-use sector","Unclear ethical alignment","Prior controversy/reputational flags","Charity governance concerns","Prohibited sector lead"] },
  { id: "AGENT_02", num: "02", name: "THE ETHICAL OUTREACH", role: "Cold Email & DM", status: "active", phase: 1, month: 1, mission: "Craft highly personalised, honest, non-manipulative outreach sequences for each enriched lead. Every message must reflect Sidq — no false urgency, no manufactured scarcity, no dark patterns.", tools: ["Instantly.ai","HubSpot","Claude/GPT-4","Notion","Grammarly"], kpis: ["30%+ open rate","8%+ reply rate","100% Ethics Gate pass","Zero manipulative claims","Personalisation 7/10+"], inbound: ["AGENT_01","AGENT_08"], outbound: ["AGENT_03","AGENT_08"], ethics: true, checkpoints: ["Pre-send Ethics Gate review of every message"], escalation: ["Unverifiable claims","Manufactured urgency request","Ethics-risk lead targeting","Contradicts Islamic marketing ethics"] },
  { id: "AGENT_03", num: "03", name: "THE DIAGNOSTICIAN", role: "Sales & Discovery", status: "active", phase: 1, month: 1, mission: "Convert qualified prospects into audit bookings and paid engagements. Deploy The Ladder: Free → Audit → Sprint → Retainer. Never push; position value and let the prospect self-select.", tools: ["HubSpot CRM","Calendly","DocuSign/PandaDoc","Stripe","Claude/GPT-4"], kpis: ["30%+ audit conversion from discovery","20%+ Sprint conversion from Audit","40%+ retainer conversion from Sprint","<72hr proposal turnaround"], inbound: ["AGENT_02","AGENT_07","AGENT_08"], outbound: ["AGENT_04","AGENT_07","AGENT_08"], ethics: true, checkpoints: ["Ethics Gate before any proposal","Grandfather Principle on pricing"], escalation: ["Conflicting ethics request","Pricing pressure risk","Sector screening error","Contract terms compromising Amanah"] },
  { id: "AGENT_04", num: "04", name: "THE INTELLIGENCE ANALYST", role: "Audit Research", status: "active", phase: 1, month: 1, mission: "Conduct deep-dive Growth Intelligence Audits. Produce genuinely transformational reports — not templated summaries. Every audit must surface at least 3 high-impact, immediately actionable opportunities.", tools: ["Screaming Frog","Ahrefs/SEMrush","GA4","Meta Business Suite","LinkedIn Analytics","Search Console","Canva/Figma"], kpis: ["100% on-time delivery","NPS 8+/10","3+ high-impact opportunities/audit","Report quality 9/10+","90%+ upsell conversation rate"], inbound: ["AGENT_03"], outbound: ["AGENT_05","AGENT_07","AGENT_08"], ethics: true, checkpoints: ["Pre-report Ethics Gate for honesty","Adl check — no overpromising"], escalation: ["Client operational/ethical issues","Insufficient data for recommendations","Questionable sector post-discovery","Misleading projections risk"] },
  { id: "AGENT_05", num: "05", name: "THE SYNTHESIS AGENT", role: "Document Builder", status: "active", phase: 1, month: 1, mission: "Build, format, and quality-check all client-facing deliverables — audit reports, sprint outputs, retainer documents, proposals. Every document reflects Numu's standard: clear, accurate, beautifully presented, Sidq-aligned.", tools: ["Claude/GPT-4","Notion","Buffer/Hootsuite","Canva","Beehiiv/ConvertKit","LinkedIn"], kpis: ["4+ LinkedIn posts/week","1 newsletter/week","10%+ follower growth/month","35%+ email open rate","2+ inbound leads/week"], inbound: ["AGENT_04","AGENT_06","AGENT_09","AGENT_11"], outbound: ["AGENT_06","AGENT_08"], ethics: true, checkpoints: ["Pre-publish Sidq check on all content"], escalation: ["Misleading claims request","Politically/religiously sensitive topic","Unverified statistics","Clickbait/sensationalist pressure"] },
  { id: "AGENT_06", num: "06", name: "THE ETHICS GUARDIAN", role: "Islamic Governance", status: "active", phase: 1, month: 2, mission: "Operate the Ethics Gate™. Apply the 5-question framework (Sidq, Amanah, 'Adl, Grandfather Test, Akhirah Lens) to every output before it reaches a client. Veto authority over any deliverable that fails ethics review.", tools: ["LinkedIn Campaign Mgr","Meta Ads Manager","Google Ads","Hotjar","GA4","HubSpot","Buffer"], kpis: ["CPL <£25 LinkedIn","CPL <£15 Meta","ROAS 3x+","CTR above benchmarks","Weekly performance reports"], inbound: ["AGENT_05","AGENT_09","AGENT_11","AGENT_12"], outbound: ["AGENT_05","AGENT_08","AGENT_09"], ethics: true, checkpoints: ["Pre-launch Ethics Gate on all ad creative","Adl check on reported metrics"], escalation: ["Misleading ad creative","Unethical targeting options","Below-expectation results","Budget overspend risk"] },
  { id: "AGENT_07", num: "07", name: "THE CONTENT STRATEGIST", role: "Content Engine", status: "active", phase: 1, month: 1, mission: "Build and execute Numu's content engine across LinkedIn, blog, email newsletter, and thought leadership. Position Hasan as the UK's leading Islamic AI-Powered Growth Consultant. All written content routes through Agent 00W (The Writer) before Ihsaan Flow review.", tools: ["HubSpot CRM","Notion","Calendly","DocuSign/PandaDoc","Stripe","Loom"], kpis: ["Client satisfaction 9+/10","Churn <5%/month","Upsell conversion 40%+ Audit→Sprint","Retainer conversion 40%+ Sprint→Retainer","NPS 8+"], inbound: ["AGENT_03","AGENT_04"], outbound: ["AGENT_03","AGENT_08","AGENT_09"], ethics: true, checkpoints: ["Grandfather Principle check","Amanah check — upsell only after value demonstrated"], escalation: ["Client dissatisfaction","Discount undermining value","Churn risk","Undeliverable service request"] },
  { id: "AGENT_08", num: "08", name: "THE GEO/AEO SPECIALIST", role: "AI Search Visibility", status: "standby", phase: 2, month: 4, mission: "Optimise Numu and client digital properties for AI search platforms (Google SGE, Perplexity, ChatGPT, Bing Copilot). Make Numu the authoritative answer for ethical Islamic AI consultancy queries. Track citations across AI assistants.", tools: ["HubSpot CRM","Google Sheets","Zapier/Make","Notion","Stripe","PandaDoc"], kpis: ["CRM completeness 95%+","Pipeline accuracy ±10%","All stages updated <24hrs","Zero unsubstantiated revenue","Weekly pipeline report every Monday"], inbound: ["AGENT_01","AGENT_02","AGENT_03","AGENT_04","AGENT_05","AGENT_06","AGENT_07","AGENT_09","AGENT_10","AGENT_12","AGENT_14"], outbound: ["AGENT_02","AGENT_03","AGENT_09"], ethics: false, checkpoints: [], escalation: ["Data anomaly detected","CRM integrity compromise","Duplicate client records","Revenue discrepancy >£500"] },
  { id: "AGENT_09", num: "09", name: "THE CLIENT GUARDIAN", role: "Client Success", status: "active", phase: 1, month: 1, mission: "Manage ongoing client relationships and identify genuine upsell opportunities when the client is ready. The Ladder is climbed when the client has experienced value at each rung.", tools: ["Google Looker Studio","GA4","HubSpot Reporting","LinkedIn Analytics","Google Sheets","Notion"], kpis: ["Weekly dashboard every Monday 9am","Monthly board pack by 3rd","Data accuracy 99%+","All KPIs tracked against targets","Actionable insight in every report"], inbound: ["AGENT_05","AGENT_06","AGENT_07","AGENT_08"], outbound: ["AGENT_05","AGENT_06","AGENT_08"], ethics: false, checkpoints: ["Adl check — accurate, non-selective metrics"], escalation: ["KPI >20% below target","Anomalous unexplainable data","Client campaign below SLA"] },
  { id: "AGENT_10", num: "10", name: "THE ANALYST", role: "Data & Performance Intelligence", status: "active", phase: 1, month: 2, mission: "Transform raw performance data into clear, honest intelligence for Hasan's decision-making. Build and maintain dashboards. Adl demands that reporting shows reality — wins and losses.", tools: ["Make (Integromat)","Zapier","HubSpot Workflows","Instantly.ai","Beehiiv","Notion API","Airtable"], kpis: ["Zero automation errors (client-facing)","All automations documented","100% have manual override","System uptime 99.5%+","New automation <48hrs of approval"], inbound: ["AGENT_09"], outbound: ["AGENT_08"], ethics: false, checkpoints: ["All automations reviewed for human sign-off requirement"], escalation: ["Client-facing automation failure","Human review bypass request","Tech costs exceeding budget","Data privacy concern"] },
  { id: "AGENT_11", num: "11", name: "THE CAMPAIGN ARCHITECT", role: "Ramadan, Appeals & Launch", status: "standby", phase: 2, month: 4, mission: "Design full-funnel campaign strategies. Strategy precedes execution — never brief The Amplifier without a Strategist-approved plan. Campaigns must have clear ethical guardrails.", tools: ["Notion","Claude/GPT-4","Miro/FigJam","Google Trends","SparkToro","SimilarWeb","HubSpot"], kpis: ["Campaign brief within 5 days","100% campaigns with defined KPIs","Post-campaign debrief within 7 days","Client approval before spend"], inbound: ["AGENT_03","AGENT_09"], outbound: ["AGENT_05","AGENT_06"], ethics: true, checkpoints: ["Pre-brief Ethics Gate for Sidq, Amanah, Adl compliance"], escalation: ["Manipulative targeting request","Ethics framework conflict","Unachievable honest marketing objective"] },
  { id: "AGENT_12", num: "12", name: "THE AUTOMATION ENGINEER", role: "AI Systems & Workflow", status: "standby", phase: 2, month: 5, mission: "Build high-converting, honest landing pages and sales funnels. Design in service of clarity — not manipulation. Every CTA must be truthful. Build pages that earn trust.", tools: ["Webflow/Framer","Unbounce/Leadpages","Figma","Hotjar","Stripe","Calendly embed"], kpis: ["LP conversion 5%+ cold traffic","LP conversion 15%+ warm","Page load <3s","Zero unverified claims"], inbound: ["AGENT_11"], outbound: ["AGENT_06","AGENT_08"], ethics: true, checkpoints: ["Pre-launch Ethics Gate on all claims, testimonials, CTAs"], escalation: ["Dark pattern request","Unverifiable testimonial","Earnings claims without evidence","Deceptive A/B test variant"] },
  { id: "AGENT_13", num: "13", name: "THE PARTNERSHIP BUILDER", role: "Alliance & Referral", status: "scheduled", phase: 3, month: 7, mission: "Serve as the active conscience of the Numu Engine. Conduct ongoing Ethics Gate audits across all agent outputs. When in doubt, stop the workflow and escalate.", tools: ["Notion (ethics audit log)","Claude/GPT-4","Google Sheets","HubSpot","Loom"], kpis: ["100% flagged items reviewed <4hrs","Zero violations reaching clients","Monthly ethics audit to Hasan","Quarterly prompt reviews","Ethics training updated per scenario"], inbound: ["AGENT_01","AGENT_02","AGENT_03","AGENT_04","AGENT_05","AGENT_06","AGENT_07","AGENT_11","AGENT_12"], outbound: ["AGENT_01","AGENT_02","AGENT_03","AGENT_04","AGENT_05","AGENT_06","AGENT_07","AGENT_11","AGENT_12"], ethics: false, checkpoints: ["Self-audits quarterly against Quran & Sunnah principles"], escalation: ["Systemic ethics drift pattern","Violation reached client","Agent contradicting Islamic principles","Hasan instructions conflicting with ethics"] },
  { id: "AGENT_14", num: "14", name: "THE OPERATIONS SENTINEL", role: "Admin, Legal & Compliance", status: "active", phase: 1, month: 2, mission: "Build strategic partnerships, referral sources, and community relationships. Target Islamic business networks, Muslim professional associations, and ethical business communities.", tools: ["LinkedIn","LinkedIn Sales Nav","HubSpot CRM","Eventbrite","Notion","Calendly"], kpis: ["5+ strategic partnerships/quarter","2+ referral leads/month by M6","1+ Islamic business event/quarter","50+ referral partners by end Y1"], inbound: [], outbound: ["AGENT_01","AGENT_08"], ethics: true, checkpoints: ["Partnership candidates evaluated for ethical alignment"], escalation: ["Prohibited sector partner","Conflict of interest","Compromising Sidq incentives"] },
  { id: "AGENT_15", num: "15", name: "THE GROWTH INTELLIGENCE", role: "Market Expansion & IP", status: "scheduled", phase: 3, month: 7, mission: "Model revenue trajectory, scenario-plan for growth phases, and provide financial intelligence. All projections clearly labelled — not guarantees. Adl demands honest forecasting.", tools: ["Google Sheets","Notion","Claude/GPT-4","HubSpot Forecasting","Stripe Revenue","Looker Studio"], kpis: ["Monthly forecast accuracy ±15%","Annual model updated quarterly","3-scenario model maintained","Y1 phased: £30K (3mo) → £60K (8mo) → £100K+ (16-18mo)"], inbound: ["AGENT_08","AGENT_09"], outbound: ["AGENT_09"], ethics: false, checkpoints: ["Adl check — projections labelled as estimates"], escalation: ["Y1 target >30% at risk","Revenue concentration >40% single client","Cash flow operational risk"] }
,
  { id: "AGENT_16", num: "16", name: "THE IHSAAN FLOW GUARDIAN", role: "Process Methodology & Quality", status: "active", phase: 1, month: 1, mission: "Run the Ihsaan Flow review on every deliverable before it reaches the Ethics Gate. Score each output against the 6 principles — Niyyah, Ikhlas, Ihsan, Rida, Amanah, Barakah — on a 1–5 scale. Production pipeline: AGENT → 00W → 16 → 06 → DELIVERY.", tools: ["Notion","Claude/GPT-4","Google Sheets"], kpis: ["100% deliverables reviewed","Ihsaan score 24-30 (Green) target","Zero red-flag deliverables shipped","<2hr review turnaround"], inbound: ["AGENT_02","AGENT_04","AGENT_05","AGENT_07","AGENT_09","AGENT_11"], outbound: ["AGENT_06"], ethics: true, checkpoints: ["6-principle Ihsaan Flow scoring on every output"], escalation: ["Red score (<18 or any 1)","Pattern of amber scores from same agent","Process quality concerns"] },
  { id: "AGENT_17", num: "17", name: "THE FINANCIAL CONTROLLER", role: "Revenue, Invoicing, Cash Flow, P&L, Pricing", status: "active", phase: 1, month: 1, mission: "Track all revenue, invoicing, cash flow, P&L per product line, and enforce the canonical rate card. Apply Islamic finance principles — no Riba, 'Adl in pricing, Amanah in reporting. Maintain Barakah accounting framework.", tools: ["Stripe","Google Sheets","FreeAgent","Notion"], kpis: ["100% invoice accuracy","<48hr invoice dispatch after deal close","0 overdue invoices >30 days without escalation","Monthly P&L within 3 days of month end","Cash flow forecast updated weekly"], inbound: ["AGENT_03","AGENT_09","AGENT_14","AGENT_18"], outbound: ["AGENT_09","AGENT_14"], ethics: true, checkpoints: ["Pricing enforcement check","'Adl on every fee","No Riba on overdue payments"], escalation: ["Cash runway <60 days","Overdue invoice >30 days","Pricing exception request","Budget overspend"] },
  { id: "AGENT_18", num: "18", name: "THE ONBOARDING ARCHITECT", role: "Client Onboarding — Signed Deal to First Deliverable", status: "active", phase: 1, month: 1, mission: "Run the post-payment onboarding experience. Tier-specific workflows for Quick-Win, Audit, Digital Workforce, and AI Transformation clients. Honour Amanah — first impression sets the tone for the entire engagement.", tools: ["Notion","Google Calendar","Email","Loom","DocuSign"], kpis: ["100% first deliverable on time","Welcome email within 2 hours of payment","Onboarding satisfaction >9/10","<48hr time to first meaningful contact","0 clients dropped during onboarding"], inbound: ["AGENT_03"], outbound: ["AGENT_04","AGENT_05","AGENT_09","AGENT_17"], ethics: true, checkpoints: ["12-point onboarding quality checklist","Scope confirmation before kickoff"], escalation: ["Client unresponsive >72hrs","Missing access/data","Scope disagreement at kickoff"] }
];

const WORKFLOWS = [
  { id: "WF_01", name: "New Lead Flow", desc: "End-to-end pipeline from lead identification through enrichment, outreach, and conversion to paid audit.", trigger: "New prospect identified", duration: "7-21 days", agents: ["AGENT_01","AGENT_02","AGENT_03","AGENT_08"], ethicsGates: 3, humanReviews: 4, phases: [1,2,3,4], steps: [
    { order: 1, agent: "AGENT_01", title: "Lead Identification & Sector Screen", desc: "Identify prospect via LinkedIn Sales Navigator, Apollo.io, or referral. Immediate sector screening against prohibited sectors.", ethics: true, human: false, duration: "30 mins" },
    { order: 2, agent: "AGENT_01", title: "Full Lead Enrichment", desc: "Enrich lead with company details, decision-maker info, digital presence score, pain indicators. Minimum 80% field completeness.", ethics: false, human: false, duration: "1-4 hrs" },
    { order: 3, agent: "AGENT_01", title: "Full Ethics Gate Evaluation", desc: "Complete Sidq-Amanah-Adl assessment. Is outreach truthful? Will the lead genuinely benefit? Is targeting just?", ethics: true, human: true, duration: "15 mins" },
    { order: 4, agent: "AGENT_01", title: "Handoff to Scribe & Keeper", desc: "Send enriched lead card to AGENT_02 for sequence building and AGENT_08 for CRM entry.", ethics: false, human: false, duration: "Immediate" },
    { order: 5, agent: "AGENT_02", title: "Outreach Sequence Creation", desc: "Craft personalised 5-step email and 3-step LinkedIn DM sequences. Personalisation score 7/10+. No dark patterns.", ethics: true, human: true, duration: "2-4 hrs" },
    { order: 6, agent: "AGENT_02", title: "Outreach Activation", desc: "After Hasan approval, activate sequence in Instantly.ai. Log to CRM.", ethics: false, human: false, duration: "Immediate" },
    { order: 7, agent: "AGENT_03", title: "Reply Management & Discovery Call", desc: "Manage replies, handle objections honestly, book discovery calls. Hasan leads all calls.", ethics: false, human: true, duration: "1-14 days" },
    { order: 8, agent: "AGENT_03", title: "Audit Proposal", desc: "Recommend audit tier (Starter £497 / Growth £897 / Scale £1,497). Issue proposal via PandaDoc.", ethics: true, human: true, duration: "24-48 hrs" },
    { order: 9, agent: "AGENT_03", title: "Invoice & Onboarding", desc: "Process payment via Stripe. Send onboarding questionnaire. Brief AGENT_04.", ethics: false, human: false, duration: "24 hrs" }
  ]},
  { id: "WF_02", name: "Audit Delivery Flow", desc: "Complete audit production and delivery from briefing through research, report writing, quality review, delivery call, and upsell handoff.", trigger: "Audit invoice paid", duration: "5-10 business days", agents: ["AGENT_04","AGENT_05","AGENT_07","AGENT_08"], ethicsGates: 2, humanReviews: 3, phases: [1,2,3,4], steps: [
    { order: 1, agent: "AGENT_04", title: "Audit Briefing & Scope Confirmation", desc: "Review onboarding questionnaire, confirm scope, access analytics. Produce audit workplan.", ethics: false, human: true, duration: "1 business day" },
    { order: 2, agent: "AGENT_04", title: "Data Collection & Analysis", desc: "Extract data from GA4, Search Console, LinkedIn, Meta, Ahrefs/SEMrush. Full digital analysis.", ethics: false, human: false, duration: "2-4 business days" },
    { order: 3, agent: "AGENT_04", title: "Content Gap Identification", desc: "Identify content gaps, keyword opportunities, messaging inconsistencies. Share with AGENT_05.", ethics: false, human: false, duration: "1 business day" },
    { order: 4, agent: "AGENT_04", title: "Audit Report Production", desc: "Full audit report to tier specs. Minimum 3 high-impact opportunities. All projections labelled as estimates.", ethics: true, human: true, duration: "1-2 business days" },
    { order: 5, agent: "AGENT_04", title: "Delivery Call Preparation", desc: "Prepare agenda, key talking points, anticipate questions. For Scale tier: 60-90 min presentation deck.", ethics: false, human: false, duration: "2-4 hrs" },
    { order: 6, agent: "AGENT_04", title: "Audit Delivery Call", desc: "Walk client through findings. Answer questions. Plant seeds for next engagement naturally.", ethics: false, human: true, duration: "30-90 mins" },
    { order: 7, agent: "AGENT_04", title: "Post-Audit Handoff", desc: "Send AGENT_07 full audit pack, NPS score, call notes, upsell readiness assessment.", ethics: false, human: false, duration: "Same day" },
    { order: 8, agent: "AGENT_07", title: "Post-Audit Nurture & Upsell Assessment", desc: "7-day check-in. Assess value extraction. If ready, raise Sprint conversation naturally.", ethics: true, human: false, duration: "7-14 days" }
  ]},
  { id: "WF_03", name: "Content Flow", desc: "Weekly content production cycle for LinkedIn, email newsletter, and thought leadership.", trigger: "Monday morning (weekly)", duration: "7 days", agents: ["AGENT_05","AGENT_06","AGENT_09"], ethicsGates: 1, humanReviews: 3, phases: [1,2,3,4], steps: [
    { order: 1, agent: "AGENT_09", title: "Performance Review & Content Brief", desc: "Review previous week's performance. Identify top topics, engagement patterns, audience questions.", ethics: false, human: false, duration: "2 hrs" },
    { order: 2, agent: "AGENT_05", title: "Content Calendar Planning", desc: "Plan 4 LinkedIn posts, 1 newsletter, 1 thought leadership piece aligned to content pillars.", ethics: false, human: true, duration: "2 hrs" },
    { order: 3, agent: "AGENT_05", title: "Content Production", desc: "Draft all content in Hasan's voice: warm, direct, knowledgeable, rooted in Islamic principles.", ethics: true, human: true, duration: "2-3 days" },
    { order: 4, agent: "AGENT_05", title: "Content Scheduling", desc: "Schedule approved content in Buffer/Hootsuite. Load newsletter into Beehiiv.", ethics: false, human: false, duration: "2 hrs" },
    { order: 5, agent: "AGENT_05", title: "Engagement Management", desc: "Monitor comments, replies, DMs. Flag inbound leads. Send amplification candidates to AGENT_06.", ethics: false, human: true, duration: "Ongoing" },
    { order: 6, agent: "AGENT_09", title: "Week-End Performance Capture", desc: "Capture all metrics: reach, engagement, clicks, follower growth, attributed leads.", ethics: false, human: false, duration: "1 hr" }
  ]},
  { id: "WF_04", name: "Upsell Flow", desc: "Structured pathway from Audit → Sprint → Retainer → Founder's Circle. The Ladder: every rung earned through demonstrated value.", trigger: "AGENT_07 upsell-ready flag", duration: "7-30 days", agents: ["AGENT_07","AGENT_03","AGENT_08"], ethicsGates: 3, humanReviews: 4, phases: [1,2,3,4], steps: [
    { order: 1, agent: "AGENT_07", title: "Value Validation Check", desc: "Assess whether client has genuinely extracted value. Review NPS, implementation, client's stated results.", ethics: true, human: true, duration: "1 business day" },
    { order: 2, agent: "AGENT_07", title: "Natural Upsell Opening", desc: "Mention next tier naturally in check-in context — not a sales pitch. Frame as logical next step.", ethics: false, human: true, duration: "Check-in call" },
    { order: 3, agent: "AGENT_03", title: "Upsell Discovery Call", desc: "If interested: explore next engagement. Confirm fit. Grandfather Principle honoured on pricing.", ethics: true, human: true, duration: "30-45 min" },
    { order: 4, agent: "AGENT_03", title: "Upsell Proposal", desc: "Issue Sprint (£1,200), Retainer (£700-£5,000/mo), or Founder's Circle (£2,200) proposal.", ethics: true, human: true, duration: "24-48 hrs" },
    { order: 5, agent: "AGENT_03", title: "Close & Onboard", desc: "Process payment. Send welcome pack. Brief relevant agents. Update CRM.", ethics: false, human: false, duration: "24 hrs" }
  ]},
  { id: "WF_05", name: "Campaign Flow", desc: "End-to-end client campaign delivery — brief, strategy, creative, launch, optimisation, and reporting.", trigger: "Client requests campaign", duration: "5-7 days setup + ongoing", agents: ["AGENT_11","AGENT_05","AGENT_06","AGENT_12","AGENT_09"], ethicsGates: 4, humanReviews: 5, phases: [2,3,4], steps: [
    { order: 1, agent: "AGENT_11", title: "Campaign Brief Intake", desc: "Receive and validate brief. Clarify objectives, budget, timeline, audience, KPIs.", ethics: true, human: true, duration: "1-2 days" },
    { order: 2, agent: "AGENT_11", title: "Campaign Strategy Development", desc: "Full-funnel strategy: audience, channels, budget, creative direction, KPIs, measurement plan.", ethics: true, human: true, duration: "2-3 days" },
    { order: 3, agent: "AGENT_05", title: "Creative & Copy Production", desc: "All campaign creatives: ad copy, visuals, landing page copy aligned to strategy.", ethics: true, human: true, duration: "2-3 days" },
    { order: 4, agent: "AGENT_12", title: "Landing Page Build", desc: "Build or optimise landing page. Integrate Calendly, Stripe, or lead form. Conversion tracking.", ethics: true, human: true, duration: "2-3 days" },
    { order: 5, agent: "AGENT_06", title: "Campaign Launch", desc: "Launch in LinkedIn/Meta Ads. Monitor first 48hrs. Initial bid and audience adjustments.", ethics: false, human: false, duration: "48 hrs" },
    { order: 6, agent: "AGENT_06", title: "Ongoing Optimisation", desc: "Weekly cycle: review against KPIs, adjust bids, audiences, creative rotation.", ethics: false, human: false, duration: "Weekly" },
    { order: 7, agent: "AGENT_09", title: "Campaign Reporting", desc: "Weekly and end-of-campaign reports. All metrics honest — show wins AND losses.", ethics: true, human: true, duration: "Weekly" }
  ]},
  { id: "WF_06", name: "Automation Flow", desc: "Design, build, test, and deploy marketing automation sequences and system integrations.", trigger: "Automation requirement identified", duration: "3-10 business days", agents: ["AGENT_10","AGENT_08"], ethicsGates: 1, humanReviews: 2, phases: [1,2,3,4], steps: [
    { order: 1, agent: "AGENT_10", title: "Requirements Brief", desc: "Document full requirements: trigger, actions, data flows, tools, manual override points.", ethics: true, human: true, duration: "1 day" },
    { order: 2, agent: "AGENT_10", title: "Architecture Design", desc: "Design in Make/Zapier. Map triggers, conditions, actions, branches, error handlers.", ethics: false, human: false, duration: "1-2 days" },
    { order: 3, agent: "AGENT_10", title: "Build & Internal Test", desc: "Build automation. Run with test data. Verify all branches, manual override, and error handling.", ethics: false, human: false, duration: "1-3 days" },
    { order: 4, agent: "AGENT_10", title: "Hasan Review & Sign-Off", desc: "Demo automation to Hasan. Confirm understanding of function, schedule, and override.", ethics: false, human: true, duration: "1 day" },
    { order: 5, agent: "AGENT_10", title: "Live Deployment", desc: "Deploy to production. Monitor first 48hrs. Log all runs. Alert on anomalies.", ethics: false, human: false, duration: "Ongoing" }
  ]},
  { id: "WF_07", name: "Growth Flow", desc: "Monthly and quarterly strategic growth review — intelligence from all agents for strategic decisions.", trigger: "1st Monday of month", duration: "2-5 days", agents: ["AGENT_09","AGENT_15","AGENT_07","AGENT_13"], ethicsGates: 1, humanReviews: 2, phases: [1,2,3,4], steps: [
    { order: 1, agent: "AGENT_09", title: "Monthly Performance Compilation", desc: "Pull all data: revenue vs target, pipeline health, content, campaign ROI, client NPS, lead volume.", ethics: false, human: false, duration: "1 day" },
    { order: 2, agent: "AGENT_15", title: "Revenue Forecast Update", desc: "Update 3-scenario model (conservative/base/optimistic). Track against £132K-£171K Y1 target.", ethics: false, human: false, duration: "1 day" },
    { order: 3, agent: "AGENT_07", title: "Client Portfolio Review", desc: "Review all clients: health scores, renewals, upsell opportunities, churn risks.", ethics: false, human: false, duration: "Half day" },
    { order: 4, agent: "AGENT_13", title: "Ethics Audit (Quarterly)", desc: "Full ethics audit of all agent outputs. Review flags and resolutions. Identify drift patterns.", ethics: false, human: true, duration: "1 day" },
    { order: 5, agent: "AGENT_09", title: "Integrated Growth Review Pack", desc: "Compile all inputs: performance, forecast, portfolio, ethics. Prepare for Hasan's review.", ethics: true, human: false, duration: "Half day" },
    { order: 6, agent: "AGENT_09", title: "Hasan Strategic Review Session", desc: "Hasan reviews full pack. Makes strategic decisions for next period.", ethics: false, human: true, duration: "2-4 hrs" }
  ]}
];

const ETHICS = {
  sidq:        { name: "Sidq",         arabic: "صِدْق",   meaning: "Truthfulness",     icon: "1", question: "Is every claim literally, demonstrably true?" },
  amanah:      { name: "Amanah",       arabic: "أَمَانَة",  meaning: "Trustworthiness",  icon: "2", question: "Would I recommend this to my own family?" },
  adl:         { name: "'Adl",          arabic: "عَدْل",    meaning: "Justice",          icon: "3", question: "Is this fair to all parties?" },
  grandfather: { name: "Grandfather",   arabic: "",         meaning: "Dignity & Pride",  icon: "4", question: "Would I be proud to show this to my grandfather?" },
  akhirah:     { name: "Akhirah Lens",  arabic: "آخِرَة",   meaning: "Accountability",   icon: "5", question: "Will this stand before Allah, or will I wish I'd left it undone?" }
};

const DAILY_RHYTHM = [
  { time: "06:00", label: "Overnight Metrics", desc: "AGENT_09 compiles overnight metrics. Lead inbox checked.", agents: ["09"], color: "var(--blue)" },
  { time: "07:00", label: "Lead Research Cycle", desc: "AGENT_01 begins daily lead research and enrichment.", agents: ["01"], color: "var(--green)" },
  { time: "08:00", label: "Sequence Review", desc: "AGENT_02 reviews new enriched leads for sequence readiness.", agents: ["02"], color: "var(--green)" },
  { time: "09:00", label: "Morning Intelligence", desc: "Weekly dashboard delivery (Mondays). All agents receive daily summary.", agents: ["09"], color: "var(--blue)" },
  { time: "10:00", label: "Hasan Review", desc: "Review overnight content performance, outreach replies, and Ethics Gate flags.", agents: [], color: "var(--purple)" },
  { time: "10:00-13:00", label: "Priority 1: Client Delivery", desc: "Audits, sprint work, retainer deliverables. Agents 04, 05, 07 active.", agents: ["04","05","07"], color: "var(--red)", double: true },
  { time: "13:00-15:00", label: "Priority 3: Active Sales", desc: "Discovery calls, proposal reviews, follow-ups. Agents 03, 07 active.", agents: ["03","07"], color: "var(--amber)", double: true },
  { time: "15:00-17:00", label: "Priority 4: Content & Outreach", desc: "Content review and approval. Outreach sequence approvals. Agents 02, 05 active.", agents: ["02","05"], color: "var(--green)", double: true },
  { time: "17:00", label: "Pipeline Update", desc: "End-of-day pipeline update. AGENT_08 logs all deal movements.", agents: ["08"], color: "var(--blue)" },
  { time: "18:00", label: "Metrics Capture", desc: "AGENT_09 captures daily metrics. AGENT_05 schedules next-day content.", agents: ["09","05"], color: "var(--blue)" }
];

const PHASES = [
  { id: 1, name: "Foundation", months: "M1-3", label: "Foundation & First Revenue", focus: "Generate first 10 audit clients. Build content engine. Establish outreach system. Hasan leads all delivery personally.", target: "£5K-£10K/mo", active: ["01","02","03","04","05","06","07","09","10","14"], color: "var(--green)" },
  { id: 2, name: "Proof", months: "M4-6", label: "Scale & Systematise", focus: "Add CRM management, campaign strategy, funnel building. Begin retainer conversion. First Founder's Circle cohort planning.", target: "£5K-£8K/mo", active: ["01","02","03","04","05","06","07","08","09","10","11","12","14"], color: "var(--blue)" },
  { id: 3, name: "Scale", months: "M7-9", label: "Optimise & Expand", focus: "Full ethics monitoring active. Revenue intelligence online. Founder's Circle launch. All systems optimised.", target: "£8K-£12K/mo", active: ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18"], color: "var(--purple)" },
  { id: 4, name: "Amplify", months: "M10-12", label: "Full Operational Capacity", focus: "All 18 agents fully operational. Year 1 phased revenue achievement (£30K → £60K → £100K+). Year 2 planning commenced.", target: "£100K+ ARR", active: ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18"], color: "var(--amber)" }
];

const DECISION_TREES = [
  { title: "New Lead Arrives", icon: "→", steps: ["AGENT_01 identifies via LinkedIn/Apollo/referral","Immediate sector screen against prohibited list","If prohibited → TERMINATE, log reason","If clear → Full enrichment (80%+ completeness)","Ethics Gate evaluation (Sidq + Amanah + Adl)","If APPROVED → Handoff to AGENT_02","AGENT_02 crafts personalised sequence","Hasan reviews and approves all outreach","AGENT_02 activates in Instantly.ai","AGENT_03 manages replies → discovery call"] },
  { title: "Audit Requested", icon: "⚡", steps: ["AGENT_03 recommends tier based on discovery call","Starter (£497) / Growth (£897) / Scale (£1,497)","Proposal issued via PandaDoc with Ethics Gate","Hasan signs off on every proposal","Payment via Stripe → onboarding questionnaire","AGENT_04 briefed with full client context","Audit produced to tier specifications","Hasan reviews report before delivery","Delivery call led by Hasan","Post-audit handoff to AGENT_07 for nurture"] },
  { title: "Content Needed", icon: "✎", steps: ["AGENT_09 generates weekly content intelligence brief","AGENT_05 plans content calendar (4 posts + 1 newsletter)","Hasan approves content calendar","AGENT_05 drafts all content in Hasan's voice","Ethics Gate: Sidq check on all statistics and claims","Hasan reads and approves every piece","AGENT_05 schedules in Buffer/Beehiiv","Engagement managed throughout the week","Inbound leads flagged to AGENT_01","AGENT_09 captures week-end performance"] },
  { title: "Campaign Launch", icon: "▶", steps: ["AGENT_11 receives and validates campaign brief","Ethics Gate: Can objectives be achieved honestly?","Full-funnel strategy developed by AGENT_11","Client approves strategy before any spend","AGENT_05 produces all campaign creatives","AGENT_12 builds landing page (if needed)","Ethics Gate on all claims and CTAs","AGENT_06 launches in LinkedIn/Meta Ads","Weekly optimisation and reporting cycle"] },
  { title: "Ethics Violation", icon: "⚠", steps: ["Violation detected by agent or AGENT_13","Workflow STOPS immediately","Output returned with specific violation reason","Remediation guidance provided","Originating agent revises output","Re-submit for Ethics Gate review","Maximum 2 revision cycles","If still failing → escalate to Hasan for manual rewrite","Incident logged in Ethics Audit Log","Prompt reviewed for gap that allowed the violation"] },
  { title: "Revenue Behind Target", icon: "↓", steps: ["AGENT_15 detects >30% below target at Month 6","Emergency growth review convened by Hasan","AGENT_09 provides full performance data","Strategy review: pricing, positioning, lead volume","Review conversion rates at each funnel stage","Identify single highest-leverage action","Do NOT panic-sell or compromise ethics","Adjust lead volume targets if needed","Review content strategy for inbound improvement","Monthly check-ins until back on track"] }
];

const FAILURE_MODES = [
  { failure: "Ethics Gate REJECTED on outreach", action: "Halt sequence. Return to AGENT_02 with remediation notes.", recovery: "Max 2 revision cycles before Hasan manual rewrite." },
  { failure: "Client NPS below 7", action: "Escalate to Hasan within 1 hour.", recovery: "Hasan calls client within 24hrs. Remediation plan agreed. No upsell until NPS 8+." },
  { failure: "Campaign ROAS below 1.5x (2 weeks)", action: "Flag to Hasan. Prepare pause recommendation.", recovery: "Client call: pause and replan, budget reduce, or creative refresh." },
  { failure: "Client-facing automation error", action: "Pause automation immediately. Assess blast radius.", recovery: "AGENT_10 fixes. AGENT_07 contacts affected clients honestly." },
  { failure: "Prohibited sector lead passed", action: "Halt entire workflow. Do not enrich or outreach.", recovery: "Archive with reason. AGENT_01 prompt reviewed for gap." },
  { failure: "Y1 revenue >30% below target at M6", action: "Emergency growth review with AGENT_09 + AGENT_15 data.", recovery: "Strategy review. Never compromise ethics for revenue." },
  { failure: "Systematic ethics drift in agent", action: "Pause agent. Full audit of recent outputs.", recovery: "Revise prompt. Re-test. Reactivate after comprehensive evaluation." }
];

const HITL_CHECKPOINTS = [
  { point: "All outreach sequences", agent: "AGENT_02", review: "Hasan reviews before activation" },
  { point: "Discovery calls", agent: "AGENT_03", review: "Hasan leads all calls personally" },
  { point: "Every proposal", agent: "AGENT_03", review: "Hasan signs off before sending" },
  { point: "All audit reports", agent: "AGENT_04", review: "Hasan reviews before client delivery" },
  { point: "All delivery calls", agent: "AGENT_04", review: "Hasan leads all delivery calls" },
  { point: "Content calendar", agent: "AGENT_05", review: "Hasan approves before production" },
  { point: "Every content piece", agent: "AGENT_05", review: "Hasan reads and approves" },
  { point: "Campaign briefs", agent: "AGENT_11", review: "Hasan approves before strategy work" },
  { point: "Campaign reports", agent: "AGENT_09", review: "Hasan reviews before client delivery" },
  { point: "All upsell conversations", agent: "AGENT_07", review: "Hasan leads personally" },
  { point: "Automation sign-off", agent: "AGENT_10", review: "Hasan explicitly approves before live" }
];


// === ROUTING MAP POSITIONS ===
const NODE_POSITIONS = {
  AGENT_01: { x: 0.08, y: 0.22, group: "lead" },
  AGENT_02: { x: 0.08, y: 0.50, group: "lead" },
  AGENT_03: { x: 0.08, y: 0.78, group: "lead" },
  AGENT_04: { x: 0.30, y: 0.30, group: "delivery" },
  AGENT_05: { x: 0.30, y: 0.65, group: "delivery" },
  AGENT_06: { x: 0.50, y: 0.50, group: "ethics" },
  AGENT_07: { x: 0.70, y: 0.18, group: "content" },
  AGENT_08: { x: 0.70, y: 0.42, group: "content" },
  AGENT_09: { x: 0.70, y: 0.68, group: "client" },
  AGENT_10: { x: 0.50, y: 0.85, group: "analytics" },
  AGENT_11: { x: 0.30, y: 0.92, group: "campaign" },
  AGENT_12: { x: 0.50, y: 0.15, group: "automation" },
  AGENT_13: { x: 0.92, y: 0.25, group: "growth" },
  AGENT_14: { x: 0.92, y: 0.55, group: "operations" },
  AGENT_15: { x: 0.92, y: 0.82, group: "growth" }
};

// Build connections from agent data
function buildConnections() {
  const conns = [];
  AGENTS.forEach(a => {
    a.outbound.forEach(target => {
      conns.push({ from: a.id, to: target });
    });
  });
  return conns;
}

// === DOM UTILITIES ===
function $(sel, ctx = document) { return ctx.querySelector(sel); }
function $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }
function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

function getAgent(id) { return AGENTS.find(a => a.id === id); }
function agentColor(status) { return status === 'active' ? 'green' : status === 'standby' ? 'amber' : 'blue'; }
function statusLabel(status) { return status.charAt(0).toUpperCase() + status.slice(1); }

// === TAB SYSTEM ===
function initTabs() {
  const btns = $$('.tab-btn');
  const panels = $$('.tab-panel');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      btns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      $(`#tab-${target}`).classList.add('active');
      // Re-trigger animations
      if (target === 'routing') renderRoutingMap();
      if (target === 'overview') triggerBarAnimations();
    });
  });
}

// === ANIMATED COUNT-UP ===
function animateValue(el, end, duration = 1200, prefix = '', suffix = '') {
  const start = 0;
  const startTime = performance.now();
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (end - start) * eased);
    el.textContent = prefix + current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function triggerBarAnimations() {
  setTimeout(() => document.body.classList.add('bars-animated'), 100);
}

// === OVERVIEW TAB ===
function renderOverview() {
  // KPIs animate
  const activeCount = AGENTS.filter(a => a.status === 'active').length;
  const totalCount = AGENTS.length;
  setTimeout(() => {
    const kpiActiveEl = $('#kpi-active-value');
    if (kpiActiveEl) animateValue(kpiActiveEl, activeCount, 1000);
  }, 200);
  
  // Agent mini grid
  const grid = $('#agent-mini-grid');
  if (!grid) return;
  grid.innerHTML = '';
  AGENTS.forEach((a, i) => {
    const card = el('div', 'agent-mini anim-card');
    card.style.setProperty('--i', i);
    card.innerHTML = `
      <div class="agent-mini-num ${a.status}">${a.num}</div>
      <div class="agent-mini-info">
        <div class="agent-mini-name">${a.name}</div>
        <div class="agent-mini-role">${a.role}</div>
      </div>
      <span class="agent-mini-badge ${a.status}">${statusLabel(a.status)}</span>
    `;
    card.addEventListener('click', () => {
      // Switch to agents tab and highlight
      $('.tab-btn[data-tab="agents"]').click();
      setTimeout(() => {
        const target = $(`[data-agent-id="${a.id}"]`);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          target.classList.add('expanded');
        }
      }, 350);
    });
    grid.appendChild(card);
  });
}

// === AGENTS TAB ===
function renderAgents() {
  const grid = $('#agent-full-grid');
  if (!grid) return;
  grid.innerHTML = '';
  AGENTS.forEach((a, i) => {
    const card = el('div', 'agent-card anim-card');
    card.style.setProperty('--i', i);
    card.dataset.agentId = a.id;
    card.dataset.status = a.status;
    card.dataset.name = a.name.toLowerCase() + ' ' + a.role.toLowerCase();
    
    const inboundNames = a.inbound.map(id => { const ag = getAgent(id); return ag ? ag.name : id; }).join(', ') || 'None (source node)';
    const outboundNames = a.outbound.map(id => { const ag = getAgent(id); return ag ? ag.name : id; }).join(', ') || 'None';
    
    card.innerHTML = `
      <div class="agent-card-header">
        <div class="agent-id">
          <div class="agent-number ${a.status}">${a.num}</div>
          <div>
            <div class="agent-name">${a.name}</div>
            <div class="agent-role">${a.role}</div>
          </div>
        </div>
        <span class="badge badge-${agentColor(a.status)}"><span class="badge-dot"></span>${statusLabel(a.status)}</span>
      </div>
      <div class="agent-mission">${a.mission}</div>
      <div class="agent-expanded">
        <div class="agent-expanded-inner">
          <div>
            <div class="agent-section-label">Tools</div>
            <div class="agent-tag-list">${a.tools.map(t => `<span class="agent-tag">${t}</span>`).join('')}</div>
          </div>
          <div>
            <div class="agent-section-label">KPIs</div>
            <ul class="agent-kpi-list">${a.kpis.map(k => `<li>${k}</li>`).join('')}</ul>
          </div>
          <div>
            <div class="agent-section-label">Routing</div>
            <div class="agent-route-row"><strong>Inbound:</strong> ${inboundNames}</div>
            <div class="agent-route-row"><strong>Outbound:</strong> ${outboundNames}</div>
          </div>
          ${a.ethics ? `<div>
            <div class="agent-section-label">Ethics Gate Checkpoints</div>
            <ul class="agent-kpi-list">${a.checkpoints.map(c => `<li>${c}</li>`).join('')}</ul>
          </div>` : ''}
          ${a.escalation && a.escalation.length ? `<div>
            <div class="agent-section-label">Escalation Triggers</div>
            <ul class="agent-kpi-list">${a.escalation.map(e => `<li>${e}</li>`).join('')}</ul>
          </div>` : ''}
          <div class="agent-route-row"><strong>Phase:</strong> ${a.phase} &nbsp;|&nbsp; <strong>Activation:</strong> Month ${a.month}</div>
        </div>
      </div>
      <div class="expand-hint">Click to expand</div>
    `;
    
    card.addEventListener('click', () => {
      card.classList.toggle('expanded');
    });
    
    grid.appendChild(card);
  });
}

function initAgentFilters() {
  const searchBox = $('#agent-search');
  const filterBtns = $$('.filter-btn');
  
  if (searchBox) {
    searchBox.addEventListener('input', () => filterAgents());
  }
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterAgents();
    });
  });
}

function filterAgents() {
  const search = ($('#agent-search')?.value || '').toLowerCase();
  const activeFilter = $('.filter-btn.active')?.dataset.filter || 'all';
  const cards = $$('.agent-card');
  
  cards.forEach(card => {
    const name = card.dataset.name;
    const status = card.dataset.status;
    const matchSearch = !search || name.includes(search);
    const matchFilter = activeFilter === 'all' || status === activeFilter;
    card.classList.toggle('hidden', !(matchSearch && matchFilter));
  });
}

// === WORKFLOWS TAB ===
function renderWorkflows() {
  const list = $('#workflow-list');
  if (!list) return;
  list.innerHTML = '';
  
  WORKFLOWS.forEach((wf, i) => {
    const card = el('div', 'workflow-card anim-card');
    card.style.setProperty('--i', i);
    
    // Build flow diagram nodes
    const uniqueAgents = [...new Set(wf.steps.map(s => s.agent))];
    const flowNodes = uniqueAgents.map(agId => {
      const ag = getAgent(agId);
      const color = ag ? agentColor(ag.status) : 'purple';
      return `<div class="flow-node ${color}"><span class="flow-agent">${ag ? ag.num : agId}</span><span class="flow-name">${ag ? ag.name : ''}</span></div>`;
    }).join('<span class="flow-arrow">→</span>');
    
    // Build steps
    const stepsHtml = wf.steps.map(s => {
      const ag = getAgent(s.agent);
      const badges = [];
      if (s.ethics) badges.push('<span class="step-badge ethics-badge">Ethics Gate</span>');
      if (s.human) badges.push('<span class="step-badge human-badge">Human Review</span>');
      const numClass = s.ethics ? 'ethics' : s.human ? 'human' : '';
      return `
        <div class="step-item">
          <div class="step-num ${numClass}">${s.order}</div>
          <div class="step-content">
            <div class="step-title">${s.title}</div>
            <div class="step-agent">${ag ? ag.name : s.agent} · ${s.duration}</div>
            <div class="step-desc">${s.desc}</div>
            ${badges.length ? `<div class="step-badges">${badges.join('')}</div>` : ''}
          </div>
        </div>
      `;
    }).join('');
    
    card.innerHTML = `
      <div class="workflow-header">
        <div class="workflow-title">
          <span class="workflow-num">${wf.id}</span>
          ${wf.name}
        </div>
        <div class="workflow-meta">
          <span class="workflow-meta-item"><span style="color:var(--amber)">⚡</span> ${wf.ethicsGates} Ethics Gates</span>
          <span class="workflow-meta-item"><span style="color:var(--purple)">👤</span> ${wf.humanReviews} Human Reviews</span>
        </div>
      </div>
      <div class="workflow-desc">${wf.desc}</div>
      <div class="flow-diagram">${flowNodes}</div>
      <div class="workflow-steps">
        <div class="steps-inner">${stepsHtml}</div>
      </div>
      <div class="workflow-expand-hint">Click to view step-by-step breakdown</div>
    `;
    
    card.addEventListener('click', () => {
      card.classList.toggle('expanded');
    });
    
    list.appendChild(card);
  });
}

// === ROUTING MAP (SVG) ===
let routingRendered = false;
function renderRoutingMap() {
  if (routingRendered) return;
  const svgContainer = $('#routing-svg');
  if (!svgContainer) return;
  
  const rect = svgContainer.getBoundingClientRect();
  const W = rect.width || 1200;
  const H = rect.height || 600;
  const padX = 60;
  const padY = 40;
  const innerW = W - padX * 2;
  const innerH = H - padY * 2;
  
  svgContainer.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svgContainer.innerHTML = '';
  
  // Defs
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  defs.innerHTML = `
    <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="rgba(139,92,246,0.4)" />
    </marker>
    <marker id="arrowhead-highlight" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="rgba(139,92,246,0.9)" />
    </marker>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  `;
  svgContainer.appendChild(defs);
  
  // Connections
  const connections = buildConnections();
  const linksGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  linksGroup.setAttribute('class', 'routing-links');
  
  connections.forEach(conn => {
    const fromPos = NODE_POSITIONS[conn.from];
    const toPos = NODE_POSITIONS[conn.to];
    if (!fromPos || !toPos) return;
    
    const x1 = padX + fromPos.x * innerW;
    const y1 = padY + fromPos.y * innerH;
    const x2 = padX + toPos.x * innerW;
    const y2 = padY + toPos.y * innerH;
    
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const cx = midX - dy * 0.15;
    const cy = midY + dx * 0.15;
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'rgba(139,92,246,0.2)');
    path.setAttribute('stroke-width', '1.5');
    path.setAttribute('marker-end', 'url(#arrowhead)');
    path.setAttribute('class', 'routing-link');
    path.dataset.from = conn.from;
    path.dataset.to = conn.to;
    linksGroup.appendChild(path);
  });
  svgContainer.appendChild(linksGroup);
  
  // Nodes
  const nodesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  nodesGroup.setAttribute('class', 'routing-nodes');
  
  AGENTS.forEach(agent => {
    const pos = NODE_POSITIONS[agent.id];
    if (!pos) return;
    const x = padX + pos.x * innerW;
    const y = padY + pos.y * innerH;
    const isGuardian = agent.id === 'AGENT_06';
    const r = isGuardian ? 28 : 20;
    
    const statusColors = {
      active: '#10B981',
      standby: '#F59E0B',
      scheduled: '#3B82F6'
    };
    
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'routing-node');
    g.dataset.agentId = agent.id;
    
    // Outer glow for guardian
    if (isGuardian) {
      const glowCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      glowCircle.setAttribute('cx', x);
      glowCircle.setAttribute('cy', y);
      glowCircle.setAttribute('r', r + 8);
      glowCircle.setAttribute('fill', 'none');
      glowCircle.setAttribute('stroke', 'rgba(139,92,246,0.2)');
      glowCircle.setAttribute('stroke-width', '1');
      glowCircle.setAttribute('stroke-dasharray', '4 4');
      g.appendChild(glowCircle);
    }
    
    // Circle
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', r);
    circle.setAttribute('fill', '#0F1326');
    circle.setAttribute('stroke', statusColors[agent.status] || '#8B5CF6');
    circle.setAttribute('stroke-width', '2');
    g.appendChild(circle);
    
    // Number
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x);
    text.setAttribute('y', y - 3);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('fill', '#FFFFFF');
    text.setAttribute('font-size', isGuardian ? '11' : '10');
    text.setAttribute('font-weight', '800');
    text.setAttribute('font-family', 'Inter, sans-serif');
    text.textContent = agent.num;
    g.appendChild(text);
    
    // Name label
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', x);
    label.setAttribute('y', y + r + 14);
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('fill', '#9CA3AF');
    label.setAttribute('font-size', '9');
    label.setAttribute('font-weight', '600');
    label.setAttribute('font-family', 'Inter, sans-serif');
    label.textContent = agent.name;
    g.appendChild(label);
    
    // Hover interactions
    g.addEventListener('mouseenter', () => highlightAgent(agent.id));
    g.addEventListener('mouseleave', () => clearHighlight());
    g.addEventListener('click', () => showAgentInfo(agent.id));
    
    nodesGroup.appendChild(g);
  });
  svgContainer.appendChild(nodesGroup);
  routingRendered = true;
}

function highlightAgent(agentId) {
  const svg = $('#routing-svg');
  if (!svg) return;
  const agent = getAgent(agentId);
  if (!agent) return;
  
  const connectedIds = new Set([agentId]);
  agent.inbound.forEach(id => connectedIds.add(id));
  agent.outbound.forEach(id => connectedIds.add(id));
  
  // Dim all nodes
  $$('.routing-node', svg).forEach(n => {
    if (connectedIds.has(n.dataset.agentId)) {
      n.classList.remove('routing-dimmed');
      n.classList.add('routing-highlighted');
    } else {
      n.classList.add('routing-dimmed');
      n.classList.remove('routing-highlighted');
    }
  });
  
  // Highlight connected links
  $$('.routing-link', svg).forEach(link => {
    const from = link.dataset.from;
    const to = link.dataset.to;
    if ((from === agentId || to === agentId)) {
      link.classList.remove('routing-dimmed');
      link.classList.add('routing-highlighted');
      link.setAttribute('stroke', 'rgba(139,92,246,0.8)');
      link.setAttribute('marker-end', 'url(#arrowhead-highlight)');
    } else {
      link.classList.add('routing-dimmed');
      link.classList.remove('routing-highlighted');
      link.setAttribute('stroke', 'rgba(139,92,246,0.2)');
      link.setAttribute('marker-end', 'url(#arrowhead)');
    }
  });
}

function clearHighlight() {
  const svg = $('#routing-svg');
  if (!svg) return;
  $$('.routing-node', svg).forEach(n => {
    n.classList.remove('routing-dimmed', 'routing-highlighted');
  });
  $$('.routing-link', svg).forEach(link => {
    link.classList.remove('routing-dimmed', 'routing-highlighted');
    link.setAttribute('stroke', 'rgba(139,92,246,0.2)');
    link.setAttribute('marker-end', 'url(#arrowhead)');
  });
  // Hide info panel
  const panel = $('#routing-info');
  if (panel) panel.classList.remove('visible');
}

function showAgentInfo(agentId) {
  const agent = getAgent(agentId);
  if (!agent) return;
  const panel = $('#routing-info');
  if (!panel) return;
  
  const inbound = agent.inbound.map(id => { const a = getAgent(id); return a ? `${a.num} ${a.name}` : id; }).join(', ') || 'None';
  const outbound = agent.outbound.map(id => { const a = getAgent(id); return a ? `${a.num} ${a.name}` : id; }).join(', ') || 'None';
  
  panel.innerHTML = `
    <div class="routing-info-section">
      <div class="routing-info-title">${agent.num} — ${agent.name}</div>
      <p>${agent.role} · Phase ${agent.phase} · ${statusLabel(agent.status)}</p>
    </div>
    <div class="routing-info-section">
      <h4>Inbound From</h4>
      <p>${inbound}</p>
    </div>
    <div class="routing-info-section">
      <h4>Outbound To</h4>
      <p>${outbound}</p>
    </div>
  `;
  panel.classList.add('visible');
  
  // Keep highlight active after click
  highlightAgent(agentId);
}

// === SCHEDULE TAB ===
function renderSchedule() {
  const timeline = $('#schedule-timeline');
  if (!timeline) return;
  timeline.innerHTML = '';
  
  DAILY_RHYTHM.forEach((item, i) => {
    const div = el('div', 'timeline-item anim-card');
    div.style.setProperty('--i', i);
    const agentTags = item.agents.map(n => `<span class="agent-tag">${n}</span>`).join('');
    div.innerHTML = `
      <div class="timeline-time">${item.time}</div>
      <div class="timeline-bar ${item.double ? 'double' : ''}" style="--bar-color: ${item.color}"></div>
      <div class="timeline-content">
        <div class="timeline-label">${item.label}</div>
        <div class="timeline-desc">${item.desc}</div>
        ${agentTags ? `<div class="timeline-agents">${agentTags}</div>` : ''}
      </div>
    `;
    timeline.appendChild(div);
  });
  
  // Phases
  const phaseGrid = $('#phase-grid');
  if (!phaseGrid) return;
  phaseGrid.innerHTML = '';
  
  PHASES.forEach((phase, i) => {
    const card = el('div', `phase-card anim-card ${i === 0 ? 'current' : ''}`);
    card.style.setProperty('--i', i);
    card.style.setProperty('--phase-color', phase.color);
    
    const allNums = Array.from({length: 15}, (_, j) => String(j + 1).padStart(2, '0'));
    const agentDots = allNums.map(n => {
      const isActive = phase.active.includes(n);
      return `<div class="phase-agent-dot ${isActive ? 'active' : 'standby'}">${n}</div>`;
    }).join('');
    
    card.innerHTML = `
      <div class="phase-number">Phase ${phase.id}</div>
      <div class="phase-name">${phase.label}</div>
      <div class="phase-months">${phase.months}</div>
      <div class="phase-focus">${phase.focus}</div>
      <div class="phase-agents-label">Agents (${phase.active.length}/18)</div>
      <div class="phase-agents-list">${agentDots}</div>
      <div class="phase-target">Target: ${phase.target}</div>
    `;
    phaseGrid.appendChild(card);
  });
}

// === PLAYBOOK TAB ===
function renderPlaybook() {
  // Agent quick reference table
  const tbody = $('#playbook-tbody');
  if (tbody) {
    tbody.innerHTML = '';
    AGENTS.forEach(a => {
      const tr = el('tr');
      tr.innerHTML = `
        <td>${a.num}</td>
        <td style="color:var(--text-heading); font-weight:600">${a.name}</td>
        <td>${a.role}</td>
        <td><span class="badge badge-${agentColor(a.status)}" style="font-size:0.625rem">${statusLabel(a.status)}</span></td>
        <td>${a.phase}</td>
        <td>M${a.month}</td>
        <td>${a.ethics ? '<span style="color:var(--green)">Yes</span>' : '<span style="color:var(--text-faint)">No</span>'}</td>
        <td>${a.tools.slice(0, 3).join(', ')}${a.tools.length > 3 ? '...' : ''}</td>
      `;
      tbody.appendChild(tr);
    });
  }
  
  // Decision trees
  const dtList = $('#decision-trees');
  if (dtList) {
    dtList.innerHTML = '';
    DECISION_TREES.forEach((dt, i) => {
      const card = el('div', 'decision-card anim-card');
      card.style.setProperty('--i', i);
      const stepsHtml = dt.steps.map((s, j) => `<div class="decision-step" data-step="${j + 1}.">${s}</div>`).join('');
      card.innerHTML = `
        <div class="decision-title"><span>${dt.icon}</span> ${dt.title}</div>
        <div class="decision-expand-hint">Click to expand</div>
        <div class="decision-steps">
          <div class="decision-steps-inner">${stepsHtml}</div>
        </div>
      `;
      card.addEventListener('click', () => card.classList.toggle('expanded'));
      dtList.appendChild(card);
    });
  }
  
  // HITL checkpoints
  const hitlBody = $('#hitl-tbody');
  if (hitlBody) {
    hitlBody.innerHTML = '';
    HITL_CHECKPOINTS.forEach(h => {
      const ag = getAgent(h.agent);
      const tr = el('tr');
      tr.innerHTML = `
        <td style="color:var(--text-heading); font-weight:600">${h.point}</td>
        <td>${ag ? ag.name : h.agent}</td>
        <td>${h.review}</td>
      `;
      hitlBody.appendChild(tr);
    });
  }
  
  // Failure modes
  const failBody = $('#failure-tbody');
  if (failBody) {
    failBody.innerHTML = '';
    FAILURE_MODES.forEach(f => {
      const tr = el('tr');
      tr.innerHTML = `
        <td style="color:var(--red); font-weight:600">${f.failure}</td>
        <td>${f.action}</td>
        <td>${f.recovery}</td>
      `;
      failBody.appendChild(tr);
    });
  }
}

// === TABLE SORTING ===
function initTableSort() {
  $$('.sortable-table th').forEach((th, colIndex) => {
    th.addEventListener('click', () => {
      const table = th.closest('table');
      const tbody = table.querySelector('tbody');
      const rows = [...tbody.querySelectorAll('tr')];
      const isAsc = th.dataset.sort !== 'asc';
      
      // Reset all headers
      $$('th', table).forEach(h => delete h.dataset.sort);
      th.dataset.sort = isAsc ? 'asc' : 'desc';
      
      rows.sort((a, b) => {
        const aText = a.children[colIndex]?.textContent.trim() || '';
        const bText = b.children[colIndex]?.textContent.trim() || '';
        const aNum = parseFloat(aText);
        const bNum = parseFloat(bText);
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return isAsc ? aNum - bNum : bNum - aNum;
        }
        return isAsc ? aText.localeCompare(bText) : bText.localeCompare(aText);
      });
      
      rows.forEach(r => tbody.appendChild(r));
    });
  });
}

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  renderOverview();
  renderAgents();
  initAgentFilters();
  renderWorkflows();
  renderSchedule();
  renderPlaybook();
  initTableSort();
  
  // Trigger animations
  triggerBarAnimations();
  
  // Update date
  const dateEl = $('#current-date');
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
});
