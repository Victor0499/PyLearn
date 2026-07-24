import { useEffect, useState, useRef } from 'react';

export function usePyodide() {
  const [pyodide, setPyodide] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [promptRequest, setPromptRequest] = useState(null);
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

    // Setup JS function that returns a Promise for Python to await
    window.__customPrompt = (text) => {
      return new Promise((resolve) => {
        setPromptRequest({ message: text, resolve });
      });
    };

    // Setup JS function for direct stdout writing
    window._customStdout = (text) => {
      outputRef.current += text;
      setOutput(outputRef.current);
    };

    try {
      // Set __source__ in Python's global namespace so tests can inspect the raw code
      pyodide.globals.set('__source__', code);

      // Create an async wrapper for input that awaits our JS promise, and override stdout
      await pyodide.runPythonAsync(`
import sys
import js

class CustomStdout:
    def write(self, s):
        js.window._customStdout(s)
    def flush(self):
        pass

sys.stdout = CustomStdout()
sys.stderr = CustomStdout()

async def __async_input(prompt_text=""):
    return await js.window.__customPrompt(prompt_text)
      `);

      // Transform top-level input() to await __async_input()
      const transformedCode = code.replace(/\binput\s*\(/g, 'await __async_input(');

      // First, run the transformed user's code
      await pyodide.runPythonAsync(transformedCode);

      // Then, if there's test code, run it to validate
      if (testCode) {
        await pyodide.runPythonAsync(testCode);
      }

      return { success: true, output: outputRef.current };
    } catch (err) {
      setError(err.toString());
      setPromptRequest(null); // Clear prompt if error occurs
      return { success: false, error: err.toString(), output: outputRef.current };
    }
  };

  const submitPrompt = (value) => {
    if (promptRequest) {
      promptRequest.resolve(value);
      setPromptRequest(null);
    }
  };

  return { isReady, output, error, runCode, promptRequest, submitPrompt };
}


