export const myCourses = [
  {
    id: "ssc-26-science",
    title: "ক্লাস ১০ - SSC '26 বিজ্ঞান",
    badge: { type: "orange", text: "ফ্রি তে দেখা শেষ" },
    cta: { text: "বিস্তারিত দেখো", action: "details" },
    banner: "/coursecards.webp",
  },
  {
    id: "ssc-25-science",
    title: "ক্লাস ১০ - SSC '25 বিজ্ঞান",
    badge: { type: "green", text: "ভর্তি হয়েছে" },
    cta: { text: "শেখা চালিয়ে যাও", action: "continue", program: "ssc-25-science" },
    banner: "/coursecards.webp",
  },
  {
    id: "class-9-new",
    title: "ক্লাস ৯ - (নতুন কারিকুলাম)",
    badge: { type: "green", text: "ভর্তি হয়েছে" },
    cta: { text: "শেখা চালিয়ে যাও", action: "continue", program: "class-9-new" },
    banner: "/coursecards.webp",
  },
]

export const subjectsByProgram: Record<string, { id: string; title: string }[]> = {
  "ssc-26-science": [
    { id: "bn1", title: "বাংলা ১ম পত্র" },
    { id: "bn2", title: "বাংলা ২য় পত্র" },
    { id: "en2", title: "ইংরেজি ২য় পত্র" },
    { id: "math", title: "গণিত" },
    { id: "hm", title: "উচ্চতর গণিত" },
    { id: "phy", title: "পদার্থবিজ্ঞান" },
    { id: "chem", title: "রসায়ন" },
    { id: "bio", title: "জীববিজ্ঞান" },
  ],
  "ssc-25-science": [
    { id: "bn1", title: "বাংলা ১ম পত্র" },
    { id: "bn2", title: "বাংলা ২য় পত্র" },
    { id: "en2", title: "ইংরেজি ২য় পত্র" },
    { id: "math", title: "গণিত" },
    { id: "hm", title: "উচ্চতর গণিত" },
    { id: "phy", title: "পদার্থবিজ্ঞান" },
    { id: "chem", title: "রসায়ন" },
    { id: "bio", title: "জীববিজ্ঞান" },
  ],
  "class-9-new": [
    { id: "bn1", title: "বাংলা ১ম পত্র" },
    { id: "bn2", title: "বাংলা ২য় পত্র" },
    { id: "en2", title: "ইংরেজি ২য় পত্র" },
    { id: "math", title: "গণিত" },
    { id: "phy", title: "পদার্থবিজ্ঞান" },
    { id: "chem", title: "রসায়ন" },
    { id: "bio", title: "জীববিজ্ঞান" },
  ],
}


