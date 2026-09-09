# Understanding LLMs: A Summary

## Part 1: What is an LLM?

### The Core Idea
A Large Language Model (LLM) works like a toddler learning to complete a repeated phrase — it doesn't "understand" words, but it learns patterns of what tends to follow what. An LLM is essentially the same idea, scaled up: no true understanding, just next-word prediction based on massive vocabulary and training.

The process of predicting the next word given some input is called **inference**. The model takes text, predicts the most likely next word, appends that word to the input, and repeats — feeding its own output back in as input — until it reaches a **stop word** (like a period), signaling the sentence is complete.

Because the LLM has no memory or understanding, it must be given the *entire* text so far every time it predicts the next word.

### How Training Works (Conceptually)
Training a model mirrors teaching a toddler:
1. **Feeding data** – the model is given text.
2. **Building relationships** – it tries to find relationships between words, storing them as numbers called **weights**.
3. **Testing the weights** – it masks a random word and tries to predict it (often wrong at first).
4. **Learning** – based on how wrong the prediction was, weights are updated.
5. **Repeat** – this cycle runs constantly on huge amounts of data.

Since the model tests and corrects itself without human labeling, this is called **self-supervised learning**. When a language model is trained on a very large amount of data, it becomes a "Large" Language Model.

### Why LLMs Have Certain Limitations
- **Bad at math**: LLMs only predict likely next words from training data; they don't actually calculate.
- **Hallucinations**: There's no concept of "true" or "false" — only "what word looks likely next." All LLM output is technically a hallucination; we just find some hallucinations useful.
- **Outdated knowledge**: Models only know what existed in their training data up to a certain cutoff date.

### The AGI Question
LLMs learn much like a child learns language — through exposure and pattern-recognition rather than explicit understanding. Whether this constitutes real "thinking" or "intelligence" is unresolved. The goal of building AI with true human-like general reasoning ability is called **Artificial General Intelligence (AGI)**, and there's no agreed-upon definition of when a system would qualify. This remains an open, unresolved debate.

---

## Part 2: Making LLMs Better

### Prompting
Anything you type into an LLM is called a **prompt**. More detailed prompts help the model narrow down relevant relationships between words, cutting out generic possibilities and improving the relevance of the response. However, an overly long or bloated prompt can overwhelm the model, causing it to consider too many possible relationships and reducing response quality.

### Roleplay: How Chat Responses Work
Since LLMs simply continue text, a raw question doesn't naturally produce an "answer" — it might just continue rambling in the same style as the question. The workaround is formatting the conversation like a script with labeled speaker turns (e.g., "user" and "assistant"), and leaving the assistant's line open-ended so the model naturally fills it in as a reply rather than a continuation of the question. Only the completed reply portion is shown to the user.

### System Prompts
LLMs are trained on enormous, unfiltered internet data — including undesirable material. To make responses well-behaved (helpful tone, no profanity, refusing dangerous requests), providers add a hidden instruction block before every conversation called the **system prompt**. It appears only once, but its effects apply to the entire conversation, since the whole conversation (system + all previous turns) is resent to the model each time. This is also how "thinking mode" works — extra hidden instructions are appended asking the model to reason step by step before answering.

Because the model has no memory, resending the full conversation each time also lets it correctly interpret references like pronouns ("that," "it") based on earlier context.

### Jailbreaking
Since everything sent to an LLM is just one block of text, it's technically possible to craft input that causes the model to disregard its system instructions — this is called **jailbreaking**. Safeguards against known techniques have improved over time, but people continually find new workarounds, and jailbreak prompts have grown more sophisticated.

### Context Engineering
The amount of text an LLM can process at once is called its **context window**, measured in **tokens** — pieces of words, similar to syllables. Text sent to the model is counted as **input tokens**, and its response as **output tokens**; providers typically charge per million tokens processed.

Because context windows are limited, being deliberate about what information is included in a prompt — for example, summarizing prior conversation instead of including it in full — is called **context engineering**.

### Personalizing an LLM
General-purpose LLMs aren't equally good at every specialized task. Two main approaches exist to improve performance on niche or specific use cases:

- **Fine-tuning**: Retraining the model further using additional, task-specific data. It's costly and time-consuming but allows adding large amounts of examples for broad, repeated tasks.
- **Retrieval-Augmented Generation (RAG)**: Instead of retraining, relevant extra information is fetched from an external source (a file, database, or app) and inserted into the prompt at the time of use. This is cheaper, more flexible, and better suited to frequently changing information.

