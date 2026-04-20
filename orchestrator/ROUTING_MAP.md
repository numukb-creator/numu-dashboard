# NUMU ENGINE — ROUTING MAP
### Complete Agent Connection Reference | v1.0.0

---

## SECTION 1: MASTER ROUTING INDEX

This document defines every inbound and outbound connection between all 15 Numu Engine agents. Each connection entry shows: data type, trigger condition, format, and ethics gate status.

---

## SECTION 2: PER-AGENT CONNECTION TABLES

---

### AGENT_01 — THE SCOUT
**Role:** Lead Research & Enrichment

#### Inbound Connections
| # | From | Data Type | Trigger | Format |
|---|---|---|---|---|
| 1 | AGENT_14 | Referred lead (name, company, referral context) | Partner submits referral | JSON lead stub |
| 2 | External (LinkedIn/Apollo/Clay) | Raw prospect data | Daily research cycle | Variable (tool-dependent) |

#### Outbound Connections
| # | To | Data Type | Trigger | Format | Ethics Gate Required |
|---|---|---|---|---|---|
| 1 | AGENT_02 | Enriched lead card (full profile) | EG_APPROVED after full evaluation | JSON Lead Card (see schema below) | YES — must be EG_APPROVED before handoff |
| 2 | AGENT_08 | Raw lead data for CRM entry | EG_APPROVED | CRM record object | NO |

**Lead Card Schema (AGENT_01 → AGENT_02):**
```json
{
  "lead_id": "string (UUID)",
  "enrichment_date": "ISO8601",
  "company_name": "string",
  "sector": "string",
  "sector_ethics_status": "CLEAR | FLAGGED | PROHIBITED",
  "decision_maker_name": "string",
  "decision_maker_title": "string",
  "email": "string",
  "phone": "string",
  "linkedin_url": "string",
  "company_linkedin": "string",
  "website": "string",
  "company_size": "string",
  "turnover_estimate": "string",
  "companies_house_number": "string",
  "charity_number": "string | null",
  "digital_presence_score": "integer (1-10)",
  "pain_indicators": ["string array"],
  "recent_news": ["string array"],
  "enrichment_completeness_percent": "integer",
  "ethics_gate_verdict": "EG_APPROVED | EG_FLAGGED | EG_REJECTED",
  "ethics_gate_reasoning": "string",
  "ethics_gate_date": "ISO8601"
}
```

---

### AGENT_02 — THE SCRIBE
**Role:** Outreach Copywriter & Sequence Builder

#### Inbound Connections
| # | From | Data Type | Trigger | Format |
|---|---|---|---|---|
| 1 | AGENT_01 | Enriched lead card | EG_APPROVED verdict from AGENT_01 | JSON Lead Card |
| 2 | AGENT_08 | Additional CRM data for personalisation | On request from AGENT_02 | CRM contact record |

#### Outbound Connections
| # | To | Data Type | Trigger | Format | Ethics Gate Required |
|---|---|---|---|---|---|
| 1 | AGENT_03 | Activated sequence metadata + reply alerts | Sequence live + replies received | Sequence Pack JSON | YES — Hasan must approve before activation |
| 2 | AGENT_08 | Sequence tracking data | Sequence activated | Sequence log object | NO |

**Sequence Pack Schema (AGENT_02 → AGENT_03):**
```json
{
  "lead_id": "string",
  "sequence_id": "string",
  "sequence_type": "email | linkedin | combined",
  "email_steps": [
    {
      "step": "integer",
      "send_day": "integer (days from start)",
      "subject": "string",
      "body": "string",
      "personalisation_notes": "string"
    }
  ],
  "linkedin_steps": [
    {
      "step": "integer",
      "send_day": "integer",
      "message": "string"
    }
  ],
  "personalisation_score": "integer (1-10)",
  "ethics_gate_verdict": "EG_APPROVED",
  "hasan_approval_status": "APPROVED | PENDING | REJECTED",
  "hasan_approval_date": "ISO8601",
  "activation_date": "ISO8601"
}
```

---

### AGENT_03 — THE CLOSER
**Role:** Sales Strategy & Conversion

