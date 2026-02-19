---
path: '/always-on-claude-agent'
date: '2026-02-19'
title: 'Your AI Coworker That Never Clocks Out: Building an Always-On Claude Agent'
description: 'How to turn Claude Code into a persistent background agent that messages you, controls your browser, manages tasks, and runs automations — all while you sleep.'
tags: ['AI', 'Automation', 'Claude', 'Productivity']
excerpt: 'What if Claude could message you instead of waiting to be asked? Here is how to build an always-on AI agent that works while you are away from your keyboard.'
image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&h=630&fit=crop'
time: '7 min.'
---

Most people use Claude the same way they use a search engine: they open it, type something, get an answer, and close the tab. The interaction is reactive. You initiate, Claude responds.

But there is a different way to work with Claude that flips this dynamic entirely. Instead of a chatbot you talk to, imagine a coworker who sits at a desk in your home, has access to your computer, and quietly gets things done whether you are around or not. That is what an always-on Claude agent looks like in practice.

In my [previous post on CI/CD guardrails for AI agents](/ci-cd-guardrails-for-ai-agents), I wrote about how to catch the mistakes AI-generated code can make. This post is about the flip side: how to give that AI a persistent environment so it can do more than just write code snippets on demand.

## What "always-on" actually means

The core idea is straightforward. Claude Code runs as a daemon on a dedicated machine — typically a Mac Mini — that never sleeps. You connect to it through Telegram. This means Claude can:

- **Message you proactively** on a schedule, not just when you ask
- **Control a browser** to research, QA, or monitor websites without you at the keyboard
- **Run background scripts and automations** that keep working when you close your laptop
- **Be reached from anywhere** — your phone, tablet, or even Apple Watch

The machine could be a Mac Mini you own, or a virtual Mac you rent for around $25/month. The key is that it is always powered on and connected to the internet.

## Setting it up

The setup boils down to three moving parts: the Claude agent itself, Telegram as the messaging interface, and the host machine that keeps everything running.

### 1. Install Claude Code

First, make sure you have Node.js installed, then run:

```bash
npm install -g @anthropic-ai/claude-code
```

When the installer asks how you want to authenticate, choose the option that uses your existing Claude Code CLI subscription. Then authorize via the browser prompt.

### 2. Connect Telegram

Telegram is the interface you will use to talk to your agent from your phone. Open Telegram and message `@BotFather` to create a new bot. Copy the bot token it gives you, paste it into the Claude agent setup, and choose Telegram as your messaging channel.

Now you have a chat thread where you can send Claude messages from anywhere in the world.

### 3. Keep the machine awake

A Mac that goes to sleep is useless as a server. Open **System Settings → Energy** and turn on:

- _Prevent automatic sleep while display is off_
- _Start up automatically after power failure_

Then ask Claude to run this in a terminal to prevent screen lock:

```bash
caffeinate -d &
```

Claude will confirm it is running. Your machine will now stay awake indefinitely.

## Use case 1: Proactive daily check-ins

The most immediately useful thing you can do is set up a cron job that makes Claude message _you_ instead of waiting to be asked.

In your Telegram chat, just tell it:

> "Send me a message every day at 8:30am asking for my top three priorities. At 10pm, ask me what I got done and what I did not. Keep a running log."

Claude will configure the cron job, remember your instructions, and start the loop the next morning. I have been using this for a few weeks now and the accountability alone has been worth the setup time.

You can send your replies as voice notes too. Enable the transcription skill by adding an OpenAI API key in the agent settings, and Claude will transcribe and process your audio messages automatically.

## Use case 2: Browser automation

The agent ships with a Chrome extension that lets Claude control your browser. Once you load it (Claude can open the right Finder folder and walk you through loading an unpacked extension in developer mode), you can ask things like:

> "Go to my website, click every link in the footer, and tell me which ones are broken."

Claude will open Chrome, navigate the site, click through the links, and report back in Telegram — all without you touching the keyboard. I use this for periodic QA checks. You can also point it at competitor sites, pricing pages, or anything else you want to monitor.

## Use case 3: Task management integration

Claude can act as your project manager if you connect it to a tool like ClickUp. Tell it to:

> "Whenever I ask you to do something, log a task in ClickUp and mark it complete when you are done."

You give Claude access by having it find the ClickUp API key (it can open Chrome and navigate to the settings page itself), then ask it to build and save a skill so it remembers how to do this forever:

> "Create a ClickUp skill and save it to your skills file so you always have it."

After that, everything Claude does shows up as a trackable task. You get visibility into what it is working on, what is in progress, and what is done.

## Use case 4: Automated email handling

One of the more impressive setups: give Claude its own email address using a service like AgentMail, then tell it your negotiation rules. For example:

> "Whenever I forward you a sponsorship email, draft a response based on my rates. Always ask me for approval before sending anything."

From then on, you forward an email, Claude drafts a reply, pings you in Telegram for the go-ahead, and sends it. The back-and-forth that used to take you hours of context-switching becomes a quick approval tap on your phone.

## The underlying shift

What makes this pattern interesting is not any single use case. It is the architecture change underneath: Claude now has a persistent home. Scripts it writes do not disappear when you close a terminal tab. Automations it builds keep running. Memory it accumulates stays in place.

This is meaningfully different from using Claude as a coding assistant inside an editor. An always-on agent is closer to a junior employee who happens to be available 24 hours a day, never forgets an instruction, and can work in parallel on multiple tasks.

The tradeoff is that you need to treat it like a coworker too. Check in on what it is doing. When it gets stuck (and it will), step in and unstick it. The agent is only as reliable as the instructions you give it and the oversight you apply.

The question I keep asking myself is not "what can I offload to this agent?" It is "what would I actually trust it to handle on its own?" That boundary is moving pretty quickly.
