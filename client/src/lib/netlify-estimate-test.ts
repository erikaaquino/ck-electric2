type EstimateKind = 'ev' | 'panel';

const choices: Record<string, string> = {
  hardwired: 'Hardwired charger', nema: 'NEMA 14-50 receptacle',
  yes: 'Yes', no: 'No', unsure: 'Not sure',
  indoors: 'Indoors', outdoors: 'Outdoors', both: 'Indoors and outdoors',
};

// This is used only by the explicitly enabled personal-site preview.
export function netlifyTestFields(kind: EstimateKind, values: Record<string, string>, reference: string): Record<string, string> {
  const answer = (key: string) => choices[values[key]] || values[key] || 'Not provided';
  const details = kind === 'ev' ? [
    `Installation: ${answer('charger')}`,
    `Location: ${answer('location')}`,
    ...(values.charger === 'hardwired' ? [`Providing charger: ${answer('supply')}`] : []),
    `Within 10 feet of panel: ${answer('distance')}`,
  ] : [
    `Number of panels: ${answer('count')}`,
    `Location: ${answer('location')}`,
    `Existing amperage known: ${values.known === 'no' ? 'Not sure' : answer('known')}`,
    ...(values.known === 'yes' ? Array.from({ length: Math.min(6, Math.max(0, Number(values.count) || 0)) }, (_, i) =>
      `Panel ${i + 1}: ${values[`amps${i}`] === 'other' ? values[`other${i}`] : values[`amps${i}`]} amps`) : []),
  ];
  const visits = kind === 'ev' && values.distance !== 'yes'
    ? [0, 1, 2].map(i => `${values[`date${i}`]}: ${values[`from${i}`]}–${values[`to${i}`]} Pacific time`).join('\n')
    : 'Not requested';
  return {
    'form-name': kind === 'ev' ? 'estimate-ev-test' : 'estimate-panel-test',
    'Notice': 'TEST ONLY — no estimate was sent to WordPress or Housecall Pro.',
    'Request': kind === 'ev' ? 'EV charger' : 'Panel replacement',
    'Customer': [values.first, values.last].filter(Boolean).join(' '),
    'Phone': values.phone || '',
    'Email': values.email || '',
    'Service address': [values.street, values.unit, values.city, values.state, values.zip].filter(Boolean).join(', '),
    'Project details': details.join('\n'),
    'Visit preferences': visits,
    'Additional comments': values.comments || 'None',
    'Test time (Pacific)': new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', dateStyle: 'full', timeStyle: 'short' }).format(new Date()),
    'Reference': reference,
  };
}

export async function sendNetlifyTestNotification(kind: EstimateKind, values: Record<string, string>, reference: string) {
  const response = await fetch('/estimate-notification-test.html', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(netlifyTestFields(kind, values, reference)).toString(),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error('Netlify did not accept the test submission');
}
