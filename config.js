// ╔══════════════════════════════════════════════════════════════════╗
// ║                      SITE CONFIGURATION                        ║
// ║   This is the only file you need to edit to update your site.  ║
// ╚══════════════════════════════════════════════════════════════════╝

const SITE = {

  // ── 1. LAB IDENTITY ─────────────────────────────────────────────────
  smallName:  "UDL",
  name:       "UDL",
  fullName:   "Ultrasound Design Lab",
  university: "University of South Florida",
  department: "Department of Medical Engineering",
  tagline:    "Developing ultrasound technologies to understand and treat the brain.",


  // ── 2. CONTACT ──────────────────────────────────────────────────────
  email:    "stephenalexanderlee@usf.edu",
  phone:    "",   // leave "" to hide
  office:   "ENG241",
  // Use \n to create a new line in the address
  location: "3814 Spectrum Blvd, Suite 1405\nTampa, FL 33612",


  // ── 3. SOCIAL LINKS ─────────────────────────────────────────────────
  // Set any to "" to hide it
  social: {
    github:  "https://github.com/theUDL",
    scholar: "https://scholar.google.com/citations?user=Nkx2OJkAAAAJ&hl=en",
  },


  // ── 4. PRINCIPAL INVESTIGATOR ───────────────────────────────────────
  pi: {
    photo: "",             // path e.g. "media/members/pi.jpg" — leave "" to show initials
    name:  "Prof. Stephen Alexander Lee",
    title: "Assistant Professor",
    bio:   "Stephen Alexander Lee is an Assistant Professor in the Department of Medical Engineering at the University of South Florida, and directs the Ultrasound Design Lab. The lab's research develops ultrasound imaging and therapeutic technologies to interact with the nervous system, spanning super-resolution functional imaging of the brain's microvasculature and focused ultrasound neuromodulation. The goal is to create new ways to understand, diagnose, and treat neurological disorders.",
    links: {
      cv:     "media/cv/StephenLee_CV.pdf",   // set to "" to hide
      scholar: "https://scholar.google.com/citations?user=Nkx2OJkAAAAJ&hl=en",
      github:  "https://github.com/theUDL",
      email:   "mailto:stephenalexanderlee@usf.edu",
    },
  },


  // ── 5. RESEARCH AREAS ───────────────────────────────────────────────
  // icon: any single character, symbol, or emoji  |  Add or remove cards freely
  researchLead: "Our lab develops ultrasound imaging and therapeutic technologies to create new ways to interact with our nervous system, ultimately aiming to improve how we understand, diagnose, and treat neurological disorders.",
  research: [
    {
      icon:  "◈",
      title: "Super Resolution and Functional Brain Imaging",
      desc:  "The cerebral microvasculature is a traditionally underserved target for understanding brain function and dysfunction. We develop ultrasound technologies to image and interact with the brain's microvascular system at unprecedented resolution and sensitivity.",
      image: "media/research/brain-imaging.png",  // e.g. "media/research/brain-imaging.jpg"
    },
    {
      icon:  "◉",
      title: "Focused Ultrasound Neuromodulation",
      desc:  "We explore the use of focused ultrasound to modulate neural activity non-invasively, aiming to develop new therapeutic approaches for neurological disorders.",
      image: "media/research/neuromodulation.png",  // e.g. "media/research/neuromodulation.jpg"
    },
    //{
    //  icon:  "◎",
    //  title: "Functionalizing microbubbles for targeted molecular imaging and therapy",
    //  desc:  "We develop and functionalize microbubbles to target specific molecular markers, enabling precise imaging and therapeutic interventions at the cellular and molecular levels.",
    //  image: "",  // e.g. "media/research/microbubbles.jpg"
    //},
  ],

  // ── FUNDING SOURCES ──────────────────────────────────────────────────────
  // Add logos as you receive funding. Leave the array empty to hide the strip.
  // logo: path to image e.g. "media/funding/nih.png"  |  url: funder's website
  funding: [
    // { name: "NIH",  logo: "media/funding/nih.png",  url: "https://nih.gov" },
    // { name: "NSF",  logo: "media/funding/nsf.png",  url: "https://nsf.gov" },
  ],


  // ── 6. NEWS ─────────────────────────────────────────────────────────
  // Edit news.json to add/remove items — the site auto-sorts by date and shows
  // the most recent newsLimit items. The array below is only used as a fallback
  // if news.json cannot be loaded.
  newsLimit: 4,  // how many news items to show
  // type options: "paper" | "award" | "talk" | "grant"
  // title/desc can include basic HTML e.g. <em>italic</em>
  // Add newest items at the top
  news: [
    {
      month: "May",
      year:  2026,
      type:  "paper",
      title: 'New paper accepted at <em>[Journal / Conference]</em>',
      desc:  "Brief summary of the paper, its findings, and why it matters to the field.",
      link:  "#",
    },
    {
      month: "Apr",
      year:  2026,
      type:  "award",
      title: "[Lab Member] receives the [Award Name]",
      desc:  "Congratulations to [name] for this recognition of their work on [topic].",
      link:  "#",
    },
    {
      month: "Mar",
      year:  2026,
      type:  "talk",
      title: "Invited talk at [Conference Name]",
      desc:  "PI [Name] presents recent results on [topic] in [City, Country].",
      link:  "#",
    },
    {
      month: "Jan",
      year:  2026,
      type:  "grant",
      title: "New funding from [Funding Agency]",
      desc:  "The lab receives a grant to support research on [topic] over the next [X] years.",
      link:  "#",
    },
  ],


  // ── 7. PUBLICATIONS ─────────────────────────────────────────────────
  // ── Zotero (recommended) ─────────────────────────────────────────────
  // Create a public group at zotero.org/groups, then paste its numeric ID below.
  // Example: https://www.zotero.org/groups/1234567/minus-lab → groupId: "1234567"
  // The site will auto-fetch your most recent `limit` papers sorted by date.
  // Leave groupId as "" to use the manual publications list below instead.
  zotero: {
    groupId: "6572867",  // ← paste your Zotero group ID here
    limit:   10,  // max publications to show
  },
  // ── Manual fallback (used when groupId is empty) ──────────────────────
  // Wrap lab member names in <strong>…</strong> to bold them
  // Wrap journal/venue in <em>…</em> for italics
  // Set a link's url to "" to hide that button
  // Set publicationsListUrl to "" to hide the "Full list" and "View All" links
  publicationsListUrl: "#",
  publications: [
    {
      year:    2026,
      title:   "Title of Paper One: A Comprehensive Study of [Topic]",
      authors: 'Author A, <strong>Author B</strong>, Author C, Author D',
      venue:   "<em>Journal of Important Science</em>, vol. 42, pp. 1–15",
      links:   [
        { label: "PDF",  url: "#" },
        { label: "Code", url: "#" },
        { label: "DOI",  url: "#" },
      ],
    },
    {
      year:    2025,
      title:   "Title of Paper Two: Novel Methods for [Problem]",
      authors: 'Author B, Author E, <strong>Author F</strong>',
      venue:   "<em>Conference on Advanced Research (CAR 2025)</em> — Best Paper Award",
      links:   [
        { label: "PDF",    url: "#" },
        { label: "Slides", url: "#" },
        { label: "DOI",    url: "#" },
      ],
    },
    {
      year:    2025,
      title:   "Title of Paper Three: Understanding [Phenomenon] via [Method]",
      authors: '<strong>Author G</strong>, Author H, Author I, Author J',
      venue:   "<em>Nature Methods</em>, vol. 10, pp. 120–135",
      links:   [
        { label: "PDF",  url: "#" },
        { label: "Data", url: "#" },
        { label: "DOI",  url: "#" },
      ],
    },
  ],


  // ── 8. TEAM MEMBERS ─────────────────────────────────────────────────
  // group:   "postdoc" | "phd" | "masters" | "undergrad" | "alumni"  (default: "phd" if omitted)
  // photo:   path to image, e.g. "media/members/jane-doe.jpg" (leave "" for initials circle)
  // initials: shown only when photo is missing
  // For alumni, add  now: "Current position at Institution"
  team: [
    // —— Postdocs ——
    // —— PhD Students ——
    { initials: "FT", name: "Md Farhan Tanvir", role: "PhD Student",    topic: "Super-resolution ultrasound and neurovascular coupling", group: "phd",     photo: "" },
    // —— Undergrads ——
    // —— Alumni ——
  ],


  // ── 9. JOIN US ──────────────────────────────────────────────────────
  // Set open: false to hide a position type entirely
  join: {
    // phd: {
    //   open: true,
    //   desc: "Recruiting motivated PhD students for Fall 2027. We look for strong backgrounds in [Field] and a passion for [research area].",
    // },
    // postdoc: {
    //   open: true,
    //   desc: "Open position for a postdoc to work on [specific project]. Ideal candidates have experience in [skills or methods].",
    // },
    masters: {
      open: true,
      desc: "Master's students interested in thesis or project-based research are welcome to reach out to discuss opportunities in the lab.",
    },
    undergrad: {
      open: true,
      desc: "Undergrads interested in research are encouraged to reach out. We offer research for credit and honors thesis opportunities.",
    },
  },

};
