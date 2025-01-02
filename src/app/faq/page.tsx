import BufferSection from "@/components/Header"
import FAQSection from "@/components/FAQ"
const faqItems = [
  {
    id: 1,
    question: "How to start a project?",
    answer: "Starting a project is easy! First, identify your goals and objectives. Then, create a detailed plan outlining the steps needed to achieve them. Finally, gather the necessary resources and begin implementation.",
  },
  {
    id: 2,
    question: "What resources are available?",
    answer: "We offer a wide range of resources including documentation, tutorials, community support, and direct assistance from our team.",
  },
  {
    id: 3,
    question: "How long does it take to complete?",
    answer: "Project completion time varies depending on scope and complexity. Typically, small projects take 2-4 weeks, while larger ones may take several months.",
  },
  {
    id: 4,
    question: "What support is provided?",
    answer: "We provide comprehensive support including technical assistance, documentation, regular updates, and community forums.",
  },
  {
    id: 5,
    question: "How much does it cost?",
    answer: "Pricing varies based on project requirements. Contact our team for a detailed quote tailored to your needs.",
  },
  {
    id: 6,
    question: "Can I customize the solution?",
    answer: "Yes, our solutions are fully customizable to meet your specific needs and requirements.",
  },
]

const bufferProps = {
  backgroundImage: "/concert-background.jpg",
  title: "Frequently Asked Questions",
  sponsorImages: [
    {
      src: "/images/copyright.svg",
      alt: "Copyright 2024",
    },
    {
      src: "/images/creative-commons.svg",
      alt: "Creative Commons",
    },
    {
      src: "/images/block-chain.svg",
      alt: "Blockchain",
    },
    {
      src: "/images/barcode.svg",
      alt: "Barcode",
    },
  ],
  description: "Advocating For Artists' Rights & New Standards For Ethical AI",
}

export default function Page() {
  return (
    <main className="absolute inset-0">
      <BufferSection {...bufferProps} />
      <FAQSection items={faqItems} />
    </main>
  )
}

