import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

// ─── Mobile breakpoint hook ───────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler, { passive: true });
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

// ─── Project Data ─────────────────────────────────────────────────
const PROJECTS = {
  "heart-failure-care-companion": {
    title: "Heart Failure Care Companion",
    description:
      "Enrolled patient companion inside MyBSWHealth for newly diagnosed heart failure patients. Daily weight and blood pressure tracking with clinical alert thresholds, symptom triage, and a plain-language education library.",
    tags: ["ui/ux research", "design system", "mobile design", "web design", "responsive design", "native ios design"],
    hero: { type: "video", src: "/assets/hf-track-weight.mp4" },
    heroLabel: "React App · Prototype built with Claude Code",
    titleIcon: "/assets/heart-Illustration.png",
    illustration: "/assets/ni-exclamation-diamond.svg",
    sections: [
      {
        label: "The Problem",
        body: `Heart failure patients were going home with a diagnosis they didn't understand. They knew they had a condition. They didn't know what to do with it.\n\nThe gap wasn't clinical — it was informational. No feedback loop between the patient and their care team. No way for a patient to know whether what they were feeling was normal or a warning sign. No way for the care team to know someone was deteriorating until they showed up in the ER.\n\nReadmission rates reflected exactly that. The system was expensive. The experience for patients was worse.\n\nThe ask: build something enrolled patients could use every day — not just when things went wrong.`,
      },
    ],
    results: {
      label: "The Results",
      body: `80% daily engagement during the pilot period. Zero readmissions in 90 days. Approved for statewide rollout across Texas.\n\nThe engagement number is the one that matters most to me. Engagement in a health app — especially a daily check-in — is hard to sustain. Patients have a lot going on. When 80% of them are coming back every day, that's not an accident. That's a product that fits into the actual moments of their life and earns the return.`,
      stats: [
        { value: "80%", label: "Daily Engagement", sublabel: "(during pilot period)" },
        { value: "0", label: "Readmissions", sublabel: "(during pilot period)" },
      ],
    },
    whatILearned: {
      label: "What I Learned",
      image: "/assets/wireframe-image.png",
      body: `The hardest constraint on this project wasn't technical — it was language. Every screen touched something clinical, and clinical language is precise by design. But precision for a care team and precision for a patient are two different things. "Your blood pressure is severely elevated" lands differently than "171/101." Both are on the same screen. Getting that balance right — accurate enough to be trusted, plain enough to be understood — took more iteration than the interaction design.\n\nThe other thing: a product like this lives or dies on the moments between features. The weight tracker connects to the symptom checker connects to the cardiologist call connects to the education video. A patient who logs a high reading, then does a self-check, then calls their cardiologist's number from the dashboard — that chain isn't accidental. It's the design. The individual screens weren't the product. The sequence was.`,
    },
    medSupport: {
      label: "Medication and financial support",
      body: `Heart failure medications are expensive. A lot of patients don't fill them. I designed a Medication Assistance flow that lets patients review their current prescriptions, select which ones they need help affording, submit a request, and get a confirmation — including a branded email from the BSW Medication Assistance Team with next steps.\n\nEmpty state, error state, and the confirmation email were all scoped and designed. The flow closes a gap that no amount of clinical design addresses: patients who leave the hospital with a prescription they can't pay for.`,
      image: "/assets/med-support-image.png",
    },
    solution: {
      intro: `Five distinct problems needed to work together. They also needed to work for patients who weren't technical, who were managing a serious diagnosis, and who needed the product to feel like support — not a clinical obligation.`,
      slides: [
        {
          image: "/assets/learn-image.png",
          heading: "A dashboard that oriented, not overwhelmed",
          body: `The entry point had to surface everything at once without burying anything. The dashboard landed on four sections: learn about your condition, your next appointment, check in on your wellness, and track your health. That order wasn't arbitrary — it mirrors how a patient actually thinks about their day. Education first, then what's coming up, then the daily check-in.`,
        },
        {
          image: "/assets/appointment-image.png",
          heading: "Appointment awareness without anxiety",
          body: `Upcoming appointments were surfaced directly in the dashboard so patients never had to hunt for what was next. Context about who they were seeing and what to prepare reduced pre-visit uncertainty and helped patients show up ready — not reactive.`,
        },
        {
          image: "/assets/track-image.png",
          heading: "Daily check-ins that actually stuck",
          body: `Weight and blood pressure logging needed to feel effortless or it wouldn't happen. The check-in flow was reduced to the minimum necessary input with immediate feedback — confirmation, trend context, and a clear flag when a reading crossed a clinical threshold worth acting on.`,
        },
        {
          image: "/assets/trend-image.png",
          heading: "Trends patients could actually read",
          body: `Raw numbers mean nothing without context. Trend charts were designed for patients, not clinicians — plain-language annotations, color-coded thresholds, and a time range that matched how patients actually think about their health over days and weeks, not quarters.`,
        },
        {
          image: "/assets/symptom-check-image-v2.png",
          heading: "Symptom triage that guided, not alarmed",
          body: `Patients needed a way to report how they were feeling without being sent into a panic. The symptom checker walked through a structured set of questions and responded with a clear, plain-language recommendation — whether that was rest, a call to the care team, or urgent action.`,
        },
      ],
    },
  },
  "digital-medicine-cabinet": {
    title: "Digital Medicine Cabinet",
    description:
      "Medication management flow for a patient mobile app. Surfaced prescription status, side effects, and pharmacy information in a single view — with guided remove and restore flows to reduce medication errors.",
    tags: ["ui/ux research", "design system", "mobile design", "web design", "responsive design", "native ios design"],
    hero: { type: "video", src: "/assets/manage-medications.mp4" },
    heroLabel: "React App · Prototype built with Claude Code",
    illustration: "/assets/ni-exclamation-diamond.svg",
    sections: [
      {
        label: "The Problem",
        body: `Patients managing multiple prescriptions had no single place to see what they were taking, why they were taking it, or what to do when something changed.\n\nPharmacy information lived in one place. Side effect details lived somewhere else. Prescription status required a phone call. The result was confusion, missed doses, and medication errors that were entirely preventable.\n\nThe ask: consolidate everything into one clear, actionable view — and make it easy to remove or restore medications without losing context.`,
      },
    ],
    whatIWasSolvingFor: {
      label: "What I Was Solving For",
      image: "/assets/perscription-image.png",
      body: `We ran interviews with patients managing three or more active prescriptions. The pattern was consistent: most of them kept a handwritten list, a notes app, or a pill organizer to supplement what the portal gave them. The portal itself was almost never the source of truth.\n\nThe reasons were straightforward once we dug in. Patients couldn't see all their medications in one place. Status changes — a prescription being filled, expired, or discontinued — weren't surfaced clearly. And when something needed to change, there was no guided flow. Patients either called the pharmacy, called their provider, or guessed.\n\nThe handoff between prescriber, pharmacy, and patient was happening entirely outside the product. We had to bring it in.`,
    },
    whatIDesigned: {
      label: "What I Designed",
      body: `Four distinct flows needed to work together without creating a complicated interface. The cabinet view, the prescription detail, the remove flow, and the restore flow each had a different job — but a patient touching one would eventually touch all of them.\n\nThe design goal was to make each flow feel like a single, continuous action, not four separate features stapled together.`,
      slides: [
        {
          image: "/assets/add-med-history-image.png",
          heading: "The medicine cabinet — everything in one view",
          body: `The cabinet surfaced every active prescription in a single scrollable list, grouped by condition. Status was visible at a glance — active, pending refill, or requiring attention — so patients didn't have to open each entry to know what needed action. The view replaced the handwritten list.`,
        },
        {
          image: "/assets/side-effects-image.png",
          heading: "Prescription detail — context behind the medication",
          body: `Each prescription opened into a detail view that answered the questions patients were actually asking: what is this for, what are the side effects, when does it need to be refilled, and which pharmacy has it. All of it in one place, in plain language, without a phone call.`,
        },
        {
          image: "/assets/med-request-refill-image.png",
          heading: "Refill request — one step from the detail view",
          body: `Requesting a refill was surfaced directly inside the prescription detail — no navigation to a separate screen, no re-entering pharmacy information. Patients could see when a refill was due, confirm the pharmacy on file, and submit the request in a single flow. The design reduced the window between a patient running low and them actually doing something about it.`,
        },
        {
          image: "/assets/manage-pharm-image.png",
          heading: "Manage pharmacies — know where to go",
          body: `Pharmacy information lived inside the medication detail, not buried in a settings screen. Patients could see which pharmacy had each prescription, view hours and location, and set a preferred pharmacy — all without leaving the context of the medication they were looking at. The goal was to remove the phone call, not just document the number.`,
        },
      ],
    },
    whatILearned: {
      label: "What I Learned",
      image: "/assets/med-flow-image.png",
      body: `The insight that changed the design was realizing that medication management is not a single moment — it's a relationship over time. Patients aren't just managing what they're taking right now. They're tracking what they stopped, what they're about to run out of, and what they're waiting on.\n\nThe original scope treated it as a list problem. The research made clear it was a continuity problem. A patient who stopped a medication three months ago still needs to know it exists, why it was stopped, and whether it might be relevant again. Designing for that history — not just the current state — is what made the remove and restore flows worth building.`,
    },
  },
  "lab-insights": {
    title: "Lab Insights",
    description:
      "Lab results mobile app. Raw numbers became plain-language explanations with trend visualization and clear risk hierarchy.",
    titleIcon: "/assets/li-icon.svg",
    tags: ["ui/ux research", "design system", "mobile design", "web design", "responsive design", "native ios design"],
    hero: { type: "video", src: "/assets/health-insights.mp4" },
    heroLabel: "React App · Prototype built with Claude Code",
    illustration: "/assets/ni-exclamation-diamond.svg",
    sections: [
      {
        label: "The Problem",
        body: `Patients were receiving lab results they couldn't interpret. A number on a page with no context doesn't tell you if you should be worried.\n\nWithout plain-language explanations, trend context, or clear risk signals, patients either ignored results or anxiously called their provider for clarification — adding load to the care team and leaving patients in the dark in the meantime.\n\nThe ask: transform raw lab data into something a patient can actually understand and act on.`,
      },
    ],
    whatIWasSolvingFor: {
      label: "What I Was Solving For",
      image: "/assets/epic-screen-image.png",
      body: `I partnered with a researcher to run interviews with 16 patients — ranging in age from 22 to 78, across different health literacy levels and chronic condition statuses. We also shadowed patients using the existing portal, and talked to physicians, nurses, and lab specialists about what questions they fielded most.\n\nA few things came back consistently. Patients couldn't tell which results needed attention and which were fine. They didn't have a way to see if something was getting better or worse over time. The test names meant nothing to them. And there was no sense of who ordered the results or what, if anything, they were expected to do next.\n\nIn other words: the portal answered "what are your numbers" but not "what do your numbers mean." Those are different questions, and only one of them is actually useful to a patient sitting at home.`,
    },
    whatIDesigned: {
      label: "What I Designed",
      body: `Five surfaces needed to work together: a plain-language description for each test, a risk indicator that told patients whether to worry, a trend chart showing how results had changed over time, a results card that surfaced context without burying the numbers, and a doctor notes section that gave clinical commentary in language patients could read.\n\nEach one answered a specific question from research. The description answered "what is this test." The risk indicator answered "should I be worried." The trend chart answered "is this getting better or worse." The doctor notes answered "what does my provider think I should do." None of them existed in the original portal.`,
      slides: [
        { image: "/assets/lab-description-image.png", heading: "Plain-language test descriptions", body: `Every lab result now opens with a plain-language explanation of what the test measures and why it matters — written for a patient, not a clinician. No more Googling "what is a lipid panel."` },
        { image: "/assets/lab-Insights-image.png", heading: "AI summary that connects the dots", body: `Individual lab values are one thing. What patients actually needed was someone to tell them what it all meant together. The AI summary looked across the full panel — cholesterol, triglycerides, HDL, LDL — and explained the combined picture in plain language: what's elevated, why it matters, and what their doctor might want to discuss next. It didn't replace clinical judgment. It closed the gap between receiving results and understanding them.` },
        { image: "/assets/trend-chart-image.png", heading: "Trend charts designed for patients", body: `Patients could now see how a result had changed across their last several visits — with annotations marking significant changes and a time range that matched how they actually think about their health.` },
        { image: "/assets/results-card-image.png", heading: "Results cards with at-a-glance trending", body: `The results card was redesigned to lead with meaning, not numbers. At the top of each card, a small trend metric shows how the value has moved since the last lab — so patients can see at a glance whether things are improving or heading in the wrong direction, without digging into charts. Below that, the reference range, risk level, and a one-line plain-language interpretation give the full picture.` },
        { image: "/assets/doctor-notes-image.png", heading: "Doctor notes in readable language", body: `Clinical commentary from the ordering provider was surfaced directly in the result — translated out of medical shorthand and presented as a clear next step or observation the patient could act on.` },
      ],
    },
    whatILearned: {
      label: "What I Learned",
      image: "/assets/li-wireframe-image.png",
      body: `The research finding that stuck with me was how often patients were going to Google to interpret their results. Not because the portal failed to surface the information — it didn't — but because the portal treated the information as the endpoint. Here are your numbers, you're done.\n\nThe redesign treated the information as the starting point. Here are your numbers, here's what they mean, here's who ordered them, here's how they've changed, here's what you can do.\n\nThat reframe — from data delivery to data comprehension — is what the whole thing was built around. It also meant that every copy decision was a design decision. "Your lipid panel is outside the normal range" and "Your LDL cholesterol is slightly elevated" are the same clinical fact. One of them a patient can act on. Getting that right took more passes than anything else on the project.`,
    },
    results: {
      label: "The Results",
      body: `Patients who used the redesigned portal were 3x more likely to say they understood their results without calling their provider. Provider call volume for lab questions dropped 40% in the pilot cohort.\n\nThe metric that mattered most wasn't the call reduction — it was the comprehension score. When patients feel like they understand what's happening in their own body, they make better decisions. That's the outcome the whole design was built toward.`,
      stats: [
        { value: "3x", label: "Comprehension Rate", sublabel: "(vs. original portal)" },
        { value: "40%", label: "Drop in Call Volume", sublabel: "(lab-related calls)" },
      ],
    },
  },
  "medication-tracking": {
    title: "Medication Tracking",
    description:
      "Medication adherence tracking inside a patient mobile app. Simplified complex regimens into daily check-ins with reminders, streak tracking, and care team visibility.",
    tags: ["ui/ux research", "design system", "mobile design", "web design", "responsive design", "native ios design"],
    hero: { type: "image", src: "/assets/med-tracking-cover.png" },
    illustration: "/assets/ni-exclamation-diamond.svg",
    sections: [
      {
        label: "The Problem",
        body: `Adherence tracking for complex medication regimens was nearly impossible for patients to maintain. Multiple medications, varying schedules, and no feedback loop meant patients fell off track without anyone knowing.\n\nProviders had no visibility into whether patients were taking their medications as prescribed between appointments. By the time a missed medication showed up clinically, weeks had already passed.\n\nThe ask: design a daily check-in experience simple enough to actually use — with reminders, streak tracking, and care team visibility built in from the start.`,
      },
    ],
    whatIWasSolvingFor: {
      label: "What I Was Solving For",
      image: "/assets/med-track-problem-image.png",
      body: `We interviewed patients managing chronic conditions who were on three or more daily medications. The recurring theme wasn't forgetfulness — it was friction. Patients knew they were supposed to take their medications. The problem was that every system designed to help them felt like one more thing to manage.\n\nMost patients tracked adherence in whatever app was already on their phone — notes, calendar reminders, even text messages to themselves. Nothing was designed for the actual complexity of a multi-drug regimen with different timings, food requirements, and refill schedules.\n\nCare teams, meanwhile, were working blind. Between appointments, there was no signal. A patient who had stopped a medication two weeks ago looked identical to one who hadn't. The design needed to close that gap — not just for patients, but for the people treating them.`,
    },
    whatIDesigned: {
      label: "What I Designed",
      body: `The design centered on three principles: make the daily check-in take under 30 seconds, surface meaningful progress without making patients feel judged, and give care teams the signal they actually needed — not raw data, but actionable insight.\n\nFour surfaces carried the experience: the daily check-in, the schedule view, streak tracking, and the care team dashboard.`,
      slides: [
        {
          image: "/assets/entry-point-track-image.png",
          heading: "Entry point — starting the tracking experience",
          body: `The entry point introduced medication tracking without overwhelming patients upfront. The focus was on a single clear action — getting started — with enough context to make the value immediately obvious. Patients needed to understand what they were signing up for before committing to a daily habit.`,
        },
        {
          image: "/assets/benefits-track-meds-image.png",
          heading: "Benefits — why tracking matters",
          body: `Before asking patients to build a new habit, the design showed them what they'd get out of it. Surfacing the benefits early — better care team communication, fewer missed doses, a clearer picture of their own regimen — gave patients a reason to opt in rather than a reason to skip past the setup.`,
        },
        {
          image: "/assets/set-reminder-image.png",
          heading: "Set a reminder — building the habit",
          body: `Reminders were the mechanism that made daily check-ins sustainable. Rather than a generic notification setting, patients could set reminders tied to specific medications and times of day. The setup was part of onboarding so the habit infrastructure was in place before the first check-in.`,
        },
        {
          image: "/assets/take-med-reminder-image.png",
          heading: "Take medication reminder — the daily moment",
          body: `The reminder notification was designed to do one thing: get patients into the check-in with a single tap. No friction, no login wall, no navigation. The notification surfaced just enough context — which medications, what time — to make acting on it feel immediate rather than effortful.`,
        },
        {
          image: "/assets/skip-meds-image.png",
          heading: "Skip medications — intentional, not forgotten",
          body: `Skipping a medication needed to feel different from missing one. The skip flow let patients log a reason — side effects, out of stock, doctor's instruction — so the record stayed accurate and the care team had context. A skipped dose with a reason attached is clinical signal. A skipped dose with no record is just a gap.`,
        },
      ],
    },
    whatILearned: {
      label: "What I Learned",
      image: "/assets/med-track-flow-image.png",
      body: `The streak feature taught me more about motivation design than anything else on the project. Early prototypes punished missed days by resetting the counter to zero. Testing made clear that was the wrong frame entirely. Patients who saw a streak break would disengage — not because they stopped caring, but because the product had just told them they'd failed.\n\nShifting to a model that preserved the overall adherence rate and only reset the current streak — while keeping the full history visible — changed how patients related to the data. They weren't protecting a number. They were building a record. That's a fundamentally different relationship with the product, and it showed in how long patients stayed engaged during the pilot.\n\nThe other thing: care team visibility only works if clinicians trust the data. Early versions showed everything. What we learned is that more data isn't more useful — the right signal at the right moment is. Getting that filter right was as much a design problem as a clinical one.`,
    },
    results: {
      label: "The Results",
      body: `Adherence rates increased 28% in the pilot cohort compared to the control group using standard pharmacy reminders. Care teams reported spending significantly less time in appointments establishing baseline medication history.\n\nThe metric that surprised us most was appointment efficiency. When providers could see adherence data before a visit, the first five minutes of every appointment changed. Instead of asking "have you been taking your medications," they could ask "I see you missed your morning dose a few times last week — what was going on?" That's a different conversation, and it leads to better care.`,
      stats: [
        { value: "28%", label: "Adherence Increase", sublabel: "(vs. control group)" },
        { value: "5min", label: "Saved Per Appointment", sublabel: "(care team efficiency)" },
      ],
    },
  },
};

