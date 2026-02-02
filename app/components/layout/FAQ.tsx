"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/app/components/ui/accordion";

const faqs = [
    {
        question: "How do I increase my Tier Status?",
        answer: "Your Tier is determined by your total $ALPHA holdings. Simply acquiring more tokens on partner exchanges will automatically upgrade your status from Entry -> Influence -> Power -> Legacy.",
    },
    {
        question: "Can I use my tokens for flights?",
        answer: "Yes. Our 'Borderless Utility' program allows you to book flights and hotels directly through the Dashboard using your connected wallet, with zero exchange fees.",
    },
    {
        question: "Is there a confusing verification process?",
        answer: "No. We believe in 'Code as Law'. Your wallet balance is your ID. Just connect your wallet, and if you hold the tokens, you're in.",
    },
    {
        question: "Where can I buy $ALPHA?",
        answer: "You can purchase $ALPHA on major decentralized exchanges like PancakeSwap, or via our direct fiat on-ramp partners listed in the 'Exchanges' section.",
    }
];

export function FAQ() {
    return (
        <section className="py-24 px-4 bg-black/20">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold font-heading uppercase tracking-tighter text-center text-white mb-4">
                    Frequently <span className="text-primary">Asked</span>
                </h2>
                <p className="text-gray-400 text-center mb-12 max-w-lg mx-auto">
                    Everything you need to know about joining the Pride.
                </p>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border border-white/10 bg-white/5 rounded-xl px-4 data-[state=open]:border-primary/50 data-[state=open]:bg-white/10 transition-all">
                            <AccordionTrigger className="text-white hover:text-primary hover:no-underline font-semibold text-left">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-300 leading-relaxed">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
