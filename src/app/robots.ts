import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/i18n/config";

/**
 * Crawlers that read the site to answer questions in a chat interface, and
 * that cite their sources back to the user. Being in this list is the
 * precondition for ever being quoted by ChatGPT, Claude, Perplexity or Copilot
 * — a blocked agent simply never sees the page.
 *
 * `Allow: /` here is redundant with the wildcard rule below, but stating it
 * per-agent is deliberate: it records an explicit decision, so nobody later
 * tightens the wildcard and silently cuts off answer engines as a side effect.
 */
const ANSWER_ENGINES = [
  "OAI-SearchBot", // ChatGPT search index
  "ChatGPT-User", // fetched live when a user asks about a page
  "PerplexityBot", // Perplexity index
  "Perplexity-User", // Perplexity live fetch
  "Claude-SearchBot", // Claude search index
  "Claude-User", // Claude live fetch
  "Applebot", // Siri / Spotlight, and Apple Intelligence summaries
  "Amazonbot", // Alexa answers
  "DuckAssistBot", // DuckDuckGo AI assist
  "Bingbot", // Bing, and by extension Copilot grounding
];

/**
 * Crawlers whose stated purpose is collecting text to train models, with no
 * citation or referral in return.
 *
 * These are allowed too, and that is a judgement call worth understanding: for
 * a studio that wants to be a known entity, being present in training data is
 * how a model comes to "know" the brand at all, which is what surfaces it in
 * answers where no live retrieval happens. The trade is real content for
 * long-term recognition. Move any of these to `disallow` to opt out.
 */
const TRAINING_CRAWLERS = [
  "GPTBot", // OpenAI model training
  "ClaudeBot", // Anthropic model training
  "Google-Extended", // Gemini training + grounding. Does NOT affect AI
  // Overviews or normal Search: those use Googlebot,
  // and blocking this does not remove you from them.
  "Applebot-Extended", // Apple foundation-model training
  "meta-externalagent", // Meta AI training
  "CCBot", // Common Crawl, the corpus behind many models
  "cohere-ai",
  "Diffbot",
  "Bytespider", // ByteDance / Doubao
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...ANSWER_ENGINES.map((userAgent) => ({ userAgent, allow: "/" })),
      ...TRAINING_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
