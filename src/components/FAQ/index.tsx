import Accordion from "../Accordion"

interface FAQSectionProps {
  items: {
    id: number
    question: string
    answer: string
  }[]
}

export default function FAQSection({ items }: FAQSectionProps) {
  return (
    <section className="w-full min-h-screen bg-black py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-4">
        <Accordion items={items} />
      </div>
    </section>
  )
}