#### Inbound Connections
| # | From | Data Type | Trigger | Format |
|---|---|---|---|---|
| 1 | AGENT_02 | Sequence metadata + reply alerts | Reply received in Instantly.ai | Reply notification + sequence context |
| 2 | AGENT_07 | Upsell-ready client flag | AGENT_07 raises flag after value validation | Upsell Flag JSON |
| 3 | AGENT_08 | Pipeline status, deal history, contact log | On request or deal stage trigger | CRM deal record |

#### Outbound Connections
| # | To | Data Type | Trigger | Format | Ethics Gate Required |
|---|---|---|---|---|---|
| 1 | AGENT_04 | Audit briefing pack | Invoice paid | Briefing Pack JSON | NO (Ethics Gate already done at proposal stage) |
| 2 | AGENT_07 | Post-close handoff (client details, NPS target) | Invoice paid | Client onboarding brief | NO |
| 3 | AGENT_08 | Deal stage updates, revenue | Any deal stage change | CRM update event | NO |

**Audit Briefing Pack Schema (AGENT_03 → AGENT_04):**
```json
{
  "client_id": "string",
  "company_name": "string",
  "service_tier": "STARTER_497 | GROWTH_897 | SCALE_1497",
  "price_paid": "integer",
  "invoice_id": "string",
  "payment_date": "ISO8601",
  "delivery_deadline": "ISO8601",
  "decision_maker_name": "string",
  "discovery_call_notes": "string",
  "pain_points": ["string array"],
  "stated_goals": ["string array"],
  "access_granted": {
    "ga4": "boolean",
    "search_console": "boolean",
    "linkedin_analytics": "boolean",
    "meta_ads": "boolean",
    "ahrefs_semrush": "boolean",
    "website_backend": "boolean"
  },
  "hasan_notes": "string"
}
```

---

### AGENT_04 — THE AUDITOR
**Role:** Growth Audit Delivery

#### Inbound Connections
| # | From | Data Type | Trigger | Format |
|---|---|---|---|---|
| 1 | AGENT_03 | Audit briefing pack | Invoice paid and onboarding completed | Briefing Pack JSON |

#### Outbound Connections
| # | To | Data Type | Trigger | Format | Ethics Gate Required |
|---|---|---|---|---|---|
| 1 | AGENT_05 | Content gap and keyword intelligence | Mid-audit analysis complete | Content Intelligence Brief | NO |
| 2 | AGENT_07 | Audit completion pack + upsell readiness | Post-delivery call | Completion Pack JSON | YES — Amanah check on upsell readiness score |
| 3 | AGENT_08 | Delivery confirmation, NPS score | Audit delivered | CRM update | NO |

**Audit Completion Pack Schema (AGENT_04 → AGENT_07):**
```json
{
  "client_id": "string",
  "audit_id": "string",
  "service_tier": "string",
  "delivery_date": "ISO8601",
  "report_url": "string",
  "deck_url": "string | null",
  "nps_score": "integer (1-10)",
  "nps_verbatim": "string",
  "call_notes": "string",
  "top_recommendations": ["string array (top 5)"],
  "quick_wins_identified": ["string array"],
  "upsell_readiness_score": "integer (1-10)",
  "upsell_readiness_reasoning": "string",
  "recommended_next_tier": "SPRINT | NONE | FOUNDER_CIRCLE",
  "hasan_delivery_notes": "string"
}
```

---

### AGENT_05 — THE STORYTELLER
**Role:** Content Strategy & Creation

#### Inbound Connections
| # | From | Data Type | Trigger | Format |
|---|---|---|---|---|
| 1 | AGENT_04 | Content gap and keyword intelligence | Mid-audit for client context | Content Intelligence Brief |
| 2 | AGENT_06 | Paid performance data for organic strategy | Weekly | Performance data JSON |
| 3 | AGENT_09 | Weekly content performance brief | Monday morning | Analytics brief |
| 4 | AGENT_11 | Campaign content brief (Phase 2+) | Campaign strategy approved | Campaign Content Brief |

