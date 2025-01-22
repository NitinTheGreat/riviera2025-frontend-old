import { Metadata } from 'next'
import BufferSection from "@/components/Header"
import FAQSection from "@/components/FAQ"

const faqItems = [
  {
    id: 1,
    question: "Are there accommodation facilities available for outstation participants?",
    answer: "Yes, accommodation is provided for outstation participants in VIT hostels on a paid and first come first served basis. The cost will be minimal, exclusive of breakfast and lunch served in the regular hostel mess.",
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
    answer: "Registration for events is exclusively through the official Riviera website, and on-spot registrations will not be available.",
  },
  {
    id: 6,
    question: "Who is eligible to participate in the events?",
    answer: "Only college students with valid identification cards are allowed to participate in the events.",
  },
  {
    id: 7,
    question: "How does the rolling trophy and ranking system work?",
    answer: <>
      <h1>Riviera Rolling Trophy</h1>
    <p>The most prestigious award of Riviera, recognizing the collective excellence of participating colleges across a variety of cultural, literary, artistic, and musical events. This coveted trophy symbolizes teamwork, versatility, and exceptional talent displayed during the festival.</p>
    
    <h2>Eligibility and Highlights:</h2>
    <h3>1. Participation Criteria:</h3>
    <ul>
        <li>A team must participate in a minimum of <span className="highlight">15 out of 25</span> events listed in the competition lineup.</li>
        <li>Events span categories such as Quiz, Informal Activities, Art/Drama, and Music, offering a platform for all kinds of talents.</li>
        <li>A team must participate in at least one event from each category: <span className="highlight">Quiz, Informal, Art & Drama, and Music</span>.</li>
    </ul>
    
    <h3>2. Scoring System:</h3>
    <ul>
        <li>Points are awarded for 1st, 2nd, and 3rd positions in each event, with varying weightage depending on the event's significance.</li>
        <li>Total points determine the winning team, encouraging participants to perform consistently across multiple events.</li>
    </ul>
    
    <h3>3. Category Balance:</h3>
    <ul>
        <li>To promote balanced representation, teams are required to participate in events across all categories, showcasing their versatility.</li>
    </ul>
    
    <h3>4. Competition Spirit:</h3>
    <ul>
        <li>The Rolling Trophy is a celebration of camaraderie, creativity, and competition, fostering an environment where participants push their limits and inspire others.</li>
    </ul>

    <h2>Why Compete?</h2>
    <p>Winning the Riviera Rolling Trophy is not just about points—it's about earning the distinction of being the most versatile and talented team in one of India's largest and most vibrant cultural fests. Competing teams will create memories, forge friendships, and leave a lasting mark in Riviera’s history.</p>
    
    <p><strong>Gear up and compete for glory—claim the Rolling Trophy and etch your name among the legends of Riviera!</strong></p>
    </>,
  },
]

const bufferProps = {
  backgroundImage: "/images/heroimg.png",
  title: "Frequently Asked Questions",
  description: "Answers to common questions about Riviera'25 events and participation",
}

export const metadata: Metadata = {
  title: 'FAQ - Riviera 2025 | VIT Vellore',
  description: 'Find answers to frequently asked questions about Riviera 2025, VIT Vellore\'s annual techno-cultural fest. Learn about accommodation, transportation, registration, and more.',
  openGraph: {
    title: 'FAQ - Riviera 2025 | VIT Vellore',
    description: 'Find answers to frequently asked questions about Riviera 2025, VIT Vellore\'s annual techno-cultural fest. Learn about accommodation, transportation, registration, and more.',
    images: [
      {
        url: '/image/riviera.png',
        width: 1200,
        height: 630,
        alt: 'Riviera 2025 - VIT Vellore',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ - Riviera 2025 | VIT Vellore',
    description: 'Find answers to frequently asked questions about Riviera 2025, VIT Vellore\'s annual techno-cultural fest. Learn about accommodation, transportation, registration, and more.',
    images: ['/image/riviera.png'],
  },
}

export default function Page() {
  return (
    <main className="bg-background"> 
      <BufferSection {...bufferProps} />
      <div className="h-screen"></div>
      <FAQSection items={faqItems} />
    </main>
  )
}

