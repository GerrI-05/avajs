import test, {ExecutionContext, Macro} from '../..';

// Explicitly type as a macro.
{
	const hasLength: Macro<[string, number]> = (t, expected, length) => {
		t.is(expected.length, length);
	};

	test('bar has length 3', hasLength, 'bar', 3);
	test('bar has length 3', [hasLength], 'bar', 3);
}

// Infer macro
{
	const hasLength = (t: ExecutionContext, expected: string, length: number) => {
		t.is(expected.length, length);
	};

	test('bar has length 3', hasLength, 'bar', 3);
	test('bar has length 3', [hasLength], 'bar', 3);
}

// Multiple macros
{
	const hasLength = (t: ExecutionContext, expected: string, length: number) => {
		t.is(expected.length, length);
	};
	const hasCodePoints = (t: ExecutionContext, expected: string, length: number) => {
		t.is(Array.from(expected).length, length);
	};

	test('bar has length 3', [hasLength, hasCodePoints], 'bar', 3);
}

// No title
{
	const hasLength: Macro<[string, number]> = (t, expected, length) => {
		t.is(expected.length, length);
	};
	const hasCodePoints: Macro<[string, number]> = (t, expected, length) => {
		t.is(Array.from(expected).length, length);
	};

	test(hasLength, 'bar', 3);
	test([hasLength, hasCodePoints], 'bar', 3);
}
