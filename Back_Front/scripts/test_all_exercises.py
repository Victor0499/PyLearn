"""
Script de analisis completo de ejercicios de PyLearn.
Ejecuta el solution_code + test_code de cada ejercicio para detectar
ejercicios que fallan aunque la solucion sea correcta.

Uso: python scripts/test_all_exercises.py
"""
import subprocess
import json
import sys
import os
import tempfile

# Force UTF-8 output for this script
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

def run_python_code(solution_code, test_code):
    """
    Runs solution_code then test_code in an isolated Python subprocess.
    Returns (success: bool, error: str or None)
    """
    full_code = f"""{solution_code}

__source__ = {repr(solution_code)}

{test_code}
"""
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
            err = (result.stderr or '').strip()
            return False, err
    except subprocess.TimeoutExpired:
        return False, "TIMEOUT"
    except Exception as e:
        return False, str(e)

def simulate_output(solution_code):
    """
    Runs solution_code and captures its stdout output.
    Returns (output: str, error: str or None)
    """
    try:
        result = subprocess.run(
            [sys.executable, "-c", solution_code],
            capture_output=True,
            timeout=5,
            encoding='utf-8',
            errors='replace'
        )
        output = result.stdout or ''
        err = (result.stderr or '').strip() if result.returncode != 0 else None
        return output, err
    except subprocess.TimeoutExpired:
        return "", "TIMEOUT"
    except Exception as e:
        return "", str(e)

def main():
    # Load exercises
    with open("exercises_dump.json", "r", encoding="utf-8") as f:
        exercises = json.load(f)

    print(f"Analizando {len(exercises)} ejercicios...\n")
    
    failures = []   # test_code fails when running solution_code
    output_mismatches = []  # output_check doesn't match solution output
    no_validation = []  # no test_code and no output_check (free pass)
    errors_in_solution = []  # solution_code itself throws an error
    
    skipped_no_solution = 0

    for ex in exercises:
        ex_id = ex.get("id")
        lesson_id = ex.get("lesson_id")
        title = ex.get("title", "")
        solution_code = ex.get("solution_code", "")
        test_code = ex.get("test_code", "")
        output_check = ex.get("output_check", "")

        if not solution_code or not solution_code.strip():
            skipped_no_solution += 1
            continue

        # --- Check 1: Does solution_code produce any Python errors? ---
        if test_code:
            success, error = run_python_code(solution_code, test_code)
            if not success:
                failures.append({
                    "id": ex_id,
                    "lesson_id": lesson_id,
                    "title": title,
                    "error": error,
                    "solution_code": solution_code,
                    "test_code": test_code,
                })
        elif output_check:
            # --- Check 2: Does solution_code output match output_check? ---
            output, err = simulate_output(solution_code)
            if err:
                errors_in_solution.append({
                    "id": ex_id,
                    "lesson_id": lesson_id,
                    "title": title,
                    "error": err,
                })
            else:
                # Normalize: remove trailing newlines (same as frontend does)
                clean_output = output.replace('\r\n', '\n').rstrip('\n')
                clean_expected = output_check.replace('\r\n', '\n').rstrip('\n')
                if clean_output != clean_expected:
                    output_mismatches.append({
                        "id": ex_id,
                        "lesson_id": lesson_id,
                        "title": title,
                        "expected": repr(clean_expected),
                        "got": repr(clean_output),
                        "output_check_raw": repr(output_check),
                    })
        else:
            no_validation.append({"id": ex_id, "lesson_id": lesson_id, "title": title})

    print(f"== RESULTADOS ==")
    print(f"Total ejercicios analizados: {len(exercises) - skipped_no_solution}")
    print(f"Sin codigo de solucion (omitidos): {skipped_no_solution}")
    print(f"Sin validacion (siempre pasan): {len(no_validation)}")
    print(f"\n[ERROR] test_code falla con solucion correcta: {len(failures)}")
    print(f"[ERROR] output_check no coincide con solucion: {len(output_mismatches)}")
    print(f"[WARN] Errores en solution_code: {len(errors_in_solution)}")

    if failures:
        print("\n--- EJERCICIOS CON test_code ROTO ---")
        for f in failures:
            print(f"\n[Leccion {f['lesson_id']}] [{f['id']}] {f['title']}")
            print(f"  Error: {f['error'][:200]}")

    if output_mismatches:
        print(f"\n--- EJERCICIOS CON output_check INCORRECTO ---")
        for m in output_mismatches:
            print(f"\n[Leccion {m['lesson_id']}] [{m['id']}] {m['title']}")
            print(f"  Esperado: {m['expected']}")
            print(f"  Obtenido: {m['got']}")

    if errors_in_solution:
        print(f"\n--- ERRORES EN SOLUTION_CODE ---")
        for e in errors_in_solution:
            print(f"\n[Leccion {e['lesson_id']}] [{e['id']}] {e['title']}")
            print(f"  Error: {e['error'][:200]}")

    # Save results
    results = {
        "failures": failures,
        "output_mismatches": output_mismatches,
        "errors_in_solution": errors_in_solution,
        "no_validation": no_validation,
    }
    with open("exercises_test_results.json", "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    print(f"\nResultados guardados en exercises_test_results.json")

if __name__ == "__main__":
    main()
