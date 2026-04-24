---
name: AI/ML Architecture
description: "Technical foundations for leveraging AI as product infrastructure — what models can do, how to use them, and when NOT to. Trigger on: 'should we use AI for this?', 'on-device vs cloud', 'RAG', 'fine-tuning', 'embeddings', 'which model?', 'AI feels like a gimmick', 'hallucination', 'how does the AI work?', building AI features, evaluating AI capabilities, agent design, speech-to-text architecture, image generation, vector search, prompt engineering."
---

# AI/ML Architecture

## Transformer Architecture

Self-attention lets the model weigh every input token against every other. Encoder-only (BERT: classification), decoder-only (GPT/Claude: generation), encoder-decoder (T5: transformation). Key constraint: **attention scales quadratically with context length** — longer inputs are disproportionately expensive.

## Embeddings

Dense vectors where similar meaning = nearby position. "King − Man + Woman ≈ Queen" because relationships are encoded as directions. Use for: semantic search (meaning, not keywords), clustering, recommendation, anomaly detection. Models: sentence-transformers, OpenAI embeddings, CLIP (cross-modal: text ↔ image).

## LLM Fundamentals

Tokenization (~4 chars/token for English), context window (processing limit), temperature (0 = deterministic, 1 = creative), system prompts (behavioral framing), few-shot learning (examples in prompt teach patterns). No memory between calls — "memory" is injected context.

## RAG (Retrieval-Augmented Generation)

1. Embed documents → store in vector database
2. User query → embed → find similar chunks
3. Inject retrieved chunks into LLM prompt
4. LLM generates answer grounded in retrieved content

Solves: hallucination, freshness, domain specificity. Critical decisions: chunk size, overlap, retrieval count, re-ranking strategy.

## Fine-Tuning vs Prompt Engineering

Prompt engineering first — cheaper, no training infrastructure, faster iteration. Fine-tune when: prompting can't achieve required quality/consistency, faster inference needed (shorter prompts), or specific output format required reliably.
- **LoRA**: modifies < 1% of parameters. Efficient and practical
- **Full fine-tuning**: expensive, risk of catastrophic forgetting, rarely necessary

## On-Device Inference

Privacy (data never leaves device), latency (no network), offline capability, zero marginal cost.
- CoreML (Apple), ONNX Runtime, TensorFlow Lite
- Constraints: device RAM, Neural Engine (Apple M-series: 15–38 TOPS), battery drain during continuous inference
- Quantization FP32 → INT8: ~4× smaller model, modest accuracy loss

## Speech-to-Text Pipeline

Audio → preprocessing (noise reduction, VAD) → mel spectrograms → acoustic model (Whisper, Parakeet TDT) → optional LM correction → text. Key metrics: WER (Word Error Rate), RTF (real-time factor). On-device STT is viable for most languages on Apple Silicon.

## Diffusion Models

Forward process (add noise) + reverse process (learn to remove noise, text-guided via CLIP). Key concepts: latent space (compressed representation), classifier-free guidance (prompt strength), ControlNet (structural guidance — pose, depth, edges). Capability ceiling: photorealistic images, style transfer, inpainting. Limitations: fine detail control, consistent characters, text rendering.

## Agent Architectures

LLM + tool use + planning + memory + reflection:
- **ReAct**: interleave reasoning ("I need X") with actions (call tool)
- **Tool use**: function calling lets model invoke search, calculate, API calls
- **Memory**: conversation history (short-term) + persistent knowledge (long-term)
- **Multi-agent**: specialized agents coordinating on complex tasks

## Decisions

- **AI vs traditional code**: AI for natural language, pattern recognition in unstructured data, fuzzy matching. Traditional code for deterministic rules, exact requirements, guaranteed correctness. AI doesn't replace if/else — it handles problems where you can't write the rules
- **On-device vs cloud**: on-device when privacy is critical, latency < 100ms, offline required, zero marginal cost. Cloud when model is too large, latest capabilities needed, batch processing
- **RAG vs fine-tuning**: RAG when knowledge changes frequently, source attribution needed, data is large. Fine-tune when behavior/style consistency is required, retrieval is too noisy, prompt latency is unacceptable
- **Automation vs amplification**: automate when task is repetitive, low-stakes, no human judgment needed. Amplify when reasoning should be visible, stakes are high, building user expertise matters. Default to amplification
- **Model selection**: larger for complex reasoning, nuanced generation, multi-step tasks. Smaller for classification, extraction, structured output, high-volume/low-latency

## Traps

- **AI as feature, not solution** — adding "AI-powered" to features with deterministic rules. Use deterministic code for deterministic problems
- **Hallucination denial** — treating LLM output as factual without verification. RAG reduces but doesn't eliminate it; critical outputs need validation
- **Demo-driven development** — cherry-picked inputs perform well; real-world distribution doesn't. Test adversarial and edge cases
- **Cloud default** — sending data to cloud when on-device inference is viable. Privacy, latency, and cost are non-zero for cloud
- **Fine-tuning prematurely** — before exhausting prompt engineering. Fine-tuning is slow, expensive, creates model management overhead
- **Ignoring the pipeline** — optimizing the model while neglecting preprocessing and retrieval quality. RAG output = retrieval quality × generation quality

## Connections

- **Tools for Thought** — automation vs amplification: should AI do this FOR the user or help the user do it BETTER?
- **First-Principles Reduction** — before adding AI, question whether the requirement exists; many AI features solve problems that should be deleted
- **Signal Discrimination** — AI outputs need curation; not everything generated is signal; design for human review
- **Adjacent Possible** — on-device ML makes previously impossible products viable (private transcription, offline search, real-time local processing)
- **Performance as Experience** — model inference time directly affects UX; perceptual threshold table applies to AI response latency