export function titleToSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// ─── Font styles (shared) ─────────────────────────────────────────
const FONT_STYLES = `
  @font-face { font-family: 'JetBrains Mono'; src: url('/fonts/JetBrainsMono-Thin.ttf') format('truetype'); font-weight: 100; font-style: normal; }
  @font-face { font-family: 'JetBrains Mono'; src: url('/fonts/JetBrainsMono-ExtraLight.ttf') format('truetype'); font-weight: 200; font-style: normal; }
  @font-face { font-family: 'JetBrains Mono'; src: url('/fonts/JetBrainsMono-Light.ttf') format('truetype'); font-weight: 300; font-style: normal; }
  @font-face { font-family: 'JetBrains Mono'; src: url('/fonts/JetBrainsMono-Regular.ttf') format('truetype'); font-weight: 400; font-style: normal; }
  @font-face { font-family: 'JetBrains Mono'; src: url('/fonts/JetBrainsMono-Medium.ttf') format('truetype'); font-weight: 500; font-style: normal; }
  @font-face { font-family: 'JetBrains Mono'; src: url('/fonts/JetBrainsMono-SemiBold.ttf') format('truetype'); font-weight: 600; font-style: normal; }
  @font-face { font-family: 'JetBrains Mono'; src: url('/fonts/JetBrainsMono-Bold.ttf') format('truetype'); font-weight: 700; font-style: normal; }
  @font-face { font-family: 'JetBrains Mono'; src: url('/fonts/JetBrainsMono-ExtraBold.ttf') format('truetype'); font-weight: 800; font-style: normal; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  .back-btn:hover { color: #CF6038 !important; }
  .back-btn:hover path { stroke: #CF6038; }
  .back-btn path { transition: stroke 0.25s ease; }
  .back-btn { transition: color 0.25s ease; }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-18px); }
  }

  .carousel-dot {
    transition: background 0.25s ease, transform 0.2s ease;
    cursor: pointer;
    border: none;
    padding: 0;
  }
  .carousel-dot:hover { transform: scale(1.3); }

  .carousel-slide {
    position: absolute;
    inset: 0;
    transition: opacity 0.5s ease;
  }
`;

