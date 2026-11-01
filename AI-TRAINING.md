# AI training and AI-assisted development

This file does not change ChooseTheFuture's licenses. It explains how they apply to AI model training, and sets out our policy for AI-assisted development and for requesting permission. The licenses themselves are [`LICENSE`](LICENSE) (PolyForm Noncommercial 1.0.0, for source code) and [`LICENSE-CONTENT`](LICENSE-CONTENT) (CC BY-NC 4.0, for everything else).

**In short:** noncommercial training is already permitted. Commercial training isn't licensed and needs prior written permission. AI-assisted development with provider-side training off is welcome through the ChooseTheFuture Connector only, because the connector enforces that setting. AI-assisted development outside the connector needs written permission.

## Noncommercial training is permitted

Both licenses permit noncommercial use, and that includes training, fine-tuning, or evaluating machine-learning models for noncommercial purposes as the licenses define them: personal use, research, education, and charitable or other noncommercial organisations. The licenses' other conditions, such as attribution, still apply.

## Commercial training is not licensed

Neither license grants commercial use. Training, fine-tuning, distilling, or evaluating a model on this repository, or including it in a dataset or training corpus, by, for, or on behalf of a commercial organisation or a commercially offered product or service, is commercial use. That includes an AI provider training on material users send to its services.

Commercial training therefore needs express prior written permission from David Borowski II. To ask, open an issue in this repository titled **"AI training permission request"** and state:

1. The organisation and the people acting on its behalf.
2. The account and provider setup that will process the material.
3. Whether processing runs locally or in hosted environments.
4. The training, data-retention, and transcript- or data-sharing settings that apply.
5. Which parts of the repository are involved, what will be trained, and for what purpose.

Permission exists only when granted in writing, and covers only the material, purposes, and processing it names. No reply is not permission.

## AI-assisted development: through the connector, or with written permission

**Through the ChooseTheFuture Connector.** AI-assisted development with provider-side training off is welcome through the connector. Before running a task, the connector checks the contributor's provider configuration on their own machine against this policy, and declines the task if training could be on or the setting can't be confirmed. Projects that take part in ChooseTheFuture can declare their own training policy the same way.

**Outside the connector.** Using AI coding tools or agents on this repository any other way needs prior written permission, because nothing else enforces that provider-side training is off. Ask by opening an issue titled **"AI-assisted development permission request"** with the same five disclosures listed above. As with training, permission exists only when granted in writing, and covers only what it names.

Sending this material to a service that will train on it commercially would make it available for a use the licenses don't grant.

## Other commercial use

Other commercial use of this repository is outside both licenses and also needs permission. Ask in the same way, by opening an issue.
