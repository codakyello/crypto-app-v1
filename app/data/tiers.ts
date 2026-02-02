import { TierData } from "@/components/tiers/TierCard";

export const tiers: TierData[] = [
    {
        id: 1,
        name: "Circle of Entry",
        title: "Your First Step Into The Pride",
        requirement: "≥ 10,000 $ALPHA",
        requirementValue: "10000",
        tagline: "Your First Step Into The Pride",
        description:
            "The Circle of Entry is the gateway into the Alpha Pride ecosystem. It signals early conviction, alignment, and your initiation into a global network of high-performing individuals.",
        benefits: [
            "Access to core community channels",
            "Invitations to early-stage events and gatherings",
            "Recognition as an official member of The Pride",
            "Access to curated intelligence and updates",
            "A clear path to ascend into higher tiers",
        ],
        color: "entry",
    },
    {
        id: 2,
        name: "Circle of Influence",
        title: "Where Your Voice Begins to Shape the Ecosystem",
        requirement: "≥ 100,000 $ALPHA",
        requirementValue: "100000",
        tagline: "Where Your Voice Begins to Shape the Ecosystem",
        description:
            "The Circle of Influence represents elevated commitment and active engagement within the Alpha Pride. Influence members gain deeper access to information flows, private conversations, and collaborative spaces.",
        benefits: [
            "Priority access to insights and internal briefings",
            "Early previews of new product features",
            "Exclusive NFT Drops and Whitelists",
            "Invitations to high-value conversations",
            "Access to collaboration opportunities",
        ],
        color: "influence",
    },
    {
        id: 3,
        name: "Circle of Power",
        title: "For Strategic Leaders Who Shape the Future",
        requirement: "≥ 1,000,000 $ALPHA",
        requirementValue: "1000000",
        tagline: "For Strategic Leaders Who Shape the Future",
        description:
            "The Circle of Power is reserved for trusted operators whose experience, influence, and capital play a pivotal role in the growth of the ALPHA ecosystem. Members in this tier help shape high-level strategies.",
        benefits: [
            "Access to strategy rooms and leadership discussions",
            "Direct exposure to private deal flow",
            "Power-only events and private meetups",
            "Direct Influence over Treasury & Ecosystem direction",
            "Deep integration into high-level networks",
        ],
        color: "power",
    },
    {
        id: 4,
        name: "Circle of Legacy",
        title: "The Highest Tier. Reserved for the Visionaries",
        requirement: "≥ 10,000,000 $ALPHA",
        requirementValue: "10000000",
        tagline: "The Highest Tier. Reserved for the Visionaries",
        description:
            "The Circle of Legacy is the pinnacle of Alpha Pride, a tier reserved for individuals who embody long-term vision, strategic discipline, and unmatched commitment. Legacy members are regarded as guardians of ALPHA's future.",
        benefits: [
            "Exclusive access to the Legacy Council",
            "First rights to top-tier deal flow and high-level partnerships",
            "Invitations to Legacy-only retreats and private experiences",
            "Direct influence over ALPHA's long-term roadmap",
            "Multigenerational prestige and recognition within the ecosystem",
        ],
        color: "legacy",
    },
];