#### Outbound Connections
| # | To | Data Type | Trigger | Format | Ethics Gate Required |
|---|---|---|---|---|---|
| 1 | AGENT_06 | Published content + amplification candidates | Post-publish | Content metadata + performance flags | YES — content must be EG_APPROVED before amplification |
| 2 | AGENT_08 | Content performance metrics, lead attribution | Weekly | Analytics update | NO |

---

### AGENT_06 — THE AMPLIFIER
**Role:** Paid Campaigns & Distribution

#### Inbound Connections
| # | From | Data Type | Trigger | Format |
|---|---|---|---|---|
| 1 | AGENT_05 | Organic content for amplification + performance data | Post-publish + weekly | Content + performance data |
| 2 | AGENT_09 | Campaign benchmarks and optimisation recommendations | Weekly | Analytics brief |
| 3 | AGENT_11 | Campaign brief with targeting and budget (Phase 2+) | Strategy approved | Campaign Brief JSON |
| 4 | AGENT_12 | Landing page URLs and conversion tracking (Phase 2+) | Page live | URL + tracking codes |

#### Outbound Connections
| # | To | Data Type | Trigger | Format | Ethics Gate Required |
|---|---|---|---|---|---|
| 1 | AGENT_05 | Paid performance data for organic strategy alignment | Weekly | Performance data JSON | NO |
| 2 | AGENT_08 | Campaign spend, ROAS, lead volume | Weekly | Campaign metrics | NO |
| 3 | AGENT_09 | Performance trends for reporting | Weekly | Raw campaign data | NO |

---

### AGENT_07 — THE ADVISOR
**Role:** Client Success & Upsell Strategy

#### Inbound Connections
| # | From | Data Type | Trigger | Format |
|---|---|---|---|---|
| 1 | AGENT_03 | New client onboarding handoff | Invoice paid | Client onboarding brief |
| 2 | AGENT_04 | Audit completion pack + upsell readiness | Post-delivery | Completion Pack JSON |

#### Outbound Connections
| # | To | Data Type | Trigger | Format | Ethics Gate Required |
|---|---|---|---|---|---|
| 1 | AGENT_03 | Upsell-ready flag with full context | After value validation + Hasan confirmation | Upsell Flag JSON | YES — Amanah + Grandfather Principle check |
| 2 | AGENT_08 | Client health scores, renewal status | Weekly | Client health update | NO |
| 3 | AGENT_09 | Client portfolio summary | Monthly | Portfolio health report | NO |

**Upsell Flag Schema (AGENT_07 → AGENT_03):**
```json
{
  "client_id": "string",
  "current_tier": "string",
  "recommended_next_tier": "SPRINT | RETAINER_700 | RETAINER_CUSTOM | FOUNDER_CIRCLE",
  "value_validation_confirmed": "boolean",
  "value_evidence": ["string array (specific results achieved)"],
  "hasan_approval": "boolean",
  "hasan_approval_date": "ISO8601",
  "client_sentiment": "HIGHLY_POSITIVE | POSITIVE | NEUTRAL",
  "last_nps_score": "integer",
  "client_last_contact_date": "ISO8601",
  "recommended_approach": "string (how to raise the conversation)"
}
```

---

### AGENT_08 — THE KEEPER (Phase 2+)
**Role:** CRM, Data & Pipeline Management

#### Inbound Connections
| # | From | Data Type | Trigger |
|---|---|---|---|
| 1 | AGENT_01 | Raw lead data | Lead enriched |
| 2 | AGENT_02 | Sequence tracking data | Sequence activated |
| 3 | AGENT_03 | Deal status, revenue logged | Deal stage change |
| 4 | AGENT_04 | Delivery confirmation, NPS | Audit delivered |
| 5 | AGENT_05 | Content metrics, lead attribution | Weekly |
| 6 | AGENT_06 | Campaign spend, ROAS | Weekly |
| 7 | AGENT_07 | Client health scores | Weekly |
| 8 | AGENT_09 | Analytics exports | Weekly |
| 9 | AGENT_10 | Automation run logs | Ongoing |
| 10 | AGENT_12 | Lead capture data | Ongoing |
| 11 | AGENT_14 | Partnership records, referral tracking | On update |

