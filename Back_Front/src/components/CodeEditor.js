import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, onChange, disabled }) {
  return (
    <div className="h-64 w-full rounded-md overflow-hidden border border-slate-700 shadow-inner">
      <Editor
        height="100%"
        language="python"
        theme="vs-dark"
        value={code}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          readOnly: disabled,
          scrollBeyondLastLine: false,
          padding: { top: 16 }
        }}
      />
    </div>
  );
}
