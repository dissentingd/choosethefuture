// Renders the project directory from data/projects.json.
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

function renderProject(project) {
  const card = el('article', 'card project');
  card.id = project.slug;

  const title = el('h3');
  title.append(link(project.repository, project.name));
  card.append(title, el('p', null, project.summary));
  if (project.example) card.append(el('p', 'example', project.example));

  if (project.topics?.length) {
    const topics = el('ul', 'chips');
    topics.setAttribute('aria-label', 'Topics');
    project.topics.forEach((topic) => topics.append(el('li', null, topic)));
    card.append(topics);
  }

  const facts = el('dl', 'facts');
  const addFact = (term, value) => facts.append(el('dt', null, term), el('dd', null, value));
  addFact('Maintainer', `${MAINTAINER_LABELS[project.maintainer] ?? project.maintainer}, ${formatDate(project.lastConfirmed)}`);
  addFact('Agent tasks', TASK_LABELS[project.tasks] ?? project.tasks);
  addFact('License', project.license ?? 'Not chosen yet');
  card.append(facts);

  const links = el('p', 'project-links');
  links.append(link(project.repository, 'Repository'));
  if (project.website) links.append(link(project.website, 'Website'));
  card.append(links);

  (project.related ?? []).forEach((item) => {
    const related = el('p', 'related');
    related.append(link(item.url, item.label));
    if (item.note) related.append(document.createTextNode(`: ${item.note}`));
    card.append(related);
  });

  return card;
}

async function renderDirectory() {
  const list = document.getElementById('project-list');
  const status = document.getElementById('project-status');
  try {
    const response = await fetch('data/projects.json');
    if (!response.ok) throw new Error(response.statusText);
    const { projects } = await response.json();
    list.replaceChildren(...projects.map(renderProject));
    status.textContent = `${projects.length} projects listed.`;
  } catch {
    status.textContent = 'The project list could not be loaded. You can read it directly in data/projects.json.';
  }
}

renderDirectory();