#### Outbound Connections
| # | To | Data Type | Trigger | Ethics Gate Required |
|---|---|---|---|---|
| 1 | AGENT_02 | Contact data for personalisation | On request | NO |
| 2 | AGENT_03 | Pipeline status, deal history | On request | NO |
| 3 | AGENT_09 | Consolidated data export | Weekly | NO |

---

### AGENT_09 — THE ANALYST
**Role:** Performance Analytics & Reporting

#### Inbound Connections
| # | From | Data Type | Trigger |
|---|---|---|---|
| 1 | AGENT_05 | Content performance data | Weekly |
| 2 | AGENT_06 | Paid campaign metrics | Weekly |
| 3 | AGENT_07 | Client portfolio data | Monthly |
| 4 | AGENT_08 | CRM data exports | Weekly |

#### Outbound Connections
| # | To | Data Type | Trigger | Ethics Gate Required |
|---|---|---|---|---|
| 1 | AGENT_05 | Weekly content performance brief | Monday 09:00 | NO |
| 2 | AGENT_06 | Campaign benchmarks and optimisation notes | Weekly | NO |
| 3 | AGENT_08 | Analytics data for CRM enrichment | Weekly | NO |

---

### AGENT_10 — THE ARCHITECT
**Role:** Marketing Automation & Tech Stack

#### Inbound Connections
| # | From | Data Type | Trigger |
|---|---|---|---|
| 1 | AGENT_09 | Performance triggers that activate automation adjustments | Threshold events |

#### Outbound Connections
| # | To | Data Type | Trigger | Ethics Gate Required |
|---|---|---|---|---|
| 1 | AGENT_08 | Automation run logs, system events | Ongoing | NO |

---

### AGENT_11 — THE STRATEGIST (Phase 2+)
**Role:** Campaign Strategy & Planning

#### Inbound Connections
| # | From | Data Type | Trigger |
|---|---|---|---|
| 1 | AGENT_03 | Client campaign brief | Client requests campaign service |
| 2 | AGENT_09 | Historical performance data | Strategy development phase |

#### Outbound Connections
| # | To | Data Type | Trigger | Ethics Gate Required |
|---|---|---|---|---|
| 1 | AGENT_05 | Campaign content brief | Strategy approved by client | YES |
| 2 | AGENT_06 | Full campaign brief (budget, channels, KPIs, targeting, ethics constraints) | Strategy approved by client | YES |

---

### AGENT_12 — THE BUILDER (Phase 2, Month 5+)
**Role:** Funnel & Landing Page Development

#### Inbound Connections
| # | From | Data Type | Trigger |
|---|---|---|---|
| 1 | AGENT_11 | Campaign strategy with landing page requirements | Campaign strategy approved |

#### Outbound Connections
| # | To | Data Type | Trigger | Ethics Gate Required |
|---|---|---|---|---|
| 1 | AGENT_06 | Live page URLs and conversion tracking | Page published | YES |
| 2 | AGENT_08 | Lead capture form integration data | Ongoing | NO |

---

### AGENT_13 — THE GUARDIAN (Phase 3+)
**Role:** Ethics & Compliance Monitoring

#### Inbound Connections
| # | From | Data Type | Trigger |
|---|---|---|---|
| 1 | AGENT_01 | Enriched leads for ethics evaluation | Pre-handoff to AGENT_02 |
| 2 | AGENT_02 | Outreach sequences for ethics evaluation | Pre-activation |
| 3 | AGENT_03 | Proposals for ethics evaluation | Pre-issue |
| 4 | AGENT_04 | Audit reports for ethics evaluation | Pre-delivery |
| 5 | AGENT_05 | Content drafts for ethics evaluation | Pre-publish |
| 6 | AGENT_06 | Ad creative for ethics evaluation | Pre-launch |
| 7 | AGENT_07 | Upsell proposals for ethics evaluation | Pre-conversation |
| 8 | AGENT_11 | Campaign strategies for ethics evaluation | Pre-client presentation |
| 9 | AGENT_12 | Landing pages for ethics evaluation | Pre-live |

