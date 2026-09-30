import { FaqItem } from "@/components/faq-item";

const CONTACT_EMAIL = "contact@freetodare.com";

const questions: { question: string; answers: string[] }[] = [
  {
    question: "What makes this retreat special?",
    answers: [
      "Our retreats are always a mix of training and holidays — but they’re not about traditional training alone. We focus on choreography, dance, flow and musicality, helping you develop your own style, build your own movement and learn new choreographies along the way. We combine training with discovering the destination, exciting activities and, above all, strong community vibes.",
    ],
  },
  {
    question: "What is included in the retreat price?",
    answers: [
      "Your retreat price covers much more than accommodation and classes — it’s a fully organised experience, so you don’t have to spend hours figuring out what to book, where to train, how to get around or how to organise activities.",
      "You’ll enjoy 5 group aerial trainings with two experienced teachers, in a studio carefully selected by us, plus 6 nights’ accommodation, daily breakfast, a rooftop welcome dinner, group airport transfers, transfers to classes and selected activities, and a Lisbon transport pass for the week.",
      "We also organise the experiences: a boat trip, surf class, two photoshoots and activities with local guides.",
      "You’ll stay together with the teachers and other participants, creating a real community where you can connect, exchange, ask questions and share the week with people who have the same passion.",
      "We choose, book and coordinate everything for you — you just come to Lisbon, train, explore and enjoy.",
    ],
  },
  {
    question: "Can I join the retreat solo or come with a partner?",
    answers: [
      "Yes! Many guests join our retreats alone, so it’s a great way to meet people who share the same passion. You’ll train together, explore the destination, join activities and share plenty of moments as a group.",
      "You can also come with your partner. If they’re not joining the retreat, simply choose the without accommodation option and arrange your own stay together. If your partner would like to join some of the activities, just contact us at contact@freetodare.com or via WhatsApp at +351 934 921 930, and we’ll help you arrange it.",
    ],
  },
  {
    question: "What is your cancellation policy?",
    answers: [
      "Due to the complex organisation of our retreats and the advance commitments we make with accommodation, instructors, activities and local partners, bookings are non-refundable and cannot be cancelled by participants.",
      "However, if you are unable to attend, you may transfer the amount paid to another Free To Dare retreat of your choice, subject to availability.",
      "The retreat may only be cancelled by the organiser if the minimum of 10 participants is not reached and it is therefore not possible to operate the event. In this case, participants will receive a full refund of all amounts paid to Free To Dare.",
    ],
  },
  {
    question: "Are meals included during the retreat?",
    answers: [
      "Breakfast is included every morning, as well as our welcome dinner on the first evening. For the rest of the retreat, meals are not included, giving you the freedom to discover Lisbon’s cafés and restaurants and choose what works best for you.",
      "Living Lounge Hostel also has a fully equipped shared kitchen, so you can prepare your own meals whenever you prefer.",
    ],
  },
];

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      data-reveal-group
      className="scroll-mt-28 bg-white"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-10 lg:px-14 min-[88rem]:px-0">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          <div className="@container lg:w-80 lg:shrink-0">
            <p
              data-reveal
              className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-forest"
            >
              <span aria-hidden="true" className="h-px w-10 bg-sand" />
              FAQ
            </p>

            {/* Sized from the column width so the longest word (“FREQUENTLY”,
                ~6.6em wide) never spills over the questions beside it */}
            <h2
              id="faq-title"
              data-reveal
              className="mt-5 font-display text-[min(3rem,15cqi)] uppercase leading-[0.95] tracking-[-0.02em] text-forest"
            >
              Frequently
              <br />
              asked
              <br />
              questions
            </h2>

            <p
              data-reveal
              className="mt-6 max-w-sm text-sm leading-relaxed text-muted"
            >
              Still wondering about something? Write to{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-forest underline underline-offset-4 transition hover:text-ink"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              and you will get a real answer, not a template.
            </p>
          </div>

          <div data-reveal className="flex max-w-3xl flex-1 flex-col gap-2.5">
            {questions.map((item) => (
              <FaqItem key={item.question} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
