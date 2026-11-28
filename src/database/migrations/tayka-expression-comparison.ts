// Compare declarative CHECK and index predicates with PostgreSQL's deparsed spelling.
// This reader covers the expressions in the model and never sends text to PostgreSQL.
type Expr = string | [string, ...Expr[]];

const tokenPattern =
  /\s+|'(?:[^']|'')*'|"(?:[^"]|"")*"|::|>=|<=|<>|!=|[a-z_][a-z_0-9]*|\d+(?:\.\d+)?|[()[\],=<>+*/-]/giy;

export function equivalentExpression(
  expected: string | undefined,
  actual: string | undefined,
  columnTypes: ReadonlyMap<string, string>,
): boolean {
  if (expected === actual) return true;
  if (!expected || !actual) return false;
  try {
    return (
      JSON.stringify(parse(expected, columnTypes)) ===
      JSON.stringify(parse(actual, columnTypes))
    );
  } catch {
    return false;
  }
}

function parse(input: string, columnTypes: ReadonlyMap<string, string>): Expr {
  const tokens: string[] = [];
  let offset = 0;
  while (offset < input.length) {
    tokenPattern.lastIndex = offset;
    const token = tokenPattern.exec(input)?.[0];
    if (!token) throw new Error('Unsupported token');
    offset += token.length;
    if (token.trim())
      tokens.push(/^['"]/.test(token) ? token : token.toLowerCase());
  }

  let cursor = 0;
  const look = () => tokens[cursor];
  const read = () => {
    const token = tokens[cursor++];
    if (token === undefined) throw new Error('Unexpected end of expression');
    return token;
  };
  const take = (token: string) => {
    if (look() !== token) return false;
    cursor++;
    return true;
  };
  const expect = (token: string) => {
    if (!take(token)) throw new Error('Expected ' + token);
  };

  function logicLevel(operator: 'and' | 'or', next: () => Expr): Expr {
    let node = next();
    while (take(operator)) node = logic(operator, node, next());
    return node;
  }

  function logic(operator: 'and' | 'or', left: Expr, right: Expr): Expr {
    const unwrap = (value: Expr) =>
      Array.isArray(value) && value[0] === operator ? value.slice(1) : [value];
    return [operator, ...unwrap(left), ...unwrap(right)];
  }

  function list(end: string): Expr[] {
    const values: Expr[] = [];
    if (take(end)) return values;
    do values.push(disjunction());
    while (take(','));
    expect(end);
    return values;
  }

  function disjunction(): Expr {
    return logicLevel('or', () => logicLevel('and', predicate));
  }

  function membership(column: Expr, choices: Expr[]): Expr {
    return [
      'in',
      column,
      ...choices.sort((a, b) =>
        JSON.stringify(a).localeCompare(JSON.stringify(b)),
      ),
    ];
  }

  function predicate(): Expr {
    const left = arithmetic();
    if (take('is')) {
      const not = take('not');
      expect('null');
      return [not ? 'is not null' : 'is null', left];
    }
    if (take('between')) {
      const min = arithmetic();
      expect('and');
      const max = arithmetic();
      return ['and', ['>=', left, min], ['<=', left, max]];
    }
    if (take('in')) {
      expect('(');
      return membership(left, list(')'));
    }
    if (['=', '<>', '!=', '>', '<', '>=', '<='].includes(look())) {
      const operator = read();
      if (operator === '=' && take('any')) {
        expect('(');
        const array = disjunction();
        expect(')');
        if (!Array.isArray(array) || array[0] !== 'array')
          throw new Error('Expected constant array');
        return membership(left, array.slice(1));
      }
      return [operator === '!=' ? '<>' : operator, left, arithmetic()];
    }
    return left;
  }

  function arithmetic(): Expr {
    let node = product();
    while (look() === '+' || look() === '-') node = [read(), node, product()];
    return node;
  }

  function product(): Expr {
    let node = operand();
    while (look() === '*' || look() === '/') node = [read(), node, operand()];
    return node;
  }

  function operand(): Expr {
    let value = atom();
    while (take('::')) {
      let cast = read();
      if (cast === 'character' && take('varying')) cast = 'character varying';
      if (take('[')) {
        expect(']');
        if (
          !['text', 'character varying'].includes(cast) ||
          !Array.isArray(value) ||
          value[0] !== 'array' ||
          value
            .slice(1)
            .some(
              (entry) => typeof entry !== 'string' || !entry.startsWith("'"),
            )
        ) {
          value = ['cast', value, cast + '[]'];
        }
      } else if (
        cast === 'interval' &&
        typeof value === 'string' &&
        value.startsWith("'")
      ) {
        value = ['interval', value];
      } else if (!implicitCast(value, cast)) {
        value = ['cast', value, cast];
      }
    }
    return value;
  }

  function implicitCast(value: Expr, cast: string): boolean {
    if (typeof value !== 'string') return false;
    if (['text', 'character varying'].includes(cast)) {
      return (
        value.startsWith("'") ||
        ['text', 'character varying'].includes(columnTypes.get(value) ?? '')
      );
    }
    return (
      ['numeric', 'smallint', 'integer', 'bigint'].includes(cast) &&
      /^-?\d+(?:\.\d+)?$/.test(value)
    );
  }

  function atom(): Expr {
    if (take('(')) {
      const value = disjunction();
      expect(')');
      return value;
    }
    if (take('-')) {
      const value = read();
      if (!/^\d+(?:\.\d+)?$/.test(value))
        throw new Error('Unsupported negative value');
      return '-' + value;
    }
    const value = read();
    if (value === 'interval') return ['interval', read()];
    if (value === 'array') {
      expect('[');
      return ['array', ...list(']')];
    }
    if (take('(')) {
      if (value === 'trim') {
        if (take('both')) expect('from');
        return ['trim', ...list(')')];
      }
      return [value, ...list(')')];
    }
    return value.startsWith('"')
      ? value.slice(1, -1).replaceAll('""', '"')
      : value;
  }

  const value = disjunction();
  if (look() !== undefined) throw new Error('Unsupported expression tail');
  return value;
}