#### Outbound Connections
| # | To | Data Type | Trigger | Format |
|---|---|---|---|---|
| 1 | ALL requesting agents | Ethics Gate verdict (APPROVED/FLAGGED/REJECTED) with reasoning and remediation | On evaluation completion | Ethics Verdict JSON |

**Ethics Verdict Schema (AGENT_13 → Any Agent):**
```json
{
  "verdict_id": "string (UUID)",
  "verdict_date": "ISO8601",
  "requesting_agent": "string",
  "output_type": "string",
  "workflow_id": "string",
  "step_number": "integer",
  "verdict": "EG_APPROVED | EG_FLAGGED | EG_REJECTED",
  "pillars_evaluated": {
    "sidq": "PASS | FAIL | CONCERN",
    "amanah": "PASS | FAIL | CONCERN",
    "adl": "PASS | FAIL | CONCERN",
    "grandfather_principle": "PASS | FAIL | CONCERN | N/A"
  },
  "violation_details": "string | null",
  "specific_issue": "string | null (exact text causing concern)",
  "remediation_guidance": "string | null",
  "hasan_escalation_required": "boolean"
}
```

---

### AGENT_14 — THE NETWORKER
**Role:** Partnership & Community Development

#### Inbound Connections
| # | From | Data Type | Trigger |
|---|---|---|---|
| 1 | External (LinkedIn, events, networks) | Partnership opportunity leads | Ongoing research |
| 2 | External | Referral partner enquiries | Inbound |

#### Outbound Connections
| # | To | Data Type | Trigger | Ethics Gate Required |
|---|---|---|---|---|
| 1 | AGENT_01 | Referred leads for enrichment and qualification | On referral receipt | YES — referral must pass sector screen |
| 2 | AGENT_08 | Partnership records, referral tracking, MOU storage | On update | NO |

---

### AGENT_15 — THE FORECASTER (Phase 3+)
**Role:** Revenue Intelligence & Strategic Planning

#### Inbound Connections
| # | From | Data Type | Trigger |
|---|---|---|---|
| 1 | AGENT_08 | Revenue and pipeline data | Monthly |
| 2 | AGENT_09 | Performance analytics for forecast input | Monthly |

#### Outbound Connections
| # | To | Data Type | Trigger | Ethics Gate Required |
|---|---|---|---|---|
| 1 | AGENT_09 | Revenue forecasts, scenario models, strategic planning summaries | Monthly | NO (Adl self-check: all projections clearly labelled as estimates) |

---

## SECTION 3: ASCII FLOW DIAGRAMS — ALL 7 WORKFLOWS

---

### WF_01: NEW LEAD FLOW

```
EXTERNAL SOURCE (LinkedIn / Apollo / Referral / Inbound)
         |
         v
   ┌─────────────┐
   │  AGENT_01   │ ← Lead identified
   │  THE SCOUT  │
   └──────┬──────┘
          │
    [ETHICS GATE 1: Sector Screen]
          │
    ┌─────┴───────────────┐
    │                     │
  PASS                  FAIL
    │                     │
    v                  TERMINATE
  Enrichment            (log reason)
    │
  [Completeness check: 80%+?]
    │
    v
  [ETHICS GATE 2: Full Evaluation]
    │
    ├─── EG_REJECTED ──────────→ ARCHIVED (no outreach)
    ├─── EG_FLAGGED ──────────→ HASAN REVIEW → decision
    └─── EG_APPROVED
              │
    ┌─────────┴──────────┐
    v                    v
┌─────────────┐    ┌─────────────┐
│  AGENT_02   │    │  AGENT_08   │
│  THE SCRIBE │    │  THE KEEPER │ (CRM entry)
└──────┬──────┘    └─────────────┘
       │
  [Sequence Drafted]
       │
  [ETHICS GATE 3: Sidq Check on every message]
       │
    ├─── FAIL ──────→ Revise (max 2 cycles) → HASAN REWRITE
    └─── PASS
              │
         HASAN REVIEW (non-negotiable)
              │
    ┌─────────┴──────────────┐
    │                        │
  APPROVED                REVISED/REJECTED
    │                        │
    v                        v
Sequence live            Implement or archive
(Instantly.ai)
    │
    v
┌─────────────┐
│  AGENT_03   │ ← Manages replies and objections
│  THE CLOSER │
└──────┬──────┘
       │
  [Discovery Call — Hasan-led]
       │
  [ETHICS GATE: Proposal tier check — Adl]
       │
  HASAN REVIEW of proposal
       │
  Proposal issued → Client signs → Invoice paid
       │
       v
   ┌─────────────┐
   │  AGENT_04   │ ← Briefed with full client pack
   │ THE AUDITOR │
   └─────────────┘
```

