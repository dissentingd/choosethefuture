// Renders the project directory and project pages from data/projects.json.
const MAINTAINER_LABELS = {
  'maintainer-confirmed': 'Maintainer-confirmed',
  'community-submitted': 'Community-submitted',
  'not-recently-confirmed': 'Not recently confirmed',
};
const TASK_LABELS = {
  'not-accepting': 'Not accepting tasks yet',
  'accepting': 'Accepting agent tasks',
  'paused': 'Paused',
};
const GOAL_LABELS = {
  proposed: 'Proposed',
  active: 'Active',
  paused: 'Paused',
  blocked: 'Blocked',
  complete: 'Complete',
};
const ISSUES_URL = 'https://github.com/dissentingd/choosethefuture/issues/new';

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function link(href, text) {
  const a = el('a', null, text);
  a.href = href;
  return a;
}

function formatDate(iso) {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function projectUrl(project) {
  return `project.html?id=${encodeURIComponent(project.slug)}`;
}

function reportUrl(project) {
  return `${ISSUES_URL}?template=report-listing.yml&project=${encodeURIComponent(project.slug)}`;
}

function renderTopics(project) {
  const topics = el('ul', 'chips');
  topics.setAttribute('aria-label', 'Topics');
  (project.topics ?? []).forEach((topic) => topics.append(el('li', null, topic)));
  return topics;
}

function renderFacts(project) {
  const facts = el('dl', 'facts');
  const addFact = (term, value) => facts.append(el('dt', null, term), el('dd', null, value));
  addFact('Maintainer', `${MAINTAINER_LABELS[project.maintainer] ?? project.maintainer}, ${formatDate(project.lastConfirmed)}`);
  addFact('Agent tasks', TASK_LABELS[project.tasks] ?? project.tasks);
  addFact('License', project.license ?? 'Not chosen yet');
  return facts;
}

function renderRelated(project) {
  return (project.related ?? []).map((item) => {
    const related = el('p', 'related');
    related.append(link(item.url, item.label));
    if (item.note) related.append(document.createTextNode(`: ${item.note}`));
    return related;
  });
}

function renderProject(project) {
  const card = el('article', 'card project');
  card.id = project.slug;

  const title = el('h3');
  title.append(link(projectUrl(project), project.name));
  card.append(title, el('p', null, project.summary));
  if (project.example) card.append(el('p', 'example', project.example));
  if (project.topics?.length) card.append(renderTopics(project));
  card.append(renderFacts(project));

  const links = el('p', 'project-links');
  links.append(link(projectUrl(project), 'Project page'), link(project.repository, 'Repository'));
  if (project.website) links.append(link(project.website, 'Website'));
  card.append(links, ...renderRelated(project));

  return card;
}

function renderSection(eyebrow, heading, ...children) {
  const section = el('section');
  const head = el('div', 'section-heading');
  const titles = el('div');
  titles.append(el('span', 'eyebrow', eyebrow), el('h2', null, heading));
  head.append(titles);
  section.append(head, ...children);
  return section;
}

function renderGoal(goal) {
  const card = el('article', 'card');
  card.append(el('span', 'goal-status', GOAL_LABELS[goal.status] ?? goal.status), el('h3', null, goal.title), el('p', null, goal.outcome));
  if (goal.source) {
    const source = el('p', 'project-links');
    source.append(link(goal.source, 'Source'));
    card.append(source);
  }
  return card;
}

function renderGuidance(project) {
  const guidance = project.guidance ?? {};
  const cards = el('div', 'cards');

  const policy = el('article', 'card');
  policy.append(el('h3', null, 'Agent work'), el('p', null, guidance.agentPolicy ?? TASK_LABELS[project.tasks]));
  if (guidance.policyLink) {
    const more = el('p', 'project-links');
    more.append(link(guidance.policyLink, 'Read the policy'));
    policy.append(more);
  }
  cards.append(policy);

  if (guidance.exclusions?.length) {
    const avoid = el('article', 'card');
    const list = el('ul');
    guidance.exclusions.forEach((item) => list.append(el('li', null, item)));
    avoid.append(el('h3', null, 'Areas to avoid'), list);
    cards.append(avoid);
  }

  const contribute = el('article', 'card');
  contribute.append(el('h3', null, 'Contribution guide'));
  if (guidance.contributing) {
    const guide = el('p', 'project-links');
    guide.append(link(guidance.contributing, 'Read the guide'));
    contribute.append(guide);
  } else {
    contribute.append(el('p', null, 'This project has no separate guide yet. Start with its repository.'));
  }
  cards.append(contribute);

  const report = el('article', 'card');
  const reportLink = el('p', 'project-links');
  reportLink.append(link(reportUrl(project), 'Report this listing'));
  report.append(el('h3', null, 'Something wrong here?'), el('p', null, `Last reviewed ${formatDate(project.lastConfirmed)}. Tell us if this page is stale, incorrect, or unwanted.`), reportLink);
  cards.append(report);

  return cards;
}

function renderProjectPage(project, root) {
  document.title = `${project.name} — ChooseTheFuture`;

  const hero = el('section', 'page-hero');
  const back = el('p', 'back');
  back.append(link('projects.html', '← All projects'));
  const heading = el('h1', null, project.name);
  heading.id = 'page-title';
  hero.append(back, el('span', 'status', 'The pilot isn\'t open yet, so this project isn\'t accepting agent tasks.'), el('br'), el('span', 'eyebrow', 'Project'), heading, el('p', 'intro', project.summary));

  const about = el('div', 'cards');
  const what = el('article', 'card project');
  what.append(el('h3', null, 'What it does'), el('p', null, project.description));
  if (project.example) what.append(el('p', 'example', project.example));
  what.append(renderTopics(project));
  const why = el('article', 'card project');
  const links = el('p', 'project-links');
  links.append(link(project.repository, 'Repository'));
  if (project.website) links.append(link(project.website, 'Website'));
  why.append(el('h3', null, 'Why people care'), el('p', null, project.whyItMatters), renderFacts(project), links, ...renderRelated(project));
  about.append(what, why);

  const goals = project.goals?.length
    ? (() => { const list = el('div', 'cards'); list.append(...project.goals.map(renderGoal)); return list; })()
    : el('p', 'section-copy', 'This project hasn\'t published goals here yet.');

  const help = el('div', 'cards');
  const support = el('article', 'card');
  support.append(el('h3', null, 'Show support'), el('p', null, 'Voting isn\'t open yet. For now, follow or star the repository, and share this page with people who\'d care.'));
  const agent = el('article', 'card');
  const agentLinks = el('p', 'project-links');
  agentLinks.append(link('contributors.html', 'How contributing will work'));
  agent.append(el('h3', null, 'Lend your agent'), el('p', null, 'Once the connector and pilot are ready, you\'ll be able to switch this project on if its maintainer has approved tasks.'), agentLinks);
  help.append(support, agent);

  root.replaceChildren(
    hero,
    renderSection('About', 'What this project is.', about),
    renderSection('Goals', 'What it\'s working toward.', goals),
    renderSection('Take part', 'How to help.', help),
    renderSection('Guidance', 'Project guidance.', renderGuidance(project)),
  );
}

async function loadProjects() {
  const response = await fetch('data/projects.json');
  if (!response.ok) throw new Error(response.statusText);
  return (await response.json()).projects;
}

async function renderDirectory(list) {
  const status = document.getElementById('project-status');
  try {
    const projects = await loadProjects();
    list.replaceChildren(...projects.map(renderProject));
    status.textContent = `${projects.length} projects listed.`;
  } catch {
    status.textContent = 'The project list could not be loaded. You can read it directly in data/projects.json.';
  }
}

async function renderDetail(root) {
  const missing = (message) => {
    const section = el('section', 'page-hero');
    const back = el('p', 'back');
    back.append(link('projects.html', '← All projects'));
    section.append(back, el('h1', null, 'Project not found'), el('p', 'intro', message));
    root.replaceChildren(section);
  };
  try {
    const projects = await loadProjects();
    const id = new URLSearchParams(location.search).get('id');
    const project = projects.find((item) => item.slug === id);
    if (project) renderProjectPage(project, root);
    else missing('We don\'t have a listing at this address. It may have moved or been removed.');
  } catch {
    missing('The project list could not be loaded. Please try again.');
  }
}

const directory = document.getElementById('project-list');
const detail = document.getElementById('project-detail');
if (directory) renderDirectory(directory);
if (detail) renderDetail(detail);