Early on, when context windows were small, specialized **vector databases** (companies like Pinecone, Weaviate, Chroma) became popular for enabling this kind of retrieval. As context windows have grown much larger, that particular hype has cooled, though RAG itself remains important.

### Tools and MCP
LLMs can also be given access to **tools** — essentially descriptions of external actions or APIs they're allowed to request. The model decides if and when to call a tool, receives the result back as additional context, and continues reasoning or responds to the user — all typically hidden from the user except for the final answer.

The challenge was that every application's tool interface worked differently. Anthropic addressed this by defining a standardized way for applications to expose actions to LLMs, called the **Model Context Protocol (MCP)**. If an app "supports MCP," it means an LLM can be instructed to interact with and perform actions within that app in a standardized way. Web search features in AI chat tools work the same way — search is simply offered to the model as a callable tool.

### Prompt Injection and Security Risks
Because everything sent to an LLM is just text, malicious instructions can be hidden inside content the LLM is asked to process (a webpage, a comment, even invisible text in a document) — a technique called **prompt injection**. This becomes especially dangerous when tools/MCPs are connected, since injected instructions could cause the LLM to take unintended real-world actions (like forwarding private emails).

There is currently no complete defense against this. A reasonable precaution is to avoid connecting sensitive tools/MCPs to general-purpose LLM use, and to be cautious about which applications and data sources are granted tool access.

---

## Part 3: LLMs Beyond ChatGPT

### The Economics of LLMs
Training large models is extremely expensive, mainly due to hardware costs, which limits the number of companies capable of building frontier LLMs (Google, Meta, Anthropic, xAI/Twitter, OpenAI, and a few others). All of them depend heavily on specialized hardware, with Nvidia as the dominant supplier — often described as "selling shovels in a gold rush."

Because training foundational models is so costly, much of the broader value creation happens in the application layer — companies building useful products on top of existing foundation models rather than training their own from scratch. This dynamic underlies much of the current AI startup boom.

### Major LLMs by Company
- **Gemini** – Google
- **Llama** – Meta
- **Claude** – Anthropic
- **GPT** – OpenAI
- **Grok** – Twitter/xAI

### Categories of AI Coding Tools
- **Chat assistants** – conversational Q&A tools (ChatGPT, Claude)
- **IDE autocomplete** – inline code suggestions as you type (GitHub Copilot, Kilo Code, WindSurf)
- **Coding agents** – tools that can independently follow instructions and write code (Google Jules, Claude Code)
- **Code frameworks** – libraries for building LLM-powered applications (LangChain, LangGraph, PydanticAI, Vercel AI SDK)
- **Workflow builders** – tools for chaining automated tasks (ChatGPT workflows, n8n)
- Other notable tools: Gamma (presentations), Granola (meeting notes), Willow Voice/Wispr Flow (speech-to-text)

---

## Bonus: How Model Training Actually Works (Simplified)

The breakthrough enabling modern LLMs came from a 2017 research paper introducing a technique called **"attention,"** which — combined with hardware advances — made today's large models possible.

**Training process:**
1. **Embedding** – Words are converted into numbers, since computers process numbers, not language directly.
2. **Attention** – The model identifies relationships between words. Since words can relate in many different ways simultaneously (grammar, meaning, position, etc.), multiple attention mechanisms run in parallel — called **multi-head attention** — and their outputs are combined.
3. **Feed forward** – The raw weights produced by attention contain some "noise." A filtering step called an **activation function** cleans up these values before passing them to the next stage. Together, the attention and feed-forward layers form a **transformer** (the "T" in GPT).
4. **Feed backward (back-propagation)** – During training, the model masks certain words and tries to predict them. The error/inaccuracy is measured using a **loss function**, and that error signal is used to adjust the weights.
5. **Repeat** – This cycle runs an enormous number of times across massive datasets.

**Inference (generating output) works similarly, except:**
- Text is broken into **tokens** (word-fragments) before being converted to numbers.
- There's no back-propagation or weight updates — the model only produces predictions, it doesn't learn from them in real time.
- Once weights suggest a set of possible next words, the model picks one of the top candidates (a process called **sampling**) and appends it to the input, repeating until a stop condition is met.

This is also why responses from tools like ChatGPT appear incrementally — the answer is generated one word at a time and streamed to the user as it's produced.