---

### WF_02: AUDIT DELIVERY FLOW

```
AGENT_03 → AGENT_04 briefing pack
               │
               v
        ┌─────────────┐
        │  AGENT_04   │
        │ THE AUDITOR │
        └──────┬──────┘
               │
         [Scope confirmed — Hasan signs off]
               │
               v
         Data collection (GA4, Search Console,
         Ahrefs, LinkedIn, Meta, etc.)
               │
               v
         Analysis complete
               │
               ├──────────────→ AGENT_05 (content gap intelligence)
               │
               v
         Report drafted
               │
         [ETHICS GATE: Sidq + Amanah + Adl]
         [Are all claims honest? Projections labelled?]
               │
    ┌──────────┴───────────────┐
    │                          │
  FAIL                      PASS
    │                          │
  Revise                  HASAN REVIEW (non-negotiable)
                               │
                         Approved → Client receives report
                               │
                         Delivery call (Hasan-led)
                               │
                         NPS captured
                               │
               ┌───────────────┴──────────────┐
               v                              v
        NPS 8+/10                        NPS below 7
        │                                │
        v                                v
  ┌─────────────┐                IMMEDIATE ESCALATION
  │  AGENT_07   │                to Hasan
  │  THE ADVISOR│
  └──────┬──────┘
         │
  [ETHICS GATE: Amanah — has value been received?]
         │
    ┌────┴────────────────────┐
    │                         │
  Upsell ready              Not ready
    │                         │
    v                         v
  → WF_04                 Nurture via content
  (Upsell Flow)           30-day review reminder
```

---

### WF_03: CONTENT FLOW (Weekly Cycle)

```
MONDAY 09:00 — CYCLE START
       │
       v
┌─────────────┐
│  AGENT_09   │ ← Last week's performance data
│ THE ANALYST │
└──────┬──────┘
       │
       v
┌─────────────┐
│  AGENT_05   │ ← Content calendar planned
│THE STORYTELL│
└──────┬──────┘
       │
  HASAN APPROVAL of calendar (non-negotiable)
       │
  Production begins (Mon-Wed)
       │
  [ETHICS GATE: Sidq check — all claims verified?]
       │
    ┌──┴───────────────┐
    │                  │
  FAIL              PASS
    │                  │
  Revise          HASAN FINAL REVIEW (non-negotiable)
                       │
                  APPROVED → Schedule in Buffer / Beehiiv
                       │
                  Publish (Thu-Fri)
                       │
                  Engagement monitoring
                       │
             ┌─────────┴──────────────┐
             │                        │
      Inbound leads              High performance
             │                        │
             v                        v
       AGENT_01                  AGENT_06
     (WF_01 starts)          (amplification review)
             │
       FRIDAY: Metrics captured
             │
       AGENT_09 closes cycle
             │
       → MONDAY: Cycle restarts
```

---

### WF_04: UPSELL FLOW

