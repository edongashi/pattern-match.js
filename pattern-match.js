function match(data, pattern) {
  if (data == pattern) {
    return true
  }

  if (pattern instanceof RegExp) {
    if (typeof data === 'string') {
      return pattern.test(data)
    } else {
      return false
    }
  }

  if (typeof pattern === 'function') {
    return !!pattern(data)
  }

  if (Array.isArray(pattern)) {
    return pattern.some(subpattern => match(data, subpattern))
  }

  if (pattern && typeof pattern === 'object') {
    if (!data || typeof data !== 'object') {
      return false
    }

    for (const [key, subpattern] of Object.entries(pattern)) {
      if (!match(data[key], subpattern)) {
        return false
      }
    }

    return true
  }

  return false
}

match.not = (pattern) => (data) => !match(data, pattern)
match.predicate = (pattern) => (data) => match(data, pattern)

module.exports = { 
  match,
  not: match.not,
  predicate: match.predicate
}
