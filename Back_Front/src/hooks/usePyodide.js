import { useEffect, useState, useRef } from 'react';

export function usePyodide() {
  const [pyodide, setPyodide] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const outputRef = useRef('');

  useEffect(() => {
    let mounted = true;

    async function initPyodide() {
      try {
        if (!window.loadPyodide) {
          throw new Error("Pyodide script not loaded yet");
        }
        const pyodideInstance = await window.loadPyodide({
          stdout: (text) => {
            outputRef.current += text + '\n';
            setOutput(outputRef.current);
          },
          stderr: (text) => {
            outputRef.current += text + '\n';
            setOutput(outputRef.current);
          }
        });
        if (mounted) {
          setPyodide(pyodideInstance);
          setIsReady(true);
        }
      } catch (err) {
        if (mounted) {
          setError("Failed to load Python environment.");
          console.error(err);
        }
      }
    }


    const interval = setInterval(() => {
      if (window.loadPyodide && !isReady) {
        clearInterval(interval);
        initPyodide();
      }
    }, 500);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const runCode = async (code, testCode = "") => {
    if (!pyodide) return { success: false, error: 'Pyodide not loaded yet' };

    // Clear output
    outputRef.current = '';
    setOutput('');
    setError(null);

    try {
      // First, run the user's code
      await pyodide.runPythonAsync(code);

      // Then, if there's test code, run it to validate
      if (testCode) {
        await pyodide.runPythonAsync(testCode);
      }

      return { success: true, output: outputRef.current };
    } catch (err) {
      setError(err.toString());
      return { success: false, error: err.toString(), output: outputRef.current };
    }
  };

  return { isReady, output, error, runCode };
}

// lalo123