```
AGENT_07 raises upsell-ready flag
       │
  [ETHICS GATE: Amanah — Has value been received?]
  [Retainers Are Earned, Not Sold check]
       │
    ┌──┴──────────────────┐
    │                     │
  NO                    YES
    │                     │
  HOLD 30 days       HASAN CONFIRMS (non-negotiable)
  (review reminder)       │
                     Natural upsell mention
                     (AGENT_07 in check-in)
                          │
             ┌────────────┴──────────────┐
             │            │              │
       Interested      Not Now       Not Interested
             │            │              │
             v            v              v
      AGENT_03        60-day          ARCHIVED
    (Upsell           reminder        (no further
    Discovery         → FLAG          upsell)
    Call)             RAISED
             │
  [ETHICS GATE: Grandfather Principle check]
  [Is existing pricing honoured?]
             │
  HASAN leads discovery call
             │
  Proposal drafted
             │
  [ETHICS GATE: Full Sidq + Amanah + Adl check]
             │
  HASAN reviews and approves proposal
             │
  Proposal issued → Client signs → Invoice paid
             │
  AGENT_08 logs new engagement
```

---

### WF_05: CAMPAIGN FLOW (Phase 2+)

```
CLIENT / HASAN requests campaign
       │
  [Phase check: Is AGENT_11 active?]
       │
  AGENT_11 — Brief intake
       │
  [ETHICS GATE: Sidq — can this campaign be run honestly?]
       │
    ┌──┴────────────────┐
    │                   │
  FAIL               PASS
    │                   │
  REJECT           Strategy development
  (Hasan notified)       │
                   CLIENT APPROVES strategy
                   (non-negotiable)
                         │
                   AGENT_05 produces creative
                         │
                   [ETHICS GATE: Sidq — all claims true?]
                         │
                   CLIENT APPROVES creative
                         │
               ┌─────────┴────────────────┐
               │                          │
         Landing page             No landing page needed
         needed                          │
               │                          │
         AGENT_12                         │
         (ETHICS GATE:             AGENT_06 launches
         no dark patterns)              │
               │                          │
               └─────────────┬────────────┘
                              │
                        Campaign live
                              │
                     AGENT_06 optimises (weekly)
                              │
                     AGENT_09 reports (weekly)
                              │
                   [ETHICS GATE on reports: Adl]
                   [Honest reporting, wins AND losses]
                              │
                     Client receives report
                     (Hasan reviews first)
```

---

### WF_06: AUTOMATION FLOW

```
Automation requirement identified
(Hasan / AGENT_03 / AGENT_07 / client request)
       │
  AGENT_10 — Requirements brief
       │
  [ETHICS GATE: Amanah — does any step act in Hasan's name
   without his knowledge? Does it contact clients/prospects
   without prior approval?]
       │
    ┌──┴────────────────┐
    │                   │
  FAIL               PASS
    │                   │
  REJECT           Architecture design
  (Hasan notified)  documented in Notion
                         │
                   Build in Make / Zapier
                         │
                   Internal testing
                         │
                   HASAN SIGN-OFF (non-negotiable)
                   [Demo: Loom or live walkthrough]
                   [Hasan must understand: what it does,
                    when it runs, how to override it]
                         │
                    ┌────┴───────────────┐
                    │                    │
                APPROVED             REVISED
                    │                    │
              Live deployment        Implement changes
                    │
              AGENT_08 logs automation runs
                    │
              Monitoring ongoing
```

---

### WF_07: GROWTH FLOW (Monthly / Quarterly)

```
FIRST MONDAY OF MONTH — Growth Flow trigger
       │
       v
┌─────────────┐
│  AGENT_09   │ ← Compiles all performance data
│ THE ANALYST │
└──────┬──────┘
       │
       ├─────────────────────────────────┐
       │                                 │
       v                                 v
┌─────────────┐                  ┌─────────────┐
│  AGENT_15   │ (Phase 3+)       │  AGENT_07   │
│THE FORECASTE│ Revenue model    │  THE ADVISOR│ Client portfolio
└──────┬──────┘ updated          └──────┬──────┘ review
       │                                │
       └──────────────┬─────────────────┘
                      │
              [QUARTERLY ONLY]
                      │
              ┌───────┴──────────┐
              │                  │
        AGENT_13              (Phase 1-2:
        Full ethics            Hasan reviews
        audit of               recent outputs
        all Q outputs          manually)
              │
              └───────┬──────────┘
                      │
              ┌─────────────┐
              │  AGENT_09   │ ← Integrated Growth Review Pack
              └──────┬──────┘
                     │
              [ETHICS GATE: Adl — honest reporting?
               Wins AND losses? No selective metrics?]
                     │
              HASAN STRATEGIC REVIEW SESSION
                     │
              Decisions logged in Notion
                     │
              ┌──────┴───────────────────────────┐
              │                                   │
         Agent adjustments                  Phase activation
         (if any changes needed)            decision (if month
                                            is a phase boundary)
```

