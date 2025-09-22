// Utilities for loading and transforming logs.json
import externalLogs from './logs.json';

export function getLogs() {
  return Array.isArray(externalLogs) ? externalLogs : [];
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

export function formatBuildStartTime(build) {
  const buildTimes = build?.build_times?.[0];
  if (!buildTimes) return 'N/A';
  
  // Get the first build's start_time from the build_times array
  const firstBuild = Object.values(buildTimes)[0];
  const startTime = firstBuild?.start_time;
  if (!startTime) return 'N/A';
  
  try {
    // Fix the timestamp format - remove extra digits from milliseconds
    let fixedTime = startTime;
    if (fixedTime.includes('T') && fixedTime.includes(':')) {
      // Handle format like "2025-09-21T21:28:072" -> "2025-09-21T21:28:07.200Z"
      const parts = fixedTime.split('T');
      if (parts.length === 2) {
        const timePart = parts[1];
        const timeParts = timePart.split(':');
        if (timeParts.length === 3) {
          const seconds = timeParts[2];
          if (seconds.length > 2) {
            // Take only first 2 digits for seconds, rest as milliseconds
            const secs = seconds.substring(0, 2);
            const millis = seconds.substring(2).padEnd(3, '0').substring(0, 3);
            fixedTime = `${parts[0]}T${timeParts[0]}:${timeParts[1]}:${secs}.${millis}Z`;
          } else {
            fixedTime = `${parts[0]}T${timePart}Z`;
          }
        }
      }
    }
    
    // Parse the timestamp and convert to IST
    const date = new Date(fixedTime);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    
    const istDate = new Date(date.getTime() + (5.5 * 60 * 60 * 1000)); // Add 5.5 hours for IST
    
    return istDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }) + ' ' + istDate.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }) + ' IST';
  } catch (e) {
    return 'N/A';
  }
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
  const TOTAL_TESTS = getTotalTests(build);
  const impacted = isAiBuild(build) ? countImpactedTests(build) : TOTAL_TESTS;
  return [
    { name: 'Total', count: TOTAL_TESTS },
    { name: 'Impacted', count: impacted },
  ];
}

export function getTotalTests(build) {
  const fromBuild = toNumber(build?.total_tests);
  if (fromBuild > 0) return fromBuild;
  const fromTestTime = toNumber(build?.test_time?.total_tests);
  if (fromTestTime > 0) return fromTestTime;
  return 49;
}