// ─── Product Detail Page ──────────────────────────────────────────
export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const timerRef = useRef(null);
  const [designIdx, setDesignIdx] = useState(0);
  const [designPaused, setDesignPaused] = useState(false);
  const designTimerRef = useRef(null);
  const project = PROJECTS[slug];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  // Auto-rotate solution carousel
  useEffect(() => {
    if (!project?.solution || carouselPaused) {
      clearInterval(timerRef.current);
      return;
    }
    const count = project.solution.slides.length;
    timerRef.current = setInterval(() => {
      setCarouselIdx((prev) => (prev + 1) % count);
    }, 3500);
    return () => clearInterval(timerRef.current);
  }, [project, carouselPaused]);

  // Auto-rotate "What I Designed" carousel
  useEffect(() => {
    if (!project?.whatIDesigned || designPaused) {
      clearInterval(designTimerRef.current);
      return;
    }
    const count = project.whatIDesigned.slides.length;
    designTimerRef.current = setInterval(() => {
      setDesignIdx((prev) => (prev + 1) % count);
    }, 3500);
    return () => clearInterval(designTimerRef.current);
  }, [project, designPaused]);

  if (!project) {
    return (
      <div style={{ background: "#1A1B1E", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#fff", fontFamily: "monospace" }}>Project not found.</p>
      </div>
    );
  }

  const solution = project.solution;
  const activeSlide = solution ? solution.slides[carouselIdx] : null;

  return (
    <div style={{
      background: "#1A1B1E",
      minHeight: "100vh",
      fontFamily: "'JetBrains Mono', monospace",
      color: "#FFFFFF",
    }}>
      <style>{FONT_STYLES}</style>

      {/* ─── NAV ─────────────────────────────────────────────── */}
      <div style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "#1A1B1E",
        borderBottom: scrolled ? "1px solid #111" : "1px solid transparent",
        transition: "border-color 0.2s ease",
      }}>
        <nav style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: scrolled ? (isMobile ? "10px 20px" : "10px 48px") : (isMobile ? "16px 20px" : "22px 48px"),
          maxWidth: 1460,
          margin: "0 auto",
          transition: "padding 0.3s ease",
        }}>
          <button
            className="back-btn"
            onClick={() => navigate("/")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: 20,
              color: "#FFFFFF",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L11 6M5 12L11 18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Brad Carter
          </button>
        </nav>
      </div>

      {/* ─── CONTENT ─────────────────────────────────────────── */}
      <div style={{ maxWidth: 1460, margin: "0 auto", padding: isMobile ? "40px 20px 60px" : "72px 48px 80px" }}>

        {/* Title block */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: isMobile ? 22 : 32,
            fontWeight: 600,
            color: "#FFFFFF",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}>
            {project.titleIcon && (
              <img
                src={project.titleIcon}
                alt=""
                style={{ width: 48, height: 48, objectFit: "contain", flexShrink: 0 }}
              />
            )}
            {project.title}
          </h1>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 16,
            fontWeight: 400,
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.5,
            maxWidth: 760,
          }}>
            {project.description}
          </p>
        </div>

        {/* Tags */}
        {project.tags && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 40 }}>
            {project.tags.map((tag, i) => (
              <span key={i} style={{
                background: "#333",
                color: "#ccc",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 600,
                padding: "6px 8px",
                borderRadius: 15,
                whiteSpace: "nowrap",
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* ─── Hero video or image ─────────────────────────── */}
        <div style={{
          background: "#111",
          borderRadius: 20,
          overflow: "hidden",
          width: "100%",
          marginBottom: project.heroLabel ? 12 : 80,
        }}>
          {project.hero.type === "video" ? (
            <video
              src={project.hero.src}
              autoPlay
              loop
              muted
              playsInline
              controls
              style={{ width: "100%", display: "block" }}
            />
          ) : (
            <img
              src={project.hero.src}
              alt={project.title}
              style={{ width: "100%", display: "block" }}
            />
          )}
        </div>

        {/* Hero label */}
        {project.heroLabel && (
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 16,
            fontWeight: 400,
            fontStyle: "italic",
            color: "rgba(255,255,255,0.45)",
            marginBottom: 80,
          }}>
            {project.heroLabel}
          </p>
        )}

        {/* ─── Sections (e.g. The Problem) ─────────────────── */}
        {project.sections.map((section, i) => (
          <div key={i} style={{ marginBottom: 72, display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "flex-start", gap: isMobile ? 24 : 48 }}>

            {/* Left: label + body */}
            <div style={{ flex: 1, maxWidth: 760 }}>
              <div style={{ marginBottom: 24 }}>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 20,
                  fontWeight: 500,
                  color: "#FFFFFF",
                  marginBottom: 10,
                }}>
                  {section.label}
                </p>
                <div style={{ width: 40, height: 6, background: "#CF6038", borderRadius: 3 }} />
              </div>
              <div>
                {section.body.split("\n\n").map((para, j) => (
                  <p key={j} style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 16,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.75)",
                    lineHeight: 1.5,
                    marginBottom: j < section.body.split("\n\n").length - 1 ? 20 : 0,
                  }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Right: floating illustration */}
            {project.illustration && !isMobile && (
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* Circle stays static */}
                <div style={{
                  width: 348,
                  height: 348,
                  borderRadius: "50%",
                  background: "#222",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {/* Only the illustration floats */}
                  <img
                    src={project.illustration}
                    alt="illustration"
                    style={{ width: 225, height: 225, objectFit: "contain", animation: "float 4s ease-in-out infinite" }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ─── WHAT I WAS SOLVING FOR ──────────────────────────── */}
      {project.whatIWasSolvingFor && (
        <div style={{ background: "#222", width: "100%" }}>
          <div style={{ maxWidth: 1460, margin: "0 auto", padding: isMobile ? "60px 20px" : "148px 48px" }}>
            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? 32 : 64 }}>

              {/* Left: image in rounded card */}
              <div style={{ flexShrink: isMobile ? undefined : 0, width: isMobile ? "100%" : 620, background: "#f1f1f1", borderRadius: 20, overflow: "hidden" }}>
                <img src={project.whatIWasSolvingFor.image} alt="Epic screen" style={{ width: "100%", display: "block" }} />
              </div>

              {/* Right: label + body */}
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 500, color: "#FFFFFF", marginBottom: 10 }}>
                    {project.whatIWasSolvingFor.label}
                  </p>
                  <div style={{ width: 40, height: 6, background: "#CF6038", borderRadius: 3 }} />
                </div>
                {project.whatIWasSolvingFor.body.split("\n\n").map((para, i, arr) => (
                  <p key={i} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 400, color: "rgba(255,255,255,0.75)", lineHeight: 1.5, marginBottom: i < arr.length - 1 ? 20 : 0 }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── WHAT I DESIGNED ─────────────────────────────────── */}
      {project.whatIDesigned && (() => {
        const activeDesignSlide = project.whatIDesigned.slides[designIdx];
        return (
          <div style={{ maxWidth: 1460, margin: "0 auto", padding: isMobile ? "60px 20px" : "148px 48px" }}>
            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? 32 : 64 }}>

              {/* Left: label + body */}
              <div style={{ flex: 1, minHeight: 280 }}>
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 500, color: "#FFFFFF", marginBottom: 10 }}>
                    {activeDesignSlide.heading}
                  </p>
                  <div style={{ width: 40, height: 6, background: "#CF6038", borderRadius: 3 }} />
                </div>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 400, color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
                  {activeDesignSlide.body}
                </p>
              </div>

              {/* Right: carousel */}
              <div style={{ flexShrink: isMobile ? undefined : 0, width: isMobile ? "100%" : 620 }}>
                <div style={{ background: "#f1f1f1", borderRadius: 20, overflow: "hidden", position: "relative", width: "100%", aspectRatio: "4/3" }}>
                  {project.whatIDesigned.slides.map((slide, i) => (
                    <img key={i} src={slide.image} alt={slide.heading} className="carousel-slide"
                      style={{ width: "100%", height: "100%", objectFit: "cover", opacity: i === designIdx ? 1 : 0, pointerEvents: i === designIdx ? "auto" : "none" }}
                    />
                  ))}
                  {/* Dots + pause */}
                  <div style={{ position: "absolute", bottom: 20, left: 0, right: 0, display: "flex", gap: 10, justifyContent: "center", alignItems: "center" }}>
                    {project.whatIDesigned.slides.map((_, i) => (
                      <button key={i} className="carousel-dot" onClick={() => setDesignIdx(i)}
                        style={{ width: 10, height: 10, borderRadius: "50%", background: i === designIdx ? "#CF6038" : "rgba(0,0,0,0.25)" }}
                      />
                    ))}
                    <button onClick={() => setDesignPaused(p => !p)} className="carousel-dot" title={designPaused ? "Resume" : "Pause"}
                      style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(0,0,0,0.18)", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 4 }}>
                      {designPaused ? (
                        <svg width="8" height="9" viewBox="0 0 8 9" fill="none"><path d="M1.5 1.5L6.5 4.5L1.5 7.5V1.5Z" fill="rgba(0,0,0,0.55)" /></svg>
                      ) : (
                        <svg width="8" height="9" viewBox="0 0 8 9" fill="none"><rect x="1" y="1.5" width="2" height="6" rx="0.5" fill="rgba(0,0,0,0.55)" /><rect x="5" y="1.5" width="2" height="6" rx="0.5" fill="rgba(0,0,0,0.55)" /></svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ─── THE SOLUTION ────────────────────────────────────── */}
      {solution && (
        <div style={{ background: "#222", width: "100%" }}>
          <div style={{ maxWidth: 1460, margin: "0 auto", padding: isMobile ? "60px 20px" : "148px 48px" }}>

            {/* Label */}
            <div style={{ marginBottom: 32 }}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 20,
                fontWeight: 500,
                color: "#FFFFFF",
                marginBottom: 10,
              }}>
                The Solution
              </p>
              <div style={{ width: 40, height: 6, background: "#CF6038", borderRadius: 3 }} />
            </div>

            {/* Intro paragraph */}
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 16,
              fontWeight: 400,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.5,
              maxWidth: "100%",
              marginBottom: 56,
            }}>
              {solution.intro}
            </p>

            {/* Two-column: carousel left, text right */}
            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? 32 : 64 }}>

              {/* Left: carousel card */}
              <div style={{ flexShrink: isMobile ? undefined : 0, width: isMobile ? "100%" : 620 }}>
                {/* Image area with dots inside */}
                <div style={{
                  background: "#f1f1f1",
                  borderRadius: 20,
                  overflow: "hidden",
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4/3",
                }}>
                  {solution.slides.map((slide, i) => (
                    <img
                      key={i}
                      src={slide.image}
                      alt={slide.heading}
                      className="carousel-slide"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: i === carouselIdx ? 1 : 0,
                        pointerEvents: i === carouselIdx ? "auto" : "none",
                      }}
                    />
                  ))}

                  {/* Dots + pause/play — pinned to bottom center inside the card */}
                  <div style={{
                    position: "absolute",
                    bottom: 20,
                    left: 0,
                    right: 0,
                    display: "flex",
                    gap: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                    {solution.slides.map((_, i) => (
                      <button
                        key={i}
                        className="carousel-dot"
                        onClick={() => setCarouselIdx(i)}
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: i === carouselIdx ? "#CF6038" : "rgba(0,0,0,0.25)",
                        }}
                      />
                    ))}

                    {/* Pause / Play button */}
                    <button
                      onClick={() => setCarouselPaused((p) => !p)}
                      className="carousel-dot"
                      title={carouselPaused ? "Resume" : "Pause"}
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: "rgba(0,0,0,0.18)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: 4,
                      }}
                    >
                      {carouselPaused ? (
                        /* Play triangle */
                        <svg width="8" height="9" viewBox="0 0 8 9" fill="none">
                          <path d="M1.5 1.5L6.5 4.5L1.5 7.5V1.5Z" fill="rgba(0,0,0,0.55)" />
                        </svg>
                      ) : (
                        /* Pause bars */
                        <svg width="8" height="9" viewBox="0 0 8 9" fill="none">
                          <rect x="1" y="1.5" width="2" height="6" rx="0.5" fill="rgba(0,0,0,0.55)" />
                          <rect x="5" y="1.5" width="2" height="6" rx="0.5" fill="rgba(0,0,0,0.55)" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: sub-heading + body — transitions with carousel */}
              <div style={{ flex: 1, minHeight: 280 }}>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 20,
                  fontWeight: 500,
                  color: "#FFFFFF",
                  marginBottom: 20,
                  lineHeight: 1.4,
                  transition: "opacity 0.4s ease",
                }}>
                  {activeSlide.heading}
                </p>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 16,
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.5,
                  transition: "opacity 0.4s ease",
                }}>
                  {activeSlide.body}
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ─── MEDICATION & FINANCIAL SUPPORT ─────────────────── */}
      {project.medSupport && (
        <div style={{ maxWidth: 1460, margin: "0 auto", padding: isMobile ? "60px 20px" : "148px 48px" }}>
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? 32 : 64 }}>

            {/* Left: label + body */}
            <div style={{ flex: 1, maxWidth: 760 }}>
              <div style={{ marginBottom: 24 }}>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 20,
                  fontWeight: 500,
                  color: "#FFFFFF",
                  marginBottom: 10,
                }}>
                  {project.medSupport.label}
                </p>
                <div style={{ width: 40, height: 6, background: "#CF6038", borderRadius: 3 }} />
              </div>
              {project.medSupport.body.split("\n\n").map((para, i) => (
                <p key={i} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 16,
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.5,
                  marginBottom: i < project.medSupport.body.split("\n\n").length - 1 ? 20 : 0,
                }}>
                  {para}
                </p>
              ))}
            </div>

            {/* Right: image */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src={project.medSupport.image}
                alt="Medication and financial support"
                style={{ width: "100%", maxWidth: 560, display: "block" }}
              />
            </div>

          </div>
        </div>
      )}

      {/* ─── WHAT I LEARNED ──────────────────────────────────── */}
      {project.whatILearned && (
        <div style={{ background: "#222", width: "100%" }}>
          <div style={{ maxWidth: 1460, margin: "0 auto", padding: isMobile ? "60px 20px" : "148px 48px" }}>
            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? 32 : 64 }}>

              {/* Left: wireframe image in rounded card */}
              <div style={{
                flexShrink: isMobile ? undefined : 0,
                width: isMobile ? "100%" : 620,
                background: "#f1f1f1",
                borderRadius: 20,
                overflow: "hidden",
              }}>
                <img
                  src={project.whatILearned.image}
                  alt="Wireframe"
                  style={{ width: "100%", display: "block" }}
                />
              </div>

              {/* Right: label + body */}
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: 24 }}>
                  <p style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 20,
                    fontWeight: 500,
                    color: "#FFFFFF",
                    marginBottom: 10,
                  }}>
                    {project.whatILearned.label}
                  </p>
                  <div style={{ width: 40, height: 6, background: "#CF6038", borderRadius: 3 }} />
                </div>
                {project.whatILearned.body.split("\n\n").map((para, i) => (
                  <p key={i} style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 16,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.75)",
                    lineHeight: 1.5,
                    marginBottom: i < project.whatILearned.body.split("\n\n").length - 1 ? 20 : 0,
                  }}>
                    {para}
                  </p>
                ))}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ─── THE RESULTS ─────────────────────────────────────── */}
      {project.results && (
        <div style={{ maxWidth: 1460, margin: "0 auto", padding: isMobile ? "60px 20px" : "148px 48px" }}>
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? 32 : 64 }}>

            {/* Left: label + body */}
            <div style={{ flex: 1, maxWidth: 760 }}>
              <div style={{ marginBottom: 24 }}>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 20,
                  fontWeight: 500,
                  color: "#FFFFFF",
                  marginBottom: 10,
                }}>
                  {project.results.label}
                </p>
                <div style={{ width: 40, height: 6, background: "#CF6038", borderRadius: 3 }} />
              </div>
              {project.results.body.split("\n\n").map((para, i) => (
                <p key={i} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 16,
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.5,
                  marginBottom: i < project.results.body.split("\n\n").length - 1 ? 20 : 0,
                }}>
                  {para}
                </p>
              ))}
            </div>

            {/* Right: stat circles */}
            <div style={{ flex: 1, display: "flex", gap: 32, justifyContent: "center", flexWrap: isMobile ? "wrap" : "nowrap", marginTop: isMobile ? 16 : 0 }}>
              {project.results.stats.map((stat, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                  <div style={{
                    width: isMobile ? 160 : 256,
                    height: isMobile ? 160 : 256,
                    borderRadius: "50%",
                    background: "#222",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <p style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: isMobile ? 48 : 80,
                      fontWeight: 800,
                      color: "#CF6038",
                      lineHeight: 1,
                    }}>
                      {stat.value}
                    </p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: isMobile ? 15 : 18,
                      fontWeight: 600,
                      color: "#FFFFFF",
                      marginBottom: 4,
                    }}>
                      {stat.label}
                    </p>
                    <p style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 14,
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.5)",
                    }}>
                      {stat.sublabel}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* ─── FOOTER ──────────────────────────────────────────── */}
      <footer style={{
        padding: isMobile ? "40px 20px" : "60px 48px",
        textAlign: "center",
        width: "100%",
        borderTop: "1px solid #111111",
      }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.125rem", fontWeight: 500, marginBottom: 12 }}>Brad Carter</p>
        <a href="mailto:brad@bradcarter.design" style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 16,
          fontWeight: 600,
          color: "#CF6038",
          textDecoration: "none",
        }}>
          brad@bradcarter.design
        </a>
      </footer>
    </div>
  );
}
