# coding: utf-8
"""
Test comprehensivo de ejercicios usando initial_code + solution_code.
Esto simula cómo la app realmente ejecuta el código del usuario.
"""
import subprocess
import json
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

def run_combined(initial_code, solution_code, test_code):
    """
    Runs initial_code + solution_code, then test_code.
    __source__ is set to solution_code (what user wrote).
    Returns (success, error)
    """
    # Combine: initial + solution_code
    full_exec = f"{initial_code or ''}\n{solution_code or ''}"
    
    full_code = f"""
{full_exec}

__source__ = {repr(solution_code or '')}

{test_code or ''}
""".strip()
    
    try:
        result = subprocess.run(
            [sys.executable, "-c", full_code],
            capture_output=True,
            timeout=5,
            encoding='utf-8',
            errors='replace'
        )
        if result.returncode == 0:
            return True, None
        else:
            return False, (result.stderr or '').strip()
    except subprocess.TimeoutExpired:
        return False, "TIMEOUT"
    except Exception as e:
        return False, str(e)

def simulate_output(initial_code, solution_code):
    """Runs initial_code + solution_code and captures output."""
    full_code = f"{initial_code or ''}\n{solution_code or ''}".strip()
    try:
        result = subprocess.run(
            [sys.executable, "-c", full_code],
            capture_output=True,
            timeout=5,
            encoding='utf-8',
            errors='replace'
        )
        return (result.stdout or ''), (result.stderr or '').strip() if result.returncode != 0 else None
    except subprocess.TimeoutExpired:
        return "", "TIMEOUT"
    except Exception as e:
        return "", str(e)

def main():
    with open("exercises_dump.json", "r", encoding="utf-8") as f:
        exercises = json.load(f)

    print(f"Testing {len(exercises)} exercises with initial_code + solution_code...\n")
    
    test_failures = []
    output_mismatches = []
    solution_errors = []

    for ex in exercises:
        ex_id = ex.get("id")
        lesson_id = ex.get("lesson_id")
        title = ex.get("title", "")
        initial_code = ex.get("initial_code", "") or ""
        solution_code = ex.get("solution_code", "") or ""
        test_code = ex.get("test_code", "") or ""
        output_check = ex.get("output_check", "") or ""

        if not solution_code.strip():
            continue

        # Skip file I/O exercises (they need real files)
        if "FileNotFoundError" in title or any(kw in solution_code for kw in ["open('", 'open("', 'json.load', 'json.dump']):
            continue

        if test_code.strip():
            success, error = run_combined(initial_code, solution_code, test_code)
            if not success:
                # Check if this is a file-related error (expected)
                if error and ('FileNotFoundError' in error or 'No such file' in error):
                    continue
                test_failures.append({
                    "id": ex_id, "lesson_id": lesson_id, "title": title,
                    "error": error,
                    "solution_code": solution_code[:200],
                    "test_code": test_code[:300],
                })
        elif output_check.strip():
            output, err = simulate_output(initial_code, solution_code)
            if err and 'FileNotFoundError' not in err:
                solution_errors.append({"id": ex_id, "lesson_id": lesson_id, "title": title, "error": err[:200]})
            elif output is not None:
                clean_output = output.replace('\r\n', '\n').rstrip('\n')
                clean_expected = output_check.replace('\r\n', '\n').rstrip('\n')
                if clean_output != clean_expected:
                    output_mismatches.append({
                        "id": ex_id, "lesson_id": lesson_id, "title": title,
                        "expected": repr(clean_expected),
                        "got": repr(clean_output),
                    })

    print(f"\n[RESULT] test_code fails with correct solution: {len(test_failures)}")
    print(f"[RESULT] output_check mismatch: {len(output_mismatches)}")
    print(f"[RESULT] solution_code errors: {len(solution_errors)}")

    if test_failures:
        print("\n--- TEST_CODE FAILURES ---")
        for f in test_failures:
            print(f"\n[{f['id']}] L{f['lesson_id']} - {f['title']}")
            print(f"  Error: {(f['error'] or '').split(chr(10))[-1]}")

    if output_mismatches:
        print("\n--- OUTPUT_CHECK MISMATCHES ---")
        for m in output_mismatches:
            print(f"\n[{m['id']}] L{m['lesson_id']} - {m['title']}")
            print(f"  Expected: {m['expected']}")
            print(f"  Got:      {m['got']}")

    if solution_errors:
        print("\n--- SOLUTION ERRORS ---")
        for e in solution_errors:
            print(f"\n[{e['id']}] L{e['lesson_id']} - {e['title']}")
            print(f"  Error: {e['error'].split(chr(10))[-1]}")

    results = {"test_failures": test_failures, "output_mismatches": output_mismatches, "solution_errors": solution_errors}
    with open("exercises_combined_results.json", "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    print(f"\nResults saved to exercises_combined_results.json")

if __name__ == "__main__":
    main()