---

## SECTION 4: ETHICS GATE POSITIONS — ALL WORKFLOWS

| Workflow | Gate Position | Agent | Pillar Focus | Blocking? |
|---|---|---|---|---|
| WF_01 | Step 1 | AGENT_01 | Adl (sector screen) | YES — prohibited sector = terminate |
| WF_01 | Step 3 | AGENT_01 | All four pillars | YES — EG_REJECTED = archive |
| WF_01 | Step 5 | AGENT_02 | Sidq (outreach honesty) | YES — sequence cannot activate |
| WF_01 | Step 8 | AGENT_03 | Adl (right tier?), Sidq (proposal claims) | YES — proposal cannot issue |
| WF_02 | Step 4 | AGENT_04 | Sidq + Amanah + Adl (report honesty) | YES — report cannot be delivered |
| WF_02 | Step 8 | AGENT_07 | Amanah (Retainers Earned, Not Sold) | YES — upsell flag blocked |
| WF_03 | Step 3 | AGENT_05 | Sidq (all claims verified) | YES — content cannot be published |
| WF_04 | Step 1 | AGENT_07 | Amanah + Retainers Earned | YES — upsell conversation blocked |
| WF_04 | Step 3 | AGENT_03 | Grandfather Principle | YES — proposal blocked if pricing breach |
| WF_04 | Step 4 | AGENT_03 | All four pillars | YES — proposal cannot issue |
| WF_05 | Step 1 | AGENT_11 | Sidq (can campaign run honestly?) | YES — strategy work blocked |
| WF_05 | Step 2 | AGENT_11 | Adl (targeting fair?), Amanah (KPIs realistic?) | YES — brief cannot go to AGENT_06 |
| WF_05 | Step 3 | AGENT_05 | Sidq (no dark patterns, no false claims) | YES — creative cannot be used |
| WF_05 | Step 4 | AGENT_12 | Sidq (no dark patterns on page) | YES — page cannot go live |
| WF_05 | Step 7 | AGENT_09 | Adl (honest reporting) | YES — report cannot reach client |
| WF_06 | Step 1 | AGENT_10 | Amanah (no unsanctioned automation) | YES — build blocked |
| WF_07 | Step 5 | AGENT_09 | Adl (honest reporting in growth pack) | YES — pack blocked |

**Total Ethics Gate Checkpoints across all workflows: 17**
**Auto-reject (no evaluation needed): Prohibited sector leads, countdown-reset timers, unattributed testimonials, unsourced revenue claims**

---

## SECTION 5: DATA FORMAT STANDARDS

### Universal CRM Update Event (Any Agent → AGENT_08)
```json
{
  "event_id": "UUID",
  "timestamp": "ISO8601",
  "source_agent": "AGENT_XX",
  "record_type": "lead | deal | client | activity | campaign | content",
  "record_id": "string",
  "update_type": "CREATE | UPDATE | STATUS_CHANGE | CLOSE | ARCHIVE",
  "update_data": {},
  "notes": "string"
}
```

### Ethics Gate Request (Any Agent → AGENT_13)
```json
{
  "request_id": "UUID",
  "timestamp": "ISO8601",
  "requesting_agent": "AGENT_XX",
  "workflow_id": "WF_0X",
  "step_number": "integer",
  "output_type": "lead | outreach | proposal | report | content | ad | landing_page | upsell | automation | strategy",
  "output_content": "string or object",
  "specific_concerns": "string (optional — requesting agent flags specific concerns)",
  "urgency": "ROUTINE | URGENT"
}
```

---

*Numu Engine Routing Map v1.0.0 — Confidential. Numu Consulting. Founder: Hasan Sarwar.*
