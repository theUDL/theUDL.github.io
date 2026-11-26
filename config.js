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
  // Each person with an `id` gets their own page at person.html?id=<id>
  //   id:     short unique name used in the page link (lowercase, no spaces)
  //   awards: list shown on their page — leave [] to hide the section
  //   orcid:  their own ORCID iD — their page then lists everything on that
  //           record. Leave it out and the page lists the papers on the lab's
  //           ORCID record (section 7) that they are an author of.
  //   author: how their name appears in author lists, used to find their papers
  //           and show their name in bold. `initial` is optional.
  //   papers: extra papers to list by hand (same format as `publications` below)
  pi: {
    id:    "stephen-lee",
    orcid: "0000-0002-1315-4266",
    photo: "media/members/stephen-lee.jpg",   // leave "" to show initials
    author: { last: "Lee", initial: "S" },
    papers: [],
    awards: [
      { year: 2026, title: "Young Pioneers Award", org: "Biomedical Engineering Society (BMES), Orlando, FL" },
      { year: 2023, title: "Yuen-huo Hung and Chao-chin Huang Award", org: "Columbia University, Department of Biomedical Engineering" },
      { year: 2022, title: "Young Investigator Award", org: "8th International Symposium on Focused Ultrasound, Bethesda, MD" },
      { year: 2022, title: "Student Award Finalist", org: "International Society for Therapeutic Ultrasound, Toronto, ON" },
      { year: 2019, title: "1st Place Student Best Paper Award", org: "IEEE International Ultrasonics Symposium, Glasgow, Scotland" },
      { year: 2019, title: "1st Place Student Poster Competition", org: "Columbia University BME Symposium, New York, NY" },
      { year: 2019, title: "Frank Morrell Endowed Memorial Scholarship", org: "Marine Biological Laboratory, Woods Hole, MA" },
      { year: 2019, title: "Milton L. Shifman Endowed Scholarship", org: "Marine Biological Laboratory, Woods Hole, MA" },
      { year: 2017, title: "Student Travel Award", org: "IEEE International Ultrasonics Symposium, Washington, DC" },
      { year: 2014, title: "Dunlevie Honors Undergraduate Research Award", org: "UNC Chapel Hill Honors Program, Chapel Hill, NC" },
    ],
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
  // Give an area an `id` and its card links to a full write-up at research.html?id=<id>:
  //   • the text of the write-up lives in research/<id>.md (plain Markdown —
  //     "## Heading" for sections, and a picture on its own line as
  //     ![caption](media/research/picture.jpg) becomes a captioned figure;
  //     a .mp4 file written the same way plays as a silent looping video)
  //   • background: an optional picture that stays fixed behind the write-up
  //     while the text scrolls over it
  //   • papers: the DOIs listed under "Relevant publications". Each is looked
  //     up on the lab's ORCID record (section 7), so it must be on that record.
  //     House rule: list (and describe as ours in the write-up) only papers
  //     where the PI is first, second or last author.
  researchLead: "Our lab develops ultrasound imaging and therapeutic technologies to create new ways to interact with our nervous system, ultimately aiming to improve how we understand, diagnose, and treat neurological disorders.",
  research: [
    {
      icon:  "◈",
      title: "Super Resolution and Functional Brain Imaging",
      desc:  "The cerebral microvasculature is a traditionally underserved target for understanding brain function and dysfunction. We develop ultrasound technologies to image and interact with the brain's microvascular system at unprecedented resolution and sensitivity.",
      image: "media/research/brain-imaging.png",  // e.g. "media/research/brain-imaging.jpg"
      id:    "brain-imaging",
      background: "media/research/ulm-background.jpg",  // stays fixed behind the write-up; "" for a plain page
      backgroundPosition: "24% center",                 // which part of the picture stays in view
      papers: [
        "10.1073/pnas.2509564123",       // single capillary reporters
        "10.1109/TBME.2024.3352025",     // functional ultrasound during neuromodulation
        "10.1101/2023.10.19.563176",     // flow imaging after blood-brain barrier opening
      ],
    },
    {
      icon:  "◉",
      title: "Focused Ultrasound Neuromodulation",
      desc:  "We explore the use of focused ultrasound to modulate neural activity non-invasively, aiming to develop new therapeutic approaches for neurological disorders.",
      image: "media/research/neuromodulation.png",  // e.g. "media/research/neuromodulation.jpg"
      id:    "neuromodulation",
      papers: [
        "10.1109/TBME.2024.3352025",     // brain mapping during neuromodulation
        "10.1109/TUFFC.2023.3280455",    // temperature, cavitation and displacement
        "10.1109/TMI.2021.3128641",      // FUS-Net
        "10.1109/TUFFC.2020.3014183",    // displacement imaging in humans
        "10.1109/TMI.2020.2992498",      // displacement imaging
        "10.1088/1361-6560/aa9fc2",      // first in vivo nerve stimulation
      ],
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
  // type options: "paper" | "award" | "talk" | "grant" | "milestone" | "people"
  // title/desc can include basic HTML e.g. <em>italic</em>
  // Add newest items at the top
  news: [
    {
      month: "Nov",
      year:  2026,
      type:  "people",
      title: "Md Farhan Tanvir joins the lab as a PhD student",
      desc:  "We are delighted to welcome Farhan as the lab's first PhD student.",
      link:  "person.html?id=farhan-tanvir",
    },
    {
      month: "Nov",
      year:  2026,
      type:  "milestone",
      title: "We have opened the doors to our lab @ USF!",
      desc:  "After months of hard work setting up our space in the USF Research Park, we are officially open and ready to kick off our research projects.",
      link:  "",   // leave "" for no "Read more" link
      image: "media/news/opening.png",
    },
    {
      month: "Oct",
      year:  2026,
      type:  "award",
      title: "Prof. Lee receives a BMES Young Pioneers Award",
      desc:  "Stephen Alexander Lee was recognized with a 2026 Young Pioneers Award by the Biomedical Engineering Society (BMES) in Orlando, FL.",
      link:  "person.html?id=stephen-lee",
    },
  ],


  // ── 7. PUBLICATIONS ─────────────────────────────────────────────────
  // ── ORCID (recommended) ──────────────────────────────────────────────
  // The list is pulled live from the PI's ORCID record (orcid.org), so a new
  // paper shows up here as soon as it is on that record — nothing to edit.
  // Leave id as "" to use the manual publications list below instead.
  orcid: {
    id:      "0000-0002-1315-4266",  // ← the lab's (PI's) ORCID iD
    limit:   10,                     // max publications shown on the homepage
    leadOnly: true,                  // homepage shows only papers where the PI is first,
                                     //   second or last author (profile pages list everything)
    exclude: [],                     // papers to hide: a DOI or part of a title,
                                     //   e.g. ["10.1101/2020.05.01.072157"]
  },
  // ── Manual fallback (used when id is empty or ORCID is unreachable) ──────────────────────
  // Wrap lab member names in <strong>…</strong> to bold them
  // Wrap journal/venue in <em>…</em> for italics
  // Set a link's url to "" to hide that button
  // Set publicationsListUrl to "" to hide the "Full list" and "View All" links
  // (it points at the PI's profile page, which lists every paper on the ORCID record)
  publicationsListUrl: "person.html?id=stephen-lee#person-pubs",
  publications: [
    {
      year:    2026,
      title:   "Assessing cerebral capillary function and stalling using single capillary reporters in ultrasound localization microscopy",
      authors: '<strong>Stephen A. Lee</strong>, Alexis Leconte, Alice Wu, Joshua Kinugasa, Gerardo Ramos Palacios, Jonathan Porée, Abbas F. Sadikot, Andreas Linninger, Jean Provost',
      venue:   "<em>Proceedings of the National Academy of Sciences</em>",
      links:   [ { label: "DOI", url: "https://doi.org/10.1073/pnas.2509564123" } ],
    },
    {
      year:    2025,
      title:   "Ultrasound Cavitation Enables Rapid, Initiator-Free Fabrication of Tough Anti-Freezing Hydrogels",
      authors: 'Yixun Cheng, <strong>Stephen Lee</strong>, Yihang Xiao, Shou Ohmura, Louis-Jacques Bourdages, Justin Puma, Zixin He, Zhen Yang, Jeremy Brown, Jean Provost, Jianyu Li',
      venue:   "<em>Advanced Science</em>",
      links:   [ { label: "DOI", url: "https://doi.org/10.1002/ADVS.202416844" } ],
    },
    {
      year:    2024,
      title:   "Functional Cerebral Neurovascular Mapping During Focused Ultrasound Peripheral Neuromodulation of Neuropathic Pain",
      authors: '<strong>Stephen A. Lee</strong>, Hermes A. S. Kamimura, Mila Smith, Elisa E. Konofagou',
      venue:   "<em>IEEE Transactions on Biomedical Engineering</em>",
      links:   [ { label: "DOI", url: "https://doi.org/10.1109/TBME.2024.3352025" } ],
    },
    {
      year:    2023,
      title:   "Interdependence of Tissue Temperature, Cavitation, and Displacement Imaging During Focused Ultrasound Nerve Sonication",
      authors: 'Erica P. McCune, <strong>Stephen A. Lee</strong>, Elisa E. Konofagou',
      venue:   "<em>IEEE Transactions on Ultrasonics, Ferroelectrics, and Frequency Control</em>",
      links:   [ { label: "DOI", url: "https://doi.org/10.1109/TUFFC.2023.3280455" } ],
    },
    {
      year:    2022,
      title:   "FUS-Net: U-Net-Based FUS Interference Filtering",
      authors: '<strong>Stephen A. Lee</strong>, Elisa E. Konofagou',
      venue:   "<em>IEEE Transactions on Medical Imaging</em>",
      links:   [ { label: "DOI", url: "https://doi.org/10.1109/TMI.2021.3128641" } ],
    },
  ],


  // ── 8. TEAM MEMBERS ─────────────────────────────────────────────────
  // Everyone appears on one grid of cards, PI first; `role` is the label on the card.
  // group:   "postdoc" | "phd" | "masters" | "undergrad" | "alumni"  (default: "phd" if omitted)
  //          sets the order on the grid; alumni get their own list underneath
  // photo:   path to image, e.g. "media/members/jane-doe.jpg" (leave "" for initials circle)
  // initials: shown only when photo is missing
  // For alumni, add  now: "Current position at Institution"
  team: [
    // —— Postdocs ——
    // —— PhD Students ——
    // Give a member an `id` (plus bio / awards / author / papers, as for the PI
    // above) and their card links to their own page.
    {
      id:       "farhan-tanvir",
      initials: "FT",
      name:     "Md Farhan Tanvir",
      role:     "PhD Student",
      topic:    "Super-resolution ultrasound and neurovascular coupling",
      group:    "phd",
      photo:    "media/members/farhan-tanvir.jpg",
      bio:      "Md Farhan Tanvir is a PhD student in Biomedical Engineering at the University of South Florida. He received his bachelor’s degree from Khulna University of Engineering & Technology (KUET), Bangladesh, and his master’s degree in Biomedical Engineering from the University of South Florida. His previous research involved the use of photoacoustic tomography to investigate cardiac and cerebrovascular changes associated with prenatal alcohol exposure. In the Lee Lab, he will focus on ultrasound localization microscopy to study the cerebral microvasculature.",
      author:   { last: "Tanvir" },
      awards:   [],   // e.g. { year: 2026, title: "Award name", org: "Awarding body" }
      papers:   [],
      links:    {},   // optional: email: "mailto:…", scholar: "https://…", github: "https://…", cv: "media/cv/…"
    },
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
