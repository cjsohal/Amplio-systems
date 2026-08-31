/* Sub-pages under AI Automation:
     /ai-automation/ai-voice-receptionist/
     /ai-automation/ai-seo/
     /ai-automation/ai-strategy/

   The three services, their titles and their intro paragraphs come from the original
   ampliosystemsltd.com services cards and are reproduced VERBATIM — see `promise` below.
   Everything else (the "what it does" lists, process steps, FAQs, honesty notes) is written
   by Amplio and needs client sign-off; it is consistent with the brand brief but is not from
   any supplied source.

   Rendered by src/layouts/ServicePageLayout.astro, a shared layout so all three stay identical
   in structure. */
export const SERVICE_PAGES = {
  receptionist: {
    slug: 'ai-voice-receptionist',
    eyebrow: 'AI Voice Receptionist',
    headline: 'The call you missed on Friday went to someone else',
    /* verbatim from the original site */
    promise: 'Never miss a call again. Our AI receptionist handles enquiries 24/7, saving you valuable time and resources.',
    gapEyebrow: 'The cost of a missed call',
    gapTitle: 'A missed call is rarely a call that comes back',
    gapBody: 'When someone needs a plumber, a chiropractor or a consultant, they work down the list until somebody answers. The call you missed at 4:50pm on a Friday is usually a job that went elsewhere — and you never find out it happened.',
    gapPoints: [
      ['phone', 'Answered on the first ring', 'Every hour of every day, including the ones you are working, driving or asleep.'],
      ['calendar-check', 'Booked into your real calendar', 'Not a message for you to action later. The appointment exists when the call ends.'],
      ['inbox', 'Summarised before you look', 'Who called, what they wanted, what was agreed — in a line, not a recording you have to sit through.'],
    ],
    doesEyebrow: 'What it handles',
    doesTitle: 'The calls that do not need you',
    does: [
      'New enquiries — qualified, quoted where you allow it, and booked',
      'Appointment booking, moving and cancelling against live availability',
      'Answers to the questions you get asked twenty times a week',
      'Out-of-hours and overflow when the line is already busy',
      'Taking a proper message when it genuinely does need you',
    ],
    escalation: 'Anything sensitive, unusual or urgent goes straight to you. The receptionist is told what it may not decide, and it does not improvise.',
    stepsEyebrow: 'Getting it running',
    stepsTitle: 'Live on your existing number',
    steps: [
      ['message-circle', 'We listen to how you answer', 'Your greeting, your terminology, what you do and do not take on. The voice is built to sound like your practice.'],
      ['plug', 'We connect your calendar and number', 'It works with the booking system and phone line you already have. Nothing is replaced.'],
      ['shield-check', 'You set the boundaries', 'What it can book, what it must quote, and what it always passes to a human.'],
    ],
    faq: [
      ['v1', 'Will callers know it is not a person?', 'It introduces itself honestly if asked, and it never claims to be someone it is not. Most callers simply want a fast, competent answer.'],
      ['v2', 'What happens if it cannot help?', 'It takes a full message and hands over, or transfers live if you want it to. It does not guess.'],
      ['v3', 'Do I keep my phone number?', 'Yes. It sits on the number your customers already have.'],
      ['v4', 'Can I turn it off during office hours?', 'Yes — plenty of clients use it purely for out-of-hours and overflow.'],
    ],
    ctaTitle: 'How many calls went unanswered last week?',
    ctaBody: 'Most owners genuinely do not know. That is usually the most persuasive number in the conversation.',
  },

  seo: {
    slug: 'ai-seo',
    eyebrow: 'AI SEO',
    headline: 'Get recommended, not just ranked',
    /* verbatim from the original site */
    promise: 'Data-driven content strategies that boost your visibility and attract more qualified leads. Be visible in LLMs, not just search engines!',
    gapEyebrow: 'The shift',
    gapTitle: 'Your next customer may never see a results page',
    gapBody: 'People increasingly ask an assistant for a recommendation rather than searching and choosing for themselves. When that happens there is no page of ten blue links to rank on — there is one answer. Being absent from it is a different problem from ranking eleventh.',
    gapPoints: [
      ['search', 'Traditional search', 'Still where most enquiries begin, and still worth doing properly.'],
      ['bot', 'Assistant answers', 'Increasingly where the shortlist is decided, before anyone visits a website.'],
      ['trending-up', 'Qualified over loud', 'The aim is enquiries that fit what you actually sell, not raw traffic.'],
    ],
    doesEyebrow: 'What the work involves',
    doesTitle: 'Content built on what people actually ask',
    does: [
      'Finding the questions your customers ask, in the words they use',
      'Content that answers them properly, rather than circling the keyword',
      'Structured information a model can read, quote and attribute',
      'Fixing the technical basics that quietly cap your visibility',
      'Reporting that tracks enquiries, not just impressions',
    ],
    escalation: 'We do not buy links, spin articles or publish filler to hit a word count. If a page has nothing to say, we do not write it.',
    stepsEyebrow: 'How we work',
    stepsTitle: 'Evidence first, publishing second',
    steps: [
      ['search', 'We audit where you stand', 'Search visibility, assistant visibility, and what your competitors are being recommended for.'],
      ['list-checks', 'We agree the questions worth owning', 'A shortlist tied to work you want more of, not everything you could theoretically rank for.'],
      ['file-text', 'We build and publish', 'Written to be useful to a reader first. Everything technical follows from that.'],
    ],
    faq: [
      ['s1', 'How long before this shows results?', 'Search moves in months, not weeks. Anyone promising otherwise is selling you something.'],
      ['s2', 'Can you guarantee I appear in AI answers?', 'No, and nobody can. What we can do is make you the most quotable, best-structured answer available.'],
      ['s3', 'Do I have to write anything?', 'No, but the best pages come from a short conversation with you. You know things a researcher cannot find.'],
      ['s4', 'Will this replace my current agency?', 'Not necessarily. It often sits alongside traditional SEO work rather than duplicating it.'],
    ],
    ctaTitle: 'Ask an assistant who it recommends in your area',
    ctaBody: 'Whatever it says is the honest starting point for this conversation. Try it before you talk to us.',
  },

  strategy: {
    slug: 'ai-strategy',
    eyebrow: 'AI Strategy',
    headline: 'Navigate AI safely, in the right order',
    /* verbatim from the original site */
    promise: 'Create an AI Strategy and Roadmap to help you navigate the world of AI safely.',
    gapEyebrow: 'Why this comes first',
    gapTitle: 'Most AI disappointment is a sequencing problem',
    gapBody: 'Tools get bought before anyone agrees what problem they solve, who owns them, or what happens to the data. A roadmap is cheaper than the three false starts it prevents — and far cheaper than the one that goes wrong publicly.',
    gapPoints: [
      ['list-checks', 'What to do first', 'Ranked by what it saves you, not by what is newest.'],
      ['shield-check', 'What to be careful with', 'Client data, professional obligations, and the things that must stay human.'],
      ['users', 'Who owns what', 'A system nobody owns is a system nobody maintains.'],
    ],
    doesEyebrow: 'What you get',
    doesTitle: 'A document you can take to your board',
    does: [
      'An honest audit of where AI would and would not help you',
      'A prioritised roadmap with sequence, effort and expected return',
      'Data, privacy and risk considerations written in plain English',
      'Where a human must stay in the loop, and why',
      'A build-versus-buy view on each item, including doing nothing',
    ],
    escalation: 'Sometimes the recommendation is to wait, or to fix a process instead. We would rather tell you that than sell you a build.',
    stepsEyebrow: 'The engagement',
    stepsTitle: 'Short, focused, and it ends with a decision',
    steps: [
      ['search', 'We map how the work actually flows', 'Interviews with the people doing it, not just the people describing it.'],
      ['lightbulb', 'We test the opportunities against reality', 'Cost, risk, effort and appetite. Ideas that fail on any of those come out.'],
      ['file-text', 'We hand over the roadmap', 'Yours to keep, and specific enough that another supplier could deliver it.'],
    ],
    faq: [
      ['a1', 'Is this just a sales document for your build work?', 'No. It is deliberately written so someone else could deliver it. Several clients have taken it in-house.'],
      ['a2', 'How long does it take?', 'Weeks rather than months, depending on how many people we need to speak to.'],
      ['a3', 'We are small. Is this overkill?', 'Then it is short. The value is in the order of operations, and that matters more when budget is tight.'],
      ['a4', 'What if the answer is that we should not use AI?', 'Then that is the answer, and it is written down with the reasoning. Integrity is our first value.'],
    ],
    ctaTitle: 'Start with the map, not the tools',
    ctaBody: 'One conversation is usually enough to tell whether a roadmap is worth doing at all.',
  },
};
