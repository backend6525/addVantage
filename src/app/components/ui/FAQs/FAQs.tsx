import LayoutEffect from "@/app/components/LayoutEffect"
import SectionWrapper from "@/app/components/SectionWrapper"

const faqsList = [
    {
        q: "What is addVantage?",
        a: "addVantage is a revolutionary peer-to-peer marketing platform that connects you with brands and empowers your network. It allows you to discover relevant ads, share them with your network, and earn rewards for successful referrals and even direct sales",
    },
    {
        q: "How does addVantage work?",
        a: "Discover: Explore a personalized feed of advertisements tailored to your interests. Find exciting products and services you genuinely believe in",
    },
    {
        q: "Who can use addVantage?",
        a: "Anyone! Whether you're a social media influencer, a tech enthusiast, a college student, or simply someone looking for exciting products and rewards, addVantage offers a unique opportunity to connect with brands and earn money.",
    },
    {
        q: "Is it free to use addVantage?",
        a: "Absolutely! Signing up and browsing ads on addVantage is completely free. You only start earning rewards when your network engages with the ads you share.",
    },
    {
        q: "What types of ads will I see on addVantage?",
        a: "addVantage prioritizes your interests. You'll see a curated selection of ads for products and services that align with your preferences. This ensures a more relevant and engaging experience.",
    },
    {
        q: "How do I share ads with my network?",
        a: "Sharing ads on addVantage is super easy! You can seamlessly share them through your preferred platform – social media, messaging apps, or even by copying and pasting the link directly.",
    }
]

const FAQs = () => (
    <SectionWrapper id="faqs">
        <div className="custom-screen text-gray-300">
            <div className="max-w-xl text-center xl:mx-auto">
                <h2 className="text-gray-50 text-3xl font-extrabold sm:text-4xl">
                    Everything you need to know
                </h2>
                <p className="mt-3">
                    Here are the most questions people always ask about.
                </p>
            </div>
            <div className='mt-12'>
                <LayoutEffect
                    className="duration-1000 delay-300"
                    isInviewState={{
                        trueState: "opacity-1",
                        falseState: "opacity-0 translate-y-12"
                    }}
                >
                    <ul className='space-y-8 gap-12 grid-cols-2 sm:grid sm:space-y-0 lg:grid-cols-3'>
                        {faqsList.map((item, idx) => (
                            <li
                                key={idx}
                                className="space-y-3"
                            >
                                <summary
                                    className="flex items-center justify-between font-semibold text-gray-100">
                                    {item.q}
                                </summary>
                                <p
                                    dangerouslySetInnerHTML={{ __html: item.a }}
                                    className='leading-relaxed'>
                                </p>
                            </li>
                        ))}
                    </ul>
                </LayoutEffect>
            </div>
        </div>
    </SectionWrapper>
)

export default FAQs