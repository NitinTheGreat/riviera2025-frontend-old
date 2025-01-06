import BufferSection from "@/components/Header"
import FAQSection from "@/components/FAQ"
const faqItems = [
  {
    id: 1,
    question: "Are there accommodation facilities available for outstation participants?",
answer: " Yes, accommodation is provided for outstation participants in VIT hostels on a paid and first come first served basis. The cost will be minimal, inclusive of breakfast and lunch served in the regular hostel mess.",
  },
  {
    id: 2,
    question: "Is transportation provided to and from the venue, or should attendees arrange their own transportation?",
    answer: "No, VIT does not provide transportation. Attendees are required to make their own transportation arrangements.",
  },
  {
    id: 3,
    question: "What is required for identity verification at the event?",
    answer: "Physical identification cards from respective colleges/universities and government ID cards are mandatory for entrance verification.",
  },
  {
    id: 4,
    question: "How many teams can a college send for the events?",
    answer: "Each college is permitted to send only one team per event.",
  },
  {
    id: 5,
    question: "Is there a provision for on-spot registrations for events?",
    answer: "Registration or events IS exclusively through the official Riviera website, and on-spot registrations will not be available.",
  },
  {
    id: 6,
    question: "Who is eligible to participate in the events?",
    answer: "Only college students with valid identification cards are allowed to participate in the events.",
  },
  {
    id: 7,
    question: "How does the rolling trophy and ranking system work?",
    answer: "Each event within the fest is assigned a specific point value. When a team or a participant secures a victory in any event, the corresponding points are added to their college's overall tally. The college accumulating the highest total points across all events will be honored with the prestigious rolling trophy. This system aims to recognize and reward the college that demonstrates the most exceptional performance and participation throughout the fest.",
  },
]

const bufferProps = {
  backgroundImage: "/images/heroimg.png",
  title: "Frequently Asked Questions",
  description: "Advocating For Artists' Rights & New Standards For Ethical AI",
}

export default function Page() {
  return (
    <main className=" bg-background">
     
      <BufferSection {...bufferProps} />
      <div className="h-screen"></div>
      <FAQSection items={faqItems} />
    </main>
  )
}

