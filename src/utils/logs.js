// Utilities for loading and transforming logs.json

export async function fetchLogs() {
  const response = await fetch(process.env.PUBLIC_URL + '/logs.json');
  if (!response.ok) throw new Error('Failed to load logs.json');
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

export function getBuildLabel(build) {
  return build?.type === 'AI BUILD' ? 'AI' : 'NORMAL';
}

export function computeTotals(build) {
  const buildDurations = sumBuildDurations(build?.build_times);
  const testSeconds = toNumber(build?.test_time?.duration_seconds);
  const llmSeconds = toNumber(build?.llm_time?.duration_seconds);
  return {
    buildSeconds: buildDurations,
    testSeconds,
    llmSeconds,
    totalSeconds: buildDurations + testSeconds + llmSeconds,
  };
}

export function sumBuildDurations(buildTimesArray) {
  if (!Array.isArray(buildTimesArray) || buildTimesArray.length === 0) return 0;
  const obj = buildTimesArray[0] || {};
  return Object.values(obj).reduce((acc, val) => acc + toNumber(val?.duration_seconds), 0);
}

export function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export function formatSeconds(secs) {
  const s = Math.round(secs);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const r = s % 60;
  return r ? `${m}m ${r}s` : `${m}m`;
}

export function prettifyPath(path) {
  if (!path) return '';
  return path.replace(/^[A-Za-z]:\\\\?/,'').replace(/\\/g,'/');
}

export function parseImpactedTests(build) {
  const items = Array.isArray(build?.impacted_tests) ? build.impacted_tests : [];
  return items.map((it, idx) => {
    const tests = String(it?.test || '')
      .split('|')
      .map(t => t.trim())
      .filter(Boolean);
    return {
      id: `${build?.id || 'b'}-${idx}`,
      file: prettifyPath(it?.file || ''),
      tests,
      explanation: it?.explanation || '',
    };
  });
}

export function countImpactedTests(build) {
  return parseImpactedTests(build).reduce((acc, it) => acc + it.tests.length, 0);
}

export function computeMeans(builds) {
  if (!Array.isArray(builds) || !builds.length) {
    return { build: 0, test: 0, llm: 0, total: 0 };
  }
  const sums = builds.reduce(
    (acc, b) => {
      const totals = computeTotals(b);
      acc.build += totals.buildSeconds;
      acc.test += totals.testSeconds;
      acc.llm += totals.llmSeconds;
      acc.total += totals.totalSeconds;
      return acc;
    },
    { build: 0, test: 0, llm: 0, total: 0 }
  );
  const n = builds.length;
  return { build: sums.build / n, test: sums.test / n, llm: sums.llm / n, total: sums.total / n };
}

export function isAiBuild(build) {
  return String(build?.type || '').toUpperCase().includes('AI');
}

export function chipColorForBuild(buildOrType) {
  const type = typeof buildOrType === 'string' ? buildOrType : buildOrType?.type;
  return String(type || '').toUpperCase().includes('AI') ? 'success' : 'primary';
}

export function buildDonutData(build) {
  const totals = computeTotals(build);
  return [
    { name: 'Build', value: totals.buildSeconds },
    { name: 'Test', value: totals.testSeconds },
    { name: 'LLM', value: totals.llmSeconds },
  ];
}

export function buildBarData(build) {
  const TOTAL_TESTS = 49;
  const impacted = isAiBuild(build) ? countImpactedTests(build) : TOTAL_TESTS;
  return [
    { name: 'Total', count: TOTAL_TESTS },
    { name: 'Impacted', count: impacted },
  ];
}


